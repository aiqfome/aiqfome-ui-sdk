import { useCallback, useId, useMemo, useState } from 'react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter } from './components/ui/card';
import { Checkbox } from './components/ui/checkbox';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Switch } from './components/ui/switch';

type OrderStatus = 'novo' | 'preparo' | 'entregue';

type OrderBadgeTone = 'info' | 'warning' | 'success';

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

function badgeTone(s: OrderStatus): OrderBadgeTone {
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
  const buscaId = useId();
  const ordenarRecenteId = useId();
  const ordenarValorId = useId();
  const switchPreparoId = useId();
  const checkEntreguesId = useId();
  const checkTodosId = useId();

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

  const togglePedidoSelecionado = useCallback((id: string, checked: boolean) => {
    setSelecionados((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-geraldo-7 px-geraldo-5 pb-geraldo-12 pt-geraldo-8">
      <header className="flex flex-wrap items-end justify-between gap-geraldo-5">
        <div className="flex flex-col gap-geraldo-2">
          <h1 className="text-[length:var(--geraldo-text-h2-size)] font-bold leading-[var(--geraldo-text-h2-line)] text-foreground">
            Pedidos
          </h1>
          <p className="text-sm text-muted-foreground">
            Exemplo aiqfome · Tailwind v4 + @aiqfome-sdk/themes · Radix + CVA (estilo shadcn)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-geraldo-3">
          <Button
            type="button"
            variant="outline"
            color="secondary"
            size="sm"
            onClick={() => setViewBump((n) => n + 1)}
          >
            Atualizar
          </Button>
          <Button
            type="button"
            variant="ghost"
            color="primary"
            size="sm"
            onClick={() => window.alert('Exportar (demo)')}
          >
            Exportar
          </Button>
          <Button type="button" variant="filled" color="primary" size="sm">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Novo pedido
          </Button>
        </div>
      </header>

      <section>
        <Card className="w-full shadow-md">
          <div className="p-geraldo-5 pb-0">
            <div className="mb-geraldo-4 flex flex-wrap items-center gap-geraldo-3">
              <h2 className="text-[length:var(--geraldo-text-h4-size)] font-bold leading-[var(--geraldo-text-h4-line)]">
                Filtros
              </h2>
              <Badge tone="developer" className="gap-geraldo-2">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                </svg>
                Demo SDK
              </Badge>
            </div>
          </div>

          <CardContent className="flex flex-col gap-geraldo-5">
            <div className="flex flex-col gap-geraldo-2">
              <Label htmlFor={buscaId}>Buscar pedido, cliente ou loja</Label>
              <Input
                id={buscaId}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Ex.: Monica, #4821…"
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground">Campo de texto alinhado aos tokens Geraldo.</p>
            </div>

            <div className="flex flex-col gap-geraldo-2">
              <span className="text-sm font-medium text-foreground">Ordenar lista</span>
              <RadioGroup value={ordenar} onValueChange={(v) => setOrdenar(v as 'recente' | 'valor')}>
                <div className="flex items-center gap-geraldo-3">
                  <RadioGroupItem value="recente" id={ordenarRecenteId} />
                  <Label htmlFor={ordenarRecenteId} className="font-normal">
                    Mais recentes primeiro
                  </Label>
                </div>
                <div className="flex items-center gap-geraldo-3">
                  <RadioGroupItem value="valor" id={ordenarValorId} />
                  <Label htmlFor={ordenarValorId} className="font-normal">
                    Maior valor primeiro
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center gap-geraldo-3">
              <Switch
                id={switchPreparoId}
                checked={somentePreparo}
                onCheckedChange={(c) => setSomentePreparo(c === true)}
              />
              <Label htmlFor={switchPreparoId} className="font-normal">
                Somente em preparo
              </Label>
            </div>

            <div className="flex items-center gap-geraldo-3">
              <Checkbox
                id={checkEntreguesId}
                checked={mostrarEntregues}
                onCheckedChange={(c) => setMostrarEntregues(c === true)}
              />
              <Label htmlFor={checkEntreguesId} className="font-normal">
                Mostrar pedidos entregues
              </Label>
            </div>

            <div className="flex items-center gap-geraldo-3">
              <Checkbox
                id={checkTodosId}
                checked={todosSelecionadosNaLista()}
                onCheckedChange={() => alternarSelecionarTodos()}
              />
              <Label htmlFor={checkTodosId} className="font-normal">
                Selecionar todos ({lista.length})
              </Label>
            </div>
          </CardContent>

          <CardFooter className="mt-geraldo-5 flex-col items-stretch border-t pt-geraldo-4">
            <p className="text-xs text-muted-foreground">
              {lista.length} pedido(s) visíveis · {selecionados.size} selecionado(s)
            </p>
          </CardFooter>
        </Card>
      </section>

      <main className="flex flex-col gap-geraldo-5">
        {lista.length === 0 ? (
          <Card className="flex flex-col items-start gap-geraldo-4 p-geraldo-6 text-left shadow-md">
            <h2 className="text-[length:var(--geraldo-text-h4-size)] font-medium leading-[var(--geraldo-text-h4-line)]">
              Nenhum pedido encontrado
            </h2>
            <p className="text-base text-foreground">Ajuste a busca ou os filtros para ver resultados.</p>
            <Button type="button" variant="outline" color="primary" onClick={limparFiltros}>
              Limpar filtros
            </Button>
          </Card>
        ) : (
          lista.map((p) => (
            <PedidoCard
              key={p.id}
              pedido={p}
              selecionado={selecionados.has(p.id)}
              onSelecionar={(checked) => togglePedidoSelecionado(p.id, checked)}
            />
          ))
        )}
      </main>
    </div>
  );
}

function PedidoCard({
  pedido: p,
  selecionado,
  onSelecionar,
}: {
  pedido: Order;
  selecionado: boolean;
  onSelecionar: (checked: boolean) => void;
}) {
  const checkId = useId();
  return (
    <Card className="block w-full shadow-md">
      <div className="p-geraldo-5 pb-0">
        <div className="mb-geraldo-4 flex flex-wrap items-start justify-between gap-geraldo-3">
          <div className="flex flex-col gap-geraldo-1">
            <h2 className="text-[length:var(--geraldo-text-h4-size)] font-bold leading-[var(--geraldo-text-h4-line)]">
              {p.id}
            </h2>
            <p className="text-sm text-muted-foreground">
              {p.horario} · {p.loja}
            </p>
          </div>
          <Badge tone={badgeTone(p.status)}>{labelStatus(p.status)}</Badge>
        </div>
      </div>

      <CardContent className="flex flex-col gap-geraldo-3">
        <div className="flex items-center gap-geraldo-3">
          <Checkbox
            id={checkId}
            checked={selecionado}
            onCheckedChange={(c) => onSelecionar(c === true)}
          />
          <Label htmlFor={checkId} className="font-normal">
            Selecionar para ações em lote
          </Label>
        </div>

        <p className="text-base font-medium text-foreground">{p.cliente}</p>
        <p className="text-[length:var(--geraldo-text-h3-size)] font-bold leading-[var(--geraldo-text-h3-line)]">
          {p.total}
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-geraldo-3">
        <Button
          type="button"
          variant="outline"
          color="primary"
          size="sm"
          onClick={() => window.alert(`Detalhes ${p.id}`)}
        >
          Ver detalhes
        </Button>
        <Button
          type="button"
          variant="filled"
          color="secondary"
          size="sm"
          onClick={() => window.alert(`Aceitar ${p.id}`)}
        >
          Aceitar
        </Button>
      </CardFooter>
    </Card>
  );
}
