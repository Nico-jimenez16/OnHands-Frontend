'use client'

import type { ComponentType } from 'react'
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
import { Text } from '@/components/ui'
import { tint } from './palette'
import type { Tint } from './palette'
import { Grid, Card, CatIcon } from './CategoryGrid.styles'

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
          <Text as="span" variant="caption" weight={600} color="secondary" align="center">
            {label}
          </Text>
        </Card>
      ))}
    </Grid>
  )
}
