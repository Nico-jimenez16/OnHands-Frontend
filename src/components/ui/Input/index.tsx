'use client'

import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'
import { Label } from '../Label'
import { Text } from '../Text'
import type { InputProps, InputSize } from './Input.types'

const sizeStyles: Record<InputSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 7px 12px;
    font-size: ${theme.fontSize.sm};
  `,
  md: css`
    padding: 10px 14px;
    font-size: ${theme.fontSize.base};
  `,
  lg: css`
    padding: 13px 16px;
    font-size: ${theme.fontSize.lg};
  `,
}

const Wrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`
Wrapper.displayName = 'InputWrapper'

interface InputRowProps {
  $size: InputSize
  $error?: boolean
  $disabled?: boolean
}

const InputRow = styled.div<InputRowProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  border: 1px solid ${({ $error }) => ($error ? theme.colors.status.error : theme.colors.border.light)};
  background-color: ${({ $error }) => ($error ? theme.colors.status.errorBg : theme.colors.bg.tertiary)};
  border-radius: ${theme.radius.md};
  transition: border-color 0.15s;
  ${({ $size }) => sizeStyles[$size]}

  &:focus-within {
    border-color: ${({ $error }) => ($error ? theme.colors.status.error : theme.colors.accent.purple)};
  }

  ${({ $disabled }) => $disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}
`
InputRow.displayName = 'InputRow'

const IconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${theme.colors.text.tertiary};
  flex-shrink: 0;
`
IconSlot.displayName = 'InputIconSlot'

const NativeInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  color: ${theme.colors.text.primary};

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  &:disabled {
    cursor: not-allowed;
  }
`
NativeInput.displayName = 'NativeInput'

export function Input({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  size = 'md',
  leftIcon,
  rightIcon,
  error,
  hint,
  disabled,
  fullWidth,
  id,
  name,
  autoComplete,
  required,
}: InputProps) {
  return (
    <Wrapper $fullWidth={fullWidth}>
      {label && (
        <Label htmlFor={id} required={required} disabled={disabled}>
          {label}
        </Label>
      )}
      <InputRow $size={size} $error={!!error} $disabled={disabled}>
        {leftIcon && <IconSlot>{leftIcon}</IconSlot>}
        <NativeInput
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
        />
        {rightIcon && <IconSlot>{rightIcon}</IconSlot>}
      </InputRow>
      {error && (
        <Text variant="error" as="span">
          {error}
        </Text>
      )}
      {hint && !error && (
        <Text variant="hint" as="span">
          {hint}
        </Text>
      )}
    </Wrapper>
  )
}
Input.displayName = 'Input'
