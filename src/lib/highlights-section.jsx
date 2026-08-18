import React from "react";
import { HighlightIllustration } from "./illustrations.jsx";

/**
 * Componente HighlightsSection — apresenta os destaques da viagem
 * Estilo: editorial elegante, pequenos cards com ilustrações
 * Aparição: entre as quick-access-cards e o "Próximo passo"
 */
export function HighlightsSection({ highlights }) {
  // Se não houver highlights ou array vazio, não renderizar nada
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#22A8C9] mb-3">
        <span className="inline-flex items-center gap-[3px]" aria-hidden="true">
          <span className="w-[5px] h-[5px] rounded-full bg-[#E05220]" />
          <span className="w-[4px] h-[4px] rounded-full bg-[#22A8C9]" />
          <span className="w-[3px] h-[3px] rounded-full bg-[#E05220]/40" />
        </span>
        Você vai conhecer
      </p>

      {/* Grid responsivo — 2 colunas no mobile, 4 no desktop */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="flex flex-col items-center gap-2 p-3 rounded-[16px] bg-white border border-black/[0.06] shadow-[0_2px_12px_-8px_rgba(31,41,55,0.1)]"
          >
            {/* Ilustração — 60px quadrados no mobile, 70px no desktop */}
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              <HighlightIllustration type={highlight.illustration} />
            </div>

            {/* Nome do destino */}
            <p className="font-poppins font-medium text-[12px] md:text-[13px] text-[#1F2937] text-center leading-tight">
              {highlight.name}
            </p>
          </div>
        ))}
      </div>

      {/* Lista horizontal complementar (opcional) — melhor experiência visual */}
      <p className="font-poppins font-light text-[11px] text-[#9CA3AF] text-center">
        {highlights.map((h) => h.name).join(" · ")}
      </p>
    </div>
  );
}
