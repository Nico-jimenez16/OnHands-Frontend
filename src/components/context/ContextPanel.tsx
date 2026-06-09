'use client'

import styled from 'styled-components'
import { LayoutGrid, Calendar, FileText, Headset } from 'lucide-react'
import { theme } from '@/styles/theme'
import { useChatStore } from '@/store/chatStore'
import { useMatchStream } from '@/hooks/useMatchStream'
import { RequestSummaryCard } from './RequestSummaryCard'
import { ProviderList } from './ProviderList'

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${theme.colors.bg.secondary};
  border-left: 1px solid ${theme.colors.border.light};
  overflow: hidden;
`

const PanelHeader = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border.light};
  flex-shrink: 0;
`

const PanelTitle = styled.h3`
  margin: 0;
  font-size: ${theme.fontSize.xs};
  font-weight: 600;
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.8px;
`

const TopSection = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border.light};
  flex-shrink: 0;
`

const BottomSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  min-height: 0;
`

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xl};
`

const EmptyIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${theme.colors.bg.tertiary};
  border-radius: ${theme.radius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing.xs};
`

const EmptyText = styled.div`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.tertiary};
  text-align: center;
  line-height: 1.6;
`

const QuickActions = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border.light};
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
`

const QaTitle = styled.div`
  font-size: ${theme.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing.xs};
`

const QaButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  background-color: ${theme.colors.bg.tertiary};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.radius.md};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
  text-align: left;
  transition: background-color 0.1s, color 0.1s;

  svg {
    color: ${theme.colors.text.tertiary};
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${theme.colors.accent.purpleLight};
    color: ${theme.colors.text.primary};
  }
`

export function ContextPanel() {
  const { activeRequest, requestId } = useChatStore()
  const { providers, matchStatus } = useMatchStream(requestId)

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Panel de solicitud</PanelTitle>
      </PanelHeader>

      {!activeRequest ? (
        <EmptyState>
          <EmptyIcon>
            <LayoutGrid size={16} />
          </EmptyIcon>
          <EmptyText>
            Tu solicitud y los profesionales disponibles aparecerán aquí
          </EmptyText>
        </EmptyState>
      ) : (
        <>
          <TopSection>
            <RequestSummaryCard request={activeRequest} />
          </TopSection>
          {providers.length > 0 && (
            <BottomSection>
              <ProviderList providers={providers} matchStatus={matchStatus} />
            </BottomSection>
          )}
        </>
      )}

      <QuickActions>
        <QaTitle>Acciones rápidas</QaTitle>
        <QaButton>
          <Calendar size={14} />
          Ver mis turnos
        </QaButton>
        <QaButton>
          <FileText size={14} />
          Historial de servicios
        </QaButton>
        <QaButton>
          <Headset size={14} />
          Contactar soporte
        </QaButton>
      </QuickActions>
    </Panel>
  )
}
