'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { Search, Bell } from 'lucide-react'
import { Avatar } from '@/components/ui'
import { light } from './palette'

const Bar = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  background: ${light.surface};
  border-bottom: 1px solid ${light.border};
  padding: 0 20px;
`

const Brand = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
  border-right: 1px solid ${light.border};
  flex-shrink: 0;
`

const BrandDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${light.brandDot};
`

const BrandName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #0f0f1a;
  letter-spacing: -0.3px;
`

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${light.bg};
  border: 1px solid ${light.borderInput};
  border-radius: 8px;
  padding: 6px 12px;
  flex: 1;
  max-width: 320px;

  svg {
    color: ${light.textFaint};
    flex-shrink: 0;
  }
`

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 12.5px;
  color: ${light.textMuted};

  &::placeholder {
    color: ${light.textFaint};
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 280px;
  padding-left: 16px;
  border-left: 1px solid ${light.border};
  flex-shrink: 0;
`

const NotifButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${light.bg};
  border: 1px solid ${light.borderInput};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: ${light.textSoft};
  }
`

const UserBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`

const UserName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #0f0f1a;
`

const UserPlan = styled.span`
  font-size: 10px;
  color: #6b6b85;
`

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
        <SearchBox>
          <Search size={15} />
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar servicios, profesionales..."
          />
        </SearchBox>
      </Center>

      <Right>
        <NotifButton type="button" aria-label="Notificaciones">
          <Bell size={15} />
        </NotifButton>
        <Avatar initials="NJ" size="sm" color="navy" />
        <UserBlock>
          <UserName>Nicolás J.</UserName>
          <UserPlan>Plan gratuito</UserPlan>
        </UserBlock>
      </Right>
    </Bar>
  )
}
