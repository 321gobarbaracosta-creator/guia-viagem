// =========================================================================
// FONTE DE DADOS — camada única por onde o app busca uma viagem.
//
// HOJE: lê do objeto local `trips` (src/data/trips.js). Nenhuma rede,
// nenhuma conta externa é necessária nesta etapa.
//
// PRÓXIMA ETAPA (Supabase): esta é a ÚNICA função que precisará mudar.
// Em vez de ler `trips[slug]`, ela fará algo como:
//
//   const { data } = await supabase
//     .from("trips")
//     .select("*, flights(*), hotels(*), itinerary_days(*), itinerary_activities(*), emergency_contacts(*)")
//     .eq("slug", slug)
//     .eq("published", true)
//     .single();
//
// A função já é assíncrona (retorna uma Promise) propositalmente, para que
// essa troca não exija mudar nenhum componente de tela — eles já esperam
// os dados chegarem de forma assíncrona.
// =========================================================================

import { trips, DEFAULT_SLUG } from "../data/trips.js";

/**
 * Busca uma viagem pelo slug. Retorna null se não existir ou não estiver
 * publicada (mesma regra que será aplicada no Supabase futuramente).
 */
export async function getTripBySlug(slug) {
  const trip = trips[slug];
  if (!trip) return null;
  if (trip.published === false) return null;
  return trip;
}

export function getDefaultSlug() {
  return DEFAULT_SLUG;
}
