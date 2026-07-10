export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="40 10 340 125"
      width="340"
      height="125"
      role="img"
      className={className}
    >
      <title>VarTec — Soluções em Tecnologia</title>
      <desc>
        Logo VarTec com hexágono flat e motivo de nós conectados, wordmark em
        Space Grotesk.
      </desc>

      {/* Hexágono — flat, sem gradiente (design-tokens.md: --color-primary) */}
      <polygon
        points="92,22 136,46 136,94 92,118 48,94 48,46"
        fill="#2563EB"
      />

      {/* Motivo de nós conectados — mesma assinatura visual usada no site,
          substitui o raio genérico por algo específico da marca (conectar sistemas) */}
      <line x1="70" y1="88" x2="92" y2="52" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="92" y1="52" x2="114" y2="70" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="92" y1="52" x2="78" y2="30" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="70" cy="88" r="3.5" fill="#FFFFFF" />
      <circle cx="92" cy="52" r="3.5" fill="#FFFFFF" />
      <circle cx="114" cy="70" r="3.5" fill="#FFFFFF" />
      <circle cx="78" cy="30" r="3.5" fill="#FFFFFF" />

      {/* Wordmark — Space Grotesk (display type do design system) */}
      <text
        x="160"
        y="90"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="600"
        fontSize="58"
        fill="#0B1220"
        letterSpacing="-1"
      >
        Var<tspan fill="#2563EB">Tec</tspan>
      </text>

      <rect x="160" y="100" width="90" height="2" fill="#2563EB" />

      {/* Tagline — IBM Plex Mono (utility type do design system) */}
      <text
        x="160"
        y="120"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="500"
        fontSize="12"
        fill="#5B6478"
        letterSpacing="2"
      >
        SOLUÇÕES EM TECNOLOGIA
      </text>
    </svg>
  );
}
