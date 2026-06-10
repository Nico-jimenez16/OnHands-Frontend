'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
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
import { Nav, SectionLabel, Item, ItemBadge, Footer } from './NavSidebar.styles'

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

export function NavSidebar() {
  const [activeId, setActiveId] = useState('assistant')

  const renderItem = ({ id, Icon, label, badge }: NavItem) => (
    <Item key={id} $active={activeId === id} onClick={() => setActiveId(id)}>
      <Icon size={15} />
      {label}
      {badge && (
        <ItemBadge variant="accent" size="sm" rounded>
          {badge}
        </ItemBadge>
      )}
    </Item>
  )

  return (
    <Nav>
      <SectionLabel variant="eyebrow" color="soft">Principal</SectionLabel>
      {MAIN_ITEMS.map(renderItem)}

      <SectionLabel variant="eyebrow" color="soft">Servicios</SectionLabel>
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
