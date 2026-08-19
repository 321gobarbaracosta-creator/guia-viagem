import React, { createContext, useContext, useEffect, useState } from "react";
import { getCountryInfo } from "./countryUtils.js";
import { getEmergencyContacts } from "./emergencyUtils.js";

const TripContext = createContext(null);

export function TripProvider({ trip, children }) {
  const [tripData, setTripData] = useState(trip);

  useEffect(() => {
    let cancelled = false;

    async function loadAutomaticCountryData() {
      if (!trip?.trip?.destination) {
        setTripData(trip);
        return;
      }

      try {
        // 1. Descobre automaticamente o país a partir do destino.
        const country = await getCountryInfo(trip.trip.destination);

        if (!country) {
          setTripData(trip);
          return;
        }

        // 2. Busca automaticamente os contatos de emergência.
        const emergency = await getEmergencyContacts(country.iso2);

        if (cancelled) return;

        // 3. Acrescenta os dados automáticos à viagem.
        setTripData({
          ...trip,
          country: {
            ...country,
          },
          emergencyContacts:
            emergency?.contacts?.length
              ? emergency.contacts
              : trip.emergencyContacts || [],
        });
      } catch (error) {
        console.error(
          "Erro ao carregar informações automáticas da viagem:",
          error
        );

        // Se alguma API falhar, mantém os dados que já existem.
        setTripData(trip);
      }
    }

    loadAutomaticCountryData();

    return () => {
      cancelled = true;
    };
  }, [trip]);

  return (
    <TripContext.Provider value={tripData}>
      {children}
    </TripContext.Provider>
  );
}

// Hook usado pelas telas para ler os dados da viagem ativa.
// As telas continuam usando exatamente o mesmo useTrip().
export function useTrip() {
  const ctx = useContext(TripContext);

  if (!ctx) {
    throw new Error(
      "useTrip() precisa ser usado dentro de <TripProvider>"
    );
  }

  return ctx;
}
