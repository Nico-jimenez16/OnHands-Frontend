# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build (emits a standalone server under `.next/standalone`, see `next.config.ts`)
- `npm run start` — run the production build
- `npm run lint` — ESLint via flat config (`eslint.config.mjs`) extending `eslint-config-next` core-web-vitals + typescript
- No test runner is configured.

Path alias: `@/*` → `./src/*` (see `tsconfig.json`).

## Backend integration

The frontend never talks to the backend directly from the browser. All requests go through Next.js Route Handlers under `src/app/api/*`, which forward to the upstream backend via `src/lib/backendClient.ts` using the `BACKEND_URL` and `BACKEND_API_KEY` env vars.

**Mock fallback:** every route handler checks `process.env.BACKEND_URL` and serves canned data when it is unset. This means the UI works end-to-end with `npm run dev` and no backend running. When adding a new route handler, follow the same pattern: real backend behind `BACKEND_URL`, mock branch when it's absent.

## Streaming architecture

Two SSE streams drive the chat experience:

1. **`POST /api/chat`** (`src/app/api/chat/route.ts`) — proxies an SSE stream of `{ type: 'message', payload: ChatResponse }` events from the backend's `/chat`. The client consumes it in `src/hooks/useChat.ts`, which manually reads the `ReadableStream`, splits on `\n\n`, parses `data: …` frames, accumulates into a *streaming* assistant message (held in local `useState`, not Zustand), and only commits the final message to the store on completion. When `payload.isComplete && payload.extractedData` arrives, the hook seeds `activeRequest` in the store, which kicks off the match flow.

2. **`GET /api/match/stream?requestId=…`** (`src/app/api/match/stream/route.ts`) — emits `provider_status` events. When `BACKEND_URL` is set, this route *polls* the backend's `/match/:id` every 3s and diffs `providers[i].status` against the previous tick to synthesize SSE events; it closes when `searchStatus === 'notified'`. The client consumes it via native `EventSource` in `src/hooks/useMatchStream.ts`.

Both SSE handlers must set `export const dynamic = 'force-dynamic'` and the standard `text/event-stream` / `no-cache` / `keep-alive` headers (helper-less — copy from existing routes).

A separate `GET /api/match?requestId=…` returns a one-shot snapshot for the initial render.

## State (Zustand + Immer)

A single store, `src/store/chatStore.ts`, holds everything: `messages`, `isTyping`, `activeRequest`, `requestId`, `providers`, `matchStatus`. It uses the `immer` middleware so reducers mutate draft state directly. The streaming assistant message is intentionally *not* in the store — it lives in `useChat`'s local state and only the finalized message is pushed via `addMessage`.

## Styling (styled-components SSR)

This project uses styled-components, not CSS Modules, for app code. The SSR plumbing is non-obvious:

- `src/styles/StyledRegistry.tsx` — collects styles into a `ServerStyleSheet` on the server and flushes them via `useServerInsertedHTML`. Required for App Router SSR.
- `src/components/layout/Providers.tsx` — wraps `StyledRegistry` → `ThemeProvider` → `GlobalStyles` and is mounted in `src/app/layout.tsx`.
- `next.config.ts` enables `compiler.styledComponents: true` (SWC transform for displayName/SSR).
- `src/styles/theme.ts` is the single source of truth for colors, spacing, radii, font sizes, and layout dimensions — read from `theme` rather than hard-coding values.

UI copy is in Spanish (`<html lang="es">`); follow suit when adding user-facing strings.

## Deployment

`Dockerfile` is a three-stage build (`deps` → `builder` → `runner`) that depends on `output: "standalone"` in `next.config.ts`. If you change build output, update the Dockerfile's `COPY --from=builder /app/.next/standalone ./` step accordingly.
