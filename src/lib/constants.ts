export const SITE_NAME = 'えんぴつはうす';
export const SITE_DESCRIPTION = 'オリジナルカレンダー・うちわ・アクリルグッズ・シールなど、ノベルティ・販促品の企画制作。小ロット100個から対応。';
export const SITE_URL = 'https://www.en-pitsu.com';
export const COMPANY_TEL = '03-5765-5765';
export const COMPANY_FAX = '03-5765-5767';
export const COMPANY_EMAIL = 'info@en-pitsu.com';
export const COMPANY_ADDRESS = '〒143-0016 東京都大田区大森北1-17-2 大森についてのビル4F';

export const CATEGORIES = [
  {
    id: 'calendar',
    name: 'カレンダー',
    description: 'オリジナル壁掛け・卓上カレンダー 全54種',
    color: '#2563EB',
    icon: '📅',
    href: '/products/calendar',
    image: '/images/category-calendar.jpg',
  },
  {
    id: 'uchiwa',
    name: 'うちわ・扇子',
    description: '紙うちわ・竹うちわ・ポリうちわ・扇子',
    color: '#22C55E',
    icon: '🪭',
    href: '/products/uchiwa',
    image: '/images/category-uchiwa.jpg',
  },
  {
    id: 'acrylic',
    name: 'アクリルグッズ',
    description: 'スタンド・キーホルダー・コースター・写真立て',
    color: '#8B5CF6',
    icon: '✨',
    href: '/products/acrylic',
    image: '/images/category-acrylic.jpg',
  },
  {
    id: 'seal',
    name: 'シール・ステッカー',
    description: 'お名前シール・駐輪シール・型抜きステッカー',
    color: '#F97316',
    icon: '🏷️',
    href: '/products/seal',
    image: '/images/category-seal.jpg',
  },
  {
    id: 'hygiene',
    name: '衛生用品',
    description: 'ウェットティッシュ・マスク・カイロ・ポケットティッシュ',
    color: '#06B6D4',
    icon: '🧴',
    href: '/products/hygiene',
    image: '/images/category-hygiene.jpg',
  },
  {
    id: 'towel',
    name: 'タオル・名入れ',
    description: 'フェイスタオル・ハンドタオル・スポーツタオル',
    color: '#EC4899',
    icon: '🧣',
    href: '/products/towel',
    image: '/images/category-towel.jpg',
  },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];

export const NAV_ITEMS = [
  { label: '商品一覧', href: '/products' },
  { label: 'ご注文の流れ', href: '/flow' },
  { label: '制作実績', href: '/works' },
  { label: '会社概要', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
] as const;

// Sample product data
export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  priceRange?: string;
  minLot?: number;
  deliveryDays?: number;
  description: string;
  image?: string;
}

export const CALENDAR_PRODUCTS: Product[] = [
  { id: 'cal-wall-b2', name: 'B2壁掛けカレンダー', category: 'calendar', priceRange: '¥198〜', minLot: 100, deliveryDays: 10, description: '大判B2サイズの壁掛けカレンダー。オフィスや店舗に最適。' },
  { id: 'cal-wall-b3', name: 'B3壁掛けカレンダー', category: 'calendar', priceRange: '¥148〜', minLot: 100, deliveryDays: 10, description: '定番B3サイズ。写真入りオリジナルデザインも対応。' },
  { id: 'cal-wall-a2', name: 'A2壁掛けカレンダー', category: 'calendar', priceRange: '¥220〜', minLot: 100, deliveryDays: 10, description: 'A2サイズの壁掛けカレンダー。高品質オフセット印刷。' },
  { id: 'cal-desk-ring', name: 'リング式卓上カレンダー', category: 'calendar', priceRange: '¥128〜', minLot: 100, deliveryDays: 7, description: 'デスクに最適なリング式卓上カレンダー。' },
  { id: 'cal-desk-case', name: 'ケース式卓上カレンダー', category: 'calendar', priceRange: '¥98〜', minLot: 100, deliveryDays: 7, description: 'クリアケース付きの卓上カレンダー。' },
  { id: 'cal-desk-eco', name: 'エコ卓上カレンダー', category: 'calendar', priceRange: '¥68〜', minLot: 100, deliveryDays: 7, description: '環境に配慮した再生紙使用の卓上カレンダー。' },
  { id: 'cal-poster', name: 'ポスターカレンダー', category: 'calendar', priceRange: '¥58〜', minLot: 200, deliveryDays: 7, description: '1枚もののポスター型カレンダー。年間一覧表示。' },
  { id: 'cal-pocket', name: 'ポケットカレンダー', category: 'calendar', priceRange: '¥18〜', minLot: 500, deliveryDays: 5, description: '財布に入るコンパクトサイズ。名刺サイズのカレンダー。' },
];

export const UCHIWA_PRODUCTS: Product[] = [
  { id: 'uch-paper', name: '紙うちわ', category: 'uchiwa', priceRange: '¥38〜', minLot: 100, deliveryDays: 5, description: 'コストパフォーマンス抜群の紙うちわ。イベント配布に最適。' },
  { id: 'uch-bamboo', name: '竹うちわ', category: 'uchiwa', priceRange: '¥98〜', minLot: 100, deliveryDays: 7, description: '高級感のある竹製うちわ。企業ギフトにも。' },
  { id: 'uch-poly', name: 'ポリうちわ', category: 'uchiwa', priceRange: '¥28〜', minLot: 200, deliveryDays: 5, description: '軽量で丈夫なポリプロピレン製うちわ。' },
  { id: 'uch-mini', name: 'ミニうちわ', category: 'uchiwa', priceRange: '¥25〜', minLot: 200, deliveryDays: 5, description: 'コンパクトなミニサイズ。持ち運びに便利。' },
  { id: 'uch-diecut', name: '変形うちわ', category: 'uchiwa', priceRange: '¥68〜', minLot: 200, deliveryDays: 10, description: 'オリジナル形状にカットした変形うちわ。インパクト大。' },
  { id: 'uch-sensu', name: '扇子', category: 'uchiwa', priceRange: '¥198〜', minLot: 100, deliveryDays: 10, description: '上品な扇子。絹扇子・紙扇子から選べます。' },
];

export const ACRYLIC_PRODUCTS: Product[] = [
  { id: 'acr-stand', name: 'アクリルスタンド', category: 'acrylic', priceRange: '¥198〜', minLot: 50, deliveryDays: 7, description: 'フルカラー印刷のアクリルスタンド。推し活グッズにも。' },
  { id: 'acr-keychain', name: 'アクリルキーホルダー', category: 'acrylic', priceRange: '¥98〜', minLot: 50, deliveryDays: 7, description: 'オリジナルデザインのアクリルキーホルダー。' },
  { id: 'acr-coaster', name: 'アクリルコースター', category: 'acrylic', priceRange: '¥148〜', minLot: 50, deliveryDays: 7, description: '透明感が美しいアクリルコースター。' },
  { id: 'acr-frame', name: 'アクリル写真立て', category: 'acrylic', priceRange: '¥248〜', minLot: 30, deliveryDays: 10, description: 'クリアなアクリル写真立て。記念品に最適。' },
  { id: 'acr-charm', name: 'アクリルチャーム', category: 'acrylic', priceRange: '¥78〜', minLot: 50, deliveryDays: 7, description: 'ストラップ付きアクリルチャーム。バッグアクセサリーに。' },
  { id: 'acr-block', name: 'アクリルブロック', category: 'acrylic', priceRange: '¥398〜', minLot: 30, deliveryDays: 10, description: '厚みのあるアクリルブロック。高級感のあるディスプレイ。' },
];

export const SEAL_PRODUCTS: Product[] = [
  { id: 'seal-name', name: 'お名前シール', category: 'seal', priceRange: '¥38〜', minLot: 100, deliveryDays: 3, description: '入園・入学準備に最適なお名前シール。防水タイプも。' },
  { id: 'seal-parking', name: '駐輪シール', category: 'seal', priceRange: '¥18〜', minLot: 200, deliveryDays: 5, description: 'マンション・施設用の駐輪許可シール。' },
  { id: 'seal-fu', name: '封シール', category: 'seal', priceRange: '¥8〜', minLot: 500, deliveryDays: 3, description: 'DM・封筒用の封シール。ロゴ入りでブランディング。' },
  { id: 'seal-label', name: 'ラベルシール', category: 'seal', priceRange: '¥12〜', minLot: 300, deliveryDays: 5, description: '商品ラベル・管理ラベル。各種素材対応。' },
  { id: 'seal-diecut', name: '型抜きステッカー', category: 'seal', priceRange: '¥48〜', minLot: 100, deliveryDays: 7, description: 'オリジナル形状の型抜きステッカー。ノベルティに人気。' },
  { id: 'seal-sheet', name: 'シートステッカー', category: 'seal', priceRange: '¥58〜', minLot: 100, deliveryDays: 7, description: '1シートに複数デザインを配置。コレクション向け。' },
];
