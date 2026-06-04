import './globals.css';

import BackgroundPattern from '@/components/BackgroundPattern';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata = {
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
        <BackgroundPattern />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
