import React, { createContext, useContext } from "react";

const TripContext = createContext(null);

export function TripProvider({ trip, children }) {
  return <TripContext.Provider value={trip}>{children}</TripContext.Provider>;
}

// Hook usado pelas telas para ler os dados da viagem ativa (a que
// corresponde ao slug acessado). Nunca é necessário importar dados de
// viagem diretamente dentro de um componente de tela — sempre via este hook.
export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) {
    throw new Error("useTrip() precisa ser usado dentro de <TripProvider>");
  }
  return ctx;
}
