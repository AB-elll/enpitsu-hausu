'use client';

export interface CustomerInfo {
  company: string;
  name: string;
  tel: string;
  email: string;
  deliveryDate: string;
  note: string;
}

export interface FormErrors {
  [key: string]: string;
}

interface CustomerFormProps {
  customer: CustomerInfo;
  errors: FormErrors;
  onChange: (field: keyof CustomerInfo, value: string) => void;
}

export function validateCustomer(customer: CustomerInfo): FormErrors {
  const e: FormErrors = {};
  if (!customer.name.trim()) e.name = '担当者名は必須です';
  if (!customer.tel.trim()) e.tel = '電話番号は必須です';
  else if (!/^[\d\-+()]{8,15}$/.test(customer.tel.replace(/\s/g, '')))
    e.tel = '正しい電話番号を入力してください';
  if (!customer.email.trim()) e.email = 'メールアドレスは必須です';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
    e.email = '正しいメールアドレスを入力してください';
  return e;
}

export function CustomerForm({ customer, errors, onChange }: CustomerFormProps) {
  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-lg text-text focus:outline-none focus:ring-2 transition-colors ${
      errors[field]
        ? 'border-danger focus:ring-danger/20'
        : 'border-border focus:border-primary focus:ring-primary/20'
    }`;

  // 納期の最小日付（明日）
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border space-y-5">
      <h2 className="text-xl font-bold text-text">お客様情報</h2>

      <div>
        <label htmlFor="company" className="block text-sm font-bold text-text mb-1">
          会社名・団体名
        </label>
        <input
          id="company"
          type="text"
          value={customer.company}
          onChange={(e) => onChange('company', e.target.value)}
          className={inputClass('company')}
          placeholder="株式会社えんぴつはうす"
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-bold text-text mb-1">
          担当者名 <span className="text-danger">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={customer.name}
          onChange={(e) => onChange('name', e.target.value)}
          className={inputClass('name')}
          placeholder="山田 太郎"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          autoComplete="name"
        />
        {errors.name && (
          <p id="name-error" className="text-danger text-sm mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="tel" className="block text-sm font-bold text-text mb-1">
          電話番号 <span className="text-danger">*</span>
        </label>
        <input
          id="tel"
          type="tel"
          value={customer.tel}
          onChange={(e) => onChange('tel', e.target.value)}
          className={inputClass('tel')}
          placeholder="03-1234-5678"
          aria-required="true"
          aria-invalid={!!errors.tel}
          aria-describedby={errors.tel ? 'tel-error' : undefined}
          autoComplete="tel"
        />
        {errors.tel && (
          <p id="tel-error" className="text-danger text-sm mt-1" role="alert">
            {errors.tel}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-text mb-1">
          メールアドレス <span className="text-danger">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={customer.email}
          onChange={(e) => onChange('email', e.target.value)}
          className={inputClass('email')}
          placeholder="info@example.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <p id="email-error" className="text-danger text-sm mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="deliveryDate" className="block text-sm font-bold text-text mb-1">
          希望納期
        </label>
        <input
          id="deliveryDate"
          type="date"
          value={customer.deliveryDate}
          onChange={(e) => onChange('deliveryDate', e.target.value)}
          className={inputClass('deliveryDate')}
          min={minDate}
        />
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-bold text-text mb-1">
          備考
        </label>
        <textarea
          id="note"
          value={customer.note}
          onChange={(e) => onChange('note', e.target.value)}
          rows={3}
          className={inputClass('note')}
          placeholder="ご要望等がありましたらご記入ください"
          maxLength={2000}
        />
      </div>
    </div>
  );
}
