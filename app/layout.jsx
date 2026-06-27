import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Goverce 創生科技 | 連結未來與生活',
  description: 'Goverce 創生科技提供 AI 自動化工具研發方案，整合 GO EAT 智慧餐飲與 GO PRIME 極致服務系統，致力於商業生態系的跨域整合與自動化經營。',
  keywords: '創生科技, Goverce, GO EAT, 饗導, 智慧餐飲, AI自動化, 商家轉型',
  authors: [{ name: 'Goverce Team' }],
  openGraph: {
    type: 'website',
    url: 'https://www.goverce.com/',
    title: 'Goverce 創生科技 | 官方網站',
    description: '告別高額抽成，掌控您的數位店面。專為微型餐飲與在地品牌打造的智慧管理生態。',
    images: [{ url: 'https://www.goverce.com/og-image.jpg' }],
    siteName: 'Goverce Ecosystem',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goverce 創生科技',
    description: 'Connecting Future & Life | 連結未來與生活',
    images: ['https://www.goverce.com/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
