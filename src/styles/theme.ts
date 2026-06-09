export const theme = {
  colors: {
    bg: {
      primary: '#0e0e10',
      secondary: '#13131a',
      tertiary: '#18181f',
    },
    text: {
      primary: '#0f0f1a',
      secondary: '#3a3a52',
      tertiary: '#6b6b85',
    },
    border: {
      light: '#d8d8e8',
      medium: '#b8b8d0',
    },
    accent: {
      purple: '#7c6df0',
      purpleLight: '#1e1b3a',
      purpleMid: '#a99cf4',
    },
    status: {
      success: '#4ade80',
      successBg: '#0d2010',
      successText: '#4ade80',
      warning: '#fbbf24',
      warningBg: '#2a1f0a',
      warningText: '#fbbf24',
      error: '#f87171',
      errorBg: '#2a0f0f',
      info: '#a99cf4',
      infoBg: '#1e1b3a',
      infoText: '#c4bcf8',
    },
    provider: {
      rank1Bg: '#1e1b3a', rank1Text: '#c4bcf8',
      rank2Bg: '#0d2010', rank2Text: '#4ade80',
      rank3Bg: '#2a1f0a', rank3Text: '#fbbf24',
    },
  },
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  spacing: {
    xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px', xxl: '32px',
  },
  radius: {
    sm: '6px', md: '8px', lg: '12px', xl: '16px', full: '9999px',
  },
  fontSize: {
    xs: '10px', sm: '11px', md: '12.5px', base: '13px', lg: '14px', xl: '15px',
  },
  layout: {
    sidebarWidth: '200px',
    contextPanelWidth: '260px',
    topbarHeight: '48px',
  },
} as const

export type Theme = typeof theme
