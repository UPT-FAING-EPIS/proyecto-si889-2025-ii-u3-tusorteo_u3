// Claves y utilidades centralizadas para localStorage relacionadas a Live Draw

export const LAST_JOINED_KEY = "ts_last_joined_drawId";
export const JOINED_PREFIX = "ts_joined_";
export const JOINED_NAME_PREFIX = "ts_joined_name_";
export const BROWSER_ID_KEY = "ts_browser_id";

// Genera o recupera un identificador persistente para este navegador.
// Se utiliza para limitar que un mismo navegador se una más de una vez al mismo sorteo.
export function getBrowserId(): string {
  try {
    let id: string | null = localStorage.getItem(BROWSER_ID_KEY);
    if (!id) {
      id = (typeof crypto !== "undefined" && (crypto as any)?.randomUUID)
        ? (crypto as any).randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(BROWSER_ID_KEY, id as string);
    }
    return id as string;
  } catch {
    // Si localStorage no está disponible, devolvemos un id efímero
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
