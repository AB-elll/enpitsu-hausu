// ダミー注文・管理データ

export type OrderStatus = '新規' | '制作中' | '完了' | '発送済み';

export interface Order {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  date: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: '在庫あり' | '残りわずか' | '在庫切れ';
  categoryColor: string;
}

export const orders: Order[] = [
  { id: 'ORD-2026-001', customer: '株式会社ABC商事', product: 'B3壁掛けカレンダー', quantity: 500, total: 185000, status: '発送済み', date: '2026-02-01' },
  { id: 'ORD-2026-002', customer: '田中印刷株式会社', product: 'アクリルキーホルダー', quantity: 200, total: 96000, status: '完了', date: '2026-02-03' },
  { id: 'ORD-2026-003', customer: '有限会社山田工務店', product: 'ポケットティッシュ', quantity: 1000, total: 45000, status: '制作中', date: '2026-02-05' },
  { id: 'ORD-2026-004', customer: 'NPO法人みらい', product: '紙うちわ', quantity: 300, total: 72000, status: '制作中', date: '2026-02-08' },
  { id: 'ORD-2026-005', customer: '合同会社テック', product: 'お名前シール', quantity: 500, total: 35000, status: '新規', date: '2026-02-10' },
  { id: 'ORD-2026-006', customer: '佐藤建設株式会社', product: 'フェイスタオル', quantity: 100, total: 128000, status: '新規', date: '2026-02-12' },
  { id: 'ORD-2026-007', customer: '株式会社グリーンライフ', product: 'A2壁掛けカレンダー', quantity: 300, total: 156000, status: '発送済み', date: '2026-02-14' },
  { id: 'ORD-2026-008', customer: '医療法人健康会', product: 'マスク（広告ラベル封入）', quantity: 2000, total: 220000, status: '制作中', date: '2026-02-15' },
  { id: 'ORD-2026-009', customer: '株式会社フラワー', product: 'アクリルスタンド', quantity: 150, total: 112000, status: '新規', date: '2026-02-16' },
  { id: 'ORD-2026-010', customer: '東京イベント企画', product: '型抜きステッカー', quantity: 800, total: 64000, status: '完了', date: '2026-02-17' },
  { id: 'ORD-2026-011', customer: 'レストランさくら', product: 'リング式卓上カレンダー', quantity: 200, total: 98000, status: '発送済み', date: '2026-01-20' },
  { id: 'ORD-2026-012', customer: '株式会社スポーツワン', product: 'スポーツタオル', quantity: 50, total: 75000, status: '完了', date: '2026-01-25' },
];

export const adminProducts: AdminProduct[] = [
  { id: 'P001', name: 'B2壁掛けカレンダー', category: 'カレンダー', price: 380, stock: '在庫あり', categoryColor: '#2563EB' },
  { id: 'P002', name: 'B3壁掛けカレンダー', category: 'カレンダー', price: 320, stock: '在庫あり', categoryColor: '#2563EB' },
  { id: 'P003', name: 'リング式卓上カレンダー', category: 'カレンダー', price: 280, stock: '残りわずか', categoryColor: '#2563EB' },
  { id: 'P004', name: '紙うちわ', category: 'うちわ・扇子', price: 120, stock: '在庫あり', categoryColor: '#22C55E' },
  { id: 'P005', name: '竹うちわ', category: 'うちわ・扇子', price: 250, stock: '在庫あり', categoryColor: '#22C55E' },
  { id: 'P006', name: '絹扇子', category: 'うちわ・扇子', price: 480, stock: '残りわずか', categoryColor: '#22C55E' },
  { id: 'P007', name: 'アクリルキーホルダー', category: 'アクリルグッズ', price: 350, stock: '在庫あり', categoryColor: '#8B5CF6' },
  { id: 'P008', name: 'アクリルスタンド', category: 'アクリルグッズ', price: 580, stock: '在庫あり', categoryColor: '#8B5CF6' },
  { id: 'P009', name: 'お名前シール', category: 'シール', price: 45, stock: '在庫あり', categoryColor: '#F97316' },
  { id: 'P010', name: '型抜きステッカー', category: 'シール', price: 65, stock: '在庫あり', categoryColor: '#F97316' },
  { id: 'P011', name: 'ポケットティッシュ', category: '衛生用品', price: 30, stock: '在庫あり', categoryColor: '#06B6D4' },
  { id: 'P012', name: 'マスク（広告ラベル封入）', category: '衛生用品', price: 85, stock: '在庫切れ', categoryColor: '#06B6D4' },
  { id: 'P013', name: 'フェイスタオル', category: 'タオル', price: 890, stock: '在庫あり', categoryColor: '#EC4899' },
  { id: 'P014', name: 'スポーツタオル', category: 'タオル', price: 1200, stock: '残りわずか', categoryColor: '#EC4899' },
];

// サマリー計算
export function getMonthlyStats() {
  const now = new Date();
  const thisMonth = orders.filter(o => {
    const d = new Date(o.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  return {
    orderCount: thisMonth.length,
    totalSales: thisMonth.reduce((sum, o) => sum + o.total, 0),
    newOrders: thisMonth.filter(o => o.status === '新規').length,
    inProgress: thisMonth.filter(o => o.status === '制作中').length,
  };
}

export function getRecentOrders(count: number = 5): Order[] {
  return [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
}
