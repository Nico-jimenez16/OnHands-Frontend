export const theme = {
  colors: {
    bg: {
      primary: '#f5f5f8',
      secondary: '#ffffff',
      tertiary: '#f8f8fc',
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
      purple: '#534AB7',
      purpleLight: '#f0eeff',
      purpleMid: '#c8c0f0',
    },
    avatarNavy: {
      bg: '#1e1b3a',
      text: '#9f99f0',
    },
    status: {
      success: '#22c55e',
      successBg: '#f0fdf4',
      successText: '#22c55e',
      warning: '#f59e0b',
      warningBg: '#fff8ec',
      warningText: '#f59e0b',
      error: '#ef4444',
      errorBg: '#fff1f0',
      info: '#3b82f6',
      infoBg: '#eef5ff',
      infoText: '#3b82f6',
    },
    provider: {
      rank1Bg: '#f0eeff', rank1Text: '#534AB7',
      rank2Bg: '#f0fdf4', rank2Text: '#22c55e',
      rank3Bg: '#fff8ec', rank3Text: '#f59e0b',
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
