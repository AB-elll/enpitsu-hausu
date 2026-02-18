import BreadcrumbNav from '@/components/BreadcrumbNav';
import CategoryBanner from '@/components/CategoryBanner';
import ProductCard from '@/components/ProductCard';
import { TOWEL_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'タオル・名入れ',
  description: 'フェイスタオル・ハンドタオル・スポーツタオル・バスタオル。今治タオル対応。名入れ・ロゴ入りノベルティ。',
};

export default function TowelPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '商品一覧', href: '/products' }, { label: 'タオル・名入れ' }]} />
      <CategoryBanner
        title="タオル・名入れ"
        description="今治タオル認定品を含む高品質なフェイスタオル・ハンドタオル・スポーツタオル。名入れ・ロゴ入り対応。"
        color="#EC4899"
        icon="🧣"
        image="/enpitsu-hausu/images/category-towel.jpg"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TOWEL_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
