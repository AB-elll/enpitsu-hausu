// 納期データ（商品カテゴリ別の標準納期、特急料金等）

export interface DeliveryCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  standardDays: number;       // 標準納期（営業日）
  expressDays: number;        // 特急納期（営業日）
  expressRate: number;        // 特急割増率（例: 1.3 = 30%増）
  quantityThresholds: {
    maxQuantity: number;      // この数量まで
    additionalDays: number;   // 追加日数
  }[];
}

export const DELIVERY_CATEGORIES: DeliveryCategory[] = [
  {
    id: 'calendar',
    name: 'カレンダー',
    icon: '📅',
    color: '#2563EB',
    standardDays: 10,
    expressDays: 5,
    expressRate: 1.4,
    quantityThresholds: [
      { maxQuantity: 500, additionalDays: 0 },
      { maxQuantity: 1000, additionalDays: 3 },
      { maxQuantity: 5000, additionalDays: 7 },
      { maxQuantity: Infinity, additionalDays: 14 },
    ],
  },
  {
    id: 'uchiwa',
    name: 'うちわ・扇子',
    icon: '🪭',
    color: '#22C55E',
    standardDays: 7,
    expressDays: 3,
    expressRate: 1.3,
    quantityThresholds: [
      { maxQuantity: 500, additionalDays: 0 },
      { maxQuantity: 2000, additionalDays: 3 },
      { maxQuantity: 5000, additionalDays: 5 },
      { maxQuantity: Infinity, additionalDays: 10 },
    ],
  },
  {
    id: 'acrylic',
    name: 'アクリルグッズ',
    icon: '✨',
    color: '#8B5CF6',
    standardDays: 7,
    expressDays: 4,
    expressRate: 1.5,
    quantityThresholds: [
      { maxQuantity: 200, additionalDays: 0 },
      { maxQuantity: 500, additionalDays: 3 },
      { maxQuantity: 1000, additionalDays: 5 },
      { maxQuantity: Infinity, additionalDays: 10 },
    ],
  },
  {
    id: 'seal',
    name: 'シール・ステッカー',
    icon: '🏷️',
    color: '#F97316',
    standardDays: 5,
    expressDays: 2,
    expressRate: 1.3,
    quantityThresholds: [
      { maxQuantity: 1000, additionalDays: 0 },
      { maxQuantity: 5000, additionalDays: 2 },
      { maxQuantity: 10000, additionalDays: 5 },
      { maxQuantity: Infinity, additionalDays: 8 },
    ],
  },
  {
    id: 'hygiene',
    name: '衛生用品',
    icon: '🧴',
    color: '#06B6D4',
    standardDays: 5,
    expressDays: 3,
    expressRate: 1.3,
    quantityThresholds: [
      { maxQuantity: 500, additionalDays: 0 },
      { maxQuantity: 2000, additionalDays: 2 },
      { maxQuantity: 5000, additionalDays: 5 },
      { maxQuantity: Infinity, additionalDays: 8 },
    ],
  },
  {
    id: 'towel',
    name: 'タオル・名入れ',
    icon: '🧣',
    color: '#EC4899',
    standardDays: 10,
    expressDays: 5,
    expressRate: 1.5,
    quantityThresholds: [
      { maxQuantity: 200, additionalDays: 0 },
      { maxQuantity: 500, additionalDays: 3 },
      { maxQuantity: 1000, additionalDays: 7 },
      { maxQuantity: Infinity, additionalDays: 14 },
    ],
  },
];

// 繁忙期定義
export interface BusyPeriod {
  label: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  color: string;
  additionalDays: number;
}

export const BUSY_PERIODS: BusyPeriod[] = [
  { label: '入学・卒業シーズン', startMonth: 3, startDay: 1, endMonth: 4, endDay: 30, color: '#F97316', additionalDays: 3 },
  { label: '夏祭りシーズン', startMonth: 7, startDay: 1, endMonth: 8, endDay: 31, color: '#EF4444', additionalDays: 3 },
  { label: '年末繁忙期', startMonth: 12, startDay: 1, endMonth: 12, endDay: 31, color: '#8B5CF6', additionalDays: 5 },
];

/**
 * 指定日が繁忙期かどうか判定
 */
export function getBusyPeriod(date: Date): BusyPeriod | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  for (const period of BUSY_PERIODS) {
    if (
      (month > period.startMonth || (month === period.startMonth && day >= period.startDay)) &&
      (month < period.endMonth || (month === period.endMonth && day <= period.endDay))
    ) {
      return period;
    }
  }
  return null;
}

/**
 * 営業日を加算（土日を除く）
 */
export function addBusinessDays(start: Date, days: number): Date {
  const result = new Date(start);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const dow = result.getDay();
    if (dow !== 0 && dow !== 6) {
      added++;
    }
  }
  return result;
}

/**
 * 納期計算
 */
export function calculateDeliveryDate(
  orderDate: Date,
  category: DeliveryCategory,
  quantity: number,
  isExpress: boolean,
): { deliveryDate: Date; totalDays: number; busyPeriod: BusyPeriod | null } {
  const baseDays = isExpress ? category.expressDays : category.standardDays;

  // 数量による追加日数
  let quantityDays = 0;
  for (const t of category.quantityThresholds) {
    if (quantity <= t.maxQuantity) {
      quantityDays = t.additionalDays;
      break;
    }
  }

  // 繁忙期追加
  const busyPeriod = getBusyPeriod(orderDate);
  const busyDays = busyPeriod ? busyPeriod.additionalDays : 0;

  const totalDays = baseDays + quantityDays + busyDays;
  const deliveryDate = addBusinessDays(orderDate, totalDays);

  return { deliveryDate, totalDays, busyPeriod };
}
