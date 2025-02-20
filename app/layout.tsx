//アプリ全体のレイアウト

import Header from './components/layout/header/page';
import Footer from './components/layout/footer/page';
import './styles/style.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main> {/* children に各ページが入る */}
        <Footer />
      </body>
    </html>
  );
}
