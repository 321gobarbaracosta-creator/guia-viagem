// =========================================================================
// DADOS DAS VIAGENS — fonte central de verdade para o guia.
//
// Cada viagem é um objeto independente, identificado por um "slug" único,
// que forma o link exclusivo do cliente: /v/<slug>
//
// ETAPA ATUAL: os dados moram neste arquivo (nenhum backend ainda).
// PRÓXIMA ETAPA: quando o Supabase for conectado, cada campo abaixo vira
// uma linha nas tabelas do banco — o formato foi pensado para migrar sem
// precisar mudar os componentes de tela (ver src/lib/dataSource.js).
//
// `accessPin` já existe como campo reservado (hoje sempre null / não
// aplicado) para permitir adicionar um PIN por viagem no futuro, sem
// precisar reestruturar nada.
// =========================================================================

export const agency = {
  name: "3,2,1 GO! Bárbara Costa",
  tagline: "Viagens personalizadas para você viajar melhor.",
  // Placeholder — substituir pelo número real da agência antes de publicar.
  whatsapp: "5512981587726",
  instagramHandle: "@321go.barbaracosta", // placeholder demonstrativo
  instagramUrl: "https://instagram.com/321go.barbaracosta", // placeholder demonstrativo
};

export const trips = {
  "maria-joao": {
    id: "trip-maria-joao",
    slug: "maria-joao",
    published: true,
    // Reservado para uma futura camada extra de privacidade (PIN de acesso).
    // Não é validado nesta etapa.
    accessPin: null,

    client: {
      names: "Maria & João",
    },

    trip: {
      destination: "Tailândia",
      displayDates: "10 — 25 JAN 2027",
      // Foto de capa — Wat Arun (Templo da Aurora), Bangkok, ao entardecer.
      // Foto editorial licenciada via Unsplash. Substituir pela fotografia
      // oficial do destino/roteiro quando disponível.
      coverPhoto:
        "https://images.unsplash.com/photo-1762950297550-1d8d7cce12ae?q=80&w=1400&auto=format&fit=crop",
    },

    flights: [
      {
        id: "voo-1",
        airline: "Turkish Airlines",
        flightNumber: "TK016",
        date: "10 JAN 2027",
        departure: { time: "22:15", airport: "GRU", city: "São Paulo", terminal: "Guarulhos" },
        arrival: { time: "15:45 +1", airport: "IST", city: "Istambul", terminal: "Aeroporto de Istambul" },
        duration: "13h 30m",
        baggage: "1 mala despachada de 23kg + 1 bagagem de mão",
      },
      {
        id: "voo-2",
        airline: "Turkish Airlines",
        flightNumber: "TK064",
        date: "11 JAN 2027",
        departure: { time: "17:35", airport: "IST", city: "Istambul", terminal: "Aeroporto de Istambul" },
        arrival: { time: "07:10 +1", airport: "BKK", city: "Bangkok", terminal: "Suvarnabhumi" },
        duration: "9h 35m",
        baggage: "1 mala despachada de 23kg + 1 bagagem de mão",
      },
    ],

    hotels: [
      {
        id: "hotel-1",
        name: "Riva Arun Bangkok",
        city: "Bangkok",
        // Foto provisória — NÃO é uma foto real do hotel. Substituir pela foto
        // oficial fornecida pelo hotel assim que disponível.
        photo: "https://picsum.photos/seed/321go-hotel-bangkok/800/600",
        isPlaceholderPhoto: true,
        checkIn: "12 JAN · 14:00",
        checkOut: "16 JAN · 12:00",
        address: "Maha Rat Road, Phra Nakhon, Bangkok",
        phone: "+66 2 000 0000", // placeholder demonstrativo
        mapQuery: "Riva Arun Bangkok",
        website: "#", // placeholder demonstrativo
      },
      {
        id: "hotel-2",
        name: "The Slate Phuket",
        city: "Phuket",
        photo: "https://picsum.photos/seed/321go-hotel-phuket/800/600",
        isPlaceholderPhoto: true,
        checkIn: "16 JAN · 14:00",
        checkOut: "22 JAN · 12:00",
        address: "Nai Yang Beach, Phuket",
        phone: "+66 76 000 000", // placeholder demonstrativo
        mapQuery: "The Slate Phuket",
        website: "#", // placeholder demonstrativo
      },
    ],

    itinerary: [
      {
        id: "dia-1",
        date: "10 JAN",
        weekday: "Domingo",
        title: "São Paulo → Istambul",
        activities: [
          { time: "22:15", icon: "flight", title: "Embarque · Voo TK016", description: "GRU → IST", location: null },
        ],
      },
      {
        id: "dia-2",
        date: "11 JAN",
        weekday: "Segunda",
        title: "Conexão em Istambul",
        activities: [
          { time: "15:45", icon: "land", title: "Chegada em Istambul", description: "Conexão de aproximadamente 1h50", location: null },
          { time: "17:35", icon: "flight", title: "Embarque · Voo TK064", description: "IST → BKK", location: null },
        ],
      },
      {
        id: "dia-3",
        date: "12 JAN",
        weekday: "Terça",
        title: "Chegada em Bangkok",
        activities: [
          { time: "07:10", icon: "land", title: "Chegada ao aeroporto", description: "Suvarnabhumi (BKK)", location: null },
          { time: "09:00", icon: "car", title: "Transfer para o hotel", description: "Transporte privado reservado pela Babi", location: null },
          { time: "14:00", icon: "hotel", title: "Check-in", description: "Riva Arun Bangkok", location: "Riva Arun Bangkok" },
        ],
      },
      {
        id: "dia-4",
        date: "13 JAN",
        weekday: "Quarta",
        title: "Bangkok",
        activities: [
          { time: "09:00", icon: "landmark", title: "Grande Palácio", description: "Visita ao complexo real e ao Templo do Buda de Esmeralda", location: "Grande Palácio, Bangkok" },
          { time: "12:30", icon: "food", title: "Almoço", description: "Cozinha tailandesa à beira do rio Chao Phraya", location: null },
          { time: "15:00", icon: "shop", title: "Mercado Chatuchak", description: "Tarde livre para passear com calma pelos corredores", location: "Mercado Chatuchak" },
        ],
      },
    ],

    highlights: [
      {
        id: "bangkok",
        name: "Bangkok",
        type: "destination",
        illustration: "temple", // SVG key
      },
      {
        id: "phiphi",
        name: "Phi Phi",
        type: "experience",
        illustration: "longtail",
      },
      {
        id: "phuket",
        name: "Phuket",
        type: "destination",
        illustration: "beach",
      },
      {
        id: "chiang-mai",
        name: "Chiang Mai",
        type: "experience",
        illustration: "elephant",
      },
    ],

    emergencyContacts: [
      { label: "Polícia", phone: "191", icon: "shield" },
      { label: "Emergência médica", phone: "1669", icon: "heart" },
      { label: "Bombeiros", phone: "199", icon: "flame" },
    ],

    representation: {
  label: "Representação brasileira em Portugal",
  note: "Contato oficial — confirme antes da viagem.",
  url: "https://www.gov.br/mre/pt-br/embaixada-bangkok",
      
    },

    importantInfo: {
      currency: "Baht tailandês (THB)",
      language: "Tailandês — inglês é comum em áreas turísticas",
      timezone: "GMT+7 (11h à frente de Brasília, sem considerar horário de verão)",
      plug: "Tipo A / C — 220V (leve um adaptador universal)",
      internet: "Chip local ou eSIM recomendado para o roteiro",
      notes: "As informações acima são gerais e devem ser reconfirmadas antes do embarque.",
    },

    tip: {
      text: "Separe um tempinho para caminhar sem pressa pelos mercados locais. Algumas das melhores descobertas da viagem acontecem justamente fora do roteiro. 😉",
      signature: "Babi",
    },
  },

  // Próxima viagem entra aqui como um novo objeto, com uma nova chave/slug —
  // por exemplo "familia-silva": { ... }. Nenhuma alteração de código é
  // necessária nos componentes de tela para isso funcionar.
};

// Slug usado quando nenhum link específico foi acessado (ex.: a raiz "/").
// Mantém o comportamento atual do site (mostra a viagem de demonstração).
export const DEFAULT_SLUG = "maria-joao";
