import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { CATEGORIES } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '商品一覧',
  description: 'カレンダー・うちわ・アクリルグッズ・シールなど、多彩なノベルティ・販促品のカテゴリ一覧。',
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '商品一覧' }]} />

      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">商品一覧</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          カテゴリからお探しの商品をお選びください。すべて小ロット対応・オリジナルデザイン可能です。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Color Header */}
            <div className="h-40 flex items-center justify-center relative" style={{ backgroundColor: cat.color }}>
              <span className="text-7xl opacity-80">{cat.icon}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                {cat.name}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">{cat.description}</p>
              <div className="mt-4 text-sm font-medium text-primary flex items-center">
                商品を見る
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
