// =========================================================================
// ARMAZENAMENTO LOCAL OFFLINE-FIRST
//
// Estratégia:
// 1. Quando o cliente abrir a viagem enquanto conectado, salvar no localStorage
// 2. Quando offline, carregar do localStorage
// 3. Se nunca foi preparado, mostrar mensagem de preparação
// =========================================================================

const STORAGE_VERSION = "v1";
const STORAGE_PREFIX = "321go-offline";

export function getStorageKey(tripSlug) {
  return `${STORAGE_PREFIX}:${tripSlug}:${STORAGE_VERSION}`;
}

export function getMetaKey() {
  return `${STORAGE_PREFIX}:meta:${STORAGE_VERSION}`;
}

/**
 * Salva uma viagem completa no localStorage
 * Cria também um registro de meta informações
 */
export function saveTripForOffline(slug, tripData) {
  try {
    const key = getStorageKey(slug);
    localStorage.setItem(key, JSON.stringify(tripData));

    // Marcar como preparado + timestamp
    const meta = getMeta();
    meta[slug] = {
      savedAt: new Date().toISOString(),
      destination: tripData.trip.destination,
      clientNames: tripData.client.names,
    };
    localStorage.setItem(getMetaKey(), JSON.stringify(meta));

    console.log(`[Offline] Trip "${slug}" saved successfully`);
    return true;
  } catch (error) {
    console.error("[Offline] Failed to save trip:", error);
    return false;
  }
}

/**
 * Recupera uma viagem do localStorage
 */
export function getTripFromOffline(slug) {
  try {
    const key = getStorageKey(slug);
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error("[Offline] Failed to load trip:", error);
    return null;
  }
}

/**
 * Verifica se uma viagem já foi preparada para offline
 */
export function isTripPreparedOffline(slug) {
  const meta = getMeta();
  return meta && meta[slug] ? true : false;
}

/**
 * Recupera metadados de todas as viagens preparadas
 */
function getMeta() {
  try {
    const metaKey = getMetaKey();
    const metaData = localStorage.getItem(metaKey);
    return metaData ? JSON.parse(metaData) : {};
  } catch (error) {
    console.error("[Offline] Failed to load meta:", error);
    return {};
  }
}

/**
 * Remove uma viagem do armazenamento local
 */
export function removeTripFromOffline(slug) {
  try {
    const key = getStorageKey(slug);
    localStorage.removeItem(key);

    const meta = getMeta();
    delete meta[slug];
    localStorage.setItem(getMetaKey(), JSON.stringify(meta));

    console.log(`[Offline] Trip "${slug}" removed`);
    return true;
  } catch (error) {
    console.error("[Offline] Failed to remove trip:", error);
    return false;
  }
}

/**
 * Limpa TODO o armazenamento offline (para debugging/testes)
 */
export function clearAllOfflineData() {
  try {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(STORAGE_PREFIX)
    );
    keys.forEach((k) => localStorage.removeItem(k));
    console.log("[Offline] All offline data cleared");
    return true;
  } catch (error) {
    console.error("[Offline] Failed to clear offline data:", error);
    return false;
  }
}

/**
 * Verifica se o navegador está online
 */
export function isOnline() {
  return navigator.onLine !== false;
}

/**
 * Registra service worker e monitora estado online/offline
 */
export async function initializeOfflineMode() {
  // Registrar service worker
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      console.log("[Offline] Service Worker registered:", registration);
      return registration;
    } catch (error) {
      console.error("[Offline] Service Worker registration failed:", error);
      return null;
    }
  } else {
    console.warn("[Offline] Service Worker not supported");
    return null;
  }
}

/**
 * Setup listeners para monitorar online/offline
 */
export function setupOnlineStatusListeners(callback) {
  window.addEventListener("online", () => {
    console.log("[Offline] Online again");
    if (callback) callback(true);
  });
  window.addEventListener("offline", () => {
    console.log("[Offline] Now offline");
    if (callback) callback(false);
  });
}
