import { useState } from 'react'
import type { WeightLog } from '../../types'

interface WeightCheckinProps {
  weekLogs: WeightLog[]
  onCheckin: (weight: number) => void
}

export function WeightCheckin({ weekLogs, onCheckin }: WeightCheckinProps) {
  const [val, setVal] = useState('')

  const handleSubmit = () => {
    const w = parseFloat(val)
    if (w > 0) {
      onCheckin(w)
      setVal('')
    }
  }

  return (
    <div className="bg-cream-white rounded-2xl border border-cream-dark p-4 mt-4">
      <h3 className="font-bold text-olive-800 text-sm mb-3">Check-in Can Nang Tuan Nay</h3>
      <div className="flex gap-2">
        <input
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Can nang (kg)"
          className="flex-1 border border-cream-dark rounded-xl px-3 py-2 text-sm bg-cream-light outline-none focus:border-olive-400"
          min={20}
          max={300}
          step={0.1}
        />
        <button
          onClick={handleSubmit}
          className="bg-olive-600 text-white px-4 rounded-xl text-sm font-semibold hover:bg-olive-700 transition-colors"
        >
          Luu
        </button>
      </div>
      {weekLogs.length > 0 && (
        <div className="mt-3 space-y-1">
          {weekLogs.slice(-5).reverse().map(log => (
            <div key={log.week} className="flex justify-between text-xs text-olive-500">
              <span>Tuan {log.week} — {log.date}</span>
              <span className="font-bold text-olive-700">{log.weight} kg</span>
              <span>{log.tdeeUpdated} kcal/ngay</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
