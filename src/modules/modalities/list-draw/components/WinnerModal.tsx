"use client";
import React from "react";

interface WinnerModalProps {
  open: boolean;
  winnerName: string;
  onNewDraw: () => void;
  onClose: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({
  open,
  winnerName,
  onNewDraw,
  onClose,
}) => {
  if (!open) return null;

  // Separar ganadores por coma
  const winners = winnerName.split(", ").filter(name => name.trim() !== "");
  const isMultipleWinners = winners.length > 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      {/* Confetti effect background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4 zoom-out-110">
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/30">
          {/* Decorative elements */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition p-1.5 rounded-full hover:bg-neutral-700/50"
            aria-label="Cerrar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="flex flex-col items-center text-center mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 mb-2 animate-pulse">
              {isMultipleWinners ? "¡GANADORES!" : "¡GANADOR!"}
            </h2>

            <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 w-full max-h-64 overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl">👑</span>
                <span className="text-3xl">🎊</span>
                <span className="text-3xl">👑</span>
              </div>
              
              {isMultipleWinners ? (
                <div className="space-y-2">
                  {winners.map((winner, index) => (
                    <div key={index} className="flex items-center justify-center gap-2 py-2 border-b border-yellow-400/20 last:border-0">
                      <span className="text-yellow-400 font-bold text-lg">#{index + 1}</span>
                      <p className="text-lg sm:text-xl font-black text-white break-words">
                        {winner}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xl sm:text-2xl font-black text-white break-words">
                  {winnerName}
                </p>
              )}
            </div>

            <p className="text-gray-300 mb-6 text-xs sm:text-sm max-w-md">
              {isMultipleWinners 
                ? "¡Felicidades a los ganadores! ¿Deseas realizar un nuevo sorteo?"
                : "¡Felicidades al ganador! ¿Deseas realizar un nuevo sorteo?"
              }
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <button
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-5 py-3 rounded-xl font-bold shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                onClick={onNewDraw}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="text-lg">🔄</span>
                <span className="relative z-10">Nuevo Sorteo</span>
              </button>

              <button
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-neutral-700 to-neutral-600 text-white px-5 py-3 rounded-xl font-bold shadow-xl hover:shadow-neutral-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                onClick={onClose}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-600 to-neutral-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="text-lg">✅</span>
                <span className="relative z-10">Cerrar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
