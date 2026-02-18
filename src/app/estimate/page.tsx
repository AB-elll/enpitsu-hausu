'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES, type CategoryId } from '@/lib/constants';
import {
  getProductsByCategory,
  calculatePrice,
  formatPrice,
  estimateToSearchParams,
  type ProductOption,
  type Quantity,
} from '@/lib/pricing';
import { StepIndicator } from '@/components/estimate/StepIndicator';
import { OptionSelector } from '@/components/estimate/OptionSelector';
import { QuantitySelector } from '@/components/estimate/QuantitySelector';
import { PriceSummary } from '@/components/estimate/PriceSummary';

type Step = 1 | 2 | 3;
const STEP_LABELS = ['商品選択', 'オプション・数量', '見積もり結果'] as const;

export default function EstimatePage() {
  const router = useRouter();
  const stepContentRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedQuantity, setSelectedQuantity] = useState<Quantity>(100);

  // Focus step content on step change for accessibility
  useEffect(() => {
    stepContentRef.current?.focus({ preventScroll: false });
  }, [step]);

  const categoryProducts = useMemo(
    () => (selectedCategory ? getProductsByCategory(selectedCategory) : []),
    [selectedCategory]
  );

  const priceResult = useMemo(() => {
    if (!selectedProduct) return null;
    return calculatePrice(selectedProduct, selectedOptions, selectedQuantity);
  }, [selectedProduct, selectedOptions, selectedQuantity]);

  const handleCategorySelect = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setSelectedProduct(null);
    setSelectedOptions({});
  };

  const handleProductSelect = (product: ProductOption) => {
    setSelectedProduct(product);
    const defaults: Record<string, string> = {};
    for (const group of product.options) {
      defaults[group.id] = group.choices[0].id;
    }
    setSelectedOptions(defaults);
    setStep(2);
  };

  const handleOptionChange = (groupId: string, choiceId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupId]: choiceId }));
  };

  const handleOrderClick = () => {
    if (!selectedProduct) return;
    const params = estimateToSearchParams({
      productId: selectedProduct.id,
      selectedOptions,
      quantity: selectedQuantity,
    });
    router.push(`/order?${params}`);
  };

  const resetAll = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSelectedOptions({});
    setSelectedQuantity(100);
  };

  const handleStepClick = (s: number) => {
    if (s === 1) resetAll();
    else if (s === 2 && selectedProduct) setStep(2);
    else if (s === 3 && selectedProduct && priceResult) setStep(3);
  };

  const selectedCategoryData = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text mb-3">オンライン見積もり</h1>
          <p className="text-text-secondary text-lg">
            商品・オプションを選ぶだけで、すぐに概算価格をご確認いただけます。
          </p>
        </div>

        <StepIndicator steps={STEP_LABELS} currentStep={step} onStepClick={handleStepClick} />

        {/* Step 1: Category & Product Selection */}
        {step === 1 && (
          <div className="space-y-8" ref={stepContentRef} tabIndex={-1}>
            <div>
              <h2 className="text-xl font-bold text-text mb-4" id="category-heading">カテゴリを選択</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-labelledby="category-heading">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all hover:-translate-y-0.5 min-h-[44px] ${
                      selectedCategory === cat.id
                        ? 'border-current shadow-lg'
                        : 'border-border hover:border-current hover:shadow-md bg-white'
                    }`}
                    style={{
                      borderColor: selectedCategory === cat.id ? cat.color : undefined,
                      color: cat.color,
                    }}
                    aria-pressed={selectedCategory === cat.id}
                  >
                    <span className="text-2xl mb-2 block" aria-hidden="true">{cat.icon}</span>
                    <span className="text-sm font-bold text-text block">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedCategory && (
              <div>
                <h2 className="text-xl font-bold text-text mb-4">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: selectedCategoryData?.color }}
                    aria-hidden="true"
                  />
                  {selectedCategoryData?.name}の商品を選択
                </h2>
                {categoryProducts.length === 0 ? (
                  <p className="text-text-secondary bg-surface p-6 rounded-xl text-center">
                    このカテゴリの商品は準備中です。
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categoryProducts.map((product) => {
                      const basePrice = product.basePrices[0];
                      return (
                        <button
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="bg-white p-5 rounded-xl border-2 border-border text-left hover:border-primary hover:shadow-lg transition-all hover:-translate-y-0.5 group min-h-[44px]"
                        >
                          <h3 className="font-bold text-text group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-text-secondary mt-1">
                            {product.options.map((o) => o.label).join(' / ')} 選択可
                          </p>
                          <p className="mt-3 font-price font-bold text-secondary text-lg">
                            {formatPrice(basePrice.unitPrice)}〜
                            <span className="text-xs text-text-secondary font-normal ml-1">
                              / 個（{basePrice.quantity}個〜）
                            </span>
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Options & Quantity */}
        {step === 2 && selectedProduct && (
          <div className="space-y-8" ref={stepContentRef} tabIndex={-1}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-text-secondary">
                    {selectedCategoryData?.icon} {selectedCategoryData?.name}
                  </p>
                  <h2 className="text-xl font-bold text-text">{selectedProduct.name}</h2>
                </div>
                <button onClick={() => setStep(1)} className="text-sm text-primary hover:underline">
                  商品を変更
                </button>
              </div>

              {selectedProduct.options.map((group) => (
                <OptionSelector
                  key={group.id}
                  group={group}
                  selectedId={selectedOptions[group.id] ?? group.choices[0].id}
                  onChange={(choiceId) => handleOptionChange(group.id, choiceId)}
                />
              ))}

              <QuantitySelector selected={selectedQuantity} onChange={setSelectedQuantity} />

              {priceResult && <PriceSummary result={priceResult} quantity={selectedQuantity} />}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border-2 border-border text-text rounded-xl font-medium hover:bg-surface transition-colors min-h-[44px]"
              >
                戻る
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm hover:-translate-y-0.5 min-h-[44px]"
              >
                見積もり結果を確認
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && selectedProduct && priceResult && (
          <div className="space-y-6" ref={stepContentRef} tabIndex={-1}>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-border">
              <h2 className="text-xl font-bold text-text mb-6 pb-4 border-b border-border">
                お見積もり内容
              </h2>

              <dl className="space-y-4">
                <div className="flex justify-between py-2">
                  <dt className="text-text-secondary">カテゴリ</dt>
                  <dd className="font-medium text-text">
                    {selectedCategoryData?.icon} {selectedCategoryData?.name}
                  </dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-text-secondary">商品</dt>
                  <dd className="font-medium text-text">{selectedProduct.name}</dd>
                </div>
                {selectedProduct.options.map((group) => {
                  const choice = group.choices.find((c) => c.id === selectedOptions[group.id]);
                  return (
                    <div key={group.id} className="flex justify-between py-2">
                      <dt className="text-text-secondary">{group.label}</dt>
                      <dd className="font-medium text-text">{choice?.label}</dd>
                    </div>
                  );
                })}
                <div className="flex justify-between py-2">
                  <dt className="text-text-secondary">数量</dt>
                  <dd className="font-medium text-text">{selectedQuantity.toLocaleString()}個</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-text-secondary">単価</dt>
                  <dd className="font-price font-bold text-text">
                    {formatPrice(priceResult.unitPrice)}
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-primary/20 mt-2">
                  <dt className="text-lg font-bold text-text">合計金額（税抜）</dt>
                  <dd className="font-price text-2xl font-bold text-primary">
                    {formatPrice(priceResult.totalPrice)}
                  </dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-sm text-text-secondary">税込参考価格</dt>
                  <dd className="font-price text-sm text-text-secondary">
                    {formatPrice(Math.round(priceResult.totalPrice * 1.1))}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-xs text-text-secondary bg-surface p-3 rounded-lg">
                ※
                上記は概算見積もりです。デザイン内容・加工仕様により変動する場合があります。正式なお見積もりはご注文後にご連絡いたします。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border-2 border-border text-text rounded-xl font-medium hover:bg-surface transition-colors min-h-[44px]"
              >
                内容を変更
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors min-h-[44px]"
              >
                📄 PDF出力
              </button>
              <button
                onClick={handleOrderClick}
                className="flex-1 px-6 py-3 bg-secondary text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-md hover:-translate-y-0.5 min-h-[44px]"
              >
                この内容で注文する →
              </button>
            </div>

            <div className="text-center">
              <button onClick={resetAll} className="text-sm text-primary hover:underline">
                最初からやり直す
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
