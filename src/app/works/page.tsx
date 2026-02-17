import BreadcrumbNav from '@/components/BreadcrumbNav';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '制作実績',
  description: 'えんぴつはうすの制作実績をご紹介。カレンダー・うちわ・アクリルグッズなど多数の制作事例。',
};

const WORKS = [
  { title: '○○株式会社様 B3壁掛けカレンダー', category: 'カレンダー', color: '#2563EB', lot: '500部' },
  { title: '△△イベント 紙うちわ', category: 'うちわ', color: '#22C55E', lot: '1,000本' },
  { title: '□□大学 アクリルキーホルダー', category: 'アクリル', color: '#8B5CF6', lot: '300個' },
  { title: '◇◇不動産様 ポケットカレンダー', category: 'カレンダー', color: '#2563EB', lot: '2,000部' },
  { title: '☆☆マンション 駐輪シール', category: 'シール', color: '#F97316', lot: '500枚' },
  { title: '○△商事様 卓上カレンダー', category: 'カレンダー', color: '#2563EB', lot: '300部' },
  { title: '□☆祭り実行委員会 竹うちわ', category: 'うちわ', color: '#22C55E', lot: '2,000本' },
  { title: '◇○スクール アクリルスタンド', category: 'アクリル', color: '#8B5CF6', lot: '200個' },
  { title: '△△クリニック様 封シール', category: 'シール', color: '#F97316', lot: '1,000枚' },
];

export default function WorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '制作実績' }]} />

      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">制作実績</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          年間3,000件以上の納品実績。一部をご紹介いたします。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORKS.map((work, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="h-1" style={{ backgroundColor: work.color }} />
            {/* Placeholder image */}
            <div className="aspect-[4/3] bg-surface flex items-center justify-center">
              <div className="text-center text-text-secondary">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-xs">制作実績画像</p>
              </div>
            </div>
            <div className="p-5">
              <span
                className="inline-block px-2.5 py-0.5 text-xs font-medium text-white rounded-full mb-2"
                style={{ backgroundColor: work.color }}
              >
                {work.category}
              </span>
              <h3 className="font-bold text-text mb-1">{work.title}</h3>
              <p className="text-sm text-text-secondary">制作数: {work.lot}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-text-secondary mb-6">
          掲載の実績はごく一部です。お気軽にご相談ください。
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all hover:-translate-y-0.5"
        >
          お問い合わせ
        </Link>
      </div>
    </div>
  );
}
