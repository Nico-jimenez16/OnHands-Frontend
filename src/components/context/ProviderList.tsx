'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { Provider } from '@/types'
import { ProviderCard } from './ProviderCard'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const Notification = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.status.infoBg};
  border: 1px solid ${theme.colors.accent.purpleMid};
  border-radius: ${theme.radius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.status.infoText};
  line-height: 1.4;
`

interface ProviderListProps {
  providers: Provider[]
  matchStatus: string
}

export function ProviderList({ providers, matchStatus }: ProviderListProps) {
  const sorted = [...providers].sort((a, b) => b.matchScore - a.matchScore)

  return (
    <Wrapper>
      {matchStatus === 'notified' && (
        <Notification>
          Solicitud enviada al mejor match. Esperando respuesta...
        </Notification>
      )}
      {sorted.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} rank={provider.rank} />
      ))}
    </Wrapper>
  )
}
