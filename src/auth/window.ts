/**
 * Abre popup do Magalu ID. Pode devolver `null` se o browser bloquear popups.
 */
export function openMagaluLoginWindow(
  authorizeUrl: string,
  options?: { windowName?: string; features?: string }
): Window | null {
  return window.open(
    authorizeUrl,
    options?.windowName ?? 'magaluLogin',
    options?.features ?? 'width=600,height=600'
  );
}
