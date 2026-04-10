import { html, render } from 'lit';
import '@aiqfome-sdk/themes/tokens.css';
import { defineGeraldoUI } from '@aiqfome-sdk/ui-lit';
import './styles.css';

defineGeraldoUI();

type OrderStatus = 'novo' | 'preparo' | 'entregue';

type Order = {
  id: string;
  cliente: string;
  loja: string;
  total: string;
  horario: string;
  status: OrderStatus;
};

const PEDIDOS: Order[] = [
  {
    id: '#4821',
    cliente: 'Monica Geller',
    loja: 'Central Perk',
    total: 'R$ 35,20',
    horario: '12:31',
    status: 'preparo',
  },
  {
    id: '#4820',
    cliente: 'Joey Tribbiani',
    loja: 'Pizza Napoli',
    total: 'R$ 89,90',
    horario: '12:18',
    status: 'novo',
  },
  {
    id: '#4819',
    cliente: 'Ross Geller',
    loja: 'Dino Burger',
    total: 'R$ 42,00',
    horario: '11:55',
    status: 'entregue',
  },
  {
    id: '#4818',
    cliente: 'Phoebe Buffay',
    loja: 'Smelly Cat Vegan',
    total: 'R$ 28,50',
    horario: '11:40',
    status: 'entregue',
  },
];

const state = {
  busca: '',
  ordenar: 'recente' as 'recente' | 'valor',
  somentePreparo: false,
  mostrarEntregues: true,
  selecionados: new Set<string>(),
};

function badgeTone(s: OrderStatus): 'info' | 'warning' | 'success' {
  if (s === 'novo') return 'info';
  if (s === 'preparo') return 'warning';
  return 'success';
}

function labelStatus(s: OrderStatus): string {
  if (s === 'novo') return 'Novo';
  if (s === 'preparo') return 'Em preparo';
  return 'Entregue';
}

function filtrarPedidos(): Order[] {
  let list = [...PEDIDOS];
  const q = state.busca.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.cliente.toLowerCase().includes(q) ||
        p.loja.toLowerCase().includes(q),
    );
  }
  if (state.somentePreparo) {
    list = list.filter((p) => p.status === 'preparo');
  }
  if (!state.mostrarEntregues) {
    list = list.filter((p) => p.status !== 'entregue');
  }
  if (state.ordenar === 'valor') {
    list.sort((a, b) => parseValor(b.total) - parseValor(a.total));
  }
  return list;
}

function parseValor(s: string): number {
  return Number(s.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
}

function todosSelecionadosNaLista(ids: string[]): boolean {
  return ids.length > 0 && ids.every((id) => state.selecionados.has(id));
}

function alternarSelecionarTodos(ids: string[]) {
  const all = todosSelecionadosNaLista(ids);
  if (all) {
    ids.forEach((id) => state.selecionados.delete(id));
  } else {
    ids.forEach((id) => state.selecionados.add(id));
  }
  ui();
}

function ui() {
  const lista = filtrarPedidos();
  const ids = lista.map((p) => p.id);

  render(
    html`
      <div class="shell">
        <header class="top">
          <div class="top__brand">
            <geraldo-text variant="h2-page" weight="bold">Pedidos</geraldo-text>
            <geraldo-text variant="secondary" weight="regular"
              >Exemplo aiqfome · Geraldo UI</geraldo-text
            >
          </div>
          <div class="top__actions">
            <geraldo-button variant="outline" color="secondary" size="sm" @click=${() => ui()}>
              Atualizar
            </geraldo-button>
            <geraldo-button variant="ghost" color="primary" size="sm" @click=${() => window.alert('Exportar (demo)')}>
              Exportar
            </geraldo-button>
            <geraldo-button variant="filled" color="primary" size="sm">
              <span slot="icon" class="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </span>
              Novo pedido
            </geraldo-button>
          </div>
        </header>

        <section class="toolbar">
          <geraldo-card radius="outer" elevation="low" class="toolbar__card">
            <div slot="header" class="toolbar__title">
              <geraldo-text variant="h4-paragraph" weight="bold">Filtros</geraldo-text>
              <geraldo-badge tone="developer">
                <span slot="icon" class="ico ico--sm" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path
                      d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
                    />
                  </svg>
                </span>
                Demo SDK
              </geraldo-badge>
            </div>

            <div class="toolbar__grid">
              <geraldo-text-field
                label="Buscar pedido, cliente ou loja"
                description="Campo de texto do design system."
                placeholder="Ex.: Monica, #4821…"
                .value=${state.busca}
                @geraldo-input=${(e: CustomEvent<{ value: string }>) => {
                  state.busca = e.detail.value;
                  ui();
                }}
              ></geraldo-text-field>

              <div class="field-block">
                <geraldo-text variant="secondary" weight="medium">Ordenar lista</geraldo-text>
                <geraldo-radio-group
                  name="ordenar"
                  .value=${state.ordenar}
                  @geraldo-change=${(e: CustomEvent<{ value: string }>) => {
                    state.ordenar = e.detail.value as typeof state.ordenar;
                    ui();
                  }}
                >
                  <geraldo-radio value="recente">Mais recentes primeiro</geraldo-radio>
                  <geraldo-radio value="valor">Maior valor primeiro</geraldo-radio>
                </geraldo-radio-group>
              </div>

              <div class="field-block field-block--row">
                <geraldo-switch
                  .checked=${state.somentePreparo}
                  @geraldo-change=${(e: CustomEvent<{ checked: boolean }>) => {
                    state.somentePreparo = e.detail.checked;
                    ui();
                  }}
                  >Somente em preparo</geraldo-switch
                >
              </div>

              <div class="field-block">
                <geraldo-checkbox
                  .checked=${state.mostrarEntregues}
                  @geraldo-change=${(e: CustomEvent<{ checked: boolean }>) => {
                    state.mostrarEntregues = e.detail.checked;
                    ui();
                  }}
                  >Mostrar pedidos entregues</geraldo-checkbox
                >
              </div>

              <div class="field-block field-block--row">
                <geraldo-checkbox
                  .checked=${todosSelecionadosNaLista(ids)}
                  @geraldo-change=${() => alternarSelecionarTodos(ids)}
                  >Selecionar todos (${lista.length})</geraldo-checkbox
                >
              </div>
            </div>

            <div slot="footer" class="toolbar__footer">
              <geraldo-text variant="apoio" weight="regular"
                >${lista.length} pedido(s) visíveis · ${state.selecionados.size} selecionado(s)</geraldo-text
              >
            </div>
          </geraldo-card>
        </section>

        <main class="lista">
          ${lista.length === 0
            ? html`
                <geraldo-card radius="outer" elevation="mid" class="empty">
                  <geraldo-text variant="h4-paragraph" weight="medium">Nenhum pedido encontrado</geraldo-text>
                  <geraldo-text variant="body" weight="regular"
                    >Ajuste a busca ou os filtros para ver resultados.</geraldo-text
                  >
                  <geraldo-button variant="outline" color="primary" @click=${() => {
                    state.busca = '';
                    state.somentePreparo = false;
                    state.mostrarEntregues = true;
                    ui();
                  }}
                    >Limpar filtros</geraldo-button
                  >
                </geraldo-card>
              `
            : lista.map(
                (p) => html`
                  <geraldo-card radius="outer" elevation="mid" class="pedido-card">
                    <div slot="header" class="pedido-card__head">
                      <div class="pedido-card__meta">
                        <geraldo-text variant="h4-paragraph" weight="bold">${p.id}</geraldo-text>
                        <geraldo-text variant="secondary" weight="regular">${p.horario} · ${p.loja}</geraldo-text>
                      </div>
                      <geraldo-badge tone=${badgeTone(p.status)}>${labelStatus(p.status)}</geraldo-badge>
                    </div>

                    <div class="pedido-card__body">
                      <geraldo-checkbox
                        .checked=${state.selecionados.has(p.id)}
                        @geraldo-change=${(e: CustomEvent<{ checked: boolean }>) => {
                          if (e.detail.checked) state.selecionados.add(p.id);
                          else state.selecionados.delete(p.id);
                          ui();
                        }}
                        >Selecionar para ações em lote</geraldo-checkbox
                      >

                      <geraldo-text variant="body" weight="medium">${p.cliente}</geraldo-text>
                      <geraldo-text variant="h3-section" weight="bold">${p.total}</geraldo-text>
                    </div>

                    <div slot="footer" class="pedido-card__foot">
                      <geraldo-button variant="outline" color="primary" size="sm" @click=${() => window.alert(`Detalhes ${p.id}`)}
                        >Ver detalhes</geraldo-button
                      >
                      <geraldo-button variant="filled" color="secondary" size="sm" @click=${() => window.alert(`Aceitar ${p.id}`)}
                        >Aceitar</geraldo-button
                      >
                    </div>
                  </geraldo-card>
                `,
              )}
        </main>
      </div>
    `,
    document.getElementById('app')!,
  );
}

ui();
