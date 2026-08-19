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
        photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/09/be/b8/above-riva-rooftop-restaurant.jpg?w=900&h=500&s=1",
        isPlaceholderPhoto: false,
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
     photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Ik6KQcDCVo4L0UobyNzVkp1KH4RYuc-D-2ZfeIAQvpFshp6fuTNBils&s=10",
isPlaceholderPhoto: false,
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
  "silvana-cristina-tania": {
  id: "trip-silvana-cristina-tania",
  slug: "silvana-cristina-tania",
  published: true,
  accessPin: null,

  client: {
    names: "Silvana, Cristina e Tania",
  },

  trip: {
    destination: "Peru",
    displayDates: "03 — 09 SET 2026",
    coverPhoto:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1400&auto=format&fit=crop",
  },

  flights: [
    {
      id: "voo-1",
      airline: "LATAM Airlines",
      flightNumber: "LA8122",
      date: "03 SET 2026",
      departure: {
        time: "21:30",
        airport: "GRU",
        city: "São Paulo",
        terminal: "Guarulhos",
      },
      arrival: {
        time: "00:45 +1",
        airport: "LIM",
        city: "Lima",
        terminal: "Jorge Chávez",
      },
      duration: "5h 15",
      baggage: "1 mala despachada por adulto + bagagem de mão + mochila/bolsa",
    },

    {
      id: "voo-2",
      airline: "LATAM Airlines",
      flightNumber: "LA2232",
      date: "04 SET 2026",
      departure: {
        time: "05:45",
        airport: "LIM",
        city: "Lima",
        terminal: "Jorge Chávez",
      },
      arrival: {
        time: "07:05",
        airport: "CUZ",
        city: "Cusco",
        terminal: "Velazco Astete",
      },
      duration: "1h 20",
      baggage: "1 mala despachada por adulto + bagagem de mão + mochila/bolsa",
    },

    {
      id: "voo-3",
      airline: "LATAM Airlines",
      flightNumber: "LA2144",
      date: "06 SET 2026",
      departure: {
        time: "08:20",
        airport: "CUZ",
        city: "Cusco",
        terminal: "Velazco Astete",
      },
      arrival: {
        time: "09:50",
        airport: "LIM",
        city: "Lima",
        terminal: "Jorge Chávez",
      },
      duration: "1h 30",
      baggage: "1 mala despachada por adulto + bagagem de mão + mochila/bolsa",
    },

    {
      id: "voo-4",
      airline: "LATAM Airlines",
      flightNumber: "LA2935",
      date: "09 SET 2026",
      departure: {
        time: "13:30",
        airport: "LIM",
        city: "Lima",
        terminal: "Jorge Chávez",
      },
      arrival: {
        time: "20:10",
        airport: "GRU",
        city: "São Paulo",
        terminal: "Guarulhos",
      },
      duration: "4h 40",
      baggage: "1 mala despachada por adulto + bagagem de mão + mochila/bolsa",
    },
  ],

  hotels: [
    {
      id: "hotel-1",
      name: "Centro by Casa Andina Cusco Saphi",
      city: "Cusco",
      photo:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/85/99/0d/caption.jpg?w=900&h=500&s=1",
      isPlaceholderPhoto: false,
      checkIn: "04 SET · 14:00",
      checkOut: "06 SET · 10:00",
      address: "Calle Saphi 601, Cusco, Cusco, Peru",
      phone: "",
      mapQuery: "Centro by Casa Andina Cusco Saphi",
      website: "#",
    },

    {
      id: "hotel-2",
      name: "Dazzler by Wyndham Lima Miraflores",
      city: "Lima",
      photo:
        "https://images.trvl-media.com/lodging/7000000/6280000/6279000/6278988/65642ddd.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      isPlaceholderPhoto: false,
      checkIn: "06 SET · 15:00",
      checkOut: "09 SET · 12:00",
      address: "Av. José Pardo 879, Lima, Peru",
      phone: "",
      mapQuery: "Dazzler by Wyndham Lima Miraflores",
      website: "#",
    },
  ],

  itinerary: [
    {
      id: "dia-1",
      date: "03 SET",
      weekday: "Quinta",
      title: "São Paulo → Lima",
      activities: [
        {
          time: "21:30",
          icon: "flight",
          title: "Embarque · Voo LA8122",
          description: "GRU → LIM",
          location: null,
        },
      ],
    },

    {
      id: "dia-2",
      date: "04 SET",
      weekday: "Sexta",
      title: "Lima → Cusco",
      activities: [
        {
          time: "00:45",
          icon: "land",
          title: "Chegada em Lima",
          description: "Aeroporto Internacional Jorge Chávez",
          location: null,
        },
        {
          time: "05:45",
          icon: "flight",
          title: "Embarque · Voo LA2232",
          description: "LIM → CUZ",
          location: null,
        },
        {
          time: "07:05",
          icon: "land",
          title: "Chegada em Cusco",
          description: "Aeroporto Velazco Astete",
          location: null,
        },
        {
          time: "07:45–08:15",
          icon: "car",
          title: "Transfer para o hotel",
          description: "Transfer privativo · Illapa Transportes Turísticos",
          location: "Centro by Casa Andina Cusco Saphi",
        },
        {
          time: "13:00",
          icon: "landmark",
          title: "City Tour de Cusco",
          description:
            "Qorikancha, Sacsayhuamán, Qenqo, Puka Pukara e Tambomachay.",
          location: "Plaza de Armas de Cusco",
        },
        {
          time: "14:00",
          icon: "hotel",
          title: "Check-in",
          description: "Centro by Casa Andina Cusco Saphi",
          location: "Centro by Casa Andina Cusco Saphi",
        },
      ],
    },

    {
      id: "dia-3",
      date: "05 SET",
      weekday: "Sábado",
      title: "Machu Picchu",
      activities: [
        {
          time: "05:30",
          icon: "landmark",
          title: "Tour de dia inteiro em Machu Picchu",
          description:
            "Trem turístico, ônibus até Machu Picchu, visita guiada e retorno a Cusco.",
          location: "Machu Picchu",
        },
      ],
    },

    {
      id: "dia-4",
      date: "06 SET",
      weekday: "Domingo",
      title: "Cusco → Lima",
      activities: [
        {
          time: "03:55–04:25",
          icon: "car",
          title: "Transfer para o aeroporto",
          description:
            "Transfer privativo · Illapa Transportes Turísticos",
          location: "Aeroporto Velazco Astete",
        },
        {
          time: "08:20",
          icon: "flight",
          title: "Embarque · Voo LA2144",
          description: "CUS → LIM",
          location: null,
        },
        {
          time: "09:50",
          icon: "land",
          title: "Chegada em Lima",
          description: "Aeroporto Internacional Jorge Chávez",
          location: null,
        },
        {
          time: "09:45–10:15",
          icon: "car",
          title: "Transfer para o hotel",
          description:
            "Transfer privativo · Travelcab · Portão 3, Nível 1",
          location: "Dazzler by Wyndham Lima Miraflores",
        },
        {
          time: "15:00",
          icon: "hotel",
          title: "Check-in",
          description: "Dazzler by Wyndham Lima Miraflores",
          location: "Dazzler by Wyndham Lima Miraflores",
        },
      ],
    },

    {
      id: "dia-5",
      date: "07 SET",
      weekday: "Segunda",
      title: "Lima · Curso",
      activities: [],
    },

    {
      id: "dia-6",
      date: "08 SET",
      weekday: "Terça",
      title: "Lima · Curso",
      activities: [],
    },

    {
      id: "dia-7",
      date: "09 SET",
      weekday: "Quarta",
      title: "Lima → São Paulo",
      activities: [
        {
          time: "09:00–09:30",
          icon: "car",
          title: "Transfer para o aeroporto",
          description:
            "Transfer privativo · AeroCab Transfer Peru",
          location: "Aeroporto Internacional Jorge Chávez",
        },
        {
          time: "13:30",
          icon: "flight",
          title: "Embarque · Voo LA2935",
          description: "LIM → GRU",
          location: null,
        },
        {
          time: "20:10",
          icon: "land",
          title: "Chegada em São Paulo",
          description: "Aeroporto Internacional Guarulhos",
          location: null,
        },
      ],
    },
  ],

  highlights: [
    {
      id: "lima",
      name: "Lima",
      type: "destination",
      illustration: "city",
    },
    {
      id: "cusco",
      name: "Cusco",
      type: "destination",
      illustration: "mountain",
    },
    {
      id: "machu-picchu",
      name: "Machu Picchu",
      type: "experience",
      illustration: "machu-picchu",
    },
  ],

  emergencyContacts: [
    {
      label: "Polícia",
      phone: "105",
      icon: "shield",
    },
    {
      label: "Emergência médica · SAMU",
      phone: "106",
      icon: "heart",
    },
    {
      label: "Bombeiros",
      phone: "116",
      icon: "flame",
    },
  ],

  importantInfo: {
    currency: "Sol peruano (PEN)",
    language: "Espanhol",
    timezone: "GMT−5",
    plug: "Tipos A e C",
    internet: "Chip local ou eSIM recomendado",
    notes:
      "As informações acima são gerais e devem ser reconfirmadas antes do embarque.",
  },

  tip: {
    text:
      "Em Cusco e Machu Picchu, vá com calma: a altitude pode fazer você sentir o ritmo de forma diferente. Hidrate-se, caminhe sem pressa e aproveite cada momento. 💙",
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
