'use client'

import React from 'react'
import styled from 'styled-components'
import { light } from './palette'

const Shell = styled.div`
  display: grid;
  grid-template-rows: 52px 1fr;
  grid-template-columns: 220px 1fr 280px;
  height: 100vh;
  overflow: hidden;
  background: ${light.bg};
`

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
