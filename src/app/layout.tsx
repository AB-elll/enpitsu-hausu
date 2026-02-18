import type { Metadata } from 'next';
import { Noto_Sans_JP, M_PLUS_Rounded_1c, Inter } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['400', '500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-price',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'えんぴつはうす | オリジナルノベルティ・販促品の企画制作',
    template: '%s | えんぴつはうす',
  },
  description: 'オリジナルカレンダー・うちわ・アクリルグッズ・シールなど、ノベルティ・販促品の企画制作。小ロット100個から対応。香川県高松市。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://www.en-pitsu.com',
    siteName: 'えんぴつはうす',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${mPlusRounded.variable} ${inter.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
