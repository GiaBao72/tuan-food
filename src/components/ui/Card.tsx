import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
}

export function Card({ children, className = '', onClick, selected }: CardProps) {
  return (
    <div
      className={`
        bg-cream-white rounded-2xl shadow-sm border transition-all duration-150
        ${selected ? 'border-olive-500 ring-2 ring-olive-300' : 'border-cream-dark'}
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-olive-300' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}
