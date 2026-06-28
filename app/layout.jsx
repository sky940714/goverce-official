import './globals.css';
import Navbar from '@/components/Navbar';

const SITE_TITLE = 'Goverce 創生科技 | 免費 AI 能見度健檢';
const SITE_DESC  = 'Goverce 創生科技提供免費 AI 能見度健檢工具，30 秒分析你的店在 ChatGPT、Claude、Perplexity 等 AI 搜尋中是否被找到。協助台灣在地商家透過 GEO（生成式搜尋優化）與 SEO 提升數位曝光，銜接專業顧問服務。';

export const metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: 'GEO, 生成式搜尋優化, AI 能見度, SEO, ChatGPT 推薦, 創生科技, Goverce, AI 健檢, 台灣在地商家, Perplexity, Claude 推薦',
  authors: [{ name: 'Goverce 創生科技' }],
  openGraph: {
    type: 'website',
    url: 'https://www.goverce.com/',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: 'https://www.goverce.com/og-image.jpg' }],
    siteName: 'Goverce 創生科技',
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ['https://www.goverce.com/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.goverce.com/' },
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
