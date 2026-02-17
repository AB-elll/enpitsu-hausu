import Link from 'next/link';
import { Product, CATEGORIES } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const category = CATEGORIES.find((c) => c.id === product.category);
  const color = category?.color || '#2563EB';

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Category Color Bar */}
      <div className="h-1" style={{ backgroundColor: color }} />

      {/* Image Placeholder */}
      <div className="aspect-[4/3] bg-surface flex items-center justify-center relative overflow-hidden">
        <div className="text-6xl opacity-20">{category?.icon}</div>
        {product.deliveryDays && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-full">
            最短{product.deliveryDays}日
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-text text-lg mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Lot */}
        <div className="flex items-baseline gap-3 mb-4">
          {product.priceRange && (
            <span className="text-xl font-bold text-secondary" style={{ fontFamily: 'var(--font-price)' }}>
              {product.priceRange}
            </span>
          )}
          {product.minLot && (
            <span className="text-xs text-text-secondary bg-surface px-2 py-0.5 rounded-full">
              {product.minLot}個〜
            </span>
          )}
        </div>

        <Link
          href="/contact"
          className="block w-full text-center px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          お見積もりする
        </Link>
      </div>
    </div>
  );
}
