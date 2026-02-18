'use client';

import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { CATEGORIES, type CategoryId } from '@/lib/constants';
import {
  PRODUCT_CATALOG,
  getProductsByCategory,
  calculatePrice,
  formatPrice,
  searchParamsToEstimate,
  getProductById,
  type ProductOption,
  type Quantity,
  type OrderData,
} from '@/lib/pricing';
import { StepIndicator } from '@/components/estimate/StepIndicator';
import { OptionSelector } from '@/components/estimate/OptionSelector';
import { QuantitySelector } from '@/components/estimate/QuantitySelector';
import { PriceSummary } from '@/components/estimate/PriceSummary';
import {
  CustomerForm,
  validateCustomer,
  type CustomerInfo,
  type FormErrors,
} from '@/components/order/CustomerForm';
import { OrderConfirmation } from '@/components/order/OrderConfirmation';

type OrderStep = 1 | 2 | 3 | 4 | 5;
const STEP_LABELS = ['商品選択', '商品詳細', 'お客様情報', '確認', '完了'] as const;

export default function OrderPage() {
  const [step, setStep] = useState<OrderStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Product state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedQuantity, setSelectedQuantity] = useState<Quantity>(100);

  // Customer state
  const [customer, setCustomer] = useState<CustomerInfo>({
    company: '',
    name: '',
    tel: '',
    email: '',
    deliveryDate: '',
    note: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 見積もりページからの引き継ぎ（IDベース、安全）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const estimate = searchParamsToEstimate(params);
    if (!estimate) return;

    const product = getProductById(estimate.productId);
    if (!product) return;

    setSelectedCategory(product.categoryId);
    setSelectedProduct(product);
    setSelectedOptions(estimate.selectedOptions);
    setSelectedQuantity(estimate.quantity);
    setStep(3); // Skip to customer info
  }, []);

  const categoryProducts = useMemo(
    () => (selectedCategory ? getProductsByCategory(selectedCategory) : []),
    [selectedCategory]
  );

  const priceResult = useMemo(() => {
    if (!selectedProduct) return null;
    return calculatePrice(selectedProduct, selectedOptions, selectedQuantity);
  }, [selectedProduct, selectedOptions, selectedQuantity]);

  const selectedCategoryData = CATEGORIES.find((c) => c.id === selectedCategory);

  const handleNextToConfirm = () => {
    const validationErrors = validateCustomer(customer);
    if (!selectedProduct) validationErrors.product = '商品を選択してください';
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) setStep(4);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !priceResult) return;

    setIsSubmitting(true);

    // 注文データを構築（将来のAPI連携用）
    const orderData: OrderData = {
      product: {
        id: selectedProduct.id,
        name: selectedProduct.name,
        categoryId: selectedProduct.categoryId,
        options: Object.fromEntries(
          selectedProduct.options.map((group) => {
            const choice = group.choices.find((c) => c.id === selectedOptions[group.id]);
            return [group.id, { label: group.label, value: choice?.label ?? '' }];
          })
        ),
        quantity: selectedQuantity,
        unitPrice: priceResult.unitPrice,
        totalPrice: priceResult.totalPrice,
      },
      customer: { ...customer },
      submittedAt: new Date().toISOString(),
    };

    // C2修正: 注文データをconsole + mailtoフォールバック
    console.info('[Order Submitted]', JSON.stringify(orderData, null, 2));

    // mailto送信（バックエンドAPI未実装の暫定対応）
    const subject = encodeURIComponent(
      `【注文】${selectedProduct.name} ${selectedQuantity}個 - ${customer.name}`
    );
    const body = encodeURIComponent(
      [
        `商品: ${selectedProduct.name}`,
        `数量: ${selectedQuantity}個`,
        `単価: ${formatPrice(priceResult.unitPrice)}`,
        `合計: ${formatPrice(priceResult.totalPrice)}`,
        ``,
        `会社名: ${customer.company || '（個人）'}`,
        `担当者: ${customer.name}`,
        `電話: ${customer.tel}`,
        `メール: ${customer.email}`,
        `希望納期: ${customer.deliveryDate || '指定なし'}`,
        `備考: ${customer.note || 'なし'}`,
      ].join('\n')
    );

    // メール送信を試みる（新しいタブで開かない）
    const mailtoLink = `mailto:info@en-pitsu.com?subject=${subject}&body=${body}`;
    const a = document.createElement('a');
    a.href = mailtoLink;
    a.click();

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5);
    }, 500);
  };

  const handleProductSelect = (product: ProductOption) => {
    setSelectedProduct(product);
    const defaults: Record<string, string> = {};
    for (const group of product.options) defaults[group.id] = group.choices[0].id;
    setSelectedOptions(defaults);
    setStep(2);
  };

  const handleCustomerChange = (field: keyof CustomerInfo, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text mb-3">ご注文フォーム</h1>
          <p className="text-text-secondary text-lg">
            {step < 5 ? '必要事項をご入力のうえ、お申し込みください。' : ''}
          </p>
        </div>

        {/* Stepper */}
        {step < 5 && (
          <StepIndicator
            steps={STEP_LABELS.slice(0, 4)}
            currentStep={step}
            onStepClick={(s) => {
              // Only allow going back
              if (s < step) setStep(s as OrderStep);
            }}
          />
        )}

        {/* Step 1: Product Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-text">商品カテゴリを選択</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedProduct(null);
                    setSelectedOptions({});
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:-translate-y-0.5 min-h-[44px] ${
                    selectedCategory === cat.id ? 'shadow-lg' : 'border-border hover:shadow-md bg-white'
                  }`}
                  style={{ borderColor: selectedCategory === cat.id ? cat.color : undefined }}
                  aria-pressed={selectedCategory === cat.id}
                >
                  <span className="text-2xl mb-2 block" aria-hidden="true">{cat.icon}</span>
                  <span className="text-sm font-bold text-text block">{cat.name}</span>
                </button>
              ))}
            </div>

            {selectedCategory && categoryProducts.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-text mt-6">商品を選択</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categoryProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="bg-white p-5 rounded-xl border-2 border-border text-left hover:border-primary hover:shadow-lg transition-all group min-h-[44px]"
                    >
                      <h3 className="font-bold text-text group-hover:text-primary">{product.name}</h3>
                      <p className="mt-2 font-price font-bold text-secondary">
                        {formatPrice(product.basePrices[0].unitPrice)}〜
                      </p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Product Details */}
        {step === 2 && selectedProduct && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text">{selectedProduct.name}</h2>
                <button onClick={() => setStep(1)} className="text-sm text-primary hover:underline">
                  変更
                </button>
              </div>

              {selectedProduct.options.map((group) => (
                <OptionSelector
                  key={group.id}
                  group={group}
                  selectedId={selectedOptions[group.id] ?? group.choices[0].id}
                  onChange={(choiceId) =>
                    setSelectedOptions((p) => ({ ...p, [group.id]: choiceId }))
                  }
                />
              ))}

              <QuantitySelector selected={selectedQuantity} onChange={setSelectedQuantity} />

              {priceResult && <PriceSummary result={priceResult} quantity={selectedQuantity} compact />}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border-2 border-border text-text rounded-xl font-medium hover:bg-surface min-h-[44px]"
              >
                戻る
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark shadow-sm min-h-[44px]"
              >
                お客様情報の入力へ
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Customer Info */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Product Summary */}
            {selectedProduct && priceResult && (
              <div className="bg-surface rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">
                    {selectedCategoryData?.icon} {selectedProduct.name}
                  </p>
                  <p className="font-price font-bold text-primary">
                    {formatPrice(priceResult.totalPrice)}（{selectedQuantity.toLocaleString()}個）
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-sm text-primary hover:underline"
                >
                  変更
                </button>
              </div>
            )}

            <CustomerForm customer={customer} errors={errors} onChange={handleCustomerChange} />

            <div className="flex gap-3">
              <button
                onClick={() => setStep(selectedProduct ? 2 : 1)}
                className="px-6 py-3 border-2 border-border text-text rounded-xl font-medium hover:bg-surface min-h-[44px]"
              >
                戻る
              </button>
              <button
                onClick={handleNextToConfirm}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark shadow-sm min-h-[44px]"
              >
                確認画面へ
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && selectedProduct && priceResult && (
          <div className="space-y-6">
            <OrderConfirmation
              product={selectedProduct}
              selectedOptions={selectedOptions}
              quantity={selectedQuantity}
              priceResult={priceResult}
              customer={customer}
            />

            <form onSubmit={handleSubmit} className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 border-2 border-border text-text rounded-xl font-medium hover:bg-surface min-h-[44px]"
              >
                修正する
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-secondary text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-md hover:-translate-y-0.5 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '送信中...' : '注文を送信する'}
              </button>
            </form>
          </div>
        )}

        {/* Step 5: Complete */}
        {step === 5 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6" aria-hidden="true">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              ご注文ありがとうございます！
            </h2>
            <p className="text-text-secondary text-lg mb-2">
              ご注文内容を確認のうえ、担当者よりご連絡いたします。
            </p>
            <p className="text-text-secondary mb-8">
              通常1〜2営業日以内にメールにてご連絡差し上げます。
            </p>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-border max-w-md mx-auto mb-8">
              <p className="text-sm text-text-secondary">お問い合わせはお気軽に</p>
              <p className="font-bold text-primary text-xl mt-1">📞 03-5765-5765</p>
              <p className="text-sm text-text-secondary mt-1">平日 9:00〜18:00</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/enpitsu-hausu/"
                className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors min-h-[44px] inline-flex items-center justify-center"
              >
                トップページへ
              </a>
              <a
                href="/enpitsu-hausu/estimate"
                className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors min-h-[44px] inline-flex items-center justify-center"
              >
                別の商品を見積もる
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
