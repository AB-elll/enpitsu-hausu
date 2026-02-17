import BreadcrumbNav from '@/components/BreadcrumbNav';
import { COMPANY_TEL, COMPANY_FAX, COMPANY_EMAIL, COMPANY_ADDRESS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要',
  description: 'えんぴつはうすの会社概要。東京都大田区のノベルティ・販促品企画制作会社。',
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
              ['会社名', '株式会社 えんぴつはうす'],
              ['所在地', COMPANY_ADDRESS],
              ['電話番号', COMPANY_TEL],
              ['FAX番号', COMPANY_FAX],
              ['メール', COMPANY_EMAIL],
              ['設立', '1998年'],
              ['代表者', '代表取締役'],
              ['事業内容', 'オリジナルノベルティ・販促品の企画・デザイン・制作・販売\nカレンダー、うちわ、アクリルグッズ、シール、衛生用品、タオル等'],
              ['取引銀行', 'みずほ銀行 大森支店'],
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
            <p>JR大森駅 東口より徒歩3分</p>
          </div>
        </div>
      </div>
    </div>
  );
}
