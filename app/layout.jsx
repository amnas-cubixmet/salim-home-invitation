import '@fontsource/noto-naskh-arabic/arabic-400.css';
import './globals.css';

export const viewport = { themeColor: '#f8f8f0' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
