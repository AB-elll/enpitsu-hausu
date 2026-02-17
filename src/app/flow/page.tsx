import BreadcrumbNav from '@/components/BreadcrumbNav';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ご注文の流れ',
  description: 'えんぴつはうすへのご注文方法・流れをステップごとにご説明します。',
};

const STEPS = [
  {
    num: '01',
    title: 'お問い合わせ・お見積もり',
    desc: 'お電話・メール・フォームからお気軽にお問い合わせください。ご希望の商品・数量・納期をお伝えいただければ、お見積もりをお出しします。',
    color: '#2563EB',
    icon: '💬',
  },
  {
    num: '02',
    title: 'デザイン制作・入稿',
    desc: 'お客様のデータを元にデザインを作成、または完全データ入稿も可能です。校正PDFをお送りし、OKをいただいてから制作に入ります。',
    color: '#8B5CF6',
    icon: '🎨',
  },
  {
    num: '03',
    title: '制作・印刷',
    desc: '自社および提携工場にて丁寧に制作。品質チェックを経て仕上げます。進捗はメールでご連絡いたします。',
    color: '#F97316',
    icon: '🏭',
  },
  {
    num: '04',
    title: '納品',
    desc: 'ご指定の場所へ配送いたします。大量の場合は分納も対応可能。納品後のアフターフォローもお任せください。',
    color: '#22C55E',
    icon: '📦',
  },
];

export default function FlowPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: 'ご注文の流れ' }]} />

      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">ご注文の流れ</h1>
        <p className="text-text-secondary text-lg">
          初めての方も安心。4つのステップで簡単にご注文いただけます。
        </p>
      </div>

      <div className="space-y-8">
        {STEPS.map((step, i) => (
          <div key={step.num} className="relative flex gap-6 sm:gap-8">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg"
                style={{ backgroundColor: step.color }}
              >
                {step.num}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 flex-1 mb-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{step.icon}</span>
                <h2 className="text-xl font-bold text-text">{step.title}</h2>
              </div>
              <p className="text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">まずはお気軽にご相談ください</h2>
        <p className="text-blue-100 mb-8">お見積もりは無料です。小ロット100個からOK！</p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors"
        >
          無料お見積もり
        </Link>
      </div>
    </div>
  );
}
