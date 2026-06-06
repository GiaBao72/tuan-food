import type { OrderStatus } from '../../types'

interface StatusBadgeProps {
  status: OrderStatus
}

const config: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  new:        { label: 'Moi',        bg: 'bg-amber-100',  text: 'text-amber-600' },
  confirmed:  { label: 'Da xac nhan', bg: 'bg-olive-100',  text: 'text-olive-700' },
  delivering: { label: 'Dang giao',  bg: 'bg-blue-100',   text: 'text-blue-700'  },
  done:       { label: 'Hoan thanh', bg: 'bg-gray-100',   text: 'text-gray-500'  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, bg, text } = config[status]
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-full ${bg} ${text}`}>
      {label}
    </span>
  )
}
