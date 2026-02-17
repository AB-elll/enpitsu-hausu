import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">✏️</div>
        <h1 className="text-6xl font-bold text-text mb-4" style={{ fontFamily: 'var(--font-price)' }}>404</h1>
        <p className="text-xl text-text-secondary mb-8">お探しのページが見つかりませんでした</p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all"
        >
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
