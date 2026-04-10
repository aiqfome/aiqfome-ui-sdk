import { afterEach, describe, expect, it, vi } from 'vitest';

import { parseAllowedOrigins, subscribeMagaluAuthMessages } from './messages.js';

describe('parseAllowedOrigins', () => {
  it('divide string CSV', () => {
    expect(parseAllowedOrigins(' https://a.com , https://b.com ')).toEqual([
      'https://a.com',
      'https://b.com',
    ]);
  });

  it('aceita array', () => {
    expect(parseAllowedOrigins(['https://a.com'])).toEqual(['https://a.com']);
  });
});

describe('subscribeMagaluAuthMessages', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('ignora origem não permitida', () => {
    const handler = vi.fn();
    const unsub = subscribeMagaluAuthMessages(handler, {
      allowedOrigins: ['https://allowed.example'],
    });

    window.dispatchEvent(
      new MessageEvent('message', {
        origin: 'https://evil.example',
        data: { type: 'authCode', code: 'abc' },
      })
    );

    expect(handler).not.toHaveBeenCalled();
    unsub();
  });

  it('entrega authCode quando a origem é permitida', () => {
    const handler = vi.fn();
    const unsub = subscribeMagaluAuthMessages(handler, {
      allowedOrigins: ['https://geraldo-restaurantes.aiqfome.com'],
    });

    window.dispatchEvent(
      new MessageEvent('message', {
        origin: 'https://geraldo-restaurantes.aiqfome.com',
        data: { type: 'authCode', code: 'the-code', oauthState: 'st' },
      })
    );

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0]).toMatchObject({
      kind: 'authCode',
      code: 'the-code',
      oauthState: 'st',
    });
    unsub();
  });

  it('entrega magaluAuthDone', () => {
    const handler = vi.fn();
    const unsub = subscribeMagaluAuthMessages(handler, {
      allowedOrigins: ['http://localhost:3000'],
    });

    window.dispatchEvent(
      new MessageEvent('message', {
        origin: 'http://localhost:3000',
        data: { type: 'magaluAuthDone' },
      })
    );

    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ kind: 'magaluAuthDone' })
    );
    unsub();
  });
});
