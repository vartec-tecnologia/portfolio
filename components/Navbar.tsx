import Link from 'next/link';

import { Logo } from './Logo';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-line bg-paper overflow-visible">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="relative h-10 mt-1 sm:h-12 w-28 sm:w-44 lg:w-52 shrink-0 overflow-visible">
          <Logo className="absolute top-1/2 left-0 -translate-y-1/2 mt-1.25 -ml-4 w-56 sm:mt-0 sm:ml-0 sm:w-64 lg:w-100 h-auto" />
        </div>

        <div className="flex items-center gap-6 font-body font-medium text-muted">
          <Link href="/" className="hover:text-primary transition">Início</Link>
          <Link href="/blog" className="hover:text-primary transition">Blog</Link>
          <Link href="#contato" className="bg-ink text-paper px-4 py-2 rounded-lg hover:bg-primary transition">
            Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}