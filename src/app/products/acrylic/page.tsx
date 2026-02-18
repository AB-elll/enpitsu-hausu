import CategoryListPage from '@/components/CategoryListPage';
import { ACRYLIC_PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'アクリルグッズ',
  description: 'アクリルスタンド・キーホルダー・コースター・写真立て・チャーム・ブロック。推し活グッズやノベルティに。50個〜。',
};

export default function AcrylicPage() {
  return (
    <CategoryListPage
      categoryLabel="アクリルグッズ"
      description="フルカラー印刷のアクリルグッズ。推し活・ノベルティ・記念品に人気のアイテム。"
      color="#8B5CF6"
      icon="✨"
      image="/enpitsu-hausu/images/category-acrylic.jpg"
      products={ACRYLIC_PRODUCTS}
    />
  );
}
