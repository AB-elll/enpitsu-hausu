import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { templates } from '@/lib/guide-data';

export const metadata: Metadata = {
  title: 'テンプレートダウンロード | 入稿ガイド',
  description: '商品カテゴリ別の入稿用テンプレートをダウンロードいただけます。Illustrator・PDF形式をご用意しています。',
};

export default function TemplatesPage() {
  // カテゴリでグループ化
  const grouped = templates.reduce<Record<string, typeof templates>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  return (
    <div className="bg-bg min-h-screen">
      <section className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
          <BreadcrumbNav variant="dark" items={[
            { label: '入稿・デザインガイド', href: '/guide' },
            { label: 'テンプレートダウンロード' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            📥 テンプレートダウンロード
          </h1>
          <p className="text-white/80 max-w-2xl">
            商品カテゴリ別の入稿用テンプレートです。テンプレートを使うことでデータ不備を防げます。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* 使い方 */}
        <section className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h2 className="font-bold text-text mb-3">テンプレートの使い方</h2>
          <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
            <li>該当する商品のテンプレートをダウンロード</li>
            <li>Adobe Illustrator または対応ソフトで開く</li>
            <li>ガイドに沿ってデザインを配置（赤い線＝仕上がり線、青い線＝塗り足し線）</li>
            <li>テンプレートのガイドレイヤーは非表示or削除して入稿</li>
          </ol>
        </section>

        {/* カテゴリ別テンプレート */}
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-xl font-bold font-heading text-text mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: items[0].color }} />
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((t, i) => (
                <div key={i} className="bg-white rounded-xl border border-border overflow-hidden">
                  <div className="h-1" style={{ backgroundColor: t.color }} />
                  <div className="p-5">
                    <h3 className="font-bold text-text mb-2">{t.name}</h3>
                    <p className="text-sm text-text-secondary mb-4">{t.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.formats.map((fmt) => (
                        <button
                          key={fmt}
                          disabled
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary/50 text-white/80 cursor-not-allowed"
                          aria-label={`${t.name} ${fmt}形式テンプレートをダウンロード（準備中）`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {fmt}形式
                          <span className="text-xs opacity-70">（準備中）</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* 注意事項 */}
        <section className="bg-accent/10 border border-accent/30 rounded-xl p-6">
          <h2 className="font-bold text-text mb-3 flex items-center gap-2">
            <span>⚠️</span> テンプレート使用時の注意
          </h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start gap-2"><span className="text-accent">▸</span>テンプレートのガイドレイヤー（カットライン等）は入稿時に非表示にしてください</li>
            <li className="flex items-start gap-2"><span className="text-accent">▸</span>テンプレートのサイズを変更しないでください</li>
            <li className="flex items-start gap-2"><span className="text-accent">▸</span>不明点がある場合は入稿前にお問い合わせください</li>
            <li className="flex items-start gap-2"><span className="text-accent">▸</span>テンプレートは随時更新されます。最新版をダウンロードしてお使いください</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center py-4">
          <p className="text-text-secondary mb-4">
            ご希望の商品のテンプレートが見つからない場合は、お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            テンプレートをリクエスト
          </Link>
        </section>

        {/* ナビゲーション */}
        <nav className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Link href="/guide/resolution" className="text-primary hover:text-primary-dark transition-colors text-sm">
            ← 解像度・カラーモード
          </Link>
          <Link href="/guide" className="sm:ml-auto text-primary hover:text-primary-dark transition-colors text-sm">
            入稿ガイドトップへ →
          </Link>
        </nav>
      </div>
    </div>
  );
}
