// Full product detail data for all categories

export interface ProductSpec {
  label: string;
  value: string;
}

export interface PriceRow {
  quantity: string;
  unitPrice: string;
  totalPrice: string;
}

export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  description: string;
  longDescription: string;
  image?: string;
  specs: ProductSpec[];
  priceTable: PriceRow[];
  minLot: number;
  deliveryDays: string;
  features: string[];
  relatedSlugs: string[];
}

// ============================================================
// CALENDAR PRODUCTS (16 detail pages)
// ============================================================
export const calendarProducts: ProductDetail[] = [
  {
    id: 'cal-wall-b2', slug: 'wall-b2', name: 'B2壁掛けカレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '大判B2サイズの壁掛けカレンダー。オフィスや店舗に最適。',
    longDescription: 'B2サイズ（515×728mm）の大判壁掛けカレンダーです。遠くからでも日付が見やすく、オフィスや店舗での掲示に最適。オフセット印刷による高品質な仕上がりで、企業ロゴや写真をフルカラーで美しく再現します。',
    specs: [
      { label: 'サイズ', value: 'B2（515×728mm）' },
      { label: 'ページ数', value: '13枚（表紙+12ヶ月）' },
      { label: '用紙', value: 'コート紙 135kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '綴じ方', value: 'ホットメルト綴じ' },
      { label: '吊り下げ', value: '金具付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥198', totalPrice: '¥19,800' },
      { quantity: '300部', unitPrice: '¥148', totalPrice: '¥44,400' },
      { quantity: '500部', unitPrice: '¥118', totalPrice: '¥59,000' },
      { quantity: '1,000部', unitPrice: '¥88', totalPrice: '¥88,000' },
      { quantity: '3,000部', unitPrice: '¥68', totalPrice: '¥204,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['フルカラー印刷', '金具付き', '企業ロゴ対応', '写真入りOK'],
    relatedSlugs: ['wall-b3', 'wall-a2', 'poster'],
  },
  {
    id: 'cal-wall-b3', slug: 'wall-b3', name: 'B3壁掛けカレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '定番B3サイズ。写真入りオリジナルデザインも対応。',
    longDescription: 'B3サイズ（364×515mm）の壁掛けカレンダーです。最も人気の定番サイズで、家庭にもオフィスにもマッチします。写真やイラストを使ったオリジナルデザインに対応。',
    specs: [
      { label: 'サイズ', value: 'B3（364×515mm）' },
      { label: 'ページ数', value: '13枚（表紙+12ヶ月）' },
      { label: '用紙', value: 'コート紙 110kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '綴じ方', value: 'ホットメルト綴じ' },
      { label: '吊り下げ', value: '金具付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥148', totalPrice: '¥14,800' },
      { quantity: '300部', unitPrice: '¥108', totalPrice: '¥32,400' },
      { quantity: '500部', unitPrice: '¥88', totalPrice: '¥44,000' },
      { quantity: '1,000部', unitPrice: '¥68', totalPrice: '¥68,000' },
      { quantity: '3,000部', unitPrice: '¥48', totalPrice: '¥144,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['定番サイズ', 'フルカラー印刷', '写真入りOK', '金具付き'],
    relatedSlugs: ['wall-b2', 'wall-a2', 'desk-ring'],
  },
  {
    id: 'cal-wall-a2', slug: 'wall-a2', name: 'A2壁掛けカレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: 'A2サイズの壁掛けカレンダー。高品質オフセット印刷。',
    longDescription: 'A2サイズ（420×594mm）の壁掛けカレンダーです。B3より一回り大きく、B2よりコンパクト。絶妙なサイズ感で視認性とスペースのバランスに優れています。',
    specs: [
      { label: 'サイズ', value: 'A2（420×594mm）' },
      { label: 'ページ数', value: '13枚（表紙+12ヶ月）' },
      { label: '用紙', value: 'コート紙 135kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '綴じ方', value: 'ホットメルト綴じ' },
      { label: '吊り下げ', value: '金具付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥220', totalPrice: '¥22,000' },
      { quantity: '300部', unitPrice: '¥168', totalPrice: '¥50,400' },
      { quantity: '500部', unitPrice: '¥138', totalPrice: '¥69,000' },
      { quantity: '1,000部', unitPrice: '¥98', totalPrice: '¥98,000' },
      { quantity: '3,000部', unitPrice: '¥78', totalPrice: '¥234,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['A2大判サイズ', 'フルカラー印刷', '金具付き', '高品質オフセット'],
    relatedSlugs: ['wall-b2', 'wall-b3', 'poster'],
  },
  {
    id: 'cal-desk-ring', slug: 'desk-ring', name: 'リング式卓上カレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: 'デスクに最適なリング式卓上カレンダー。',
    longDescription: 'リング綴じの卓上カレンダーです。めくりやすく、デスクワークのお供に最適。コンパクトながらメモスペースも確保したデザイン。企業名やロゴを入れて年末年始のご挨拶品に。',
    specs: [
      { label: 'サイズ', value: '148×180mm（使用時）' },
      { label: 'ページ数', value: '14枚（表紙+裏表紙+12ヶ月）' },
      { label: '用紙', value: 'マットコート紙 180kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '綴じ方', value: 'ツインリング綴じ' },
      { label: '台紙', value: '厚紙台座付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥128', totalPrice: '¥12,800' },
      { quantity: '300部', unitPrice: '¥98', totalPrice: '¥29,400' },
      { quantity: '500部', unitPrice: '¥78', totalPrice: '¥39,000' },
      { quantity: '1,000部', unitPrice: '¥58', totalPrice: '¥58,000' },
      { quantity: '3,000部', unitPrice: '¥42', totalPrice: '¥126,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['めくりやすいリング式', 'メモスペース付き', '台座付き', 'ロゴ印刷対応'],
    relatedSlugs: ['desk-case', 'desk-eco', 'wall-b3'],
  },
  {
    id: 'cal-desk-case', slug: 'desk-case', name: 'ケース式卓上カレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: 'クリアケース付きの卓上カレンダー。',
    longDescription: '透明クリアケースに差し込むタイプの卓上カレンダーです。ケースがスタンドになるため自立性が高く、安定した設置が可能。カードを入れ替えるだけで月替わり。',
    specs: [
      { label: 'サイズ', value: '185×135mm' },
      { label: 'ページ数', value: '13枚' },
      { label: '用紙', value: 'コート紙 135kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: 'ケース', value: 'PP透明ケース' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥98', totalPrice: '¥9,800' },
      { quantity: '300部', unitPrice: '¥78', totalPrice: '¥23,400' },
      { quantity: '500部', unitPrice: '¥58', totalPrice: '¥29,000' },
      { quantity: '1,000部', unitPrice: '¥42', totalPrice: '¥42,000' },
      { quantity: '3,000部', unitPrice: '¥32', totalPrice: '¥96,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['透明ケース付き', '自立式', 'コンパクト', '入れ替え簡単'],
    relatedSlugs: ['desk-ring', 'desk-eco', 'pocket'],
  },
  {
    id: 'cal-desk-eco', slug: 'desk-eco', name: 'エコ卓上カレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '環境に配慮した再生紙使用の卓上カレンダー。',
    longDescription: '再生紙を使用した環境配慮型の卓上カレンダーです。SDGsやエコを重視する企業のノベルティに最適。ナチュラルな風合いが温かみのある印象を与えます。',
    specs: [
      { label: 'サイズ', value: '148×180mm' },
      { label: 'ページ数', value: '14枚' },
      { label: '用紙', value: '再生紙 180kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '綴じ方', value: 'ツインリング綴じ' },
      { label: 'エコ', value: 'FSC認証紙使用' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥68', totalPrice: '¥6,800' },
      { quantity: '300部', unitPrice: '¥52', totalPrice: '¥15,600' },
      { quantity: '500部', unitPrice: '¥42', totalPrice: '¥21,000' },
      { quantity: '1,000部', unitPrice: '¥32', totalPrice: '¥32,000' },
      { quantity: '3,000部', unitPrice: '¥25', totalPrice: '¥75,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['再生紙使用', 'FSC認証', 'SDGs対応', 'ナチュラルな風合い'],
    relatedSlugs: ['desk-ring', 'desk-case', 'wall-b3'],
  },
  {
    id: 'cal-poster', slug: 'poster', name: 'ポスターカレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '1枚もののポスター型カレンダー。年間一覧表示。',
    longDescription: '1枚で12ヶ月を一覧表示するポスター型カレンダーです。壁に貼るだけで年間スケジュールを俯瞰できます。大ロットでのコストパフォーマンスに優れ、販促配布に最適。',
    specs: [
      { label: 'サイズ', value: 'B2（515×728mm）' },
      { label: '枚数', value: '1枚（両面印刷も可）' },
      { label: '用紙', value: 'コート紙 110kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
    ],
    priceTable: [
      { quantity: '200部', unitPrice: '¥58', totalPrice: '¥11,600' },
      { quantity: '500部', unitPrice: '¥38', totalPrice: '¥19,000' },
      { quantity: '1,000部', unitPrice: '¥28', totalPrice: '¥28,000' },
      { quantity: '3,000部', unitPrice: '¥18', totalPrice: '¥54,000' },
    ],
    minLot: 200, deliveryDays: '約7営業日',
    features: ['1枚で年間一覧', 'コスパ抜群', '大ロット割引', '壁貼りタイプ'],
    relatedSlugs: ['wall-b2', 'year', 'pocket'],
  },
  {
    id: 'cal-pocket', slug: 'pocket', name: 'ポケットカレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '財布に入るコンパクトサイズ。名刺サイズのカレンダー。',
    longDescription: '名刺サイズ（91×55mm）のポケットカレンダーです。財布やカードケースに入れて持ち歩けるコンパクトサイズ。大量配布のノベルティやDM同封に最適。',
    specs: [
      { label: 'サイズ', value: '91×55mm（名刺サイズ）' },
      { label: '用紙', value: 'コート紙 220kg' },
      { label: '印刷', value: 'オフセット フルカラー（両面）' },
      { label: '加工', value: 'PP加工オプションあり' },
    ],
    priceTable: [
      { quantity: '500部', unitPrice: '¥18', totalPrice: '¥9,000' },
      { quantity: '1,000部', unitPrice: '¥12', totalPrice: '¥12,000' },
      { quantity: '3,000部', unitPrice: '¥8', totalPrice: '¥24,000' },
      { quantity: '5,000部', unitPrice: '¥6', totalPrice: '¥30,000' },
    ],
    minLot: 500, deliveryDays: '約5営業日',
    features: ['名刺サイズ', '財布に入る', '大量配布向き', 'PP加工対応'],
    relatedSlugs: ['poster', 'desk-case', 'year'],
  },
  {
    id: 'cal-daily', slug: 'daily', name: '日めくりカレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '毎日めくる楽しさ。日めくりカレンダー。',
    longDescription: '1日1ページの日めくりカレンダーです。毎日めくる楽しさと、日々の格言やメッセージを添えられるのが魅力。受付やカウンターに設置して毎日の話題づくりに。',
    specs: [
      { label: 'サイズ', value: '105×148mm（A6相当）' },
      { label: 'ページ数', value: '365枚+表紙' },
      { label: '用紙', value: '上質紙 70kg' },
      { label: '印刷', value: 'オフセット 2色' },
      { label: '綴じ方', value: '天のり綴じ' },
      { label: '台座', value: '厚紙台座付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥398', totalPrice: '¥39,800' },
      { quantity: '300部', unitPrice: '¥298', totalPrice: '¥89,400' },
      { quantity: '500部', unitPrice: '¥248', totalPrice: '¥124,000' },
      { quantity: '1,000部', unitPrice: '¥198', totalPrice: '¥198,000' },
    ],
    minLot: 100, deliveryDays: '約14営業日',
    features: ['365日分', '格言・メッセージ対応', '台座付き', '受付に最適'],
    relatedSlugs: ['desk-ring', 'year', 'photo'],
  },
  {
    id: 'cal-year', slug: 'year', name: '年間カレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '1枚で1年間を見渡せる年間カレンダー。',
    longDescription: '12ヶ月を1枚にレイアウトした年間カレンダーです。スケジュール管理や予定確認に便利。デスクマット型やポスター型など、用途に合わせた形式を選べます。',
    specs: [
      { label: 'サイズ', value: 'A2（420×594mm）' },
      { label: '枚数', value: '1枚' },
      { label: '用紙', value: 'コート紙 135kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: 'オプション', value: 'PP加工・マット加工' },
    ],
    priceTable: [
      { quantity: '200部', unitPrice: '¥68', totalPrice: '¥13,600' },
      { quantity: '500部', unitPrice: '¥48', totalPrice: '¥24,000' },
      { quantity: '1,000部', unitPrice: '¥32', totalPrice: '¥32,000' },
      { quantity: '3,000部', unitPrice: '¥22', totalPrice: '¥66,000' },
    ],
    minLot: 200, deliveryDays: '約7営業日',
    features: ['年間一覧', 'スケジュール管理に', 'PP加工対応', 'デスクマット型も可'],
    relatedSlugs: ['poster', 'pocket', 'wall-b2'],
  },
  {
    id: 'cal-photo', slug: 'photo', name: 'フォトカレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: 'お気に入りの写真で作るオリジナルカレンダー。',
    longDescription: '写真を大きくレイアウトしたフォトカレンダーです。風景写真、商品写真、ペット写真など、お気に入りの写真でオリジナルカレンダーを制作。高品質オフセット印刷で写真の色彩を美しく再現。',
    specs: [
      { label: 'サイズ', value: 'A3（297×420mm）' },
      { label: 'ページ数', value: '13枚（表紙+12ヶ月）' },
      { label: '用紙', value: 'コート紙 135kg' },
      { label: '印刷', value: 'オフセット フルカラー（高精細）' },
      { label: '綴じ方', value: 'ツインリング綴じ' },
      { label: '吊り下げ', value: '金具付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥298', totalPrice: '¥29,800' },
      { quantity: '300部', unitPrice: '¥228', totalPrice: '¥68,400' },
      { quantity: '500部', unitPrice: '¥178', totalPrice: '¥89,000' },
      { quantity: '1,000部', unitPrice: '¥138', totalPrice: '¥138,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['高精細印刷', '写真が映える', 'ギフトに最適', 'リング綴じ'],
    relatedSlugs: ['wall-b2', 'original', 'wall-a2'],
  },
  {
    id: 'cal-original', slug: 'original', name: '完全オリジナル制作', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: 'サイズ・仕様を自由に選べる完全オーダーメイド。',
    longDescription: 'サイズ・用紙・綴じ方・ページ数など、すべての仕様をお好みでカスタマイズできる完全オリジナルカレンダーです。他にはない特別なカレンダーを制作したい方に。専任デザイナーがサポートします。',
    specs: [
      { label: 'サイズ', value: '自由（要相談）' },
      { label: 'ページ数', value: '自由' },
      { label: '用紙', value: '各種対応' },
      { label: '印刷', value: 'オフセット/オンデマンド' },
      { label: '綴じ方', value: 'リング/ホットメルト/中綴じ等' },
      { label: 'デザイン', value: 'デザイナーサポート付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥498〜', totalPrice: '¥49,800〜' },
      { quantity: '300部', unitPrice: '¥348〜', totalPrice: '¥104,400〜' },
      { quantity: '500部', unitPrice: '¥278〜', totalPrice: '¥139,000〜' },
      { quantity: '1,000部', unitPrice: '¥198〜', totalPrice: '¥198,000〜' },
    ],
    minLot: 100, deliveryDays: '約14〜20営業日',
    features: ['完全カスタマイズ', 'デザイナーサポート', '自由な仕様', '特殊加工対応'],
    relatedSlugs: ['photo', 'wall-b2', 'bulk'],
  },
  {
    id: 'cal-bulk', slug: 'bulk', name: '大ロット割引プラン', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '5,000部以上の大量注文に特別価格をご提供。',
    longDescription: '5,000部以上の大ロット注文に対応した特別割引プランです。企業の年末挨拶用や全国配布用に。数量が多いほどお得に。まずはお見積もりからご相談ください。',
    specs: [
      { label: '対象', value: '5,000部以上のご注文' },
      { label: '対応商品', value: '壁掛け・卓上・ポスター全種' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '特典', value: 'デザイン費無料' },
      { label: '納品', value: '分納対応可' },
    ],
    priceTable: [
      { quantity: '5,000部', unitPrice: '別途見積', totalPrice: '別途見積' },
      { quantity: '10,000部', unitPrice: '別途見積', totalPrice: '別途見積' },
      { quantity: '30,000部', unitPrice: '別途見積', totalPrice: '別途見積' },
      { quantity: '50,000部', unitPrice: '別途見積', totalPrice: '別途見積' },
    ],
    minLot: 5000, deliveryDays: '約14〜21営業日',
    features: ['大量割引', 'デザイン費無料', '分納対応', '専任担当'],
    relatedSlugs: ['wall-b3', 'desk-ring', 'original'],
  },
  {
    id: 'cal-wall-a3', slug: 'wall-a3', name: 'A3壁掛けカレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '家庭にぴったりのA3サイズ壁掛けカレンダー。',
    longDescription: 'A3サイズ（297×420mm）の壁掛けカレンダーです。家庭のリビングや寝室に最適なサイズ。コンパクトながらも見やすい日付レイアウト。粗品やお年賀に最適です。',
    specs: [
      { label: 'サイズ', value: 'A3（297×420mm）' },
      { label: 'ページ数', value: '13枚' },
      { label: '用紙', value: 'コート紙 110kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '綴じ方', value: 'ホットメルト綴じ' },
      { label: '吊り下げ', value: '金具付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥128', totalPrice: '¥12,800' },
      { quantity: '300部', unitPrice: '¥88', totalPrice: '¥26,400' },
      { quantity: '500部', unitPrice: '¥68', totalPrice: '¥34,000' },
      { quantity: '1,000部', unitPrice: '¥52', totalPrice: '¥52,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['家庭向けサイズ', 'お年賀に最適', 'フルカラー', '金具付き'],
    relatedSlugs: ['wall-b3', 'wall-b2', 'desk-ring'],
  },
  {
    id: 'cal-desk-wide', slug: 'desk-wide', name: 'ワイド卓上カレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: '横長ワイドタイプの卓上カレンダー。',
    longDescription: 'モニター下に置ける横長ワイドタイプの卓上カレンダーです。デスクのスペースを有効活用。3ヶ月表示タイプで前後の月も確認しやすい設計。',
    specs: [
      { label: 'サイズ', value: '250×100mm（横長）' },
      { label: 'ページ数', value: '14枚' },
      { label: '用紙', value: 'マットコート紙 180kg' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '綴じ方', value: 'ツインリング綴じ' },
      { label: '台座', value: '厚紙台座付き' },
    ],
    priceTable: [
      { quantity: '100部', unitPrice: '¥138', totalPrice: '¥13,800' },
      { quantity: '300部', unitPrice: '¥108', totalPrice: '¥32,400' },
      { quantity: '500部', unitPrice: '¥88', totalPrice: '¥44,000' },
      { quantity: '1,000部', unitPrice: '¥68', totalPrice: '¥68,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['横長ワイド', '3ヶ月表示', 'モニター下に最適', 'メモスペース付き'],
    relatedSlugs: ['desk-ring', 'desk-case', 'desk-eco'],
  },
  {
    id: 'cal-desk-cube', slug: 'desk-cube', name: 'キューブ型卓上カレンダー', category: 'calendar', categoryLabel: 'カレンダー', categoryColor: '#2563EB',
    description: 'インテリアとしても映えるキューブ型カレンダー。',
    longDescription: 'サイコロのような立体キューブ型の卓上カレンダーです。4面に月のカレンダーを印刷し、回転させて使います。デスクのアクセントとしてもおしゃれ。話題性のあるノベルティ。',
    specs: [
      { label: 'サイズ', value: '80×80×80mm' },
      { label: '面数', value: '4面（3ヶ月×4面＝12ヶ月）' },
      { label: '素材', value: '厚紙 350kg + PP加工' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '組立', value: '組立式（糊付け済み）' },
    ],
    priceTable: [
      { quantity: '100個', unitPrice: '¥248', totalPrice: '¥24,800' },
      { quantity: '300個', unitPrice: '¥198', totalPrice: '¥59,400' },
      { quantity: '500個', unitPrice: '¥168', totalPrice: '¥84,000' },
      { quantity: '1,000個', unitPrice: '¥128', totalPrice: '¥128,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['ユニークな立体型', 'インテリアに', '話題性抜群', '4面印刷'],
    relatedSlugs: ['desk-ring', 'desk-case', 'original'],
  },
];

// ============================================================
// UCHIWA PRODUCTS (9 detail pages)
// ============================================================
export const uchiwaProducts: ProductDetail[] = [
  {
    id: 'uch-paper-round', slug: 'paper-round', name: '丸型紙うちわ', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: '定番の丸型紙うちわ。イベント配布の定番。',
    longDescription: '最も一般的な丸型の紙うちわです。レギュラーサイズで持ちやすく、イベント・お祭り・販促配布に最適。フルカラー印刷で両面デザイン可能。',
    specs: [
      { label: '形状', value: '丸型（レギュラー）' },
      { label: 'サイズ', value: '約240×345mm（柄含む）' },
      { label: '素材', value: '紙＋PP骨' },
      { label: '印刷', value: 'オフセット フルカラー両面' },
    ],
    priceTable: [
      { quantity: '100本', unitPrice: '¥38', totalPrice: '¥3,800' },
      { quantity: '300本', unitPrice: '¥28', totalPrice: '¥8,400' },
      { quantity: '500本', unitPrice: '¥22', totalPrice: '¥11,000' },
      { quantity: '1,000本', unitPrice: '¥18', totalPrice: '¥18,000' },
    ],
    minLot: 100, deliveryDays: '約5営業日',
    features: ['両面フルカラー', 'コスパ抜群', 'イベント定番', '軽量'],
    relatedSlugs: ['paper-square', 'poly', 'mini'],
  },
  {
    id: 'uch-paper-square', slug: 'paper-square', name: '角型紙うちわ', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: '印刷面が広い角型紙うちわ。情報量を多く載せたい時に。',
    longDescription: '角型（スクエア）の紙うちわです。丸型に比べて印刷面が広く、地図やメニュー、タイムテーブルなど情報量の多いデザインに向いています。',
    specs: [
      { label: '形状', value: '角型（スクエア）' },
      { label: 'サイズ', value: '約210×297mm（柄含む345mm）' },
      { label: '素材', value: '紙＋PP骨' },
      { label: '印刷', value: 'オフセット フルカラー両面' },
    ],
    priceTable: [
      { quantity: '100本', unitPrice: '¥42', totalPrice: '¥4,200' },
      { quantity: '300本', unitPrice: '¥32', totalPrice: '¥9,600' },
      { quantity: '500本', unitPrice: '¥25', totalPrice: '¥12,500' },
      { quantity: '1,000本', unitPrice: '¥20', totalPrice: '¥20,000' },
    ],
    minLot: 100, deliveryDays: '約5営業日',
    features: ['広い印刷面', '情報量◎', '両面フルカラー', 'メニュー表にも'],
    relatedSlugs: ['paper-round', 'diecut', 'poly'],
  },
  {
    id: 'uch-bamboo', slug: 'bamboo', name: '竹うちわ', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: '高級感のある竹製うちわ。企業ギフトにも。',
    longDescription: '天然竹の骨組みを使用した本格的な竹うちわです。和の風情と高級感があり、旅館・料亭・和風イベントに最適。企業ギフトやVIP向けノベルティとしても人気。',
    specs: [
      { label: '形状', value: '丸型' },
      { label: 'サイズ', value: '約240×380mm' },
      { label: '骨', value: '天然竹' },
      { label: '面', value: '和紙（片面印刷）' },
      { label: '印刷', value: 'シルクスクリーン or オフセット' },
    ],
    priceTable: [
      { quantity: '100本', unitPrice: '¥98', totalPrice: '¥9,800' },
      { quantity: '300本', unitPrice: '¥78', totalPrice: '¥23,400' },
      { quantity: '500本', unitPrice: '¥68', totalPrice: '¥34,000' },
      { quantity: '1,000本', unitPrice: '¥55', totalPrice: '¥55,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['天然竹使用', '和の風情', '高級感', 'ギフト対応'],
    relatedSlugs: ['sensu-silk', 'sensu-paper', 'paper-round'],
  },
  {
    id: 'uch-poly', slug: 'poly', name: 'ポリうちわ', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: '軽量で丈夫なポリプロピレン製うちわ。',
    longDescription: 'ポリプロピレン（PP）素材の丈夫なうちわです。水に強く、屋外イベントやプールサイドでの配布にも安心。クリアタイプや蛍光色などバリエーション豊富。',
    specs: [
      { label: '形状', value: '丸型' },
      { label: 'サイズ', value: '約200×320mm' },
      { label: '素材', value: 'ポリプロピレン（PP）' },
      { label: '印刷', value: 'シルクスクリーン フルカラー' },
      { label: 'オプション', value: 'クリア・蛍光色対応' },
    ],
    priceTable: [
      { quantity: '200本', unitPrice: '¥28', totalPrice: '¥5,600' },
      { quantity: '500本', unitPrice: '¥22', totalPrice: '¥11,000' },
      { quantity: '1,000本', unitPrice: '¥16', totalPrice: '¥16,000' },
      { quantity: '3,000本', unitPrice: '¥12', totalPrice: '¥36,000' },
    ],
    minLot: 200, deliveryDays: '約5営業日',
    features: ['水に強い', '丈夫', 'クリアタイプあり', '蛍光色対応'],
    relatedSlugs: ['paper-round', 'mini', 'diecut'],
  },
  {
    id: 'uch-mini', slug: 'mini', name: 'ミニうちわ', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: 'コンパクトなミニサイズ。持ち運びに便利。',
    longDescription: '手のひらサイズのミニうちわです。バッグに入れて持ち運べるコンパクトさが魅力。アイドルイベントやライブグッズとしても大人気。推し活グッズに最適。',
    specs: [
      { label: '形状', value: '丸型（ミニ）' },
      { label: 'サイズ', value: '約140×240mm' },
      { label: '素材', value: '紙＋PP骨' },
      { label: '印刷', value: 'オフセット フルカラー両面' },
    ],
    priceTable: [
      { quantity: '200本', unitPrice: '¥25', totalPrice: '¥5,000' },
      { quantity: '500本', unitPrice: '¥18', totalPrice: '¥9,000' },
      { quantity: '1,000本', unitPrice: '¥14', totalPrice: '¥14,000' },
      { quantity: '3,000本', unitPrice: '¥10', totalPrice: '¥30,000' },
    ],
    minLot: 200, deliveryDays: '約5営業日',
    features: ['手のひらサイズ', '推し活に', 'バッグに入る', '両面印刷'],
    relatedSlugs: ['paper-round', 'diecut', 'poly'],
  },
  {
    id: 'uch-diecut', slug: 'diecut', name: '変形うちわ', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: 'オリジナル形状にカットした変形うちわ。インパクト大。',
    longDescription: 'キャラクター型や商品型など、オリジナル形状にカットした変形うちわです。他にはない形で圧倒的なインパクト。SNS映えも抜群で拡散効果が期待できます。',
    specs: [
      { label: '形状', value: 'オリジナル型抜き' },
      { label: 'サイズ', value: '最大300×400mm以内' },
      { label: '素材', value: '厚紙＋PP骨' },
      { label: '印刷', value: 'オフセット フルカラー両面' },
      { label: '型', value: '型代別途（初回のみ）' },
    ],
    priceTable: [
      { quantity: '200本', unitPrice: '¥68', totalPrice: '¥13,600' },
      { quantity: '500本', unitPrice: '¥48', totalPrice: '¥24,000' },
      { quantity: '1,000本', unitPrice: '¥38', totalPrice: '¥38,000' },
      { quantity: '3,000本', unitPrice: '¥28', totalPrice: '¥84,000' },
    ],
    minLot: 200, deliveryDays: '約10営業日',
    features: ['オリジナル形状', 'SNS映え', 'インパクト大', 'キャラ型対応'],
    relatedSlugs: ['paper-round', 'mini', 'paper-square'],
  },
  {
    id: 'uch-sensu-silk', slug: 'sensu-silk', name: '絹扇子', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: '上品な絹張りの高級扇子。',
    longDescription: '絹（シルク）張りの高級扇子です。上品な光沢と手触りで、記念品や贈答品に最適。名入れ（箔押し）にも対応し、特別なギフトとして喜ばれます。',
    specs: [
      { label: '素材', value: '絹（シルク）+ 竹骨' },
      { label: 'サイズ', value: '約210mm（7寸）' },
      { label: '印刷', value: '箔押し or シルクスクリーン' },
      { label: '付属', value: '扇子袋付き（オプション）' },
    ],
    priceTable: [
      { quantity: '100本', unitPrice: '¥298', totalPrice: '¥29,800' },
      { quantity: '300本', unitPrice: '¥248', totalPrice: '¥74,400' },
      { quantity: '500本', unitPrice: '¥198', totalPrice: '¥99,000' },
      { quantity: '1,000本', unitPrice: '¥168', totalPrice: '¥168,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['絹張り', '箔押し対応', '扇子袋付き', '贈答品に最適'],
    relatedSlugs: ['sensu-paper', 'bamboo', 'paper-round'],
  },
  {
    id: 'uch-sensu-paper', slug: 'sensu-paper', name: '紙扇子', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: 'カジュアルに使える紙張りの扇子。',
    longDescription: '紙張りの扇子です。絹扇子よりリーズナブルで、フルカラー印刷が可能。カジュアルなイベントや夏の販促品に最適。和風デザインはもちろん、ポップなデザインにも対応。',
    specs: [
      { label: '素材', value: '紙 + 竹骨' },
      { label: 'サイズ', value: '約210mm（7寸）' },
      { label: '印刷', value: 'オフセット フルカラー' },
      { label: '付属', value: '扇子袋付き（オプション）' },
    ],
    priceTable: [
      { quantity: '100本', unitPrice: '¥198', totalPrice: '¥19,800' },
      { quantity: '300本', unitPrice: '¥158', totalPrice: '¥47,400' },
      { quantity: '500本', unitPrice: '¥128', totalPrice: '¥64,000' },
      { quantity: '1,000本', unitPrice: '¥98', totalPrice: '¥98,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['フルカラー印刷', 'リーズナブル', '和風にもポップにも', '扇子袋対応'],
    relatedSlugs: ['sensu-silk', 'bamboo', 'paper-round'],
  },
  {
    id: 'uch-plastic-clear', slug: 'plastic-clear', name: 'クリアうちわ', category: 'uchiwa', categoryLabel: 'うちわ・扇子', categoryColor: '#22C55E',
    description: '透明素材のクリアうちわ。涼しげなデザインに。',
    longDescription: '透明なPP素材を使ったクリアうちわです。涼しげな見た目とデザインの透け感が特徴。白引きとの組み合わせで独特の表現が可能。夏のイベントにぴったり。',
    specs: [
      { label: '形状', value: '丸型' },
      { label: 'サイズ', value: '約200×320mm' },
      { label: '素材', value: '透明PP' },
      { label: '印刷', value: 'シルクスクリーン（白引き+カラー）' },
    ],
    priceTable: [
      { quantity: '200本', unitPrice: '¥48', totalPrice: '¥9,600' },
      { quantity: '500本', unitPrice: '¥35', totalPrice: '¥17,500' },
      { quantity: '1,000本', unitPrice: '¥28', totalPrice: '¥28,000' },
      { quantity: '3,000本', unitPrice: '¥20', totalPrice: '¥60,000' },
    ],
    minLot: 200, deliveryDays: '約7営業日',
    features: ['透明素材', '涼しげデザイン', '白引き対応', 'SNS映え'],
    relatedSlugs: ['poly', 'mini', 'diecut'],
  },
];

// ============================================================
// ACRYLIC PRODUCTS (8 detail pages)
// ============================================================
export const acrylicProducts: ProductDetail[] = [
  {
    id: 'acr-stand', slug: 'stand', name: 'アクリルスタンド', category: 'acrylic', categoryLabel: 'アクリルグッズ', categoryColor: '#8B5CF6',
    description: 'フルカラー印刷のアクリルスタンド。推し活グッズにも。',
    longDescription: 'UVインクジェット印刷によるフルカラーのアクリルスタンドです。キャラクターやアイドルのイラスト・写真を高精細に再現。台座付きで自立し、デスクや棚にディスプレイできます。',
    specs: [
      { label: 'サイズ', value: '50×70mm〜150×200mm' },
      { label: '厚み', value: '3mm' },
      { label: '素材', value: '透明アクリル' },
      { label: '印刷', value: 'UVインクジェット フルカラー + 白引き' },
      { label: '台座', value: 'アクリル台座付き' },
      { label: 'カット', value: 'レーザーカット（型抜き）' },
    ],
    priceTable: [
      { quantity: '50個', unitPrice: '¥198', totalPrice: '¥9,900' },
      { quantity: '100個', unitPrice: '¥148', totalPrice: '¥14,800' },
      { quantity: '300個', unitPrice: '¥108', totalPrice: '¥32,400' },
      { quantity: '500個', unitPrice: '¥88', totalPrice: '¥44,000' },
    ],
    minLot: 50, deliveryDays: '約7営業日',
    features: ['フルカラー印刷', '台座付き', '型抜きカット', '推し活に'],
    relatedSlugs: ['keychain', 'charm', 'block'],
  },
  {
    id: 'acr-keychain', slug: 'keychain', name: 'アクリルキーホルダー', category: 'acrylic', categoryLabel: 'アクリルグッズ', categoryColor: '#8B5CF6',
    description: 'オリジナルデザインのアクリルキーホルダー。',
    longDescription: 'オリジナルデザインのアクリルキーホルダーです。ボールチェーンやナスカン付きで、鍵やバッグに取り付け可能。同人グッズやイベント物販にも大人気。',
    specs: [
      { label: 'サイズ', value: '40×40mm〜70×70mm' },
      { label: '厚み', value: '3mm' },
      { label: '素材', value: '透明アクリル' },
      { label: '印刷', value: 'UVインクジェット フルカラー + 白引き' },
      { label: '金具', value: 'ボールチェーン or ナスカン' },
      { label: 'カット', value: 'レーザーカット' },
    ],
    priceTable: [
      { quantity: '50個', unitPrice: '¥98', totalPrice: '¥4,900' },
      { quantity: '100個', unitPrice: '¥78', totalPrice: '¥7,800' },
      { quantity: '300個', unitPrice: '¥58', totalPrice: '¥17,400' },
      { quantity: '500個', unitPrice: '¥48', totalPrice: '¥24,000' },
    ],
    minLot: 50, deliveryDays: '約7営業日',
    features: ['金具付き', '型抜き対応', '同人グッズに', '小ロットOK'],
    relatedSlugs: ['stand', 'charm', 'coaster'],
  },
  {
    id: 'acr-coaster', slug: 'coaster', name: 'アクリルコースター', category: 'acrylic', categoryLabel: 'アクリルグッズ', categoryColor: '#8B5CF6',
    description: '透明感が美しいアクリルコースター。',
    longDescription: 'クリアアクリル製のオリジナルコースターです。飲食店のオリジナルグッズや、アニメ・ゲームのコラボカフェグッズとして人気。丸型・四角型から選べます。',
    specs: [
      { label: '形状', value: '丸型 or 四角型' },
      { label: 'サイズ', value: '直径90mm or 90×90mm' },
      { label: '厚み', value: '5mm' },
      { label: '素材', value: '透明アクリル' },
      { label: '印刷', value: 'UVインクジェット フルカラー' },
    ],
    priceTable: [
      { quantity: '50個', unitPrice: '¥148', totalPrice: '¥7,400' },
      { quantity: '100個', unitPrice: '¥118', totalPrice: '¥11,800' },
      { quantity: '300個', unitPrice: '¥88', totalPrice: '¥26,400' },
      { quantity: '500個', unitPrice: '¥72', totalPrice: '¥36,000' },
    ],
    minLot: 50, deliveryDays: '約7営業日',
    features: ['丸型・四角型対応', '厚み5mm', 'カフェグッズに', 'コラボ対応'],
    relatedSlugs: ['stand', 'block', 'frame'],
  },
  {
    id: 'acr-frame', slug: 'frame', name: 'アクリル写真立て', category: 'acrylic', categoryLabel: 'アクリルグッズ', categoryColor: '#8B5CF6',
    description: 'クリアなアクリル写真立て。記念品に最適。',
    longDescription: '透明アクリル製の写真立てです。卒業記念、結婚式の引出物、表彰盾として幅広く利用。写真やロゴをUV印刷で直接プリントすることも可能です。',
    specs: [
      { label: 'サイズ', value: 'L判（89×127mm）〜A4対応' },
      { label: '厚み', value: '5mm〜10mm' },
      { label: '素材', value: '透明アクリル' },
      { label: '印刷', value: 'UV印刷 or 写真差し込み式' },
      { label: '台座', value: '一体型台座' },
    ],
    priceTable: [
      { quantity: '30個', unitPrice: '¥398', totalPrice: '¥11,940' },
      { quantity: '50個', unitPrice: '¥298', totalPrice: '¥14,900' },
      { quantity: '100個', unitPrice: '¥248', totalPrice: '¥24,800' },
      { quantity: '300個', unitPrice: '¥198', totalPrice: '¥59,400' },
    ],
    minLot: 30, deliveryDays: '約10営業日',
    features: ['記念品に最適', '写真差し込み式', 'UV印刷対応', '各サイズ対応'],
    relatedSlugs: ['block', 'stand', 'coaster'],
  },
  {
    id: 'acr-charm', slug: 'charm', name: 'アクリルチャーム', category: 'acrylic', categoryLabel: 'アクリルグッズ', categoryColor: '#8B5CF6',
    description: 'ストラップ付きアクリルチャーム。バッグアクセサリーに。',
    longDescription: 'ストラップ紐やカニカン付きのアクリルチャームです。キーホルダーより小ぶりで、スマホケースやポーチに付けるアクセサリーとして人気。複数デザインの少量多品種にも対応。',
    specs: [
      { label: 'サイズ', value: '30×30mm〜50×50mm' },
      { label: '厚み', value: '2mm〜3mm' },
      { label: '素材', value: '透明アクリル' },
      { label: '印刷', value: 'UVインクジェット フルカラー' },
      { label: '金具', value: 'カニカン + ストラップ紐' },
    ],
    priceTable: [
      { quantity: '50個', unitPrice: '¥78', totalPrice: '¥3,900' },
      { quantity: '100個', unitPrice: '¥58', totalPrice: '¥5,800' },
      { quantity: '300個', unitPrice: '¥42', totalPrice: '¥12,600' },
      { quantity: '500個', unitPrice: '¥35', totalPrice: '¥17,500' },
    ],
    minLot: 50, deliveryDays: '約7営業日',
    features: ['カニカン付き', 'コンパクト', '少量多品種OK', 'スマホアクセに'],
    relatedSlugs: ['keychain', 'stand', 'coaster'],
  },
  {
    id: 'acr-block', slug: 'block', name: 'アクリルブロック', category: 'acrylic', categoryLabel: 'アクリルグッズ', categoryColor: '#8B5CF6',
    description: '厚みのあるアクリルブロック。高級感のあるディスプレイ。',
    longDescription: '厚みのあるアクリルブロック（キューブ）です。重量感と透明感が高級感を演出。表彰盾、記念品、ディスプレイ用途に。写真やロゴを封入したような美しい仕上がり。',
    specs: [
      { label: 'サイズ', value: '50×50×20mm〜150×100×30mm' },
      { label: '厚み', value: '20mm〜30mm' },
      { label: '素材', value: '透明アクリル（研磨仕上げ）' },
      { label: '印刷', value: 'UV印刷（背面印刷で立体感）' },
    ],
    priceTable: [
      { quantity: '30個', unitPrice: '¥498', totalPrice: '¥14,940' },
      { quantity: '50個', unitPrice: '¥398', totalPrice: '¥19,900' },
      { quantity: '100個', unitPrice: '¥328', totalPrice: '¥32,800' },
      { quantity: '300個', unitPrice: '¥258', totalPrice: '¥77,400' },
    ],
    minLot: 30, deliveryDays: '約10営業日',
    features: ['高級感', '研磨仕上げ', '表彰盾にも', '重厚な仕上がり'],
    relatedSlugs: ['frame', 'stand', 'coaster'],
  },
  {
    id: 'acr-custom', slug: 'custom', name: 'オーダーメイドアクリル', category: 'acrylic', categoryLabel: 'アクリルグッズ', categoryColor: '#8B5CF6',
    description: '形状・サイズ・仕様を自由にカスタマイズ。',
    longDescription: 'サイズ・形状・厚み・金具など、すべてを自由にカスタマイズできるオーダーメイドアクリルグッズです。「こんなの作れる？」というご要望にお応えします。まずはお気軽にご相談ください。',
    specs: [
      { label: 'サイズ', value: '自由（最大300×300mm）' },
      { label: '厚み', value: '2mm〜30mm' },
      { label: '素材', value: '透明/乳白/カラーアクリル' },
      { label: '加工', value: 'レーザーカット・曲げ・接着' },
      { label: '印刷', value: 'UV印刷・シルク印刷' },
    ],
    priceTable: [
      { quantity: '30個', unitPrice: '¥598〜', totalPrice: '¥17,940〜' },
      { quantity: '50個', unitPrice: '¥448〜', totalPrice: '¥22,400〜' },
      { quantity: '100個', unitPrice: '¥348〜', totalPrice: '¥34,800〜' },
      { quantity: '300個', unitPrice: '¥278〜', totalPrice: '¥83,400〜' },
    ],
    minLot: 30, deliveryDays: '約14営業日',
    features: ['完全カスタマイズ', 'カラーアクリル対応', '曲げ加工可', '相談無料'],
    relatedSlugs: ['stand', 'block', 'frame'],
  },
  {
    id: 'acr-nameplate', slug: 'nameplate', name: 'アクリルネームプレート', category: 'acrylic', categoryLabel: 'アクリルグッズ', categoryColor: '#8B5CF6',
    description: '受付やデスクに。アクリル製ネームプレート。',
    longDescription: 'アクリル素材のネームプレートです。企業の受付カウンター、デスク、会議室のドアプレートなどに。レーザー彫刻とUV印刷の組み合わせでプロフェッショナルな仕上がり。',
    specs: [
      { label: 'サイズ', value: '60×200mm（標準）' },
      { label: '厚み', value: '5mm' },
      { label: '素材', value: '透明 or 乳白アクリル' },
      { label: '加工', value: 'レーザー彫刻 + UV印刷' },
      { label: '取付', value: 'スタンド式 or 壁付け式' },
    ],
    priceTable: [
      { quantity: '10個', unitPrice: '¥698', totalPrice: '¥6,980' },
      { quantity: '30個', unitPrice: '¥498', totalPrice: '¥14,940' },
      { quantity: '50個', unitPrice: '¥398', totalPrice: '¥19,900' },
      { quantity: '100個', unitPrice: '¥298', totalPrice: '¥29,800' },
    ],
    minLot: 10, deliveryDays: '約7営業日',
    features: ['レーザー彫刻', 'プロ仕上げ', 'スタンド式/壁付け', '少量OK'],
    relatedSlugs: ['block', 'frame', 'custom'],
  },
];

// ============================================================
// SEAL PRODUCTS (7 detail pages)
// ============================================================
export const sealProducts: ProductDetail[] = [
  {
    id: 'seal-name', slug: 'name', name: 'お名前シール', category: 'seal', categoryLabel: 'シール・ステッカー', categoryColor: '#F97316',
    description: '入園・入学準備に最適なお名前シール。防水タイプも。',
    longDescription: '入園・入学準備の必需品、お名前シールです。防水ラミネート加工で水筒やお弁当箱にも貼れます。ひらがな・漢字・ローマ字対応。かわいいイラスト入りデザインも豊富。',
    specs: [
      { label: 'サイズ', value: '大小混合シート（4サイズ展開）' },
      { label: '素材', value: 'PET or 紙（ラミネート加工）' },
      { label: '印刷', value: 'フルカラーインクジェット' },
      { label: '加工', value: '防水ラミネート' },
      { label: '入数', value: '128枚/シート〜' },
    ],
    priceTable: [
      { quantity: '100シート', unitPrice: '¥38', totalPrice: '¥3,800' },
      { quantity: '300シート', unitPrice: '¥28', totalPrice: '¥8,400' },
      { quantity: '500シート', unitPrice: '¥22', totalPrice: '¥11,000' },
      { quantity: '1,000シート', unitPrice: '¥18', totalPrice: '¥18,000' },
    ],
    minLot: 100, deliveryDays: '約3営業日',
    features: ['防水加工', 'ひらがな/漢字/ローマ字', 'かわいいデザイン', '大小混合'],
    relatedSlugs: ['label', 'sheet', 'diecut'],
  },
  {
    id: 'seal-parking', slug: 'parking', name: '駐輪シール', category: 'seal', categoryLabel: 'シール・ステッカー', categoryColor: '#F97316',
    description: 'マンション・施設用の駐輪許可シール。',
    longDescription: 'マンション・商業施設・学校の駐輪場管理に使用する許可シールです。耐候性の高い素材で屋外使用にも耐久。ナンバリング（連番印字）にも対応。',
    specs: [
      { label: 'サイズ', value: '30×60mm（標準）' },
      { label: '素材', value: '耐候性PET' },
      { label: '印刷', value: 'シルクスクリーン or オフセット' },
      { label: '加工', value: 'ラミネート加工' },
      { label: 'オプション', value: 'ナンバリング（連番）対応' },
    ],
    priceTable: [
      { quantity: '200枚', unitPrice: '¥18', totalPrice: '¥3,600' },
      { quantity: '500枚', unitPrice: '¥12', totalPrice: '¥6,000' },
      { quantity: '1,000枚', unitPrice: '¥8', totalPrice: '¥8,000' },
      { quantity: '3,000枚', unitPrice: '¥5', totalPrice: '¥15,000' },
    ],
    minLot: 200, deliveryDays: '約5営業日',
    features: ['耐候性', '屋外OK', 'ナンバリング対応', '連番印字'],
    relatedSlugs: ['label', 'name', 'seal-sticker'],
  },
  {
    id: 'seal-fu', slug: 'seal-sticker', name: '封シール', category: 'seal', categoryLabel: 'シール・ステッカー', categoryColor: '#F97316',
    description: 'DM・封筒用の封シール。ロゴ入りでブランディング。',
    longDescription: 'DMや封筒の封かんに使用する封シールです。企業ロゴやブランドマークを入れることで、開封前から高級感とブランドイメージを演出。透明タイプ・箔押しタイプも。',
    specs: [
      { label: '形状', value: '丸型・四角型・楕円型' },
      { label: 'サイズ', value: '直径30mm〜50mm' },
      { label: '素材', value: '透明PET / 上質紙 / クラフト紙' },
      { label: '印刷', value: 'オフセット or 箔押し' },
      { label: '仕上げ', value: 'シート or ロール巻き' },
    ],
    priceTable: [
      { quantity: '500枚', unitPrice: '¥8', totalPrice: '¥4,000' },
      { quantity: '1,000枚', unitPrice: '¥5', totalPrice: '¥5,000' },
      { quantity: '3,000枚', unitPrice: '¥3', totalPrice: '¥9,000' },
      { quantity: '5,000枚', unitPrice: '¥2.5', totalPrice: '¥12,500' },
    ],
    minLot: 500, deliveryDays: '約3営業日',
    features: ['透明タイプあり', '箔押し対応', 'ロール巻き対応', 'ブランディングに'],
    relatedSlugs: ['label', 'name', 'diecut'],
  },
  {
    id: 'seal-label', slug: 'label', name: 'ラベルシール', category: 'seal', categoryLabel: 'シール・ステッカー', categoryColor: '#F97316',
    description: '商品ラベル・管理ラベル。各種素材対応。',
    longDescription: '商品パッケージ用ラベルや在庫管理ラベルなど、業務用ラベルシールです。バーコード・QRコード印刷にも対応。耐水・耐熱の特殊素材も選べます。',
    specs: [
      { label: '形状', value: '四角型・丸型・カスタム型' },
      { label: 'サイズ', value: '自由（10×20mm〜200×300mm）' },
      { label: '素材', value: '上質紙/アート紙/PET/PP/合成紙' },
      { label: '印刷', value: 'オフセット or オンデマンド' },
      { label: '仕上げ', value: 'シート or ロール' },
      { label: 'オプション', value: 'バーコード・QRコード・連番' },
    ],
    priceTable: [
      { quantity: '300枚', unitPrice: '¥12', totalPrice: '¥3,600' },
      { quantity: '500枚', unitPrice: '¥8', totalPrice: '¥4,000' },
      { quantity: '1,000枚', unitPrice: '¥5', totalPrice: '¥5,000' },
      { quantity: '5,000枚', unitPrice: '¥3', totalPrice: '¥15,000' },
    ],
    minLot: 300, deliveryDays: '約5営業日',
    features: ['バーコード対応', 'QRコード対応', '耐水素材あり', 'ロール対応'],
    relatedSlugs: ['parking', 'seal-sticker', 'name'],
  },
  {
    id: 'seal-diecut', slug: 'diecut', name: '型抜きステッカー', category: 'seal', categoryLabel: 'シール・ステッカー', categoryColor: '#F97316',
    description: 'オリジナル形状の型抜きステッカー。ノベルティに人気。',
    longDescription: 'ロゴやキャラクターの形に合わせて型抜きするオリジナルステッカーです。PCやスマホケースに貼れるサイズが人気。防水PP素材で屋外使用にも対応。',
    specs: [
      { label: '形状', value: 'オリジナル型抜き' },
      { label: 'サイズ', value: '最大200×200mm以内' },
      { label: '素材', value: 'PP（防水）' },
      { label: '印刷', value: 'フルカラーインクジェット or オフセット' },
      { label: '加工', value: 'PP加工 + 型抜き' },
    ],
    priceTable: [
      { quantity: '100枚', unitPrice: '¥48', totalPrice: '¥4,800' },
      { quantity: '300枚', unitPrice: '¥32', totalPrice: '¥9,600' },
      { quantity: '500枚', unitPrice: '¥25', totalPrice: '¥12,500' },
      { quantity: '1,000枚', unitPrice: '¥18', totalPrice: '¥18,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['オリジナル型抜き', '防水PP', 'PC・スマホに', 'ノベルティ人気'],
    relatedSlugs: ['sheet', 'name', 'seal-sticker'],
  },
  {
    id: 'seal-sheet', slug: 'sheet', name: 'シートステッカー', category: 'seal', categoryLabel: 'シール・ステッカー', categoryColor: '#F97316',
    description: '1シートに複数デザインを配置。コレクション向け。',
    longDescription: '1枚のシートに複数のデザインを配置したステッカーシートです。コレクターアイテムやイベント物販に最適。A5〜A4シートに自由にレイアウト可能。',
    specs: [
      { label: 'シートサイズ', value: 'A5（148×210mm）〜A4' },
      { label: 'デザイン数', value: '1シートに複数配置可' },
      { label: '素材', value: 'PP or アート紙' },
      { label: '印刷', value: 'フルカラーオフセット' },
      { label: '加工', value: 'ハーフカット（台紙残し）' },
    ],
    priceTable: [
      { quantity: '100シート', unitPrice: '¥58', totalPrice: '¥5,800' },
      { quantity: '300シート', unitPrice: '¥42', totalPrice: '¥12,600' },
      { quantity: '500シート', unitPrice: '¥32', totalPrice: '¥16,000' },
      { quantity: '1,000シート', unitPrice: '¥25', totalPrice: '¥25,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['複数デザイン配置', 'ハーフカット', 'コレクター向け', '物販に最適'],
    relatedSlugs: ['diecut', 'name', 'label'],
  },
  {
    id: 'seal-hologram', slug: 'hologram', name: 'ホログラムシール', category: 'seal', categoryLabel: 'シール・ステッカー', categoryColor: '#F97316',
    description: 'キラキラ輝くホログラム素材のシール。',
    longDescription: 'ホログラム素材を使用したキラキラ輝くシールです。セキュリティシールやプレミアム感のあるノベルティに。レインボーに光る特殊素材で目を引くインパクト。',
    specs: [
      { label: '形状', value: '丸型・四角型・カスタム型' },
      { label: 'サイズ', value: '20×20mm〜100×100mm' },
      { label: '素材', value: 'ホログラムフィルム' },
      { label: '印刷', value: 'シルクスクリーン' },
      { label: '用途', value: 'セキュリティ・ノベルティ' },
    ],
    priceTable: [
      { quantity: '200枚', unitPrice: '¥58', totalPrice: '¥11,600' },
      { quantity: '500枚', unitPrice: '¥42', totalPrice: '¥21,000' },
      { quantity: '1,000枚', unitPrice: '¥32', totalPrice: '¥32,000' },
      { quantity: '3,000枚', unitPrice: '¥22', totalPrice: '¥66,000' },
    ],
    minLot: 200, deliveryDays: '約7営業日',
    features: ['ホログラム素材', 'キラキラ輝く', 'セキュリティ用途', 'プレミアム感'],
    relatedSlugs: ['diecut', 'sheet', 'seal-sticker'],
  },
];

// ============================================================
// HYGIENE PRODUCTS (7 detail pages)
// ============================================================
export const hygieneProducts: ProductDetail[] = [
  {
    id: 'hyg-wet-tissue', slug: 'wet-tissue', name: 'ウェットティッシュ', category: 'hygiene', categoryLabel: '衛生用品', categoryColor: '#06B6D4',
    description: 'オリジナルラベルのウェットティッシュ。販促配布に。',
    longDescription: '個包装のウェットティッシュにオリジナルラベルを貼った名入れノベルティです。展示会やイベントでの配布に大人気。実用性が高く捨てられにくい販促品。',
    specs: [
      { label: 'タイプ', value: '個包装（10枚入）' },
      { label: 'サイズ', value: '150×200mm（シートサイズ）' },
      { label: '成分', value: '除菌・ノンアルコール選択可' },
      { label: 'ラベル', value: 'フルカラー印刷ラベル' },
      { label: '包装', value: '個包装フィルム' },
    ],
    priceTable: [
      { quantity: '100個', unitPrice: '¥88', totalPrice: '¥8,800' },
      { quantity: '300個', unitPrice: '¥68', totalPrice: '¥20,400' },
      { quantity: '500個', unitPrice: '¥55', totalPrice: '¥27,500' },
      { quantity: '1,000個', unitPrice: '¥42', totalPrice: '¥42,000' },
    ],
    minLot: 100, deliveryDays: '約5営業日',
    features: ['除菌タイプ対応', 'オリジナルラベル', '個包装', '展示会に人気'],
    relatedSlugs: ['pocket-tissue', 'box-tissue', 'mask'],
  },
  {
    id: 'hyg-box-tissue', slug: 'box-tissue', name: 'BOXティッシュ', category: 'hygiene', categoryLabel: '衛生用品', categoryColor: '#06B6D4',
    description: 'オリジナルBOXティッシュ。企業PR効果が長続き。',
    longDescription: 'オリジナルデザインの箱に入ったBOXティッシュです。デスクに置いてもらえるため広告効果が長期間持続。来場記念品や粗品として喜ばれます。',
    specs: [
      { label: 'サイズ', value: 'コンパクトBOX（40W）/ 標準BOX（150W）' },
      { label: 'BOX', value: 'フルカラー印刷オリジナルBOX' },
      { label: '中身', value: 'ソフトティッシュ' },
      { label: 'W数', value: '40W〜150W選択可' },
    ],
    priceTable: [
      { quantity: '100個', unitPrice: '¥148', totalPrice: '¥14,800' },
      { quantity: '300個', unitPrice: '¥118', totalPrice: '¥35,400' },
      { quantity: '500個', unitPrice: '¥98', totalPrice: '¥49,000' },
      { quantity: '1,000個', unitPrice: '¥78', totalPrice: '¥78,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['長期広告効果', 'フルカラーBOX', '40W〜150W', '粗品に最適'],
    relatedSlugs: ['wet-tissue', 'pocket-tissue', 'mask'],
  },
  {
    id: 'hyg-pocket-tissue', slug: 'pocket-tissue', name: 'ポケットティッシュ', category: 'hygiene', categoryLabel: '衛生用品', categoryColor: '#06B6D4',
    description: '販促の王道、ポケットティッシュ配り。',
    longDescription: '販促・集客の定番、ポケットティッシュです。広告チラシを封入したタイプや、フィルムにオリジナル印刷を施したタイプを用意。大量配布に最適なコストパフォーマンス。',
    specs: [
      { label: 'サイズ', value: '標準（6W〜12W）' },
      { label: 'フィルム', value: 'オリジナル印刷フィルム' },
      { label: 'チラシ', value: '広告チラシ封入対応' },
      { label: '中身', value: 'ソフトティッシュ' },
    ],
    priceTable: [
      { quantity: '500個', unitPrice: '¥12', totalPrice: '¥6,000' },
      { quantity: '1,000個', unitPrice: '¥8', totalPrice: '¥8,000' },
      { quantity: '3,000個', unitPrice: '¥6', totalPrice: '¥18,000' },
      { quantity: '5,000個', unitPrice: '¥5', totalPrice: '¥25,000' },
    ],
    minLot: 500, deliveryDays: '約3営業日',
    features: ['販促の王道', 'チラシ封入OK', 'コスパ最強', '大量配布向け'],
    relatedSlugs: ['wet-tissue', 'box-tissue', 'kairo'],
  },
  {
    id: 'hyg-mask', slug: 'mask', name: 'オリジナルマスク', category: 'hygiene', categoryLabel: '衛生用品', categoryColor: '#06B6D4',
    description: '名入れ・ロゴ入りのオリジナルマスク。',
    longDescription: 'オリジナルパッケージ（広告ラベル封入対応）の不織布マスクです。個包装タイプで衛生的。企業ロゴ入りの袋で配布すればPR効果も。花粉症シーズンや冬の販促に。',
    specs: [
      { label: 'タイプ', value: '不織布3層マスク（個包装）' },
      { label: 'サイズ', value: 'レギュラー / 小さめ' },
      { label: 'パッケージ', value: 'オリジナルOPP袋' },
      { label: '印刷', value: 'OPP袋にフルカラー印刷' },
      { label: '入数', value: '1枚入 or 5枚入' },
    ],
    priceTable: [
      { quantity: '100個', unitPrice: '¥68', totalPrice: '¥6,800' },
      { quantity: '300個', unitPrice: '¥52', totalPrice: '¥15,600' },
      { quantity: '500個', unitPrice: '¥42', totalPrice: '¥21,000' },
      { quantity: '1,000個', unitPrice: '¥32', totalPrice: '¥32,000' },
    ],
    minLot: 100, deliveryDays: '約5営業日',
    features: ['個包装', 'オリジナルパッケージ', '花粉症対策', '冬の販促に'],
    relatedSlugs: ['wet-tissue', 'sanitizer', 'pocket-tissue'],
  },
  {
    id: 'hyg-kairo', slug: 'kairo', name: '使い捨てカイロ', category: 'hygiene', categoryLabel: '衛生用品', categoryColor: '#06B6D4',
    description: '冬の販促に最適な名入れカイロ。',
    longDescription: 'オリジナルパッケージの使い捨てカイロです。冬のイベントや展示会での配布に喜ばれます。貼るタイプ・貼らないタイプ・ミニサイズから選択可能。素材バラ売りにも対応。',
    specs: [
      { label: 'タイプ', value: '貼る / 貼らない / ミニ' },
      { label: '持続時間', value: '約10〜14時間' },
      { label: 'パッケージ', value: 'オリジナル印刷OPP袋' },
      { label: '入数', value: '1個入 or 2個入' },
    ],
    priceTable: [
      { quantity: '100個', unitPrice: '¥48', totalPrice: '¥4,800' },
      { quantity: '300個', unitPrice: '¥38', totalPrice: '¥11,400' },
      { quantity: '500個', unitPrice: '¥28', totalPrice: '¥14,000' },
      { quantity: '1,000個', unitPrice: '¥22', totalPrice: '¥22,000' },
    ],
    minLot: 100, deliveryDays: '約5営業日',
    features: ['貼る/貼らない選択', '冬の定番', '素材バラ売りOK', 'イベント配布に'],
    relatedSlugs: ['mask', 'pocket-tissue', 'wet-tissue'],
  },
  {
    id: 'hyg-sanitizer', slug: 'sanitizer', name: '除菌グッズ', category: 'hygiene', categoryLabel: '衛生用品', categoryColor: '#06B6D4',
    description: '除菌ジェル・除菌スプレーの名入れ対応。',
    longDescription: 'オリジナルラベルの除菌ジェル・除菌スプレーです。携帯用の小容量タイプで、展示会やイベントの来場記念品に最適。衛生意識の高まりとともに需要増加中。',
    specs: [
      { label: 'タイプ', value: 'ジェル / スプレー' },
      { label: '容量', value: '30ml / 50ml / 100ml' },
      { label: 'ラベル', value: 'フルカラー印刷ラベル' },
      { label: '成分', value: 'アルコール配合（指定濃度対応）' },
    ],
    priceTable: [
      { quantity: '100個', unitPrice: '¥128', totalPrice: '¥12,800' },
      { quantity: '300個', unitPrice: '¥98', totalPrice: '¥29,400' },
      { quantity: '500個', unitPrice: '¥78', totalPrice: '¥39,000' },
      { quantity: '1,000個', unitPrice: '¥62', totalPrice: '¥62,000' },
    ],
    minLot: 100, deliveryDays: '約7営業日',
    features: ['ジェル/スプレー選択', 'オリジナルラベル', '携帯サイズ', '衛生対策に'],
    relatedSlugs: ['wet-tissue', 'mask', 'kairo'],
  },
  {
    id: 'hyg-hand-soap', slug: 'hand-soap', name: 'ハンドソープ', category: 'hygiene', categoryLabel: '衛生用品', categoryColor: '#06B6D4',
    description: 'オリジナルラベルのハンドソープ。',
    longDescription: 'オリジナルラベルのハンドソープです。ポンプ式のコンパクトタイプで、洗面台に置いてもらえば毎日目に触れる広告効果。ホテルや飲食店のアメニティにも。',
    specs: [
      { label: 'タイプ', value: '泡タイプ / 液体タイプ' },
      { label: '容量', value: '250ml / 500ml' },
      { label: '容器', value: 'ポンプ式ボトル' },
      { label: 'ラベル', value: 'フルカラー印刷ラベル' },
    ],
    priceTable: [
      { quantity: '100個', unitPrice: '¥198', totalPrice: '¥19,800' },
      { quantity: '300個', unitPrice: '¥158', totalPrice: '¥47,400' },
      { quantity: '500個', unitPrice: '¥128', totalPrice: '¥64,000' },
      { quantity: '1,000個', unitPrice: '¥98', totalPrice: '¥98,000' },
    ],
    minLot: 100, deliveryDays: '約10営業日',
    features: ['泡/液体選択', 'ポンプ式', 'アメニティに', '毎日使える'],
    relatedSlugs: ['sanitizer', 'wet-tissue', 'mask'],
  },
];

// ============================================================
// TOWEL PRODUCTS (5 detail pages)
// ============================================================
export const towelProducts: ProductDetail[] = [
  {
    id: 'twl-face', slug: 'face', name: 'フェイスタオル', category: 'towel', categoryLabel: 'タオル・名入れ', categoryColor: '#EC4899',
    description: '名入れ対応のフェイスタオル。粗品・記念品に。',
    longDescription: '名入れ・ロゴ入りのフェイスタオルです。今治タオルや泉州タオルなど国産タオルを使用。粗品、周年記念品、卒業記念品として人気。プリント・織り込み・刺繍から名入れ方法を選べます。',
    specs: [
      { label: 'サイズ', value: '約34×80cm' },
      { label: '素材', value: '綿100%（今治 or 泉州）' },
      { label: '重さ', value: '約80g〜120g' },
      { label: '名入れ', value: 'プリント / 織り込み / 刺繍' },
      { label: 'カラー', value: '白・カラー各種' },
    ],
    priceTable: [
      { quantity: '50枚', unitPrice: '¥398', totalPrice: '¥19,900' },
      { quantity: '100枚', unitPrice: '¥298', totalPrice: '¥29,800' },
      { quantity: '300枚', unitPrice: '¥228', totalPrice: '¥68,400' },
      { quantity: '500枚', unitPrice: '¥188', totalPrice: '¥94,000' },
    ],
    minLot: 50, deliveryDays: '約10営業日',
    features: ['今治タオル対応', '名入れ3種類', '国産品質', '記念品に最適'],
    relatedSlugs: ['hand', 'sports', 'imprint'],
  },
  {
    id: 'twl-hand', slug: 'hand', name: 'ハンドタオル', category: 'towel', categoryLabel: 'タオル・名入れ', categoryColor: '#EC4899',
    description: '持ち運びに便利なハンドタオル。名入れ対応。',
    longDescription: 'コンパクトで持ち運びに便利なハンドタオルです。ハンカチ代わりに毎日使ってもらえるため、企業ロゴの露出機会が多い優秀なノベルティ。フルカラープリントでデザインの自由度も高い。',
    specs: [
      { label: 'サイズ', value: '約25×25cm' },
      { label: '素材', value: '綿100%' },
      { label: '重さ', value: '約30g〜50g' },
      { label: '名入れ', value: 'フルカラープリント / 刺繍' },
      { label: 'カラー', value: '白・カラー各種' },
    ],
    priceTable: [
      { quantity: '50枚', unitPrice: '¥198', totalPrice: '¥9,900' },
      { quantity: '100枚', unitPrice: '¥158', totalPrice: '¥15,800' },
      { quantity: '300枚', unitPrice: '¥118', totalPrice: '¥35,400' },
      { quantity: '500枚', unitPrice: '¥98', totalPrice: '¥49,000' },
    ],
    minLot: 50, deliveryDays: '約10営業日',
    features: ['コンパクト', '毎日使える', 'フルカラー対応', 'ハンカチ代わり'],
    relatedSlugs: ['face', 'sports', 'imprint'],
  },
  {
    id: 'twl-sports', slug: 'sports', name: 'スポーツタオル', category: 'towel', categoryLabel: 'タオル・名入れ', categoryColor: '#EC4899',
    description: 'スポーツイベント・大会記念に。マフラータオル。',
    longDescription: 'スポーツイベントや大会記念のマフラータオルです。首にかけて応援に使えるサイズ。チーム名やスローガンをプリントして一体感を演出。ジムやフィットネスのノベルティにも。',
    specs: [
      { label: 'サイズ', value: '約20×110cm' },
      { label: '素材', value: '綿100%' },
      { label: '重さ', value: '約80g〜100g' },
      { label: '名入れ', value: 'フルカラープリント' },
      { label: 'カラー', value: '白ベース推奨' },
    ],
    priceTable: [
      { quantity: '50枚', unitPrice: '¥498', totalPrice: '¥24,900' },
      { quantity: '100枚', unitPrice: '¥398', totalPrice: '¥39,800' },
      { quantity: '300枚', unitPrice: '¥298', totalPrice: '¥89,400' },
      { quantity: '500枚', unitPrice: '¥248', totalPrice: '¥124,000' },
    ],
    minLot: 50, deliveryDays: '約10営業日',
    features: ['マフラー型', '応援グッズに', 'チーム名入り', 'フルカラー'],
    relatedSlugs: ['face', 'hand', 'imprint'],
  },
  {
    id: 'twl-bath', slug: 'bath', name: 'バスタオル', category: 'towel', categoryLabel: 'タオル・名入れ', categoryColor: '#EC4899',
    description: '高級感のあるバスタオル。名入れで特別なギフトに。',
    longDescription: '名入れ対応のバスタオルです。今治タオル認定品を使用した高品質な仕上がり。結婚式の引出物、周年記念品、VIPギフトに最適。刺繍名入れで高級感をプラス。',
    specs: [
      { label: 'サイズ', value: '約60×120cm' },
      { label: '素材', value: '綿100%（今治認定品）' },
      { label: '重さ', value: '約300g〜400g' },
      { label: '名入れ', value: '刺繍 / プリント' },
      { label: 'カラー', value: '白・パステルカラー' },
    ],
    priceTable: [
      { quantity: '30枚', unitPrice: '¥1,280', totalPrice: '¥38,400' },
      { quantity: '50枚', unitPrice: '¥980', totalPrice: '¥49,000' },
      { quantity: '100枚', unitPrice: '¥780', totalPrice: '¥78,000' },
      { quantity: '300枚', unitPrice: '¥580', totalPrice: '¥174,000' },
    ],
    minLot: 30, deliveryDays: '約14営業日',
    features: ['今治認定品', '高級ギフト', '刺繍対応', '引出物に最適'],
    relatedSlugs: ['face', 'hand', 'imprint'],
  },
  {
    id: 'twl-imprint', slug: 'imprint', name: '名入れ商品全般', category: 'towel', categoryLabel: 'タオル・名入れ', categoryColor: '#EC4899',
    description: 'タオル以外も含む名入れ商品の総合案内。',
    longDescription: 'タオル以外にも、ボールペン・マグカップ・エコバッグ・Tシャツなど、様々なアイテムへの名入れ（ロゴ入れ）に対応しています。販促品・記念品のトータルコーディネートもお任せください。',
    specs: [
      { label: '対応アイテム', value: 'タオル/ペン/マグカップ/エコバッグ/Tシャツ等' },
      { label: '名入れ方法', value: 'プリント/刺繍/レーザー彫刻/箔押し' },
      { label: 'デザイン', value: 'ロゴ/社名/イラスト対応' },
      { label: 'ロット', value: '10個〜（アイテムにより異なる）' },
    ],
    priceTable: [
      { quantity: '10個〜', unitPrice: '要見積', totalPrice: '要見積' },
      { quantity: '50個〜', unitPrice: '要見積', totalPrice: '要見積' },
      { quantity: '100個〜', unitPrice: '要見積', totalPrice: '要見積' },
      { quantity: '500個〜', unitPrice: '要見積', totalPrice: '要見積' },
    ],
    minLot: 10, deliveryDays: '約7〜14営業日',
    features: ['多品種対応', '名入れ方法多数', 'トータルコーディネート', '少量OK'],
    relatedSlugs: ['face', 'hand', 'sports'],
  },
];

// Lookup maps
export const allProductsByCategory: Record<string, ProductDetail[]> = {
  calendar: calendarProducts,
  uchiwa: uchiwaProducts,
  acrylic: acrylicProducts,
  seal: sealProducts,
  hygiene: hygieneProducts,
  towel: towelProducts,
};

export function getProductBySlug(category: string, slug: string): ProductDetail | undefined {
  return allProductsByCategory[category]?.find(p => p.slug === slug);
}

export function getRelatedProducts(product: ProductDetail): ProductDetail[] {
  const categoryProducts = allProductsByCategory[product.category] || [];
  return product.relatedSlugs
    .map(slug => categoryProducts.find(p => p.slug === slug))
    .filter((p): p is ProductDetail => !!p);
}
