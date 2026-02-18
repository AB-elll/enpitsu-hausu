import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { resolutionGuides, colorModes } from '@/lib/guide-data';

export const metadata: Metadata = {
  title: '解像度・カラーモード | 入稿ガイド',
  description: '印刷に適した解像度（dpi）の目安と、CMYK・RGBカラーモードの違いについて解説します。',
};

export default function ResolutionPage() {
  return (
    <div className="bg-bg min-h-screen">
      <section className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
          <BreadcrumbNav variant="dark" items={[
            { label: '入稿・デザインガイド', href: '/guide' },
            { label: '解像度・カラーモード' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            🎨 解像度・カラーモード
          </h1>
          <p className="text-white/80 max-w-2xl">
            きれいに印刷するための解像度と、CMYK／RGBの違いをわかりやすく解説します。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        {/* 解像度とは */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg">🔍</span>
            解像度（dpi）とは
          </h2>
          <div className="bg-white rounded-xl border border-border p-6 mb-6">
            <p className="text-text-secondary leading-relaxed mb-4">
              <strong className="text-text">dpi（dots per inch）</strong>は、1インチ（2.54cm）あたりのドット数を表す単位です。
              数値が高いほどきめ細かく、低いとぼやけた印刷になります。
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-danger/5 rounded-lg p-4">
                <div className="text-3xl mb-2">😰</div>
                <div className="font-bold text-danger text-lg font-price">72 dpi</div>
                <div className="text-xs text-text-secondary mt-1">Web用（印刷NG）</div>
              </div>
              <div className="bg-accent/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🙂</div>
                <div className="font-bold text-text text-lg font-price">200 dpi</div>
                <div className="text-xs text-text-secondary mt-1">大判印刷なら可</div>
              </div>
              <div className="bg-success/5 rounded-lg p-4">
                <div className="text-3xl mb-2">😊</div>
                <div className="font-bold text-success text-lg font-price">350 dpi</div>
                <div className="text-xs text-text-secondary mt-1">推奨（高品質）</div>
              </div>
            </div>
          </div>
        </section>

        {/* 用途別解像度表 */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-6">用途別 推奨解像度</h2>
          
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-border overflow-hidden">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="px-5 py-3 text-sm font-bold text-text">用途</th>
                  <th className="px-5 py-3 text-sm font-bold text-text">最低解像度</th>
                  <th className="px-5 py-3 text-sm font-bold text-text">推奨解像度</th>
                  <th className="px-5 py-3 text-sm font-bold text-text">備考</th>
                </tr>
              </thead>
              <tbody>
                {resolutionGuides.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-5 py-4 font-medium text-text">{r.use}</td>
                    <td className="px-5 py-4 font-price font-bold text-text-secondary">{r.minDpi} dpi</td>
                    <td className="px-5 py-4 font-price font-bold text-primary">{r.recommendedDpi} dpi</td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            {resolutionGuides.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-bold text-text mb-3">{r.use}</h3>
                <div className="flex gap-4 mb-2">
                  <div>
                    <div className="text-xs text-text-secondary">最低</div>
                    <div className="font-price font-bold text-text-secondary">{r.minDpi} dpi</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">推奨</div>
                    <div className="font-price font-bold text-primary">{r.recommendedDpi} dpi</div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{r.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* カラーモード */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-lg">🎨</span>
            カラーモード（CMYK / RGB）
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {colorModes.map((cm) => (
              <div key={cm.mode} className="bg-white rounded-xl border border-border overflow-hidden">
                <div className={`p-5 ${cm.mode === 'CMYK' ? 'bg-primary/5 border-b border-primary/20' : 'bg-surface border-b border-border'}`}>
                  <h3 className="text-xl font-bold text-text mb-1">{cm.mode}</h3>
                  <p className="text-sm text-text-secondary">{cm.description}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    cm.mode === 'CMYK' ? 'bg-primary/10 text-primary' : 'bg-text-secondary/10 text-text-secondary'
                  }`}>
                    {cm.use}
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-success mb-2">メリット</h4>
                    <ul className="space-y-1.5">
                      {cm.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-success mt-0.5">✓</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-danger mb-2">注意点</h4>
                    <ul className="space-y-1.5">
                      {cm.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-danger mt-0.5">△</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CMYK変換時の注意 */}
          <div className="mt-6 bg-accent/10 border border-accent/30 rounded-xl p-6">
            <h3 className="font-bold text-text mb-3 flex items-center gap-2">
              <span>⚡</span> RGB → CMYK変換時の注意
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shrink-0">🔵</div>
                <div>
                  <div className="text-sm font-medium text-text">鮮やかなブルー・グリーン</div>
                  <div className="text-xs text-text-secondary">くすんだ色に変化しやすい</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shrink-0">🟢</div>
                <div>
                  <div className="text-sm font-medium text-text">蛍光色・ネオンカラー</div>
                  <div className="text-xs text-text-secondary">CMYKでは再現不可</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shrink-0">🟣</div>
                <div>
                  <div className="text-sm font-medium text-text">鮮やかな紫</div>
                  <div className="text-xs text-text-secondary">赤みが強くなりやすい</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shrink-0">🟠</div>
                <div>
                  <div className="text-sm font-medium text-text">彩度の高いオレンジ</div>
                  <div className="text-xs text-text-secondary">やや落ち着いた色に変化</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 解像度の確認方法 */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-6">解像度の確認方法</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-border p-5">
              <h3 className="font-bold text-text mb-3">Photoshopの場合</h3>
              <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
                <li>「イメージ」→「画像解像度」を開く</li>
                <li>「解像度」の値を確認（350dpi推奨）</li>
                <li>「再サンプル」のチェックを外して変更</li>
                <li>ドキュメントサイズが実寸以上か確認</li>
              </ol>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <h3 className="font-bold text-text mb-3">Illustratorの場合</h3>
              <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
                <li>配置画像を選択</li>
                <li>「ウィンドウ」→「リンク」パネルを表示</li>
                <li>画像の情報でPPIを確認</li>
                <li>300PPI以上であればOK</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ナビゲーション */}
        <nav className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Link href="/guide/file-format" className="text-primary hover:text-primary-dark transition-colors text-sm">
            ← 対応ファイル形式
          </Link>
          <Link href="/guide/templates" className="sm:ml-auto text-primary hover:text-primary-dark transition-colors text-sm">
            テンプレートダウンロード →
          </Link>
        </nav>
      </div>
    </div>
  );
}
