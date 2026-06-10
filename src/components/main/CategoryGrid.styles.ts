import styled from 'styled-components'
import { light } from './palette'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: 12px;
  width: 100%;
`

export const Card = styled.button`
  background: ${light.surface};
  border: 1px solid ${light.border};
  border-radius: 10px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: border-color 0.1s, background-color 0.1s;

  &:hover {
    border-color: ${light.accentBorder};
    background: ${light.accentSurface};
  }
`

export const CatIcon = styled.div<{ $bg: string; $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};

  svg {
    color: inherit;
  }
`
