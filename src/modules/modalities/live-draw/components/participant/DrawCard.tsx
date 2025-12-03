"use client";
import React from "react";
import type { LiveDraw } from "../../services/liveDrawService";
import { ParticipantList } from "../shared/ParticipantList";

interface DrawCardProps {
  draw: LiveDraw;
  joinedName: string | null;
  participants: LiveDraw["participants"];
  loading: boolean;
  onLeave?: () => void;
}

export const DrawCard: React.FC<DrawCardProps> = ({ 
  draw, 
  joinedName,
  participants, 
  loading,
  onLeave
}) => {
  const isCancelled = draw.status === 'cancelled';
  const isFinished = draw.status === 'finished';
  const isRunning = draw.status === 'running';
  const isWaiting = draw.status === 'waiting';

  const getStatusConfig = () => {
    switch (draw.status) {
      case 'waiting':
        return {
          emoji: '⏳',
          text: 'Esperando inicio',
          gradient: 'from-blue-500/20 to-cyan-500/20',
          border: 'border-blue-500/30',
          textColor: 'text-blue-300'
        };
      case 'running':
        return {
          emoji: '🎯',
          text: '¡Sorteo en curso!',
          gradient: 'from-green-500/20 to-emerald-500/20',
          border: 'border-green-500/30',
          textColor: 'text-green-300'
        };
      case 'cancelled':
        return {
          emoji: '❌',
          text: 'Sorteo cancelado',
          gradient: 'from-red-500/20 to-rose-500/20',
          border: 'border-red-500/30',
          textColor: 'text-red-300'
        };
      case 'finished':
        return {
          emoji: '✅',
          text: 'Sorteo finalizado',
          gradient: 'from-purple-500/20 to-pink-500/20',
          border: 'border-purple-500/30',
          textColor: 'text-purple-300'
        };
      default:
        return {
          emoji: '📋',
          text: 'Estado desconocido',
          gradient: 'from-gray-500/20 to-gray-600/20',
          border: 'border-gray-500/30',
          textColor: 'text-gray-300'
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Verificar si este participante es ganador
  const isWinner = draw.winners && joinedName 
    ? draw.winners.some(w => (w.name || '').trim().toLowerCase() === joinedName.trim().toLowerCase())
    : false;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto">
      {/* Panel Izquierdo - Información del Participante */}
      <div className="lg:col-span-1 flex flex-col gap-3 sm:gap-4">
        {/* Nombre del sorteo */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-xl">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-xl sm:text-2xl">🎉</span>
            <h2 className="text-base sm:text-lg font-bold text-white">Sorteo</h2>
          </div>
          {draw.name && (
            <p className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-tight break-words">
              {draw.name}
            </p>
          )}
        </div>

        {/* Tu nombre */}
        {joinedName && (
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-xl sm:text-2xl">👤</span>
              <h3 className="text-sm sm:text-base font-bold text-white">Tu Nombre</h3>
            </div>
            <p className="text-base sm:text-lg font-bold text-white truncate">
              {joinedName}
            </p>
          </div>
        )}

        {/* Estado del sorteo */}
        <div className={`p-4 sm:p-5 rounded-xl bg-gradient-to-br ${statusConfig.gradient} backdrop-blur-md border ${statusConfig.border} shadow-xl`}>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{statusConfig.emoji}</span>
            <p className={`text-sm sm:text-base font-bold ${statusConfig.textColor}`}>
              {statusConfig.text}
            </p>
          </div>
        </div>

        {/* Resultado del participante (si hay ganadores) */}
        {isFinished && draw.winners && draw.winners.length > 0 && joinedName && (
          <div className={`p-4 sm:p-5 rounded-xl bg-gradient-to-br ${isWinner ? 'from-green-500/20 to-emerald-500/20 border-green-500/50' : 'from-gray-500/20 to-gray-600/20 border-gray-500/30'} backdrop-blur-md border-2 shadow-xl`}>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl sm:text-4xl">{isWinner ? '🎊' : '😔'}</span>
              <p className={`text-sm sm:text-base font-bold ${isWinner ? 'text-green-300' : 'text-gray-400'}`}>
                {isWinner ? '¡Felicidades, ganaste!' : 'No ganaste esta vez'}
              </p>
            </div>
          </div>
        )}

        {/* Botón salir */}
        {!isFinished && !isCancelled && (
          <button
            className="bg-neutral-800/50 backdrop-blur-sm border-2 border-red-500/50 text-red-400 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold hover:bg-red-500/10 hover:border-red-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            disabled={loading}
            onClick={onLeave}
          >
            <span className="text-base sm:text-lg">🚪</span>
            Salir del sorteo
          </button>
        )}
      </div>

      {/* Panel Derecho - Lista de Participantes o Ganadores */}
      <div className="lg:col-span-2 p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-xl">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{isFinished && draw.winners && draw.winners.length > 0 ? '👑' : '👥'}</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {isFinished && draw.winners && draw.winners.length > 0 ? 'Ganadores' : 'Participantes'}
            </h3>
          </div>
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
            <span className="text-purple-300 font-bold text-xs sm:text-sm">
              {isFinished && draw.winners && draw.winners.length > 0 
                ? draw.winners.length 
                : participants?.length || 0
              }
            </span>
          </div>
        </div>

        <div className="min-h-[200px] max-h-[calc(100vh-400px)] lg:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {isFinished && draw.winners && draw.winners.length > 0 ? (
            <ParticipantList
              participants={draw.winners as any}
              loading={false}
              emptyMessage="No hay ganadores"
            />
          ) : (
            <ParticipantList
              participants={participants}
              loading={loading}
              emptyMessage="Aún no hay participantes"
            />
          )}
        </div>
      </div>
    </div>
  );
};
