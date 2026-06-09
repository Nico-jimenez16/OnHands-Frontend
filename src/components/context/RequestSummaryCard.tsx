'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { ServiceRequest } from '@/types'
import { Badge } from '@/components/ui'
import type { BadgeVariant } from '@/components/ui'

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

const statusVariant = (status: string): BadgeVariant => {
  if (status === 'accepted') return 'success'
  if (status === 'sent') return 'info'
  return 'warning'
}

interface RequestSummaryCardProps {
  request: ServiceRequest
}

export function RequestSummaryCard({ request }: RequestSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <ReqId>{request.id}</ReqId>
        <Badge variant={statusVariant(request.status)} size="sm" rounded>
          {statusLabel(request.status)}
        </Badge>
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
