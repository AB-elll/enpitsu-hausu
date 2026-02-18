'use client';

import { CATEGORIES } from '@/lib/constants';
import { formatPrice, type ProductOption, type PriceResult } from '@/lib/pricing';
import type { CustomerInfo } from './CustomerForm';

interface OrderConfirmationProps {
  product: ProductOption;
  selectedOptions: Record<string, string>;
  quantity: number;
  priceResult: PriceResult;
  customer: CustomerInfo;
}

export function OrderConfirmation({
  product,
  selectedOptions,
  quantity,
  priceResult,
  customer,
}: OrderConfirmationProps) {
  const categoryData = CATEGORIES.find((c) => c.id === product.categoryId);

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-border">
      <h2 className="text-xl font-bold text-text mb-6 pb-4 border-b border-border">
        ご注文内容の確認
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3">
            商品情報
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between py-1">
              <dt className="text-text-secondary">カテゴリ</dt>
              <dd className="font-medium">{categoryData?.name}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-text-secondary">商品</dt>
              <dd className="font-medium">{product.name}</dd>
            </div>
            {product.options.map((group) => {
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
              <dd className="font-medium">{quantity.toLocaleString()}個</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-text-secondary">単価</dt>
              <dd className="font-medium font-price">{formatPrice(priceResult.unitPrice)}</dd>
            </div>
            <div className="flex justify-between py-2 border-t border-border mt-2">
              <dt className="font-bold">合計金額（税抜）</dt>
              <dd className="font-price font-bold text-primary text-lg">
                {formatPrice(priceResult.totalPrice)}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3">
            お客様情報
          </h3>
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
  );
}
