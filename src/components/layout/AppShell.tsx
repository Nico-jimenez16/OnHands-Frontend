'use client'

import React from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'

const Shell = styled.div`
  display: grid;
  grid-template-columns: ${theme.layout.sidebarWidth} 1fr ${theme.layout.contextPanelWidth};
  grid-template-rows: ${theme.layout.topbarHeight} 1fr;
  height: 100vh;
  overflow: hidden;
  background-color: ${theme.colors.bg.primary};
`

const MainArea = styled.main`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  background-color: ${theme.colors.bg.primary};
`

interface AppShellProps {
  topbar?: React.ReactNode
  sidebar?: React.ReactNode
  contextPanel?: React.ReactNode
  children: React.ReactNode
}

export function AppShell({ topbar, sidebar, contextPanel, children }: AppShellProps) {
  return (
    <Shell>
      {topbar}
      {sidebar}
      <MainArea>{children}</MainArea>
      {contextPanel}
    </Shell>
  )
}
