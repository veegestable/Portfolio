# Portfolio

Personal portfolio site built with **React**, **Vite**, and **Tailwind CSS**. Routing and data use **React Router** and **TanStack Query**; authentication flows use the **Base44** SDK.

## Stack

- [React 18](https://react.dev/) — UI
- [Vite 6](https://vite.dev/) — dev server and production build
- [Tailwind CSS v4](https://tailwindcss.com/) — styling (`@tailwindcss/vite`)
- [React Router v6](https://reactrouter.com/) — client-side routing
- [@tanstack/react-query](https://tanstack.com/query) — server/async state
- [Radix UI](https://www.radix-ui.com/) — accessible primitives (with local UI components under `src/components/ui`)

Entry and app shell are TypeScript (`main.tsx`, `App.tsx`); pages and many components use JSX.

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** (or pnpm / yarn)

## Setup

```bash
npm install
```

Create a `.env` in the project root for any keys your app expects (see Base44 / Stripe / other integrations). `.env` and `.env.*` are gitignored. Base44 app settings are resolved in `src/lib/app-params.js` and wired in `src/api/base44Client.js`.

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Start Vite dev server (HMR)    |
| `npm run build`    | Production build to `dist/`    |
| `npm run preview`  | Serve the production build     |
| `npm run lint`     | Run ESLint                     |
| `npm run lint:fix` | ESLint with auto-fix           |
| `npm run typecheck`| TypeScript check (`jsconfig`)  |

## Project layout

- `src/App.tsx` — providers, router, authenticated shell
- `src/pages/` — route-level pages (e.g. `Home.jsx`)
- `src/components/` — shared UI and feature components
- `src/lib/` — auth context, query client, utilities
- `vite.config.ts` — Vite config and `@` → `src` path alias

## Deploy

Build with `npm run build` and host the `dist/` output on any static host (e.g. Vercel, Netlify, GitHub Pages with the correct base path if applicable).
z