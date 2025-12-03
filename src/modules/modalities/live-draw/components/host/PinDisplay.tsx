"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export const PinDisplay: React.FC<{ pin: number }> = ({ pin }) => {
  const [copied, setCopied] = React.useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/modalities/join-live-draw/${pin}`
    : `https://example.com/modalities/join-live-draw/${pin}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-xl">
      <div className="flex items-center gap-2">
        <span className="text-xl sm:text-2xl">🎟️</span>
        <h3 className="text-base sm:text-lg font-bold text-white">Acceso al Sorteo</h3>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 flex flex-col justify-center">
          <div>
            <p className="text-xs text-gray-400 mb-1.5 text-center">Ingresa el PIN:</p>
            <div
              className="relative grid w-full min-h-[64px] place-items-center py-3 pl-5 pr-3 rounded-lg bg-neutral-900/80 border-2 border-purple-500/50 cursor-pointer hover:border-purple-400/70 hover:bg-neutral-900/90 transition-all duration-300 group text-center"
              onClick={handleCopy}
              title="Clic para copiar enlace"
            >
              <span className="block font-mono text-2xl sm:text-3xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 leading-none">
                {pin}
              </span>
              {copied && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg animate-bounce z-10 whitespace-nowrap">
                  ¡Copiado!
                </div>
              )}
            </div>
          </div>

          <div className="mt-2">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span>💡</span>
              <span>Haz clic para copiar el enlace</span>
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-400 mb-2 text-center">O escanea:</p>
          <div className="bg-white p-2.5 rounded-xl shadow-lg border-2 border-purple-500/30 hover:border-purple-500/50 transition-colors duration-300">
            <QRCodeCanvas
              value={shareUrl}
              size={110}
              level="H"
              includeMargin={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};