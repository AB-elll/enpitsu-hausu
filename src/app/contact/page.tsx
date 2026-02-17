'use client';

import { useState } from 'react';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { COMPANY_TEL, COMPANY_EMAIL } from '@/lib/constants';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: 'お問い合わせ' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">お問い合わせ・お見積もり</h1>
      <p className="text-text-secondary text-lg mb-10">
        お見積もり・ご質問など、お気軽にお問い合わせください。通常1営業日以内にご回答いたします。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-text mb-3">送信完了</h2>
              <p className="text-text-secondary">お問い合わせありがとうございます。<br />1営業日以内にご回答いたします。</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="bg-white rounded-2xl shadow-sm p-8 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-text mb-2">
                    お名前 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text mb-2">
                    会社名
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="株式会社〇〇"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-text mb-2">
                    メールアドレス <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="info@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="03-0000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-2">
                  お問い合わせ種別
                </label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors bg-white">
                  <option value="">選択してください</option>
                  <option value="estimate">お見積もり依頼</option>
                  <option value="question">商品についてのご質問</option>
                  <option value="order">ご注文について</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-text mb-2">
                  お問い合わせ内容 <span className="text-danger">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-y"
                  placeholder="ご希望の商品、数量、納期などをお書きください"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold text-lg rounded-lg hover:bg-primary-dark transition-all hover:-translate-y-0.5 shadow-sm"
              >
                送信する
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-text mb-4">📞 お電話でのお問い合わせ</h3>
            <a
              href={`tel:${COMPANY_TEL.replace(/-/g, '')}`}
              className="text-2xl font-bold text-primary block mb-2"
              style={{ fontFamily: 'var(--font-price)' }}
            >
              {COMPANY_TEL}
            </a>
            <p className="text-sm text-text-secondary">平日 9:00〜18:00</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-text mb-4">✉️ メールでのお問い合わせ</h3>
            <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary hover:underline break-all">
              {COMPANY_EMAIL}
            </a>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-bold text-text mb-3">💡 お見積もりのコツ</h3>
            <ul className="text-sm text-text-secondary space-y-2">
              <li>✓ ご希望の商品名</li>
              <li>✓ 数量（概算でOK）</li>
              <li>✓ ご希望納期</li>
              <li>✓ デザインの有無</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
