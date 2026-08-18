// Ilustrações sofisticadas e delicadas para a seção "Você vai conhecer"
// Estilo: editorial contemporâneo, sketch de viagem elegante, traços simples
// Paleta: azul da marca (#22A8C9), laranja (#E05220), tons neutros
// Cada ilustração é um componente React que renderiza um SVG

export function TempleIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`.temple-stroke { stroke: #22A8C9; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.2; }`}</style>
      </defs>
      {/* Templo simples e elegante — Wat Arun style */}
      <g className="temple-stroke">
        {/* Estrutura principal do templo — múltiplos telhados */}
        {/* Telhado inferior */}
        <path d="M 25 75 L 50 55 L 75 75" />
        {/* Telhado meio */}
        <path d="M 30 60 L 50 45 L 70 60" />
        {/* Telhado superior/spire */}
        <path d="M 40 50 L 50 35 L 60 50" />
        {/* Centro/núcleo */}
        <line x1="50" y1="35" x2="50" y2="25" strokeWidth="1.5" />
        {/* Detalhe de lados */}
        <line x1="48" y1="75" x2="48" y2="80" />
        <line x1="52" y1="75" x2="52" y2="80" />
      </g>
    </svg>
  );
}

export function LongtailBoatIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`.boat-stroke { stroke: #E05220; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.2; }`}</style>
      </defs>
      {/* Barco longtail tailandês — vista lateral delicada */}
      <g className="boat-stroke">
        {/* Casco/corpo do barco */}
        <path d="M 20 60 Q 50 50 80 60" />
        <line x1="20" y1="60" x2="25" y2="75" />
        <line x1="80" y1="60" x2="75" y2="75" />
        <path d="M 25 75 L 75 75" />
        
        {/* Cabine/estrutura superior */}
        <path d="M 35 55 L 40 40 L 60 40 L 65 55" />
        
        {/* Motor longtail (elemento característico) */}
        <line x1="75" y1="72" x2="85" y2="60" strokeWidth="1.5" />
        <circle cx="87" cy="57" r="2.5" fill="none" />
        
        {/* Decoração/bandeira simples */}
        <path d="M 50 38 L 50 30 L 58 32" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function BeachIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`.beach-stroke { stroke: #22A8C9; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.2; }`}</style>
      </defs>
      {/* Praia — palms, água, areia */}
      <g className="beach-stroke">
        {/* Linha da água/horizonte */}
        <path d="M 15 50 Q 50 48 85 50" strokeWidth="1.5" />
        
        {/* Ondas simples */}
        <path d="M 20 55 Q 25 52 30 55" />
        <path d="M 35 57 Q 40 54 45 57" />
        
        {/* Palmeira esquerda */}
        <line x1="25" y1="75" x2="25" y2="50" strokeWidth="1.5" />
        {/* Folhas */}
        <path d="M 25 50 L 20 40 M 25 50 L 30 38 M 25 50 L 18 42 M 25 50 L 32 42" strokeWidth="1" />
        
        {/* Palmeira direita */}
        <line x1="75" y1="75" x2="75" y2="52" strokeWidth="1.5" />
        {/* Folhas */}
        <path d="M 75 52 L 70 40 M 75 52 L 80 40 M 75 52 L 68 44 M 75 52 L 82 44" strokeWidth="1" />
        
        {/* Sol/círculo no horizonte */}
        <circle cx="50" cy="45" r="4" fill="none" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function ElephantIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`.elephant-stroke { stroke: #E05220; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.2; }`}</style>
      </defs>
      {/* Elefante — vista lateral minimalista e elegante */}
      <g className="elephant-stroke">
        {/* Corpo */}
        <ellipse cx="50" cy="60" rx="20" ry="18" />
        
        {/* Cabeça */}
        <circle cx="35" cy="45" r="10" />
        
        {/* Tromba — linha delicada em curva */}
        <path d="M 33 52 Q 30 65 28 75" strokeWidth="1.5" />
        
        {/* Orelha */}
        <path d="M 40 40 Q 38 35 42 38 Q 45 40 42 45" />
        
        {/* Pernas */}
        <line x1="42" y1="75" x2="42" y2="85" strokeWidth="1.5" />
        <line x1="52" y1="75" x2="52" y2="85" strokeWidth="1.5" />
        
        {/* Olho simples */}
        <circle cx="38" cy="42" r="1.5" fill="#E05220" />
        
        {/* Detalhe decorativo — padrão nas costas */}
        <path d="M 45 52 Q 50 50 55 52" strokeWidth="0.8" />
        <path d="M 45 57 Q 50 55 55 57" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

// Mapa de ilustrações — permite adicionar mais facilmente
export const illustrationMap = {
  temple: TempleIllustration,
  longtail: LongtailBoatIllustration,
  beach: BeachIllustration,
  elephant: ElephantIllustration,
};

export function HighlightIllustration({ type }) {
  const Component = illustrationMap[type];
  if (!Component) return null;
  return <Component />;
}
