'use client'

import { useState } from 'react'
import { Search, Bell } from 'lucide-react'
import { Avatar, Input, Text } from '@/components/ui'
import {
  Bar,
  Brand,
  BrandDot,
  BrandName,
  Center,
  SearchWrap,
  Right,
  NotifButton,
  UserBlock,
} from './AppHeader.styles'

export function AppHeader() {
  // El diseño no define una acción para la búsqueda; el input es visual/local.
  const [query, setQuery] = useState('')

  return (
    <Bar>
      <Brand>
        <BrandDot />
        <BrandName>OnHands</BrandName>
      </Brand>

      <Center>
        <SearchWrap>
          <Input
            size="sm"
            fullWidth
            leftIcon={<Search size={15} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar servicios, profesionales..."
          />
        </SearchWrap>
      </Center>

      <Right>
        <NotifButton type="button" aria-label="Notificaciones">
          <Bell size={15} />
        </NotifButton>
        <Avatar initials="NJ" size="sm" color="navy" />
        <UserBlock>
          <Text as="span" variant="caption" weight={600} color="primary">
            Nicolás J.
          </Text>
          <Text as="span" variant="hint" color="tertiary">
            Plan gratuito
          </Text>
        </UserBlock>
      </Right>
    </Bar>
  )
}
