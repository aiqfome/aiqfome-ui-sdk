import {
  DEFAULT_GERALDO_BASE_URL,
  GERALDO_OAUTH_CALLBACK_PATH,
  MAGALU_ID_LOGIN_BASE,
} from './constants.js';
import type { BuildMagaluAuthorizeUrlOptions } from './types.js';

/**
 * Monta o `redirect_uri` do Geraldo (produção por omissão).
 * O portal associa este URL automaticamente ao app; use o mesmo valor no authorize quando for o fluxo iframe.
 */
export function buildGeraldoOAuthRedirectUri(
  geraldoBaseUrl: string = DEFAULT_GERALDO_BASE_URL
): string {
  const base = geraldoBaseUrl.replace(/\/$/, '');
  return `${base}${GERALDO_OAUTH_CALLBACK_PATH}`;
}

/**
 * URL de abertura do Magalu ID (popup ou full page).
 * Parâmetros alinhados ao fluxo documentado para apps de marketplace no Geraldo.
 */
export function buildMagaluAuthorizeUrl(options: BuildMagaluAuthorizeUrlOptions): string {
  const {
    clientId,
    redirectUri,
    scopes,
    responseType = 'code',
    chooseTenants = true,
    state,
  } = options;

  const params = new URLSearchParams();
  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('scope', scopes.join(' '));
  params.set('response_type', responseType);
  if (chooseTenants) {
    params.set('choose_tenants', 'true');
  }
  if (state !== undefined && state !== '') {
    params.set('state', state);
  }

  const qs = params.toString();
  return `${MAGALU_ID_LOGIN_BASE}?${qs}`;
}
