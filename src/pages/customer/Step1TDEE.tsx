import { useProfileStore } from '../../store/useProfileStore'
import { WeightCheckin } from '../../components/customer/WeightCheckin'
import { MilestoneToast } from '../../components/customer/MilestoneToast'
import { PACKAGES } from '../../data/packages'
import type { PackageKey } from '../../types'

interface Step1TDEEProps {
  pkg: PackageKey
  onPkgChange: (k: PackageKey) => void
}

export function Step1TDEE({ pkg, onPkgChange }: Step1TDEEProps) {
  const { profile, tdee, tKcal, weekLogs, computeTDEE, addWeightLog } = useProfileStore()
  const pkgObj = PACKAGES.find(p => p.key === pkg)!

  const handlePkgChange = (k: PackageKey) => {
    onPkgChange(k)
    computeTDEE(PACKAGES.find(p => p.key === k)!.days)
  }

  const initWeight = weekLogs.length > 0 ? weekLogs[0].weight : parseFloat(profile.weight) || 0

  return (
    <div className="space-y-5">
      {weekLogs.length > 0 && (
        <MilestoneToast
          initialWeight={initWeight}
          currentWeight={parseFloat(profile.weight) || initWeight}
        />
      )}

      <div>
        <h2 className="text-lg font-bold text-olive-800">Kết quả TDEE</h2>
        <p className="text-sm text-olive-500">
          Dựa trên thông tin của {profile.phone || 'bạn'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-olive-50 rounded-2xl p-4 text-center">
          <p className="text-xs text-olive-500 font-medium mb-1">TDEE duy trì</p>
          <p className="text-2xl font-bold text-olive-800">{tdee ?? '—'}</p>
          <p className="text-xs text-olive-400">kcal/ngày</p>
        </div>
        <div className="bg-olive-800 rounded-2xl p-4 text-center">
          <p className="text-xs text-olive-200 font-medium mb-1">Mục tiêu nạp</p>
          <p className="text-2xl font-bold text-white">{tKcal ?? '—'}</p>
          <p className="text-xs text-olive-300">kcal/ngày</p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-olive-700 mb-2">Chọn gói</label>
        <div className="grid grid-cols-3 gap-2">
          {PACKAGES.map(p => (
            <button
              key={p.key}
              onClick={() => handlePkgChange(p.key)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                pkg === p.key
                  ? 'border-olive-500 bg-olive-50'
                  : 'border-cream-dark bg-cream-white hover:border-olive-300'
              }`}
            >
              <p className="font-bold text-sm text-olive-800">{p.label}</p>
              <p className="text-xs text-olive-400">{p.days} ngày</p>
              {p.badge && (
                <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 rounded-full mt-1">
                  {p.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-olive-700 mb-2">Phân chia macro</label>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            ['Đạm (P)', pkgObj ? Math.round((tKcal || 0) * (profile.goal === 'lose' ? 0.35 : profile.goal === 'gain' ? 0.35 : 0.30) / 4) + 'g' : '—'],
            ['Tinh bột (C)', pkgObj ? Math.round((tKcal || 0) * (profile.goal === 'lose' ? 0.40 : profile.goal === 'gain' ? 0.45 : 0.45) / 4) + 'g' : '—'],
            ['Béo (F)', pkgObj ? Math.round((tKcal || 0) * 0.25 / 9) + 'g' : '—'],
          ].map(([label, val]) => (
            <div key={label} className="bg-cream-base rounded-xl p-2 text-center">
              <p className="text-olive-400">{label}</p>
              <p className="font-bold text-olive-700">{val}</p>
            </div>
          ))}
        </div>
      </div>

      <WeightCheckin weekLogs={weekLogs} onCheckin={addWeightLog} />
    </div>
  )
}
