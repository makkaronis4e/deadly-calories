# Deadly calories

This project is a simple implementation of the test task for the position of a front-end developer.

## Deployments

On each push to the `main` branch, the project is automatically deployed to [Vercel](https://vercel.com/) and [GitHub Pages](https://pages.github.com/).
GitHub Pages is not supporting SPA properly, so for the testing purposes it is better to use Vercel environment.

## Implemented features

-   [x] There are list of 6 Mortal Kombat fighters available for selection.
-   [x] Each fighter has a name, a static image and a list of 3 animated images, which are displayed based on the fighter's state.
-   [x] Configuration includes the following params: 'starting calories', 'calories range', 'poison chance'.
-   [x] Application uses Pinia for state management.
-   [x] Configuration is stored in the store and game page is loaded with the url query params. Query params are source of truth and have highest priority.
-   [x] Application uses Composition API.
-   [x] As component library is used Vuetify.
-   [x] Application supports english and norwegian languages.
-   [x] Application supports dark and light themes.
-   [x] Theme and language are stored in the local storage.
-   [x] Styles are written in SCSS.
-   [x] Prettier and ESLint are used for code formatting and linting.
-   [x] Game can be restarted from any round.
-   [x] Logs stored by each fighter for each round and can be viewed in the game page (by hovering over the fighter's image).
-   [x] Logs export is available as a CSV file.

## Tech stack

-   pnpm
-   Vue 3
-   Vite
-   Vuetify
-   Pinia
-   Vue-i18n
-   ESLint
-   Prettier
-   SCSS

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
