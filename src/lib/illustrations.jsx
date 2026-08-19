// Ilustrações para a seção "Você vai conhecer"
// Estilo: editorial contemporâneo, sketch de viagem elegante,
// traços simples e delicados.
// Paleta: azul da marca (#22A8C9) e laranja (#E05220)

export function TempleIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g
        stroke="#22A8C9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        <path d="M 25 75 L 50 55 L 75 75" />
        <path d="M 30 60 L 50 45 L 70 60" />
        <path d="M 40 50 L 50 35 L 60 50" />
        <line x1="50" y1="35" x2="50" y2="25" strokeWidth="1.5" />
        <line x1="48" y1="75" x2="48" y2="80" />
        <line x1="52" y1="75" x2="52" y2="80" />
      </g>
    </svg>
  );
}

export function LongtailBoatIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g
        stroke="#E05220"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        <path d="M 20 60 Q 50 50 80 60" />
        <line x1="20" y1="60" x2="25" y2="75" />
        <line x1="80" y1="60" x2="75" y2="75" />
        <path d="M 25 75 L 75 75" />
        <path d="M 35 55 L 40 40 L 60 40 L 65 55" />
        <line x1="75" y1="72" x2="85" y2="60" strokeWidth="1.5" />
        <circle cx="87" cy="57" r="2.5" />
        <path d="M 50 38 L 50 30 L 58 32" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function BeachIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g
        stroke="#22A8C9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        <path d="M 15 50 Q 50 48 85 50" strokeWidth="1.5" />
        <path d="M 20 55 Q 25 52 30 55" />
        <path d="M 35 57 Q 40 54 45 57" />
        <line x1="25" y1="75" x2="25" y2="50" strokeWidth="1.5" />
        <path d="M 25 50 L 20 40 M 25 50 L 30 38 M 25 50 L 18 42 M 25 50 L 32 42" />
        <line x1="75" y1="75" x2="75" y2="52" strokeWidth="1.5" />
        <path d="M 75 52 L 70 40 M 75 52 L 80 40 M 75 52 L 68 44 M 75 52 L 82 44" />
        <circle cx="50" cy="45" r="4" />
      </g>
    </svg>
  );
}

export function ElephantIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g
        stroke="#E05220"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        <ellipse cx="50" cy="60" rx="20" ry="18" />
        <circle cx="35" cy="45" r="10" />
        <path d="M 33 52 Q 30 65 28 75" strokeWidth="1.5" />
        <path d="M 40 40 Q 38 35 42 38 Q 45 40 42 45" />
        <line x1="42" y1="75" x2="42" y2="85" strokeWidth="1.5" />
        <line x1="52" y1="75" x2="52" y2="85" strokeWidth="1.5" />
        <circle cx="38" cy="42" r="1.5" fill="#E05220" />
      </g>
    </svg>
  );
}

/* ============================================================
   NOVOS ÍCONES — PERU
   ============================================================ */

export function CityIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g
        stroke="#22A8C9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        {/* prédios */}
        <path d="M20 75 V42 H38 V75" />
        <path d="M38 75 V30 H58 V75" />
        <path d="M58 75 V48 H80 V75" />

        {/* janelas */}
        <rect x="26" y="50" width="5" height="6" />
        <rect x="45" y="39" width="5" height="6" />
        <rect x="45" y="51" width="5" height="6" />
        <rect x="65" y="55" width="5" height="6" />

        {/* praça/linha */}
        <path d="M15 75 H85" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function MountainIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g
        stroke="#22A8C9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        {/* montanhas */}
        <path d="M10 78 L38 38 L58 62 L70 48 L90 78" />
        <path d="M25 78 L48 52 L75 78" />

        {/* neve/cume */}
        <path d="M32 47 L38 38 L44 50" />
        <path d="M65 54 L70 48 L76 57" />

        {/* linha do horizonte */}
        <path d="M10 78 H90" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function MachuPicchuIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g
        stroke="#E05220"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      >
        {/* montanhas ao fundo */}
        <path d="M10 70 L35 40 L50 58 L70 30 L92 70" />

        {/* terraços de Machu Picchu */}
        <path d="M18 70 H82" />
        <path d="M22 64 H78" />
        <path d="M28 58 H72" />
        <path d="M34 52 H66" />

        {/* construções */}
        <path d="M38 52 V43 H48 V52" />
        <path d="M52 52 V40 H63 V52" />

        {/* pedra central */}
        <path d="M46 64 L50 57 L55 64" />

        {/* vegetação */}
        <path d="M25 70 Q22 62 20 58" />
        <path d="M75 70 Q78 62 80 58" />
      </g>
    </svg>
  );
}

/* ============================================================
   MAPA DE ILUSTRAÇÕES
   ============================================================ */

export const illustrationMap = {
  // Tailândia
  temple: TempleIllustration,
  longtail: LongtailBoatIllustration,
  beach: BeachIllustration,
  elephant: ElephantIllustration,

  // Peru
  city: CityIllustration,
  mountain: MountainIllustration,
  "machu-picchu": MachuPicchuIllustration,
};

export function HighlightIllustration({ type }) {
  const Component = illustrationMap[type];

  if (!Component) return null;

  return <Component />;
}
