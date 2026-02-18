import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  /** Use 'dark' when rendered on a dark (e.g. primary) background */
  variant?: 'light' | 'dark';
}

export default function BreadcrumbNav({ items, variant = 'light' }: BreadcrumbNavProps) {
  const isDark = variant === 'dark';
  const listClass = isDark
    ? 'flex items-center gap-2 text-sm text-white/70 flex-wrap'
    : 'flex items-center gap-2 text-sm text-text-secondary flex-wrap';
  const linkClass = isDark
    ? 'hover:text-white transition-colors'
    : 'hover:text-primary transition-colors';
  const currentClass = isDark
    ? 'text-white font-medium'
    : 'text-text font-medium';

  return (
    <nav aria-label="パンくずリスト" className="py-4">
      <ol className={listClass}>
        <li>
          <Link href="/" className={linkClass}>ホーム</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {item.href ? (
              <Link href={item.href} className={linkClass}>{item.label}</Link>
            ) : (
              <span className={currentClass}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
