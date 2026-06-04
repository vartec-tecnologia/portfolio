import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
} from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-100 text-neutral-600">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">

        {/* Ícones de redes sociais */}
        <div className="flex gap-8">
          <a href="#" className="transition-colors hover:text-pink-500" aria-label="Instagram"><FaInstagram size={28} /></a>
          <a href="#" className="transition-colors hover:text-blue-600" aria-label="Facebook"><FaFacebook size={28} /></a>
          <a href="#" className="transition-colors hover:text-sky-700" aria-label="LinkedIn"><FaLinkedin size={28} /></a>
          <a href="#" className="transition-colors hover:text-green-500" aria-label="WhatsApp"><FaWhatsapp size={28} /></a>
        </div>

        {/* Informações de contato */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-sm text-center">
          <p className="flex items-center justify-center gap-2"><MdPhone /> (31) 9312-0700</p>
          <p className="flex items-center justify-center gap-2"><MdEmail /> vartec.tecnologia@gmail.com</p>
          <p className="flex items-center justify-center gap-2"><MdLocationOn /> Rua Uruguai, Sion</p>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-center leading-relaxed">
          &copy; {new Date().getFullYear()} VARTEC Soluções em Tecnologia. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}