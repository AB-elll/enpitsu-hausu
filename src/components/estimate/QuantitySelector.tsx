'use client';

import { QUANTITY_OPTIONS, type Quantity } from '@/lib/pricing';

interface QuantitySelectorProps {
  selected: Quantity;
  onChange: (qty: Quantity) => void;
}

export function QuantitySelector({ selected, onChange }: QuantitySelectorProps) {
  return (
    <fieldset className="mb-6">
      <legend className="block text-sm font-bold text-text mb-2">数量</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="数量">
        {QUANTITY_OPTIONS.map((qty) => (
          <button
            key={qty}
            onClick={() => onChange(qty)}
            role="radio"
            aria-checked={selected === qty}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all min-h-[44px] ${
              selected === qty
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border bg-white text-text hover:border-primary/40'
            }`}
          >
            {qty.toLocaleString()}個
          </button>
        ))}
      </div>
    </fieldset>
  );
}
