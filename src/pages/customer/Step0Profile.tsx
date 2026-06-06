import { useProfileStore } from '../../store/useProfileStore'
import { calcBMI, bmiInfo } from '../../utils/nutrition'
import { ACTIVITY } from '../../data/activity'
import type { Goal, ActivityKey } from '../../types'

const GOAL_OPTIONS: { key: Goal; icon: string; label: string; desc: string }[] = [
  { key: 'lose',     icon: '📉', label: 'Giảm cân',  desc: 'Giảm mỡ, cân bằng dinh dưỡng' },
  { key: 'maintain', icon: '⚖️', label: 'Giữ cân',   desc: 'Duy trì cân nặng hiện tại' },
  { key: 'gain',     icon: '📈', label: 'Tăng cân',  desc: 'Tăng cơ, tăng cân đô mạnh' },
]

export function Step0Profile() {
  const { profile, setProfile } = useProfileStore()
  const bmi = calcBMI(profile.weight, profile.height)
  const info = bmiInfo(bmi)

  const field = (label: string, key: keyof typeof profile, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xs font-semibold text-olive-700 mb-1">{label}</label>
      <input
        type={type}
        value={profile[key] as string}
        onChange={e => setProfile({ [key]: e.target.value } as Parameters<typeof setProfile>[0])}
        placeholder={placeholder}
        className="w-full border border-cream-dark rounded-xl px-3 py-2.5 text-sm bg-cream-light outline-none focus:border-olive-400 transition-colors"
      />
    </div>
  )

  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-olive-800">Thông tin cơ thể</h2>

      <div>
        <label className="block text-xs font-semibold text-olive-700 mb-1">Giới tính</label>
        <div className="flex gap-2">
          {(['male', 'female'] as const).map(g => (
            <button
              key={g}
              onClick={() => setProfile({ gender: g })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                profile.gender === g
                  ? 'bg-olive-600 text-white border-olive-600'
                  : 'bg-cream-light text-olive-700 border-cream-dark hover:border-olive-300'
              }`}
            >
              {g === 'male' ? '♂ Nam' : '♀ Nữ'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {field('Tuổi', 'age', 'number', '25')}
        {field('Cân nặng (kg)', 'weight', 'number', '65')}
        {field('Chiều cao (cm)', 'height', 'number', '170')}
      </div>

      {bmi && (
        <div className="rounded-xl p-3 text-center bg-olive-50 border border-olive-200">
          <p className="text-sm font-bold text-olive-800">BMI: {bmi}</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-olive-700 mb-2">Mức độ vận động</label>
        <div className="space-y-2">
          {ACTIVITY.map(a => (
            <button
              key={a.key}
              onClick={() => setProfile({ activity: a.key as ActivityKey })}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-colors ${
                profile.activity === a.key
                  ? 'border-olive-500 bg-olive-50'
                  : 'border-cream-dark bg-cream-light hover:border-olive-300'
              }`}
            >
              <span className="font-semibold text-olive-800">{a.label}</span>
              <span className="text-olive-400 ml-2 text-xs">{a.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-olive-700 mb-2">Mục tiêu</label>
        <div className="grid grid-cols-3 gap-2">
          {GOAL_OPTIONS.map(g => (
            <button
              key={g.key}
              onClick={() => setProfile({ goal: g.key })}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                profile.goal === g.key
                  ? 'border-olive-500 bg-olive-50'
                  : 'border-cream-dark bg-cream-light hover:border-olive-300'
              }`}
            >
              <div className="text-xl mb-1">{g.icon}</div>
              <p className="font-bold text-xs text-olive-800">{g.label}</p>
              <p className="text-[10px] text-olive-400 mt-0.5">{g.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
