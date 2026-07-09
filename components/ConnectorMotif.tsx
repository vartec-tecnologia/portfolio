export function ConnectorMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <line x1="40" y1="320" x2="180" y2="200" />
        <line x1="180" y1="200" x2="120" y2="80" />
        <line x1="180" y1="200" x2="340" y2="260" />
        <line x1="340" y1="260" x2="480" y2="140" />
        <line x1="480" y1="140" x2="620" y2="220" />
        <line x1="480" y1="140" x2="440" y2="40" />
        <line x1="620" y1="220" x2="760" y2="120" />
        <line x1="620" y1="220" x2="700" y2="340" />
      </g>
      <g fill="currentColor">
        <circle cx="40" cy="320" r="3" />
        <circle cx="180" cy="200" r="3" />
        <circle cx="120" cy="80" r="3" />
        <circle cx="340" cy="260" r="3" />
        <circle cx="480" cy="140" r="3" />
        <circle cx="620" cy="220" r="3" />
        <circle cx="440" cy="40" r="3" />
        <circle cx="760" cy="120" r="3" />
        <circle cx="700" cy="340" r="3" />
      </g>
    </svg>
  );
}
