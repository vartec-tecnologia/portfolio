export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      <svg
        className="h-full w-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="tech-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4" cy="4" r="2" fill="#0EA5E9" />
            <text
              x="30"
              y="50"
              fontSize="16"
              fill="#7B2FFF"
              fontFamily="monospace"
            >
              {"</>"}
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-pattern)" />
      </svg>
    </div>
  );
}
