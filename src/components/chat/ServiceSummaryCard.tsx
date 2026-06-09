'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { ServiceRequest } from '@/types'

const Card = styled.div`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.bg.secondary};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.radius.md};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
`

const CardLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StatusBadge = styled.span<{ $complete: boolean }>`
  padding: 2px 8px;
  border-radius: ${theme.radius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: 500;
  background-color: ${({ $complete }) =>
    $complete ? theme.colors.status.successBg : theme.colors.status.warningBg};
  color: ${({ $complete }) =>
    $complete ? theme.colors.status.successText : theme.colors.status.warningText};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const FieldLabel = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text.tertiary};
`

const FieldValue = styled.span`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.primary};
  font-weight: 500;
`

const UrgencyBadge = styled.span<{ $urgency: string }>`
  display: inline-block;
  padding: 1px 8px;
  border-radius: ${theme.radius.full};
  font-size: ${theme.fontSize.xs};
  font-weight: 500;
  background-color: ${({ $urgency }) =>
    $urgency === 'alta'
      ? theme.colors.status.errorBg
      : $urgency === 'media'
      ? theme.colors.status.warningBg
      : theme.colors.status.successBg};
  color: ${({ $urgency }) =>
    $urgency === 'alta'
      ? theme.colors.status.error
      : $urgency === 'media'
      ? theme.colors.status.warningText
      : theme.colors.status.successText};
`

interface ServiceSummaryCardProps {
  serviceData: Partial<ServiceRequest>
}

export function ServiceSummaryCard({ serviceData }: ServiceSummaryCardProps) {
  const isComplete = !!(serviceData.address && serviceData.scheduledDate && serviceData.timePreference)

  return (
    <Card>
      <Header>
        <CardLabel>Resumen del servicio</CardLabel>
        <StatusBadge $complete={isComplete}>
          {isComplete ? 'datos completos' : 'buscando...'}
        </StatusBadge>
      </Header>
      <Grid>
        {serviceData.address && (
          <Field>
            <FieldLabel>Dirección</FieldLabel>
            <FieldValue>{serviceData.address}</FieldValue>
          </Field>
        )}
        {serviceData.scheduledDate && (
          <Field>
            <FieldLabel>Día</FieldLabel>
            <FieldValue>{serviceData.scheduledDate}</FieldValue>
          </Field>
        )}
        {serviceData.timePreference && (
          <Field>
            <FieldLabel>Horario</FieldLabel>
            <FieldValue>{serviceData.timePreference}</FieldValue>
          </Field>
        )}
        {serviceData.urgency && (
          <Field>
            <FieldLabel>Urgencia</FieldLabel>
            <UrgencyBadge $urgency={serviceData.urgency}>{serviceData.urgency}</UrgencyBadge>
          </Field>
        )}
      </Grid>
    </Card>
  )
}
