import { useState } from 'react'
import { useProfileStore } from '../../store/useProfileStore'
import { FoodCard } from '../../components/customer/FoodCard'
import { HealthBox } from '../../components/customer/HealthBox'
import { MENU } from '../../data/menu'
import { PACKAGES, MEAL_SLOTS, DAYS } from '../../data/packages'
import { scaleItem, itemBaseKcal, healthCheck } from '../../utils/nutrition'
import type { DayPlan, MealSlot, PackageKey } from '../../types'

interface Step2MenuProps {
  pkg: PackageKey
  orderMode: 'single' | 'weekly'
  onOrderModeChange: (m: 'single' | 'weekly') => void
  singleSel: DayPlan
  onSingleSelChange: (d: DayPlan) => void
  weekPlan: DayPlan[]
  onWeekPlanChange: (w: DayPlan[]) => void
}

export function Step2Menu({
  pkg, orderMode, onOrderModeChange,
  singleSel, onSingleSelChange,
  weekPlan, onWeekPlanChange,
}: Step2MenuProps) {
  const { profile, tKcal } = useProfileStore()
  const pkgObj = PACKAGES.find(p => p.key === pkg)!
  const [activeDay, setActiveDay] = useState(0)
  const [activeSlot, setActiveSlot] = useState<MealSlot>('lunch')

  const health = healthCheck(profile.goal, profile.weight, profile.targetWeight, pkgObj.days)

  const currentSel = (slot: MealSlot): string[] =>
    orderMode === 'single' ? singleSel[slot] : weekPlan[activeDay]?.[slot] ?? []

  const isSelected = (slot: MealSlot, id: string) => currentSel(slot).includes(id)

  const getSlotKcal = (slot: MealSlot) => {
    const slotObj = MEAL_SLOTS.find(s => s.key === slot)!
    return Math.round((tKcal ?? 1800) * slotObj.ratio)
  }

  // Scale các món đã chọn: chia đều budget kcal của slot cho tổng base kcal chúng
  // Món chưa chọn: preview với factor như thể chọn một mình
  const getScaledItems = (slot: MealSlot) => {
    const slotKcal = getSlotKcal(slot)
    const selectedIds = currentSel(slot)

    // Tổng base kcal của các món đang được chọn
    const selectedItems = MENU[slot].filter(item => selectedIds.includes(item.id))
    const totalSelectedBase = selectedItems.reduce((s, item) => s + itemBaseKcal(item), 0)

    return MENU[slot].map(item => {
      const base = itemBaseKcal(item)
      let factor: number

      if (selectedIds.includes(item.id) && totalSelectedBase > 0) {
        // Chia budget slot theo tỉ lệ base kcal của từng món
        factor = (slotKcal / totalSelectedBase)
      } else {
        // Preview: như thể chọn một mình
        factor = base > 0 ? slotKcal / base : 1
      }

      return scaleItem(item, factor)
    })
  }

  const toggleSingleItem = (slot: MealSlot, id: string) => {
    const current = singleSel[slot]
    const updated = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    onSingleSelChange({ ...singleSel, [slot]: updated })
  }

  const toggleWeekItem = (dayIdx: number, slot: MealSlot, id: string) => {
    const newPlan = weekPlan.map((day, i) => {
      if (i !== dayIdx) return day
      const current = day[slot]
      const updated = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
      return { ...day, [slot]: updated }
    })
    onWeekPlanChange(newPlan)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-olive-800">Chọn thực đơn</h2>
      <HealthBox check={health} />

      <div className="flex gap-2">
        {(['single', 'weekly'] as const).map(m => (
          <button key={m}
            onClick={() => onOrderModeChange(m)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
              orderMode === m ? 'bg-olive-600 text-white border-olive-600' : 'bg-cream-light text-olive-700 border-cream-dark'
            }`}
          >
            {m === 'single' ? 'Đặt lẻ / thử' : 'Đặt theo tuần'}
          </button>
        ))}
      </div>

      {orderMode === 'weekly' && (
        <div className="flex gap-1 overflow-x-auto pb-1">
          {DAYS.slice(0, pkgObj.days).map((d, i) => (
            <button key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeDay === i ? 'bg-olive-600 text-white' : 'bg-cream-base text-olive-600 hover:bg-olive-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        {MEAL_SLOTS.map(s => (
          <button key={s.key}
            onClick={() => setActiveSlot(s.key)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              activeSlot === s.key ? 'bg-olive-500 text-white border-olive-500' : 'bg-cream-white text-olive-600 border-cream-dark'
            }`}
          >
            <div>{s.icon} {s.label}</div>
            <div className="opacity-70">{getSlotKcal(s.key)} kcal</div>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {getScaledItems(activeSlot).map(item => (
          <FoodCard
            key={item.id}
            item={item}
            selected={isSelected(activeSlot, item.id)}
            onToggle={() =>
              orderMode === 'single'
                ? toggleSingleItem(activeSlot, item.id)
                : toggleWeekItem(activeDay, activeSlot, item.id)
            }
          />
        ))}
      </div>
    </div>
  )
}
