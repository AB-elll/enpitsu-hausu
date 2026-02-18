'use client';

interface StepIndicatorProps {
  steps: readonly string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <nav aria-label="進行状況" className="flex items-center justify-center mb-12">
      <ol className="flex items-center" role="list">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isActive = currentStep >= stepNum;
          const isCurrent = currentStep === stepNum;
          return (
            <li key={label} className="flex items-center">
              {i > 0 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 ${isActive ? 'bg-primary' : 'bg-border'} transition-colors`}
                  aria-hidden="true"
                />
              )}
              <button
                onClick={() => onStepClick?.(stepNum)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`ステップ${stepNum}: ${label}${isCurrent ? '（現在）' : ''}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  isCurrent
                    ? 'bg-primary text-white shadow-md'
                    : isActive
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface text-text-secondary'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? 'bg-white text-primary'
                      : isActive
                        ? 'bg-primary text-white'
                        : 'bg-border text-text-secondary'
                  }`}
                  aria-hidden="true"
                >
                  {isActive && !isCurrent ? '✓' : stepNum}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
