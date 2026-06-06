import { useEffect, useState } from 'react'
import { useOrderStore } from '../../store/useOrderStore'
import { OrderCard } from '../../components/kitchen/OrderCard'
import type { OrderStatus } from '../../types'

const CHANNEL = 'tuan-food-orders'

const STATUS_TABS: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all',        label: 'Tất cả'      },
  { key: 'new',        label: 'Mới'         },
  { key: 'confirmed',  label: 'Đã xác nhận' },
  { key: 'delivering', label: 'Đang giao'   },
  { key: 'done',       label: 'Xong'        },
]

export default function KitchenApp() {
  const { orders, updateStatus, toggleItemDone } = useOrderStore()
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    let ch: BroadcastChannel | null = null
    try {
      ch = new BroadcastChannel(CHANNEL)
      ch.onmessage = () => setPulse(p => !p)
    } catch { /* noop */ }
    return () => ch?.close()
  }, [])

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const countOf = (s: OrderStatus | 'all') =>
    s === 'all' ? orders.length : orders.filter(o => o.status === s).length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-olive-700 text-white px-4 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-lg">🍳 Bếp NutriKitchen</h1>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${pulse ? 'bg-green-400' : 'bg-green-300'} transition-colors`} />
            <span className="text-xs opacity-80">{orders.length} đơn</span>
            <a href="/" className="text-xs opacity-70 hover:opacity-100 ml-2">← Đặt hàng</a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                filter === tab.key
                  ? 'bg-olive-600 text-white'
                  : 'bg-white text-olive-700 border border-olive-200 hover:border-olive-400'
              }`}
            >
              {tab.label}
              {countOf(tab.key) > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                  filter === tab.key ? 'bg-white text-olive-700' : 'bg-olive-100 text-olive-600'
                }`}>
                  {countOf(tab.key)}
                </span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-medium">Chưa có đơn hàng nào</p>
            <p className="text-sm mt-1">Đơn mới sẽ hiển thị tại đây</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
            {filtered.map(order => (
              <OrderCard key={order.id} order={order} onUpdateStatus={updateStatus} onToggleItemDone={toggleItemDone} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
