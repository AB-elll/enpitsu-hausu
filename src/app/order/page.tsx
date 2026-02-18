'use client';

import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { CATEGORIES, type CategoryId } from '@/lib/constants';
import {
  PRODUCT_CATALOG,
  QUANTITY_OPTIONS,
  getProductsByCategory,
  calculatePrice,
  formatPrice,
  type ProductOption,
  type Quantity,
} from '@/lib/pricing';

type OrderStep = 1 | 2 | 3 | 4 | 5;
const STEP_LABELS = ['商品選択', '商品詳細', 'お客様情報', '確認', '完了'] as const;

interface CustomerInfo {
  company: string;
  name: string;
  tel: string;
  email: string;
  deliveryDate: string;
  file: string; // filename (UI only)
  note: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function OrderPage() {
  const [step, setStep] = useState<OrderStep>(1);

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
    file: '',
    note: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // 見積もりページからの引き継ぎ
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('product');
    const quantity = params.get('quantity');

    if (productName && quantity) {
      const product = PRODUCT_CATALOG.find((p) => p.name === productName);
      if (product) {
        const cat = CATEGORIES.find((c) => c.id === product.categoryId);
        setSelectedCategory(product.categoryId);
        setSelectedProduct(product);
        setSelectedQuantity(Number(quantity) as Quantity);

        // Parse options from URL
        const optionsStr = params.get('options') || '';
        if (optionsStr) {
          const defaults: Record<string, string> = {};
          for (const group of product.options) {
            const match = optionsStr.match(new RegExp(`${group.label}: (.+?)(?:\\s\\/|$)`));
            if (match) {
              const choice = group.choices.find((c) => c.label === match[1].trim());
              if (choice) defaults[group.id] = choice.id;
            }
          }
          if (Object.keys(defaults).length > 0) {
            setSelectedOptions(defaults);
          } else {
            const d: Record<string, string> = {};
            for (const g of product.options) d[g.id] = g.choices[0].id;
            setSelectedOptions(d);
          }
        }
        setStep(3); // Skip to customer info since product is pre-selected
      }
    }
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

  // Validation
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!customer.name.trim()) e.name = '担当者名は必須です';
    if (!customer.tel.trim()) e.tel = '電話番号は必須です';
    else if (!/^[\d\-+()]{8,15}$/.test(customer.tel.replace(/\s/g, '')))
      e.tel = '正しい電話番号を入力してください';
    if (!customer.email.trim()) e.email = 'メールアドレスは必須です';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) e.email = '正しいメールアドレスを入力してください';
    if (!selectedProduct) e.product = '商品を選択してください';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const handleNextToConfirm = () => {
    if (validate()) setStep(4);
  };

  const handleProductSelect = (product: ProductOption) => {
    setSelectedProduct(product);
    const defaults: Record<string, string> = {};
    for (const group of product.options) defaults[group.id] = group.choices[0].id;
    setSelectedOptions(defaults);
    setStep(2);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-lg text-text focus:outline-none focus:ring-2 transition-colors ${
      errors[field] ? 'border-danger focus:ring-danger/20' : 'border-border focus:border-primary focus:ring-primary/20'
    }`;

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
          <div className="flex items-center justify-center mb-12 overflow-x-auto">
            {STEP_LABELS.slice(0, 4).map((label, i) => {
              const stepNum = (i + 1) as OrderStep;
              const isActive = step >= stepNum;
              const isCurrent = step === stepNum;
              return (
                <div key={label} className="flex items-center flex-shrink-0">
                  {i > 0 && <div className={`w-6 sm:w-12 h-0.5 ${isActive ? 'bg-primary' : 'bg-border'}`} />}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                      isCurrent ? 'bg-primary text-white' : isActive ? 'bg-primary/10 text-primary' : 'bg-surface text-text-secondary'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent ? 'bg-white text-primary' : isActive ? 'bg-primary text-white' : 'bg-border text-text-secondary'
                      }`}
                    >
                      {isActive && step > stepNum ? '✓' : stepNum}
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
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
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:-translate-y-0.5 ${
                    selectedCategory === cat.id ? 'shadow-lg' : 'border-border hover:shadow-md bg-white'
                  }`}
                  style={{ borderColor: selectedCategory === cat.id ? cat.color : undefined }}
                >
                  <span className="text-2xl mb-2 block">{cat.icon}</span>
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
                      className="bg-white p-5 rounded-xl border-2 border-border text-left hover:border-primary hover:shadow-lg transition-all group"
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
                <button onClick={() => setStep(1)} className="text-sm text-primary hover:underline">変更</button>
              </div>

              {selectedProduct.options.map((group) => (
                <div key={group.id} className="mb-5">
                  <label className="block text-sm font-bold text-text mb-2">{group.label}</label>
                  <div className="flex flex-wrap gap-2">
                    {group.choices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => setSelectedOptions((p) => ({ ...p, [group.id]: choice.id }))}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                          selectedOptions[group.id] === choice.id
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border bg-white text-text hover:border-primary/40'
                        }`}
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mb-5">
                <label className="block text-sm font-bold text-text mb-2">数量</label>
                <div className="flex flex-wrap gap-2">
                  {QUANTITY_OPTIONS.map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setSelectedQuantity(qty)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                        selectedQuantity === qty
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-white text-text hover:border-primary/40'
                      }`}
                    >
                      {qty.toLocaleString()}個
                    </button>
                  ))}
                </div>
              </div>

              {priceResult && (
                <div className="bg-primary/5 rounded-xl p-4 mt-4">
                  <p className="text-sm text-text-secondary">概算金額</p>
                  <p className="font-price text-2xl font-bold text-primary">{formatPrice(priceResult.totalPrice)}</p>
                  <p className="text-sm text-text-secondary">単価 {formatPrice(priceResult.unitPrice)} × {selectedQuantity.toLocaleString()}個</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 border-2 border-border text-text rounded-xl font-medium hover:bg-surface">
                戻る
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark shadow-sm"
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
                  <p className="text-sm text-text-secondary">{selectedCategoryData?.icon} {selectedProduct.name}</p>
                  <p className="font-price font-bold text-primary">{formatPrice(priceResult.totalPrice)}（{selectedQuantity.toLocaleString()}個）</p>
                </div>
                <button onClick={() => setStep(selectedProduct ? 2 : 1)} className="text-sm text-primary hover:underline">変更</button>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 shadow-sm border border-border space-y-5">
              <h2 className="text-xl font-bold text-text">お客様情報</h2>

              <div>
                <label className="block text-sm font-bold text-text mb-1">会社名・団体名</label>
                <input
                  type="text"
                  value={customer.company}
                  onChange={(e) => setCustomer((p) => ({ ...p, company: e.target.value }))}
                  className={inputClass('company')}
                  placeholder="株式会社えんぴつはうす"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-1">
                  担当者名 <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
                  className={inputClass('name')}
                  placeholder="山田 太郎"
                />
                {errors.name && <p className="text-danger text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-1">
                  電話番号 <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  value={customer.tel}
                  onChange={(e) => setCustomer((p) => ({ ...p, tel: e.target.value }))}
                  className={inputClass('tel')}
                  placeholder="03-1234-5678"
                />
                {errors.tel && <p className="text-danger text-sm mt-1">{errors.tel}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-1">
                  メールアドレス <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer((p) => ({ ...p, email: e.target.value }))}
                  className={inputClass('email')}
                  placeholder="info@example.com"
                />
                {errors.email && <p className="text-danger text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-1">希望納期</label>
                <input
                  type="date"
                  value={customer.deliveryDate}
                  onChange={(e) => setCustomer((p) => ({ ...p, deliveryDate: e.target.value }))}
                  className={inputClass('deliveryDate')}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-1">入稿データ</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setCustomer((p) => ({ ...p, file: file.name }));
                    }}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-3xl block mb-2">📁</span>
                    {customer.file ? (
                      <span className="text-primary font-medium">{customer.file}</span>
                    ) : (
                      <>
                        <span className="text-text-secondary text-sm">クリックしてファイルを選択</span>
                        <span className="block text-xs text-text-secondary mt-1">AI / PSD / PDF / PNG / JPG 対応</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-1">備考</label>
                <textarea
                  value={customer.note}
                  onChange={(e) => setCustomer((p) => ({ ...p, note: e.target.value }))}
                  rows={3}
                  className={inputClass('note')}
                  placeholder="ご要望等がありましたらご記入ください"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(selectedProduct ? 2 : 1)}
                className="px-6 py-3 border-2 border-border text-text rounded-xl font-medium hover:bg-surface"
              >
                戻る
              </button>
              <button
                onClick={handleNextToConfirm}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark shadow-sm"
              >
                確認画面へ
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && selectedProduct && priceResult && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-border">
              <h2 className="text-xl font-bold text-text mb-6 pb-4 border-b border-border">ご注文内容の確認</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3">商品情報</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between py-1">
                      <dt className="text-text-secondary">カテゴリ</dt>
                      <dd className="font-medium">{selectedCategoryData?.name}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-text-secondary">商品</dt>
                      <dd className="font-medium">{selectedProduct.name}</dd>
                    </div>
                    {selectedProduct.options.map((group) => {
                      const choice = group.choices.find((c) => c.id === selectedOptions[group.id]);
                      return (
                        <div key={group.id} className="flex justify-between py-1">
                          <dt className="text-text-secondary">{group.label}</dt>
                          <dd className="font-medium">{choice?.label}</dd>
                        </div>
                      );
                    })}
                    <div className="flex justify-between py-1">
                      <dt className="text-text-secondary">数量</dt>
                      <dd className="font-medium">{selectedQuantity.toLocaleString()}個</dd>
                    </div>
                    <div className="flex justify-between py-2 border-t border-border mt-2">
                      <dt className="font-bold">合計金額（税抜）</dt>
                      <dd className="font-price font-bold text-primary text-lg">{formatPrice(priceResult.totalPrice)}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3">お客様情報</h3>
                  <dl className="space-y-2 text-sm">
                    {customer.company && (
                      <div className="flex justify-between py-1">
                        <dt className="text-text-secondary">会社名</dt>
                        <dd className="font-medium">{customer.company}</dd>
                      </div>
                    )}
                    <div className="flex justify-between py-1">
                      <dt className="text-text-secondary">担当者名</dt>
                      <dd className="font-medium">{customer.name}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-text-secondary">電話番号</dt>
                      <dd className="font-medium">{customer.tel}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-text-secondary">メール</dt>
                      <dd className="font-medium">{customer.email}</dd>
                    </div>
                    {customer.deliveryDate && (
                      <div className="flex justify-between py-1">
                        <dt className="text-text-secondary">希望納期</dt>
                        <dd className="font-medium">{customer.deliveryDate}</dd>
                      </div>
                    )}
                    {customer.file && (
                      <div className="flex justify-between py-1">
                        <dt className="text-text-secondary">入稿データ</dt>
                        <dd className="font-medium">{customer.file}</dd>
                      </div>
                    )}
                    {customer.note && (
                      <div className="py-1">
                        <dt className="text-text-secondary mb-1">備考</dt>
                        <dd className="font-medium bg-surface p-2 rounded">{customer.note}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 border-2 border-border text-text rounded-xl font-medium hover:bg-surface"
              >
                修正する
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-secondary text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-md hover:-translate-y-0.5"
              >
                注文を送信する
              </button>
            </form>
          </div>
        )}

        {/* Step 5: Complete */}
        {step === 5 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">ご注文ありがとうございます！</h2>
            <p className="text-text-secondary text-lg mb-2">ご注文内容を確認のうえ、担当者よりご連絡いたします。</p>
            <p className="text-text-secondary mb-8">通常1〜2営業日以内にメールにてご連絡差し上げます。</p>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-border max-w-md mx-auto mb-8">
              <p className="text-sm text-text-secondary">お問い合わせはお気軽に</p>
              <p className="font-bold text-primary text-xl mt-1">📞 03-5765-5765</p>
              <p className="text-sm text-text-secondary mt-1">平日 9:00〜18:00</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/enpitsu-hausu/"
                className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
              >
                トップページへ
              </a>
              <a
                href="/enpitsu-hausu/estimate"
                className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
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
