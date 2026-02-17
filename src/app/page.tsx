import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import { CATEGORIES } from '@/lib/constants';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Category Cards */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">商品カテゴリ</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              多彩なノベルティ・販促品をご用意。用途やご予算に合わせてお選びください。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{cat.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  商品を見る
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">えんぴつはうすが選ばれる理由</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: '🎨',
                title: '完全オリジナルデザイン',
                desc: 'お客様のロゴやイメージを元に、プロのデザイナーがオリジナルデザインを作成。データ入稿もOK。',
              },
              {
                icon: '📦',
                title: '小ロット100個から対応',
                desc: '大量発注だけでなく、小ロットからお気軽にご注文いただけます。テスト発注にも最適。',
              },
              {
                icon: '⚡',
                title: '最短3日のスピード納品',
                desc: '急なイベントやキャンペーンにも対応。短納期でも品質は妥協しません。',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-5xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-bold text-text mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-primary via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ノベルティ制作、まずはお気軽にご相談ください
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            お見積もりは無料です。ご予算・用途・納期に合わせて最適なプランをご提案します。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-white text-primary font-bold text-lg rounded-xl hover:bg-blue-50 transition-all shadow-lg"
            >
              無料お見積もり
            </Link>
            <Link
              href="/flow"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all"
            >
              ご注文の流れ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
