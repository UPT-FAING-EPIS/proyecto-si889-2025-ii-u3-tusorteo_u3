"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DrawCard } from "@/modules/modalities/live-draw/components/participant/DrawCard";
import { ParticipantWinnerModal } from "@/modules/modalities/live-draw/components/participant/WinnerModal";
import { useLiveDrawParticipant } from "@/modules/modalities/live-draw/hooks/useLiveDrawParticipant";
import { useLiveDraw } from "@/modules/modalities/live-draw/hooks/useLiveDraw";

export default function JoinDrawByPinPage() {
  const params = useParams();
  const router = useRouter();
  const pinParam = typeof params?.pin === "string" ? params.pin : Array.isArray(params?.pin) ? params.pin[0] : "";
  const pinFromUrl = useMemo(() => {
    const n = parseInt((pinParam || "").trim(), 10);
    return Number.isFinite(n) ? n : null;
  }, [pinParam]);

  // Validar que el PIN exista al cargar; si no existe, redirigir a la vista general
  const { joinByPin } = useLiveDraw();
  const [pinCheckStatus, setPinCheckStatus] = useState<"checking" | "ok" | "invalid">("checking");
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!pinFromUrl) {
        if (!cancelled) {
          setPinCheckStatus("invalid");
          router.replace("/modalities/join-live-draw");
        }
        return;
      }
      const exists = await joinByPin(pinFromUrl);
      if (cancelled) return;
      if (!exists) {
        setPinCheckStatus("invalid");
        router.replace("/modalities/join-live-draw");
      } else {
        setPinCheckStatus("ok");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pinFromUrl, joinByPin, router]);

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
    canShowParticipants,
  } = useLiveDrawParticipant();

  // Estado local para el formulario (solo nombre)
  const [name, setName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Resetear formulario cuando el usuario deja de estar unido
  useEffect(() => {
    if (!joined) {
      setName("");
      setFormError(null);
    }
  }, [joined]);

  // Mostrar gráfico de carga mientras se valida o se redirige
  if (pinCheckStatus !== "ok") {
    return (
      <main className="h-[calc(100vh-80px)] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <span className="text-gray-400">{pinCheckStatus === "checking" ? "Validando PIN..." : "Redirigiendo..."}</span>
          </div>
        </section>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!pinFromUrl) {
      setFormError("PIN de la URL inválido");
      return;
    }
    const cleanName = name.trim();
    if (cleanName.length < 3) {
      setFormError("Ingresa un nombre de al menos 3 caracteres");
      return;
    }
    await handleJoin(pinFromUrl, cleanName);
  };

  const onLeave = async () => {
    const success = await handleLeave();
    if (success) {
      setName("");
      setFormError(null);
    }
  };

  return (
    <main className="h-[calc(100vh-80px)] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-6 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-4 sm:gap-6">
          {/* Header */}
          <div className="w-full max-w-4xl flex-shrink-0">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                Unirse a <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Sorteo</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto">
                Ingresa tu nombre para participar. El PIN viene en la URL.
              </p>
            </div>
          </div>

          {/* Contenido principal */}
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
                    Solo ingresa tu nombre. El PIN ya viene en el enlace.
                  </p>

                  <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-3 sm:space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Tu Nombre
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-neutral-600/50 bg-neutral-900/50 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition text-base sm:text-lg font-medium"
                        disabled={loading}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !restored}
                      className="w-full mt-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                    {!pinFromUrl && (
                      <div className="mt-2 p-3 sm:p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                        <span className="text-yellow-400 text-sm">El enlace no contiene un PIN válido.</span>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          ) : draw && canShowParticipants ? (
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