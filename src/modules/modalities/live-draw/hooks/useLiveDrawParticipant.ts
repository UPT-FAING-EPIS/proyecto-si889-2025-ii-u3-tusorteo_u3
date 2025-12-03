"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLiveDraw } from "./useLiveDraw";
import { getBrowserId, JOINED_NAME_PREFIX, JOINED_PREFIX, LAST_JOINED_KEY } from "../constants/storageKeys";
import type { LiveDraw } from "../services/liveDrawService";

type JoinHandler = (pin: number, name: string) => Promise<void>;

export function useLiveDrawParticipant() {
  // Estado compartido del sorteo (desde useLiveDraw): estado y acciones del servicio
  const { loading, error, join, leave, draw, setDrawId, setDraw, joinByPin, restoreLastJoinedDraw } = useLiveDraw();

  // Estado base del participante (local al hook / UX)
  const [joined, setJoined] = useState(false);
  const [restored, setRestored] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [joinedName, setJoinedName] = useState<string | null>(null);
  // Modal de ganadores en participante
  const [winnerOpen, setWinnerOpen] = useState(false);
  // Marcador: si alguna vez aparecimos en la lista de participantes de este sorteo
  const hasBeenInParticipantsRef = useRef(false);
  // Último nonce de evento de ganador visto por este cliente (para disparar múltiples veces si vuelve a ganar)
  const lastWinNonceRef = useRef<number>(0);
  // Flag local para evitar doble click / re-entradas concurrentes en handleJoin
  const joiningRef = useRef<boolean>(false);

  // Derivados
  const didWin = useMemo(() => {
    if (!joined || !draw?.winners || !joinedName) return false;
    const me = joinedName.trim().toLowerCase();
    return draw.winners.some(w => (w.name || '').trim().toLowerCase() === me);
  }, [joined, draw?.winners, joinedName]);

  const canShowParticipants = useMemo(() => {
    return Boolean(draw && joined && draw.status !== 'finished' && draw.status !== 'cancelled');
  }, [draw, joined]);

  // Efecto 1: Restauración inicial al montar (cliente)
  // - Se ejecuta una sola vez (hasta que "restored" sea true)
  // - Lee localStorage para encontrar el último sorteo al que se unió este navegador
  // - Valida en Firestore que el sorteo exista y no esté finalizado/cancelado
  // - Si es válido, fija el drawId (para suscribirse) y marca joined/joinedName desde localStorage
  // - Si está obsoleto (finished/cancelled o no existe), limpia las claves
  useEffect(() => {
    if (typeof window === 'undefined' || restored) return;
    (async () => {
      try {
        const lastId = localStorage.getItem(LAST_JOINED_KEY);
        if (lastId) {
          const exists = await restoreLastJoinedDraw(lastId);
          if (exists) {
            if (exists.status === 'finished' || exists.status === 'cancelled') {
              localStorage.removeItem(LAST_JOINED_KEY);
              localStorage.removeItem(`${JOINED_PREFIX}${lastId}`);
              localStorage.removeItem(`${JOINED_NAME_PREFIX}${lastId}`);
            } else {
              setDrawId(lastId);
              const already = localStorage.getItem(`${JOINED_PREFIX}${lastId}`);
              if (already === '1') {
                setJoined(true);
                const savedName = localStorage.getItem(`${JOINED_NAME_PREFIX}${lastId}`);
                if (savedName) setJoinedName(savedName);
                if (!successMsg) setSuccessMsg('Ya estás participando en este sorteo desde este navegador.');
              }
            }
          } else {
            localStorage.removeItem(LAST_JOINED_KEY);
            localStorage.removeItem(`${JOINED_PREFIX}${lastId}`);
            localStorage.removeItem(`${JOINED_NAME_PREFIX}${lastId}`);
          }
        } else {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i) || '';
            if (key.startsWith(JOINED_PREFIX) && !key.startsWith(JOINED_NAME_PREFIX)) {
              const val = localStorage.getItem(key);
              if (val === '1') {
                const id = key.replace(JOINED_PREFIX, '');
                const exists = await restoreLastJoinedDraw(id);
                if (exists) {
                  if (exists.status === 'finished' || exists.status === 'cancelled') {
                    localStorage.removeItem(`${JOINED_PREFIX}${id}`);
                    localStorage.removeItem(`${JOINED_NAME_PREFIX}${id}`);
                    continue;
                  }
                  localStorage.setItem(LAST_JOINED_KEY, id);
                  setDrawId(id);
                  setJoined(true);
                  const savedName = localStorage.getItem(`${JOINED_NAME_PREFIX}${id}`);
                  if (savedName) setJoinedName(savedName);
                  if (!successMsg) setSuccessMsg('Ya estás participando en este sorteo desde este navegador.');
                  break;
                } else {
                  localStorage.removeItem(`${JOINED_PREFIX}${id}`);
                  localStorage.removeItem(`${JOINED_NAME_PREFIX}${id}`);
                }
              }
            }
          }
        }
      } catch {}
      setRestored(true);
    })();
  }, [restored, setDrawId, restoreLastJoinedDraw, successMsg]);

  // Efecto 2: Sincronización por cambios en el sorteo activo (code/status)
  // - Se ejecuta cuando cambia draw.code o draw.status
  // - Si el sorteo terminó/canceló: limpia claves y vuelve a mostrar el formulario
  // - En caso normal: sincroniza joined/joinedName según localStorage para el code actual
  useEffect(() => {
    if (typeof window === 'undefined' || !draw?.code) return;
    // Si terminó/canceló, limpiar y mostrar formulario
    if (draw.status === 'finished' || draw.status === 'cancelled') {
      try {
        const lastId = localStorage.getItem(LAST_JOINED_KEY);
        if (lastId === draw.code) localStorage.removeItem(LAST_JOINED_KEY);
        localStorage.removeItem(`${JOINED_PREFIX}${draw.code}`);
        localStorage.removeItem(`${JOINED_NAME_PREFIX}${draw.code}`);
      } catch {}
      setJoined(false);
      setJoinedName(null);
      setSuccessMsg(null);
      return;
    }
    // Caso normal: al cambiar draw, sincroniza joined desde localStorage
    try {
      const key = `${JOINED_PREFIX}${draw.code}`;
      const already = localStorage.getItem(key);
      if (already === '1') {
        setJoined(true);
        const savedName = localStorage.getItem(`${JOINED_NAME_PREFIX}${draw.code}`);
        if (savedName) setJoinedName(savedName);
        if (!successMsg) setSuccessMsg('Ya estás participando en este sorteo desde este navegador.');
        localStorage.setItem(LAST_JOINED_KEY, draw.code);
      } else {
        setJoined(false);
        setJoinedName(null);
        setSuccessMsg(null);
      }
    } catch {}
  }, [draw?.code, draw?.status, successMsg]);

  // Efecto 3: Si el participante actual ya no está en la lista, mostrar el formulario
  useEffect(() => {
    if (!draw || !joined || !joinedName) return;
    const myId = getBrowserId();
    const meNormalized = joinedName.trim().toLowerCase();
    const exists = (draw.participants || []).some((p) => {
      const matchBrowser = p?.browserId && myId ? p.browserId === myId : false;
      const matchName = ((p?.name || '').trim().toLowerCase()) === meNormalized;
      return matchBrowser || matchName;
    });

    if (exists) {
      // Confirmamos presencia al menos una vez
      hasBeenInParticipantsRef.current = true;
      return;
    }

    // Si nunca llegamos a estar presentes (latencia inicial), no considerar expulsión aún
    if (!hasBeenInParticipantsRef.current) return;

    // El participante fue eliminado por el host (después de haber estado presente)
    try {
      const lastId = typeof window !== 'undefined' ? localStorage.getItem(LAST_JOINED_KEY) : null;
      if (lastId === draw.code) localStorage.removeItem(LAST_JOINED_KEY);
      localStorage.removeItem(`${JOINED_PREFIX}${draw.code}`);
      localStorage.removeItem(`${JOINED_NAME_PREFIX}${draw.code}`);
    } catch {}
    setJoined(false);
    setJoinedName(null);
    setSuccessMsg(null);
    // Opcional: limpiar estado del sorteo activo para volver a formulario limpio
    setDrawId(null);
    setDraw(null as any);
  }, [draw?.participants, joined, joinedName, draw?.code]);

  // Efecto 4: Escuchar eventos de currentWin y abrir modal si el evento me corresponde y es nuevo
  useEffect(() => {
    if (!draw?.currentWin || !joined) return;
    const { name, browserId, nonce } = draw.currentWin as any;
    if (!nonce || nonce <= lastWinNonceRef.current) return;
    const myId = getBrowserId();
    const meName = (joinedName || '').trim().toLowerCase();
    const isMeById = browserId && myId ? browserId === myId : false;
    const isMeByName = (name || '').trim().toLowerCase() === meName;
    if (isMeById || isMeByName) {
      // Evento nuevo para mí: abrir modal
      setWinnerOpen(true);
    }
    // En cualquier caso, avanzar el nonce visto para no reemitir en re-render
    lastWinNonceRef.current = nonce;
  }, [draw?.currentWin?.nonce, draw?.currentWin?.name, draw?.currentWin?.browserId, joined, joinedName]);

  // Efecto 5: Abrir modal si el participante ganó (derivado didWin)
  useEffect(() => {
    if (didWin) {
      setWinnerOpen(true);
    }
  }, [didWin]);


  // Acciones
  const handleJoin: JoinHandler = async (pinValue, nameValue) => {
    // Evitar doble click o llamadas concurrentes
    if (joiningRef.current || loading) return;
    joiningRef.current = true;
    setLocalError(null);
    setSuccessMsg(null);
    // Reset marcador de presencia
    hasBeenInParticipantsRef.current = false;
    lastWinNonceRef.current = 0;
    try {
      const liveDraw = await joinByPin(pinValue);
      if (!liveDraw) {
        setLocalError('PIN no encontrado. Verifica el número e inténtalo de nuevo.');
        return;
      }
      const drawId = liveDraw.code;
      setJoined(false);
      setJoinedName(null);
      // Si ya está unido desde este navegador, evitar re-intento
      try {
        const already = localStorage.getItem(`${JOINED_PREFIX}${drawId}`);
        if (already === '1') {
          setJoined(true);
          const savedName = localStorage.getItem(`${JOINED_NAME_PREFIX}${drawId}`);
          if (savedName) setJoinedName(savedName);
          setSuccessMsg('Ya estás participando en este sorteo desde este navegador.');
          return;
        }
      } catch {}
      const browserId = getBrowserId();
      const { ok, error: joinError } = await join(drawId, { name: nameValue.trim(), browserId });
      if (ok) {
        setJoined(true);
        setSuccessMsg('Te uniste al sorteo correctamente.');
        try {
          localStorage.setItem(`${JOINED_PREFIX}${drawId}`, '1');
          localStorage.setItem(`${JOINED_NAME_PREFIX}${drawId}`, nameValue.trim());
          localStorage.setItem(LAST_JOINED_KEY, drawId);
        } catch {}
        setJoinedName(nameValue.trim());
        // Asegurar que no quede error global stale
        setLocalError(null);
      } else {
        // Si el backend reporta duplicado pero ya quedamos unidos, no mostrar error
        try {
          const already = localStorage.getItem(`${JOINED_PREFIX}${drawId}`);
          if (already === '1') {
            setLocalError(null);
            setSuccessMsg('Ya estás participando en este sorteo desde este navegador.');
            setJoined(true);
            const savedName = localStorage.getItem(`${JOINED_NAME_PREFIX}${drawId}`);
            if (savedName) setJoinedName(savedName);
            return;
          }
        } catch {}
        // En otros casos, usar el mensaje explícito retornado por join
        if (joinError) setLocalError(joinError);
      }
    } finally {
      joiningRef.current = false;
    }
  };

  const handleLeave = async (): Promise<boolean> => {
    try {
      let drawId: string | undefined = draw?.code;
      if (!drawId) {
        const alt = typeof window !== 'undefined' ? localStorage.getItem(LAST_JOINED_KEY) : null;
        drawId = alt ?? undefined;
      }
      if (!drawId) return false;
      const ok = await leave({ browserId: getBrowserId(), name: joinedName || undefined }, drawId);
      if (ok) {
        try {
          localStorage.removeItem(`${JOINED_PREFIX}${drawId}`);
          localStorage.removeItem(`${JOINED_NAME_PREFIX}${drawId}`);
          const lastId = localStorage.getItem(LAST_JOINED_KEY);
          if (lastId === drawId) localStorage.removeItem(LAST_JOINED_KEY);
        } catch {}
        setJoined(false);
        setJoinedName(null);
        setSuccessMsg(null);
        setLocalError(null);
        hasBeenInParticipantsRef.current = false;
        lastWinNonceRef.current = 0;
        // Desuscribir de actualizaciones de este sorteo y limpiar el estado para ocultar banners/ganadores
        setDrawId(null);
        setDraw(null as any);
        // Reset modal de ganadores
        setWinnerOpen(false);
      }
      return ok;
    } catch {
      return false;
    }
  };

  const closeWinnerModal = () => setWinnerOpen(false);

  return {
    // estado principal
    draw: draw as LiveDraw | null,
    loading,
    error,
    joined,
    restored,
    joinedName,
    successMsg,
    localError,
    // acciones
    handleJoin,
    handleLeave,
    // flags derivados
    canShowParticipants,
    // ganador modal
    winnerOpen,
    didWin,
    closeWinnerModal,
  } as const;
}
