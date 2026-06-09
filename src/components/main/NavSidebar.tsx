'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import styled, { css } from 'styled-components'
import type { LucideProps } from 'lucide-react'
import {
  MessageCircle,
  ClipboardList,
  Clock,
  Star,
  Droplet,
  Zap,
  Wrench,
  Wind,
  Paintbrush,
  Sparkles,
  Truck,
  Leaf,
  Settings,
} from 'lucide-react'
import { light } from './palette'

type IconType = ComponentType<LucideProps>

interface NavItem {
  id: string
  Icon: IconType
  label: string
  badge?: string
}

// Items de navegación. Solo UI: el diseño no define destinos de ruteo, así que el
// estado activo es local y visual.
const MAIN_ITEMS: NavItem[] = [
  { id: 'assistant', Icon: MessageCircle, label: 'Asistente', badge: 'nuevo' },
  { id: 'requests', Icon: ClipboardList, label: 'Mis solicitudes' },
  { id: 'history', Icon: Clock, label: 'Historial' },
  { id: 'favorites', Icon: Star, label: 'Favoritos' },
]

const SERVICE_ITEMS: NavItem[] = [
  { id: 'plumbing', Icon: Droplet, label: 'Plomería' },
  { id: 'electric', Icon: Zap, label: 'Electricidad' },
  { id: 'masonry', Icon: Wrench, label: 'Albañilería' },
  { id: 'ac', Icon: Wind, label: 'Aire acond.' },
  { id: 'paint', Icon: Paintbrush, label: 'Pintura' },
  { id: 'cleaning', Icon: Sparkles, label: 'Limpieza' },
  { id: 'moving', Icon: Truck, label: 'Mudanzas' },
  { id: 'garden', Icon: Leaf, label: 'Jardín' },
]

const Nav = styled.nav`
  background: ${light.surface};
  border-right: 1px solid ${light.border};
  display: flex;
  flex-direction: column;
  padding: 14px 10px;
  gap: 2px;
  overflow: hidden;
`

const SectionLabel = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.9px;
  font-weight: 600;
  color: #9090a8;
  padding: 10px 8px 4px;
`

const activeStyles = css`
  background: ${light.accentBg};
  color: #534AB7;
  font-weight: 600;

  svg {
    color: ${light.accent};
  }
`

const Item = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12.5px;
  color: #4a4a62;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.1s, color 0.1s;

  svg {
    color: ${light.textFaint};
    flex-shrink: 0;
  }

  &:hover {
    background: ${light.bg};
    color: #404050;
  }

  ${({ $active }) => $active && activeStyles}
`

const ItemBadge = styled.span`
  margin-left: auto;
  font-size: 10px;
  background: ${light.accentBg};
  color: ${light.accent};
  padding: 2px 7px;
  border-radius: 10px;
  font-weight: 600;
`

const Footer = styled.div`
  margin-top: auto;
  border-top: 1px solid ${light.border};
  padding-top: 10px;
`

export function NavSidebar() {
  const [activeId, setActiveId] = useState('assistant')

  const renderItem = ({ id, Icon, label, badge }: NavItem) => (
    <Item key={id} $active={activeId === id} onClick={() => setActiveId(id)}>
      <Icon size={15} />
      {label}
      {badge && <ItemBadge>{badge}</ItemBadge>}
    </Item>
  )

  return (
    <Nav>
      <SectionLabel>Principal</SectionLabel>
      {MAIN_ITEMS.map(renderItem)}

      <SectionLabel>Servicios</SectionLabel>
      {SERVICE_ITEMS.map(renderItem)}

      <Footer>
        <Item
          $active={activeId === 'settings'}
          onClick={() => setActiveId('settings')}
        >
          <Settings size={15} />
          Configuración
        </Item>
      </Footer>
    </Nav>
  )
}
