'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS, COMPANY_TEL } from '@/lib/constants';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      {/* Trust Bar */}
      <div className="bg-primary text-white text-xs py-1.5 text-center font-medium tracking-wide">
        <span className="hidden sm:inline">📞 お気軽にお電話ください </span>
        <a href={`tel:${COMPANY_TEL.replace(/-/g, '')}`} className="underline underline-offset-2">
          {COMPANY_TEL}
        </a>
        <span className="mx-3 opacity-50">|</span>
        <span>年間納品実績 <strong>3,000件以上</strong></span>
        <span className="mx-3 opacity-50 hidden sm:inline">|</span>
        <span className="hidden sm:inline">小ロット <strong>100個〜</strong> OK</span>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-horizontal.png"
              alt="えんぴつはうす"
              width={200}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="メインナビゲーション">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-text hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-secondary text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              お見積もり・ご相談
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="メニューを開く"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="モバイルナビゲーション">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-text hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 bg-secondary text-white font-medium rounded-lg"
              >
                お見積もり・ご相談
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
