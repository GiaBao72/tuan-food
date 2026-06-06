import type { ScaledItem } from '../../types'
import { vnd } from '../../utils/format'

interface FoodCardProps {
  item: ScaledItem
  selected?: boolean
  onToggle: () => void
}

export function FoodCard({ item, selected, onToggle }: FoodCardProps) {
  return (
    <div
      className={`rounded-2xl border-2 p-3 cursor-pointer transition-all ${
        selected
          ? 'border-olive-500 bg-olive-50'
          : 'border-cream-dark bg-cream-white hover:border-olive-300'
      }`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-olive-100 flex items-center justify-center text-xs font-bold text-olive-700 flex-shrink-0">
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <p className="font-semibold text-sm text-olive-900 leading-tight">{item.name}</p>
            {selected && (
              <span className="text-olive-500 flex-shrink-0">✓</span>
            )}
          </div>
          <span className="inline-block text-[10px] font-bold text-olive-600 bg-olive-100 px-1.5 py-0.5 rounded-full mt-0.5">
            {item.tag}
          </span>
          <div className="flex gap-3 mt-1.5 text-xs text-olive-500">
            <span className="font-bold text-olive-700">{item.kcal} kcal</span>
            <span>P:{item.protein}g</span>
            <span>C:{item.carb}g</span>
            <span>F:{item.fat}g</span>
          </div>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-cream-dark flex justify-between items-center">
        <span className="text-xs text-olive-400">x{item.factor}</span>
        <span className="text-sm font-bold text-olive-700">{vnd(item.price)}</span>
      </div>
    </div>
  )
}
