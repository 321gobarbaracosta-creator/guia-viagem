// =========================================================================
// MODELO DE VIAGEM — 3,2,1 GO! Bárbara Costa
//
// Este arquivo é um MOLDE.
// Não coloque dados reais de clientes aqui.
//
// Para criar uma nova viagem, vamos duplicar este modelo e preencher
// somente os campos necessários.
// =========================================================================

export const tripTemplate = {
  // -----------------------------------------------------------------------
  // IDENTIFICAÇÃO
  // -----------------------------------------------------------------------

  slug: "nome-da-viagem",

  client: {
    name: "",
  },

  destination: {
    country: "",
    city: "",
    period: "",
  },

  // -----------------------------------------------------------------------
  // CAPA / HOME
  // -----------------------------------------------------------------------

  cover: {
    title: "",
    subtitle: "",
    image: "",
  },

  // -----------------------------------------------------------------------
  // VOOS
  // -----------------------------------------------------------------------

  flights: [
    {
      id: "flight-1",
      type: "outbound",
      airline: "",
      flightNumber: "",
      date: "",
      departure: {
        airport: "",
        city: "",
        time: "",
      },
      arrival: {
        airport: "",
        city: "",
        time: "",
      },
      duration: "",
      baggage: "",
    },

    // Adicione outros voos conforme necessário
  ],

  // -----------------------------------------------------------------------
  // HOTÉIS
  // -----------------------------------------------------------------------

  hotels: [
    {
      id: "hotel-1",
      name: "",
      city: "",

      // URL direta da foto real do hotel
      photo: "",

      checkIn: "",
      checkOut: "",

      address: "",

      // Opcional
      phone: "",

      // Texto usado para abrir o Google Maps
      mapQuery: "",
    },

    // Adicione outros hotéis conforme necessário
  ],

  // -----------------------------------------------------------------------
  // ROTEIRO
  // -----------------------------------------------------------------------

  itinerary: [
    {
      id: "day-1",
      date: "",
      city: "",
      title: "",
      activities: [
        {
          time: "",
          type: "landmark",
          title: "",
          description: "",
        },
      ],
    },

    // Adicione outros dias conforme necessário
  ],

  // -----------------------------------------------------------------------
  // INFORMAÇÕES IMPORTANTES
  // -----------------------------------------------------------------------

  importantInfo: [
    {
      label: "",
      value: "",
    },
  ],

  // -----------------------------------------------------------------------
  // EMERGÊNCIAS
  // -----------------------------------------------------------------------

  emergency: [
    {
      id: "emergency-1",
      label: "",
      phone: "",
      icon: "shield",
    },

    {
      id: "emergency-2",
      label: "",
      phone: "",
      icon: "heart",
    },

    {
      id: "emergency-3",
      label: "",
      phone: "",
      icon: "flame",
    },
  ],

  // -----------------------------------------------------------------------
  // REPRESENTAÇÃO / EMBAIXADA
  // -----------------------------------------------------------------------

  embassy: null,

  // Exemplo:
  //
  // embassy: {
  //   label: "Embaixada do Brasil",
  //   url: "https://..."
  // },

  // -----------------------------------------------------------------------
  // DESTAQUES / DICAS
  // -----------------------------------------------------------------------

  highlights: [],

  // -----------------------------------------------------------------------
  // OBSERVAÇÕES
  // -----------------------------------------------------------------------

  notes: [],
};
