import { notFound } from 'next/navigation';
import ProductDetailPage from '@/components/ProductDetailPage';
import { uchiwaProducts, getProductBySlug } from '@/lib/products';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return uchiwaProducts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug('uchiwa', slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug('uchiwa', slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} categoryHref="/products/uchiwa" />;
}
