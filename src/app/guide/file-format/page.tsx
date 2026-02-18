import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { fileFormats } from '@/lib/guide-data';

export const metadata: Metadata = {
  title: '対応ファイル形式 | 入稿ガイド',
  description: '入稿に対応しているファイル形式（AI・PSD・PDF・PNG等）と、それぞれの推奨設定をご案内します。',
};

export default function FileFormatPage() {
  return (
    <div className="bg-bg min-h-screen">
      <section className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
          <BreadcrumbNav variant="dark" items={[
            { label: '入稿・デザインガイド', href: '/guide' },
            { label: '対応ファイル形式' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            📄 対応ファイル形式
          </h1>
          <p className="text-white/80 max-w-2xl">
            各ファイル形式の特徴と推奨設定を一覧でご確認いただけます。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* 推奨形式ハイライト */}
        <section className="bg-success/5 border border-success/20 rounded-xl p-6">
          <h2 className="font-bold text-text mb-2 flex items-center gap-2">
            <span className="text-success">✓</span> おすすめ形式
          </h2>
          <p className="text-text-secondary">
            <strong>Adobe Illustrator（.ai）</strong>が最も推奨です。ベクターデータのため解像度に依存せず、フォントのアウトライン化で文字化けも防げます。
            次いで<strong>PSD</strong>、<strong>PDF</strong>もおすすめです。
          </p>
        </section>

        {/* テーブル */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-6">ファイル形式一覧</h2>
          
          {/* デスクトップテーブル */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-border overflow-hidden">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="px-5 py-3 text-sm font-bold text-text">形式</th>
                  <th className="px-5 py-3 text-sm font-bold text-text">拡張子</th>
                  <th className="px-5 py-3 text-sm font-bold text-text">推奨</th>
                  <th className="px-5 py-3 text-sm font-bold text-text">カラーモード</th>
                  <th className="px-5 py-3 text-sm font-bold text-text">解像度</th>
                  <th className="px-5 py-3 text-sm font-bold text-text">備考</th>
                </tr>
              </thead>
              <tbody>
                {fileFormats.map((f, i) => (
                  <tr key={i} className="border-t border-border hover:bg-surface/30 transition-colors">
                    <td className="px-5 py-4 font-medium text-text">{f.format}</td>
                    <td className="px-5 py-4 text-text-secondary font-mono text-sm">{f.extension}</td>
                    <td className="px-5 py-4">
                      {f.recommended ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                          ◎ 推奨
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface text-text-secondary">
                          △ 対応
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{f.colorMode}</td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{f.resolution}</td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{f.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* モバイルカード */}
          <div className="md:hidden space-y-3">
            {fileFormats.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-text">{f.format}</h3>
                  {f.recommended ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      ◎ 推奨
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface text-text-secondary">
                      △ 対応
                    </span>
                  )}
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex gap-3">
                    <dt className="text-text-secondary shrink-0 w-24">拡張子</dt>
                    <dd className="text-text font-mono">{f.extension}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-text-secondary shrink-0 w-24">カラーモード</dt>
                    <dd className="text-text">{f.colorMode}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-text-secondary shrink-0 w-24">解像度</dt>
                    <dd className="text-text">{f.resolution}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm text-text-secondary border-t border-border pt-3">{f.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Illustrator入稿のポイント */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-6">Illustrator入稿のポイント</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'フォントのアウトライン化', desc: '「書式」→「アウトラインを作成」で全てのテキストをアウトライン化してください。', icon: '🔤' },
              { title: '画像の埋め込み', desc: '「ウィンドウ」→「リンク」パネルから全ての配置画像を埋め込んでください。', icon: '🖼️' },
              { title: '塗り足しの設定', desc: '「ファイル」→「ドキュメント設定」→「裁ち落とし」を各辺3mmに設定。', icon: '📐' },
              { title: 'カラーモードの確認', desc: '「ファイル」→「ドキュメントのカラーモード」がCMYKになっているか確認。', icon: '🎨' },
            ].map((point, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-5 flex gap-4">
                <span className="text-2xl shrink-0">{point.icon}</span>
                <div>
                  <h3 className="font-bold text-text mb-1">{point.title}</h3>
                  <p className="text-sm text-text-secondary">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ナビゲーション */}
        <nav className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Link href="/guide" className="text-primary hover:text-primary-dark transition-colors text-sm">
            ← 入稿ガイドトップへ
          </Link>
          <Link href="/guide/resolution" className="sm:ml-auto text-primary hover:text-primary-dark transition-colors text-sm">
            解像度・カラーモード →
          </Link>
        </nav>
      </div>
    </div>
  );
}
