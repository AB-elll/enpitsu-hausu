import BreadcrumbNav from '@/components/BreadcrumbNav';
import CategoryBanner from '@/components/CategoryBanner';
import ProductCard from '@/components/ProductCard';
import { UCHIWA_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'うちわ・扇子',
  description: '紙うちわ・竹うちわ・ポリうちわ・ミニうちわ・変形うちわ・扇子。イベント配布や企業ギフトに。100個〜。',
};

export default function UchiwaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '商品一覧', href: '/products' }, { label: 'うちわ・扇子' }]} />
      <CategoryBanner
        title="うちわ・扇子"
        description="夏のイベントや販促に最適。紙・竹・ポリ・変形うちわ、上品な扇子まで幅広くラインナップ。"
        color="#22C55E"
        icon="🪭"
        image="/images/category-uchiwa.jpg"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {UCHIWA_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
