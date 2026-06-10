import styled, { keyframes, css } from 'styled-components'
import { ChevronRight } from 'lucide-react'
import { Badge, Text } from '@/components/ui'
import { light } from './palette'

export const Panel = styled.aside`
  background: ${light.surface};
  border-left: 1px solid ${light.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Header = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${light.border};
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 14px 16px;
  gap: 14px;
  min-height: 0;
`

export const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

export const StatCard = styled.div`
  background: ${light.surfaceAlt};
  border: 1px solid ${light.border};
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
`

export const EmptyIcon = styled.div`
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

// Texto de la pantalla vacía: tipografía en <Text>, ancho máximo propio.
export const EmptyText = styled(Text)`
  max-width: 160px;
`

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

// Rótulo de "Acciones rápidas": tipografía en <Text>, separación inferior propia.
export const ActivityLabel = styled(Text)`
  margin-bottom: 8px;
`

export const ActivityItem = styled.button`
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

export const ActivityIcon = styled.div<{ $bg: string; $color: string }>`
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

export const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
`

export const Arrow = styled(ChevronRight)`
  color: ${light.textFaint};
  flex-shrink: 0;
`

// --- Resumen de la solicitud (versión clara) ---

export const SummaryCard = styled.div`
  background: ${light.surfaceAlt};
  border: 1px solid ${light.border};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

// Fila etiqueta/valor de ancho fijo: layout, se mantiene como styled.
export const SummaryField = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
`

export const SummaryFieldLabel = styled.span`
  width: 60px;
  flex-shrink: 0;
  color: ${light.textSoft};
`

export const SummaryFieldValue = styled.span`
  color: ${light.textMuted};
`

// --- Tarjeta de profesional (versión clara) ---

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`

export const ProviderCardBox = styled.div<{ $best: boolean }>`
  background: ${light.surface};
  border: ${({ $best }) =>
    $best ? `1.5px solid ${light.accent}` : `1px solid ${light.border}`};
  border-radius: 10px;
  padding: 12px;
`

export const BestBadge = styled(Badge)`
  margin-bottom: 8px;
`

export const ProviderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

// Avatar de 32px con colores de marca: medida fuera de la escala de <Avatar>
// (xs/sm/md/lg = 24/28/36/48), se mantiene propio.
export const ProviderAvatar = styled.div`
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

export const ProviderInfo = styled.div`
  min-width: 0;
`

export const BarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 4px;
`

export const BarTrack = styled.div`
  height: 5px;
  background: ${light.bg};
  border-radius: 9999px;
  overflow: hidden;
`

export const BarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${light.accent};
  border-radius: 9999px;
  transition: width 0.4s ease;
`

export const StatusPill = styled.div<{ $tint: { bg: string; color: string } }>`
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

export const StatusDot = styled.span<{ $pulsing: boolean }>`
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

export const ProvidersWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Notice = styled.div`
  padding: 8px 12px;
  background: ${light.accentBg};
  border: 1px solid ${light.accentBorder};
  border-radius: 8px;
  font-size: 11px;
  color: ${light.accent};
  line-height: 1.4;
`
