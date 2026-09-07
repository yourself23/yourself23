import './globals.css';
import { XMTPProvider } from '../src/components/XMTPProvider';

export const metadata = {
  title: 'Complete Engine',
  description: 'Base Network Smart Wallet & XMTP Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <XMTPProvider>
          {children}
        </XMTPProvider>
      </body>
    </html>
  );
}
