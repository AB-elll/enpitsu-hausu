import { notFound } from 'next/navigation';
import ProductDetailPage from '@/components/ProductDetailPage';
import { calendarProducts, getProductBySlug } from '@/lib/products';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return calendarProducts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug('calendar', slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug('calendar', slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} categoryHref="/products/calendar" />;
}
