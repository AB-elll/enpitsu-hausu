import BreadcrumbNav from '@/components/BreadcrumbNav';
import CategoryBanner from '@/components/CategoryBanner';
import ProductCard from '@/components/ProductCard';
import { CALENDAR_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カレンダー',
  description: 'オリジナル壁掛け・卓上カレンダー全54種。B2・B3・A2壁掛け、リング式・ケース式卓上、ポスター、ポケットカレンダーなど。100個〜。',
};

export default function CalendarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '商品一覧', href: '/products' }, { label: 'カレンダー' }]} />
      <CategoryBanner
        title="カレンダー"
        description="壁掛け・卓上・ポスター・ポケットなど全54種。オフセット印刷の高品質オリジナルカレンダー。"
        color="#2563EB"
        icon="📅"
        image="/enpitsu-hausu/images/category-calendar.jpg"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CALENDAR_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
