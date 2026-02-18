import BreadcrumbNav from '@/components/BreadcrumbNav';
import { COMPANY_TEL, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_HQ_ADDRESS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要',
  description: 'えんぴつはうすの会社概要。ノベルティグッズ類の企画・販売、シール印刷。',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbNav items={[{ label: '会社概要' }]} />

      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-10">会社概要</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <tbody className="divide-y divide-border">
            {[
              ['事業者名', '株式会社KEA工房 高松事業所'],
              ['所在地（高松事業所）', COMPANY_ADDRESS],
              ['本社', COMPANY_HQ_ADDRESS],
              ['電話番号', COMPANY_TEL],
              ['メール', COMPANY_EMAIL],
              ['URL', 'http://www.en-pitsu.com'],
              ['資本金', '3,765万円'],
              ['WEB責任者', '安東 弘志'],
              ['事業内容', 'ノベルティグッズ類の企画・販売、シール印刷、調剤薬局の展開'],
              ['取引銀行', '楽天銀行 第一営業支店'],
            ].map(([label, value]) => (
              <tr key={label} className="flex flex-col sm:table-row">
                <th className="px-6 py-4 text-left text-sm font-bold text-text bg-surface sm:w-40 whitespace-nowrap">
                  {label}
                </th>
                <td className="px-6 py-4 text-sm text-text whitespace-pre-line">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Map placeholder */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-text mb-6">アクセス</h2>
        <div className="bg-surface rounded-2xl h-80 flex items-center justify-center text-text-secondary">
          <div className="text-center">
            <div className="text-4xl mb-3">📍</div>
            <p>香川県高松市中野町2丁目2-6</p>
          </div>
        </div>
      </div>
    </div>
  );
}
