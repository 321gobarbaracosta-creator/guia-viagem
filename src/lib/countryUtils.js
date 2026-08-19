// ================================================================
// UTILITÁRIOS DE PAÍS
//
// O sistema recebe o nome do destino em português e identifica
// automaticamente o país, sem precisar manter uma lista manual
// de países no código.
//
// Exemplo:
// "Tailândia" -> TH
// "Portugal"  -> PT
// "Itália"    -> IT
// "Croácia"   -> HR
// "Japão"     -> JP
// ================================================================

let countriesCache = null;

/**
 * Normaliza um texto para facilitar a comparação.
 *
 * Exemplo:
 * "São Tomé e Príncipe"
 * ->
 * "sao tome e principe"
 */
function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Carrega a lista mundial de países.
 *
 * O resultado fica em memória para não fazer uma nova consulta
 * a cada viagem.
 */
async function loadCountries() {
  if (countriesCache) {
    return countriesCache;
  }

  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,translations,cca2,cca3,capital,currencies,languages,timezones,region,subregion"
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar os países.");
  }

  countriesCache = await response.json();

  return countriesCache;
}

/**
 * Descobre automaticamente o país a partir do destino.
 *
 * A busca considera:
 *
 * - nome comum em português
 * - nome oficial em português
 * - nome comum internacional
 * - nome oficial internacional
 * - código ISO de 2 letras
 * - código ISO de 3 letras
 */
export async function getCountryInfo(destination) {
  if (!destination) {
    return null;
  }

  try {
    const countries = await loadCountries();

    const normalizedDestination = normalizeText(destination);

    const country = countries.find((item) => {
      const names = [
        item?.name?.common,
        item?.name?.official,

        item?.translations?.por?.common,
        item?.translations?.por?.official,

        item?.translations?.eng?.common,
        item?.translations?.eng?.official,

        item?.cca2,
        item?.cca3,
      ]
        .filter(Boolean)
        .map(normalizeText);

      return names.includes(normalizedDestination);
    });

    if (!country) {
      console.warn(
        `País não encontrado automaticamente para: "${destination}"`
      );

      return null;
    }

    return {
      name: country?.translations?.por?.common ||
        country?.name?.common ||
        destination,

      officialName:
        country?.translations?.por?.official ||
        country?.name?.official ||
        null,

      iso2: country?.cca2 || null,

      iso3: country?.cca3 || null,

      capital:
        country?.capital?.[0] ||
        null,

      currency:
        country?.currencies
          ? Object.keys(country.currencies)[0]
          : null,

      languages:
        country?.languages
          ? Object.values(country.languages)
          : [],

      timezones:
        country?.timezones || [],

      region:
        country?.region || null,

      subregion:
        country?.subregion || null,
    };
  } catch (error) {
    console.error(
      "Erro ao descobrir país automaticamente:",
      error
    );

    return null;
  }
}
