'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { ServiceRequest } from '@/types'

const Card = styled.div`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.bg.primary};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.radius.lg};
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
`

const ReqId = styled.span`
  font-size: ${theme.fontSize.xs};
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.text.tertiary};
`

const StatusBadge = styled.span<{ $status: string }>`
  padding: 2px 8px;
  border-radius: ${theme.radius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: 500;
  background-color: ${({ $status }) =>
    $status === 'accepted'
      ? theme.colors.status.successBg
      : $status === 'sent'
      ? theme.colors.status.infoBg
      : theme.colors.status.warningBg};
  color: ${({ $status }) =>
    $status === 'accepted'
      ? theme.colors.status.successText
      : $status === 'sent'
      ? theme.colors.status.infoText
      : theme.colors.status.warningText};
`

const Category = styled.div`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
  text-transform: capitalize;
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const Field = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
`

const FieldLabel = styled.span`
  width: 58px;
  flex-shrink: 0;
  color: ${theme.colors.text.tertiary};
`

const FieldValue = styled.span`
  color: ${theme.colors.text.secondary};
`

const statusLabel = (status: string) => {
  if (status === 'searching') return 'Buscando...'
  if (status === 'sent') return 'Enviada'
  if (status === 'accepted') return 'Aceptada'
  return status
}

interface RequestSummaryCardProps {
  request: ServiceRequest
}

export function RequestSummaryCard({ request }: RequestSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <ReqId>{request.id}</ReqId>
        <StatusBadge $status={request.status}>{statusLabel(request.status)}</StatusBadge>
      </CardHeader>
      <Category>{request.category || 'Solicitud de servicio'}</Category>
      <Fields>
        {request.address && (
          <Field>
            <FieldLabel>Dirección</FieldLabel>
            <FieldValue>{request.address}</FieldValue>
          </Field>
        )}
        {request.scheduledDate && (
          <Field>
            <FieldLabel>Fecha</FieldLabel>
            <FieldValue>{request.scheduledDate}</FieldValue>
          </Field>
        )}
        {request.timePreference && (
          <Field>
            <FieldLabel>Horario</FieldLabel>
            <FieldValue>{request.timePreference}</FieldValue>
          </Field>
        )}
      </Fields>
    </Card>
  )
}
