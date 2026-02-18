'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(id, password)) {
      router.push('/admin');
    } else {
      setError('IDまたはパスワードが正しくありません');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-md">
        {/* 幾何学装飾 */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-4 h-4 bg-[var(--color-primary)] rotate-45" />
          <div className="w-4 h-4 bg-[var(--color-secondary)] rotate-45" />
          <div className="w-4 h-4 bg-[var(--color-success)] rotate-45" />
          <div className="w-4 h-4 bg-[var(--color-purple)] rotate-45" />
        </div>

        <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8">
          <h1 className="text-2xl font-bold text-center text-[var(--color-text)] mb-2 font-[family-name:var(--font-heading)]">
            管理パネル
          </h1>
          <p className="text-center text-[var(--color-text-secondary)] text-sm mb-8">
            えんぴつはうす
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                管理者ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-[var(--color-danger)]/20 text-[var(--color-danger)] text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] text-white font-medium rounded-lg px-4 py-3 hover:bg-[var(--color-primary-dark)] hover:-translate-y-0.5 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
