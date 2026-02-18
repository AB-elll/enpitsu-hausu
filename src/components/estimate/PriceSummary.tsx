'use client';

import { formatPrice, type PriceResult } from '@/lib/pricing';

interface PriceSummaryProps {
  result: PriceResult;
  quantity: number;
  compact?: boolean;
}

export function PriceSummary({ result, quantity, compact = false }: PriceSummaryProps) {
  if (compact) {
    return (
      <div className="bg-primary/5 rounded-xl p-4">
        <p className="text-sm text-text-secondary">概算金額</p>
        <p className="font-price text-2xl font-bold text-primary">{formatPrice(result.totalPrice)}</p>
        <p className="text-sm text-text-secondary">
          単価 {formatPrice(result.unitPrice)} × {quantity.toLocaleString()}個
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-5 border border-primary/10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-text-secondary mb-1">概算見積もり金額</p>
          <p className="font-price text-3xl font-bold text-primary" aria-live="polite">
            {formatPrice(result.totalPrice)}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            単価 {formatPrice(result.unitPrice)} × {quantity.toLocaleString()}個
          </p>
        </div>
        {result.discountRate > 0 && (
          <span className="bg-danger text-white text-sm font-bold px-3 py-1 rounded-full">
            {result.discountRate}% OFF
          </span>
        )}
      </div>
    </div>
  );
}
