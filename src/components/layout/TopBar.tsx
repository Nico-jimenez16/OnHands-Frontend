'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'

const Bar = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: 0 ${theme.spacing.xl};
  height: ${theme.layout.topbarHeight};
  border-bottom: 1px solid ${theme.colors.border.light};
  background-color: ${theme.colors.bg.secondary};
`

const LogoMark = styled.div`
  width: 26px;
  height: 26px;
  border-radius: ${theme.radius.sm};
  background-color: ${theme.colors.accent.purple};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  flex-shrink: 0;
`

const Logo = styled.span`
  font-size: ${theme.fontSize.xl};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.3px;
`

const Right = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`

const RequestBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 3px 10px;
  background-color: ${theme.colors.accent.purpleLight};
  border: 1px solid #3a3070;
  border-radius: ${theme.radius.full};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.accent.purpleMid};
  font-weight: 500;
`

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${theme.colors.accent.purple};
`

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${theme.radius.full};
  background-color: #2a2048;
  color: ${theme.colors.accent.purpleMid};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.sm};
  font-weight: 500;
  text-transform: uppercase;
`

interface TopBarProps {
  activeRequestId?: string
  userName?: string
}

export function TopBar({ activeRequestId, userName = 'U' }: TopBarProps) {
  const initials = userName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <Bar>
      <LogoMark>OH</LogoMark>
      <Logo>OnHands</Logo>
      <Right>
        <RequestBadge>
          {activeRequestId ? (
            <>
              <Dot />
              Solicitud activa · {activeRequestId}
            </>
          ) : (
            'sin solicitudes activas'
          )}
        </RequestBadge>
        <Avatar>{initials || 'U'}</Avatar>
      </Right>
    </Bar>
  )
}
