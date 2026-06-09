export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
export type AvatarColor = 'purple' | 'green' | 'orange' | 'navy' | 'default'

export interface AvatarProps {
  initials: string
  size?: AvatarSize
  color?: AvatarColor
  online?: boolean
}
