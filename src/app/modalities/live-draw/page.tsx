"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/modules/auth/hooks/useGetUser";
import { DrawCard } from "@/modules/modalities/live-draw/components/host/DrawCard";
import { WinnerModal } from "@/modules/modalities/live-draw/components/host/WinnerModal";
import { CountdownTimer } from "@/modules/modalities/live-draw/components/host/CountdownTimer";
import { useLiveDrawHost } from "@/modules/modalities/live-draw/hooks/useLiveDrawHost";
import { QRCodeCanvas } from "qrcode.react";


export default function LiveDrawPage() {
  const [countdownOpen, setCountdownOpen] = useState(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [winner, setWinner] = useState<any>(null);
  const { user, loading: userLoading } = useGetUser();
  const router = useRouter();
  // Mantener loader visible durante la redirección para evitar vista vacía
  const [redirecting, setRedirecting] = useState(false);
  const {
    draw,
    drawId,
    loading,
    error,
    restored,
    name,
    setName,
    localError,
    handleCreate,
    startDraw,
    cancelDraw,
    finishDraw,
    winnersCount,
    setWinnersCount,
    resetWinnersCount,
    pickMultipleRandomParticipants,
    removeParticipantFromDraw,
    saveWinners,
    removeMultipleParticipants,
  } = useLiveDrawHost(user?.id);

  useEffect(() => {
    if (!userLoading && !user && !redirecting) {
      setRedirecting(true);
      // Opcional: prefetch para acelerar el montaje de login
      try { (router as any).prefetch && (router as any).prefetch("/login"); } catch {}
      router.replace("/login");
    }
  }, [user, userLoading, redirecting, router]);

  // Mostrar siempre el loader mientras se verifica usuario o durante la redirección
  if (userLoading || redirecting || !user) {
    return (
      <main className="h-[calc(100vh-80px)] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <span className="text-gray-400">Verificando usuario...</span>
          </div>
        </section>
      </main>
    );
  }

  const handleRemoveParticipant = async (identity: { browserId?: string; name?: string }) => {
    await removeParticipantFromDraw(identity);
  };

  return (
    <main className="h-[calc(100vh-80px)] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-6 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-4 sm:gap-6">
          {/* Header Section - Reducido */}
          <div className="w-full max-w-4xl flex-shrink-0">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                Sorteo en{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Vivo
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto">
                Crea sorteos interactivos y comparte el PIN con tus participantes
              </p>
            </div>
          </div>

        {/* Main Content */}
        {!restored ? (
          <div className="w-full max-w-2xl flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50">
              <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              <span className="text-gray-400">Restaurando tu sorteo...</span>
            </div>
          </div>
        ) : (drawId && !draw) ? (
          <div className="w-full max-w-2xl flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50">
              <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              <span className="text-gray-400">Cargando sorteo...</span>
            </div>
          </div>
        ) : !draw ? (
          <div className="w-full max-w-3xl flex-shrink-0">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🎉</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 text-center">
                  Crear Nuevo Sorteo
                </h2>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center max-w-2xl">
                  Dale un nombre a tu sorteo para obtener el PIN y compartirlo con tus participantes
                </p>
                
                <div className="w-full max-w-xl">
                  <input
                    type="text"
                    placeholder="Ej: Sorteo de Navidad 2025"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-neutral-600/50 bg-neutral-900/50 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition text-base sm:text-lg font-medium"
                    style={{ marginBottom: '0.5rem' }}
                  />
                  
                  <button
                    onClick={handleCreate}
                    disabled={loading || !restored || !name.trim()}
                    className="w-full mt-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creando sorteo...
                      </>
                    ) : (
                      <>
                        <span className="text-xl sm:text-2xl">🚀</span>
                        Crear sorteo
                      </>
                    )}
                  </button>
                  
                  {(localError || error) && (
                    <div className="mt-2 p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                      <span className="text-red-400 text-sm">{localError || error}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl flex-shrink-0">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 max-w-2xl mx-auto">
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}
            <DrawCard
              draw={draw}
              participants={draw.participants}
              loading={loading}
              emptyMessage="Aún no hay participantes"
              winnersCount={winnersCount}
              onWinnersCountChange={setWinnersCount}
              onRunDraw={async () => {
                await startDraw();
              }}
              onCancel={async () => {
                await cancelDraw();
              }}
              onPickWinner={async () => {
                // Seleccionar múltiples ganadores usando el hook
                const selectedWinners = pickMultipleRandomParticipants(winnersCount);
                if (selectedWinners.length === 0) return;
                
                setWinner(selectedWinners);
                
                // Mostrar el temporizador primero
                setCountdownOpen(true);
                
                // NO guardar los ganadores aquí - se guardará después del temporizador
              }}
              onFinish={async () => {
                await finishDraw();
              }}
              onRemoveParticipant={handleRemoveParticipant}
            />
            
            {/* Countdown Timer */}
            <CountdownTimer
              open={countdownOpen}
              onComplete={async () => {
                setCountdownOpen(false);
                setWinnerModalOpen(true);
                // Guardar los ganadores en la base de datos DESPUÉS del temporizador
                if (winner) {
                  await saveWinners(Array.isArray(winner) ? winner : [winner]);
                }
              }}
            />
            
            {/* Winner Modal */}
            <WinnerModal
              open={winnerModalOpen}
              winnerName={Array.isArray(winner) 
                ? winner.map(w => (typeof w?.name === 'string' && w.name.trim().length > 0) ? w.name : 'Sin nombre').join(", ")
                : (typeof winner?.name === 'string' && winner.name.trim().length > 0) ? winner.name : 'Sin nombre'
              }
              onKeep={async () => {
                setWinnerModalOpen(false);
                setWinner(null);
                resetWinnersCount();
              }}
              onRemove={async () => {
                setWinnerModalOpen(false);
                if (winner) {
                  // Si es un array de ganadores, eliminar todos usando la función del hook
                  if (Array.isArray(winner)) {
                    await removeMultipleParticipants(winner);
                  } else {
                    // Si es un solo ganador
                    await removeParticipantFromDraw({
                      browserId: winner.browserId,
                      name: winner.name,
                    });
                  }
                }
                setWinner(null);
                resetWinnersCount();
              }}
              onClose={() => {
                setWinnerModalOpen(false);
                setWinner(null);
                resetWinnersCount();
              }}
            />
          </div>
        )}
        </div>
      </section>
    </main>
  );
}
