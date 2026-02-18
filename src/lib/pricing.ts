// ダミー価格テーブル — 後から差し替えやすいように分離
import { type CategoryId } from './constants';

export interface ProductOption {
  id: string;
  name: string;
  categoryId: CategoryId;
  options: OptionGroup[];
  basePrices: PriceTier[];
}

export interface OptionGroup {
  id: string;
  label: string;
  choices: OptionChoice[];
}

export interface OptionChoice {
  id: string;
  label: string;
  priceModifier: number; // multiplier: 1.0 = no change, 1.2 = +20%
}

export interface PriceTier {
  quantity: number;
  unitPrice: number; // 円
}

export const QUANTITY_OPTIONS = [100, 300, 500, 1000, 3000, 5000] as const;
export type Quantity = (typeof QUANTITY_OPTIONS)[number];

export interface PriceResult {
  unitPrice: number;
  totalPrice: number;
  /** Discount rate compared to base unit price at same quantity tier (option savings only) */
  discountRate: number;
}

// 階段式pricing: 数量が増えると単価が下がる
export const PRODUCT_CATALOG: ProductOption[] = [
  // ===== カレンダー =====
  {
    id: 'calendar-desk',
    name: '卓上カレンダー',
    categoryId: 'calendar',
    options: [
      {
        id: 'type',
        label: 'タイプ',
        choices: [
          { id: 'ring', label: 'リング式', priceModifier: 1.0 },
          { id: 'case', label: 'ケース式', priceModifier: 0.85 },
          { id: 'eco', label: 'エコ（再生紙）', priceModifier: 0.75 },
        ],
      },
      {
        id: 'print',
        label: '印刷',
        choices: [
          { id: 'color4', label: 'フルカラー', priceModifier: 1.0 },
          { id: 'color1', label: '1色印刷', priceModifier: 0.7 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 350 },
      { quantity: 300, unitPrice: 280 },
      { quantity: 500, unitPrice: 230 },
      { quantity: 1000, unitPrice: 180 },
      { quantity: 3000, unitPrice: 140 },
      { quantity: 5000, unitPrice: 110 },
    ],
  },
  {
    id: 'calendar-wall',
    name: '壁掛けカレンダー',
    categoryId: 'calendar',
    options: [
      {
        id: 'size',
        label: 'サイズ',
        choices: [
          { id: 'b3', label: 'B3', priceModifier: 1.0 },
          { id: 'b2', label: 'B2', priceModifier: 1.3 },
          { id: 'a2', label: 'A2', priceModifier: 1.4 },
        ],
      },
      {
        id: 'binding',
        label: '綴じ方',
        choices: [
          { id: 'hotmelt', label: 'ホットメルト綴じ', priceModifier: 1.0 },
          { id: 'wire', label: 'ツインリング綴じ', priceModifier: 1.15 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 450 },
      { quantity: 300, unitPrice: 360 },
      { quantity: 500, unitPrice: 300 },
      { quantity: 1000, unitPrice: 240 },
      { quantity: 3000, unitPrice: 180 },
      { quantity: 5000, unitPrice: 150 },
    ],
  },
  // ===== うちわ =====
  {
    id: 'uchiwa-poly',
    name: 'ポリうちわ',
    categoryId: 'uchiwa',
    options: [
      {
        id: 'shape',
        label: '形状',
        choices: [
          { id: 'standard', label: 'レギュラー', priceModifier: 1.0 },
          { id: 'diecut', label: '変形カット', priceModifier: 1.4 },
        ],
      },
      {
        id: 'print',
        label: '印刷面',
        choices: [
          { id: 'single', label: '片面', priceModifier: 1.0 },
          { id: 'double', label: '両面', priceModifier: 1.3 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 150 },
      { quantity: 300, unitPrice: 110 },
      { quantity: 500, unitPrice: 85 },
      { quantity: 1000, unitPrice: 65 },
      { quantity: 3000, unitPrice: 45 },
      { quantity: 5000, unitPrice: 35 },
    ],
  },
  {
    id: 'uchiwa-bamboo',
    name: '竹うちわ',
    categoryId: 'uchiwa',
    options: [
      {
        id: 'material',
        label: '素材',
        choices: [
          { id: 'paper', label: '紙貼り', priceModifier: 1.0 },
          { id: 'silk', label: '絹貼り', priceModifier: 1.5 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 250 },
      { quantity: 300, unitPrice: 200 },
      { quantity: 500, unitPrice: 170 },
      { quantity: 1000, unitPrice: 140 },
      { quantity: 3000, unitPrice: 110 },
      { quantity: 5000, unitPrice: 90 },
    ],
  },
  // ===== アクリル =====
  {
    id: 'acrylic-keychain',
    name: 'アクリルキーホルダー',
    categoryId: 'acrylic',
    options: [
      {
        id: 'size',
        label: 'サイズ',
        choices: [
          { id: 'small', label: '50mm', priceModifier: 1.0 },
          { id: 'medium', label: '70mm', priceModifier: 1.2 },
          { id: 'large', label: '100mm', priceModifier: 1.5 },
        ],
      },
      {
        id: 'thickness',
        label: '厚み',
        choices: [
          { id: '2mm', label: '2mm', priceModifier: 1.0 },
          { id: '3mm', label: '3mm', priceModifier: 1.15 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 200 },
      { quantity: 300, unitPrice: 160 },
      { quantity: 500, unitPrice: 130 },
      { quantity: 1000, unitPrice: 100 },
      { quantity: 3000, unitPrice: 75 },
      { quantity: 5000, unitPrice: 60 },
    ],
  },
  {
    id: 'acrylic-stand',
    name: 'アクリルスタンド',
    categoryId: 'acrylic',
    options: [
      {
        id: 'size',
        label: 'サイズ',
        choices: [
          { id: 'small', label: '70mm', priceModifier: 1.0 },
          { id: 'medium', label: '100mm', priceModifier: 1.3 },
          { id: 'large', label: '150mm', priceModifier: 1.6 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 280 },
      { quantity: 300, unitPrice: 220 },
      { quantity: 500, unitPrice: 180 },
      { quantity: 1000, unitPrice: 140 },
      { quantity: 3000, unitPrice: 100 },
      { quantity: 5000, unitPrice: 80 },
    ],
  },
  // ===== シール =====
  {
    id: 'seal-cutsheet',
    name: 'カットシール',
    categoryId: 'seal',
    options: [
      {
        id: 'material',
        label: '素材',
        choices: [
          { id: 'paper', label: '上質紙', priceModifier: 1.0 },
          { id: 'pp', label: 'PPフィルム（防水）', priceModifier: 1.3 },
          { id: 'transparent', label: '透明', priceModifier: 1.4 },
        ],
      },
      {
        id: 'finish',
        label: '加工',
        choices: [
          { id: 'none', label: 'なし', priceModifier: 1.0 },
          { id: 'gloss', label: 'グロスPP', priceModifier: 1.1 },
          { id: 'matte', label: 'マットPP', priceModifier: 1.1 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 80 },
      { quantity: 300, unitPrice: 55 },
      { quantity: 500, unitPrice: 42 },
      { quantity: 1000, unitPrice: 30 },
      { quantity: 3000, unitPrice: 20 },
      { quantity: 5000, unitPrice: 15 },
    ],
  },
  // ===== 衛生用品 =====
  {
    id: 'hygiene-mask',
    name: 'オリジナルマスク',
    categoryId: 'hygiene',
    options: [
      {
        id: 'type',
        label: 'タイプ',
        choices: [
          { id: 'nonwoven', label: '不織布マスク', priceModifier: 1.0 },
          { id: 'cloth', label: '布マスク', priceModifier: 1.8 },
        ],
      },
      {
        id: 'packaging',
        label: '個包装',
        choices: [
          { id: 'bulk', label: 'バルク', priceModifier: 1.0 },
          { id: 'individual', label: '個包装', priceModifier: 1.2 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 120 },
      { quantity: 300, unitPrice: 90 },
      { quantity: 500, unitPrice: 72 },
      { quantity: 1000, unitPrice: 55 },
      { quantity: 3000, unitPrice: 38 },
      { quantity: 5000, unitPrice: 30 },
    ],
  },
  {
    id: 'hygiene-tissue',
    name: 'ポケットティッシュ',
    categoryId: 'hygiene',
    options: [
      {
        id: 'ad',
        label: '広告',
        choices: [
          { id: 'label', label: 'ラベル封入', priceModifier: 1.0 },
          { id: 'fullprint', label: 'フルカラー印刷フィルム', priceModifier: 1.5 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 60 },
      { quantity: 300, unitPrice: 45 },
      { quantity: 500, unitPrice: 36 },
      { quantity: 1000, unitPrice: 28 },
      { quantity: 3000, unitPrice: 20 },
      { quantity: 5000, unitPrice: 16 },
    ],
  },
  // ===== タオル =====
  {
    id: 'towel-face',
    name: 'フェイスタオル',
    categoryId: 'towel',
    options: [
      {
        id: 'print',
        label: '印刷方法',
        choices: [
          { id: 'dyeing', label: '染料プリント', priceModifier: 1.0 },
          { id: 'full', label: 'フルカラープリント', priceModifier: 1.4 },
          { id: 'embroidery', label: '刺繍', priceModifier: 1.6 },
        ],
      },
      {
        id: 'quality',
        label: '品質',
        choices: [
          { id: 'standard', label: 'スタンダード', priceModifier: 1.0 },
          { id: 'premium', label: '今治タオル', priceModifier: 1.8 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 300 },
      { quantity: 300, unitPrice: 250 },
      { quantity: 500, unitPrice: 210 },
      { quantity: 1000, unitPrice: 170 },
      { quantity: 3000, unitPrice: 130 },
      { quantity: 5000, unitPrice: 110 },
    ],
  },
  {
    id: 'towel-hand',
    name: 'ハンドタオル',
    categoryId: 'towel',
    options: [
      {
        id: 'print',
        label: '印刷方法',
        choices: [
          { id: 'dyeing', label: '染料プリント', priceModifier: 1.0 },
          { id: 'full', label: 'フルカラープリント', priceModifier: 1.4 },
        ],
      },
    ],
    basePrices: [
      { quantity: 100, unitPrice: 200 },
      { quantity: 300, unitPrice: 160 },
      { quantity: 500, unitPrice: 130 },
      { quantity: 1000, unitPrice: 105 },
      { quantity: 3000, unitPrice: 80 },
      { quantity: 5000, unitPrice: 65 },
    ],
  },
];

// カテゴリでフィルタ
export function getProductsByCategory(categoryId: CategoryId): ProductOption[] {
  return PRODUCT_CATALOG.filter((p) => p.categoryId === categoryId);
}

// 商品IDで検索
export function getProductById(productId: string): ProductOption | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === productId);
}

// 価格計算（C1修正: discountRateは同一数量tierでのオプション割引のみ反映）
// （M5修正: modifier一括乗算後に丸め）
export function calculatePrice(
  product: ProductOption,
  selectedOptions: Record<string, string>,
  quantity: Quantity
): PriceResult {
  // ベース単価を数量から取得
  const tier = product.basePrices.find((t) => t.quantity === quantity);
  if (!tier) {
    const fallback = product.basePrices[0];
    return { unitPrice: fallback.unitPrice, totalPrice: fallback.unitPrice * quantity, discountRate: 0 };
  }

  const baseUnitPrice = tier.unitPrice;

  // オプションの価格修正を一括計算（丸め誤差防止）
  let combinedModifier = 1.0;
  for (const group of product.options) {
    const selectedChoiceId = selectedOptions[group.id];
    if (selectedChoiceId) {
      const choice = group.choices.find((c) => c.id === selectedChoiceId);
      if (choice) {
        combinedModifier *= choice.priceModifier;
      }
    }
  }

  const unitPrice = Math.round(baseUnitPrice * combinedModifier);
  const totalPrice = unitPrice * quantity;

  // 割引率: 同じtierのベース価格（modifier=1.0）との比較
  const discountRate = combinedModifier < 1.0
    ? Math.round((1 - combinedModifier) * 100)
    : 0;

  return { unitPrice, totalPrice, discountRate };
}

// 価格のフォーマット
export function formatPrice(price: number): string {
  return '¥' + price.toLocaleString('ja-JP');
}

// 見積もりデータの型（estimate↔order間の引き継ぎ用）
export interface EstimateData {
  productId: string;
  selectedOptions: Record<string, string>;
  quantity: Quantity;
}

// EstimateData → URLパラメータ（IDベースで安全）
export function estimateToSearchParams(data: EstimateData): string {
  const params = new URLSearchParams({
    pid: data.productId,
    qty: String(data.quantity),
    ...Object.fromEntries(
      Object.entries(data.selectedOptions).map(([k, v]) => [`opt_${k}`, v])
    ),
  });
  return params.toString();
}

// URLパラメータ → EstimateData（IDベースで安全）
export function searchParamsToEstimate(searchParams: URLSearchParams): EstimateData | null {
  const productId = searchParams.get('pid');
  const qty = Number(searchParams.get('qty'));
  if (!productId || !qty) return null;

  const product = getProductById(productId);
  if (!product) return null;

  // Validate quantity
  if (!(QUANTITY_OPTIONS as readonly number[]).includes(qty)) return null;

  const selectedOptions: Record<string, string> = {};
  for (const group of product.options) {
    const val = searchParams.get(`opt_${group.id}`);
    if (val && group.choices.some((c) => c.id === val)) {
      selectedOptions[group.id] = val;
    } else {
      selectedOptions[group.id] = group.choices[0].id;
    }
  }

  return { productId, selectedOptions, quantity: qty as Quantity };
}

// 注文データ型（将来のバックエンド連携用）
export interface OrderData {
  product: {
    id: string;
    name: string;
    categoryId: CategoryId;
    options: Record<string, { label: string; value: string }>;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  };
  customer: {
    company: string;
    name: string;
    tel: string;
    email: string;
    deliveryDate: string;
    note: string;
  };
  submittedAt: string;
}
