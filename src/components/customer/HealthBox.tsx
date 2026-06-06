import type { HealthCheck } from '../../utils/nutrition'

interface HealthBoxProps {
  check: HealthCheck | null
}

const levelConfig = {
  ok:     { border: 'border-olive-400',  bg: 'bg-olive-50',  titleColor: 'text-olive-700'  },
  warn:   { border: 'border-amber-400',  bg: 'bg-amber-100', titleColor: 'text-amber-600'  },
  danger: { border: 'border-rust-600',   bg: 'bg-rust-100',  titleColor: 'text-rust-600'   },
}

export function HealthBox({ check }: HealthBoxProps) {
  if (!check) return null
  const cfg = levelConfig[check.level]
  return (
    <div className={`rounded-xl border-2 ${cfg.border} ${cfg.bg} p-3 mt-4`}>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.border} border ${cfg.titleColor}`}>
          {check.icon}
        </span>
        <span className={`font-bold text-sm ${cfg.titleColor}`}>{check.title}</span>
      </div>
      <p className="text-sm text-olive-700 mt-1">{check.msg}</p>
      {check.tip && (
        <p className="text-xs text-olive-500 mt-0.5 italic">💡 {check.tip}</p>
      )}
    </div>
  )
}
