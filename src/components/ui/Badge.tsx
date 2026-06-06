import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  color?: string
  bg?: string
  className?: string
}

export function Badge({ children, color, bg, className = '' }: BadgeProps) {
  const style = color || bg ? { color, backgroundColor: bg } : undefined
  return (
    <span
      className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${className}`}
      style={style}
    >
      {children}
    </span>
  )
}
