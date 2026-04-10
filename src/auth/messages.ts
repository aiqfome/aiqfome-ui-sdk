import type { MagaluAuthMessage } from './types.js';

/**
 * Normaliza lista de origens permitidas para `postMessage` (ex.: variável de ambiente CSV).
 */
export function parseAllowedOrigins(input: string | readonly string[]): string[] {
  if (typeof input === 'string') {
    return input
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
  }
  return [...input].map((o) => o.trim()).filter(Boolean);
}

export function isTrustedOrigin(origin: string, allowedOrigins: readonly string[]): boolean {
  return allowedOrigins.includes(origin);
}

export type SubscribeMagaluAuthMessagesOptions = {
  /** Origens aceites (ex.: `https://geraldo-restaurantes.aiqfome.com` e `http://localhost:3000`). */
  allowedOrigins: readonly string[];
};

/**
 * Escuta mensagens do Geraldo / popup: `authCode` e `magaluAuthDone`.
 * Desinscreve com a função devolvida (ex.: no `onUnmount`).
 */
export function subscribeMagaluAuthMessages(
  handler: (message: MagaluAuthMessage) => void,
  options: SubscribeMagaluAuthMessagesOptions
): () => void {
  const { allowedOrigins } = options;

  const listener = (event: MessageEvent): void => {
    if (!isTrustedOrigin(event.origin, allowedOrigins)) {
      return;
    }

    const data = event.data as Record<string, unknown> | null;
    if (!data || typeof data !== 'object') {
      return;
    }

    const type = data.type;
    if (type === 'authCode' && typeof data.code === 'string') {
      handler({
        kind: 'authCode',
        code: data.code,
        oauthState: typeof data.oauthState === 'string' ? data.oauthState : undefined,
        sourceEvent: event,
      });
      return;
    }

    if (type === 'magaluAuthDone') {
      handler({ kind: 'magaluAuthDone', sourceEvent: event });
    }
  };

  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
}
