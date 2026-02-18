import CategoryListPage from '@/components/CategoryListPage';
import { UCHIWA_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'うちわ・扇子',
  description: '紙うちわ・竹うちわ・ポリうちわ・ミニうちわ・変形うちわ・扇子。イベント配布や企業ギフトに。100個〜。',
};

export default function UchiwaPage() {
  return (
    <CategoryListPage
      categoryLabel="うちわ・扇子"
      description="夏のイベントや販促に最適。紙・竹・ポリ・変形うちわ、上品な扇子まで幅広くラインナップ。"
      color="#22C55E"
      icon="🪭"
      image="/enpitsu-hausu/images/category-uchiwa.jpg"
      products={UCHIWA_PRODUCTS}
    />
  );
}
