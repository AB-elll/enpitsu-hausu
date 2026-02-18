import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { submissionSteps, commonMistakes, categoryGuides, guideFAQs } from '@/lib/guide-data';

export const metadata: Metadata = {
  title: '入稿・デザインガイド',
  description: '入稿データの作成方法、対応ファイル形式、解像度の目安、テンプレートダウンロードなど、入稿に必要な情報をまとめたガイドページです。',
};

function FAQAccordion({ items }: { items: typeof guideFAQs }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="group bg-white rounded-xl border border-border overflow-hidden">
          <summary className="flex items-center justify-between p-5 cursor-pointer select-none hover:bg-surface/50 transition-colors">
            <span className="font-medium text-text pr-4">{item.question}</span>
            <span className="shrink-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center text-text-secondary group-open:rotate-45 transition-transform duration-200">
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-text-secondary leading-relaxed border-t border-border pt-4">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function GuidePage() {
  const subPages = [
    { title: '対応ファイル形式', href: '/guide/file-format', icon: '📄', desc: 'AI / PSD / PDF / PNG など対応形式と推奨設定' },
    { title: '解像度・カラーモード', href: '/guide/resolution', icon: '🎨', desc: '印刷に最適な解像度とCMYK/RGBの違い' },
    { title: 'テンプレートダウンロード', href: '/guide/templates', icon: '📥', desc: '商品別の入稿用テンプレート' },
  ];

  return (
    <div className="bg-bg min-h-screen">
      {/* ヒーロー */}
      <section className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <BreadcrumbNav items={[{ label: '入稿・デザインガイド' }]} variant="dark" />
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            入稿・デザインガイド
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            初めてのご入稿でも安心。データの作り方から入稿方法まで、ステップごとにわかりやすくご案内します。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        {/* サブページリンク */}
        <section>
          <div className="grid md:grid-cols-3 gap-4">
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <span className="text-3xl mb-3 block">{page.icon}</span>
                <h3 className="font-bold text-text group-hover:text-primary transition-colors mb-1">
                  {page.title}
                </h3>
                <p className="text-sm text-text-secondary">{page.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 入稿の流れ */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg">📋</span>
            入稿の流れ
          </h2>
          <div className="relative">
            {/* 接続線 */}
            <div className="hidden md:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
              {submissionSteps.map((step, i) => (
                <div
                  key={step.number}
                  className={`relative bg-white rounded-xl border border-border p-6 ${
                    i % 2 === 1 ? 'md:mt-12' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <span className="text-2xl mr-2">{step.icon}</span>
                      <span className="font-bold text-lg text-text">{step.title}</span>
                    </div>
                  </div>
                  <p className="text-text-secondary mb-3">{step.description}</p>
                  <ul className="space-y-1.5">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-primary mt-0.5">▸</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* よくある失敗例 */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-danger/10 flex items-center justify-center text-danger text-lg">⚠️</span>
            よくある失敗例と対処法
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonMistakes.map((mistake, i) => (
              <div key={i} className="bg-white rounded-xl border border-border overflow-hidden">
                {/* プレースホルダー画像エリア */}
                <div className="h-32 bg-surface flex items-center justify-center text-4xl">
                  {mistake.icon}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-text mb-2">{mistake.title}</h3>
                  <p className="text-sm text-text-secondary mb-3">{mistake.description}</p>
                  <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                    <p className="text-sm text-text">
                      <span className="text-success font-bold">✓ 対処法：</span>
                      {mistake.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* カテゴリ別入稿注意点 */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-lg">📦</span>
            商品カテゴリ別 入稿注意点
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {categoryGuides.map((cat, i) => (
              <div key={i} className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="h-1" style={{ backgroundColor: cat.color }} />
                <div className="p-5">
                  <h3 className="font-bold text-text mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    {cat.category}
                  </h3>
                  <ul className="space-y-2">
                    {cat.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-0.5" style={{ color: cat.color }}>▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-text mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center text-purple text-lg">❓</span>
            よくある質問
          </h2>
          <FAQAccordion items={guideFAQs} />
        </section>

        {/* CTA */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold font-heading text-text mb-3">
            入稿について不明点がありましたら
          </h2>
          <p className="text-text-secondary mb-6">
            お気軽にお問い合わせください。専門スタッフがサポートいたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              お問い合わせ
            </Link>
            <Link
              href="/guide/templates"
              className="inline-flex items-center justify-center bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
            >
              テンプレートをダウンロード
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
