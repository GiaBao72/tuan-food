import { useState } from 'react'
import type { Order, OrderStatus, MealSlot, DayPlan } from '../../types'
import { StatusBadge } from './StatusBadge'
import { vnd, planDayLabel, dayFromStart, isoOf, todayISO } from '../../utils/format'
import { MENU } from '../../data/menu'
import { scaleItem, itemBaseKcal } from '../../utils/nutrition'
import { MEAL_SLOTS, MENU_TIERS } from '../../data/packages'

interface OrderCardProps {
  order: Order
  selectedDate: string   // ISO yyyy-mm-dd — ngày bếp đang xem
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
  day1: '1 Ngày', day5: '5 Ngày', day20: '20 Ngày',
}
const SLOT_LABEL: Record<MealSlot, string> = {
  breakfast: 'Sáng', lunch: 'Trưa', dinner: 'Tối',
}
const SLOTS: MealSlot[] = ['breakfast', 'lunch', 'dinner']

// Done key duy nhất theo ngày: "dayIdx-slot-id" (single = day 0)
const doneKey = (dayIdx: number, slot: MealSlot, id: string) => `${dayIdx}-${slot}-${id}`

function ItemRow({
  slot, id, dayKcal, isDone, onToggle,
}: {
  slot: MealSlot
  id: string
  dayKcal: number
  isDone: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const item = MENU[slot].find(m => m.id === id)
  if (!item) return null

  const slotRatio = MEAL_SLOTS.find(s => s.key === slot)!.ratio
  const slotKcal = dayKcal * slotRatio
  const base = itemBaseKcal(item)
  const scaled = scaleItem(item, base > 0 ? slotKcal / base : 1)

  return (
    <div className={`rounded-xl border transition-all ${isDone ? 'border-olive-300 bg-olive-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center gap-2 p-2.5">
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all ${
            isDone ? 'bg-olive-500 border-olive-500 text-white' : 'border-gray-300 hover:border-olive-400'
          }`}
        >
          {isDone && <span className="text-xs">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate ${isDone ? 'line-through text-olive-400' : 'text-gray-800'}`}>
            {item.icon} {item.name}
          </p>
          <p className="text-xs text-gray-400">{scaled.kcal} kcal · {vnd(scaled.price)}</p>
        </div>

        <button
          onClick={() => setExpanded(e => !e)}
          className="text-xs text-olive-500 hover:text-olive-700 font-medium px-2 py-1 rounded-lg hover:bg-olive-50 transition-colors flex-shrink-0"
        >
          {expanded ? '▲' : '▼'} Định lượng
        </button>
      </div>

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

function DaySection({
  dayIdx, label, day, dayKcal, doneItems, onToggle, defaultOpen,
}: {
  dayIdx: number
  label: string
  day: DayPlan
  dayKcal: number
  doneItems: string[]
  onToggle: (key: string) => void
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const items = SLOTS.flatMap(slot => day[slot].map(id => ({ slot, id })))
  if (items.length === 0) return null

  const dayDone = items.filter(({ slot, id }) => doneItems.includes(doneKey(dayIdx, slot, id))).length
  const allDone = dayDone === items.length

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold transition-colors ${
          allDone ? 'bg-olive-100 text-olive-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span>{allDone ? '✓ ' : ''}{label}</span>
        <span className="flex items-center gap-2 text-xs">
          <span className={allDone ? 'text-olive-600' : 'text-gray-400'}>{dayDone}/{items.length}</span>
          <span>{open ? '▲' : '▼'}</span>
        </span>
      </button>

      {open && (
        <div className="p-2 space-y-2">
          {SLOTS.map(slot => {
            const slotItems = day[slot]
            if (slotItems.length === 0) return null
            return (
              <div key={slot}>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1 px-1">{SLOT_LABEL[slot]}</p>
                <div className="space-y-1.5">
                  {slotItems.map(id => {
                    const k = doneKey(dayIdx, slot, id)
                    return (
                      <ItemRow
                        key={k}
                        slot={slot}
                        id={id}
                        dayKcal={dayKcal}
                        isDone={doneItems.includes(k)}
                        onToggle={() => onToggle(k)}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function OrderCard({ order, selectedDate, onUpdateStatus, onToggleItemDone }: OrderCardProps) {
  const next = NEXT_STATUS[order.status]
  const p = order.profile
  const doneItems = order.doneItems ?? []
  const startISO = order.startDate ?? todayISO()

  // kcal/ngày theo tier khách chọn (fallback tKcal cho đơn cũ chưa có tier)
  const dayKcal = MENU_TIERS.find(t => t.key === order.tier)?.kcal ?? order.tKcal

  // Map mỗi ngày của đơn → ISO date thật + nhãn lịch
  const allDays: { dayIdx: number; iso: string; label: string; day: DayPlan }[] =
    order.orderMode === 'single'
      ? [{ dayIdx: 0, iso: startISO, label: planDayLabel(startISO, 0), day: order.singleSel }]
      : order.weekPlan.slice(0, order.pkgDays).map((day, i) => ({
          dayIdx: i,
          iso: isoOf(dayFromStart(startISO, i)),
          label: planDayLabel(startISO, i),
          day,
        }))

  // Chỉ giữ ngày khớp với ngày bếp đang xem
  const days = allDays.filter(d => d.iso === selectedDate)

  // Tiến độ chỉ tính trên ngày đang xem
  let totalItems = 0, totalDone = 0
  days.forEach(({ dayIdx, day }) => {
    SLOTS.forEach(slot => day[slot].forEach(id => {
      totalItems++
      if (doneItems.includes(doneKey(dayIdx, slot, id))) totalDone++
    }))
  })
  const allDone = totalItems > 0 && totalDone === totalItems

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
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
        <span>Gói: <strong>{PKG_LABEL[order.pkg] ?? order.pkg}</strong></span>
        <span>Mức: <strong>{order.tier ?? '—'} ({dayKcal} kcal)</strong></span>
        <span>Nấu: <strong className="text-olive-600">{days[0]?.label ?? '—'}</strong></span>
      </div>

      {/* Progress */}
      {totalItems > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Tiến độ suất</span>
            <span className="font-semibold text-olive-600">{totalDone}/{totalItems}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-olive-500 rounded-full transition-all"
              style={{ width: `${(totalDone / totalItems) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Danh sách theo ngày */}
      <div className="space-y-2 mb-3">
        {days.map(({ dayIdx, label, day }) => (
          <DaySection
            key={dayIdx}
            dayIdx={dayIdx}
            label={label}
            day={day}
            dayKcal={dayKcal}
            doneItems={doneItems}
            onToggle={(k) => onToggleItemDone(order.id, k)}
            defaultOpen={true}
          />
        ))}
        {totalItems === 0 && (
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
