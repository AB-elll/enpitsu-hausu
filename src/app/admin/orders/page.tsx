'use client';

import { useState } from 'react';
import { orders, OrderStatus } from '@/lib/admin-data';

const statuses: (OrderStatus | 'すべて')[] = ['すべて', '新規', '制作中', '完了', '発送済み'];

const statusColors: Record<string, string> = {
  '新規': 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  '制作中': 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
  '完了': 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  '発送済み': 'bg-[var(--color-purple)]/10 text-[var(--color-purple)]',
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'すべて'>('すべて');
  const [search, setSearch] = useState('');

  const filtered = orders.filter((o) => {
    const matchStatus = filter === 'すべて' || o.status === filter;
    const matchSearch = search === '' ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6 font-[family-name:var(--font-heading)]">
        注文管理
      </h1>

      {/* フィルター＆検索 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === s
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="sm:ml-auto">
          <input
            type="text"
            placeholder="注文ID・顧客名・商品で検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition"
          />
        </div>
      </div>

      {/* テーブル */}
      <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
              <th className="px-6 py-3 font-medium">注文ID</th>
              <th className="px-6 py-3 font-medium">日付</th>
              <th className="px-6 py-3 font-medium">顧客</th>
              <th className="px-6 py-3 font-medium">商品</th>
              <th className="px-6 py-3 font-medium text-right">数量</th>
              <th className="px-6 py-3 font-medium text-right">金額</th>
              <th className="px-6 py-3 font-medium">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-[var(--color-text-secondary)]">
                  該当する注文はありません
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]/50 transition">
                  <td className="px-6 py-3 font-mono text-xs">{order.id}</td>
                  <td className="px-6 py-3 text-[var(--color-text-secondary)]">{order.date}</td>
                  <td className="px-6 py-3">{order.customer}</td>
                  <td className="px-6 py-3">{order.product}</td>
                  <td className="px-6 py-3 text-right font-[family-name:var(--font-price)]">{order.quantity.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right font-[family-name:var(--font-price)] font-semibold">¥{order.total.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--color-text-secondary)] mt-4">
        {filtered.length}件表示 / 全{orders.length}件
      </p>
    </div>
  );
}
