'use client'

import React from 'react'
import { Shell } from './MainLayout.styles'

interface MainLayoutProps {
  header: React.ReactNode
  sidebar: React.ReactNode
  chat: React.ReactNode
  panel: React.ReactNode
}

export function MainLayout({ header, sidebar, chat, panel }: MainLayoutProps) {
  return (
    <Shell>
      {header}
      {sidebar}
      {chat}
      {panel}
    </Shell>
  )
}
