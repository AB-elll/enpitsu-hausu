import BreadcrumbNav from '@/components/BreadcrumbNav';
import CategoryBanner from '@/components/CategoryBanner';
import ProductCard from '@/components/ProductCard';
import { ACRYLIC_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'アクリルグッズ',
  description: 'アクリルスタンド・キーホルダー・コースター・写真立て・チャーム・ブロック。推し活グッズやノベルティに。50個〜。',
};

export default function AcrylicPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '商品一覧', href: '/products' }, { label: 'アクリルグッズ' }]} />
      <CategoryBanner
        title="アクリルグッズ"
        description="フルカラー印刷のアクリルグッズ。推し活・ノベルティ・記念品に人気のアイテム。"
        color="#8B5CF6"
        icon="✨"
        image="/images/category-acrylic.jpg"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ACRYLIC_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
