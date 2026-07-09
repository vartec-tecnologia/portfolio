import './globals.css';

import BackgroundPattern from '@/components/BackgroundPattern';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import { buildOrganizationJsonLd, SITE_URL } from '@/lib/seo';

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
    <html lang="pt-br">
      <body className="font-sans antialiased text-neutral-800">
        <JsonLd data={buildOrganizationJsonLd()} />
        <BackgroundPattern />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
