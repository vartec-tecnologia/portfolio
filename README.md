Site de portfólio da VarTec — Next.js 16 (App Router), TypeScript, Tailwind CSS. Ver `CLAUDE.md` para arquitetura e padrões de código.

## Getting Started

Copie `.env.example` para `.env` e preencha as variáveis:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `CONTACT_WEBHOOK_URL` | URL do webhook (Make/Zapier) que recebe os leads do formulário de contato. |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site, usada em metadata, Open Graph e sitemap. |

Depois, rode o servidor de desenvolvimento:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testes

```bash
npm run test
```

Executa a suíte Vitest (foco em `/lib`: parsing de posts, schemas Zod, helpers de SEO).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
