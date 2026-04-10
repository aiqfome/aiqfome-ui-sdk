/** Respostas da API V2 variam por recurso; extraímos listas comuns. */

export type StoreOption = { id: string; name: string };

function pickString(v: unknown): string | undefined {
  if (typeof v === 'string' && v.trim()) return v;
  return undefined;
}

function normalizeStores(body: unknown): StoreOption[] {
  const raw =
    body && typeof body === 'object' && 'data' in body && Array.isArray((body as { data: unknown }).data)
      ? (body as { data: unknown[] }).data
      : Array.isArray(body)
        ? body
        : [];

  const out: StoreOption[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;
    const id = pickString(o.id) ?? pickString(o.store_id) ?? pickString(o.external_id);
    const name =
      pickString(o.name) ??
      pickString(o.title) ??
      pickString(o.displayName) ??
      (id ? `Loja ${id}` : undefined);
    if (id && name) out.push({ id, name });
  }
  return out;
}

export async function fetchStores(accessToken: string): Promise<StoreOption[]> {
  const res = await fetch(`${window.location.origin}/api/plataforma/api/v2/store`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Resposta não-JSON (${res.status}): ${text.slice(0, 200)}`);
  }
  if (!res.ok) {
    const msg =
      body && typeof body === 'object' && 'message' in body
        ? String((body as { message: unknown }).message)
        : text.slice(0, 200);
    throw new Error(`GET store falhou (${res.status}): ${msg}`);
  }
  return normalizeStores(body);
}

export async function fetchOrdersSearch(
  accessToken: string,
  storeId: string
): Promise<unknown> {
  const url = new URL(`${window.location.origin}/api/aiqfome/api/v2/orders/search`);
  url.searchParams.set('store_id', storeId);
  url.searchParams.set('limit', '50');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Resposta não-JSON (${res.status}): ${text.slice(0, 200)}`);
  }
  if (!res.ok) {
    const msg =
      body && typeof body === 'object' && 'message' in body
        ? String((body as { message: unknown }).message)
        : text.slice(0, 200);
    throw new Error(`GET orders/search falhou (${res.status}): ${msg}`);
  }
  return body;
}

/** Extrai linhas para a UI a partir do JSON de orders/search. */
export function extractOrderRows(body: unknown): { title: string; subtitle?: string }[] {
  const rows: { title: string; subtitle?: string }[] = [];
  const list =
    body && typeof body === 'object' && 'data' in body && Array.isArray((body as { data: unknown }).data)
      ? (body as { data: unknown[] }).data
      : body && typeof body === 'object' && 'orders' in body && Array.isArray((body as { orders: unknown }).orders)
        ? (body as { orders: unknown[] }).orders
        : Array.isArray(body)
          ? body
          : [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;
    const id = pickString(o.id) ?? pickString(o.uuid) ?? pickString(o.order_id);
    const title = id ? `Pedido ${id}` : 'Pedido';
    const subtitle = [
      pickString(o.status),
      pickString(o.created_at),
      pickString(o.total),
      pickString(o.customer_name),
    ]
      .filter(Boolean)
      .join(' · ');
    rows.push({ title, subtitle: subtitle || undefined });
  }
  return rows;
}
