// Paleta clara propia de la nueva interfaz principal (/app).
//
// NOTE: El theme compartido (src/styles/theme.ts) es OSCURO (violeta/negro) y está
// fuera de límites para modificar. El diseño v2 de la pantalla principal es CLARO,
// así que —siguiendo el mismo criterio que src/app/login/page.tsx— esta vista define
// su propia paleta hardcodeada acá. Centralizar los hex evita repetirlos en cada
// styled-component y mantener todo el estilo fuera de inline styles.
// TODO(ui-theme): si en el futuro el theme soporta modo claro, migrar estos tokens.

export const light = {
  bg: '#f5f5f8',
  surface: '#ffffff',
  surfaceAlt: '#f8f8fc',

  border: '#d8d8e8',
  borderInput: '#d0d0e0',
  borderSoft: '#cfcfdf',

  text: '#0f0f1a',
  textMuted: '#3a3a52',
  textSoft: '#9090a8',
  textFaint: '#c0c0d0',
  textPlan: '#a0a0b8',
  labelFaint: '#b0b0c0',

  accent: '#534AB7',
  accentBg: '#f0eeff',
  accentBorder: '#c8c0f0',
  accentSurface: '#faf9ff',

  brandDot: '#ef9f27',
  navy: '#1a1a2e',

  avatarBg: '#1e1b3a',
  avatarText: '#9f99f0',
} as const

// Pares bg/color por categoría (íconos de categoría y acciones rápidas).
export const tint = {
  blue: { bg: '#eef5ff', color: '#3b82f6' },
  amber: { bg: '#fff8ec', color: '#f59e0b' },
  gray: { bg: '#f7f7f8', color: '#6b7280' },
  teal: { bg: '#f0fdfa', color: '#14b8a6' },
  purple: { bg: '#f5f0ff', color: '#8b5cf6' },
  green: { bg: '#f0fdf4', color: '#22c55e' },
  red: { bg: '#fff1f0', color: '#ef4444' },
} as const

export type Tint = keyof typeof tint
