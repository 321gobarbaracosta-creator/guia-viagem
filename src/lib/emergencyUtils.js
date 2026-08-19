// ================================================================
// CONTATOS DE EMERGÊNCIA
//
// Recebe o código ISO do país e busca automaticamente:
// - Polícia
// - Bombeiros
// - Emergência médica / Ambulância
// - Número geral de emergência
//
// A fonte é a Emergency Number API.
// ================================================================

const API_BASE =
  "https://emergencynumberapi.com/api/country";

/**
 * Converte a resposta da API em um formato simples
 * que o nosso aplicativo consegue utilizar.
 */
function extractNumbers(service) {
  if (!service) return [];

  const numbers = [
    ...(service.All || []),
    ...(service.GSM || []),
    ...(service.Fixed || []),
  ];

  return [...new Set(numbers.filter(Boolean))];
}

/**
 * Busca os contatos de emergência de um país.
 *
 * @param {string} iso2 Código ISO de 2 letras.
 * Exemplo: TH, PT, IT, FR, JP
 */
export async function getEmergencyContacts(iso2) {
  if (!iso2) return null;

  const countryCode = String(iso2).trim().toUpperCase();

  try {
    const response = await fetch(
      `${API_BASE}/${encodeURIComponent(countryCode)}`
    );

    if (!response.ok) {
      console.error(
        "Não foi possível buscar os contatos de emergência:",
        response.status
      );
      return null;
    }

    const result = await response.json();

    if (!result?.data) {
      return null;
    }

    const data = result.data;

    const police = extractNumbers(data.Police);
    const fire = extractNumbers(data.Fire);
    const ambulance = extractNumbers(data.Ambulance);
    const dispatch = extractNumbers(data.Dispatch);

    const contacts = [];

    // Polícia
    if (police.length) {
      contacts.push({
        label: "Polícia",
        phone: police[0],
        icon: "shield",
      });
    }

    // Emergência médica
    if (ambulance.length) {
      contacts.push({
        label: "Emergência médica",
        phone: ambulance[0],
        icon: "heart",
      });
    }

    // Bombeiros
    if (fire.length) {
      contacts.push({
        label: "Bombeiros",
        phone: fire[0],
        icon: "flame",
      });
    }

    // Número geral de emergência
    if (dispatch.length) {
      contacts.push({
        label: "Emergência geral",
        phone: dispatch[0],
        icon: "alert",
      });
    }

    return {
      country: data.Country?.name || null,
      iso2: data.Country?.ISOCode || countryCode,
      contacts,
      member112: Boolean(data.Member_112),
      localOnly: Boolean(data.LocalOnly),
      disclaimer: result.disclaimer || null,
    };
  } catch (error) {
    console.error(
      "Erro ao buscar contatos de emergência:",
      error
    );

    return null;
  }
}
