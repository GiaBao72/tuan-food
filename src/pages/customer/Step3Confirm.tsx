import { useProfileStore } from '../../store/useProfileStore'
import { useOrderStore } from '../../store/useOrderStore'
import { PACKAGES, MEAL_SLOTS, MENU_TIERS } from '../../data/packages'
import type { TierKey } from '../../data/packages'
import { MENU } from '../../data/menu'
import { scaleItem, itemBaseKcal } from '../../utils/nutrition'
import { vnd } from '../../utils/format'
import type { DayPlan, MealSlot, PackageKey } from '../../types'

interface Step3ConfirmProps {
  pkg: PackageKey
  tier: TierKey
  orderMode: 'single' | 'weekly'
  singleSel: DayPlan
  weekPlan: DayPlan[]
  note: string
  onNoteChange: (n: string) => void
  onConfirmed: () => void
}

function calcDayTotal(day: DayPlan, dayKcal: number): number {
  let total = 0
  const slots: MealSlot[] = ['breakfast', 'lunch', 'dinner']
  for (const slot of slots) {
    const slotKcal = dayKcal * MEAL_SLOTS.find(s => s.key === slot)!.ratio
    for (const id of day[slot]) {
      const item = MENU[slot].find(m => m.id === id)
      if (item) {
        const base = itemBaseKcal(item)
        const factor = base > 0 ? slotKcal / base : 1
        total += scaleItem(item, factor).price
      }
    }
  }
  return total
}

function DayMeals({ day, dayKcal }: { day: DayPlan; dayKcal: number }) {
  const slots: MealSlot[] = ['breakfast', 'lunch', 'dinner']
  const slotLabel: Record<MealSlot, string> = { breakfast: 'Sáng', lunch: 'Trưa', dinner: 'Tối' }
  return (
    <div className="space-y-1">
      {slots.map(slot => day[slot].length > 0 && (
        <div key={slot} className="text-xs">
          <span className="font-semibold text-olive-700">{slotLabel[slot]}: </span>
          {day[slot].map(id => {
            const item = MENU[slot].find(m => m.id === id)
            if (!item) return null
            const base = itemBaseKcal(item)
            const slotKcal = dayKcal * MEAL_SLOTS.find(s => s.key === slot)!.ratio
            const factor = base > 0 ? slotKcal / base : 1
            const scaled = scaleItem(item, factor)
            return (
              <span key={id} className="text-olive-600">
                {item.name} ({scaled.kcal} kcal, {vnd(scaled.price)})
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export function Step3Confirm({ pkg, tier, orderMode, singleSel, weekPlan, note, onNoteChange, onConfirmed }: Step3ConfirmProps) {
  const { profile, tdee, tKcal } = useProfileStore()
  const { addOrder } = useOrderStore()
  const pkgObj = PACKAGES.find(p => p.key === pkg)!
  const safeKcal = tKcal ?? 1800
  const tierObj = MENU_TIERS.find(t => t.key === tier) ?? MENU_TIERS[1]
  const dayKcal = tierObj.kcal

  const singleTotal = calcDayTotal(singleSel, dayKcal)
  const weeklyRaw = weekPlan.reduce((s, d) => s + calcDayTotal(d, dayKcal), 0)
  const rawTotal = orderMode === 'single' ? singleTotal : weeklyRaw
  const disc = pkgObj.discount
  const pkgTotal = Math.round(rawTotal * (1 - disc))
  const pkgSave = rawTotal - pkgTotal

  const handleOrder = () => {
    const order = {
      id: Date.now(),
      date: new Date().toLocaleString('vi-VN'),
      profile,
      tdee: tdee ?? 0,
      tKcal: safeKcal,
      tier,
      pkg,
      pkgDays: pkgObj.days,
      pkgWeeks: pkgObj.weeks,
      pkgDisc: disc,
      orderMode,
      singleSel,
      weekPlan,
      pkgTotal,
      pkgSave,
      note,
      status: 'new' as const,
      doneItems: [],
    }
    addOrder(order)
    onConfirmed()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-olive-800">Xác nhận đơn hàng</h2>

      <div className="bg-olive-50 rounded-2xl p-4 space-y-2 text-sm">
        <p className="font-bold text-olive-800">📱 {profile.phone}</p>
        <p className="text-olive-500">TDEE: {tdee} kcal/ngày → Nạp: {safeKcal} kcal/ngày</p>
        <p className="text-olive-500">Gói: <strong>{pkgObj.label}</strong> ({pkgObj.days} ngày)</p>
      </div>

      {orderMode === 'single' ? (
        <div className="bg-cream-white rounded-2xl border border-cream-dark p-3">
          <p className="font-semibold text-olive-700 text-sm mb-2">Đơn lẻ:</p>
          <DayMeals day={singleSel} dayKcal={dayKcal} />
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {weekPlan.map((day, i) => (
            <div key={i} className="bg-cream-white rounded-xl border border-cream-dark p-3">
              <p className="font-semibold text-olive-700 text-xs mb-1">Ngày {i + 1}</p>
              <DayMeals day={day} dayKcal={dayKcal} />
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-olive-700 mb-1">Ghi chú / dị ứng thực phẩm</label>
        <textarea
          value={note}
          onChange={e => onNoteChange(e.target.value)}
          placeholder="VD: không hành, không rau mùi..."
          className="w-full border border-cream-dark rounded-xl px-3 py-2 text-sm bg-cream-light outline-none focus:border-olive-400 resize-none"
          rows={3}
        />
      </div>

      <div className="bg-olive-100 rounded-2xl p-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-olive-600">Tạm tính:</span>
          <span className="font-bold text-olive-800">{vnd(rawTotal)}</span>
        </div>
        {pkgSave > 0 && (
          <div className="flex justify-between text-sm mb-1">
            <span className="text-green-600">Giảm giá {Math.round(disc * 100)}%:</span>
            <span className="font-bold text-green-600">-{vnd(pkgSave)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold border-t border-olive-200 pt-2 mt-1">
          <span className="text-olive-800">Thanh toán:</span>
          <span className="text-olive-700">{vnd(pkgTotal)}</span>
        </div>
      </div>

      <button
        onClick={handleOrder}
        className="w-full bg-olive-600 text-white font-bold py-4 rounded-2xl text-base hover:bg-olive-700 transition-colors shadow-md"
      >
        Đặt hàng ngay
      </button>
    </div>
  )
}
