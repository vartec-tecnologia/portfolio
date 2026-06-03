export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 680 200"
      width="680"
      height="200"
      role="img"
      className={className}
    >
      <title>VarTec — Soluções em Tecnologia</title>
      <desc>
        Logo VarTec com hexágono e raio estilizado, paleta azul
      </desc>
      <defs>
        <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>

      <polygon
        points="92,22 136,46 136,94 92,118 48,94 48,46"
        fill="url(#g3)"
      />
      <polygon
        points="92,36 126,55 126,90 92,108 58,90 58,55"
        fill="#FFFFFF"
        opacity="0.12"
      />

      <polyline
        points="76,88 92,52 108,75 116,60"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="116" cy="60" r="4" fill="#FFFFFF" />

      <text
        x="160"
        y="93"
        fontFamily="'Trebuchet MS', Arial, sans-serif"
        fontWeight="700"
        fontSize="64"
        fill="#1f2937"
        letterSpacing="-2"
      >
        VAR<tspan fill="url(#g3)">TEC</tspan>
      </text>

      <rect x="160" y="118" width="108" height="3" rx="2" fill="url(#g3)" />

      <text
        x="160"
        y="148"
        fontFamily="Arial, sans-serif"
        fontWeight="400"
        fontSize="13.5"
        fill="#4b5563"
        letterSpacing="4"
      >
        SOLUÇÕES EM TECNOLOGIA
      </text>
    </svg>
  );
}
