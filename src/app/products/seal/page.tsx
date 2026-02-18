import BreadcrumbNav from '@/components/BreadcrumbNav';
import CategoryBanner from '@/components/CategoryBanner';
import ProductCard from '@/components/ProductCard';
import { SEAL_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'シール・ステッカー',
  description: 'お名前シール・駐輪シール・封シール・ラベル・型抜きステッカー・シートステッカー。100個〜。',
};

export default function SealPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '商品一覧', href: '/products' }, { label: 'シール・ステッカー' }]} />
      <CategoryBanner
        title="シール・ステッカー"
        description="お名前シールから業務用ラベルまで。型抜き・シートタイプも豊富にラインナップ。"
        color="#F97316"
        icon="🏷️"
        image="/enpitsu-hausu/images/category-seal.jpg"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SEAL_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
