'use client'

import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { StyledRegistry } from '@/styles/StyledRegistry'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledRegistry>
  )
}
