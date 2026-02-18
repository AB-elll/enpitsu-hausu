import Link from 'next/link';
import { notFound } from 'next/navigation';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { galleryItems, getGalleryItem, getRelatedItems } from '@/lib/gallery-data';

export function generateStaticParams() {
  return galleryItems.map((item) => ({ id: item.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  // We need to use a sync approach for static export
  return {
    title: '制作実績詳細',
    description: 'えんぴつはうすの制作実績詳細ページ。',
  };
}

export default async function WorksDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getGalleryItem(id);

  if (!item) {
    notFound();
  }

  const related = getRelatedItems(id, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '制作実績', href: '/works' }, { label: item.title }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Image Area */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="h-1.5" style={{ backgroundColor: item.color }} />
          <div className="aspect-[4/3] bg-surface flex items-center justify-center relative">
            {/* Geometric decorations */}
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="absolute top-8 left-8 w-24 h-24 rounded-full border-4" style={{ borderColor: item.color }} />
              <div className="absolute bottom-8 right-8 w-32 h-32 rotate-45" style={{ borderColor: item.color, borderWidth: 4, borderStyle: 'solid' }} />
              <div className="absolute top-12 right-16 w-16 h-16 rounded-lg border-4" style={{ borderColor: item.color }} />
              <div className="absolute bottom-16 left-16 w-20 h-20 rounded-full border-4" style={{ borderColor: item.color }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-3xl border-4" style={{ borderColor: item.color }} />
            </div>
            <div className="text-center z-10">
              <div className="text-7xl mb-3">{item.icon}</div>
              <p className="text-sm text-text-secondary">制作実績画像</p>
            </div>
          </div>
        </div>

        {/* Detail Info */}
        <div>
          <span
            className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full mb-4"
            style={{ backgroundColor: item.color }}
          >
            {item.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text mb-4">{item.title}</h1>
          <p className="text-text-secondary mb-6 leading-relaxed">{item.description}</p>

          {/* Spec Table */}
          <div className="bg-surface rounded-xl p-6 mb-6">
            <h2 className="font-bold text-text mb-4 text-lg">制作概要</h2>
            <dl className="space-y-3">
              {[
                { label: '納品先', value: item.client, icon: '🏢' },
                { label: 'カテゴリ', value: item.category, icon: item.icon },
                { label: '数量', value: item.quantity, icon: '📦' },
                { label: '制作期間', value: item.duration, icon: '⏱️' },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <span className="text-lg">{row.icon}</span>
                  <dt className="text-sm text-text-secondary min-w-[5rem]">{row.label}</dt>
                  <dd className="text-sm font-medium text-text">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Detailed description */}
          <div className="bg-white rounded-xl border border-border p-6 mb-6">
            <h2 className="font-bold text-text mb-3 text-lg">制作詳細</h2>
            <p className="text-sm text-text-secondary leading-relaxed">{item.details}</p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm"
            >
              同様の制作を見積もる
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>

      {/* Related Works */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-text mb-6">関連する制作実績</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/works/${rel.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-1" style={{ backgroundColor: rel.color }} />
                <div className="aspect-[4/3] bg-surface flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.07]">
                    <div className="absolute top-4 left-4 w-16 h-16 rounded-full border-4" style={{ borderColor: rel.color }} />
                    <div className="absolute bottom-6 right-6 w-24 h-24 rotate-45" style={{ borderColor: rel.color, borderWidth: 4, borderStyle: 'solid' }} />
                  </div>
                  <div className="text-center z-10">
                    <div className="text-5xl mb-2">{rel.icon}</div>
                    <p className="text-xs text-text-secondary">制作実績画像</p>
                  </div>
                </div>
                <div className="p-5">
                  <span
                    className="inline-block px-2.5 py-0.5 text-xs font-medium text-white rounded-full mb-2"
                    style={{ backgroundColor: rel.color }}
                  >
                    {rel.category}
                  </span>
                  <h3 className="font-bold text-text mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{rel.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to list */}
      <div className="mt-12 text-center">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
        >
          ← 制作実績一覧に戻る
        </Link>
      </div>
    </div>
  );
}
