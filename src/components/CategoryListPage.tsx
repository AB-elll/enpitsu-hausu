import BreadcrumbNav from '@/components/BreadcrumbNav';
import CategoryBanner from '@/components/CategoryBanner';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/constants';

interface CategoryListPageProps {
  categoryLabel: string;
  description: string;
  color: string;
  icon: string;
  image?: string;
  products: Product[];
}

export default function CategoryListPage({
  categoryLabel,
  description,
  color,
  icon,
  image,
  products,
}: CategoryListPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '商品一覧', href: '/products' }, { label: categoryLabel }]} />
      <CategoryBanner
        title={categoryLabel}
        description={description}
        color={color}
        icon={icon}
        image={image}
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
