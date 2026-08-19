// =========================================================================
// MODELO DE VIAGEM — 3,2,1 GO! Bárbara Costa
//
// Este arquivo é um MOLDE.
// Não coloque dados reais de clientes aqui.
//
// A estrutura abaixo segue exatamente o formato utilizado atualmente
// pelo site.
// =========================================================================

export const tripTemplate = {
  // -----------------------------------------------------------------------
  // IDENTIFICAÇÃO
  // -----------------------------------------------------------------------

  id: "",
  slug: "",
  published: false,
  accessPin: null,

  client: {
    names: "",
  },

  // -----------------------------------------------------------------------
  // VIAGEM / CAPA
  // -----------------------------------------------------------------------

  trip: {
    destination: "",
    displayDates: "",
    coverPhoto: "",
  },

  // -----------------------------------------------------------------------
  // VOOS
  // -----------------------------------------------------------------------

  flights: [
    {
      id: "",
      airline: "",
      flightNumber: "",
      date: "",

      departure: {
        time: "",
        airport: "",
        city: "",
        terminal: "",
      },

      arrival: {
        time: "",
        airport: "",
        city: "",
        terminal: "",
      },

      duration: "",
      baggage: "",
    },
  ],

  // -----------------------------------------------------------------------
  // HOTÉIS
  // -----------------------------------------------------------------------

  hotels: [
    {
      id: "",
      name: "",
      city: "",

      // Link direto para a foto do hotel
      photo: "",

      checkIn: "",
      checkOut: "",

      address: "",

      // Opcional
      phone: "",

      // Texto usado para abrir o Google Maps
      mapQuery: "",
    },
  ],

  // -----------------------------------------------------------------------
  // ROTEIRO
  // -----------------------------------------------------------------------

  itinerary: [
    {
      id: "",
      date: "",
      weekday: "",
      title: "",

      activities: [
        {
          time: "",
          icon: "",
          title: "",
          description: "",
          location: null,
        },
      ],
        // -----------------------------------------------------------------------
  // TRANSFERS
  // -----------------------------------------------------------------------

  transfers: [
    {
      id: "",
      company: "",
      type: "",
      passengers: "",
      
      from: "",
      to: "",

      date: "",
      flight: "",

      pickupWindow: "",
      meetingPoint: "",

      instructions: "",
      emergencyPhone: "",
    },
  ],

  // -----------------------------------------------------------------------
  // PASSEIOS / EXPERIÊNCIAS
  // -----------------------------------------------------------------------

  experiences: [
    {
      id: "",
      title: "",
      date: "",
      time: "",

      company: "",
      reservationCode: "",

      passengers: "",
      pickupHotel: "",

      description: "",

      included: [],
      notIncluded: [],

      instructions: "",
      contactPhone: "",
      contactEmail: "",
    },
  ],
    },
  ],

  // -----------------------------------------------------------------------
  // DESTAQUES
  // -----------------------------------------------------------------------

  highlights: [
    {
      id: "",
      name: "",
      type: "",
      illustration: "",
    },
  ],

  // -----------------------------------------------------------------------
  // CONTATOS DE EMERGÊNCIA
  //
  // Estes contatos poderão ser preenchidos automaticamente pela API
  // de emergência a partir do país da viagem.
  // -----------------------------------------------------------------------

  emergencyContacts: [],

  // -----------------------------------------------------------------------
  // INFORMAÇÕES IMPORTANTES
  // -----------------------------------------------------------------------

  importantInfo: {
    currency: "",
    language: "",
    timezone: "",
    plug: "",
    internet: "",
    notes: "",
  },

  // -----------------------------------------------------------------------
  // DICA DA BABI
  // -----------------------------------------------------------------------

  tip: {
    text: "",
    signature: "Babi",
  },
};
