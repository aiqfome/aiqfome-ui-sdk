/** Payload recebido via `postMessage` após o fluxo no iframe Geraldo. */
export type MagaluAuthCodeMessage = {
  kind: 'authCode';
  code: string;
  oauthState?: string;
  sourceEvent: MessageEvent;
};

/** Popup local concluiu redirect (fluxo dev sem depender só de `authCode`). */
export type MagaluAuthDoneMessage = {
  kind: 'magaluAuthDone';
  sourceEvent: MessageEvent;
};

export type MagaluAuthMessage = MagaluAuthCodeMessage | MagaluAuthDoneMessage;

export type BuildMagaluAuthorizeUrlOptions = {
  clientId: string;
  /** Deve ser exatamente um dos redirects válidos do app (o cadastrado pelo parceiro ou o do Geraldo). */
  redirectUri: string;
  /** Escopos Magalu / AIQFOME (ex.: `aqf:store:read`). */
  scopes: readonly string[];
  responseType?: 'code';
  /** Padrão `true` quando omitido (portal lojista multi-tenant). */
  chooseTenants?: boolean;
  state?: string;
};

/**
 * Corpo típico enviado ao **backend** do parceiro para trocar `code` por tokens.
 * O SDK não faz essa chamada (não use `client_secret` no browser).
 */
export type ExchangeMagaluTokenRequestBody = {
  code: string;
  redirectUri: string;
  oauthState?: string;
};
