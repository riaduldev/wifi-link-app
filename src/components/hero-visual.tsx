/**
 * Custom hero illustration: a fibre router broadcasting to homes.
 * Pure inline SVG — no image request, scales cleanly, decorative only.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 420"
      className={className}
      role="img"
      aria-label="একটি রাউটার থেকে বাসগুলোর দিকে তারের সংযোগ দেখানো একটি চিত্র"
    >
      <defs>
        <linearGradient id="signal" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1769FF" />
          <stop offset="100%" stopColor="#27D8E8" />
        </linearGradient>
        <linearGradient id="link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1769FF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#27D8E8" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* connection lines */}
      <g stroke="url(#link)" strokeWidth="2" fill="none">
        <path d="M260 210 L118 108" />
        <path d="M260 210 L400 96" />
        <path d="M260 210 L432 250" />
        <path d="M260 210 L96 268" />
        <path d="M260 210 L268 344" />
      </g>

      {/* signal arcs */}
      <g
        fill="none"
        stroke="url(#signal)"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.9"
      >
        <path d="M232 168a52 52 0 0 1 56 0" opacity="0.45" />
        <path d="M218 148a78 78 0 0 1 84 0" opacity="0.28" />
        <path d="M204 128a104 104 0 0 1 112 0" opacity="0.16" />
      </g>

      {/* router */}
      <g>
        <rect
          x="196"
          y="186"
          width="128"
          height="66"
          rx="14"
          fill="#0B1F3A"
        />
        <rect
          x="208"
          y="200"
          width="104"
          height="38"
          rx="8"
          fill="#16304F"
        />
        <circle cx="224" cy="219" r="4" fill="#27D8E8" />
        <circle cx="238" cy="219" r="4" fill="#1769FF" />
        <circle cx="252" cy="219" r="4" fill="#33507a" />
        <rect x="272" y="214" width="28" height="10" rx="5" fill="#33507a" />
        <rect x="212" y="252" width="18" height="10" rx="4" fill="#0B1F3A" />
        <rect x="290" y="252" width="18" height="10" rx="4" fill="#0B1F3A" />
      </g>

      {/* devices */}
      <g>
        {/* house */}
        <g transform="translate(84 74)">
          <rect
            x="0"
            y="18"
            width="70"
            height="52"
            rx="8"
            fill="#ffffff"
            stroke="#c3cede"
            strokeWidth="2"
          />
          <path
            d="M-4 20 L35 -8 L74 20"
            fill="none"
            stroke="#1769FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="27" y="42" width="16" height="28" rx="3" fill="#e8f0ff" />
        </g>

        {/* house */}
        <g transform="translate(366 62)">
          <rect
            x="0"
            y="18"
            width="70"
            height="52"
            rx="8"
            fill="#ffffff"
            stroke="#c3cede"
            strokeWidth="2"
          />
          <path
            d="M-4 20 L35 -8 L74 20"
            fill="none"
            stroke="#27D8E8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="27" y="42" width="16" height="28" rx="3" fill="#e2f8fb" />
        </g>

        {/* office */}
        <g transform="translate(398 218)">
          <rect
            x="0"
            y="0"
            width="68"
            height="64"
            rx="8"
            fill="#ffffff"
            stroke="#c3cede"
            strokeWidth="2"
          />
          <rect x="12" y="14" width="14" height="12" rx="2" fill="#e8f0ff" />
          <rect x="34" y="14" width="14" height="12" rx="2" fill="#e8f0ff" />
          <rect x="12" y="34" width="14" height="12" rx="2" fill="#e8f0ff" />
          <rect x="34" y="34" width="14" height="12" rx="2" fill="#e8f0ff" />
        </g>

        {/* mobile */}
        <g transform="translate(64 240)">
          <rect
            x="0"
            y="0"
            width="40"
            height="66"
            rx="9"
            fill="#ffffff"
            stroke="#c3cede"
            strokeWidth="2"
          />
          <rect x="6" y="12" width="28" height="38" rx="3" fill="#e8f0ff" />
          <circle cx="20" cy="57" r="3.5" fill="#1769FF" />
        </g>

        {/* laptop */}
        <g transform="translate(240 320)">
          <rect
            x="0"
            y="0"
            width="56"
            height="36"
            rx="5"
            fill="#ffffff"
            stroke="#c3cede"
            strokeWidth="2"
          />
          <rect x="6" y="6" width="44" height="24" rx="2" fill="#e2f8fb" />
          <path d="M-6 40 H62 L56 36 H0 Z" fill="#c3cede" />
        </g>
      </g>
    </svg>
  );
}
