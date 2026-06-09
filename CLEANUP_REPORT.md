# Reporte de limpieza — Frontend OnHands

## Fecha
2026-06-09

## Resumen
El proyecto arrastraba dos generaciones de UI. La app viva (`/app`) corre sobre
`src/components/main/*` + `src/components/main/palette.ts`, y `/login` es autónoma. Una
generación anterior (theme oscuro `src/styles/theme.ts`) —pantallas en `layout/`, `chat/`,
`context/`— no la renderizaba ninguna ruta. Se eliminó ese código muerto. La librería atómica
`src/components/ui/*` se **conservó** por decisión del usuario (queda huérfana pero intacta y
compilable).

## Archivos eliminados
| Archivo | Motivo |
|---------|--------|
| src/components/layout/AppShell.tsx | huérfano (raíz gen-1, cero importadores) |
| src/components/layout/TopBar.tsx | huérfano (raíz gen-1, cero importadores) |
| src/components/layout/Sidebar.tsx | huérfano (raíz gen-1, cero importadores) |
| src/components/chat/ChatPanel.tsx | obsoleto (gen-1, reemplazado por main/AssistantChat) |
| src/components/chat/MessageBubble.tsx | obsoleto (solo lo usaba ChatPanel) |
| src/components/chat/ServiceSummaryCard.tsx | obsoleto (solo lo usaba MessageBubble) |
| src/components/chat/TypingIndicator.tsx | obsoleto (solo lo usaba ChatPanel; reemplazado por TypingIndicatorLight) |
| src/components/chat/ChatInput.tsx | obsoleto (solo lo usaba ChatPanel) |
| src/components/context/ContextPanel.tsx | obsoleto (gen-1, reemplazado por main/RequestPanel) |
| src/components/context/ProviderList.tsx | obsoleto (solo lo usaba ContextPanel) |
| src/components/context/ProviderCard.tsx | obsoleto (solo lo usaba ProviderList) |
| src/components/context/RequestSummaryCard.tsx | obsoleto (solo lo usaba ContextPanel) |
| src/hooks/useServiceCategories.ts | huérfano (único consumidor era layout/Sidebar; main/CategoryGrid tiene su config local) |
| src/lib/utils.ts | huérfano (formatDate/generateRequestId/getUrgencyLabel/getStatusLabel: cero referencias) |
| src/styles/index.ts | huérfano (barrel sin importadores; Providers importa los módulos directo) |

Carpetas `src/components/chat/` y `src/components/context/` eliminadas al quedar vacías.

## Imports eliminados
| Archivo | Import eliminado |
|---------|-----------------|
| src/styles/StyledRegistry.tsx | `React` de `import React, { useState } from 'react'` (no usado; runtime react-jsx) |

## Código eliminado dentro de archivos
| Archivo | Elemento eliminado | Tipo |
|---------|--------------------|------|
| — | (ninguno) | — |

No se encontraron variables, tipos ni funciones sueltas sin usar dentro de archivos
conservados. Las funciones huérfanas de `lib/utils.ts` se eliminaron borrando el archivo completo.

## Archivos marcados como DUDOSOS (no eliminados)
| Archivo | Motivo de la duda |
|---------|-------------------|
| src/app/api/match/route.ts | Snapshot `GET /api/match` que el cliente nunca llama (confirmado por `doc.md`). Es un route handler de Next.js → protegido por las restricciones, NO se elimina. |
| src/components/ui/** | Tras borrar las pantallas gen-1, la librería queda huérfana. Conservada a pedido del usuario como librería reutilizable; compila y no rompe nada. |

## Dependencias candidatas a revisar manualmente
| Paquete | Motivo |
|---------|--------|
| (ninguno) | Todas las dependencias se usan. `immer` no aparece como import directo pero es dependencia real de `zustand/middleware/immer` (usado en `chatStore.ts`) → se conserva. |

## Resultado del build
- TypeScript (`npx tsc --noEmit`): sin errores (verificado tras Grupo A y tras las eliminaciones).
- Build de producción (`npm run build`): exitoso.
- Tabla de rutas idéntica a antes de la limpieza: `/`, `/_not-found`, `/api/chat`, `/api/match`, `/api/match/stream`, `/app`, `/login`.

## Observaciones
- **Decisión sobre la librería `ui/`:** `@/components/ui` solo lo consumían las pantallas gen-1
  eliminadas. Por decisión del usuario se conserva intacta (queda huérfana pero disponible para
  uso futuro). Si en algún momento se decide removerla, son ~10 archivos adicionales
  (8 componentes + sus `.types` + el barrel `index.ts`).
- **Docs conservados (desvío respecto a una indicación previa):** se evaluó borrar `doc.md` y
  `src/components/ui/README.md`. Tras revisarlos NO son obsoletos: `ui/README.md` documenta la
  librería `ui/` que se conserva, y `doc.md` es el contrato de API/arquitectura que describe
  código vivo (hooks, route handlers, tipos, flujo SSE). Se conservaron ambos. Nota menor: la
  sección "Flujo del chat" de `doc.md` menciona nombres de componentes gen-1 ya eliminados
  (ChatInput/ChatPanel/TypingIndicator/ContextPanel/ProviderList/ProviderCard); el resto del
  documento sigue siendo exacto.
- **`styles/theme.ts` se conserva:** lo usan `Providers` (vivo) y la librería `ui/` conservada.
- Pendiente: verificación visual en navegador (`npm run dev`) a cargo del usuario.
