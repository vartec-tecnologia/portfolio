import Link from 'next/link';

import { Logo } from './Logo';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white overflow-visible">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="relative h-12 w-52 shrink-0 overflow-visible">
          <Logo className="absolute top-1/2 left-0 -translate-y-1/2 w-120 h-auto" />
        </div>
        
        <div className="flex items-center gap-6 font-medium text-neutral-600">
          <Link href="/" className="hover:text-primary-500 transition">Início</Link>
          <Link href="/blog" className="hover:text-primary-500 transition">Blog</Link>
          <Link href="#contato" className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-primary-500 transition">
            Contato
          </Link>
        </div>
      </div>
    </nav>
  );
} 