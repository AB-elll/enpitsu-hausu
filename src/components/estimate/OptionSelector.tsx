'use client';

import type { OptionGroup } from '@/lib/pricing';

interface OptionSelectorProps {
  group: OptionGroup;
  selectedId: string;
  onChange: (choiceId: string) => void;
}

export function OptionSelector({ group, selectedId, onChange }: OptionSelectorProps) {
  return (
    <fieldset className="mb-6">
      <legend className="block text-sm font-bold text-text mb-2">{group.label}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={group.label}>
        {group.choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => onChange(choice.id)}
              role="radio"
              aria-checked={isSelected}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all min-h-[44px] ${
                isSelected
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-white text-text hover:border-primary/40'
              }`}
            >
              {choice.label}
              {choice.priceModifier !== 1.0 && (
                <span className="ml-1 text-xs text-text-secondary">
                  ({choice.priceModifier > 1 ? '+' : ''}
                  {Math.round((choice.priceModifier - 1) * 100)}%)
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
