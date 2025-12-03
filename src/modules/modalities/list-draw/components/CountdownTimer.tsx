"use client";
import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  open: boolean;
  onComplete: () => void;
  duration?: number; // Duración del countdown (default 3)
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  open,
  onComplete,
  duration = 3,
}) => {
  const [count, setCount] = useState(duration);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!open) {
      setCount(duration);
      setIsClosing(false);
      return;
    }

    if (count === 0) {
      // Mostrar "¡Tenemos un ganador!" por más tiempo y luego completar directamente
      const displayTimer = setTimeout(() => {
        onComplete();
      }, 1000); // Mostrar "¡Tenemos un ganador!" por 1 segundo
      return () => clearTimeout(displayTimer);
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [open, count, onComplete, duration]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl transition-all duration-500 ${
        isClosing ? "opacity-0 scale-95" : "animate-in fade-in duration-300"
      }`}
    >
      {/* Animated background particles */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.25s" }}
        ></div>
      </div>

      {/* Main countdown container */}
      <div
        className={`relative z-10 flex flex-col items-center gap-6 transition-all duration-500 ${
          isClosing
            ? "opacity-0 scale-90 translate-y-4"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {/* Excitement text */}
        <div
          className={`text-center transition-all duration-500 ${
            isClosing
              ? "opacity-0 -translate-y-4"
              : "animate-in zoom-in duration-500"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text mb-2 animate-pulse bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300">
            {count === 0 ? "¡Tenemos un ganador!" : "¡Eligiendo ganador!"}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            {count === 0
              ? "Mostrando resultados..."
              : "Preparando los resultados..."}
          </p>
        </div>

        {/* Countdown number with advanced animations */}
        <div className="relative">
          {/* Outer rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-64 h-64 rounded-full border-4 border-yellow-500/30 animate-ping"
              style={{ animationDuration: "1s" }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-56 h-56 rounded-full border-4 border-orange-500/30 animate-ping"
              style={{ animationDuration: "1s", animationDelay: "0.2s" }}
            ></div>
          </div>

          {/* Main circle with gradient border */}
          <div
            className={`relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-600 via-orange-600 to-yellow-600 p-1 shadow-2xl shadow-yellow-500/50 transition-all duration-700 ${
              isClosing
                ? "scale-110 opacity-0"
                : "animate-in zoom-in-95 scale-100 opacity-100"
            }`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 blur-xl"></div>

              {/* Number */}
              <div className="relative">
                {count > 0 ? (
                  <span
                    key={count}
                    className="text-8xl sm:text-9xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-400 animate-in zoom-in duration-300"
                    style={{
                      textShadow: "0 0 40px rgba(251, 146, 60, 0.5)",
                      lineHeight: "1",
                    }}
                  >
                    {count}
                  </span>
                ) : (
                  <div className="flex flex-col items-center animate-in zoom-in duration-500">
                    <span className="text-6xl sm:text-7xl md:text-8xl mb-2">
                      🎊
                    </span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                      ¡YA!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rotating decorative elements */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s" }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-3xl">⭐</span>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <span className="text-3xl">✨</span>
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-3xl">🎉</span>
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
              <span className="text-3xl">🎊</span>
            </div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-64 sm:w-80 h-2 bg-neutral-800 rounded-full overflow-hidden shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-full transition-all duration-1000 ease-linear"
            style={{
              width: `${((duration - count) / duration) * 100}%`,
              boxShadow: "0 0 20px rgba(251, 146, 60, 0.6)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
