import { useCallback, useMemo, useState } from 'react';
import type { GeraldoBadgeTone } from '@aiqfome-sdk/ui-react';
import {
  GeraldoBadge,
  GeraldoButton,
  GeraldoCard,
  GeraldoCheckbox,
  GeraldoRadio,
  GeraldoRadioGroup,
  GeraldoSwitch,
  GeraldoText,
  GeraldoTextField,
} from '@aiqfome-sdk/ui-react';

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

function badgeTone(s: OrderStatus): GeraldoBadgeTone {
  if (s === 'novo') return 'info';
  if (s === 'preparo') return 'warning';
  return 'success';
}

function labelStatus(s: OrderStatus): string {
  if (s === 'novo') return 'Novo';
  if (s === 'preparo') return 'Em preparo';
  return 'Entregue';
}

function parseValor(s: string): number {
  return Number(s.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
}

export function App() {
  const [busca, setBusca] = useState('');
  const [ordenar, setOrdenar] = useState<'recente' | 'valor'>('recente');
  const [somentePreparo, setSomentePreparo] = useState(false);
  const [mostrarEntregues, setMostrarEntregues] = useState(true);
  const [selecionados, setSelecionados] = useState<Set<string>>(() => new Set());
  const [, setViewBump] = useState(0);

  const lista = useMemo(() => {
    let list = [...PEDIDOS];
    const q = busca.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.cliente.toLowerCase().includes(q) ||
          p.loja.toLowerCase().includes(q),
      );
    }
    if (somentePreparo) {
      list = list.filter((p) => p.status === 'preparo');
    }
    if (!mostrarEntregues) {
      list = list.filter((p) => p.status !== 'entregue');
    }
    if (ordenar === 'valor') {
      list.sort((a, b) => parseValor(b.total) - parseValor(a.total));
    }
    return list;
  }, [busca, ordenar, somentePreparo, mostrarEntregues]);

  const ids = useMemo(() => lista.map((p) => p.id), [lista]);

  const todosSelecionadosNaLista = useCallback(
    () => ids.length > 0 && ids.every((id) => selecionados.has(id)),
    [ids, selecionados],
  );

  const alternarSelecionarTodos = useCallback(() => {
    const all = todosSelecionadosNaLista();
    setSelecionados((prev) => {
      const next = new Set(prev);
      if (all) {
        ids.forEach((id) => next.delete(id));
      } else {
        ids.forEach((id) => next.add(id));
      }
      return next;
    });
  }, [ids, todosSelecionadosNaLista]);

  const limparFiltros = useCallback(() => {
    setBusca('');
    setSomentePreparo(false);
    setMostrarEntregues(true);
  }, []);

  const onTextFieldInput = useCallback((e: Event) => {
    const detail = (e as CustomEvent<{ value: string }>).detail;
    setBusca(detail.value);
  }, []);

  const onOrdenarChange = useCallback((e: Event) => {
    const value = (e as CustomEvent<{ value: string }>).detail.value as 'recente' | 'valor';
    setOrdenar(value);
  }, []);

  const onSomentePreparoChange = useCallback((e: Event) => {
    setSomentePreparo((e as CustomEvent<{ checked: boolean }>).detail.checked);
  }, []);

  const onMostrarEntreguesChange = useCallback((e: Event) => {
    setMostrarEntregues((e as CustomEvent<{ checked: boolean }>).detail.checked);
  }, []);

  const togglePedidoSelecionado = useCallback((id: string, checked: boolean) => {
    setSelecionados((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return (
    <div className="shell">
      <header className="top">
        <div className="top__brand">
          <GeraldoText variant="h2-page" weight="bold">
            Pedidos
          </GeraldoText>
          <GeraldoText variant="secondary" weight="regular">
            Exemplo aiqfome · Geraldo UI · React 19
          </GeraldoText>
        </div>
        <div className="top__actions">
          <GeraldoButton
            variant="outline"
            color="secondary"
            size="sm"
            onClick={() => setViewBump((n) => n + 1)}
          >
            Atualizar
          </GeraldoButton>
          <GeraldoButton
            variant="ghost"
            color="primary"
            size="sm"
            onClick={() => window.alert('Exportar (demo)')}
          >
            Exportar
          </GeraldoButton>
          <GeraldoButton variant="filled" color="primary" size="sm">
            <span slot="icon" className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </span>
            Novo pedido
          </GeraldoButton>
        </div>
      </header>

      <section className="toolbar">
        <GeraldoCard radius="outer" elevation="low" className="toolbar__card">
          <div slot="header" className="toolbar__title">
            <GeraldoText variant="h4-paragraph" weight="bold">
              Filtros
            </GeraldoText>
            <GeraldoBadge tone="developer">
              <span slot="icon" className="ico ico--sm" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                </svg>
              </span>
              Demo SDK
            </GeraldoBadge>
          </div>

          <div className="toolbar__grid">
            <GeraldoTextField
              label="Buscar pedido, cliente ou loja"
              description="Campo de texto do design system."
              placeholder="Ex.: Monica, #4821…"
              value={busca}
              onGeraldoInput={onTextFieldInput}
            />

            <div className="field-block">
              <GeraldoText variant="secondary" weight="medium">
                Ordenar lista
              </GeraldoText>
              <GeraldoRadioGroup name="ordenar" value={ordenar} onGeraldoChange={onOrdenarChange}>
                <GeraldoRadio value="recente">Mais recentes primeiro</GeraldoRadio>
                <GeraldoRadio value="valor">Maior valor primeiro</GeraldoRadio>
              </GeraldoRadioGroup>
            </div>

            <div className="field-block field-block--row">
              <GeraldoSwitch checked={somentePreparo} onGeraldoChange={onSomentePreparoChange}>
                Somente em preparo
              </GeraldoSwitch>
            </div>

            <div className="field-block">
              <GeraldoCheckbox checked={mostrarEntregues} onGeraldoChange={onMostrarEntreguesChange}>
                Mostrar pedidos entregues
              </GeraldoCheckbox>
            </div>

            <div className="field-block field-block--row">
              <GeraldoCheckbox
                checked={todosSelecionadosNaLista()}
                onGeraldoChange={alternarSelecionarTodos}
              >
                Selecionar todos ({lista.length})
              </GeraldoCheckbox>
            </div>
          </div>

          <div slot="footer" className="toolbar__footer">
            <GeraldoText variant="apoio" weight="regular">
              {lista.length} pedido(s) visíveis · {selecionados.size} selecionado(s)
            </GeraldoText>
          </div>
        </GeraldoCard>
      </section>

      <main className="lista">
        {lista.length === 0 ? (
          <GeraldoCard radius="outer" elevation="mid" className="empty">
            <GeraldoText variant="h4-paragraph" weight="medium">
              Nenhum pedido encontrado
            </GeraldoText>
            <GeraldoText variant="body" weight="regular">
              Ajuste a busca ou os filtros para ver resultados.
            </GeraldoText>
            <GeraldoButton variant="outline" color="primary" onClick={limparFiltros}>
              Limpar filtros
            </GeraldoButton>
          </GeraldoCard>
        ) : (
          lista.map((p) => (
            <GeraldoCard key={p.id} radius="outer" elevation="mid" className="pedido-card">
              <div slot="header" className="pedido-card__head">
                <div className="pedido-card__meta">
                  <GeraldoText variant="h4-paragraph" weight="bold">
                    {p.id}
                  </GeraldoText>
                  <GeraldoText variant="secondary" weight="regular">
                    {p.horario} · {p.loja}
                  </GeraldoText>
                </div>
                <GeraldoBadge tone={badgeTone(p.status)}>{labelStatus(p.status)}</GeraldoBadge>
              </div>

              <div className="pedido-card__body">
                <GeraldoCheckbox
                  checked={selecionados.has(p.id)}
                  onGeraldoChange={(e: Event) =>
                    togglePedidoSelecionado(p.id, (e as CustomEvent<{ checked: boolean }>).detail.checked)
                  }
                >
                  Selecionar para ações em lote
                </GeraldoCheckbox>

                <GeraldoText variant="body" weight="medium">
                  {p.cliente}
                </GeraldoText>
                <GeraldoText variant="h3-section" weight="bold">
                  {p.total}
                </GeraldoText>
              </div>

              <div slot="footer" className="pedido-card__foot">
                <GeraldoButton
                  variant="outline"
                  color="primary"
                  size="sm"
                  onClick={() => window.alert(`Detalhes ${p.id}`)}
                >
                  Ver detalhes
                </GeraldoButton>
                <GeraldoButton
                  variant="filled"
                  color="secondary"
                  size="sm"
                  onClick={() => window.alert(`Aceitar ${p.id}`)}
                >
                  Aceitar
                </GeraldoButton>
              </div>
            </GeraldoCard>
          ))
        )}
      </main>
    </div>
  );
}
