import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';

import './globals.css';

import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import { buildOrganizationJsonLd, SITE_URL } from '@/lib/seo';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-display' });
const body = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "VarTec",
  description: "Soluções em Tecnologia para o seu negócio. Desenvolvimento de software, consultoria e suporte técnico para impulsionar sua empresa no mundo digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink">
        <JsonLd data={buildOrganizationJsonLd()} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
