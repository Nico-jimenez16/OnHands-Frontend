'use client'

import { ClipboardList, Calendar, FileText, Headphones } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { useMatchStream } from '@/hooks/useMatchStream'
import type { Provider, ServiceRequest } from '@/types'
import { Text } from '@/components/ui'
import { tint } from './palette'
import {
  Panel,
  Header,
  Body,
  StatRow,
  StatCard,
  Empty,
  EmptyIcon,
  EmptyText,
  ActivityList,
  ActivityLabel,
  ActivityItem,
  ActivityIcon,
  ActivityText,
  Arrow,
  SummaryCard,
  SummaryField,
  SummaryFieldLabel,
  SummaryFieldValue,
  ProviderCardBox,
  BestBadge,
  ProviderTop,
  ProviderAvatar,
  ProviderInfo,
  BarHeader,
  BarTrack,
  BarFill,
  StatusPill,
  StatusDot,
  ProvidersWrap,
  Notice,
} from './RequestPanel.styles'

function RequestSummary({ request }: { request: ServiceRequest }) {
  return (
    <SummaryCard>
      <Text variant="body" weight={600} color="primary" transform="capitalize">
        {request.category || 'Solicitud de servicio'}
      </Text>
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
      {best && (
        <BestBadge variant="accentSolid" size="sm">
          Mejor match
        </BestBadge>
      )}
      <ProviderTop>
        <ProviderAvatar>{provider.initials}</ProviderAvatar>
        <ProviderInfo>
          <Text variant="bodySmall" weight={600} color="primary" truncate>
            {provider.name}
          </Text>
          <Text variant="hint" color="soft">
            {provider.specialty}
          </Text>
        </ProviderInfo>
      </ProviderTop>
      <BarHeader>
        <Text as="span" variant="hint" color="secondary">
          Compatibilidad
        </Text>
        <Text as="span" variant="hint" color="secondary">
          {provider.matchScore}%
        </Text>
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
        <Text variant="bodySmall" weight={600} color="primary">
          Panel de solicitud
        </Text>
        <Text variant="hint" color="soft">
          {activeRequest ? 'solicitud en curso' : 'sin actividad activa'}
        </Text>
      </Header>

      <Body>
        <StatRow>
          <StatCard>
            <Text variant="heading3" weight={700} color="primary">
              {active}
            </Text>
            <Text variant="eyebrow" color="soft">
              activas
            </Text>
          </StatCard>
          <StatCard>
            <Text variant="heading3" weight={700} color="primary">
              {completed}
            </Text>
            <Text variant="eyebrow" color="soft">
              completadas
            </Text>
          </StatCard>
        </StatRow>

        {!activeRequest ? (
          <Empty>
            <EmptyIcon>
              <ClipboardList size={20} />
            </EmptyIcon>
            <EmptyText variant="caption" color="soft" align="center">
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
          <ActivityLabel variant="eyebrow" color="soft">
            Acciones rápidas
          </ActivityLabel>
          <ActivityItem type="button">
            <ActivityIcon $bg={tint.blue.bg} $color={tint.blue.color}>
              <Calendar size={13} />
            </ActivityIcon>
            <ActivityText>
              <Text variant="caption" weight={600} color="primary">
                Mis turnos
              </Text>
              <Text variant="hint" color="soft">
                Ver agenda completa
              </Text>
            </ActivityText>
            <Arrow size={14} />
          </ActivityItem>
          <ActivityItem type="button">
            <ActivityIcon $bg={tint.purple.bg} $color={tint.purple.color}>
              <FileText size={13} />
            </ActivityIcon>
            <ActivityText>
              <Text variant="caption" weight={600} color="primary">
                Historial
              </Text>
              <Text variant="hint" color="soft">
                Servicios anteriores
              </Text>
            </ActivityText>
            <Arrow size={14} />
          </ActivityItem>
          <ActivityItem type="button">
            <ActivityIcon $bg={tint.teal.bg} $color={tint.teal.color}>
              <Headphones size={13} />
            </ActivityIcon>
            <ActivityText>
              <Text variant="caption" weight={600} color="primary">
                Soporte
              </Text>
              <Text variant="hint" color="soft">
                Contactar al equipo
              </Text>
            </ActivityText>
            <Arrow size={14} />
          </ActivityItem>
        </ActivityList>
      </Body>
    </Panel>
  )
}
