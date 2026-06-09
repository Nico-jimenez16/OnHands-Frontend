'use client'

import styled, { keyframes, css } from 'styled-components'
import { theme } from '@/styles/theme'
import type { Provider } from '@/types'
import { Avatar, Text } from '@/components/ui'
import type { AvatarColor } from '@/components/ui'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
`

type Rank = 1 | 2 | 3

const rankColor = (rank: Rank): AvatarColor =>
  rank === 1 ? 'purple' : rank === 2 ? 'green' : 'orange'

const rankBar = (rank: Rank) =>
  rank === 1
    ? theme.colors.accent.purple
    : rank === 2
    ? theme.colors.status.success
    : theme.colors.status.warning

const Card = styled.div<{ $rank: Rank }>`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.bg.primary};
  border: ${({ $rank }) =>
    $rank === 1
      ? `1.5px solid ${theme.colors.accent.purple}`
      : `1px solid ${theme.colors.border.light}`};
  border-radius: ${theme.radius.lg};
`

const BestMatchBadge = styled.div`
  display: inline-block;
  padding: 2px 8px;
  background-color: ${theme.colors.accent.purple};
  color: #fff;
  font-size: ${theme.fontSize.xs};
  font-weight: 600;
  border-radius: ${theme.radius.sm};
  margin-bottom: ${theme.spacing.sm};
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`

const Info = styled.div`
  flex: 1;
  min-width: 0;
`

// Nombre del profesional: 13px/600 con truncado; sin variante equivalente en <Text>.
const Name = styled.div`
  font-size: ${theme.fontSize.base};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Metrics = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
`

const Metric = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: ${theme.spacing.xs} 0;
  background-color: ${theme.colors.bg.tertiary};
  border-radius: ${theme.radius.sm};
`

const MetricValue = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  color: ${theme.colors.text.primary};
`

const MetricLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text.tertiary};
`

const BarSection = styled.div`
  margin-top: ${theme.spacing.sm};
`

const BarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`

const BarText = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text.secondary};
`

const BarTrack = styled.div`
  height: 5px;
  background-color: ${theme.colors.bg.tertiary};
  border-radius: ${theme.radius.full};
  overflow: hidden;
`

const BarFill = styled.div<{ $width: number; $rank: Rank }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background-color: ${({ $rank }) => rankBar($rank)};
  border-radius: ${theme.radius.full};
  transition: width 0.4s ease;
`

const StatusBadge = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
  font-size: ${theme.fontSize.xs};
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: ${({ $status }) =>
    $status === 'accepted'
      ? theme.colors.status.successBg
      : $status === 'rejected'
      ? theme.colors.status.errorBg
      : theme.colors.status.warningBg};
  color: ${({ $status }) =>
    $status === 'accepted'
      ? theme.colors.status.successText
      : $status === 'rejected'
      ? theme.colors.status.error
      : theme.colors.status.warningText};
`

const StatusDot = styled.span<{ $pulsing: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  flex-shrink: 0;
  ${({ $pulsing }) =>
    $pulsing &&
    css`
      animation: ${pulse} 1.4s ease-in-out infinite;
    `}
`

const statusLabel = (status: string) => {
  if (status === 'notified') return 'Esperando aceptación...'
  if (status === 'accepted') return 'Aceptó ✓'
  if (status === 'queue') return 'En cola (backup)'
  if (status === 'rejected') return 'No disponible'
  return status
}

interface ProviderCardProps {
  provider: Provider
  rank: 1 | 2 | 3
}

export function ProviderCard({ provider, rank }: ProviderCardProps) {
  return (
    <Card $rank={rank}>
      {rank === 1 && <BestMatchBadge>Mejor match</BestMatchBadge>}
      <TopRow>
        <Avatar initials={provider.initials} size="md" color={rankColor(rank)} />
        <Info>
          <Name>{provider.name}</Name>
          <Text variant="hint" color="tertiary" as="div">
            {provider.specialty}
          </Text>
        </Info>
      </TopRow>
      <Metrics>
        <Metric>
          <MetricValue>{provider.rating.toFixed(1)}</MetricValue>
          <MetricLabel>Rating</MetricLabel>
        </Metric>
        <Metric>
          <MetricValue>{provider.distanceKm} km</MetricValue>
          <MetricLabel>Distancia</MetricLabel>
        </Metric>
        <Metric>
          <MetricValue>{provider.acceptanceRate}%</MetricValue>
          <MetricLabel>Acepta</MetricLabel>
        </Metric>
      </Metrics>
      <BarSection>
        <BarHeader>
          <BarText>Compatibilidad</BarText>
          <BarText>{provider.matchScore}%</BarText>
        </BarHeader>
        <BarTrack>
          <BarFill $width={provider.matchScore} $rank={rank} />
        </BarTrack>
      </BarSection>
      <StatusBadge $status={provider.status}>
        <StatusDot $pulsing={provider.status === 'notified'} />
        {statusLabel(provider.status)}
      </StatusBadge>
    </Card>
  )
}
