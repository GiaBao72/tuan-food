import { useState } from 'react'
import { useProfileStore } from '../../store/useProfileStore'
import { FoodCard } from '../../components/customer/FoodCard'
import { HealthBox } from '../../components/customer/HealthBox'
import { MENU } from '../../data/menu'
import { PACKAGES, MEAL_SLOTS, DAYS, MENU_TIERS } from '../../data/packages'
import type { TierKey } from '../../data/packages'
import { scaleItem, itemBaseKcal, healthCheck, suggestTier } from '../../utils/nutrition'
import { vnd } from '../../utils/format'
import type { DayPlan, MealSlot, PackageKey } from '../../types'

interface Step2MenuProps {
  pkg: PackageKey
  tier: TierKey
  onTierChange: (t: TierKey) => void
  orderMode: 'single' | 'weekly'
  onOrderModeChange: (m: 'single' | 'weekly') => void
  singleSel: DayPlan
  onSingleSelChange: (d: DayPlan) => void
  weekPlan: DayPlan[]
  onWeekPlanChange: (w: DayPlan[]) => void
}

export function Step2Menu({
  pkg, tier: tierKey, onTierChange,
  orderMode, onOrderModeChange,
  singleSel, onSingleSelChange,
  weekPlan, onWeekPlanChange,
}: Step2MenuProps) {
  const { profile, tKcal } = useProfileStore()
  const pkgObj = PACKAGES.find(p => p.key === pkg)!
  const [activeDay, setActiveDay] = useState(0)
  const [activeSlot, setActiveSlot] = useState<MealSlot>('lunch')
  const [page, setPage] = useState(0)

  // Mức menu đề xuất: snap tKcal về mức cố định gần nhất (S/M/L/XL)
  const suggested = suggestTier(tKcal ?? 1800)
  const tier = MENU_TIERS.find(t => t.key === tierKey) ?? suggested
  const tierKcal = tier.kcal

  const health = healthCheck(profile.goal, profile.weight, '', pkgObj.days)

  const currentSel = (slot: MealSlot): string[] =>
    orderMode === 'single' ? singleSel[slot] : weekPlan[activeDay]?.[slot] ?? []

  const isSelected = (slot: MealSlot, id: string) => currentSel(slot).includes(id)

  const getSlotKcal = (slot: MealSlot) => {
    const slotObj = MEAL_SLOTS.find(s => s.key === slot)!
    return Math.round(tierKcal * slotObj.ratio)
  }

  // Khẩu phần cố định theo size: mỗi món scale đúng budget slot của size,
  // không co giãn theo số món đã chọn. Chọn thêm món = cộng dồn.
  const scaleForSlot = (slot: MealSlot, id: string) => {
    const item = MENU[slot].find(m => m.id === id)
    if (!item) return null
    const base = itemBaseKcal(item)
    return scaleItem(item, base > 0 ? getSlotKcal(slot) / base : 1)
  }

  const getScaledItems = (slot: MealSlot) => {
    const slotKcal = getSlotKcal(slot)
    return MENU[slot].map(item => {
      const base = itemBaseKcal(item)
      const factor = base > 0 ? slotKcal / base : 1
      return scaleItem(item, factor)
    })
  }

  // Tóm tắt món đã chọn cho ngày đang xem (single hoặc ngày active)
  const summaryDay: DayPlan = orderMode === 'single' ? singleSel : (weekPlan[activeDay] ?? { breakfast: [], lunch: [], dinner: [] })
  const summaryItems = MEAL_SLOTS.flatMap(s =>
    summaryDay[s.key].map(id => ({ slot: s.key, scaled: scaleForSlot(s.key, id) }))
  ).filter(x => x.scaled)
  const summaryKcal = summaryItems.reduce((sum, x) => sum + (x.scaled?.kcal ?? 0), 0)
  const summaryPrice = summaryItems.reduce((sum, x) => sum + (x.scaled?.price ?? 0), 0)

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

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-xs font-semibold text-olive-700">Mức thực đơn (kcal/ngày)</label>
          <span className="text-[11px] text-olive-400">
            Đề xuất theo TDEE: <b className="text-olive-600">{suggested.key}</b>
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {MENU_TIERS.map(t => (
            <button key={t.key}
              onClick={() => onTierChange(t.key)}
              className={`relative py-2 rounded-xl border-2 text-center transition-all ${
                tierKey === t.key
                  ? 'border-olive-500 bg-olive-50'
                  : 'border-cream-dark bg-cream-white hover:border-olive-300'
              }`}
            >
              {t.key === suggested.key && (
                <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold text-white bg-olive-500 px-1.5 rounded-full">
                  ✓
                </span>
              )}
              <p className="font-bold text-sm text-olive-800">{t.key}</p>
              <p className="text-[10px] text-olive-400">{t.kcal}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {(['single', 'weekly'] as const).map(m => (
          <button key={m}
            onClick={() => onOrderModeChange(m)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
              orderMode === m ? 'bg-olive-600 text-white border-olive-600' : 'bg-cream-light text-olive-700 border-cream-dark'
            }`}
          >
            {m === 'single' ? 'Đặt 1 ngày' : 'Đặt nhiều ngày'}
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
            onClick={() => { setActiveSlot(s.key); setPage(0) }}
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
        {getScaledItems(activeSlot).slice(page * 5, page * 5 + 5).map(item => (
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

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-4 py-2 rounded-xl text-sm font-medium border border-cream-dark text-olive-700 bg-cream-light disabled:opacity-40 transition-colors"
        >
          ← Trước
        </button>
        <span className="text-xs text-olive-600">
          {page * 5 + 1}–{Math.min(page * 5 + 5, getScaledItems(activeSlot).length)} / {getScaledItems(activeSlot).length}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={(page + 1) * 5 >= getScaledItems(activeSlot).length}
          className="px-4 py-2 rounded-xl text-sm font-medium border border-cream-dark text-olive-700 bg-cream-light disabled:opacity-40 transition-colors"
        >
          Sau →
        </button>
      </div>

      {/* Tóm tắt món đã chọn */}
      <div className="bg-olive-50 rounded-2xl p-4 border border-olive-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-olive-800">
            🧾 Đã chọn{orderMode === 'weekly' ? ` — ${DAYS[activeDay]}` : ''}
          </h3>
          <span className="text-xs text-olive-500">{summaryItems.length} món</span>
        </div>
        {summaryItems.length === 0 ? (
          <p className="text-xs text-olive-400 italic">Chưa chọn món nào cho {orderMode === 'weekly' ? DAYS[activeDay].toLowerCase() : 'ngày này'}.</p>
        ) : (
          <>
            <div className="space-y-1.5">
              {MEAL_SLOTS.map(s => {
                const items = summaryItems.filter(x => x.slot === s.key)
                if (items.length === 0) return null
                return (
                  <div key={s.key} className="text-xs">
                    <span className="font-semibold text-olive-600">{s.icon} {s.label}:</span>
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {items.map((x, i) => (
                        <div key={i} className="flex justify-between text-olive-700">
                          <span>{x.scaled!.icon} {x.scaled!.name}</span>
                          <span className="text-olive-500">{x.scaled!.kcal} kcal · {vnd(x.scaled!.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-olive-200 text-sm">
              <span className="font-semibold text-olive-700">Tổng {orderMode === 'weekly' ? 'ngày' : ''}: <b>{summaryKcal} kcal</b></span>
              <span className="font-bold text-olive-700">{vnd(summaryPrice)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
