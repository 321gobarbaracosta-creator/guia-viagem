import React, { useState, useEffect } from "react";
import {
  Home as HomeIcon,
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  LifeBuoy,
  MapPin,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Navigation,
  ExternalLink,
  Clock,
  Luggage,
  Wifi,
  Zap,
  Globe,
  CreditCard,
  AlertTriangle,
  Instagram,
  Sparkles,
  ArrowRight,
  Bed,
  Car,
  DoorOpen,
  Shield,
  HeartPulse,
  Flame,
  Building2,
  Ticket,
  ShieldCheck,
} from "lucide-react";

import { destinations } from "./data/destinations.js";
import { agency } from "./data/trips.js";
import { getTripBySlug, getDefaultSlug } from "./lib/dataSource.js";
import { getSlugFromPath } from "./lib/routing.js";
import { TripProvider, useTrip } from "./lib/trip-context.jsx";
import { HighlightsSection } from "./lib/highlights-section.jsx";
import {
  saveTripForOffline,
  getTripFromOffline,
  isTripPreparedOffline,
  isOnline,
  setupOnlineStatusListeners,
} from "./lib/offline-storage.js";
import {
  OfflineReadyPrompt,
  OfflineGracefulFallback,
  OfflineStatusIndicator,
} from "./lib/offline-prompt.jsx";

/* =========================================================================
   UTILITÁRIOS
   ========================================================================= */

function mapsUrlFor(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function whatsappUrlFor(message) {
  return `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(message)}`;
}

const activityIcon = {
  flight: PlaneTakeoff,
  land: PlaneLanding,
  car: Car,
  hotel: DoorOpen,
  landmark: Landmark,
  food: Utensils,
  shop: ShoppingBag,
};

const emergencyIcon = {
  shield: Shield,
  heart: HeartPulse,
  flame: Flame,
};

/* =========================================================================
   PEÇAS DE INTERFACE REUTILIZÁVEIS
   ========================================================================= */

// Marca de assinatura da 3,2,1 GO! — três pontos em contagem regressiva,
// usados como eyebrow discreto antes de cada seção. É o único elemento
// decorativo recorrente do guia.
function BrandMark({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} aria-hidden="true">
      <span className="w-[5px] h-[5px] rounded-full bg-[#E05220]" />
      <span className="w-[4px] h-[4px] rounded-full bg-[#22A8C9]" />
      <span className="w-[3px] h-[3px] rounded-full bg-[#E05220]/40" />
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#22A8C9] mb-2">
      <BrandMark />
      {children}
    </p>
  );
}

function ScreenHeader({ title, onBack }) {
  return (
    <div className="sticky top-0 z-20 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-black/5">
      <div className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={onBack}
          aria-label="Voltar ao início"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-black/5 text-[#1F2937] active:scale-95 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22A8C9]"
        >
          <ChevronLeft size={18} strokeWidth={2.25} />
        </button>
        <h1 className="font-poppins font-bold text-[17px] text-[#1F2937]">{title}</h1>
      </div>
    </div>
  );
}

function PrimaryButton({ children, href, onClick, className = "" }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full bg-[#E05220] text-white font-poppins font-semibold text-[14px] px-6 py-3.5 shadow-[0_8px_20px_-6px_rgba(224,82,32,0.55)] active:scale-[0.98] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E05220] ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

function GhostLink({ children, href, onClick }) {
  const cls =
    "inline-flex items-center gap-1.5 text-[13px] font-poppins font-semibold text-[#22A8C9] active:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22A8C9] rounded";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-[22px] border border-black/[0.06] shadow-[0_2px_16px_-8px_rgba(31,41,55,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================================
   TELA · CAPA
   ========================================================================= */

function CoverScreen({ onStart }) {
  const { client, trip } = useTrip();
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#12181C]">
      <img
        src={trip.coverPhoto}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.72]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1620]/70 via-[#0F1620]/35 to-[#0F1620]/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#E05220]/25 via-transparent to-[#22A8C9]/15" />

      <div className="relative z-10 min-h-screen flex flex-col justify-between px-7 py-10 text-white">
        {/* ÁREA RESERVADA PARA O LOGO OFICIAL — substitua o círculo abaixo por
            <img src="/logo-321go.svg" alt="3,2,1 GO! Bárbara Costa" /> quando
            o arquivo oficial da marca estiver disponível. Mantido pequeno,
            elegante e discreto, conforme solicitado. */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 shrink-0 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center">
            <span className="font-poppins font-extrabold text-[10px] leading-none text-white tracking-tight">
              3·2·1
            </span>
          </div>
          <p className="font-poppins font-semibold text-[12px] tracking-[0.22em] uppercase text-white/85">
            GO! Bárbara Costa
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <h1 className="font-poppins font-extrabold text-[34px] leading-[1.08]">
              {client.names}
            </h1>
            <p className="font-poppins font-bold text-[22px] tracking-[0.02em] text-[#FFD9C7]">
              {trip.destination.toUpperCase()}
            </p>
            <p className="font-poppins font-light text-[14px] tracking-[0.12em] text-white/80">
              {trip.displayDates}
            </p>
          </div>

          <p className="font-poppins italic text-[15px] text-white/90 max-w-[280px]">
            "Sua viagem, organizada em um só lugar."
          </p>

          <PrimaryButton onClick={onStart} className="w-fit mt-2">
            Começar a viagem <ArrowRight size={16} strokeWidth={2.5} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TELA · INÍCIO
   ========================================================================= */

function QuickAccessCard({ icon: Icon, label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-[20px] border border-black/[0.06] p-4 flex flex-col gap-3 shadow-[0_2px_14px_-8px_rgba(31,41,55,0.12)] active:scale-[0.98] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22A8C9]"
    >
      <div className="w-10 h-10 rounded-full bg-[#22A8C9]/10 flex items-center justify-center text-[#22A8C9]">
        <Icon size={19} strokeWidth={2.1} />
      </div>
      <div>
        <p className="font-poppins font-semibold text-[14px] text-[#1F2937] leading-tight">{label}</p>
        <p className="font-poppins font-light text-[12px] text-[#6B7280] mt-0.5">{sub}</p>
      </div>
    </button>
  );
}

function HomeScreen({ navigate }) {
  const { client, flights, highlights, tip } = useTrip();
  const nextFlight = flights[0];
  return (
    <div className="px-5 pt-8 pb-6 space-y-8">
      <div>
        <h1 className="font-poppins font-extrabold text-[24px] text-[#1F2937]">
          Olá, {client.names}! <span aria-hidden>✨</span>
        </h1>
        <p className="font-poppins font-light text-[14px] text-[#6B7280] mt-1">
          Tudo o que você precisa para viajar está aqui.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
  <QuickAccessCard
    icon={Plane}
    label="Minha viagem"
    sub="Voos e hotéis"
    onClick={() => navigate("trip")}
  />

  <QuickAccessCard
    icon={Calendar}
    label="Meu roteiro"
    sub="Dia-a-dia"
    onClick={() => navigate("itinerary")}
  />

  <QuickAccessCard
    icon={Globe}
    label="Destino"
    sub="Informações úteis"
    onClick={() => navigate("destination")}
  />

  <QuickAccessCard
    icon={LifeBuoy}
    label="Preciso de ajuda"
    sub="Emergências"
    onClick={() => navigate("help")}
  />
</div>

      {highlights && <HighlightsSection highlights={highlights} />}
  

{tip && (
        <div>
          <SectionLabel>Dica da Babi</SectionLabel>
          <Card className="p-5 bg-[#22A8C9]/[0.06] border-[#22A8C9]/15 relative overflow-hidden">
            <span
              className="absolute -top-3 right-4 font-poppins font-extrabold text-[64px] leading-none text-[#22A8C9]/[0.08] select-none"
              aria-hidden="true"
            >
              "
            </span>
            <div className="relative flex gap-3">
              <Sparkles size={18} className="text-[#22A8C9] shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="font-poppins font-light text-[14px] text-[#374151] leading-relaxed">
                  {tip.text}
                </p>
                <p className="font-poppins italic font-medium text-[12px] text-[#22A8C9] mt-2">
                  — {tip.signature}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TELA · VIAGEM (VOOS + HOTÉIS + INFORMAÇÕES)
   ========================================================================= */

function FlightCard({ flight }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-poppins font-bold text-[13px] tracking-[0.06em] uppercase text-[#1F2937]">
          {flight.airline}
        </p>
        <span className="font-poppins font-semibold text-[12px] text-[#22A8C9] bg-[#22A8C9]/10 px-2.5 py-1 rounded-full">
          {flight.flightNumber}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="font-poppins font-extrabold text-[22px] text-[#1F2937] leading-none">
            {flight.departure.airport}
          </p>
          <p className="font-poppins font-light text-[12px] text-[#6B7280] mt-1">
            {flight.departure.city}
          </p>
          <p className="font-poppins font-semibold text-[13px] text-[#1F2937] mt-2">
            {flight.departure.time}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center px-1">
          <p className="font-poppins font-light text-[11px] text-[#9CA3AF] mb-1">{flight.duration}</p>
          <div className="w-full flex items-center gap-1">
            <span className="h-px flex-1 bg-black/10" />
            <Plane size={14} className="text-[#E05220]" strokeWidth={2} />
            <span className="h-px flex-1 bg-black/10" />
          </div>
          <p className="font-poppins font-light text-[11px] text-[#9CA3AF] mt-1">{flight.date}</p>
        </div>

        <div className="flex-1 text-right">
          <p className="font-poppins font-extrabold text-[22px] text-[#1F2937] leading-none">
            {flight.arrival.airport}
          </p>
          <p className="font-poppins font-light text-[12px] text-[#6B7280] mt-1">
            {flight.arrival.city}
          </p>
          <p className="font-poppins font-semibold text-[13px] text-[#1F2937] mt-2">
            {flight.arrival.time}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-black/[0.06] flex items-center gap-2 text-[#6B7280]">
        <Luggage size={15} strokeWidth={2} />
        <p className="font-poppins font-light text-[12.5px]">{flight.baggage}</p>
      </div>
    </Card>
  );
}

function HotelCard({ hotel }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={hotel.photo} alt={`Fachada do hotel ${hotel.name}`} className="w-full h-40 object-cover" />
        {hotel.isPlaceholderPhoto && (
          <span className="absolute bottom-2 left-2 bg-black/55 backdrop-blur-sm text-white text-[10px] font-poppins font-medium px-2.5 py-1 rounded-full">
            Foto ilustrativa — substituir pela foto real
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="font-poppins font-bold text-[16px] text-[#1F2937]">{hotel.name}</p>
        <p className="font-poppins font-light text-[13px] text-[#6B7280] mt-0.5">{hotel.city}</p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <p className="font-poppins font-semibold text-[10px] tracking-[0.1em] uppercase text-[#9CA3AF]">
              Check-in
            </p>
            <p className="font-poppins font-medium text-[13px] text-[#1F2937] mt-0.5">{hotel.checkIn}</p>
          </div>
          <div>
            <p className="font-poppins font-semibold text-[10px] tracking-[0.1em] uppercase text-[#9CA3AF]">
              Check-out
            </p>
            <p className="font-poppins font-medium text-[13px] text-[#1F2937] mt-0.5">{hotel.checkOut}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-4 text-[#6B7280]">
          <MapPin size={14} className="mt-0.5 shrink-0" strokeWidth={2} />
          <p className="font-poppins font-light text-[12.5px] leading-snug">{hotel.address}</p>
        </div>

       <div className="flex flex-wrap gap-2 mt-4">
  <GhostLink href={mapsUrlFor(hotel.mapQuery)}>
    <MapPin size={13} /> Como chegar
  </GhostLink>
        </div>
      </div>
    </Card>
  );
}

function InfoAccordionRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 border-b border-black/[0.05] last:border-0">
      <Icon size={16} className="text-[#22A8C9] mt-0.5 shrink-0" strokeWidth={2} />
      <div>
        <p className="font-poppins font-semibold text-[12px] text-[#6B7280]">{label}</p>
        <p className="font-poppins font-light text-[13.5px] text-[#1F2937] mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function TripScreen({ navigate }) {
  const { flights, hotels } = useTrip();

  return (
    <div>
      <ScreenHeader title="Sua viagem" onBack={() => navigate("home")} />
      <div className="px-5 py-6 space-y-9">
        <div>
          <SectionLabel>Seus voos</SectionLabel>
          <div className="space-y-3">
            {flights.map((f) => (
              <FlightCard key={f.id} flight={f} />
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>Suas hospedagens</SectionLabel>
          <div className="space-y-3">
            {hotels.map((h) => (
              <HotelCard key={h.id} hotel={h} />
            ))}
          </div>
        </div>

              </div>
    </div>
  );
}
/* =========================================================================
   TELA · DESTINO
   ========================================================================= */

function DestinationScreen({ navigate }) {
  const { importantInfo, highlights } = useTrip();

  return (
    <div>
      <ScreenHeader
        title="Destino"
        onBack={() => navigate("home")}
      />

      <div className="px-5 py-6 space-y-9">

        {/* VOCÊ VAI CONHECER */}
        {highlights && highlights.length > 0 && (
          <div>
            <SectionLabel>Você vai conhecer</SectionLabel>

            <div className="grid grid-cols-3 gap-3">
              {highlights.map((item) => (
                <Card
                  key={item.id}
                  className="min-h-[110px] flex flex-col items-center justify-center text-center px-2"
                >
                  <div className="text-[#22A8C9] mb-3">
                    <Globe size={24} strokeWidth={1.5} />
                  </div>

                  <p className="font-poppins font-semibold text-[13px] text-[#1F2937]">
                    {item.name}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* INFORMAÇÕES PRÁTICAS */}
        <div>
          <SectionLabel>Informações práticas</SectionLabel>

          <Card className="overflow-hidden">
            <div className="px-5 py-2">

              <InfoAccordionRow
                icon={CreditCard}
                label="Moeda"
                value={importantInfo.currency}
              />

              <InfoAccordionRow
                icon={Globe}
                label="Idioma"
                value={importantInfo.language}
              />

              <InfoAccordionRow
                icon={Clock}
                label="Fuso horário"
                value={importantInfo.timezone}
              />

              <InfoAccordionRow
                icon={Zap}
                label="Tomada"
                value={importantInfo.plug || "Confirme antes da viagem"}
              />

              <InfoAccordionRow
                icon={Wifi}
                label="Internet"
                value={importantInfo.internet}
              />

            </div>

            {importantInfo.notes && (
              <p className="px-5 pb-5 font-poppins font-light text-[11.5px] leading-relaxed text-[#9CA3AF]">
                {importantInfo.notes}
              </p>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   TELA · ROTEIRO
   ========================================================================= */

function DayBlock({ day, isOpen, onToggle }) {
  const activities = day.activities || [];

  const hasFlight = activities.some(
    (a) =>
      a.type === "flight" ||
      a.kind === "flight" ||
      a.title?.toLowerCase().includes("voo") ||
      a.title?.toLowerCase().includes("embarque")
  );

  const hasArrival = activities.some(
    (a) =>
      a.type === "arrival" ||
      a.kind === "arrival" ||
      a.title?.toLowerCase().includes("chegada")
  );

  const hasFood = activities.some(
    (a) =>
      a.type === "food" ||
      a.kind === "food" ||
      a.title?.toLowerCase().includes("almoço") ||
      a.title?.toLowerCase().includes("jantar") ||
      a.title?.toLowerCase().includes("café")
  );

  const hasShopping = activities.some(
    (a) =>
      a.type === "shopping" ||
      a.kind === "shopping" ||
      a.title?.toLowerCase().includes("mercado") ||
      a.title?.toLowerCase().includes("compras")
  );

  let dayType = "experience";
  let accent = "#22A8C9";
  let label = "EXPERIÊNCIAS";
  let Icon = MapPin;

  if (hasFlight) {
    dayType = "flight";
    accent = "#E05220";
    label = "DIA DE VIAGEM";
    Icon = Plane;
  } else if (hasArrival) {
    dayType = "arrival";
    accent = "#22A8C9";
    label = "CHEGADA";
    Icon = Navigation;
  } else if (hasFood) {
    dayType = "food";
    accent = "#E05220";
    label = "GASTRONOMIA";
    Icon = Utensils;
  } else if (hasShopping) {
    dayType = "shopping";
    accent = "#22A8C9";
    label = "DESCOBERTAS";
    Icon = ShoppingBag;
  }

const flightActivity = activities.find(
  (a) =>
    a.type === "flight" ||
    a.kind === "flight" ||
    a.title?.toLowerCase().includes("voo") ||
    a.title?.toLowerCase().includes("embarque")
);

const getFlightRoute = (activity) => {
  if (!activity) return { origin: "—", destination: "—" };

  if (activity.origin || activity.destination) {
    return {
      origin: activity.origin || "—",
      destination: activity.destination || "—",
    };
  }

  const text = `${activity.description || ""} ${activity.title || ""}`;
  const match = text.match(/\b([A-Z]{3})\s*[→-]\s*([A-Z]{3})\b/);

  if (match) {
    return {
      origin: match[1],
      destination: match[2],
    };
  }

  return {
    origin: "—",
    destination: "—",
  };
};

const flightRoute = getFlightRoute(flightActivity);

const mainActivity = activities[0];

    // ============================================================
  // ROTA DO VOO
  // Usa os campos estruturados quando existirem.
  // Caso contrário, extrai a rota da descrição (ex.: "GRU → LIM").
  // ============================================================
  
  return (
    <div
      className={`day-block day-${dayType} ${
        isOpen ? "day-open" : "day-closed"
      }`}
      style={{ "--day-accent": accent }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="day-header"
      >
        <div className="day-date">
          <strong>{day.date?.split(" ")[0] || day.date}</strong>
          <span>{day.date?.split(" ").slice(1).join(" ")}</span>
        </div>

        <div className="day-heading">
          <div className="day-label">
            <Icon size={14} strokeWidth={2.2} />
            {label}
          </div>

          <h3>{day.title}</h3>

          {day.subtitle && (
            <p>{day.subtitle}</p>
          )}
        </div>

        <div className="day-toggle">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="day-content">
          {/* =========================
              VOOS
          ========================== */}
          {dayType === "flight" && (
            <div className="flight-feature">
              <div className="flight-route">

                {/* ORIGEM */}
                <div>
                  <span>ORIGEM</span>
                  <strong>{flightRoute.origin}</strong>
                </div>

                {/* AVIÃO */}
                <div className="flight-line">
                  <Plane size={20} />
                </div>

                {/* DESTINO */}
                <div className="flight-destination">
                  <span>DESTINO</span>
                  <strong>{flightRoute.destination}</strong>
                </div>

              </div>

              <div className="flight-details">
                {activities.map((activity, index) => (
                  <div className="flight-detail" key={index}>

                    <span>{activity.time || "—"}</span>

                    <div>
                      <strong>{activity.title}</strong>

                      {activity.description && (
                        <p>{activity.description}</p>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================
              CHEGADA
          ========================== */}
          {dayType === "arrival" && (
            <div className="arrival-feature">
              {mainActivity && (
                <div className="arrival-highlight">
                  <div className="arrival-icon">
                    <Navigation size={22} />
                  </div>

                  <div>
                    <span>PRIMEIRO MOMENTO</span>
                    <h4>{mainActivity.title}</h4>

                    {mainActivity.description && (
                      <p>{mainActivity.description}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="arrival-list">
                {activities.slice(1).map((activity, index) => (
                  <div className="arrival-item" key={index}>
                    <div className="activity-time">
                      {activity.time || "—"}
                    </div>

                    <div>
                      <strong>{activity.title}</strong>

                      {activity.description && (
                        <p>{activity.description}</p>
                      )}

                      {activity.mapUrl && (
                        <a
                          href={activity.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MapPin size={13} />
                          Ver no mapa
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================
              EXPERIÊNCIAS
          ========================== */}
          {dayType === "experience" && (
            <div className="experience-feature">
              {mainActivity && (
                <div className="experience-main">

                  <div className="experience-main-content">
                    <span>
                      {mainActivity.time || "AO LONGO DO DIA"}
                    </span>

                    <h4>{mainActivity.title}</h4>

                    {mainActivity.description && (
                      <p>{mainActivity.description}</p>
                    )}

                    {mainActivity.mapUrl && (
                      <a
                        href={mainActivity.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MapPin size={13} />
                        Ver no mapa
                      </a>
                    )}
                  </div>
                </div>
              )}

              {activities.slice(1).length > 0 && (
                <div className="experience-secondary">
                  {activities.slice(1).map((activity, index) => (
                    <div className="experience-item" key={index}>
                      <span>
                        {activity.time || "—"}
                      </span>

                      <div>
                        <strong>{activity.title}</strong>

                        {activity.description && (
                          <p>{activity.description}</p>
                        )}

                        {activity.mapUrl && (
                          <a
                            href={activity.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MapPin size={13} />
                            Ver no mapa
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================
              GASTRONOMIA
          ========================== */}
          {dayType === "food" && (
            <div className="food-feature">
              {activities.map((activity, index) => (
                <div className="food-item" key={index}>
                  <div className="food-time">
                    {activity.time || "—"}
                  </div>

                  <div className="food-icon">
                    <Utensils size={17} />
                  </div>

                  <div className="food-content">
                    <h4>{activity.title}</h4>

                    {activity.description && (
                      <p>{activity.description}</p>
                    )}

                    {activity.mapUrl && (
                      <a
                        href={activity.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MapPin size={13} />
                        Ver no mapa
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =========================
              COMPRAS / DESCOBERTAS
          ========================== */}
          {dayType === "shopping" && (
            <div className="shopping-feature">
              {activities.map((activity, index) => (
                <div className="shopping-item" key={index}>
                  <div className="shopping-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <span>{activity.time || "AO LONGO DO DIA"}</span>
                    <h4>{activity.title}</h4>

                    {activity.description && (
                      <p>{activity.description}</p>
                    )}

                    {activity.mapUrl && (
                      <a
                        href={activity.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MapPin size={13} />
                        Ver no mapa
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

function ItineraryScreen({ navigate }) {
  const { itinerary } = useTrip();
  const [openDay, setOpenDay] = useState(itinerary[0]?.id ?? null);

  return (
    <div>
      <ScreenHeader title="Seu roteiro" onBack={() => navigate("home")} />
      <div className="px-5 py-6 space-y-3">
        {itinerary.map((day) => (
          <DayBlock
            key={day.id}
            day={day}
            isOpen={openDay === day.id}
            onToggle={() => setOpenDay(openDay === day.id ? null : day.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TELA · AJUDA
   ========================================================================= */

function HelpScreen({ navigate }) {
  const {
    emergencyContacts = [],
    embassy = null,
  } = useTrip();
  return (
    <div>
      <ScreenHeader title="Precisa de ajuda?" onBack={() => navigate("home")} />
      <div className="px-5 py-6 space-y-8">
        <Card className="p-5 bg-[#E05220]/[0.06] border-[#E05220]/15">
          <p className="font-poppins font-semibold text-[14px] text-[#1F2937] mb-1">Fale com a Babi</p>
          <p className="font-poppins font-light text-[13px] text-[#6B7280] mb-4 leading-relaxed">
            Qualquer imprevisto na viagem, é só chamar.
          </p>
          <PrimaryButton
            href={whatsappUrlFor("Olá, Babi! Estou na minha viagem e preciso de ajuda.")}
            className="w-full"
          >
            <MessageCircle size={16} strokeWidth={2.2} /> Falar com a Babi
          </PrimaryButton>
        </Card>

        <div>
          <SectionLabel>Emergências</SectionLabel>
          <div className="space-y-2.5">
            {emergencyContacts.map((c) => {
              const Icon = emergencyIcon[c.icon] || Shield;
              return (
                <Card key={c.label} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#22A8C9]/10 flex items-center justify-center text-[#22A8C9] shrink-0">
                    <Icon size={17} strokeWidth={2} />
                  </div>
                  <p className="font-poppins font-semibold text-[14px] text-[#1F2937] flex-1">{c.label}</p>
                  <a
                    href={`tel:${c.phone}`}
                    className="font-poppins font-bold text-[14px] text-[#E05220] flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E05220] rounded px-1"
                  >
                    <Phone size={13} /> {c.phone}
                  </a>
                </Card>
              );
            })}

        {embassy && (
  <Card className="p-4 flex items-center gap-4">
    <div className="w-10 h-10 rounded-full bg-[#22A8C9]/10 flex items-center justify-center text-[#22A8C9] shrink-0">
      <Building2 size={17} strokeWidth={2} />
    </div>

    <p className="font-poppins font-semibold text-[14px] text-[#1F2937] flex-1">
      {embassy.label}
    </p>

    <a
      href={embassy?.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="font-poppins font-medium text-[12px] text-[#22A8C9] flex items-center gap-1"
    >
      Ver contato <ExternalLink size={12} />
    </a>
  </Card>
)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   NAVEGAÇÃO INFERIOR
   ========================================================================= */

function BottomNav({ current, navigate }) {
const items = [
  { key: "home", label: "Início", icon: HomeIcon },
  { key: "trip", label: "Viagem", icon: Plane },
  { key: "itinerary", label: "Roteiro", icon: Calendar },
  { key: "destination", label: "Destino", icon: Globe },
  { key: "help", label: "Ajuda", icon: LifeBuoy },
];

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-30 flex justify-center"
    >
      <div className="w-full max-w-[480px] bg-white/95 backdrop-blur-md border-t border-black/[0.06] px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex items-stretch">
        {items.map((item) => {
          const Icon = item.icon;
          const active = current === item.key;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              aria-current={active ? "page" : undefined}
              className="flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22A8C9]"
            >
              <Icon
                size={20}
                strokeWidth={active ? 2.4 : 1.9}
                className={active ? "text-[#E05220]" : "text-[#9CA3AF]"}
              />
              <span
                className={`font-poppins text-[10px] ${
                  active ? "font-semibold text-[#E05220]" : "font-light text-[#9CA3AF]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* =========================================================================
   RODAPÉ
   ========================================================================= */

// Rodapé completo — usado apenas na Home, com assinatura e contatos da marca.
function Footer() {
  return (
    <footer className="px-5 pt-2 pb-28 text-center">
      <img
  src="/logo.png"
  alt="3,2,1 GO! Bárbara Costa"
  className="mx-auto mb-3 h-12 w-auto object-contain"
/>
      <p className="font-poppins font-light text-[12px] text-[#9CA3AF] mt-1">{agency.tagline}</p>
      <div className="flex items-center justify-center gap-4 mt-3">
        <a
          href={agency.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-poppins font-medium text-[#22A8C9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22A8C9] rounded px-1"
        >
          <Instagram size={13} /> Instagram
        </a>
        <a
          href={whatsappUrlFor("Olá, Babi!")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-poppins font-medium text-[#22A8C9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22A8C9] rounded px-1"
        >
          <MessageCircle size={13} /> WhatsApp
        </a>
      </div>
    </footer>
  );
}

// Rodapé discreto — usado nas páginas internas (Viagem, Roteiro, Ajuda),
// para reduzir a presença repetida da marca.
function MinimalFooter() {
  return (
    <footer className="px-5 pt-3 pb-28 text-center">
      <img
        src="/logo.png"
        alt="3,2,1 GO! Bárbara Costa"
        className="mx-auto h-10 w-auto object-contain opacity-75"
      />
    </footer>
  );
}

/* =========================================================================
   ESTADOS DE CARREGAMENTO / LINK INVÁLIDO
   (mesma linguagem visual do restante do app — nunca uma tela branca)
   ========================================================================= */

function LoadingScreen() {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] flex flex-col items-center justify-center gap-3">
      <BrandMark className="scale-150" />
      <p className="font-poppins font-light text-[13px] text-[#9CA3AF]">Carregando sua viagem…</p>
    </div>
  );
}

function TripNotFoundScreen() {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] flex flex-col items-center justify-center px-8 text-center gap-4">
      <BrandMark className="scale-150" />
      <h1 className="font-poppins font-bold text-[18px] text-[#1F2937]">
        Não encontramos essa viagem
      </h1>
      <p className="font-poppins font-light text-[13.5px] text-[#6B7280] max-w-[280px]">
        O link pode estar incompleto ou a viagem ainda não foi publicada. Fale com a Babi para
        confirmar o link correto.
      </p>
      <PrimaryButton href={whatsappUrlFor("Olá, Babi! Não consegui acessar o link da minha viagem.")}>
        <MessageCircle size={16} strokeWidth={2.2} /> Falar com a Babi
      </PrimaryButton>
    </div>
  );
}

/* =========================================================================
   APP
   ========================================================================= */

export default function App() {
  const [screen, setScreen] = useState("cover");
  const [status, setStatus] = useState("loading"); // loading | ready | not-found | offline-not-prepared
  const [activeTrip, setActiveTrip] = useState(null);
  const [tripSlug, setTripSlug] = useState(null);
  const [isOfflinePrepared, setIsOfflinePrepared] = useState(false);
  const [showOfflinePrompt, setShowOfflinePrompt] = useState(false);

  // Carregar trip quando componente monta
  useEffect(() => {
    let cancelled = false;
    const slug = getSlugFromPath() || getDefaultSlug();
    setTripSlug(slug);
    setIsOfflinePrepared(isTripPreparedOffline(slug));

    getTripBySlug(slug)
      .then((trip) => {
        if (cancelled) return;
        if (trip) {
          setActiveTrip(trip);
          setStatus("ready");
          // Preparar automaticamente a viagem enquanto há conexão.
          // Assim, o cliente não precisa lembrar de clicar em “Salvar”
          // para ter o guia disponível offline.
          if (isOnline() && !isTripPreparedOffline(slug)) {
            const saved = saveTripForOffline(slug, trip);
            setIsOfflinePrepared(saved);
          }
        } else {
          // Se não encontrou online, tenta offline
          const offlineTrip = getTripFromOffline(slug);
          if (offlineTrip) {
            setActiveTrip(offlineTrip);
            setStatus("ready");
            setIsOfflinePrepared(true);
          } else if (isOnline()) {
            // Online e não encontrou em lugar nenhum
            setStatus("not-found");
          } else {
            // Offline e não tem dados preparados
            setStatus("offline-not-prepared");
          }
        }
      })
      .catch(() => {
        // Erro de rede — tenta offline
        const offlineTrip = getTripFromOffline(slug);
        if (offlineTrip) {
          setActiveTrip(offlineTrip);
          setStatus("ready");
          setIsOfflinePrepared(true);
        } else if (!isOnline()) {
          setStatus("offline-not-prepared");
        } else {
          setStatus("not-found");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Salvar dados quando online e se o user concordar
  const handlePrepareOffline = async () => {
    if (activeTrip && tripSlug && isOnline()) {
      const success = saveTripForOffline(tripSlug, activeTrip);
      if (success) {
        setIsOfflinePrepared(true);
        setShowOfflinePrompt(false);
      }
      return success;
    }
    return false;
  };

  // Escutar mudanças de online/offline
  useEffect(() => {
    setupOnlineStatusListeners((online) => {
      console.log("[App] Online status changed:", online);
      // Quando voltar online, resetar e recarregar
      if (online && status === "offline-not-prepared") {
        window.location.reload();
      }
    });
  }, [status]);

  const navigate = (key) => {
    setScreen(key);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  };

  if (status === "loading") return <LoadingScreen />;
  if (status === "not-found") return <TripNotFoundScreen />;
  if (status === "offline-not-prepared") return <OfflineGracefulFallback />;

  return (
    <TripProvider trip={activeTrip}>
      <div className="min-h-screen w-full bg-[#EDEBE6] flex justify-center">
        <div className="font-poppins w-full max-w-[480px] bg-[#FAF8F5] min-h-screen relative shadow-[0_0_60px_-15px_rgba(0,0,0,0.15)]">
          {/* Indicador de offline (discret) */}
          {!isOnline() && <OfflineStatusIndicator />}

          {screen === "cover" && <CoverScreen onStart={() => navigate("home")} />}

          {screen !== "cover" && (
            <>
              {screen === "home" && <HomeScreen navigate={navigate} />}
              {screen === "trip" && <TripScreen navigate={navigate} />}
              {screen === "itinerary" && <ItineraryScreen navigate={navigate} />}
              {screen === "destination" && <DestinationScreen navigate={navigate} />}
              {screen === "help" && <HelpScreen navigate={navigate} />}
              {screen === "home" ? <Footer /> : <MinimalFooter />}
              <BottomNav current={screen} navigate={navigate} />
            </>
          )}

          {/* Prompt de preparação offline (discreto, apenas na Home) */}
          {showOfflinePrompt && screen === "home" && (
            <OfflineReadyPrompt
              tripSlug={tripSlug}
              isPrepared={isOfflinePrepared}
              onPrepare={handlePrepareOffline}
            />
          )}
        </div>
      </div>
    </TripProvider>
  );
}
