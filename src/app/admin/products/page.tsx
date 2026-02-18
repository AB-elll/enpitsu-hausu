'use client';

import { useState } from 'react';
import { adminProducts } from '@/lib/admin-data';

const stockColors: Record<string, string> = {
  '在庫あり': 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  '残りわずか': 'bg-[var(--color-accent)]/20 text-amber-700',
  '在庫切れ': 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]',
};

const categories = ['すべて', ...Array.from(new Set(adminProducts.map(p => p.category)))];

export default function ProductsPage() {
  const [catFilter, setCatFilter] = useState('すべて');
  const [search, setSearch] = useState('');

  const filtered = adminProducts.filter((p) => {
    const matchCat = catFilter === 'すべて' || p.category === catFilter;
    const matchSearch = search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6 font-[family-name:var(--font-heading)]">
        商品管理
      </h1>

      {/* フィルター */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                catFilter === c
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="sm:ml-auto">
          <input
            type="text"
            placeholder="商品名・IDで検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition"
          />
        </div>
      </div>

      {/* 商品グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all">
            {/* カテゴリカラーバー */}
            <div className="h-1" style={{ backgroundColor: product.categoryColor }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-[var(--color-text)] text-sm">{product.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{product.id}</p>
                </div>
                <span
                  className="inline-block w-2.5 h-2.5 rounded-sm rotate-45 shrink-0 mt-1"
                  style={{ backgroundColor: product.categoryColor }}
                />
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                {product.category}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold font-[family-name:var(--font-price)] text-[var(--color-secondary)]">
                  ¥{product.price.toLocaleString()}
                  <span className="text-xs font-normal text-[var(--color-text-secondary)] ml-0.5">/個〜</span>
                </span>
                <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${stockColors[product.stock]}`}>
                  {product.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-secondary)]">
          該当する商品はありません
        </div>
      )}

      <p className="text-xs text-[var(--color-text-secondary)] mt-4">
        {filtered.length}件表示 / 全{adminProducts.length}件
      </p>
    </div>
  );
}
