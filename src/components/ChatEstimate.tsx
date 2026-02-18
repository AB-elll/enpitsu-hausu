'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { CATEGORIES, type CategoryId } from '@/lib/constants';
import {
  getProductsByCategory,
  getProductById,
  calculatePrice,
  formatPrice,
  estimateToSearchParams,
  type ProductOption,
  type Quantity,
  QUANTITY_OPTIONS,
} from '@/lib/pricing';

// ─── Types ───
type Step = 'category' | 'product' | 'quantity' | 'options' | 'estimate';

interface ChatMsg {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/enpitsu-hausu';
const STEP_TOTAL = 4; // category → product → quantity → options/estimate

function stepsLeft(step: Step): number {
  const map: Record<Step, number> = { category: 3, product: 2, quantity: 1, options: 1, estimate: 0 };
  return map[step] ?? 0;
}

function deliveryDays(catId: string): string {
  const m: Record<string, string> = {
    calendar: '約10〜14営業日', uchiwa: '約5〜7営業日', acrylic: '約7〜10営業日',
    seal: '約3〜7営業日', hygiene: '約5〜7営業日', towel: '約10〜14営業日',
  };
  return m[catId] || '約7〜14営業日';
}

// ─── Pill Buttons ───
function Pills({ items, onPick }: { items: { id: string; label: string; icon?: string }[]; onPick: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button key={it.id} onClick={() => onPick(it.id)}
          className="rounded-full border-2 border-primary/30 bg-white px-4 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary/10 active:scale-95"
          style={{ minHeight: 44 }}>
          {it.icon && <span className="mr-1">{it.icon}</span>}{it.label}
        </button>
      ))}
    </div>
  );
}

// ─── Quantity Input ───
function QtyInput({ onPick }: { onPick: (n: number) => void }) {
  const [v, setV] = useState('');
  const presets = [100, 200, 300, 500, 1000];
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {presets.map((q) => (
          <button key={q} onClick={() => onPick(q)}
            className="rounded-full border-2 border-primary/30 bg-white px-4 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary/10 active:scale-95"
            style={{ minHeight: 44 }}>
            {q.toLocaleString()}個
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="number" min={10} placeholder="その他の数量" value={v} onChange={(e) => setV(e.target.value)}
          className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary" style={{ minHeight: 44 }} />
        <button onClick={() => { const n = parseInt(v); if (n >= 10) onPick(n); }}
          disabled={!v || parseInt(v) < 10}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-40" style={{ minHeight: 44 }}>
          決定
        </button>
      </div>
    </div>
  );
}

// ─── Estimate Card ───
function EstCard({ product, qty, opts }: { product: ProductOption; qty: Quantity; opts: Record<string, string> }) {
  const r = calculatePrice(product, opts, qty);
  const optLabels = product.options.map((g) => {
    const c = g.choices.find((ch) => ch.id === opts[g.id]);
    return `${g.label}: ${c?.label || '—'}`;
  });
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-white">
      <div className="bg-primary px-4 py-2"><div className="text-sm font-bold text-white">📊 お見積もり結果</div></div>
      <div className="space-y-3 p-4">
        <div><div className="text-xs text-text-secondary">商品名</div><div className="font-bold text-text">{product.name}</div></div>
        {optLabels.length > 0 && <div><div className="text-xs text-text-secondary">オプション</div>{optLabels.map((l, i) => <div key={i} className="text-sm text-text">{l}</div>)}</div>}
        <div className="grid grid-cols-2 gap-3">
          <div><div className="text-xs text-text-secondary">数量</div><div className="font-bold text-text">{qty.toLocaleString()}個</div></div>
          <div><div className="text-xs text-text-secondary">単価</div><div className="font-bold text-text">{formatPrice(r.unitPrice)}</div></div>
        </div>
        <div className="border-t border-primary/10 pt-3">
          <div className="flex items-end justify-between">
            <div><div className="text-xs text-text-secondary">合計金額（税抜）</div><div className="text-2xl font-bold text-primary">{formatPrice(r.totalPrice)}</div></div>
            <div className="text-right"><div className="text-xs text-text-secondary">納期目安</div><div className="text-sm font-medium text-text">{deliveryDays(product.categoryId)}</div></div>
          </div>
        </div>
        {r.discountRate > 0 && <div className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">🎉 オプション割引 {r.discountRate}% 適用中！</div>}
      </div>
    </div>
  );
}

// ─── Main ───
export default function ChatEstimate() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ id: 0, role: 'bot', text: 'こんにちは！えんぴつくんです 🎨✏️\nノベルティの見積もりをチャットで簡単にできますよ！\n\nどんな商品をお探しですか？' }]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>('category');
  const [catId, setCatId] = useState<CategoryId | null>(null);
  const [prodId, setProdId] = useState<string | null>(null);
  const [qty, setQty] = useState<Quantity | null>(null);
  const [opts, setOpts] = useState<Record<string, string>>({});
  const [optIdx, setOptIdx] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  let _id = useRef(1);

  const scroll = () => setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);

  const pushUser = (text: string) => {
    setMsgs((p) => [...p, { id: _id.current++, role: 'user', text }]);
    scroll();
  };

  const pushBot = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((p) => [...p, { id: _id.current++, role: 'bot', text }]);
      scroll();
    }, 800);
  };

  // ─── Handlers ───
  const pickCategory = (id: string) => {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) return;
    pushUser(`${cat.icon} ${cat.name}`);
    setCatId(id as CategoryId);
    setStep('product');
    pushBot(`${cat.name}ですね！いい選択です！✨\n\nどのタイプがよろしいですか？`);
  };

  const pickProduct = (id: string) => {
    const p = getProductById(id);
    if (!p) return;
    pushUser(p.name);
    setProdId(id);
    setStep('quantity');
    pushBot(`${p.name}ですね！👍\n\n数量はいくつですか？`);
  };

  const pickQty = (n: number) => {
    pushUser(`${n.toLocaleString()}個`);
    const validQty = [...QUANTITY_OPTIONS].reduce((a, b) => Math.abs(b - n) < Math.abs(a - n) ? b : a) as Quantity;
    setQty(validQty);
    const p = getProductById(prodId || '');
    if (!p) return;
    if (p.options.length > 0) {
      setStep('options');
      setOptIdx(0);
      setOpts({});
      pushBot(`あともう少しで見積もり出ますよ！📊\n\n${p.options[0].label}はどうしますか？`);
    } else {
      setStep('estimate');
      pushBot('お見積もりが出ました！🎉');
    }
  };

  const pickOption = (choiceId: string) => {
    const p = getProductById(prodId || '');
    if (!p) return;
    const group = p.options[optIdx];
    const choice = group?.choices.find((c) => c.id === choiceId);
    pushUser(choice?.label || choiceId);
    const newOpts = { ...opts, [group.id]: choiceId };
    setOpts(newOpts);
    if (optIdx + 1 < p.options.length) {
      const next = p.options[optIdx + 1];
      setOptIdx(optIdx + 1);
      pushBot(`了解です！✨\n\n${next.label}はいかがしますか？`);
    } else {
      setStep('estimate');
      pushBot('お見積もりが出ました！🎉');
    }
  };

  const doOrder = () => {
    const p = getProductById(prodId || '');
    if (!p || !qty) return;
    pushUser('🛒 注文に進む');
    const params = estimateToSearchParams({ productId: p.id, selectedOptions: opts, quantity: qty });
    pushBot('注文フォームに移動しますね！ありがとうございます 🙏✨');
    setTimeout(() => { window.location.href = `${BASE_PATH}/order?${params}`; }, 1500);
  };

  const doReset = () => {
    pushUser('🔄 やり直す');
    setCatId(null); setProdId(null); setQty(null); setOpts({}); setOptIdx(0);
    setStep('category');
    pushBot('もちろん！最初からやり直しましょう 😊\n\nどんな商品をお探しですか？');
  };

  // ─── Interactive UI based on step ───
  const renderControls = () => {
    if (typing) return null;
    const product = prodId ? getProductById(prodId) : null;
    switch (step) {
      case 'category':
        return <Pills items={CATEGORIES.map((c) => ({ id: c.id, label: c.name, icon: c.icon }))} onPick={pickCategory} />;
      case 'product':
        return catId ? <Pills items={getProductsByCategory(catId).map((p) => ({ id: p.id, label: p.name }))} onPick={pickProduct} /> : null;
      case 'quantity':
        return <QtyInput onPick={pickQty} />;
      case 'options':
        if (!product) return null;
        const g = product.options[optIdx];
        return g ? <Pills items={g.choices.map((c) => ({ id: c.id, label: c.label }))} onPick={pickOption} /> : null;
      case 'estimate':
        if (!product || !qty) return null;
        return (
          <div className="space-y-3">
            <EstCard product={product} qty={qty} opts={opts} />
            <div className="text-sm text-text-secondary">この内容で注文に進みますか？</div>
            <div className="flex gap-2">
              <button onClick={doOrder}
                className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-bold text-white transition-all hover:bg-primary-dark active:scale-95" style={{ minHeight: 44 }}>
                🛒 注文に進む
              </button>
              <button onClick={doReset}
                className="flex-1 rounded-full border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-text transition-all hover:border-gray-400 active:scale-95" style={{ minHeight: 44 }}>
                🔄 やり直す
              </button>
            </div>
          </div>
        );
    }
  };

  const left = stepsLeft(step);

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label={open ? 'チャットを閉じる' : 'チャットで見積もり'} aria-expanded={open}>
        {open ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-600 shadow-lg">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
        ) : (
          <>
            <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-primary shadow-md animate-pulse">💬 チャットで見積もり</span>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-lg">
              <img src={`${BASE_PATH}/pencil-icon.png`} alt="えんぴつくん" width={36} height={36} className="object-contain" />
            </div>
          </>
        )}
      </button>

      {/* Window */}
      <div className={`fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl transition-all duration-300 max-sm:inset-0 max-sm:bottom-0 max-sm:right-0 max-sm:rounded-none ${
        open ? 'h-[560px] w-[400px] scale-100 opacity-100 max-sm:h-full max-sm:w-full' : 'pointer-events-none h-0 w-0 scale-90 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center gap-3 bg-primary px-4 py-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg">✏️</div>
          <div className="flex-1">
            <div className="text-sm font-bold">かんたん見積もり</div>
            <div className="text-xs opacity-80">えんぴつくんがご案内します</div>
          </div>
          {left > 0 && <div className="rounded-full bg-white/20 px-2 py-0.5 text-xs">あと{left}ステップ</div>}
          <button onClick={doReset} className="rounded-lg p-1.5 text-xs hover:bg-white/20" title="最初からやり直す">🔄</button>
          <button onClick={() => setOpen(false)} className="hidden rounded-lg p-1 hover:bg-white/20 max-sm:block" aria-label="閉じる">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((STEP_TOTAL - left) / STEP_TOTAL) * 100}%` }} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" role="log">
          {msgs.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeSlideIn_0.3s_ease-out]`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user' ? 'rounded-br-sm bg-primary text-white' : 'rounded-bl-sm bg-surface text-text'
              }`}>
                {m.text.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start animate-[fadeSlideIn_0.3s_ease-out]">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-surface px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* Interactive controls */}
          {!typing && <div className="animate-[fadeSlideIn_0.3s_ease-out] pb-2">{renderControls()}</div>}

          <div ref={endRef} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
