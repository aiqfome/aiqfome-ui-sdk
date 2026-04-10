import { html, render } from 'lit';
import '@aiqfome-org/geraldo-ui/tokens.css';
import { defineGeraldoUI } from '@aiqfome-org/geraldo-ui';
import {
  buildGeraldoOAuthRedirectUri,
  buildMagaluAuthorizeUrl,
  openMagaluLoginWindow,
  parseAllowedOrigins,
  subscribeMagaluAuthMessages,
} from '@aiqfome-org/geraldo-ui/auth';

import { extractOrderRows, fetchOrdersSearch, fetchStores, type StoreOption } from './api.js';
import './styles.css';

defineGeraldoUI();

const state: {
  token: string;
  stores: StoreOption[];
  storeId: string;
  ordersJson: unknown;
  orderRows: { title: string; subtitle?: string }[];
  loading: boolean;
  error: string;
  magaluClientId: string;
} = {
  token: String(import.meta.env.VITE_AIQFOME_ACCESS_TOKEN ?? '').trim(),
  stores: [],
  storeId: '',
  ordersJson: null,
  orderRows: [],
  loading: false,
  error: '',
  magaluClientId: String(import.meta.env.VITE_MAGALU_CLIENT_ID ?? '').trim(),
};

const postMessageOrigins = parseAllowedOrigins(
  String(
    import.meta.env.VITE_POSTMESSAGE_ORIGINS ??
      'https://geraldo-restaurantes.aiqfome.com,http://localhost:5180'
  )
);

let unsubAuth: (() => void) | undefined;

function ensureAuthListener(): void {
  if (unsubAuth) return;
  unsubAuth = subscribeMagaluAuthMessages(
    (msg) => {
      if (msg.kind === 'authCode') {
        state.error =
          'Code recebido: troca no teu backend (client_secret) e cola o access_token acima. Este demo nao tem servidor OAuth.';
        ui();
        return;
      }
      state.error = '';
      ui();
    },
    { allowedOrigins: postMessageOrigins }
  );
}

function openMagalu(): void {
  ensureAuthListener();
  if (!state.magaluClientId) {
    state.error = 'Define VITE_MAGALU_CLIENT_ID no .env para o popup Magalu.';
    ui();
    return;
  }
  const redirectUri = buildGeraldoOAuthRedirectUri();
  const url = buildMagaluAuthorizeUrl({
    clientId: state.magaluClientId,
    redirectUri,
    scopes: ['aqf:store:read', 'aqf:order:read'],
  });
  const w = openMagaluLoginWindow(url);
  if (!w) state.error = 'Popup bloqueado.';
  ui();
}

async function carregarLojas(): Promise<void> {
  state.error = '';
  state.loading = true;
  ui();
  try {
    if (!state.token.trim()) throw new Error('Indica o access token (Bearer) da API V2.');
    state.stores = await fetchStores(state.token.trim());
    if (state.stores.length && !state.storeId) state.storeId = state.stores[0].id;
  } catch (e) {
    state.error = e instanceof Error ? e.message : String(e);
    state.stores = [];
  } finally {
    state.loading = false;
    ui();
  }
}

async function carregarPedidos(): Promise<void> {
  state.error = '';
  state.loading = true;
  state.ordersJson = null;
  state.orderRows = [];
  ui();
  try {
    if (!state.token.trim()) throw new Error('Indica o access token.');
    if (!state.storeId.trim()) throw new Error('Escolhe uma loja.');
    const body = await fetchOrdersSearch(state.token.trim(), state.storeId.trim());
    state.ordersJson = body;
    state.orderRows = extractOrderRows(body);
  } catch (e) {
    state.error = e instanceof Error ? e.message : String(e);
  } finally {
    state.loading = false;
    ui();
  }
}

function ui(): void {
  const lojaBlock =
    state.stores.length > 0
      ? html`
          <label style="margin-top:1rem;display:block">
            Loja
            <select
              style="display:block;margin-top:0.35rem;padding:0.5rem;border-radius:8px;min-width:14rem;font:inherit"
              .value=${state.storeId}
              @change=${(e: Event) => {
                state.storeId = (e.target as HTMLSelectElement).value;
                ui();
              }}
            >
              ${state.stores.map((s) => html`<option value=${s.id}>${s.name} (${s.id})</option>`)}
            </select>
          </label>
          <div style="margin-top:0.75rem">
            <geraldo-button variant="filled" color="secondary" @click=${() => void carregarPedidos()}>
              Listar pedidos
            </geraldo-button>
          </div>
        `
      : null;

  const errBlock = state.error ? html`<p class="err">${state.error}</p>` : null;
  const loadingBlock = state.loading
    ? html`<geraldo-text variant="secondary">A carregar…</geraldo-text>`
    : null;

  let mainBlock;
  if (state.orderRows.length > 0) {
    mainBlock = state.orderRows.map((r) => {
      const sub = r.subtitle
        ? html`<geraldo-text variant="secondary" weight="regular">${r.subtitle}</geraldo-text>`
        : null;
      return html`
        <geraldo-card radius="outer" elevation="mid">
          <div slot="header" class="pedido-card__head">
            <geraldo-text variant="h4-paragraph" weight="bold">${r.title}</geraldo-text>
          </div>
          <div class="pedido-card__body">${sub}</div>
        </geraldo-card>
      `;
    });
  } else if (state.ordersJson && !state.loading) {
    mainBlock = html`
      <geraldo-card radius="outer" elevation="low">
        <geraldo-text variant="body" weight="regular">
          Resposta sem lista reconhecida — JSON bruto (ajusta extractOrderRows se preciso).
        </geraldo-text>
        <pre class="pre">${JSON.stringify(state.ordersJson, null, 2)}</pre>
      </geraldo-card>
    `;
  } else {
    mainBlock = html`
      <geraldo-text variant="secondary" weight="regular">
        Carrega lojas e depois "Listar pedidos", ou define VITE_AIQFOME_ACCESS_TOKEN no .env.
      </geraldo-text>
    `;
  }

  render(
    html`
      <div class="shell">
        <header class="top">
          <div>
            <geraldo-text variant="h2-page" weight="bold">Pedidos do lojista</geraldo-text>
            <geraldo-text variant="secondary" weight="regular">API V2 + Geraldo UI</geraldo-text>
          </div>
          <geraldo-button
            variant="outline"
            color="secondary"
            size="sm"
            ?disabled=${state.loading}
            @click=${() => void carregarPedidos()}
          >
            Atualizar pedidos
          </geraldo-button>
        </header>

        <geraldo-card radius="outer" elevation="low" class="token-card">
          <div slot="header">
            <geraldo-text variant="h4-paragraph" weight="bold">Acesso</geraldo-text>
          </div>
          <div class="token-card__row">
            <label>
              Access token (Bearer)
              <input
                type="password"
                autocomplete="off"
                placeholder="Token com aqf:store:read e aqf:order:read"
                .value=${state.token}
                @input=${(e: Event) => {
                  state.token = (e.target as HTMLInputElement).value;
                }}
              />
            </label>
            <geraldo-button variant="filled" color="primary" size="sm" @click=${() => void carregarLojas()}>
              Carregar lojas
            </geraldo-button>
            <geraldo-button variant="outline" color="primary" size="sm" @click=${() => openMagalu()}>
              Login Magalu (popup)
            </geraldo-button>
          </div>
          ${lojaBlock}
          ${errBlock}
          ${loadingBlock}
        </geraldo-card>

        <main class="pedido-list">${mainBlock}</main>
      </div>
    `,
    document.getElementById('app')!
  );
}

ui();
