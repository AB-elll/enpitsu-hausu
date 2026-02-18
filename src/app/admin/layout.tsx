'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, logout } from '@/lib/auth';

const navItems = [
  { href: '/admin', label: 'ダッシュボード', icon: '◆' },
  { href: '/admin/orders', label: '注文管理', icon: '▦' },
  { href: '/admin/products', label: '商品管理', icon: '▣' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/auth/login');
    } else {
      setReady(true);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      {/* モバイルオーバーレイ */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* サイドバー */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-[var(--color-border)] z-40 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-6 py-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--color-primary)] rotate-45" />
            <span className="font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">
              えんぴつはうす
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">管理パネル</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[var(--color-border)]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--color-danger)] hover:bg-red-50 transition w-full"
          >
            <span className="text-base">✕</span>
            ログアウト
          </button>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <div className="flex-1 min-w-0">
        {/* モバイルヘッダー */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-[var(--color-border)] px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--color-surface)] transition"
          >
            <span className="text-lg">☰</span>
          </button>
          <span className="font-bold text-[var(--color-text)] text-sm font-[family-name:var(--font-heading)]">
            管理パネル
          </span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
