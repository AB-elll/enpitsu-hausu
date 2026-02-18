// デザインシミュレーター 商品テンプレートデータ

export type ProductTemplate = {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  width: number;   // テンプレート幅 (px)
  height: number;  // テンプレート高さ (px)
  shape: 'rect' | 'circle' | 'rounded-rect' | 'fan' | 'keychain';
  defaultBgColor: string;
  description: string;
  // テキスト配置の初期位置 (比率 0-1)
  textArea: { x: number; y: number; width: number; height: number };
  // 画像配置の初期位置 (比率 0-1)
  imageArea: { x: number; y: number; width: number; height: number };
};

export const productTemplates: ProductTemplate[] = [
  {
    id: 'calendar-wall-b3',
    name: '壁掛けカレンダー (B3)',
    category: 'カレンダー',
    categoryColor: '#2563EB',
    width: 364,
    height: 515,
    shape: 'rect',
    defaultBgColor: '#FFFFFF',
    description: 'B3サイズの壁掛けカレンダー。上部にデザイン、下部にカレンダー面。',
    textArea: { x: 0.1, y: 0.05, width: 0.8, height: 0.15 },
    imageArea: { x: 0.05, y: 0.2, width: 0.9, height: 0.35 },
  },
  {
    id: 'calendar-desk',
    name: '卓上カレンダー',
    category: 'カレンダー',
    categoryColor: '#2563EB',
    width: 420,
    height: 297,
    shape: 'rect',
    defaultBgColor: '#FFFFFF',
    description: '卓上リング式カレンダー。横型デザイン。',
    textArea: { x: 0.1, y: 0.05, width: 0.8, height: 0.15 },
    imageArea: { x: 0.05, y: 0.22, width: 0.9, height: 0.45 },
  },
  {
    id: 'uchiwa-standard',
    name: 'うちわ（レギュラー）',
    category: 'うちわ・扇子',
    categoryColor: '#22C55E',
    width: 400,
    height: 500,
    shape: 'fan',
    defaultBgColor: '#FFFFFF',
    description: '標準サイズのうちわ。丸型の印刷面。',
    textArea: { x: 0.15, y: 0.08, width: 0.7, height: 0.15 },
    imageArea: { x: 0.1, y: 0.2, width: 0.8, height: 0.4 },
  },
  {
    id: 'acrylic-keychain',
    name: 'アクリルキーホルダー',
    category: 'アクリルグッズ',
    categoryColor: '#8B5CF6',
    width: 200,
    height: 280,
    shape: 'keychain',
    defaultBgColor: '#FFFFFF',
    description: 'アクリルキーホルダー。透明素材にフルカラー印刷。',
    textArea: { x: 0.1, y: 0.55, width: 0.8, height: 0.15 },
    imageArea: { x: 0.1, y: 0.1, width: 0.8, height: 0.45 },
  },
  {
    id: 'acrylic-stand',
    name: 'アクリルスタンド',
    category: 'アクリルグッズ',
    categoryColor: '#8B5CF6',
    width: 300,
    height: 400,
    shape: 'rounded-rect',
    defaultBgColor: '#FFFFFF',
    description: 'アクリルスタンド。フルカラー印刷でオリジナルデザイン。',
    textArea: { x: 0.1, y: 0.65, width: 0.8, height: 0.12 },
    imageArea: { x: 0.05, y: 0.05, width: 0.9, height: 0.58 },
  },
  {
    id: 'sticker-circle',
    name: '丸型シール',
    category: 'シール・ステッカー',
    categoryColor: '#F97316',
    width: 300,
    height: 300,
    shape: 'circle',
    defaultBgColor: '#FFFFFF',
    description: '丸型シール。ロゴやキャラクターに最適。',
    textArea: { x: 0.15, y: 0.6, width: 0.7, height: 0.15 },
    imageArea: { x: 0.15, y: 0.1, width: 0.7, height: 0.45 },
  },
  {
    id: 'sticker-rect',
    name: '角型シール',
    category: 'シール・ステッカー',
    categoryColor: '#F97316',
    width: 400,
    height: 250,
    shape: 'rounded-rect',
    defaultBgColor: '#FFFFFF',
    description: '角型シール（角丸）。ラベルや商品シールに。',
    textArea: { x: 0.05, y: 0.6, width: 0.9, height: 0.2 },
    imageArea: { x: 0.05, y: 0.05, width: 0.9, height: 0.5 },
  },
  {
    id: 'towel-face',
    name: 'フェイスタオル',
    category: 'タオル・名入れ',
    categoryColor: '#EC4899',
    width: 500,
    height: 200,
    shape: 'rect',
    defaultBgColor: '#FFFFFF',
    description: 'フェイスタオル。名入れ印刷対応。',
    textArea: { x: 0.1, y: 0.3, width: 0.8, height: 0.4 },
    imageArea: { x: 0.02, y: 0.05, width: 0.3, height: 0.9 },
  },
];

export const fontOptions = [
  { id: 'noto-sans', name: 'ゴシック体', family: '"Noto Sans JP", sans-serif' },
  { id: 'serif', name: '明朝体', family: 'serif' },
  { id: 'rounded', name: '丸ゴシック', family: '"M PLUS Rounded 1c", sans-serif' },
  { id: 'monospace', name: '等幅', family: 'monospace' },
];

export const bgColorOptions = [
  { name: 'ホワイト', value: '#FFFFFF' },
  { name: 'アイボリー', value: '#FFFFF0' },
  { name: 'ライトブルー', value: '#DBEAFE' },
  { name: 'ライトグリーン', value: '#DCFCE7' },
  { name: 'ライトピンク', value: '#FCE7F3' },
  { name: 'ライトイエロー', value: '#FEF9C3' },
  { name: 'ライトパープル', value: '#EDE9FE' },
  { name: 'ライトオレンジ', value: '#FED7AA' },
  { name: 'ブラック', value: '#1F2937' },
  { name: 'ネイビー', value: '#1E3A5F' },
  { name: 'レッド', value: '#DC2626' },
  { name: 'ブルー', value: '#2563EB' },
];

export const textColorOptions = [
  { name: 'ブラック', value: '#1F2937' },
  { name: 'ホワイト', value: '#FFFFFF' },
  { name: 'レッド', value: '#DC2626' },
  { name: 'ブルー', value: '#2563EB' },
  { name: 'グリーン', value: '#16A34A' },
  { name: 'オレンジ', value: '#EA580C' },
  { name: 'パープル', value: '#7C3AED' },
  { name: 'ピンク', value: '#DB2777' },
  { name: 'ゴールド', value: '#CA8A04' },
];
