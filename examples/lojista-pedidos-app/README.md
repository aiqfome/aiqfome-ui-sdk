# Exemplo: pedidos do lojista (API V2)

App mínimo com **Geraldo UI** + **`@aiqfome-org/geraldo-ui/auth`**: lista lojas (`GET /api/v2/store` na plataforma) e pedidos (`GET /api/v2/orders/search` na API), com proxy Vite para evitar CORS em dev.

## Como correr

Na raiz do repositório do SDK:

```bash
npm run example:lojista-pedidos
```

Ou:

```bash
cd examples/lojista-pedidos-app && npm install && npm run dev
```

Copia `env.sample` para `.env` e define `VITE_AIQFOME_ACCESS_TOKEN` (e opcionalmente `VITE_MAGALU_CLIENT_ID` para o popup Magalu). Escopos típicos: `aqf:store:read`, `aqf:order:read`.

Documentação: [List orders (V2)](https://developer.aiqfome.com/docs/api/v2/list-orders).
