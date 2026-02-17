import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          小ロット100個〜 対応中
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          あなたのアイデアを
          <br />
          <span className="bg-gradient-to-r from-accent via-secondary to-pink-400 bg-clip-text text-transparent">
            カタチにする
          </span>
          <br />
          ノベルティ工房
        </h1>

        <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          カレンダー・うちわ・アクリルグッズ・シールなど
          <br className="hidden sm:block" />
          オリジナルノベルティの企画制作を承ります
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold text-lg rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg"
          >
            商品を見る
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all"
          >
            無料お見積もり
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '54+', label: '種類のカレンダー' },
            { value: '3,000+', label: '年間納品件数' },
            { value: '100~', label: '小ロット対応' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-price)' }}>{stat.value}</div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
