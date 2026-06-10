import styled, { css } from 'styled-components'
import { Badge, Text } from '@/components/ui'
import { light } from './palette'

export const Nav = styled.nav`
  background: ${light.surface};
  border-right: 1px solid ${light.border};
  display: flex;
  flex-direction: column;
  padding: 14px 10px;
  gap: 2px;
  overflow: hidden;
`

// Rótulo de sección: tipografía en el átomo <Text>, padding propio de la barra.
export const SectionLabel = styled(Text)`
  padding: 10px 8px 4px;
`

const activeStyles = css`
  background: ${light.accentBg};
  color: ${light.accent};
  font-weight: 600;

  svg {
    color: ${light.accent};
  }
`

export const Item = styled.button<{ $active?: boolean }>`
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

export const ItemBadge = styled(Badge)`
  margin-left: auto;
`

export const Footer = styled.div`
  margin-top: auto;
  border-top: 1px solid ${light.border};
  padding-top: 10px;
`
