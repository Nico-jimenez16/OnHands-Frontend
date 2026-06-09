'use client'

import styled from 'styled-components'
import { theme } from '@/styles/theme'
import type { ServiceRequest } from '@/types'
import { Badge, Text } from '@/components/ui'
import type { BadgeVariant } from '@/components/ui'

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

// Valor de campo: 13px/500, sin variante equivalente en <Text>.
const FieldValue = styled.span`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text.primary};
  font-weight: 500;
`

function urgencyVariant(urgency: string): BadgeVariant {
  if (urgency === 'alta') return 'error'
  if (urgency === 'media') return 'warning'
  return 'success'
}

interface ServiceSummaryCardProps {
  serviceData: Partial<ServiceRequest>
}

export function ServiceSummaryCard({ serviceData }: ServiceSummaryCardProps) {
  const isComplete = !!(serviceData.address && serviceData.scheduledDate && serviceData.timePreference)

  return (
    <Card>
      <Header>
        <Text variant="eyebrow" color="secondary" as="span">
          Resumen del servicio
        </Text>
        <Badge variant={isComplete ? 'success' : 'warning'} size="sm" rounded>
          {isComplete ? 'datos completos' : 'buscando...'}
        </Badge>
      </Header>
      <Grid>
        {serviceData.address && (
          <Field>
            <Text variant="hint" color="tertiary" as="span">
              Dirección
            </Text>
            <FieldValue>{serviceData.address}</FieldValue>
          </Field>
        )}
        {serviceData.scheduledDate && (
          <Field>
            <Text variant="hint" color="tertiary" as="span">
              Día
            </Text>
            <FieldValue>{serviceData.scheduledDate}</FieldValue>
          </Field>
        )}
        {serviceData.timePreference && (
          <Field>
            <Text variant="hint" color="tertiary" as="span">
              Horario
            </Text>
            <FieldValue>{serviceData.timePreference}</FieldValue>
          </Field>
        )}
        {serviceData.urgency && (
          <Field>
            <Text variant="hint" color="tertiary" as="span">
              Urgencia
            </Text>
            <Badge variant={urgencyVariant(serviceData.urgency)} size="sm" rounded>
              {serviceData.urgency}
            </Badge>
          </Field>
        )}
      </Grid>
    </Card>
  )
}
