# Librería de componentes UI (`@/components/ui`)

Componentes **atómicos, tipados y presentacionales** (sin lógica de negocio) construidos con
`styled-components`. Todos los colores, spacing, radios y tipografías salen de
[`src/styles/theme.ts`](../../styles/theme.ts) — el theme es la única fuente de verdad.

## Convenciones

- Cada componente lleva `'use client'` en su `index.tsx`.
- Props transientes con prefijo `$` (ej. `$variant`) para que no lleguen al DOM.
- Tipos explícitos en cada prop (cero `any`). Los tipos viven en `<Componente>.types.ts`.
- Import único desde el barrel: `import { Button, Input, Text } from '@/components/ui'`.

> **Nota sobre el theme:** el theme actual es oscuro/violeta. La pantalla de `/login` usa una
> paleta de marca propia (clara/ámbar) que no existe en el theme, por lo que **no** consume esta
> librería (ver el `TODO` en `src/app/login/page.tsx`). Migrarla requeriría agregar overrides de
> color a estos componentes.

---

## Button

```tsx
import { Button } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

<Button variant="primary" onClick={handle}>Ingresar</Button>
<Button variant="secondary" fullWidth>Continuar con Google</Button>
<Button variant="ghost" size="sm">Cancelar</Button>
<Button variant="danger">Eliminar</Button>
<Button loading>Guardando…</Button>
<Button leftIcon={<ArrowRight size={14} />}>Siguiente</Button>
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `fullWidth` | `boolean` | `false` |
| `loading` | `boolean` | `false` |
| `leftIcon` / `rightIcon` | `React.ReactNode` | — |

Hereda todos los atributos nativos de `<button>` (`onClick`, `type`, `disabled`, …).

---

## IconButton

Botón **cuadrado solo-ícono** (sin texto). El ícono se pasa como children.

```tsx
import { IconButton } from '@/components/ui'
import { ArrowUp, Paperclip } from 'lucide-react'

<IconButton variant="primary" aria-label="Enviar" onClick={send}>
  <ArrowUp size={15} />
</IconButton>
<IconButton variant="ghost" size="sm" aria-label="Adjuntar">
  <Paperclip size={14} />
</IconButton>
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `variant` | `'primary' \| 'ghost'` | `'primary'` |
| `size` | `'sm' \| 'md'` (26 / 32px) | `'md'` |
| `aria-label` | `string` (**obligatorio**, es solo-ícono) | — |

Hereda todos los atributos nativos de `<button>` (`onClick`, `disabled`, …).

---

## TextArea

Textarea que **auto-crece** con su contenido entre `minHeight` y `maxHeight`. Es
controlado: el alto se recalcula con `value`, así que al vaciarlo vuelve solo a `minHeight`.

```tsx
import { TextArea } from '@/components/ui'

<TextArea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder="Escribí acá…"
  maxHeight={140}
/>
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `value` | `string` (**obligatorio**, controlado) | — |
| `minHeight` | `number` (alto de reposo, px) | `20` |
| `maxHeight` | `number` (px antes de scroll interno) | `140` |

Hereda los atributos nativos de `<textarea>` (`onChange`, `onKeyDown`, `placeholder`, `disabled`, …).

---

## Input

```tsx
import { Input } from '@/components/ui'
import { Mail } from 'lucide-react'

<Input label="Correo" type="email" placeholder="tu@email.com" leftIcon={<Mail size={14} />} />
<Input label="Clave" type="password" error="Contraseña incorrecta" />
<Input label="Buscar" size="sm" hint="Mínimo 3 caracteres" fullWidth />
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `label` | `string` | — |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'search'` | `'text'` |
| `leftIcon` / `rightIcon` | `React.ReactNode` | — |
| `error` / `hint` | `string` | — |
| `disabled` / `fullWidth` / `required` | `boolean` | `false` |

Reutiliza internamente `<Label>` (cuando hay `label`) y `<Text>` (para `error`/`hint`).

---

## Text

```tsx
import { Text } from '@/components/ui'

<Text variant="heading1">Título grande</Text>
<Text variant="heading3" as="h2">Subtítulo</Text>
<Text variant="body">Párrafo de cuerpo.</Text>
<Text variant="eyebrow" color="tertiary">Sección</Text>
<Text variant="bodySmall" color="secondary" truncate>Texto largo recortado…</Text>
<Text color="accent" onClick={goRegister}>Registrate gratis</Text>
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `variant` | `heading1..4 \| body \| bodySmall \| caption \| eyebrow \| error \| hint` | `'body'` |
| `color` | `primary \| secondary \| tertiary \| soft \| faint \| accent \| error \| success \| inherit` | — |
| `as` | `p \| span \| h1..h4 \| label \| div` | `'p'` |
| `weight` | `number` (sobrescribe el peso del `variant`, ej. `600`) | — |
| `transform` | `'none' \| 'uppercase' \| 'capitalize'` | — |
| `truncate` | `boolean` | `false` |
| `align` | `'left' \| 'center' \| 'right'` | — |
| `onClick` | `() => void` | — |

> `soft` (`#9090a8`) y `faint` (`#c0c0d0`) son los grises atenuados de la UI principal.
> Usá `weight`/`transform` para casos como un `body` en negrita o un valor capitalizado
> sin crear un `variant` nuevo.

---

## Label

```tsx
import { Label } from '@/components/ui'

<Label htmlFor="email">Correo electrónico</Label>
<Label htmlFor="pass" required>Contraseña</Label>
<Label disabled>Campo deshabilitado</Label>
```

`required` agrega ` *` en color de error (con `aria-hidden`). Normalmente lo renderiza `<Input>`.

---

## Badge

```tsx
import { Badge } from '@/components/ui'

<Badge variant="success" dot>activo</Badge>
<Badge variant="warning" size="sm">buscando…</Badge>
<Badge variant="error">No disponible</Badge>
<Badge variant="info">Enviada</Badge>
<Badge variant="accent" rounded dot>Solicitud activa</Badge>
<Badge>default</Badge>
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `variant` | `default \| success \| warning \| error \| info \| accent` | `'default'` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `dot` | `boolean` (círculo del color del texto, antes del children) | `false` |
| `rounded` | `boolean` (border-radius full) | `false` |

---

## Divider

```tsx
import { Divider } from '@/components/ui'

<Divider />
<Divider label="o continuá con" />
<Divider spacing="lg" />
<Divider orientation="vertical" />
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `label` | `string` (línea + texto + línea) | — |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `spacing` | `'sm' \| 'md' \| 'lg'` (8 / 16 / 24px) | `'md'` |

---

## Avatar

```tsx
import { Avatar } from '@/components/ui'

<Avatar initials="NJ" />
<Avatar initials="S" size="sm" color="purple" />
<Avatar initials="AB" size="lg" color="green" online />
<Avatar initials="CD" size="xs" color="orange" />
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `initials` | `string` (obligatorio) | — |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` (24 / 28 / 36 / 48px) | `'md'` |
| `color` | `'purple' \| 'green' \| 'orange' \| 'default'` | `'default'` |
| `online` | `boolean` (dot verde abajo-derecha) | `false` |

---

## Icon

Envuelve un ícono (típicamente de `lucide-react`) inyectándole `size` y `color` vía
`cloneElement`.

```tsx
import { Icon } from '@/components/ui'
import { Mail } from 'lucide-react'
import { theme } from '@/styles/theme'

<Icon icon={<Mail />} size={14} color={theme.colors.text.tertiary} />
<Icon icon={<Mail size={16} />} />   // hereda color por currentColor
```

| Prop | Tipo | Default |
| --- | --- | --- |
| `icon` | `React.ReactNode` (obligatorio) | — |
| `size` | `number` | — |
| `color` | `string` | — |
| `className` | `string` | — |

---

## Cómo agregar un nuevo componente

1. **Crear la carpeta** `src/components/ui/<NombreComponente>/`.
2. **Crear los tipos** en `<NombreComponente>.types.ts` (interfaces/uniones explícitas, sin `any`).
3. **Crear el componente** en `index.tsx`:
   - `'use client'` al inicio.
   - `styled-components` con tokens de `@/styles/theme` (nada hardcodeado).
   - Props transientes con `$`; `displayName` en cada styled y en el componente exportado.
   - Solo presentación, sin lógica de negocio.
4. **Exportar desde el barrel** `src/components/ui/index.ts`:
   ```ts
   export { NombreComponente } from './NombreComponente'
   export type { NombreComponenteProps } from './NombreComponente/NombreComponente.types'
   ```
