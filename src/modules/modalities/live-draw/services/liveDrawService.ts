import { db } from "@/config/firebaseConfig";
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDoc, query, where, getDocs, onSnapshot, runTransaction } from "firebase/firestore";

export type Participant = { name: string; browserId?: string; [k: string]: unknown };

export type LiveDrawStatus = 'waiting' | 'running' | 'finished' | 'cancelled';

export type LiveDraw = {
  code: string;
  pin: number;
  creatorId?: string;
  name?: string;
  status?: LiveDrawStatus;
  participants?: Participant[];
  winners?: Participant[];
  // Evento de ganador actual (para disparar UI en clientes). "nonce" se incrementa en cada elección.
  currentWin?: { name: string; browserId?: string; nonce: number; at?: any };
  createdAt?: any;
};

// Genera un PIN de 6 dígitos con RNG criptográfico si está disponible
function generateRandomPin(): number {
  try {
    const arr = new Uint32Array(1);
    // Intentar usar Web Crypto si está disponible en el entorno
    if (typeof crypto !== 'undefined' && typeof (crypto as any).getRandomValues === 'function') {
      (crypto as any).getRandomValues(arr);
      return 100000 + (arr[0] % 900000);
    }
    // Fallback
    return Math.floor(100000 + Math.random() * 900000);
  } catch {
    return Math.floor(100000 + Math.random() * 900000);
  }
}

export async function createLiveDraw({ creatorId, name }: { creatorId: string; name: string }): Promise<string> {
  const drawsRef = collection(db, "live_draws");
  // Evitar múltiples sorteos activos (waiting/running) por el mismo usuario
  try {
    const activeQ = query(
      drawsRef,
      where("creatorId", "==", creatorId),
      where("status", "in", ["waiting", "running"]) as any
    );
    const activeSnap = await getDocs(activeQ);
    if (!activeSnap.empty) {
      throw new Error("Ya tienes un sorteo en vivo activo. Finalízalo antes de crear uno nuevo.");
    }
  } catch {
    const waitingQ = query(drawsRef, where("creatorId", "==", creatorId), where("status", "==", "waiting"));
    const runningQ = query(drawsRef, where("creatorId", "==", creatorId), where("status", "==", "running"));
    const [waitingSnap, runningSnap] = await Promise.all([getDocs(waitingQ), getDocs(runningQ)]);
    if (!waitingSnap.empty || !runningSnap.empty) {
      throw new Error("Ya tienes un sorteo en vivo activo. Finalízalo antes de crear uno nuevo.");
    }
  }

  // Reserva de PIN: colección 'pins' con id = PIN
  const pinsCol = collection(db, 'pins');
  const maxAttempts = 50;
  const drawId = await runTransaction(db, async (tx: any) => {
    let chosenPin: number | null = null;
    for (let i = 0; i < maxAttempts; i++) {
      const candidate = generateRandomPin();
      const pinRef = doc(pinsCol, String(candidate));
      const pinSnap = await tx.get(pinRef);
      if (!pinSnap.exists()) {
        // Reservar el PIN
        tx.set(pinRef, { reservedAt: serverTimestamp(), drawId: null });
        chosenPin = candidate;
        break;
      }
    }
    if (!chosenPin) {
      throw new Error('No se pudo generar un PIN único. Inténtalo nuevamente.');
    }
    // Crear el documento del sorteo con el PIN reservado
    const newDrawRef = doc(drawsRef);
    const payload = {
      creatorId,
      name,
      createdAt: serverTimestamp(),
      status: 'waiting' as LiveDrawStatus,
      code: newDrawRef.id,
      pin: chosenPin,
      participants: [] as Participant[],
      winners: [] as Participant[],
    };
    tx.set(newDrawRef as any, payload);
    // Asociar el drawId a la reserva
    const chosenPinRef = doc(pinsCol, String(chosenPin));
    tx.update(chosenPinRef as any, { drawId: newDrawRef.id });
    return newDrawRef.id as string;
  });
  return drawId;
}

// Buscar sorteo por PIN
export async function getLiveDrawByPin(pin: number): Promise<LiveDraw | null> {
  const drawsRef = collection(db, "live_draws");
  const q = query(drawsRef, where("pin", "==", pin));
  const querySnap = await getDocs(q);
  if (querySnap.empty) return null;
  return querySnap.docs[0].data() as LiveDraw;
}

export async function getLiveDraw(drawId: string): Promise<LiveDraw | null> {
  const drawRef = doc(db, "live_draws", drawId);
  const drawSnap = await getDoc(drawRef);
  return drawSnap.exists() ? (drawSnap.data() as LiveDraw) : null;
}

export async function addParticipant(drawId: string, participant: Participant): Promise<boolean> {
  const drawRef = doc(db, "live_draws", drawId);
  const success = await runTransaction(db, async (tx: { get: (ref: any) => Promise<any>; update: (ref: any, data: unknown) => void }) => {
    const snap = await tx.get(drawRef as any);
    if (!snap.exists()) {
      throw new Error("El sorteo no existe");
    }
    const data = snap.data() as LiveDraw;
    // Bloquear unirse si el sorteo no está en 'waiting'
    if (data.status && data.status !== 'waiting') {
      throw new Error("El sorteo no admite más participantes en su estado actual");
    }
    const current: Participant[] = data.participants || [];
    const trimmedName = (participant.name || '').trim();
    if (trimmedName.length === 0) {
      throw new Error('Debes ingresar un nombre válido');
    }
    const normalized = trimmedName.toLowerCase();
    const existsByName = current.some((p) => (p?.name || "").trim().toLowerCase() === normalized);
    const existsByBrowser = participant.browserId
      ? current.some((p) => (p?.browserId || "") === participant.browserId)
      : false;
    const exists = existsByName || existsByBrowser;
    if (exists) {
      throw new Error("Este nombre ya está registrado en este sorteo");
    }
    const updated = [...current, { ...participant, name: trimmedName }];
    tx.update(drawRef, { participants: updated });
    return true;
  });
  return success;
}

// Remover un participante del sorteo (por browserId y/o nombre)
export async function removeParticipant(drawId: string, identity: { browserId?: string; name?: string }): Promise<boolean> {
  const drawRef = doc(db, 'live_draws', drawId);
  const removed = await runTransaction(db, async (tx: { get: (ref: any) => Promise<any>; update: (ref: any, data: unknown) => void }) => {
    const snap = await tx.get(drawRef as any);
    if (!snap.exists()) throw new Error('El sorteo no existe');
    const data = snap.data() as LiveDraw;
    const current: Participant[] = data.participants || [];
    const normName = (identity.name || '').trim().toLowerCase();
    const beforeLen = current.length;
    const filtered = current.filter((p) => {
      const byBrowser = identity.browserId ? (p?.browserId || '') !== identity.browserId : true;
      const byName = identity.name ? ((p?.name || '').trim().toLowerCase() !== normName) : true;
      // Mantener solo los que NO coinciden con la identidad pasada
      return byBrowser && byName;
    });
    if (filtered.length === beforeLen) {
      // Nada que remover, no es error para UX
      return false;
    }
    tx.update(drawRef, { participants: filtered });
    return true;
  });
  return removed;
}

// Agregar un ganador al sorteo (persistente). Evita duplicados por browserId o nombre normalizado.
export async function addWinner(drawId: string, participant: Participant): Promise<boolean> {
  const drawRef = doc(db, 'live_draws', drawId);
  const added = await runTransaction(db, async (tx: { get: (ref: any) => Promise<any>; update: (ref: any, data: unknown) => void }) => {
    const snap = await tx.get(drawRef as any);
    if (!snap.exists()) throw new Error('El sorteo no existe');
    const data = snap.data() as LiveDraw;
    const winners: Participant[] = data.winners || [];
    const trimmedName = (participant.name || '').trim();
    if (trimmedName.length === 0) {
      throw new Error('No se puede elegir un ganador sin nombre');
    }
    const normName = trimmedName.toLowerCase();
    const already = winners.some((w) => {
      const byBrowser = participant.browserId ? (w?.browserId || '') === participant.browserId : false;
      const byName = ((w?.name || '').trim().toLowerCase() === normName);
      return byBrowser || byName;
    });
    // Calcular nonce incremental para el evento actual
    const prevNonce = (data as any)?.currentWin?.nonce || 0;
    const nextNonce = prevNonce + 1;
    // Actualizar winners si no existe aún (histórico sin duplicados)
    const payload: any = {
      currentWin: { name: trimmedName, browserId: participant.browserId, nonce: nextNonce, at: serverTimestamp() },
    };
    if (!already) {
      payload.winners = [...winners, { name: trimmedName, browserId: participant.browserId }];
    }
    tx.update(drawRef, payload);
    return true;
  });
  return added;
}

// Cancelar un sorteo: solo el creador puede cancelarlo; no se puede cancelar si ya está 'finished' o 'cancelled'
export async function cancelLiveDraw({ drawId, requesterId }: { drawId: string; requesterId: string }): Promise<void> {
  const drawRef = doc(db, 'live_draws', drawId);
  await runTransaction(db, async (tx: any) => {
    const snap = await tx.get(drawRef as any);
    if (!snap.exists()) throw new Error('El sorteo no existe');
    const data = snap.data() as LiveDraw & { creatorId?: string; status?: LiveDrawStatus };
    if (!data.creatorId || data.creatorId !== requesterId) {
      throw new Error('No tienes permisos para cancelar este sorteo');
    }
    if (data.status === 'finished' || data.status === 'cancelled') {
      throw new Error('El sorteo ya no puede ser cancelado');
    }
    tx.update(drawRef, { status: 'cancelled', cancelledAt: serverTimestamp() });
    // Liberar PIN reservado
    if (data.pin) {
      const pinRef = doc(db, 'pins', String(data.pin));
      tx.delete(pinRef as any);
    }
  });
}

// Cambiar estado del sorteo con validaciones de transición y permisos
export async function updateLiveDrawStatus({
  drawId,
  requesterId,
  nextStatus,
}: {
  drawId: string;
  requesterId: string;
  nextStatus: LiveDrawStatus;
}): Promise<void> {
  const drawRef = doc(db, 'live_draws', drawId);
  await runTransaction(db, async (tx: any) => {
    const snap = await tx.get(drawRef as any);
    if (!snap.exists()) throw new Error('El sorteo no existe');
    const data = snap.data() as LiveDraw & { creatorId?: string; status?: LiveDrawStatus };
    if (!data.creatorId || data.creatorId !== requesterId) {
      throw new Error('No tienes permisos para cambiar el estado de este sorteo');
    }
    const current = data.status || 'waiting';
    // Transiciones válidas: waiting -> running, running -> finished
    if (nextStatus === 'running' && current !== 'waiting') {
      throw new Error('Solo puedes iniciar un sorteo que está en espera');
    }
    if (nextStatus === 'finished' && current !== 'running') {
      throw new Error('Solo puedes finalizar un sorteo que está en curso');
    }
    if (nextStatus === 'cancelled') {
      throw new Error('Usa la operación de cancelación');
    }
    const payload: Record<string, unknown> = { status: nextStatus };
    if (nextStatus === 'running') payload.startedAt = serverTimestamp();
    if (nextStatus === 'finished') payload.finishedAt = serverTimestamp();
    tx.update(drawRef, payload);
    // Si se finaliza el sorteo, liberar el PIN
    if (nextStatus === 'finished' && (data as any).pin) {
      const pinRef = doc(db, 'pins', String((data as any).pin));
      tx.delete(pinRef as any);
    }
  });
}

// Suscribirse a un sorteo en tiempo real por id de documento
export function subscribeLiveDraw(
  drawId: string,
  callback: (draw: LiveDraw | null) => void
): () => void {
  const drawRef = doc(db, "live_draws", drawId);
  const unsubscribe = onSnapshot(drawRef as any, (snapshot: { exists: () => boolean; data: () => unknown }) => {
    if (snapshot.exists()) {
      callback(snapshot.data() as LiveDraw);
    } else {
      callback(null);
    }
  });
  return unsubscribe;
}

// Buscar sorteo activo (waiting/running) por creador
export async function findActiveDrawByCreator(creatorId: string): Promise<LiveDraw | null> {
  const drawsRef = collection(db, 'live_draws');
  try {
    const q = query(
      drawsRef,
      where('creatorId', '==', creatorId),
      where('status', 'in', ['waiting', 'running']) as any
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].data() as LiveDraw;
  } catch {
    const waitingQ = query(drawsRef, where('creatorId', '==', creatorId), where('status', '==', 'waiting'));
    const runningQ = query(drawsRef, where('creatorId', '==', creatorId), where('status', '==', 'running'));
    const [w, r] = await Promise.all([getDocs(waitingQ), getDocs(runningQ)]);
    const docSnap = !w.empty ? w.docs[0] : !r.empty ? r.docs[0] : null;
    return docSnap ? (docSnap.data() as LiveDraw) : null;
  }
}
