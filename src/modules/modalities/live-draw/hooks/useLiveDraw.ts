import { useState, useEffect } from "react";
import { createLiveDraw, addParticipant, LiveDraw, Participant, subscribeLiveDraw, cancelLiveDraw, findActiveDrawByCreator, updateLiveDrawStatus, removeParticipant, getLiveDraw, getLiveDrawByPin, addWinner } from "../services/liveDrawService";

export function useLiveDraw() {
  // Estado base
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawId, setDrawId] = useState<string | null>(null);
  const [draw, setDraw] = useState<LiveDraw | null>(null);

  // Derivados (si aplica) — actualmente no hay derivados explícitos

  // Efectos: suscripción en tiempo real al sorteo
  useEffect(() => {
    if (!drawId) return;
    const unsubscribe = subscribeLiveDraw(drawId, (liveDraw: LiveDraw | null) => {
      if (liveDraw) setDraw(liveDraw);
    });
    return () => unsubscribe();
  }, [drawId]);

  // Acciones
  async function create({ creatorId, name }: { creatorId: string; name: string }): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const id = await createLiveDraw({ creatorId, name });
      setDrawId(id);
      // El estado draw se actualizará automáticamente por onSnapshot
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error inesperado al crear el sorteo";
      setError(msg);
    }
    setLoading(false);
  }

  // Cancelar el sorteo actual (o por id provisto)
  async function cancel(requesterId: string, id?: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      const targetId = id || drawId || draw?.code;
      if (!targetId) throw new Error("No hay sorteo para cancelar");
      await cancelLiveDraw({ drawId: targetId, requesterId });
      setLoading(false);
      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error inesperado al cancelar";
      setError(msg);
      setLoading(false);
      return false;
    }
  }

  async function start(requesterId: string, id?: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      const targetId = id || drawId || draw?.code;
      if (!targetId) throw new Error("No hay sorteo para iniciar");
      await updateLiveDrawStatus({ drawId: targetId, requesterId, nextStatus: 'running' });
      setLoading(false);
      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error inesperado al iniciar";
      setError(msg);
      setLoading(false);
      return false;
    }
  }

  async function finish(requesterId: string, id?: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      const targetId = id || drawId || draw?.code;
      if (!targetId) throw new Error("No hay sorteo para finalizar");
      await updateLiveDrawStatus({ drawId: targetId, requesterId, nextStatus: 'finished' });
      setLoading(false);
      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error inesperado al finalizar";
      setError(msg);
      setLoading(false);
      return false;
    }
  }

  async function leave(identity: { browserId?: string; name?: string }, id?: string): Promise<boolean> {
    setLoading(true);
    setError(null);
    try {
      const targetId = id || drawId || draw?.code;
      if (!targetId) throw new Error("No hay sorteo para salir");
      const ok = await removeParticipant(targetId, identity);
      setLoading(false);
      return ok;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error inesperado al salir";
      setError(msg);
      setLoading(false);
      return false;
    }
  }

  // Une a un participante al sorteo indicado. Si el hook aún no está suscrito a ese sorteo,
  // establece drawId para activar la suscripción y así actualizar "draw" automáticamente via onSnapshot.
  async function join(id: string, participant: Participant): Promise<{ ok: boolean; error?: string }> {
    setLoading(true);
    setError(null);
    try {
      // Asegura la suscripción al sorteo objetivo antes/de inmediato
      if (!drawId || drawId !== id) {
        setDrawId(id);
      }
      await addParticipant(id, participant);
      // El estado "draw" se actualizará automáticamente por onSnapshot (ver useEffect de arriba)
      setLoading(false);
      // Limpia cualquier error previo por si la vista lo usa directamente
      setError(null);
      return { ok: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error inesperado al unirse";
      setError(msg);
      setLoading(false);
      return { ok: false, error: msg };
    }
  }

  // Restaurar sorteo activo del host: usa localStorage primero y si no, consulta Firestore.
  async function restoreForHost(userId: string): Promise<string | null> {
    try {
      const storageKey = `ts_host_current_drawId_${userId}`;
      const savedId = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      if (savedId) {
        setDrawId(savedId);
        return savedId;
      }
      const existing = await findActiveDrawByCreator(userId);
      if (existing && existing.code) {
        setDrawId(existing.code);
        if (typeof window !== 'undefined') localStorage.setItem(storageKey, existing.code);
        return existing.code;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Exponer utilidades para la vista de participantes sin que importe el service directamente
  async function restoreLastJoinedDraw(drawIdToRestore: string): Promise<LiveDraw | null> {
    return await getLiveDraw(drawIdToRestore);
  }

  async function joinByPin(pin: number): Promise<LiveDraw | null> {
    return await getLiveDrawByPin(pin);
  }

  // Retorno
  return { loading, error, drawId, draw, create, join, cancel, start, finish, leave, restoreForHost, restoreLastJoinedDraw, joinByPin, setDraw, setDrawId, addWinner } as const;
}
