import BreadcrumbNav from '@/components/BreadcrumbNav';
import CategoryBanner from '@/components/CategoryBanner';
import ProductCard from '@/components/ProductCard';
import { HYGIENE_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '衛生用品',
  description: 'ウェットティッシュ・BOXティッシュ・ポケットティッシュ・マスク・カイロ・除菌グッズ。名入れ対応のノベルティ衛生用品。',
};

export default function HygienePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '商品一覧', href: '/products' }, { label: '衛生用品' }]} />
      <CategoryBanner
        title="衛生用品"
        description="ウェットティッシュ・マスク・カイロ・除菌グッズなど、名入れ対応の衛生用品ノベルティ。"
        color="#06B6D4"
        icon="🧴"
        image="/enpitsu-hausu/images/category-hygiene.jpg"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {HYGIENE_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
