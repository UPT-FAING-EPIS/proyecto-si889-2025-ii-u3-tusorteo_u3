"use client";
import React from "react";
import type { Participant } from "../../services/liveDrawService";

interface ParticipantListProps {
  participants?: Participant[];
  loading?: boolean;
  emptyMessage?: string;
  canRemove?: boolean;
  onRemoveParticipant?: (identity: { browserId?: string; name?: string }) => void;
}

export const ParticipantList: React.FC<ParticipantListProps> = ({ participants, loading, emptyMessage, canRemove, onRemoveParticipant }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        <span className="text-gray-400 text-sm">Cargando participantes...</span>
      </div>
    );
  }
  if (!participants || participants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <div className="text-5xl opacity-50">👥</div>
        <p className="text-gray-400 text-center text-sm">
          {emptyMessage || "Aún no hay participantes"}
        </p>
        <p className="text-gray-500 text-xs text-center max-w-xs">
          Comparte el PIN para que se unan al sorteo
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {participants.map((p, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden p-3 rounded-lg bg-gradient-to-br from-neutral-700/50 to-neutral-800/50 border border-neutral-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-purple-500/20"
        >
          {/* Background animation on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Content */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">
                {p.name || "Sin nombre"}
              </p>
            </div>
            {canRemove && onRemoveParticipant && (
              <button
                className="ml-2 w-6 h-6 text-red-400 text-lg hover:scale-125 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                title="Eliminar participante"
                onClick={() => onRemoveParticipant({ browserId: p.browserId, name: p.name })}
              >
                ❌
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
