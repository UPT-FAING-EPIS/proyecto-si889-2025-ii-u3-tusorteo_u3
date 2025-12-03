"use client";
import { useListDraw } from "@/modules/modalities/list-draw/hooks/useListDraw";
import { CountdownTimer } from "@/modules/modalities/list-draw/components/CountdownTimer";
import { WinnerModal } from "@/modules/modalities/list-draw/components/WinnerModal";

export default function ListDrawPage() {

  const {
    title,
    setTitle,
    participants,
    setParticipants,
    error,
    participantCount,
    countdownOpen,
    winnerModalOpen,
    winner,
    numberOfWinners,
    setNumberOfWinners,
    countdownDuration,
    setCountdownDuration,
    getParticipantsArray,
    handleImportFile,
    handleStartDraw,
    handleCountdownComplete,
    handleCloseWinnerModal,
    handleNewDraw,
  } = useListDraw();

  

  return (
    <main className="h-[calc(100vh-80px)] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-3 sm:py-4 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-3 sm:gap-4">
          {/* Header Section */}
          <div className="w-full max-w-4xl flex-shrink-0">
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-1 leading-tight">
                Sorteo por{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Lista
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-xl mx-auto">
                Escoge un ganador al azar de una lista de nombres con nuestra App
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-2xl flex-shrink-0">
            <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📋</div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 text-center">
                  Crear Sorteo por Lista
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 text-center max-w-2xl">
                  Ingresa el título y la lista de participantes para comenzar
                </p>

                <div className="w-full max-w-xl space-y-2 sm:space-y-3">
                  {/* Campo de título */}
                  <div>
                    <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                      Título del Sorteo
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="Ej: Sorteo de Regalos Navideños"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-neutral-600/50 bg-neutral-900/50 text-white text-sm sm:text-base placeholder:text-gray-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition font-medium"
                    />
                  </div>

                  {/* Campo de participantes */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="participants" className="block text-xs sm:text-sm font-medium text-gray-300">
                        Participantes
                      </label>
                      <span className="text-xs sm:text-sm font-bold text-yellow-400">
                        {participantCount} {participantCount === 1 ? 'participante' : 'participantes'}
                      </span>
                    </div>
                    <textarea
                      id="participants"
                      value={participants}
                      onChange={(e) => setParticipants(e.target.value)}
                      rows={5}
                      placeholder="Ingresa un nombre por línea&#10;Juan Pérez&#10;María García&#10;Pedro López"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-neutral-600/50 bg-neutral-900/50 text-white text-sm sm:text-base placeholder:text-gray-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition font-medium resize-none custom-scrollbar"
                    />
                  </div>

                  {/* Configuración del sorteo en una fila */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1.5fr] gap-2 sm:gap-3">
                    {/* Cantidad de ganadores */}
                    <div className="relative">
                      <label htmlFor="numberOfWinners" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                        Ganadores
                      </label>
                      <div className="relative">
                        <input
                          id="numberOfWinners"
                          type="number"
                          min="1"
                          max="10"
                          value={numberOfWinners}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                              setNumberOfWinners(1);
                            } else {
                              setNumberOfWinners(Math.max(1, Math.min(10, parseInt(value))));
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setNumberOfWinners(Math.min(10, numberOfWinners + 1));
                            } else if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setNumberOfWinners(Math.max(1, numberOfWinners - 1));
                            }
                          }}
                          className="w-full pl-3 pr-8 sm:pl-4 py-2.5 sm:py-3 rounded-xl border-2 border-neutral-600/50 bg-neutral-900/50 text-white text-sm sm:text-base font-bold text-center focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition-all hover:border-yellow-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <div className="absolute inset-y-0 right-2 flex flex-col justify-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => setNumberOfWinners(Math.min(10, numberOfWinners + 1))}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors p-0.5 hover:bg-yellow-500/10 rounded"
                            aria-label="Incrementar"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => setNumberOfWinners(Math.max(1, numberOfWinners - 1))}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors p-0.5 hover:bg-yellow-500/10 rounded"
                            aria-label="Decrementar"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">1-10</p>
                    </div>

                    {/* Duración del countdown */}
                    <div className="relative">
                      <label htmlFor="countdownDuration" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                        Countdown
                      </label>
                      <div className="relative">
                        <input
                          id="countdownDuration"
                          type="number"
                          min="3"
                          max="10"
                          value={countdownDuration}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                              setCountdownDuration(3);
                            } else {
                              setCountdownDuration(Math.max(3, Math.min(10, parseInt(value))));
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setCountdownDuration(Math.min(10, countdownDuration + 1));
                            } else if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setCountdownDuration(Math.max(3, countdownDuration - 1));
                            }
                          }}
                          className="w-full pl-3 pr-8 sm:pl-4 py-2.5 sm:py-3 rounded-xl border-2 border-neutral-600/50 bg-neutral-900/50 text-white text-sm sm:text-base font-bold text-center focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all hover:border-orange-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <div className="absolute inset-y-0 right-2 flex flex-col justify-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => setCountdownDuration(Math.min(10, countdownDuration + 1))}
                            className="text-orange-400 hover:text-orange-300 transition-colors p-0.5 hover:bg-orange-500/10 rounded"
                            aria-label="Incrementar"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCountdownDuration(Math.max(3, countdownDuration - 1))}
                            className="text-orange-400 hover:text-orange-300 transition-colors p-0.5 hover:bg-orange-500/10 rounded"
                            aria-label="Decrementar"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">3-10 seg</p>
                    </div>

                    {/* Botón de importar mejorado */}
                    <div className="relative">
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5">
                        Importar Archivo
                      </label>
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center h-[42px] sm:h-[48px] px-4 py-2 bg-gradient-to-br from-neutral-700/50 to-neutral-800/50 hover:from-neutral-600/50 hover:to-neutral-700/50 border-2 border-neutral-600/50 hover:border-yellow-500/50 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] group"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors">
                            Seleccionar Archivo
                          </span>
                        </div>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".txt,.csv"
                        onChange={handleImportFile}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500 mt-1 text-center">.txt / .csv</p>
                    </div>
                  </div>

                  {/* Mensaje de error */}
                  {error && (
                    <div className="p-2.5 sm:p-3 rounded-lg bg-red-500/10 border border-red-500/30 animate-in fade-in slide-in-from-top duration-300">
                      <span className="text-red-400 text-xs sm:text-sm">{error}</span>
                    </div>
                  )}

                  {/* Botón comenzar */}
                  <button
                    onClick={handleStartDraw}
                    disabled={participantCount < 2 || !title.trim()}
                    className="w-full mt-1 bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    <span className="text-lg sm:text-xl">🎲</span>
                    Comenzar Sorteo
                  </button>

                  {/* Información adicional */}
                  <p className="text-center text-gray-500 text-xs pt-1">
                    💡 Tip: Usa las flechas para ajustar valores rápidamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <CountdownTimer
        open={countdownOpen}
        onComplete={handleCountdownComplete}
        duration={countdownDuration}
      />

      {/* Winner Modal */}
      <WinnerModal
        open={winnerModalOpen}
        winnerName={winner}
        onNewDraw={handleNewDraw}
        onClose={handleCloseWinnerModal}
      />
    </main>
  );
}
