// =========================================================================
// DESTINOS
// Base central de informações dos destinos.
// O App identifica o país/cidade da viagem e usa estes dados automaticamente.
// =========================================================================

export const destinations = {
  peru: {
    name: "Peru",

    practicalInfo: {
      currency: "Sol peruano (PEN)",
      language: "Espanhol",
      timezone: "GMT−5",
      plug: "Tipos A, B e C • 230 V • 60 Hz",
      internet: "Chip local ou eSIM recomendado"
    },

    entry: {
      documents:
        "Brasileiros podem entrar no Peru para turismo com documento de identidade válido, conforme as regras aplicáveis ao Mercosul. O passaporte também pode ser utilizado.",

      visa:
        "Brasileiros não precisam de visto para turismo no Peru.",

      requirements:
        "Confira a validade dos seus documentos antes da viagem e confirme os requisitos oficiais de entrada próximos ao embarque. A autoridade migratória peruana orienta atenção especial à validade do passaporte.",

      insurance:
        "Seguro viagem é altamente recomendado. Para uma viagem com Cusco e Machu Picchu, vale considerar cobertura para atendimento médico e situações relacionadas à altitude."
    },

    climate: {
      accuweather:
        "https://www.accuweather.com/pt/pe/lima/264120/weather-forecast/264120",

      cities: {
        lima: {
          name: "Lima",

          months: {
            january: {
              max: 26,
              min: 20,
              characteristics:
                "Verão, com temperaturas mais altas e pouca chuva.",
              whatToPack:
                "Roupas leves, protetor solar, óculos de sol e uma camada fina para ambientes com ar-condicionado."
            },

            february: {
              max: 27,
              min: 21,
              characteristics:
                "Um dos períodos mais quentes do ano.",
              whatToPack:
                "Roupas leves, protetor solar, chapéu ou boné e óculos de sol."
            },

            march: {
              max: 27,
              min: 21,
              characteristics:
                "Ainda quente, com características de verão.",
              whatToPack:
                "Roupas leves e proteção solar."
            },

            april: {
              max: 25,
              min: 19,
              characteristics:
                "Temperaturas começam a cair gradualmente.",
              whatToPack:
                "Roupas leves e uma camada fina."
            },

            may: {
              max: 22,
              min: 17,
              characteristics:
                "Período mais fresco e úmido.",
              whatToPack:
                "Casaco leve e roupas em camadas."
            },

            june: {
              max: 20,
              min: 16,
              characteristics:
                "Clima fresco e úmido, com céu frequentemente nublado.",
              whatToPack:
                "Casaco leve, calça e roupas em camadas."
            },

            july: {
              max: 19,
              min: 15,
              characteristics:
                "Um dos períodos mais frescos do ano, com bastante umidade.",
              whatToPack:
                "Casaco leve, calça e roupas em camadas."
            },

            august: {
              max: 19,
              min: 15,
              characteristics:
                "Fresco, úmido e frequentemente nublado.",
              whatToPack:
                "Casaco leve e roupas em camadas."
            },

            september: {
              max: 19,
              min: 15,
              characteristics:
                "Fresco e úmido, com temperaturas relativamente estáveis.",
              whatToPack:
                "Casaco leve, calça e roupas em camadas."
            },

            october: {
              max: 21,
              min: 16,
              characteristics:
                "Temperaturas começam a subir gradualmente.",
              whatToPack:
                "Roupas leves e uma camada fina."
            },

            november: {
              max: 22,
              min: 17,
              characteristics:
                "Primavera, com temperaturas agradáveis.",
              whatToPack:
                "Roupas leves e uma camada fina."
            },

            december: {
              max: 24,
              min: 19,
              characteristics:
                "Início do verão, com temperaturas mais altas.",
              whatToPack:
                "Roupas leves e proteção solar."
            }
          }
        },

        cusco: {
          name: "Cusco",

          months: {
            january: {
              max: 20,
              min: 8,
              characteristics:
                "Período chuvoso, com temperaturas amenas durante o dia e noites frescas.",
              whatToPack:
                "Capa de chuva, calçado confortável e roupas em camadas."
            },

            february: {
              max: 20,
              min: 8,
              characteristics:
                "Período chuvoso, com possibilidade frequente de chuva.",
              whatToPack:
                "Capa de chuva, calçado confortável e roupas em camadas."
            },

            march: {
              max: 20,
              min: 8,
              characteristics:
                "Ainda chuvoso, mas com redução gradual das precipitações.",
              whatToPack:
                "Capa de chuva e roupas em camadas."
            },

            april: {
              max: 21,
              min: 6,
              characteristics:
                "Transição para o período mais seco.",
              whatToPack:
                "Casaco leve, roupas em camadas e capa de chuva."
            },

            may: {
              max: 21,
              min: 4,
              characteristics:
                "Mais seco, com dias agradáveis e noites frias.",
              whatToPack:
                "Casaco quente e roupas em camadas."
            },

            june: {
              max: 21,
              min: 2,
              characteristics:
                "Período seco, ensolarado durante o dia e bastante frio à noite.",
              whatToPack:
                "Casaco quente, roupas em camadas e proteção solar."
            },

            july: {
              max: 21,
              min: 1,
              characteristics:
                "Período seco, com grande diferença entre as temperaturas do dia e da noite.",
              whatToPack:
                "Casaco quente, gorro e roupas em camadas."
            },

            august: {
              max: 21,
              min: 3,
              characteristics:
                "Seco e ensolarado durante o dia, com noites frias.",
              whatToPack:
                "Casaco, roupas em camadas e proteção solar."
            },

            september: {
              max: 22,
              min: 5,
              characteristics:
                "Período ainda predominantemente seco, com dias agradáveis e noites frias.",
              whatToPack:
                "Casaco leve ou médio, roupas em camadas e proteção solar."
            },

            october: {
              max: 22,
              min: 7,
              characteristics:
                "Temperaturas agradáveis, com aumento gradual das chuvas.",
              whatToPack:
                "Roupas em camadas e capa de chuva leve."
            },

            november: {
              max: 22,
              min: 8,
              characteristics:
                "Mais úmido, com aumento das possibilidades de chuva.",
              whatToPack:
                "Capa de chuva e roupas em camadas."
            },

            december: {
              max: 21,
              min: 8,
              characteristics:
                "Período chuvoso, com temperaturas amenas.",
              whatToPack:
                "Capa de chuva, calçado confortável e roupas em camadas."
            }
          }
        },

        machuPicchu: {
          name: "Machu Picchu",

          months: {
            january: {
              max: 20,
              min: 9,
              characteristics:
                "Período chuvoso, com vegetação muito verde e possibilidade frequente de chuva.",
              whatToPack:
                "Capa impermeável, calçado confortável e roupas leves em camadas."
            },

            february: {
              max: 20,
              min: 9,
              characteristics:
                "Um dos períodos mais chuvosos do ano.",
              whatToPack:
                "Capa impermeável, calçado confortável e proteção para equipamentos eletrônicos."
            },

            march: {
              max: 21,
              min: 9,
              characteristics:
                "Ainda chuvoso, com possibilidade de períodos de sol.",
              whatToPack:
                "Capa impermeável e roupas em camadas."
            },

            april: {
              max: 21,
              min: 8,
              characteristics:
                "Chuvas diminuem e o clima começa a ficar mais seco.",
              whatToPack:
                "Capa de chuva leve, calçado confortável e roupas em camadas."
            },

            may: {
              max: 21,
              min: 7,
              characteristics:
                "Período mais seco, com temperaturas agradáveis durante o dia.",
              whatToPack:
                "Roupas em camadas, proteção solar e uma camada impermeável."
            },

            june: {
              max: 21,
              min: 6,
              characteristics:
                "Seco, com dias agradáveis e manhãs mais frias.",
              whatToPack:
                "Casaco leve, roupas em camadas e proteção solar."
            },

            july: {
              max: 21,
              min: 5,
              characteristics:
                "Um dos períodos mais secos, com manhãs e noites frias.",
              whatToPack:
                "Casaco, roupas em camadas, proteção solar e calçado confortável."
            },

            august: {
              max: 21,
              min: 6,
              characteristics:
                "Predominantemente seco e agradável durante o dia.",
              whatToPack:
                "Roupas em camadas, proteção solar e uma camada impermeável."
            },

            september: {
              max: 21,
              min: 7,
              characteristics:
                "Período ainda relativamente seco, com aumento gradual das chuvas.",
              whatToPack:
                "Roupas leves em camadas, proteção solar e capa de chuva."
            },

            october: {
              max: 22,
              min: 8,
              characteristics:
                "Temperaturas agradáveis e aumento das chuvas.",
              whatToPack:
                "Capa de chuva, roupas em camadas e calçado confortável."
            },

            november: {
              max: 22,
              min: 8,
              characteristics:
                "Mais úmido, com maior possibilidade de chuva.",
              whatToPack:
                "Capa de chuva, roupas leves em camadas e calçado confortável."
            },

            december: {
              max: 21,
              min: 9,
              characteristics:
                "Período chuvoso, com vegetação bastante verde.",
              whatToPack:
                "Capa impermeável, calçado confortável e roupas em camadas."
            }
          }
        }
      }
    },

    babiTips: [
      "Cusco está em grande altitude. Vá com calma nos primeiros dias e evite programar atividades muito intensas logo após a chegada.",

      "Em Cusco, a diferença de temperatura entre o dia e a noite pode ser grande. Vestir-se em camadas é a melhor estratégia.",

      "Para Machu Picchu, leve uma capa de chuva mesmo durante a estação mais seca. O clima pode mudar rapidamente.",

      "Protetor solar é indispensável em Cusco e Machu Picchu, mesmo quando o céu estiver nublado.",

      "Leve uma garrafa de água e um calçado confortável para os dias de passeio."
    ]
  }
};
