import CategoryListPage from '@/components/CategoryListPage';
import { CALENDAR_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カレンダー',
  description: 'オリジナル壁掛け・卓上カレンダー全16種。B2・B3・A2壁掛け、リング式・ケース式卓上、ポスター、ポケットカレンダーなど。100個〜。',
};

export default function CalendarPage() {
  return (
    <CategoryListPage
      categoryLabel="カレンダー"
      description="壁掛け・卓上・ポスター・ポケットなど全16種。オフセット印刷の高品質オリジナルカレンダー。"
      color="#2563EB"
      icon="📅"
      image="/enpitsu-hausu/images/category-calendar.jpg"
      products={CALENDAR_PRODUCTS}
    />
  );
}
