import styled from 'styled-components'
import { light } from './palette'

// Layout del header. Los primitivos (búsqueda, datos de usuario) usan @/components/ui.

export const Bar = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  background: ${light.surface};
  border-bottom: 1px solid ${light.border};
  padding: 0 20px;
`

export const Brand = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
  border-right: 1px solid ${light.border};
  flex-shrink: 0;
`

export const BrandDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${light.brandDot};
`

// Nombre de marca a 15px: tamaño fuera de la escala de <Text>, se mantiene propio.
export const BrandName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${light.text};
  letter-spacing: -0.3px;
`

export const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

// Restringe el ancho de la búsqueda; la tipografía/control es el átomo <Input>.
export const SearchWrap = styled.div`
  flex: 1;
  max-width: 320px;
`

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 280px;
  padding-left: 16px;
  border-left: 1px solid ${light.border};
  flex-shrink: 0;
`

// Botón de notificaciones: caja bordeada de 28px, fuera de las variantes/medidas de
// <IconButton> (primary/ghost · 26/32px), así que se mantiene como control propio.
export const NotifButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${light.bg};
  border: 1px solid ${light.borderInput};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  svg {
    color: ${light.textSoft};
  }
`

export const UserBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`
