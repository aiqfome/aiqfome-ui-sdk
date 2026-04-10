/**
 * Helpers **browser-only** para Magalu ID + Geraldo (OAuth `code` e `postMessage`).
 *
 * A troca `code` → tokens com `client_secret` fica no backend do parceiro.
 * Ver README do pacote (`./auth`) e o guia **Loja de APPs** / handshake no repositório de documentação de parceiros.
 */

export {
  DEFAULT_GERALDO_BASE_URL,
  GERALDO_OAUTH_CALLBACK_PATH,
  MAGALU_ID_LOGIN_BASE,
} from './constants.js';

export { buildGeraldoOAuthRedirectUri, buildMagaluAuthorizeUrl } from './urls.js';

export {
  isTrustedOrigin,
  parseAllowedOrigins,
  subscribeMagaluAuthMessages,
} from './messages.js';
export type { SubscribeMagaluAuthMessagesOptions } from './messages.js';

export { openMagaluLoginWindow } from './window.js';

export type {
  BuildMagaluAuthorizeUrlOptions,
  ExchangeMagaluTokenRequestBody,
  MagaluAuthCodeMessage,
  MagaluAuthDoneMessage,
  MagaluAuthMessage,
} from './types.js';
