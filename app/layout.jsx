import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-600-italic.css';
import '@fontsource/instrument-sans/latin-400.css';
import '@fontsource/instrument-sans/latin-600.css';
import '@fontsource/noto-naskh-arabic/arabic-400.css';
import './globals.css';

export const viewport = { themeColor: '#f8f8f0' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
