import { parseAllowedOrigins, subscribeMagaluAuthMessages } from './messages.js';
import type { MagaluAuthMessage } from './types.js';
import { buildGeraldoOAuthRedirectUri, buildMagaluAuthorizeUrl } from './urls.js';
import { openMagaluLoginWindow } from './window.js';

export type CreateGeraldoMagaluAuthOptions = {
  /** Valor fixo ou getter (ex.: estado reativo) lido em cada `openLogin`. */
  clientId: string | (() => string);
  scopes: readonly string[];
  /** CSV ou lista — mesma semântica que `parseAllowedOrigins`. */
  allowedOrigins: string | readonly string[];
  onMessage: (message: MagaluAuthMessage) => void;
  geraldoBaseUrl?: string;
  state?: string;
  chooseTenants?: boolean;
  /** Opções passadas a `openMagaluLoginWindow`. */
  openWindowOptions?: { windowName?: string; features?: string };
};

export type GeraldoMagaluAuthOpenLoginResult =
  | { ok: true; popup: Window }
  | { ok: false; reason: 'missing_client_id' }
  | { ok: false; reason: 'popup_blocked' };

export type GeraldoMagaluAuthController = {
  /** Mesmo `redirect_uri` usado no authorize (alinhar com o backend na troca do `code`). */
  readonly redirectUri: string;
  openLogin(): GeraldoMagaluAuthOpenLoginResult;
  dispose(): void;
};

function resolveClientId(clientId: string | (() => string)): string {
  const raw = typeof clientId === 'function' ? clientId() : clientId;
  return String(raw ?? '').trim();
}

/**
 * Orquestra subscribe `postMessage`, montagem da URL Magalu e abertura do popup.
 * Chame `dispose()` ao desmontar a app (remove o listener).
 */
export function createGeraldoMagaluAuth(
  options: CreateGeraldoMagaluAuthOptions
): GeraldoMagaluAuthController {
  const {
    clientId,
    scopes,
    allowedOrigins,
    onMessage,
    geraldoBaseUrl,
    state,
    chooseTenants,
    openWindowOptions,
  } = options;

  const allowed = parseAllowedOrigins(allowedOrigins);
  const redirectUri = buildGeraldoOAuthRedirectUri(geraldoBaseUrl);
  const unsub = subscribeMagaluAuthMessages(onMessage, { allowedOrigins: allowed });

  return {
    redirectUri,
    openLogin(): GeraldoMagaluAuthOpenLoginResult {
      const id = resolveClientId(clientId);
      if (!id) {
        return { ok: false, reason: 'missing_client_id' };
      }
      const url = buildMagaluAuthorizeUrl({
        clientId: id,
        redirectUri,
        scopes,
        state,
        chooseTenants,
      });
      const popup = openMagaluLoginWindow(url, openWindowOptions);
      if (!popup) {
        return { ok: false, reason: 'popup_blocked' };
      }
      return { ok: true, popup };
    },
    dispose(): void {
      unsub();
    },
  };
}
