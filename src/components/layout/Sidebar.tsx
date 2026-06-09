'use client'

import { useState } from 'react'
import styled, { css } from 'styled-components'
import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { theme } from '@/styles/theme'
import { Text } from '@/components/ui'
import { useServiceCategories } from '@/hooks/useServiceCategories'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid ${theme.colors.border.light};
  background-color: ${theme.colors.bg.secondary};
  padding: ${theme.spacing.md} 0;
`

const Section = styled.div`
  padding: 0 ${theme.spacing.sm};
`

// Contenedor que conserva el espaciado del label de sección; el texto en sí
// usa <Text variant="eyebrow"> de la librería.
const SectionLabel = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`

const activeItemStyles = css`
  background-color: ${theme.colors.accent.purpleLight};
  color: ${theme.colors.accent.purple};

  svg {
    color: ${theme.colors.accent.purple};
  }
`

const Item = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.sm};
  border-radius: ${theme.radius.md};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.secondary};
  transition: background-color 0.15s, color 0.15s;
  text-align: left;

  svg {
    color: ${theme.colors.text.tertiary};
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${theme.colors.bg.tertiary};
    color: ${theme.colors.text.primary};
  }

  ${({ $active }) => $active && activeItemStyles}
`

const BottomSection = styled.div`
  margin-top: auto;
  padding: ${theme.spacing.md} ${theme.spacing.sm} 0;
  border-top: 1px solid ${theme.colors.border.light};
`

function DynamicIcon({ name, size = 15 }: { name: string; size?: number }) {
  const key = (name.charAt(0).toUpperCase() + name.slice(1)) as keyof typeof LucideIcons
  const Icon = LucideIcons[key] as React.ComponentType<LucideProps> | undefined
  if (!Icon) return null
  return <Icon size={size} />
}

const NAV_ITEMS = [
  { id: 'requests', icon: 'clipboardList', label: 'Mis solicitudes' },
  { id: 'history', icon: 'clock', label: 'Historial' },
  { id: 'favorites', icon: 'heart', label: 'Favoritos' },
]

export function Sidebar() {
  const [activeId, setActiveId] = useState('requests')
  const categories = useServiceCategories()

  return (
    <Nav>
      <Section>
        {NAV_ITEMS.map((item) => (
          <Item
            key={item.id}
            $active={activeId === item.id}
            onClick={() => setActiveId(item.id)}
          >
            <DynamicIcon name={item.icon} />
            {item.label}
          </Item>
        ))}
      </Section>

      <SectionLabel>
        <Text variant="eyebrow" color="tertiary" as="span">
          Servicios
        </Text>
      </SectionLabel>
      <Section>
        {categories.map((cat) => (
          <Item
            key={cat.icon}
            $active={activeId === cat.icon}
            onClick={() => setActiveId(cat.icon)}
          >
            <DynamicIcon name={cat.icon} />
            {cat.label}
          </Item>
        ))}
      </Section>

      <BottomSection>
        <Item
          $active={activeId === 'settings'}
          onClick={() => setActiveId('settings')}
        >
          <DynamicIcon name="settings" />
          Configuración
        </Item>
      </BottomSection>
    </Nav>
  )
}
