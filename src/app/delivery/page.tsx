'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DELIVERY_CATEGORIES,
  BUSY_PERIODS,
  calculateDeliveryDate,
  getBusyPeriod,
  type DeliveryCategory,
  type BusyPeriod,
} from '@/lib/delivery-data';

/* ─── helpers ─── */

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDate(d: Date) {
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

function isBusyDate(date: Date): BusyPeriod | null {
  return getBusyPeriod(date);
}

/* ─── page ─── */

export default function DeliveryPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(DELIVERY_CATEGORIES[0].id);
  const [quantity, setQuantity] = useState(100);
  const [isExpress, setIsExpress] = useState(false);

  const selectedCategory = DELIVERY_CATEGORIES.find((c) => c.id === selectedCategoryId)!;

  const result = useMemo(
    () => calculateDeliveryDate(selectedDate, selectedCategory, quantity, isExpress),
    [selectedDate, selectedCategory, quantity, isExpress],
  );

  /* calendar grid */
  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const totalDays = daysInMonth(viewYear, viewMonth);
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) calendarCells.push(null);
  for (let d = 1; d <= totalDays; d++) calendarCells.push(d);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  const quantityOptions = [100, 200, 500, 1000, 2000, 5000, 10000];

  return (
    <main className="min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-primary text-white py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            📦 納期カレンダー
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            商品カテゴリと数量を選んで注文日をクリックすると、納品予定日を自動計算します。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        {/* ─── カテゴリ選択 ─── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">商品カテゴリを選択</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DELIVERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                  selectedCategoryId === cat.id
                    ? 'border-current shadow-md scale-[1.02]'
                    : 'border-transparent bg-surface hover:border-border'
                }`}
                style={selectedCategoryId === cat.id ? { borderColor: cat.color, color: cat.color } : {}}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className={selectedCategoryId === cat.id ? '' : 'text-text'}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* ─── カレンダー ─── */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-surface transition-colors" aria-label="前月">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h3 className="text-xl font-bold">
                {viewYear}年 {viewMonth + 1}月
              </h3>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-surface transition-colors" aria-label="次月">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* dow header */}
            <div className="grid grid-cols-7 text-center text-xs font-medium text-text-secondary mb-2">
              {['日', '月', '火', '水', '木', '金', '土'].map((d) => (
                <div key={d} className={d === '日' ? 'text-danger' : d === '土' ? 'text-primary' : ''}>{d}</div>
              ))}
            </div>

            {/* cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((day, i) => {
                if (day === null) return <div key={`e${i}`} />;
                const cellDate = new Date(viewYear, viewMonth, day);
                const isToday = isSameDay(cellDate, today);
                const isSelected = isSameDay(cellDate, selectedDate);
                const isDelivery = isSameDay(cellDate, result.deliveryDate);
                const dow = cellDate.getDay();
                const busy = isBusyDate(cellDate);
                const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                return (
                  <button
                    key={day}
                    onClick={() => !isPast && setSelectedDate(cellDate)}
                    disabled={isPast}
                    className={`relative aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                      ${isPast ? 'text-text-secondary/40 cursor-not-allowed' : 'hover:bg-surface cursor-pointer'}
                      ${dow === 0 ? 'text-danger' : dow === 6 ? 'text-primary' : ''}
                      ${isSelected ? 'ring-2 ring-primary bg-primary/10 text-primary font-bold' : ''}
                      ${isDelivery && !isSelected ? 'bg-success/15 text-success font-bold ring-2 ring-success' : ''}
                      ${isToday && !isSelected && !isDelivery ? 'bg-accent/30 font-bold' : ''}
                    `}
                  >
                    {day}
                    {busy && !isPast && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: busy.color }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* legend */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent/40" /> 今日</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary/20 ring-1 ring-primary" /> 注文日</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-success/20 ring-1 ring-success" /> 納品予定日</span>
            </div>
          </div>

          {/* ─── 設定 & 結果 ─── */}
          <div className="lg:col-span-2 space-y-6">
            {/* 数量 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-base font-bold mb-3">数量</h3>
              <div className="flex flex-wrap gap-2">
                {quantityOptions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuantity(q)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      quantity === q
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-surface text-text hover:bg-border'
                    }`}
                  >
                    {q.toLocaleString()}個
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={10}
                step={10}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(10, Number(e.target.value)))}
                className="mt-3 w-full border border-border rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="カスタム数量"
              />
            </div>

            {/* 特急 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setIsExpress(!isExpress)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isExpress ? 'bg-secondary' : 'bg-border'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${isExpress ? 'translate-x-6.5' : 'translate-x-0.5'}`} />
                </div>
                <div>
                  <span className="font-bold text-sm">⚡ 特急対応</span>
                  <p className="text-xs text-text-secondary">
                    割増 {Math.round((selectedCategory.expressRate - 1) * 100)}% で{selectedCategory.expressDays}営業日〜
                  </p>
                </div>
              </label>
            </div>

            {/* 結果 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border-t-4" style={{ borderTopColor: selectedCategory.color }}>
              <h3 className="text-base font-bold mb-4">📋 納期計算結果</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">商品カテゴリ</span>
                  <span className="font-medium">{selectedCategory.icon} {selectedCategory.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">数量</span>
                  <span className="font-medium">{quantity.toLocaleString()}個</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">注文日</span>
                  <span className="font-medium">{formatDate(selectedDate)}</span>
                </div>
                {isExpress && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">特急割増</span>
                    <span className="font-medium text-secondary">+{Math.round((selectedCategory.expressRate - 1) * 100)}%</span>
                  </div>
                )}
                {result.busyPeriod && (
                  <div className="px-3 py-2 rounded-lg text-xs font-medium" style={{ backgroundColor: result.busyPeriod.color + '15', color: result.busyPeriod.color }}>
                    ⚠ {result.busyPeriod.label}（+{result.busyPeriod.additionalDays}営業日）
                  </div>
                )}
                <hr className="border-border" />
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">所要日数</span>
                  <span className="font-bold text-lg" style={{ color: selectedCategory.color }}>
                    {result.totalDays}営業日
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">納品予定日</span>
                  <span className="font-bold text-lg text-success">
                    {formatDate(result.deliveryDate)}
                  </span>
                </div>
              </div>

              <Link
                href="/estimate"
                className="mt-5 block text-center bg-primary text-white rounded-xl py-3 font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                この条件で見積もりする →
              </Link>
            </div>
          </div>
        </div>

        {/* ─── 繁忙期カレンダー ─── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
          <h2 className="text-lg font-bold mb-4">🔥 繁忙期スケジュール</h2>
          <p className="text-sm text-text-secondary mb-4">
            以下の時期は注文が集中するため、通常より納期が長くなります。お早めのご注文をおすすめします。
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {BUSY_PERIODS.map((period) => (
              <div
                key={period.label}
                className="rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: period.color, backgroundColor: period.color + '08' }}
              >
                <h4 className="font-bold text-sm mb-1">{period.label}</h4>
                <p className="text-xs text-text-secondary">
                  {period.startMonth}月{period.startDay}日 〜 {period.endMonth}月{period.endDay}日
                </p>
                <p className="text-xs font-medium mt-1" style={{ color: period.color }}>
                  +{period.additionalDays}営業日
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 注意事項 ─── */}
        <div className="bg-surface rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-bold mb-3">📝 ご注意事項</h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex gap-2"><span className="text-primary">●</span>上記の納期はデータ入稿完了後の目安です。デザイン制作をご依頼の場合は別途日数がかかります。</li>
            <li className="flex gap-2"><span className="text-primary">●</span>校正確認の日数は含まれておりません。校正回数に応じて納期が変動します。</li>
            <li className="flex gap-2"><span className="text-primary">●</span>特急対応は在庫状況により承れない場合がございます。お電話にてご相談ください。</li>
            <li className="flex gap-2"><span className="text-primary">●</span>土日祝日は営業日に含まれません。年末年始・GW・お盆期間は別途ご確認ください。</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
