import Link from 'next/link';
import BreadcrumbNav from './BreadcrumbNav';
import { ProductDetail, getRelatedProducts } from '@/lib/products';
import { SITE_URL, COMPANY_TEL } from '@/lib/constants';

interface Props {
  product: ProductDetail;
  categoryHref: string;
}

function ProductJsonLd({ product, categoryHref }: { product: ProductDetail; categoryHref: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    category: product.categoryLabel,
    url: `${SITE_URL}/products/${product.category}/${product.slug}`,
    brand: {
      '@type': 'Organization',
      name: 'えんぴつはうす',
    },
    ...(product.priceTable.length > 0 && product.priceTable[0].unitPrice.startsWith('¥') && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'JPY',
        lowPrice: product.priceTable[product.priceTable.length - 1].unitPrice.replace(/[^0-9]/g, ''),
        highPrice: product.priceTable[0].unitPrice.replace(/[^0-9]/g, ''),
        offerCount: product.priceTable.length,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ProductDetailPage({ product, categoryHref }: Props) {
  const related = getRelatedProducts(product);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductJsonLd product={product} categoryHref={categoryHref} />
      <BreadcrumbNav
        items={[
          { label: '商品一覧', href: '/products' },
          { label: product.categoryLabel, href: categoryHref },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image */}
        <div className="aspect-[4/3] bg-surface rounded-2xl flex items-center justify-center relative overflow-hidden">
          <div className="text-8xl opacity-15">
            {product.category === 'calendar' && '📅'}
            {product.category === 'uchiwa' && '🪭'}
            {product.category === 'acrylic' && '✨'}
            {product.category === 'seal' && '🏷️'}
            {product.category === 'hygiene' && '🧴'}
            {product.category === 'towel' && '🧣'}
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className="px-3 py-1 text-white text-xs font-medium rounded-full"
              style={{ backgroundColor: product.categoryColor }}
            >
              {product.categoryLabel}
            </span>
            <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
              {product.deliveryDays}
            </span>
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">{product.name}</h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">{product.longDescription}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.features.map((f) => (
              <span key={f} className="px-3 py-1.5 bg-surface text-text-secondary text-sm rounded-full">
                {f}
              </span>
            ))}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-surface rounded-xl p-4">
              <div className="text-sm text-text-secondary">最小ロット</div>
              <div className="text-xl font-bold text-text" style={{ fontFamily: 'var(--font-price)' }}>
                {product.minLot.toLocaleString()}個〜
              </div>
            </div>
            <div className="bg-surface rounded-xl p-4">
              <div className="text-sm text-text-secondary">納期目安</div>
              <div className="text-xl font-bold text-text">{product.deliveryDays}</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="flex-1 text-center px-6 py-3.5 bg-secondary text-white font-medium rounded-xl hover:bg-orange-600 transition-colors text-lg"
            >
              お見積もりする
            </Link>
            <Link
              href="/contact"
              className="flex-1 text-center px-6 py-3.5 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-colors text-lg"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>

      {/* Specs Table */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-text mb-6">商品仕様</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <tbody>
              {product.specs.map((spec, i) => (
                <tr key={spec.label} className={i % 2 === 0 ? 'bg-white' : 'bg-surface/50'}>
                  <th scope="row" className="px-6 py-4 text-left text-sm font-medium text-text-secondary w-1/3 border-b border-border">
                    {spec.label}
                  </th>
                  <td className="px-6 py-4 text-sm text-text border-b border-border">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Price Table */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-text mb-2">価格表</h2>
        <p className="text-text-secondary text-sm mb-6">※ 表示価格は税別・1個あたりの参考価格です。正確なお見積もりはお問い合わせください。</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="text-left" style={{ backgroundColor: product.categoryColor }}>
                <th scope="col" className="px-6 py-3.5 text-sm font-medium text-white">数量</th>
                <th scope="col" className="px-6 py-3.5 text-sm font-medium text-white">単価</th>
                <th scope="col" className="px-6 py-3.5 text-sm font-medium text-white">合計</th>
              </tr>
            </thead>
            <tbody>
              {product.priceTable.map((row, i) => (
                <tr key={row.quantity} className={i % 2 === 0 ? 'bg-white' : 'bg-surface/50'}>
                  <td className="px-6 py-4 text-sm font-medium text-text border-b border-border">{row.quantity}</td>
                  <td className="px-6 py-4 text-lg font-bold text-secondary border-b border-border" style={{ fontFamily: 'var(--font-price)' }}>
                    {row.unitPrice}
                  </td>
                  <td className="px-6 py-4 text-sm text-text border-b border-border">{row.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-text mb-6">関連商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.category}/${rel.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-1" style={{ backgroundColor: rel.categoryColor }} />
                <div className="aspect-[16/9] bg-surface flex items-center justify-center">
                  <div className="text-5xl opacity-15">
                    {rel.category === 'calendar' && '📅'}
                    {rel.category === 'uchiwa' && '🪭'}
                    {rel.category === 'acrylic' && '✨'}
                    {rel.category === 'seal' && '🏷️'}
                    {rel.category === 'hygiene' && '🧴'}
                    {rel.category === 'towel' && '🧣'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-text group-hover:text-primary transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-text-secondary text-sm mt-1 line-clamp-2">{rel.description}</p>
                  <div className="mt-2 text-sm font-medium text-primary flex items-center">
                    詳細を見る
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="mt-14 bg-white rounded-2xl shadow-sm p-8 sm:p-12 text-center">
        <h2 className="text-2xl font-bold text-text mb-3">
          {product.name}のお見積もり・ご相談
        </h2>
        <p className="text-text-secondary mb-6">
          デザインのご相談から納品まで、専任スタッフが丁寧にサポートいたします。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-secondary text-white font-medium rounded-xl hover:bg-orange-600 transition-colors text-lg"
          >
            無料お見積もり
          </Link>
          <a
            href="tel:03-5765-5765"
            className="px-8 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-lg"
          >
            📞 03-5765-5765
          </a>
        </div>
      </section>
    </div>
  );
}
