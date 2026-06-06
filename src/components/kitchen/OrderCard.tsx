import { useState } from 'react'
import type { Order, OrderStatus, MealSlot } from '../../types'
import { StatusBadge } from './StatusBadge'
import { vnd } from '../../utils/format'
import { MENU } from '../../data/menu'
import { scaleItem, itemBaseKcal } from '../../utils/nutrition'
import { MEAL_SLOTS } from '../../data/packages'

interface OrderCardProps {
  order: Order
  onUpdateStatus: (id: number, status: OrderStatus) => void
  onToggleItemDone: (orderId: number, itemId: string) => void
}

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  new: 'confirmed', confirmed: 'delivering', delivering: 'done', done: null,
}
const NEXT_LABEL: Record<OrderStatus, string> = {
  new: 'Xác nhận', confirmed: 'Giao hàng', delivering: 'Hoàn thành', done: '',
}
const GOAL_LABEL: Record<string, string> = {
  lose: 'Giảm cân', maintain: 'Giữ cân', gain: 'Tăng cân',
}
const PKG_LABEL: Record<string, string> = {
  single: 'Lẻ/Thử', week1: '1 Tuần', week2: '2 Tuần',
}

function ItemRow({
  slot, id, tKcal, isDone, onToggle,
}: {
  slot: MealSlot
  id: string
  tKcal: number
  isDone: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const item = MENU[slot].find(m => m.id === id)
  if (!item) return null

  const slotRatio = MEAL_SLOTS.find(s => s.key === slot)!.ratio
  const slotKcal = tKcal * slotRatio
  const base = itemBaseKcal(item)
  const scaled = scaleItem(item, base > 0 ? slotKcal / base : 1)

  return (
    <div className={`rounded-xl border transition-all ${isDone ? 'border-olive-300 bg-olive-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center gap-2 p-2.5">
        {/* Tick xác nhận món xong */}
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all ${
            isDone ? 'bg-olive-500 border-olive-500 text-white' : 'border-gray-300 hover:border-olive-400'
          }`}
        >
          {isDone && <span className="text-xs">✓</span>}
        </button>

        {/* Tên món + kcal */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate ${isDone ? 'line-through text-olive-400' : 'text-gray-800'}`}>
            {item.icon} {item.name}
          </p>
          <p className="text-xs text-gray-400">{scaled.kcal} kcal · {vnd(scaled.price)}</p>
        </div>

        {/* Expand định lượng */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="text-xs text-olive-500 hover:text-olive-700 font-medium px-2 py-1 rounded-lg hover:bg-olive-50 transition-colors flex-shrink-0"
        >
          {expanded ? '▲' : '▼'} Định lượng
        </button>
      </div>

      {/* Chi tiết nguyên liệu */}
      {expanded && (
        <div className="px-3 pb-3 border-t border-gray-100 mt-0.5 pt-2 space-y-1">
          {scaled.ings.map((ing, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-gray-600">{ing.name}</span>
              <span className="font-semibold text-olive-700">{ing.amt} {ing.unit}</span>
            </div>
          ))}
          <div className="flex gap-3 pt-1 border-t border-gray-100 text-xs text-gray-500">
            <span>P: <strong>{scaled.protein}g</strong></span>
            <span>C: <strong>{scaled.carb}g</strong></span>
            <span>F: <strong>{scaled.fat}g</strong></span>
          </div>
        </div>
      )}
    </div>
  )
}

export function OrderCard({ order, onUpdateStatus, onToggleItemDone }: OrderCardProps) {
  const next = NEXT_STATUS[order.status]
  const p = order.profile
  const doneItems = order.doneItems ?? []

  // Gom tất cả món trong đơn (single hoặc weekly)
  const allSlotItems: { slot: MealSlot; id: string }[] = []
  const slots: MealSlot[] = ['breakfast', 'lunch', 'dinner']

  if (order.orderMode === 'single') {
    slots.forEach(slot => order.singleSel[slot].forEach(id => allSlotItems.push({ slot, id })))
  } else {
    // Weekly: gom unique items theo slot (hiện định lượng theo ngày đầu tiên)
    const seen = new Set<string>()
    order.weekPlan.slice(0, order.pkgDays).forEach(day => {
      slots.forEach(slot => {
        day[slot].forEach(id => {
          const key = `${slot}-${id}`
          if (!seen.has(key)) { seen.add(key); allSlotItems.push({ slot, id }) }
        })
      })
    })
  }

  const totalDone = allSlotItems.filter(({ id }) => doneItems.includes(id)).length
  const allDone = allSlotItems.length > 0 && totalDone === allSlotItems.length

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-bold text-gray-800">📱 {p.phone}</p>
          <p className="text-xs text-gray-400">{order.date} · {GOAL_LABEL[p.goal]}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Meta */}
      <div className="flex gap-3 text-xs text-gray-500 mb-3">
        <span>Gói: <strong>{PKG_LABEL[order.pkg]}</strong></span>
        <span>TDEE: <strong>{order.tKcal} kcal</strong></span>
        <span>{order.pkgDays} ngày</span>
      </div>

      {/* Progress */}
      {allSlotItems.length > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Tiến độ món</span>
            <span className="font-semibold text-olive-600">{totalDone}/{allSlotItems.length}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-olive-500 rounded-full transition-all"
              style={{ width: `${allSlotItems.length > 0 ? (totalDone / allSlotItems.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Danh sách món */}
      <div className="space-y-2 mb-3">
        {allSlotItems.map(({ slot, id }) => (
          <ItemRow
            key={`${slot}-${id}`}
            slot={slot}
            id={id}
            tKcal={order.tKcal}
            isDone={doneItems.includes(id)}
            onToggle={() => onToggleItemDone(order.id, id)}
          />
        ))}
        {allSlotItems.length === 0 && (
          <p className="text-xs text-gray-400 italic text-center py-2">Chưa chọn món nào</p>
        )}
      </div>

      {order.note && (
        <p className="text-xs text-gray-500 italic mb-3 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1.5">
          📝 {order.note}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div>
          <p className="font-bold text-olive-700">{vnd(order.pkgTotal)}</p>
          {order.pkgSave > 0 && <p className="text-xs text-green-600">Tiết kiệm: {vnd(order.pkgSave)}</p>}
        </div>
        {next && (
          <button
            onClick={() => onUpdateStatus(order.id, next)}
            disabled={order.status === 'confirmed' && !allDone}
            className="bg-olive-600 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-olive-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title={order.status === 'confirmed' && !allDone ? 'Xác nhận hết món trước khi giao' : ''}
          >
            {NEXT_LABEL[order.status]}
          </button>
        )}
      </div>
    </div>
  )
}
