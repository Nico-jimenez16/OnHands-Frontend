import styled from 'styled-components'
import { Text } from '@/components/ui'
import { light } from './palette'

// Estilos de layout propios de AssistantChat. Los primitivos (texto, botones de
// ícono, textarea) viven en @/components/ui; acá solo queda la estructura de la vista.

export const Column = styled.section`
  background: ${light.bg};
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`

export const Inner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
  min-height: 0;
`

export const LabelRow = styled.div`
  padding: 16px 0 12px;
`

export const Messages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  overflow-y: auto;
  min-height: 0;
`

export const EmptyCenter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px 0;
`

export const EmptyLogo = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${light.surface};
  border: 1px solid #e8e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;

  svg {
    color: ${light.textFaint};
  }
`

// Restringe el ancho del subtítulo de la pantalla vacía manteniendo la
// tipografía en el átomo <Text>.
export const EmptySubText = styled(Text)`
  max-width: 280px;
`

export const InputWrap = styled.div`
  background: ${light.surface};
  border: 1px solid ${light.borderSoft};
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 14px;
`

export const Actions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`
