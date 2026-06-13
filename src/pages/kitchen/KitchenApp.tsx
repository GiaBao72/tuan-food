import { useEffect, useState, useRef } from 'react'
import { useOrderStore } from '../../store/useOrderStore'
import { OrderCard } from '../../components/kitchen/OrderCard'
import { CustomerList } from '../../components/kitchen/CustomerList'
import { dayFromStart, isoOf, dateLabel, todayISO } from '../../utils/format'
import type { Order, OrderStatus } from '../../types'

type MainTab = 'orders' | 'customers'

const STATUS_TABS: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all',        label: 'Tất cả'      },
  { key: 'new',        label: 'Mới'         },
  { key: 'confirmed',  label: 'Đã xác nhận' },
  { key: 'delivering', label: 'Đang giao'   },
  { key: 'done',       label: 'Xong'        },
]

// Các ngày ISO mà 1 đơn có suất ăn
function orderDayISOs(o: Order): string[] {
  const start = o.startDate ?? todayISO()
  if (o.orderMode === 'single') return [start]
  return o.weekPlan.slice(0, o.pkgDays).map((_, i) => isoOf(dayFromStart(start, i)))
}

export default function KitchenApp() {
  const { orders, loading, fetchOrders, updateStatus, toggleItemDone } = useOrderStore()
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [mainTab, setMainTab] = useState<MainTab>('orders')
  const [selectedDate, setSelectedDate] = useState<string>(todayISO())
  const [newAlert, setNewAlert] = useState(false)
  const prevCountRef = useRef(0)

  // Fetch lần đầu + poll mỗi 10 giây
  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  // Phát hiện đơn mới
  useEffect(() => {
    const newCount = orders.filter(o => o.status === 'new').length
    if (prevCountRef.current > 0 && newCount > prevCountRef.current) {
      setNewAlert(true)
      setTimeout(() => setNewAlert(false), 5000)
    }
    prevCountRef.current = newCount
  }, [orders])

  const byStatus = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  // Chỉ giữ đơn có suất ăn trong ngày bếp đang xem
  const filtered = byStatus.filter(o => orderDayISOs(o).includes(selectedDate))
  const countOf = (s: OrderStatus | 'all') =>
    s === 'all' ? orders.length : orders.filter(o => o.status === s).length

  // Tập hợp tất cả ngày có suất ăn (từ mọi đơn) — sắp xếp tăng dần
  const allDates = Array.from(new Set([todayISO(), ...orders.flatMap(orderDayISOs)])).sort()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New order alert */}
      {newAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-olive-700 text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-sm animate-bounce">
          🔔 Có đơn mới!
        </div>
      )}

      <header className="bg-olive-700 text-white px-4 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="font-bold text-lg">🍳 Bếp NutriKitchen</h1>
          <div className="flex items-center gap-3">
            {loading && <span className="text-xs opacity-60">Đang tải...</span>}
            <span className="text-xs opacity-80">{orders.length} đơn</span>
            <button
              onClick={fetchOrders}
              className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg transition-colors"
            >
              ↻ Làm mới
            </button>
            <a href="#/" className="text-xs opacity-70 hover:opacity-100">← Đặt hàng</a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-4">
        {/* Main tabs */}
        <div className="flex gap-2 mb-4">
          {([['orders','🧾 Đơn hàng'], ['customers','👥 Khách hàng']] as [MainTab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setMainTab(key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                mainTab === key ? 'bg-olive-600 text-white' : 'bg-white text-olive-700 border border-olive-200 hover:border-olive-400'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {mainTab === 'customers' ? <CustomerList /> : (
          <>
            {/* Chọn ngày nấu */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-gray-500">📅 Ngày nấu</span>
                <button
                  onClick={() => setSelectedDate(todayISO())}
                  className="text-[11px] text-olive-600 hover:text-olive-800 font-medium"
                >
                  Hôm nay
                </button>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {allDates.map(iso => {
                  const cnt = byStatus.filter(o => orderDayISOs(o).includes(iso)).length
                  return (
                    <button
                      key={iso}
                      onClick={() => setSelectedDate(iso)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                        selectedDate === iso
                          ? 'bg-olive-600 text-white border-olive-600'
                          : 'bg-white text-olive-700 border-olive-200 hover:border-olive-400'
                      }`}
                    >
                      {dateLabel(dayFromStart(iso, 0))}
                      {cnt > 0 && (
                        <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                          selectedDate === iso ? 'bg-white text-olive-700' : 'bg-olive-100 text-olive-600'
                        }`}>
                          {cnt}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

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
                <p className="font-medium">Không có đơn cần nấu cho {dateLabel(dayFromStart(selectedDate, 0))}</p>
                <p className="text-sm mt-1">Chọn ngày khác hoặc chờ đơn mới</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                {filtered.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    selectedDate={selectedDate}
                    onUpdateStatus={updateStatus}
                    onToggleItemDone={toggleItemDone}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
