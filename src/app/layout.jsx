import Providers from './providers';
import './globals.css';

export const metadata = {
  title: 'LensIQ',
  description: 'AI-Powered Best Shot Selection for photographers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
