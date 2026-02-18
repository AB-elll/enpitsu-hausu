import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME, COMPANY_TEL, COMPANY_FAX, COMPANY_EMAIL, COMPANY_ADDRESS, CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* CTA Banner */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            ノベルティ制作のご相談、お気軽にどうぞ
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            小ロット100個〜 / 最短3日納品 / 全国送料無料（条件あり）
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              無料お見積もり
            </Link>
            <a
              href={`tel:${COMPANY_TEL.replace(/-/g, '')}`}
              className="inline-flex items-center px-8 py-3.5 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              📞 {COMPANY_TEL}
            </a>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <Image src="/enpitsu-hausu/logo-horizontal.png" alt={SITE_NAME} width={180} height={36} className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm leading-relaxed mb-4">{COMPANY_ADDRESS}</p>
            <div className="space-y-1 text-sm">
              <p>TEL: <a href={`tel:${COMPANY_TEL.replace(/-/g, '')}`} className="hover:text-white transition-colors">{COMPANY_TEL}</a></p>
              <p>FAX: {COMPANY_FAX}</p>
              <p>Email: <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white transition-colors">{COMPANY_EMAIL}</a></p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">商品カテゴリ</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={cat.href} className="text-sm hover:text-white transition-colors flex items-center gap-2">
                    <span>{cat.icon}</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">インフォメーション</h3>
            <ul className="space-y-2.5">
              <li><Link href="/flow" className="text-sm hover:text-white transition-colors">ご注文の流れ</Link></li>
              <li><Link href="/works" className="text-sm hover:text-white transition-colors">制作実績</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">会社概要</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} {SITE_NAME} All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">プライバシーポリシー</Link>
            <Link href="/sitemap" className="hover:text-gray-300 transition-colors">サイトマップ</Link>
            <Link href="/auth/login" className="hover:text-gray-300 transition-colors">管理</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
