export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-100 text-center text-neutral-500">
      <p>&copy; {new Date().getFullYear()} BAEBAR Tech Solutions. Todos os direitos reservados.</p>
      <p className="text-sm mt-2">Desenvolvido com Next.js e Tailwind.</p>
    </footer>
  );
}