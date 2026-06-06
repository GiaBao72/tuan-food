import { useEffect, useState } from 'react'
import { getMilestone } from '../../utils/nutrition'

interface MilestoneToastProps {
  initialWeight: number
  currentWeight: number
}

export function MilestoneToast({ initialWeight, currentWeight }: MilestoneToastProps) {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const [color, setColor] = useState('#4a7a3a')

  useEffect(() => {
    const lost = initialWeight - currentWeight
    const m = getMilestone(lost)
    if (m && lost > 0) {
      setLabel(m.label)
      setColor(m.color)
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 3500)
      return () => clearTimeout(t)
    }
  }, [initialWeight, currentWeight])

  if (!visible) return null

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-lg text-white text-sm font-bold animate-bounce"
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  )
}
