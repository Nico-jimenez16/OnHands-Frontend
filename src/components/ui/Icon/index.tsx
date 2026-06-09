'use client'

import React from 'react'
import styled from 'styled-components'
import type { IconProps } from './Icon.types'

// Props que Icon inyecta al ícono hijo (típicamente un ícono de lucide-react,
// que acepta `size` y `color`). Se tipa de forma explícita para evitar `any`.
interface InjectableIconProps {
  size?: number
  color?: string
}

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
IconWrapper.displayName = 'IconWrapper'

export function Icon({ icon, size, color, className }: IconProps) {
  const child = React.isValidElement<InjectableIconProps>(icon)
    ? React.cloneElement(icon, { size, color })
    : icon

  return <IconWrapper className={className}>{child}</IconWrapper>
}
Icon.displayName = 'Icon'
