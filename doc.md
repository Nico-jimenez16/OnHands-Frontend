# Frontend — Contrato de API

## Stack

- **Framework:** Next.js 16.2.6 (App Router, Route Handlers, `output: "standalone"`)
- **Runtime:** React 19.2.4 / React DOM 19.2.4
- **Lenguaje:** TypeScript 5.x (`strict: true`, paths `@/* → src/*`)
- **Estado global:** Zustand 5.0.13 con middleware `immer` 11.1.8
- **Estilos:** styled-components 6.4.1 (SWC `compiler.styledComponents: true`)
- **Iconos:** lucide-react 1.16.0
- **HTTP client:** `fetch` nativo del lado del servidor (Route Handlers) y del cliente; `EventSource` nativo para streaming desde el navegador. **No** se usa axios ni ningún otro cliente HTTP.
- **Linter:** ESLint 9 con `eslint-config-next` (flat config)
- **Tests:** ninguno configurado

### Arquitectura de red

```
Browser ──fetch / EventSource──▶ Next.js Route Handlers (src/app/api/*)
                                          │
                                          ├── fetchBackend()  ──▶  BACKEND_URL/...
                                          │     (con Authorization: Bearer)
                                          │
                                          └── (mock fallback si BACKEND_URL no está seteado)
```

El navegador **nunca** habla con el backend directamente: siempre pasa por `/api/*` (BFF pattern). El token va del Next.js server al backend; el navegador no lo ve.

---

## Variables de entorno requeridas

Definidas en `.env.local` (no en el repo como `.env.example`):

| Variable | Descripción | Default en `.env.local` | Lado |
|---|---|---|---|
| `BACKEND_URL` | URL base del backend upstream. Si está vacía/ausente, **todas** las rutas `/api/*` devuelven mocks. | `http://localhost:8000` | server-only |
| `BACKEND_API_KEY` | Token bearer que el Route Handler manda al backend en `Authorization: Bearer <key>`. | `dev-key` | server-only |

Ambas son **server-only** (no llevan prefijo `NEXT_PUBLIC_`), por lo que jamás se exponen al navegador. No hay variables públicas.

---

## Llamadas HTTP que realiza

### Capa A — Browser → Next.js Route Handlers (lo que dispara el código del cliente)

#### `POST /api/chat` — enviar mensaje al asistente (SSE)

Disparado desde `src/hooks/useChat.ts:47` cuando el usuario envía un mensaje desde `ChatInput`.

- **Método:** `POST`
- **URL:** `/api/chat` (relativa, mismo origen — el dev server corre en `http://localhost:3000`)
- **Headers enviados por el cliente:**
  - `Content-Type: application/json`
- **Body** (tipo `ChatRequest` de `src/types/api.ts`):
```json
{
  "message": "string",                    // texto crudo del textarea
  "requestId": "string | undefined",      // presente si ya existe una solicitud activa
  "conversationHistory": [                // historial completo desde el store (sin streaming msg)
    { "role": "user" | "assistant", "content": "string" }
  ]
}
```
- **Respuesta esperada:** `Content-Type: text/event-stream` (SSE). Cada frame tiene la forma `data: <json>\n\n` donde `<json>` es un `SSEEvent`:
```json
// type: 'message'  →  payload es ChatResponse
{
  "type": "message",
  "payload": {
    "reply": "string",                                // chunk de texto a concatenar
    "extractedData": { /* Partial<ServiceRequest> */ }, // opcional, llega cuando isComplete=true
    "isComplete": true,                               // opcional
    "requestId": "string"                             // opcional, ID asignado por backend
  }
}

// type: 'error'
{ "type": "error", "payload": { "message": "string" } }
```
  `ServiceRequest` (de `src/types/chat.ts`):
```json
{
  "id": "string",
  "category": "string",
  "description": "string",
  "address": "string",
  "scheduledDate": "string",
  "timePreference": "string",
  "urgency": "baja" | "media" | "alta",
  "status": "draft" | "pending" | "searching" | "sent" | "accepted" | "in_progress" | "completed" | "cancelled",
  "createdAt": "Date"
}
```
- **Streaming/SSE:** **sí**. El cliente lee con `res.body.getReader()` y `TextDecoder`, particiona por `\n\n`, parsea cada frame que empieza con `data: ` y descarta frames malformados silenciosamente.
- **Manejo de error:**
  - Si `res.body` es nulo → mensaje "Hubo un error al procesar tu solicitud. Intentá de nuevo." se inserta como mensaje del assistant con `status: 'error'`.
  - Si llega un `SSEEvent` de tipo `error` → mismo mensaje fallback.
  - Frames JSON inválidos se ignoran (catch silencioso).
  - El flag `isTyping` se resetea siempre en `finally`.

#### `GET /api/match/stream?requestId=...` — stream de cambios de estado de providers (SSE)

Disparado desde `src/hooks/useMatchStream.ts:14` apenas existe un `requestId` en el store (es decir, después de que el chat completó la extracción).

- **Método:** `GET`
- **URL:** `/api/match/stream?requestId=<encodeURIComponent(requestId)>`
- **Headers enviados por el cliente:** los que `EventSource` agrega por defecto (`Accept: text/event-stream`). **No se puede agregar headers custom** con `EventSource` — esto es relevante si en el futuro se quisiera autenticación cliente→BFF.
- **Body:** N/A (GET)
- **Respuesta esperada:** SSE con dos tipos de evento (definidos en `SSEEvent`):
```json
// type: 'match_update'   ← el handler actual NUNCA emite este tipo (ver Observaciones)
{
  "type": "match_update",
  "payload": {
    "requestId": "string",
    "providers": [ /* Provider[] */ ],
    "searchStatus": "searching" | "found" | "notified"
  }
}

// type: 'provider_status'  ← el único que sí emite el handler real
{
  "type": "provider_status",
  "payload": { "providerId": "string", "status": "notified" | "accepted" | "rejected" | "queue" }
}
```
- **Streaming/SSE:** **sí**, vía `EventSource` nativo.
- **Manejo de error:** `es.onerror = () => es.close()` — cierra el stream silenciosamente sin reintento ni feedback en UI. Frames malformados se ignoran (catch silencioso).

### Capa B — Next.js Route Handlers → Backend upstream (lo que el server emite)

Todas pasan por `src/lib/backendClient.ts:1` (`fetchBackend`), que inyecta:
- `Authorization: Bearer ${process.env.BACKEND_API_KEY}`
- `Content-Type: application/json`

#### `POST {BACKEND_URL}/chat`

- **Disparador:** `src/app/api/chat/route.ts:51` cuando el cliente postea a `/api/chat`.
- **Método:** `POST`
- **URL:** `${BACKEND_URL}/chat` (con `.env.local` actual: `http://localhost:8000/chat`)
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer ${BACKEND_API_KEY}`
- **Body:** pasa por **referencia tal cual** el `ChatRequest` que llegó del cliente (sin transformar):
```json
{
  "message": "string",
  "requestId": "string | undefined",
  "conversationHistory": [ { "role": "string", "content": "string" } ]
}
```
- **Respuesta esperada:** SSE (`Content-Type: text/event-stream`), `backendRes.body` se reenvía sin modificar al cliente con los mismos headers SSE. El backend debe emitir frames `data: {"type":"message", "payload": {...}}\n\n`.
- **Streaming/SSE:** **sí**, full pass-through del body.
- **Manejo de error:** si `!backendRes.ok || !backendRes.body` → se devuelve un stream sintético con un solo frame `{"type":"error","payload":{"message":"Error al conectar con el backend"}}`. **No se propaga el status code** (siempre devuelve 200 con un evento de error embebido).

#### `GET {BACKEND_URL}/match/{requestId}` — usado de dos formas

##### B1) Snapshot único, desde `GET /api/match`

- **Disparador:** `src/app/api/match/route.ts:69`.
- ⚠️ **Importante:** esta ruta `/api/match` (no-stream) **no la llama nadie en el cliente** (ver Observaciones). Sigue siendo invocable, pero es código muerto desde la perspectiva del UI actual.
- **Método:** `GET`
- **URL:** `${BACKEND_URL}/match/${requestId}`
- **Headers:** `Content-Type: application/json`, `Authorization: Bearer ${BACKEND_API_KEY}`
- **Body:** N/A
- **Respuesta esperada** (`MatchResponse`):
```json
{
  "requestId": "string",
  "providers": [
    {
      "id": "string",
      "name": "string",
      "initials": "string",
      "specialty": "string",
      "yearsExp": 0,
      "rating": 0,
      "distanceKm": 0,
      "acceptanceRate": 0,
      "matchScore": 0,
      "rank": 1,                  // 1 | 2 | 3
      "status": "notified",        // notified | accepted | rejected | queue
      "avatarColor": "purple"      // purple | green | orange
    }
  ],
  "searchStatus": "searching"      // searching | found | notified
}
```
- **Streaming/SSE:** no.
- **Manejo de error:** si `!res.ok` o falla la conexión → el BFF devuelve `502 { "error": "Error al obtener match" }` al cliente.

##### B2) Polling para sintetizar SSE, desde `GET /api/match/stream`

- **Disparador:** `src/app/api/match/stream/route.ts:43` — el handler **no consume un stream del backend**; en su lugar **hace polling cada 3 segundos** al endpoint snapshot y diffea `providers[i].status` contra el tick anterior, emitiendo un evento `provider_status` solo cuando cambia.
- **Método:** `GET`
- **URL:** `${BACKEND_URL}/match/${requestId}` (el mismo que B1)
- **Headers:** idem `fetchBackend`.
- **Body:** N/A
- **Respuesta esperada:** mismo `MatchResponse` que B1. El handler corta el polling cuando `searchStatus === 'notified'`.
- **Streaming/SSE:** del lado del backend **no**; el BFF transforma polling en SSE hacia el browser.
- **Manejo de error:** errores transitorios del polling se ignoran (catch vacío) — sigue intentando hasta que `searchStatus === 'notified'` o el cliente cierre la conexión.

---

## Flujo del chat (paso a paso)

1. **Usuario tipea** en `<TextArea>` de `ChatInput.tsx:113` y presiona Enter (sin Shift) o el botón de enviar. `handleSend` valida que el texto no esté vacío y que `isTyping === false`, luego llama a `onSend(text)` y limpia el textarea.
2. **`ChatPanel`** (línea 63) recibe `sendMessage` de `useChat()` y lo pasa como prop `onSend` al `ChatInput`. Al disparar, entra a `useChat.sendMessage` (`useChat.ts:25`).
3. **El hook arma el historial** mapeando `storeMessages` a `{ role, content }`, **inserta el mensaje del usuario en el store** (`addMessage`) y activa `isTyping = true` para mostrar el `TypingIndicator`.
4. **Crea un mensaje "fantasma"** del assistant en `useState` local (`streamingMessage`) — *no* en el store — que se irá acumulando con cada chunk. Mientras tanto, `messages` expuesto por el hook concatena `[...storeMessages, streamingMessage]`.
5. **Construye el `ChatRequest`** (`{ message, requestId, conversationHistory }`) y hace `fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })`.
6. **Next.js Route Handler `POST /api/chat`** (`src/app/api/chat/route.ts:43`):
   - Si **no** hay `BACKEND_URL` → devuelve un stream mock con un único frame `{ type: 'message', payload: { reply: "¿Para qué dirección...?" } }`.
   - Si hay `BACKEND_URL` → hace `fetchBackend('/chat', { method: 'POST', body: JSON.stringify(body) })` con `Authorization: Bearer ${BACKEND_API_KEY}` y reenvía `backendRes.body` al cliente con headers SSE.
7. **El cliente lee el stream** con `res.body.getReader()`, particiona por `\n\n`, parsea cada frame `data: <json>`:
   - `type === 'message'`: concatena `payload.reply` a `accumulatedContent` y **actualiza el `streamingMessage` local** (no el store) para re-render incremental.
   - Si `payload.isComplete && payload.extractedData`: invoca `setActiveRequest({ id: payload.requestId ?? "SR-<ts>", ...defaults, ...extractedData })`, lo que **setea `requestId` en el store**.
   - `type === 'error'`: tira y cae al catch.
8. **Cuando el stream termina** (`done === true`):
   - `addMessage` empuja el mensaje del assistant finalizado al store (con `serviceData` si vino `extractedData`).
   - `streamingMessage` se limpia y `isTyping = false` en el bloque `finally`.
9. **Activación automática del panel de match:** apenas `requestId` deja de ser `null` en el store, el efecto de `useMatchStream` (`useMatchStream.ts:11`) crea un `EventSource('/api/match/stream?requestId=...')`.
10. **El handler `/api/match/stream`** arranca a poll-ear `${BACKEND_URL}/match/{requestId}` cada 3s, y por cada cambio de `provider.status` emite `data: { type: 'provider_status', payload: { providerId, status } }`. El hook recibe esos eventos y llama `updateProviderStatus(providerId, status)` en el store, lo cual re-renderiza `ProviderList` / `ProviderCard` en el `ContextPanel`.
11. **Cuando el backend reporta `searchStatus === 'notified'`** el polling cierra el `ReadableStream`, el `EventSource` recibe el cierre y dispara `onerror → es.close()` en el cliente.

---

## Observaciones y problemas detectados

### Inconsistencias en el contrato SSE

- **`match_update` está en los tipos pero nadie lo emite.** `useMatchStream.ts:22` espera eventos `type: 'match_update'` con un `MatchResponse` completo, pero el handler `src/app/api/match/stream/route.ts` **solo emite `provider_status`**. Resultado: `setProviders([...])` nunca se llama desde el stream; los providers iniciales tienen que venir por otro lado (hoy: no llegan, porque `/api/match` no la llama nadie — ver siguiente punto).
- **`GET /api/match` (snapshot) es código muerto en el cliente.** `grep` confirma que ningún componente/hook hace fetch a `/api/match` sin `/stream`. La ruta existe y funciona, pero ningún consumidor la dispara. Esto significa que **en el estado actual la lista de providers nunca se popula** (a menos que el backend mande un evento `match_update`, que tampoco se contempla en `route.ts`).
- **`setMatchStatus` solo se llama desde `match_update`**, que como dijimos nunca llega → `matchStatus` permanece en `'idle'` salvo que el chat lo mute (no lo hace).

### Mocks que no coinciden con el contrato real

- El stream mock de `/api/chat` emite **un único frame** y cierra; no emite `isComplete: true` ni `extractedData`. Resultado: con `BACKEND_URL` vacío el usuario nunca activa el panel de providers porque `setActiveRequest` jamás se invoca.
- El mock de `/api/match` (B1, no usada) devuelve `searchStatus: 'notified'` directamente, saltando la fase `searching`.
- El mock de `/api/match/stream` emite **un solo** evento (`p1 accepted`) tras 5s y cierra; el estado inicial de los providers nunca aparece (necesitaría un `match_update` o que los providers ya estén en el store).

### Manejo de errores poco visible

- `useChat`: cualquier fallo del fetch o stream cae a un mensaje genérico ("Hubo un error..."). No diferencia red vs. 4xx vs. 5xx vs. timeout.
- `useMatchStream`: ante error simplemente cierra el `EventSource` sin retry, sin feedback en UI.
- `/api/chat` BFF: cuando el backend falla, devuelve **HTTP 200 con un frame de error** en lugar de propagar el status — el front no puede distinguir éxito de error mirando `res.status`.
- `/api/match/stream` BFF: errores transitorios se silencian con `catch {}` dentro del polling.

### Otras observaciones

- **No hay autenticación de usuario.** El `Authorization: Bearer dev-key` es server→server (server-only env var). No existe login, cookies, sesión, ni headers de usuario en las llamadas. El nombre `"Nicolas Jimenez"` está **hardcodeado** en `src/app/page.tsx:14`.
- **`requestId` se inventa en el cliente como fallback.** Si el backend no manda `payload.requestId`, `useChat.ts:85` genera `SR-${Date.now()}`. Esto puede divergir del ID real del backend si el backend luego lo cambia.
- **`conversationHistory` nunca se trunca.** Crece indefinidamente con cada mensaje. Para sesiones largas esto puede inflar el payload sin límite.
- **`EventSource` no admite headers custom**, así que cualquier futura autenticación cliente→BFF para `/api/match/stream` tendría que pasar por cookie o query string.
- **`BACKEND_URL=http://localhost:8000`** está hardcodeado en `.env.local` apuntando a un servicio local que no existe en este repo. No hay `.env.example` ni README explicando qué backend levantar.
- **Sin tests.** `package.json` no define `test`/`vitest`/`jest`; ninguna llamada está cubierta.
- **El backend cliente arma URLs por concatenación** (`${BACKEND_URL}${path}`). Si `BACKEND_URL` viniera con trailing slash explotaría con doble `//`. No hay normalización.
- **`Provider.avatarColor` es enum cerrado (`'purple' | 'green' | 'orange'`)**, lo que obliga al backend a usar exactamente esos tres strings. Cualquier otro valor rompería el tipado del componente.
