// ================================================================
// UTILITÁRIOS DE PAÍS
//
// O sistema recebe o nome do destino em português e tenta descobrir
// automaticamente o país e seu código ISO.
//
// Exemplo:
// "Tailândia" -> TH
// "Portugal"  -> PT
// "Itália"    -> IT
// ================================================================

const COUNTRY_ALIASES = {
  "tailandia": "Thailand",
  "tailândia": "Thailand",
  "portugal": "Portugal",
  "italia": "Italy",
  "itália": "Italy",
  "franca": "France",
  "frança": "France",
  "espanha": "Spain",
  "alemanha": "Germany",
  "japao": "Japan",
  "japão": "Japan",
  "estados unidos": "United States",
  "eua": "United States",
  "inglaterra": "United Kingdom",
  "reino unido": "United Kingdom",
  "argentina": "Argentina",
  "chile": "Chile",
  "peru": "Peru",
  "colombia": "Colombia",
  "colômbia": "Colombia",
  "mexico": "Mexico",
  "méxico": "Mexico",
  "canada": "Canada",
  "canadá": "Canada",
  "grecia": "Greece",
  "grécia": "Greece",
  "turquia": "Turkey",
  "turquia": "Turkey",
  "austria": "Austria",
  "áustria": "Austria",
  "suica": "Switzerland",
  "suíça": "Switzerland",
  "holanda": "Netherlands",
  "paises baixos": "Netherlands",
  "países baixos": "Netherlands",
  "egito": "Egypt",
  "emirados arabes unidos": "United Arab Emirates",
  "emirados árabes unidos": "United Arab Emirates",
};

/**
 * Remove acentos e normaliza o texto.
 */
function normalizeCountryName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Descobre o país a partir do nome usado na viagem.
 *
 * Usa o REST Countries para obter:
 * - nome oficial/comum
 * - código ISO alpha-2
 * - capital
 * - moeda
 * - idioma
 * - fuso horário
 *
 * Documentação:
 * https://restcountries.com/
 */
export async function getCountryInfo(destination) {
  if (!destination) return null;

  const normalized = normalizeCountryName(destination);

  const searchName =
    COUNTRY_ALIASES[normalized] || destination;

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        searchName
      )}?fullText=true`
    );

    if (!response.ok) {
      return null;
    }

    const countries = await response.json();

    if (!countries || !countries.length) {
      return null;
    }

    const country = countries[0];

    return {
      name: country?.name?.common || destination,
      officialName: country?.name?.official || null,
      iso2: country?.cca2 || null,
      iso3: country?.cca3 || null,
      capital: country?.capital?.[0] || null,
      currency:
        country?.currencies
          ? Object.keys(country.currencies)[0]
          : null,
      languages:
        country?.languages
          ? Object.values(country.languages)
          : [],
      timezones: country?.timezones || [],
      region: country?.region || null,
      subregion: country?.subregion || null,
    };
  } catch (error) {
    console.error("Erro ao descobrir país:", error);
    return null;
  }
}
