import React, { useState, useEffect } from "react";
import { Download, CheckCircle2 } from "lucide-react";

/**
 * OfflineReadyPrompt
 * Mostra uma pequena sugestão (não intrusiva) para preparar a viagem para offline
 * Aparece apenas uma vez quando:
 * 1. Cliente está online
 * 2. Nunca preparou a viagem antes
 * 3. Já viu a viagem uma vez (tem dados em memória para salvar)
 */
export function OfflineReadyPrompt({ tripSlug, isPrepared, onPrepare }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Mostrar prompt discreto se não estiver preparado e estiver online
    if (!isPrepared && navigator.onLine && !isDone) {
      // Delay pequeno para não ser intrusivo na primeira carga
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPrepared, isDone]);

  const handlePrepare = async () => {
    if (onPrepare) {
      const success = await onPrepare();
      if (success) {
        setIsDone(true);
        // Manter visível por um momento para mostrar sucesso
        setTimeout(() => {
          setIsVisible(false);
        }, 1500);
      }
    }
  };

  if (!isVisible) return null;

  if (isDone) {
    return (
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-[#22A8C9] shadow-[0_4px_16px_rgba(34,168,201,0.2)]">
          <CheckCircle2 size={16} className="text-[#22A8C9]" strokeWidth={2.5} />
          <p className="font-poppins font-medium text-[13px] text-[#22A8C9]">
            ✓ Guia disponível offline
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-sm px-5">
      <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#E05220]/[0.08] border border-[#E05220]/20 shadow-[0_2px_12px_rgba(224,82,32,0.1)]">
        <Download size={16} className="text-[#E05220] shrink-0" strokeWidth={2.2} />
        <div className="flex-1 min-w-0">
          <p className="font-poppins font-medium text-[12px] text-[#1F2937]">
            Preparar sua viagem
          </p>
          <p className="font-poppins font-light text-[10px] text-[#6B7280]">
            Salve as informações para consultar mesmo sem internet
          </p>
        </div>
        <button
          onClick={handlePrepare}
          className="shrink-0 font-poppins font-semibold text-[11px] text-[#E05220] hover:opacity-70 transition-opacity px-3 py-1 rounded-full active:scale-95"
        >
          Salvar
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 font-poppins font-light text-[14px] text-[#9CA3AF] hover:opacity-70 transition-opacity"
          aria-label="Fechar sugestão"
        >
          ×
        </button>
      </div>
    </div>
  );
}

/**
 * OfflineGracefulFallback
 * Mostra quando o cliente está offline e nunca preparou a viagem
 */
export function OfflineGracefulFallback() {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] flex flex-col items-center justify-center px-8 text-center gap-4">
      <div className="inline-flex items-center gap-[3px]" aria-hidden="true">
        <span className="w-[5px] h-[5px] rounded-full bg-[#E05220]" />
        <span className="w-[4px] h-[4px] rounded-full bg-[#22A8C9]" />
        <span className="w-[3px] h-[3px] rounded-full bg-[#E05220]/40" />
      </div>
      <h1 className="font-poppins font-bold text-[18px] text-[#1F2937]">
        Seu guia ainda precisa ser preparado
      </h1>
      <p className="font-poppins font-light text-[13.5px] text-[#6B7280] max-w-[280px]">
        Abra o guia uma vez com conexão de internet para salvar as informações
        essenciais da sua viagem. Depois, você poderá consultar mesmo sem
        internet.
      </p>
      <div className="mt-6 pt-6 border-t border-black/5 w-full">
        <p className="font-poppins font-light text-[11px] text-[#9CA3AF]">
          3,2,1 GO! Bárbara Costa
        </p>
      </div>
    </div>
  );
}

/**
 * OfflineStatusIndicator
 * Pequeno indicador visual de status offline (opcional)
 * Pode ser usado na barra superior ou em qualquer lugar
 */
export function OfflineStatusIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-[#9CA3AF]/10 border-b border-[#9CA3AF]/20 px-5 py-2 text-center">
      <p className="font-poppins font-light text-[11px] text-[#6B7280]">
        Modo offline — consulte as informações já carregadas
      </p>
    </div>
  );
}
