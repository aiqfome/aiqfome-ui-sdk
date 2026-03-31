# Geraldo UI (`@aiqfome/geraldo-ui`)

SDK de **Web Components** (Lit + TypeScript) com tokens do guia **Geraldo** para produtos aiqfome. Publicável no npm; consumível em qualquer stack web (React, Vue, Svelte, HTML estático).

## Requisitos

- Node 18+
- `lit` como dependência do app (peer dependency deste pacote)

## Instalação

```bash
npm install @aiqfome/geraldo-ui lit
```

## Uso rápido

1. Importe os **tokens** (CSS variables) uma vez na raiz do app (antes de qualquer componente).
2. Importe o bundle JS para **registrar** os custom elements.

### Vite / bundlers

```ts
import '@aiqfome/geraldo-ui/tokens.css';
import '@aiqfome/geraldo-ui';
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
import '@aiqfome/geraldo-ui/tokens.css';
import '@aiqfome/geraldo-ui';

export function Example() {
  return <geraldo-button variant="outline">OK</geraldo-button>;
}
```

Declare os tipos JSX se necessário (ou use `react-jsx` com `IntrinsicElements`).

## Registro dos custom elements

Importar `@aiqfome/geraldo-ui` carrega os módulos dos componentes; o decorator `@customElement` do Lit registra cada tag. Para garantir registro explícito (idempotente), por exemplo após code-splitting parcial:

```ts
import { defineGeraldoUI } from '@aiqfome/geraldo-ui';
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

Listagem de pedidos em [examples/pedidos-app](examples/pedidos-app) usando **todos** os componentes do SDK. O Vite aponta `@aiqfome/geraldo-ui` para o código-fonte do repositório (alias), sem precisar publicar o pacote.

```bash
npm run example:pedidos
# ou: cd examples/pedidos-app && npm install && npm run dev
```

## Desenvolvimento

```bash
npm install
npm run build
npm run storybook
```

## Publicação no npm (mantenedores)

1. **Organização npm** — quem publica precisa ser membro da org [npmjs.com/org/aiqfome](https://www.npmjs.com/org/aiqfome) com permissão de publicação (ou criar a org em [npmjs.com/org/create](https://www.npmjs.com/org/create)).
2. **Login** — `npm login` (ou token de automação no CI; ver workflow em `.github/workflows/publish.yml`).
3. **Validar artefato** — `npm run build` e conferir `dist/index.js`, `dist/index.d.ts`, `dist/geraldo-tokens.css`; opcionalmente `npm pack --dry-run`.
4. **Versão** — `npm version patch|minor|major` (ou editar `version` em `package.json`) antes de publicar uma release nova.
5. **Publicar** — `npm publish`. O pacote usa `publishConfig.access: "public"`; não é obrigatório passar `--access public` manualmente.

Publicação automática: ao **publicar uma release** no GitHub, configure o secret `NPM_TOKEN` (token **Automation** da npm com permissão de publish no escopo `@aiqfome`) para o workflow publicar o pacote.

## Licença

MIT — ver [LICENSE](./LICENSE).
