"use client";
import { useEffect, useMemo, useState } from "react";
import { useLiveDraw } from "./useLiveDraw";
import type { LiveDraw, Participant } from "../services/liveDrawService";

function hostStorageKey(userId: string) {
  return `ts_host_current_drawId_${userId}`;
}

export function useLiveDrawHost(userId?: string) {
  // Estado base del sorteo (compartido)
  const { loading, error, drawId, draw, create, cancel, start, finish, restoreForHost, setDrawId, setDraw, leave } = useLiveDraw();

  // Estado específico del host
  const [name, setName] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const [winnersCount, setWinnersCount] = useState(1);

  // Derivados (memoizados)
  const storageKey = useMemo(() => (userId ? hostStorageKey(userId) : null), [userId]);
  
  const pickRandomParticipant = useMemo(() => {
    return (): Participant | null => {
      const list = (draw?.participants || []).filter(p => (p?.name || '').trim().length > 0);
      if (list.length === 0) return null;
      // Intentos defensivos para evitar sesgo si hubiera valores no válidos
      for (let i = 0; i < 5; i++) {
        const idx = Math.floor(Math.random() * list.length);
        const candidate = list[idx];
        if ((candidate?.name || '').trim().length > 0) return candidate;
      }
      return list[0] || null;
    };
  }, [draw?.participants]);

  const pickMultipleRandomParticipants = useMemo(() => {
    return (count: number): Participant[] => {
      const availableParticipants = (draw?.participants || []).filter(p => (p?.name || '').trim().length > 0);
      if (availableParticipants.length === 0) return [];
      
      const actualCount = Math.min(count, availableParticipants.length);
      const selectedWinners: Participant[] = [];
      const tempParticipants = [...availableParticipants];
      
      // Seleccionar ganadores aleatorios sin repetición
      for (let i = 0; i < actualCount; i++) {
        const randomIndex = Math.floor(Math.random() * tempParticipants.length);
        selectedWinners.push(tempParticipants[randomIndex]);
        tempParticipants.splice(randomIndex, 1);
      }
      
      return selectedWinners;
    };
  }, [draw?.participants]);

  // Efectos
  // Restauración del sorteo del host al montar
  useEffect(() => {
    if (!userId || restored) return;
    const key = storageKey;
    const savedId = key && typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (savedId) {
      setDrawId(savedId);
      setRestored(true);
      return;
    }
    restoreForHost(userId).finally(() => setRestored(true));
  }, [userId, restored, setDrawId, restoreForHost, storageKey]);

  // Persistir/limpiar storage del host en un único efecto
  useEffect(() => {
    if (!userId || !storageKey) return;
    // Limpiar cuando el sorteo termina o se cancela
    if (draw && (draw.status === 'cancelled' || draw.status === 'finished')) {
      localStorage.removeItem(storageKey);
      setDrawId(null);
      setDraw(null as any);
      setName("");
      setLocalError(null);
      return;
    }
    // Persistir el id cuando esté disponible
    if (drawId) {
      localStorage.setItem(storageKey, drawId);
    }
  }, [userId, storageKey, drawId, draw?.status, setDrawId, setDraw]);

  // Acciones/handlers
  const handleCreate = async () => {
    setLocalError(null);
    if (!userId) return;
    const value = name.trim();
    if (value.length < 3) {
      setLocalError("Ingresa un nombre de al menos 3 caracteres.");
      return;
    }
    try {
      await create({ creatorId: userId, name: value });
    } catch (e) {
      // El error global se refleja en `error`; aquí solo evitamos romper UX
    }
  };

  const startDraw = async () => {
    if (!userId || !draw) return false;
    return await start(userId, draw.code);
  };

  const cancelDraw = async () => {
    if (!userId || !draw) return false;
    return await cancel(userId, draw.code);
  };

  const finishDraw = async () => {
    if (!userId || !draw) return false;
    return await finish(userId, draw.code);
  };

  async function removeParticipantFromDraw(identity: { browserId?: string; name?: string }) {
    if (!draw?.code) return false;
    return await leave(identity, draw.code);
  }

  async function saveWinners(winners: Participant[]) {
    if (!draw?.code) return false;
    
    try {
      const mod = await import("../services/liveDrawService");
      for (const winner of winners) {
        await mod.addWinner(draw.code, { 
          name: winner.name, 
          browserId: winner.browserId 
        });
      }
      return true;
    } catch (e) {
      console.error("Error al guardar ganadores:", e);
      return false;
    }
  }

  async function removeMultipleParticipants(participants: Participant[]) {
    if (!draw?.code) return false;
    
    try {
      for (const participant of participants) {
        await removeParticipantFromDraw({
          browserId: participant.browserId,
          name: participant.name,
        });
      }
      return true;
    } catch (e) {
      console.error("Error al eliminar participantes:", e);
      return false;
    }
  }

  function resetWinnersCount() {
    setWinnersCount(1);
  }

  return {
    // estado principal
    draw: draw as LiveDraw | null,
    drawId,
    loading,
    error,
    restored,
    // nombre y error local
    name,
    setName,
    localError,
    setLocalError,
    // estado de ganadores
    winnersCount,
    setWinnersCount,
    resetWinnersCount,
    // acciones
    handleCreate,
    startDraw,
    cancelDraw,
    finishDraw,
    pickRandomParticipant,
    pickMultipleRandomParticipants,
    removeParticipantFromDraw,
    saveWinners,
    removeMultipleParticipants,
  } as const;
}
