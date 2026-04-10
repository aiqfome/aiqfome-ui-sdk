# Contribuindo — Gitflow

Este repositório segue **[Gitflow](https://nvie.com/posts/a-successful-git-branching-model/)** (Vincent Driessen).

## Branches principais

| Branch | Função |
|--------|--------|
| **`main`** | Código em produção / releases publicadas. Só entra merge de `release/*` ou `hotfix/*`. Cada release em `main` deve ter **tag** (`v0.2.0`, etc.). |
| **`develop`** | Linha de integração. Base para novas funcionalidades. O dia a dia do time começa aqui. |

## Branches de apoio

### `feature/*`

- **Sai de:** `develop`
- **Volta para:** `develop` (via Pull Request)
- **Nome:** `feature/descricao-curta` (ex.: `feature/novo-botao`)

```bash
git checkout develop
git pull origin develop
git checkout -b feature/minha-feature
# ... commits ...
git push -u origin feature/minha-feature
```

Abra PR **feature → develop**.

### `release/*`

- **Sai de:** `develop` quando a versão está congelada para publicação
- **Volta para:** `main` **e** `develop`
- **Nome:** `release/0.2.0` (alinhado ao `version` do `package.json`)

Na branch `release/*`: só correções finas, bump de versão, changelog se houver. Depois:

1. PR **release → main**; após merge, tag `v0.2.0` em `main`
2. Merge de `main` (ou da própria `release`) de volta em `develop` para não perder commits

Publicação npm: após a release estável em `main`, use o fluxo descrito no [README](./README.md#publicação-no-npm-mantenedores) (ou release no GitHub com `NPM_TOKEN`).

### `hotfix/*`

- **Sai de:** `main` (produção com bug)
- **Volta para:** `main` **e** `develop`
- **Nome:** `hotfix/descricao` ou `hotfix/0.1.2`

1. PR **hotfix → main**, tag patch (`v0.1.2`)
2. Merge do hotfix em `develop`

## Configuração no GitHub (recomendado)

1. **Default branch:** em *Settings → General → Default branch*, definir **`develop`** para novos PRs e clones do dia a dia.
2. **Proteção:** proteger `main` (reviews obrigatórios, sem push direto) e, se quiser, `develop`.
3. **Releases:** criar *GitHub Release* a partir das tags em `main` quando publicar versão.

## Checks locais

Antes de abrir PR:

```bash
npm test
npm run build
npm run build-storybook
# opcional: exemplos em examples/* (ex.: npm run example:lojista-pedidos)
```

## Ferramenta opcional: git-flow

Quem quiser comandos auxiliares pode instalar [git-flow](https://github.com/nvie/gitflow) e rodar `git flow init` aceitando os padrões (`main` + `develop`). Não é obrigatório: o mesmo fluxo vale com branches criadas manualmente.
