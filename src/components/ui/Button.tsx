import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const variantClasses: Record<string, string> = {
  primary:   'bg-olive-600 hover:bg-olive-700 text-white font-semibold shadow-sm',
  secondary: 'bg-cream-dark hover:bg-cream-base text-olive-800 font-medium border border-olive-200',
  ghost:     'bg-transparent hover:bg-olive-50 text-olive-700',
  danger:    'bg-rust-600 hover:bg-red-700 text-white font-semibold',
}

const sizeClasses: Record<string, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-lg',
  md: 'text-sm px-4 py-2 rounded-xl',
  lg: 'text-base px-6 py-3 rounded-xl',
}

export function Button({
  children, variant = 'primary', size = 'md', fullWidth = false,
  className = '', disabled, ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer
        ${variantClasses[variant]} ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
