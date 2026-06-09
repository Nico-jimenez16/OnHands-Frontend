'use client'

import type { ComponentType } from 'react'
import styled from 'styled-components'
import type { LucideProps } from 'lucide-react'
import {
  Droplet,
  Zap,
  Wrench,
  Wind,
  Paintbrush,
  Sparkles,
  Truck,
  Leaf,
} from 'lucide-react'
import { light, tint } from './palette'
import type { Tint } from './palette'

type IconType = ComponentType<LucideProps>

interface Category {
  label: string
  Icon: IconType
  tint: Tint
  message: string
}

// Config local de categorías. NOTE: no se reutiliza useServiceCategories porque ese
// hook (fuera de límites para modificar) no lleva color, componente de ícono ni el
// texto a enviar; acá cada tarjeta mapea a su sendMessage (ver PASO 5).
const CATEGORIES: Category[] = [
  { label: 'Plomería', Icon: Droplet, tint: 'blue', message: 'Necesito un plomero' },
  { label: 'Electricidad', Icon: Zap, tint: 'amber', message: 'Necesito un electricista' },
  { label: 'Albañilería', Icon: Wrench, tint: 'gray', message: 'Necesito un albañil' },
  { label: 'Aire acond.', Icon: Wind, tint: 'teal', message: 'Necesito un técnico de aire acondicionado' },
  { label: 'Pintura', Icon: Paintbrush, tint: 'purple', message: 'Necesito un pintor' },
  { label: 'Limpieza', Icon: Sparkles, tint: 'green', message: 'Necesito un servicio de limpieza' },
  { label: 'Mudanzas', Icon: Truck, tint: 'red', message: 'Necesito ayuda con una mudanza' },
  { label: 'Jardín', Icon: Leaf, tint: 'green', message: 'Necesito un jardinero' },
]

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: 12px;
  width: 100%;
`

const Card = styled.button`
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

const CatIcon = styled.div<{ $bg: string; $color: string }>`
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

const CatLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #3a3a52;
  text-align: center;
  line-height: 1.3;
`

interface CategoryGridProps {
  onPick: (message: string) => void
  disabled?: boolean
}

export function CategoryGrid({ onPick, disabled }: CategoryGridProps) {
  return (
    <Grid>
      {CATEGORIES.map(({ label, Icon, tint: t, message }) => (
        <Card
          key={label}
          type="button"
          disabled={disabled}
          onClick={() => onPick(message)}
        >
          <CatIcon $bg={tint[t].bg} $color={tint[t].color}>
            <Icon size={15} />
          </CatIcon>
          <CatLabel>{label}</CatLabel>
        </Card>
      ))}
    </Grid>
  )
}
