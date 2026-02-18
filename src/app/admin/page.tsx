'use client';

import Link from 'next/link';
import { getMonthlyStats, getRecentOrders } from '@/lib/admin-data';

const statusColors: Record<string, string> = {
  '新規': 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  '制作中': 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
  '完了': 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  '発送済み': 'bg-[var(--color-purple)]/10 text-[var(--color-purple)]',
};

export default function AdminDashboard() {
  const stats = getMonthlyStats();
  const recent = getRecentOrders(5);

  const cards = [
    { label: '今月の注文数', value: `${stats.orderCount}件`, color: 'var(--color-primary)', icon: '▦' },
    { label: '今月の売上', value: `¥${stats.totalSales.toLocaleString()}`, color: 'var(--color-success)', icon: '◈' },
    { label: '新規注文', value: `${stats.newOrders}件`, color: 'var(--color-secondary)', icon: '◇' },
    { label: '制作中', value: `${stats.inProgress}件`, color: 'var(--color-purple)', icon: '◆' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6 font-[family-name:var(--font-heading)]">
        ダッシュボード
      </h1>

      {/* 統計カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--color-text-secondary)]">{card.label}</span>
              <span className="text-xl" style={{ color: card.color }}>{card.icon}</span>
            </div>
            <p className="text-2xl font-bold font-[family-name:var(--font-price)]" style={{ color: card.color }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* 最近の注文 */}
      <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">
            最近の注文
          </h2>
          <Link href="/admin/orders" className="text-sm text-[var(--color-primary)] hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
                <th className="px-6 py-3 font-medium">注文ID</th>
                <th className="px-6 py-3 font-medium">顧客</th>
                <th className="px-6 py-3 font-medium">商品</th>
                <th className="px-6 py-3 font-medium text-right">金額</th>
                <th className="px-6 py-3 font-medium">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((order) => (
                <tr key={order.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]/50 transition">
                  <td className="px-6 py-3 font-mono text-xs">{order.id}</td>
                  <td className="px-6 py-3">{order.customer}</td>
                  <td className="px-6 py-3">{order.product}</td>
                  <td className="px-6 py-3 text-right font-[family-name:var(--font-price)] font-semibold">
                    ¥{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
