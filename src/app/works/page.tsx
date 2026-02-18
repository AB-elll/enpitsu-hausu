'use client';

import { useState } from 'react';
import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { galleryItems, ALL_CATEGORIES, CATEGORY_COLORS, type GalleryCategory } from '@/lib/gallery-data';

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'すべて'>('すべて');

  const filtered = activeCategory === 'すべて'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '制作実績' }]} />

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">制作実績</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          年間3,000件以上の納品実績。カレンダー・うちわ・アクリルグッズなど、
          多彩なノベルティの制作事例をご紹介いたします。
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-10 max-w-xl mx-auto">
        {[
          { value: '3,000+', label: '年間納品件数' },
          { value: '98%', label: 'リピート率' },
          { value: '54種', label: 'カレンダー種類' },
        ].map((stat) => (
          <div key={stat.label} className="text-center bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-primary font-[family-name:var(--font-price)]">{stat.value}</div>
            <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('すべて')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === 'すべて'
              ? 'bg-text text-white shadow-md'
              : 'bg-white text-text-secondary border border-border hover:border-text hover:text-text'
          }`}
        >
          すべて ({galleryItems.length})
        </button>
        {ALL_CATEGORIES.map((cat) => {
          const count = galleryItems.filter(i => i.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-white shadow-md'
                  : 'bg-white text-text-secondary border border-border hover:shadow-sm'
              }`}
              style={isActive ? { backgroundColor: CATEGORY_COLORS[cat] } : undefined}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/works/${item.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Category Color Bar */}
            <div className="h-1" style={{ backgroundColor: item.color }} />

            {/* Image Placeholder */}
            <div className="aspect-[4/3] bg-surface flex items-center justify-center relative overflow-hidden">
              {/* Geometric pattern background */}
              <div className="absolute inset-0 opacity-[0.07]">
                <div className="absolute top-4 left-4 w-16 h-16 rounded-full border-4" style={{ borderColor: item.color }} />
                <div className="absolute bottom-6 right-6 w-24 h-24 rotate-45" style={{ borderColor: item.color, borderWidth: 4, borderStyle: 'solid' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl border-4" style={{ borderColor: item.color }} />
              </div>
              <div className="text-center z-10">
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-xs text-text-secondary">制作実績画像</p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-text text-sm px-4 py-2 rounded-full font-medium">
                  詳細を見る →
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <span
                className="inline-block px-2.5 py-0.5 text-xs font-medium text-white rounded-full mb-2"
                style={{ backgroundColor: item.color }}
              >
                {item.category}
              </span>
              <h3 className="font-bold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1">🏢 {item.client}</span>
                <span className="flex items-center gap-1">📦 {item.quantity}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-white rounded-2xl p-10 shadow-sm">
        <h2 className="text-2xl font-bold text-text mb-3">あなたのノベルティも制作しませんか？</h2>
        <p className="text-text-secondary mb-6">小ロット100個から対応。まずはお気軽にお見積もりください。</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/estimate"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm"
          >
            無料見積もりする
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </div>
  );
}
