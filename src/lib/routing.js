// =========================================================================
// ROTEAMENTO SIMPLES POR SLUG — sem biblioteca de rotas.
//
// Reconhece o padrão /v/<slug>. Qualquer outro caminho (incluindo a raiz
// "/") retorna null, e o app cai no slug padrão — exatamente o
// comportamento atual do site, preservado como fallback.
// =========================================================================

export function getSlugFromPath() {
  if (typeof window === "undefined") return null;
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts[0] === "v" && parts[1]) return decodeURIComponent(parts[1]);
  return null;
}
