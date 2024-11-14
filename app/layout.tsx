import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Geist_Mono, Baskervville } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'DeskThing - Give your CarThing a Second Life',
  description:
    'Transform your Spotify CarThing into a productive desktop companion',
};

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
});

const serif = Baskervville({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mono.variable} ${sans.variable} ${serif.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
