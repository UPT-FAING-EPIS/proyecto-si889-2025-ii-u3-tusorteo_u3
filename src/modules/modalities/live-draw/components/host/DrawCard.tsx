"use client";
import React from "react";
import type { LiveDraw } from "../../services/liveDrawService";
import { ParticipantList } from "../shared/ParticipantList";
import { PinDisplay } from "./PinDisplay";

interface DrawCardProps {
  draw: LiveDraw;
  participants: LiveDraw["participants"];
  loading: boolean;
  emptyMessage?: string;
  onRunDraw?: () => void;
  onCancel?: () => void;
  onPickWinner?: () => void;
  onFinish?: () => void;
  onRemoveParticipant?: (identity: { browserId?: string; name?: string }) => void;
  winnersCount?: number;
  onWinnersCountChange?: (count: number) => void;
}

export const DrawCard: React.FC<DrawCardProps> = ({ 
  draw, 
  participants, 
  loading, 
  emptyMessage = "Aún no hay participantes", 
  onRunDraw, 
  onCancel, 
  onPickWinner, 
  onFinish,
  onRemoveParticipant,
  winnersCount = 1,
  onWinnersCountChange
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
          text: 'Esperando participantes',
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

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto">
      {/* Panel Izquierdo - Información del Sorteo */}
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

        {/* PIN del sorteo */}
        {isWaiting && (
          <PinDisplay pin={draw.pin} />
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

        {/* Botones de acción */}
        <div className="flex flex-col gap-2">
          {!isRunning && !isCancelled && !isFinished && (
            <button
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm sm:text-base"
              disabled={loading || !participants || participants.length === 0}
              onClick={onRunDraw}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="text-base sm:text-lg">▶️</span>
              <span className="relative z-10">Iniciar sorteo</span>
            </button>
          )}
          
          {isRunning && (
            <>
              {/* Selector de cantidad de ganadores */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl sm:text-2xl">🎯</span>
                  <h3 className="text-sm sm:text-base font-bold text-white">Cantidad de ganadores</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onWinnersCountChange && onWinnersCountChange(Math.max(1, winnersCount - 1))}
                    disabled={winnersCount <= 1 || loading}
                    className="w-10 h-10 rounded-lg bg-neutral-700/50 hover:bg-neutral-600/50 text-white font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {winnersCount}
                    </span>
                  </div>
                  <button
                    onClick={() => onWinnersCountChange && onWinnersCountChange(Math.min(participants?.length || 1, winnersCount + 1))}
                    disabled={winnersCount >= (participants?.length || 1) || loading}
                    className="w-10 h-10 rounded-lg bg-neutral-700/50 hover:bg-neutral-600/50 text-white font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Máximo: {participants?.length || 0} participantes
                </p>
              </div>

              <button
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                disabled={loading}
                onClick={onPickWinner}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="text-base sm:text-lg">🎲</span>
                <span className="relative z-10">
                  {winnersCount > 1 ? `Elegir ${winnersCount} ganadores` : 'Elegir ganador'}
                </span>
              </button>
              
              <button
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                disabled={loading}
                onClick={onFinish}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="text-base sm:text-lg">🏁</span>
                <span className="relative z-10">Finalizar sorteo</span>
              </button>
            </>
          )}
          
          {!isRunning && (
            <button
              className="bg-neutral-800/50 backdrop-blur-sm border-2 border-red-500/50 text-red-400 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold hover:bg-red-500/10 hover:border-red-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              disabled={loading || isCancelled || isFinished}
              onClick={onCancel}
            >
              <span className="text-base sm:text-lg">🚫</span>
              Cancelar sorteo
            </button>
          )}
        </div>
      </div>

      {/* Panel Derecho - Lista de Participantes */}
      <div className="lg:col-span-2 p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-xl">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">👥</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">Participantes</h3>
          </div>
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
            <span className="text-purple-300 font-bold text-xs sm:text-sm">{participants?.length || 0}</span>
          </div>
        </div>

        <div className="min-h-[200px] max-h-[calc(100vh-400px)] lg:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <ParticipantList
            participants={participants}
            loading={loading}
            emptyMessage={emptyMessage}
            canRemove={draw.status === 'waiting'}
            onRemoveParticipant={onRemoveParticipant}
          />
        </div>
      </div>
    </div>
  );
};
