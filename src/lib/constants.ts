export const SITE_NAME = 'えんぴつはうす';
export const SITE_DESCRIPTION = 'オリジナルカレンダー・うちわ・アクリルグッズ・シールなど、ノベルティ・販促品の企画制作。小ロット100個から対応。';
export const SITE_URL = 'https://www.en-pitsu.com';
export const COMPANY_TEL = '087-884-3724';
export const COMPANY_EMAIL = 'info@en-pitsu.com';
export const COMPANY_ADDRESS = '〒760-0014 香川県高松市中野町2丁目2-6';
export const COMPANY_HQ_ADDRESS = '〒371-0816 群馬県前橋市大友町2丁目1-4';

export const CATEGORIES = [
  {
    id: 'calendar',
    name: 'カレンダー',
    description: 'オリジナル壁掛け・卓上カレンダー 全54種',
    color: '#2563EB',
    icon: '📅',
    href: '/products/calendar',
    image: '/enpitsu-hausu/images/category-calendar.jpg',
  },
  {
    id: 'uchiwa',
    name: 'うちわ・扇子',
    description: '紙うちわ・竹うちわ・ポリうちわ・扇子',
    color: '#22C55E',
    icon: '🪭',
    href: '/products/uchiwa',
    image: '/enpitsu-hausu/images/category-uchiwa.jpg',
  },
  {
    id: 'acrylic',
    name: 'アクリルグッズ',
    description: 'スタンド・キーホルダー・コースター・写真立て',
    color: '#8B5CF6',
    icon: '✨',
    href: '/products/acrylic',
    image: '/enpitsu-hausu/images/category-acrylic.jpg',
  },
  {
    id: 'seal',
    name: 'シール・ステッカー',
    description: 'お名前シール・駐輪シール・型抜きステッカー',
    color: '#F97316',
    icon: '🏷️',
    href: '/products/seal',
    image: '/enpitsu-hausu/images/category-seal.jpg',
  },
  {
    id: 'hygiene',
    name: '衛生用品',
    description: 'ウェットティッシュ・マスク・カイロ・ポケットティッシュ',
    color: '#06B6D4',
    icon: '🧴',
    href: '/products/hygiene',
    image: '/enpitsu-hausu/images/category-hygiene.jpg',
  },
  {
    id: 'towel',
    name: 'タオル・名入れ',
    description: 'フェイスタオル・ハンドタオル・スポーツタオル',
    color: '#EC4899',
    icon: '🧣',
    href: '/products/towel',
    image: '/enpitsu-hausu/images/category-towel.jpg',
  },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];

export const NAV_ITEMS = [
  { label: '商品一覧', href: '/products' },
  { label: 'ご注文の流れ', href: '/flow' },
  { label: '制作実績', href: '/works' },
  { label: '納期カレンダー', href: '/delivery' },
  { label: 'シミュレーター', href: '/simulator' },
  { label: 'デザインガイド', href: '/guide' },
  { label: '会社概要', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
] as const;

// Sample product data
export interface Product {
  id: string;
  name: string;
  slug?: string;
  category: CategoryId;
  priceRange?: string;
  minLot?: number;
  deliveryDays?: number;
  description: string;
  image?: string;
}

export const CALENDAR_PRODUCTS: Product[] = [
  { id: 'cal-wall-b2', name: 'B2壁掛けカレンダー', slug: 'wall-b2', category: 'calendar', priceRange: '¥198〜', minLot: 100, deliveryDays: 10, description: '大判B2サイズの壁掛けカレンダー。オフィスや店舗に最適。' },
  { id: 'cal-wall-b3', name: 'B3壁掛けカレンダー', slug: 'wall-b3', category: 'calendar', priceRange: '¥148〜', minLot: 100, deliveryDays: 10, description: '定番B3サイズ。写真入りオリジナルデザインも対応。' },
  { id: 'cal-wall-a2', name: 'A2壁掛けカレンダー', slug: 'wall-a2', category: 'calendar', priceRange: '¥220〜', minLot: 100, deliveryDays: 10, description: 'A2サイズの壁掛けカレンダー。高品質オフセット印刷。' },
  { id: 'cal-wall-a3', name: 'A3壁掛けカレンダー', slug: 'wall-a3', category: 'calendar', priceRange: '¥128〜', minLot: 100, deliveryDays: 10, description: '家庭にぴったりのA3サイズ壁掛けカレンダー。' },
  { id: 'cal-desk-ring', name: 'リング式卓上カレンダー', slug: 'desk-ring', category: 'calendar', priceRange: '¥128〜', minLot: 100, deliveryDays: 7, description: 'デスクに最適なリング式卓上カレンダー。' },
  { id: 'cal-desk-case', name: 'ケース式卓上カレンダー', slug: 'desk-case', category: 'calendar', priceRange: '¥98〜', minLot: 100, deliveryDays: 7, description: 'クリアケース付きの卓上カレンダー。' },
  { id: 'cal-desk-eco', name: 'エコ卓上カレンダー', slug: 'desk-eco', category: 'calendar', priceRange: '¥68〜', minLot: 100, deliveryDays: 7, description: '環境に配慮した再生紙使用の卓上カレンダー。' },
  { id: 'cal-desk-wide', name: 'ワイド卓上カレンダー', slug: 'desk-wide', category: 'calendar', priceRange: '¥138〜', minLot: 100, deliveryDays: 7, description: '横長ワイドタイプの卓上カレンダー。' },
  { id: 'cal-desk-cube', name: 'キューブ型卓上カレンダー', slug: 'desk-cube', category: 'calendar', priceRange: '¥248〜', minLot: 100, deliveryDays: 10, description: 'インテリアとしても映えるキューブ型カレンダー。' },
  { id: 'cal-poster', name: 'ポスターカレンダー', slug: 'poster', category: 'calendar', priceRange: '¥58〜', minLot: 200, deliveryDays: 7, description: '1枚もののポスター型カレンダー。年間一覧表示。' },
  { id: 'cal-pocket', name: 'ポケットカレンダー', slug: 'pocket', category: 'calendar', priceRange: '¥18〜', minLot: 500, deliveryDays: 5, description: '財布に入るコンパクトサイズ。名刺サイズのカレンダー。' },
  { id: 'cal-daily', name: '日めくりカレンダー', slug: 'daily', category: 'calendar', priceRange: '¥398〜', minLot: 100, deliveryDays: 14, description: '毎日めくる楽しさ。日めくりカレンダー。' },
  { id: 'cal-year', name: '年間カレンダー', slug: 'year', category: 'calendar', priceRange: '¥68〜', minLot: 200, deliveryDays: 7, description: '1枚で1年間を見渡せる年間カレンダー。' },
  { id: 'cal-photo', name: 'フォトカレンダー', slug: 'photo', category: 'calendar', priceRange: '¥298〜', minLot: 100, deliveryDays: 10, description: 'お気に入りの写真で作るオリジナルカレンダー。' },
  { id: 'cal-original', name: '完全オリジナル制作', slug: 'original', category: 'calendar', priceRange: '¥498〜', minLot: 100, deliveryDays: 20, description: 'サイズ・仕様を自由に選べる完全オーダーメイド。' },
  { id: 'cal-bulk', name: '大ロット割引プラン', slug: 'bulk', category: 'calendar', priceRange: '別途見積', minLot: 5000, deliveryDays: 21, description: '5,000部以上の大量注文に特別価格をご提供。' },
];

export const UCHIWA_PRODUCTS: Product[] = [
  { id: 'uch-paper-round', name: '丸型紙うちわ', slug: 'paper-round', category: 'uchiwa', priceRange: '¥38〜', minLot: 100, deliveryDays: 5, description: '定番の丸型紙うちわ。イベント配布の定番。' },
  { id: 'uch-paper-square', name: '角型紙うちわ', slug: 'paper-square', category: 'uchiwa', priceRange: '¥42〜', minLot: 100, deliveryDays: 5, description: '印刷面が広い角型紙うちわ。' },
  { id: 'uch-bamboo', name: '竹うちわ', slug: 'bamboo', category: 'uchiwa', priceRange: '¥98〜', minLot: 100, deliveryDays: 7, description: '高級感のある竹製うちわ。企業ギフトにも。' },
  { id: 'uch-poly', name: 'ポリうちわ', slug: 'poly', category: 'uchiwa', priceRange: '¥28〜', minLot: 200, deliveryDays: 5, description: '軽量で丈夫なポリプロピレン製うちわ。' },
  { id: 'uch-mini', name: 'ミニうちわ', slug: 'mini', category: 'uchiwa', priceRange: '¥25〜', minLot: 200, deliveryDays: 5, description: 'コンパクトなミニサイズ。持ち運びに便利。' },
  { id: 'uch-diecut', name: '変形うちわ', slug: 'diecut', category: 'uchiwa', priceRange: '¥68〜', minLot: 200, deliveryDays: 10, description: 'オリジナル形状にカットした変形うちわ。インパクト大。' },
  { id: 'uch-sensu-silk', name: '絹扇子', slug: 'sensu-silk', category: 'uchiwa', priceRange: '¥298〜', minLot: 100, deliveryDays: 10, description: '上品な絹張りの高級扇子。' },
  { id: 'uch-sensu-paper', name: '紙扇子', slug: 'sensu-paper', category: 'uchiwa', priceRange: '¥198〜', minLot: 100, deliveryDays: 10, description: 'カジュアルに使える紙張りの扇子。' },
  { id: 'uch-plastic-clear', name: 'クリアうちわ', slug: 'plastic-clear', category: 'uchiwa', priceRange: '¥48〜', minLot: 200, deliveryDays: 7, description: '透明素材のクリアうちわ。涼しげなデザインに。' },
];

export const ACRYLIC_PRODUCTS: Product[] = [
  { id: 'acr-stand', name: 'アクリルスタンド', slug: 'stand', category: 'acrylic', priceRange: '¥198〜', minLot: 50, deliveryDays: 7, description: 'フルカラー印刷のアクリルスタンド。推し活グッズにも。' },
  { id: 'acr-keychain', name: 'アクリルキーホルダー', slug: 'keychain', category: 'acrylic', priceRange: '¥98〜', minLot: 50, deliveryDays: 7, description: 'オリジナルデザインのアクリルキーホルダー。' },
  { id: 'acr-coaster', name: 'アクリルコースター', slug: 'coaster', category: 'acrylic', priceRange: '¥148〜', minLot: 50, deliveryDays: 7, description: '透明感が美しいアクリルコースター。' },
  { id: 'acr-frame', name: 'アクリル写真立て', slug: 'frame', category: 'acrylic', priceRange: '¥248〜', minLot: 30, deliveryDays: 10, description: 'クリアなアクリル写真立て。記念品に最適。' },
  { id: 'acr-charm', name: 'アクリルチャーム', slug: 'charm', category: 'acrylic', priceRange: '¥78〜', minLot: 50, deliveryDays: 7, description: 'ストラップ付きアクリルチャーム。バッグアクセサリーに。' },
  { id: 'acr-block', name: 'アクリルブロック', slug: 'block', category: 'acrylic', priceRange: '¥398〜', minLot: 30, deliveryDays: 10, description: '厚みのあるアクリルブロック。高級感のあるディスプレイ。' },
  { id: 'acr-custom', name: 'オーダーメイドアクリル', slug: 'custom', category: 'acrylic', priceRange: '¥348〜', minLot: 30, deliveryDays: 14, description: '形状・サイズ・仕様を自由にカスタマイズ。' },
  { id: 'acr-nameplate', name: 'アクリルネームプレート', slug: 'nameplate', category: 'acrylic', priceRange: '¥298〜', minLot: 10, deliveryDays: 7, description: '受付やデスクに。アクリル製ネームプレート。' },
];

export const SEAL_PRODUCTS: Product[] = [
  { id: 'seal-name', name: 'お名前シール', slug: 'name', category: 'seal', priceRange: '¥38〜', minLot: 100, deliveryDays: 3, description: '入園・入学準備に最適なお名前シール。防水タイプも。' },
  { id: 'seal-parking', name: '駐輪シール', slug: 'parking', category: 'seal', priceRange: '¥18〜', minLot: 200, deliveryDays: 5, description: 'マンション・施設用の駐輪許可シール。' },
  { id: 'seal-fu', name: '封シール', slug: 'seal-sticker', category: 'seal', priceRange: '¥8〜', minLot: 500, deliveryDays: 3, description: 'DM・封筒用の封シール。ロゴ入りでブランディング。' },
  { id: 'seal-label', name: 'ラベルシール', slug: 'label', category: 'seal', priceRange: '¥12〜', minLot: 300, deliveryDays: 5, description: '商品ラベル・管理ラベル。各種素材対応。' },
  { id: 'seal-diecut', name: '型抜きステッカー', slug: 'diecut', category: 'seal', priceRange: '¥48〜', minLot: 100, deliveryDays: 7, description: 'オリジナル形状の型抜きステッカー。ノベルティに人気。' },
  { id: 'seal-sheet', name: 'シートステッカー', slug: 'sheet', category: 'seal', priceRange: '¥58〜', minLot: 100, deliveryDays: 7, description: '1シートに複数デザインを配置。コレクション向け。' },
  { id: 'seal-hologram', name: 'ホログラムシール', slug: 'hologram', category: 'seal', priceRange: '¥58〜', minLot: 200, deliveryDays: 7, description: 'キラキラ輝くホログラム素材のシール。' },
];

export const HYGIENE_PRODUCTS: Product[] = [
  { id: 'hyg-wet-tissue', name: 'ウェットティッシュ', slug: 'wet-tissue', category: 'hygiene', priceRange: '¥88〜', minLot: 100, deliveryDays: 5, description: 'オリジナルラベルのウェットティッシュ。販促配布に。' },
  { id: 'hyg-box-tissue', name: 'BOXティッシュ', slug: 'box-tissue', category: 'hygiene', priceRange: '¥148〜', minLot: 100, deliveryDays: 7, description: 'オリジナルBOXティッシュ。企業PR効果が長続き。' },
  { id: 'hyg-pocket-tissue', name: 'ポケットティッシュ', slug: 'pocket-tissue', category: 'hygiene', priceRange: '¥12〜', minLot: 500, deliveryDays: 3, description: '販促の王道、ポケットティッシュ配り。' },
  { id: 'hyg-mask', name: 'オリジナルマスク', slug: 'mask', category: 'hygiene', priceRange: '¥68〜', minLot: 100, deliveryDays: 5, description: '名入れ・ロゴ入りのオリジナルマスク。' },
  { id: 'hyg-kairo', name: '使い捨てカイロ', slug: 'kairo', category: 'hygiene', priceRange: '¥48〜', minLot: 100, deliveryDays: 5, description: '冬の販促に最適な名入れカイロ。' },
  { id: 'hyg-sanitizer', name: '除菌グッズ', slug: 'sanitizer', category: 'hygiene', priceRange: '¥128〜', minLot: 100, deliveryDays: 7, description: '除菌ジェル・除菌スプレーの名入れ対応。' },
  { id: 'hyg-hand-soap', name: 'ハンドソープ', slug: 'hand-soap', category: 'hygiene', priceRange: '¥198〜', minLot: 100, deliveryDays: 10, description: 'オリジナルラベルのハンドソープ。' },
];

export const TOWEL_PRODUCTS: Product[] = [
  { id: 'twl-face', name: 'フェイスタオル', slug: 'face', category: 'towel', priceRange: '¥398〜', minLot: 50, deliveryDays: 10, description: '名入れ対応のフェイスタオル。粗品・記念品に。' },
  { id: 'twl-hand', name: 'ハンドタオル', slug: 'hand', category: 'towel', priceRange: '¥198〜', minLot: 50, deliveryDays: 10, description: '持ち運びに便利なハンドタオル。名入れ対応。' },
  { id: 'twl-sports', name: 'スポーツタオル', slug: 'sports', category: 'towel', priceRange: '¥498〜', minLot: 50, deliveryDays: 10, description: 'スポーツイベント・大会記念に。マフラータオル。' },
  { id: 'twl-bath', name: 'バスタオル', slug: 'bath', category: 'towel', priceRange: '¥1,280〜', minLot: 30, deliveryDays: 14, description: '高級感のあるバスタオル。名入れで特別なギフトに。' },
  { id: 'twl-imprint', name: '名入れ商品全般', slug: 'imprint', category: 'towel', priceRange: '要見積', minLot: 10, deliveryDays: 14, description: 'タオル以外も含む名入れ商品の総合案内。' },
];
