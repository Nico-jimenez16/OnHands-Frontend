export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
export type AvatarColor = 'purple' | 'green' | 'orange' | 'default'

export interface AvatarProps {
  initials: string
  size?: AvatarSize
  color?: AvatarColor
  online?: boolean
}
