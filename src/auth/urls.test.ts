import { describe, expect, it } from 'vitest';

import { DEFAULT_GERALDO_BASE_URL } from './constants.js';
import { buildGeraldoOAuthRedirectUri, buildMagaluAuthorizeUrl } from './urls.js';

describe('buildGeraldoOAuthRedirectUri', () => {
  it('usa base de produção por omissão', () => {
    expect(buildGeraldoOAuthRedirectUri()).toBe(
      `${DEFAULT_GERALDO_BASE_URL}/apps-e-integracoes/auth/callback`
    );
  });

  it('remove barra final da base', () => {
    expect(buildGeraldoOAuthRedirectUri('https://example.com/')).toBe(
      'https://example.com/apps-e-integracoes/auth/callback'
    );
  });
});

describe('buildMagaluAuthorizeUrl', () => {
  it('monta query com escopos e choose_tenants', () => {
    const url = buildMagaluAuthorizeUrl({
      clientId: 'cid',
      redirectUri: 'https://geraldo-restaurantes.aiqfome.com/apps-e-integracoes/auth/callback',
      scopes: ['aqf:store:read', 'aqf:order:read'],
    });
    expect(url.startsWith('https://id.magalu.com/login/?')).toBe(true);
    const u = new URL(url);
    expect(u.searchParams.get('client_id')).toBe('cid');
    expect(u.searchParams.get('response_type')).toBe('code');
    expect(u.searchParams.get('choose_tenants')).toBe('true');
    expect(u.searchParams.get('scope')).toBe('aqf:store:read aqf:order:read');
    expect(u.searchParams.get('redirect_uri')).toBe(
      'https://geraldo-restaurantes.aiqfome.com/apps-e-integracoes/auth/callback'
    );
  });

  it('permite omitir choose_tenants', () => {
    const url = buildMagaluAuthorizeUrl({
      clientId: 'cid',
      redirectUri: 'http://localhost:3000/cb',
      scopes: ['aqf:store:read'],
      chooseTenants: false,
    });
    const u = new URL(url);
    expect(u.searchParams.get('choose_tenants')).toBeNull();
  });

  it('inclui state quando informado', () => {
    const url = buildMagaluAuthorizeUrl({
      clientId: 'cid',
      redirectUri: 'http://localhost/cb',
      scopes: ['s'],
      state: 'xyz',
    });
    expect(new URL(url).searchParams.get('state')).toBe('xyz');
  });
});
