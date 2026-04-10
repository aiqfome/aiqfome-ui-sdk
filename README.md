# Geraldo UI (`@aiqfome-org/geraldo-ui`)

SDK de **Web Components** (Lit + TypeScript) com tokens do guia **Geraldo** para produtos aiqfome. Publicável no npm; consumível em qualquer stack web (React, Vue, Svelte, HTML estático).

![Prévia: smoke test com o pacote via npm — botões, card, formulário, rádios e badges](docs/smoke-test-preview.png)

## Requisitos

- Node 18+
- `lit` como dependência do app (peer dependency deste pacote)

## Instalação

```bash
npm install @aiqfome-org/geraldo-ui lit
```

## Autenticação Magalu / Geraldo (subpath `@aiqfome-org/geraldo-ui/auth`)

Módulo **opcional** (sem `lit`): monta a URL do Magalu ID, o `redirect_uri` do Geraldo, escuta `postMessage` (`authCode` / `magaluAuthDone`) e abre o popup. **Não** troca `code` por token no browser — use o seu backend com `client_secret` (ver guia de parceiros).

```ts
import {
  buildGeraldoOAuthRedirectUri,
  buildMagaluAuthorizeUrl,
  openMagaluLoginWindow,
  parseAllowedOrigins,
  subscribeMagaluAuthMessages,
} from '@aiqfome-org/geraldo-ui/auth';

const unsubscribe = subscribeMagaluAuthMessages(
  (msg) => {
    if (msg.kind === 'authCode') {
      // POST msg.code + redirectUri para o seu servidor
    }
  },
  { allowedOrigins: parseAllowedOrigins('https://geraldo-restaurantes.aiqfome.com,http://localhost:5175') }
);

const url = buildMagaluAuthorizeUrl({
  clientId: '…',
  redirectUri: buildGeraldoOAuthRedirectUri(),
  scopes: ['aqf:store:read'],
});
openMagaluLoginWindow(url);
unsubscribe();
```

**Documentação do fluxo** (portal, redirects, homologação): repositório **docs-loja-apps**, ficheiro `GUIA_PARCEIROS_LOJA_DE_APPS.md` (quando clonado ao lado deste repo: `../docs-loja-apps/`).

## Uso rápido

1. Importe os **tokens** (CSS variables) uma vez na raiz do app (antes de qualquer componente).
2. Importe o bundle JS para **registrar** os custom elements.

### Vite / bundlers

```ts
import '@aiqfome-org/geraldo-ui/tokens.css';
import '@aiqfome-org/geraldo-ui';
```

### Fonte Ubuntu

Inclua no HTML (recomendado):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;0,700&display=swap"
  rel="stylesheet"
/>
```

### HTML declarativo

```html
<geraldo-button variant="filled" color="primary">Salvar</geraldo-button>
<geraldo-text variant="h3-section" weight="medium">Seção</geraldo-text>
```

### React (exemplo)

```tsx
import '@aiqfome-org/geraldo-ui/tokens.css';
import '@aiqfome-org/geraldo-ui';

export function Example() {
  return <geraldo-button variant="outline">OK</geraldo-button>;
}
```

Declare os tipos JSX se necessário (ou use `react-jsx` com `IntrinsicElements`).

## Registro dos custom elements

Importar `@aiqfome-org/geraldo-ui` carrega os módulos dos componentes; o decorator `@customElement` do Lit registra cada tag. Para garantir registro explícito (idempotente), por exemplo após code-splitting parcial:

```ts
import { defineGeraldoUI } from '@aiqfome-org/geraldo-ui';
defineGeraldoUI();
```

## Ícones

O guia referencia [Material Symbols](https://fonts.google.com/icons) e [MDI](https://pictogrammers.com/library/mdi/). Este pacote **não** inclui ícones: use SVG no slot `icon` de `geraldo-button` / `geraldo-badge`, ou bibliotecas como `@mdi/js` no seu app.

## Tema escuro

Defina no ancestral (ex.: `<html data-geraldo-theme="dark">`) ou use a classe `.geraldo-theme-dark` no container. Tokens de superfície e seleção são ajustados em `geraldo-tokens.css`.

## Componentes exportados

| Tag                    | Descrição                          |
| ---------------------- | ---------------------------------- |
| `geraldo-button`       | CTA: `variant`, `color`, `size`, `loading` |
| `geraldo-text`         | Tipografia: `variant`, `weight`, `as` |
| `geraldo-badge`        | `tone` (primary, developer, …)     |
| `geraldo-card`         | `radius`, `elevation`; slots `header`, default, `footer` |
| `geraldo-text-field`   | `label`, `description`, `error`, eventos `geraldo-input` / `geraldo-change` |
| `geraldo-checkbox`     | `checked`, `disabled`; `geraldo-change` |
| `geraldo-radio-group`  | `value`, `name`, `legend`          |
| `geraldo-radio`        | `value`, `checked`, `name`         |
| `geraldo-switch`       | `checked`, `disabled`; `geraldo-change` |

## App de exemplo (pedidos)

Listagem de pedidos em [examples/pedidos-app](examples/pedidos-app) usando **todos** os componentes do SDK. O Vite aponta `@aiqfome-org/geraldo-ui` para o código-fonte do repositório (alias), sem precisar publicar o pacote.

```bash
npm run example:pedidos
# ou: cd examples/pedidos-app && npm install && npm run dev
```

## Exemplo lojista-pedidos (API V2 real)

[examples/lojista-pedidos-app](examples/lojista-pedidos-app) — lista lojas e pedidos com token Bearer, proxy Vite e subpath **`@aiqfome-org/geraldo-ui/auth`** (popup Magalu opcional). Ver `env.sample` nessa pasta.

```bash
npm run example:lojista-pedidos
# ou: cd examples/lojista-pedidos-app && npm install && npm run dev
```

## Exemplo mínimo (Magalu + postMessage)

[examples/magalu-auth-minimal](examples/magalu-auth-minimal) — botão que abre o login Magalu e regista mensagens no ecrã (sem backend). Útil para validar `allowedOrigins` e o fluxo documentado no guia Loja de APPs.

```bash
npm run example:magalu-auth
# ou: cd examples/magalu-auth-minimal && npm install && npm run dev
```

Defina `VITE_MAGALU_CLIENT_ID` no `.env` local (copia `env.sample` para `.env` nessa pasta).

## Desenvolvimento

```bash
npm install
npm run build
npm test
npm run storybook
```

O repositório usa **Gitflow**: integração em **`develop`**, releases estáveis em **`main`**. Detalhes (feature / release / hotfix) em [CONTRIBUTING.md](./CONTRIBUTING.md).

## Publicação no npm (mantenedores)

1. **Organização npm** — quem publica precisa ser membro da org [npmjs.com/org/aiqfome-org](https://www.npmjs.com/org/aiqfome-org) com permissão de publicação (ou criar a org em [npmjs.com/org/create](https://www.npmjs.com/org/create)).
2. **Login** — `npm login` (ou token de automação no CI; ver workflow em `.github/workflows/publish.yml`).
3. **Validar artefato** — `npm run build` e conferir `dist/index.js`, `dist/index.d.ts`, `dist/geraldo-tokens.css`; opcionalmente `npm pack --dry-run`.
4. **Versão** — `npm version patch|minor|major` (ou editar `version` em `package.json`) antes de publicar uma release nova.
5. **Publicar** — `npm publish`. O pacote usa `publishConfig.access: "public"`; não é obrigatório passar `--access public` manualmente.

Publicação automática: ao **publicar uma release** no GitHub, configure o secret `NPM_TOKEN` (token **Automation** da npm com permissão de publish no escopo `@aiqfome-org`) para o workflow publicar o pacote.

## Licença

MIT — ver [LICENSE](./LICENSE).
