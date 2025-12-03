"use client";
import { useEffect, useState } from "react";
import { DrawCard } from "@/modules/modalities/live-draw/components/participant/DrawCard";
import { ParticipantWinnerModal } from "@/modules/modalities/live-draw/components/participant/WinnerModal";
import { useLiveDrawParticipant } from "@/modules/modalities/live-draw/hooks/useLiveDrawParticipant";

export default function JoinDrawPage() {
  const {
    draw,
    loading,
    error,
    joined,
    restored,
    joinedName,
    localError,
    handleJoin,
    handleLeave,
    winnerOpen,
    didWin,
    closeWinnerModal,
  } = useLiveDrawParticipant();

  // Estado local para el formulario
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Resetear formulario cuando el usuario deja de estar unido (por ejemplo, si el host lo elimina)
  useEffect(() => {
    if (!joined) {
      setPin("");
      setName("");
      setFormError(null);
    }
  }, [joined]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const pinValue = parseInt(pin.trim(), 10);
    if (isNaN(pinValue) || pin.trim().length !== 6) {
      setFormError("El PIN debe ser de 6 dígitos");
      return;
    }

    if (!name.trim()) {
      setFormError("Ingresa tu nombre para participar");
      return;
    }

    await handleJoin(pinValue, name.trim());
  };

  const onLeave = async () => {
    const success = await handleLeave();
    if (success) {
      setPin("");
      setName("");
      setFormError(null);
    }
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
          {/* Header Section */}
          <div className="w-full max-w-4xl flex-shrink-0">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                Unirse a{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Sorteo
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto">
                Utiliza el PIN que te compartió el organizador para participar
              </p>
            </div>
          </div>

          {/* Main Content */}
          {!restored ? (
            <div className="w-full max-w-2xl flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <span className="text-gray-400">Restaurando sorteo...</span>
              </div>
            </div>
          ) : !joined ? (
            <div className="w-full max-w-3xl flex-shrink-0">
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-2xl">
                <div className="flex flex-col items-center">
                  <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🎫</div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 text-center">
                    Únete al Sorteo
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center max-w-2xl">
                    Ingresa el PIN de 6 dígitos y tu nombre para participar
                  </p>
                  
                  <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-3 sm:space-y-4">
                  <div>
                    <label htmlFor="pin" className="block text-sm font-medium text-gray-300 mb-2">
                      PIN del Sorteo
                    </label>
                    <input
                      id="pin"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Ej: 123456"
                      value={pin}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPin(value);
                      }}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-neutral-600/50 bg-neutral-900/50 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition text-base sm:text-lg font-medium tracking-widest text-center"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Tu Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-neutral-600/50 bg-neutral-900/50 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition text-base sm:text-lg font-medium"
                      disabled={loading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !restored}
                    className="w-full mt-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Uniéndose...
                      </>
                    ) : (
                      <>
                        <span className="text-xl sm:text-2xl">🎉</span>
                        Unirse al sorteo
                      </>
                    )}
                  </button>
                  
                  {(formError || localError || error) && (
                    <div className="mt-2 p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                      <span className="text-red-400 text-sm">{formError || localError || error}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        ) : draw ? (
          <div className="w-full max-w-7xl flex-shrink-0">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 max-w-2xl mx-auto">
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}
            <DrawCard
              draw={draw}
              joinedName={joinedName}
              participants={draw.participants}
              loading={loading}
              onLeave={onLeave}
            />
            <ParticipantWinnerModal
              open={winnerOpen}
              winners={didWin && joinedName ? [joinedName] : []}
              didWin={didWin}
              onClose={closeWinnerModal}
            />
          </div>
        ) : null}
        </div>
      </section>
    </main>
  );
}
