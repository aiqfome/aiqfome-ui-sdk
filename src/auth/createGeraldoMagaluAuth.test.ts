import { afterEach, describe, expect, it, vi } from 'vitest';

import { createGeraldoMagaluAuth } from './createGeraldoMagaluAuth.js';
import { DEFAULT_GERALDO_BASE_URL, GERALDO_OAUTH_CALLBACK_PATH } from './constants.js';

describe('createGeraldoMagaluAuth', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('entrega mensagens até dispose e ignora depois', () => {
    const onMessage = vi.fn();
    const ctrl = createGeraldoMagaluAuth({
      clientId: 'cid',
      scopes: ['aqf:store:read'],
      allowedOrigins: ['https://geraldo-restaurantes.aiqfome.com'],
      onMessage,
    });

    window.dispatchEvent(
      new MessageEvent('message', {
        origin: 'https://geraldo-restaurantes.aiqfome.com',
        data: { type: 'authCode', code: 'abc' },
      })
    );
    expect(onMessage).toHaveBeenCalledTimes(1);

    ctrl.dispose();

    window.dispatchEvent(
      new MessageEvent('message', {
        origin: 'https://geraldo-restaurantes.aiqfome.com',
        data: { type: 'authCode', code: 'after' },
      })
    );
    expect(onMessage).toHaveBeenCalledTimes(1);
  });

  it('openLogin com clientId vazio → missing_client_id', () => {
    const ctrl = createGeraldoMagaluAuth({
      clientId: '   ',
      scopes: ['aqf:store:read'],
      allowedOrigins: ['https://geraldo-restaurantes.aiqfome.com'],
      onMessage: vi.fn(),
    });
    expect(ctrl.openLogin()).toEqual({ ok: false, reason: 'missing_client_id' });
    ctrl.dispose();
  });

  it('openLogin com getter que devolve vazio → missing_client_id', () => {
    const ctrl = createGeraldoMagaluAuth({
      clientId: () => '',
      scopes: ['aqf:store:read'],
      allowedOrigins: ['https://geraldo-restaurantes.aiqfome.com'],
      onMessage: vi.fn(),
    });
    expect(ctrl.openLogin()).toEqual({ ok: false, reason: 'missing_client_id' });
    ctrl.dispose();
  });

  it('openLogin quando popup bloqueado → popup_blocked', () => {
    vi.spyOn(window, 'open').mockReturnValue(null);
    const ctrl = createGeraldoMagaluAuth({
      clientId: 'my-client',
      scopes: ['aqf:store:read'],
      allowedOrigins: ['https://geraldo-restaurantes.aiqfome.com'],
      onMessage: vi.fn(),
    });
    expect(ctrl.openLogin()).toEqual({ ok: false, reason: 'popup_blocked' });
    ctrl.dispose();
  });

  it('openLogin ok e URL contém client_id e redirect_uri', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue({} as Window);
    const ctrl = createGeraldoMagaluAuth({
      clientId: () => 'getter-id',
      scopes: ['aqf:store:read', 'aqf:order:read'],
      allowedOrigins: 'https://geraldo-restaurantes.aiqfome.com',
      onMessage: vi.fn(),
    });

    const expectedRedirect = `${DEFAULT_GERALDO_BASE_URL.replace(/\/$/, '')}${GERALDO_OAUTH_CALLBACK_PATH}`;
    expect(ctrl.redirectUri).toBe(expectedRedirect);

    const result = ctrl.openLogin();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.popup).toBeDefined();
    }

    expect(openSpy).toHaveBeenCalledTimes(1);
    const url = String(openSpy.mock.calls[0][0]);
    expect(url).toContain('client_id=getter-id');
    expect(url).toContain(`redirect_uri=${encodeURIComponent(expectedRedirect)}`);
    // URLSearchParams usa `+` entre escopos no query string
    expect(url).toContain('scope=aqf%3Astore%3Aread+aqf%3Aorder%3Aread');

    ctrl.dispose();
  });
});
