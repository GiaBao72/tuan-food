import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { vnd } from '../../utils/format'

interface CustomerOrder {
  id: number
  date: string
  pkg: string
  pkgDays: number
  pkgTotal: number
  status: string
  orderMode: string
  note: string
}

interface Customer {
  phone: string
  goal: string
  gender: string
  totalOrders: number
  totalSpent: number
  orders: CustomerOrder[]
}

const PKG_LABEL: Record<string, string> = { day1: '1 Ngày', day5: '5 Ngày', day20: '20 Ngày' }
const STATUS_LABEL: Record<string, string> = { new: 'Mới', confirmed: 'Xác nhận', delivering: 'Đang giao', done: 'Xong' }
const STATUS_COLOR: Record<string, string> = { new: 'bg-blue-100 text-blue-700', confirmed: 'bg-amber-100 text-amber-700', delivering: 'bg-orange-100 text-orange-700', done: 'bg-olive-100 text-olive-700' }
const GOAL_LABEL: Record<string, string> = { lose: 'Giảm cân', maintain: 'Giữ cân', gain: 'Tăng cân' }

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getCustomers().then(r => r.json()).then(setCustomers).finally(() => setLoading(false))
  }, [])

  const filtered = customers.filter(c =>
    c.phone.includes(search) || GOAL_LABEL[c.goal]?.includes(search)
  )

  if (loading) return (
    <div className="text-center py-16 text-gray-400">
      <p className="text-2xl mb-2">⏳</p>
      <p>Đang tải...</p>
    </div>
  )

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="tel"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm theo số điện thoại..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-olive-400"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          ['Khách hàng', customers.length, '👥'],
          ['Tổng đơn', customers.reduce((s, c) => s + c.totalOrders, 0), '📦'],
          ['Doanh thu', vnd(customers.reduce((s, c) => s + c.totalSpent, 0)), '💰'],
        ].map(([label, val, icon]) => (
          <div key={String(label)} className="bg-white rounded-2xl border border-gray-100 p-3 text-center">
            <div className="text-xl">{icon}</div>
            <div className="font-bold text-olive-800 text-sm mt-1">{val}</div>
            <div className="text-xs text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">👤</p>
          <p>Chưa có khách hàng</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(cust => (
            <div key={cust.phone} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Header khách */}
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === cust.phone ? null : cust.phone)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center text-olive-700 font-bold text-sm">
                    {cust.gender === 'female' ? '♀' : '♂'}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800 text-sm">📱 {cust.phone}</p>
                    <p className="text-xs text-gray-400">{GOAL_LABEL[cust.goal] || cust.goal} · {cust.totalOrders} đơn</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-olive-700 text-sm">{vnd(cust.totalSpent)}</p>
                  <p className="text-xs text-gray-400">tổng chi tiêu</p>
                  <span className="text-gray-300 text-xs">{expanded === cust.phone ? '▲' : '▼'}</span>
                </div>
              </button>

              {/* Lịch sử đơn */}
              {expanded === cust.phone && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {cust.orders.map(o => (
                    <div key={o.id} className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{o.date}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLOR[o.status] || 'bg-gray-100 text-gray-500'}`}>
                            {STATUS_LABEL[o.status] || o.status}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mt-0.5">
                          {PKG_LABEL[o.pkg] || o.pkg} · {o.pkgDays} ngày · {o.orderMode === 'single' ? '1 ngày' : 'Nhiều ngày'}
                        </p>
                        {o.note && <p className="text-xs text-gray-400 italic mt-0.5">📝 {o.note}</p>}
                      </div>
                      <p className="font-bold text-olive-700 text-sm">{vnd(o.pkgTotal)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
