import type { ArtworkKind } from "@/data/projects";

export default function ProjectArtwork({
  kind,
  accent,
  title,
}: {
  kind: ArtworkKind;
  accent: string;
  title: string;
}) {
  return (
    <div className="art" style={{ "--accent": accent } as React.CSSProperties} aria-hidden>
      <svg viewBox="0 0 320 180" role="img" aria-label={`${title} artwork`}>
        <defs>
          <linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c8cff" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill="#0b0f16" />
        {kind === "pipeline" && (
          <g fill="none" stroke={`url(#g-${kind})`} strokeWidth="1.4">
            <rect x="24" y="70" width="52" height="40" rx="8" />
            <rect x="98" y="70" width="52" height="40" rx="8" />
            <rect x="172" y="70" width="52" height="40" rx="8" />
            <rect x="246" y="70" width="50" height="40" rx="8" />
            <path d="M76 90h22M150 90h22M224 90h22" />
          </g>
        )}
        {kind === "vectors" &&
          [40, 90, 150, 210, 270].map((x, i) => (
            <circle key={x} cx={x} cy={70 + (i % 3) * 18} r={6 + (i % 2) * 4} fill={accent} opacity={0.4 + i * 0.08} />
          ))}
        {kind === "rag" && (
          <g fill="none" stroke={accent} strokeWidth="1.3">
            <rect x="30" y="40" width="70" height="90" rx="6" />
            <path d="M120 85h40" />
            <circle cx="190" cy="85" r="22" />
            <path d="M212 85h38" />
            <rect x="250" y="62" width="44" height="46" rx="6" />
          </g>
        )}
        {kind === "logs" &&
          [0, 1, 2, 3, 4].map((n) => (
            <rect key={n} x="36" y={40 + n * 22} width={180 + (n % 3) * 28} height="10" rx="3" fill={accent} opacity={0.25 + n * 0.12} />
          ))}
        {kind === "vision" && (
          <g fill="none" stroke={accent} strokeWidth="1.4">
            <rect x="70" y="42" width="180" height="100" rx="8" />
            <rect x="118" y="68" width="70" height="48" />
            <circle cx="190" cy="78" r="6" />
          </g>
        )}
        {kind === "scan" && (
          <g>
            <ellipse cx="160" cy="90" rx="70" ry="52" fill="none" stroke={accent} />
            <ellipse cx="160" cy="90" rx="40" ry="30" fill={accent} opacity="0.2" />
            <path d="M90 90h140" stroke={accent} />
          </g>
        )}
        {kind === "network" && (
          <g stroke={accent} fill={accent}>
            <circle cx="80" cy="70" r="5" />
            <circle cx="160" cy="50" r="5" />
            <circle cx="230" cy="90" r="5" />
            <circle cx="140" cy="130" r="5" />
            <path d="M80 70 160 50 230 90 140 130 80 70" fill="none" />
          </g>
        )}
        {kind === "agents" && (
          <g fill="none" stroke={accent} strokeWidth="1.3">
            <circle cx="80" cy="90" r="18" />
            <circle cx="160" cy="50" r="18" />
            <circle cx="240" cy="90" r="18" />
            <circle cx="160" cy="130" r="18" />
            <path d="M96 80 144 58M176 58 224 80M176 122 224 100M96 100 144 122" />
          </g>
        )}
        {kind === "layers" &&
          [0, 1, 2, 3].map((n) => (
            <rect key={n} x={50 + n * 8} y={40 + n * 18} width="200" height="28" rx="4" fill="none" stroke={accent} opacity={0.4 + n * 0.15} />
          ))}
        {kind === "charts" && (
          <g fill={accent}>
            {[40, 70, 55, 90, 48, 78].map((h, i) => (
              <rect key={i} x={40 + i * 42} y={150 - h} width="22" height={h} rx="3" opacity={0.35 + (i % 3) * 0.2} />
            ))}
          </g>
        )}
        {kind === "funnel" && (
          <g fill={accent} opacity="0.55">
            <polygon points="50,40 270,40 230,80 90,80" />
            <polygon points="90,92 230,92 200,124 120,124" />
            <polygon points="120,136 200,136 180,160 140,160" />
          </g>
        )}
        {kind === "chat" && (
          <g fill="none" stroke={accent}>
            <rect x="40" y="40" width="150" height="38" rx="12" />
            <rect x="130" y="96" width="150" height="38" rx="12" />
          </g>
        )}
        {kind === "kanban" &&
          [0, 1, 2].map((c) => (
            <g key={c} fill="none" stroke={accent}>
              <rect x={40 + c * 90} y="36" width="70" height="110" rx="8" />
              <rect x={50 + c * 90} y="50" width="50" height="18" />
              <rect x={50 + c * 90} y="76" width="50" height="18" />
            </g>
          ))}
        {kind === "links" && (
          <g fill="none" stroke={accent} strokeWidth="1.6">
            <circle cx="90" cy="90" r="28" />
            <circle cx="230" cy="90" r="28" />
            <path d="M118 90h84" />
          </g>
        )}
        {kind === "queue" &&
          [0, 1, 2, 3, 4].map((n) => (
            <circle key={n} cx={50 + n * 50} cy="90" r="12" fill={accent} opacity={0.25 + n * 0.12} />
          ))}
        {kind === "stream" && (
          <path d="M20 110 C 80 40, 140 160, 200 80 S 300 40, 320 90" fill="none" stroke={accent} strokeWidth="2" />
        )}
        {kind === "shop" && (
          <g fill="none" stroke={accent}>
            <rect x="70" y="70" width="180" height="80" rx="6" />
            <path d="M70 70 90 40h140l20 30" />
          </g>
        )}
        {kind === "cloud" && (
          <g fill="none" stroke={accent}>
            <path d="M90 110h140a30 30 0 0 0 0-60 46 46 0 0 0-86-10 34 34 0 0 0-54 70z" />
          </g>
        )}
        {kind === "infra" && (
          <g fill="none" stroke={accent}>
            <rect x="50" y="110" width="220" height="24" />
            <rect x="80" y="78" width="60" height="32" />
            <rect x="180" y="78" width="60" height="32" />
            <rect x="130" y="46" width="60" height="32" />
          </g>
        )}
        {kind === "enterprise" && (
          <g fill="none" stroke={accent}>
            <rect x="40" y="50" width="240" height="90" rx="10" />
            <path d="M40 72h240" />
            <circle cx="58" cy="61" r="4" fill={accent} />
            <circle cx="74" cy="61" r="4" fill={accent} opacity="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
}
