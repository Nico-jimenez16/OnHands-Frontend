'use client'

import styled, { keyframes, css } from 'styled-components'
import { ClipboardList, Calendar, FileText, Headphones, ChevronRight } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { useMatchStream } from '@/hooks/useMatchStream'
import type { Provider, ServiceRequest } from '@/types'
import { light, tint } from './palette'

const Panel = styled.aside`
  background: ${light.surface};
  border-left: 1px solid ${light.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${light.border};
`

const Title = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0f0f1a;
  margin-bottom: 2px;
`

const Sub = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #9090a8;
`

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 14px 16px;
  gap: 14px;
  min-height: 0;
`

const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

const StatCard = styled.div`
  background: ${light.surfaceAlt};
  border: 1px solid ${light.border};
  border-radius: 10px;
  padding: 10px 12px;
`

const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #0f0f1a;
  letter-spacing: -0.3px;
`

const StatLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: #9090a8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`

const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
`

const EmptyIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${light.bg};
  border: 1px solid #e8e8f2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;

  svg {
    color: ${light.textFaint};
  }
`

const EmptyText = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #9090a8;
  line-height: 1.6;
  max-width: 160px;
`

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const ActivityLabel = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 600;
  color: #9090a8;
  margin-bottom: 8px;
`

const ActivityItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: ${light.surfaceAlt};
  border: 1px solid ${light.border};
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  width: 100%;
`

const ActivityIcon = styled.div<{ $bg: string; $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};

  svg {
    color: inherit;
  }
`

const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
`

const ActivityTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #1a1a2e;
`

const ActivitySub = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #9090a8;
`

const Arrow = styled(ChevronRight)`
  color: ${light.textFaint};
  flex-shrink: 0;
`

// --- Resumen de la solicitud (versión clara) ---

const SummaryCard = styled.div`
  background: ${light.surfaceAlt};
  border: 1px solid ${light.border};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SummaryCategory = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${light.text};
  text-transform: capitalize;
`

const SummaryField = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
`

const SummaryFieldLabel = styled.span`
  width: 60px;
  flex-shrink: 0;
  color: ${light.textSoft};
`

const SummaryFieldValue = styled.span`
  color: ${light.textMuted};
`

function RequestSummary({ request }: { request: ServiceRequest }) {
  return (
    <SummaryCard>
      <SummaryCategory>{request.category || 'Solicitud de servicio'}</SummaryCategory>
      {request.address && (
        <SummaryField>
          <SummaryFieldLabel>Dirección</SummaryFieldLabel>
          <SummaryFieldValue>{request.address}</SummaryFieldValue>
        </SummaryField>
      )}
      {request.scheduledDate && (
        <SummaryField>
          <SummaryFieldLabel>Fecha</SummaryFieldLabel>
          <SummaryFieldValue>{request.scheduledDate}</SummaryFieldValue>
        </SummaryField>
      )}
      {request.timePreference && (
        <SummaryField>
          <SummaryFieldLabel>Horario</SummaryFieldLabel>
          <SummaryFieldValue>{request.timePreference}</SummaryFieldValue>
        </SummaryField>
      )}
    </SummaryCard>
  )
}

// --- Tarjeta de profesional (versión clara) ---

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`

const ProviderCardBox = styled.div<{ $best: boolean }>`
  background: ${light.surface};
  border: ${({ $best }) =>
    $best ? `1.5px solid ${light.accent}` : `1px solid ${light.border}`};
  border-radius: 10px;
  padding: 12px;
`

const BestBadge = styled.div`
  display: inline-block;
  padding: 2px 8px;
  background: ${light.accent};
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  border-radius: 6px;
  margin-bottom: 8px;
`

const ProviderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ProviderAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${light.accentBg};
  color: ${light.accent};
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const ProviderInfo = styled.div`
  min-width: 0;
`

const ProviderName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${light.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProviderSpecialty = styled.div`
  font-size: 11px;
  color: ${light.textSoft};
`

const BarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 4px;
  font-size: 11px;
  color: ${light.textMuted};
`

const BarTrack = styled.div`
  height: 5px;
  background: ${light.bg};
  border-radius: 9999px;
  overflow: hidden;
`

const BarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${light.accent};
  border-radius: 9999px;
  transition: width 0.4s ease;
`

const StatusPill = styled.div<{ $tint: { bg: string; color: string } }>`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: ${({ $tint }) => $tint.bg};
  color: ${({ $tint }) => $tint.color};
`

const StatusDot = styled.span<{ $pulsing: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  ${({ $pulsing }) =>
    $pulsing &&
    css`
      animation: ${pulse} 1.4s ease-in-out infinite;
    `}
`

function statusLabel(status: Provider['status']) {
  if (status === 'notified') return 'Esperando aceptación...'
  if (status === 'accepted') return 'Aceptó ✓'
  if (status === 'queue') return 'En cola (backup)'
  if (status === 'rejected') return 'No disponible'
  return status
}

function statusTint(status: Provider['status']) {
  if (status === 'accepted') return tint.green
  if (status === 'rejected') return tint.red
  return tint.amber
}

function ProviderItem({ provider }: { provider: Provider }) {
  const best = provider.rank === 1
  return (
    <ProviderCardBox $best={best}>
      {best && <BestBadge>Mejor match</BestBadge>}
      <ProviderTop>
        <ProviderAvatar>{provider.initials}</ProviderAvatar>
        <ProviderInfo>
          <ProviderName>{provider.name}</ProviderName>
          <ProviderSpecialty>{provider.specialty}</ProviderSpecialty>
        </ProviderInfo>
      </ProviderTop>
      <BarHeader>
        <span>Compatibilidad</span>
        <span>{provider.matchScore}%</span>
      </BarHeader>
      <BarTrack>
        <BarFill $width={provider.matchScore} />
      </BarTrack>
      <StatusPill $tint={statusTint(provider.status)}>
        <StatusDot $pulsing={provider.status === 'notified'} />
        {statusLabel(provider.status)}
      </StatusPill>
    </ProviderCardBox>
  )
}

const ProvidersWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Notice = styled.div`
  padding: 8px 12px;
  background: ${light.accentBg};
  border: 1px solid ${light.accentBorder};
  border-radius: 8px;
  font-size: 11px;
  color: ${light.accent};
  line-height: 1.4;
`

export function RequestPanel() {
  const { activeRequest, requestId } = useChatStore()
  const { providers, matchStatus } = useMatchStream(requestId)

  const sortedProviders = [...providers].sort((a, b) => b.matchScore - a.matchScore)

  // Stats: el backend no expone conteos agregados, así que "activas" se deriva de la
  // solicitud en curso y "completadas" queda en 0.
  // TODO(stats): cablear a un endpoint de métricas cuando exista.
  const active = activeRequest ? 1 : 0
  const completed = 0

  return (
    <Panel>
      <Header>
        <Title>Panel de solicitud</Title>
        <Sub>{activeRequest ? 'solicitud en curso' : 'sin actividad activa'}</Sub>
      </Header>

      <Body>
        <StatRow>
          <StatCard>
            <StatValue>{active}</StatValue>
            <StatLabel>activas</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{completed}</StatValue>
            <StatLabel>completadas</StatLabel>
          </StatCard>
        </StatRow>

        {!activeRequest ? (
          <Empty>
            <EmptyIcon>
              <ClipboardList size={20} />
            </EmptyIcon>
            <EmptyText>
              Tu solicitud y los profesionales disponibles aparecerán aquí
            </EmptyText>
          </Empty>
        ) : (
          <>
            <RequestSummary request={activeRequest} />
            {sortedProviders.length > 0 && (
              <ProvidersWrap>
                {matchStatus === 'notified' && (
                  <Notice>
                    Solicitud enviada al mejor match. Esperando respuesta...
                  </Notice>
                )}
                {sortedProviders.map((provider) => (
                  <ProviderItem key={provider.id} provider={provider} />
                ))}
              </ProvidersWrap>
            )}
          </>
        )}

        <ActivityList>
          <ActivityLabel>Acciones rápidas</ActivityLabel>
          <ActivityItem type="button">
            <ActivityIcon $bg={tint.blue.bg} $color={tint.blue.color}>
              <Calendar size={13} />
            </ActivityIcon>
            <ActivityText>
              <ActivityTitle>Mis turnos</ActivityTitle>
              <ActivitySub>Ver agenda completa</ActivitySub>
            </ActivityText>
            <Arrow size={14} />
          </ActivityItem>
          <ActivityItem type="button">
            <ActivityIcon $bg={tint.purple.bg} $color={tint.purple.color}>
              <FileText size={13} />
            </ActivityIcon>
            <ActivityText>
              <ActivityTitle>Historial</ActivityTitle>
              <ActivitySub>Servicios anteriores</ActivitySub>
            </ActivityText>
            <Arrow size={14} />
          </ActivityItem>
          <ActivityItem type="button">
            <ActivityIcon $bg={tint.teal.bg} $color={tint.teal.color}>
              <Headphones size={13} />
            </ActivityIcon>
            <ActivityText>
              <ActivityTitle>Soporte</ActivityTitle>
              <ActivitySub>Contactar al equipo</ActivitySub>
            </ActivityText>
            <Arrow size={14} />
          </ActivityItem>
        </ActivityList>
      </Body>
    </Panel>
  )
}
