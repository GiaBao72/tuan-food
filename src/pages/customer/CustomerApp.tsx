import { useState } from 'react'
import { StepBar } from '../../components/customer/StepBar'
import { BottomNav } from '../../components/customer/BottomNav'
import { LoginScreen } from '../../components/customer/LoginScreen'
import { Step0Profile } from './Step0Profile'
import { Step1TDEE } from './Step1TDEE'
import { Step2Menu } from './Step2Menu'
import { Step3Confirm } from './Step3Confirm'
import { useProfileStore } from '../../store/useProfileStore'
import { PACKAGES } from '../../data/packages'
import type { TierKey } from '../../data/packages'
import { suggestTier } from '../../utils/nutrition'
import type { DayPlan, PackageKey } from '../../types'

const emptyDay = (): DayPlan => ({ breakfast: [], lunch: [], dinner: [] })

export default function CustomerApp() {
  const [step, setStep] = useState(0)
  const [pkg, setPkg] = useState<PackageKey>('single')
  const [orderMode, setOrderMode] = useState<'single' | 'weekly'>('single')
  const [singleSel, setSingleSel] = useState<DayPlan>(emptyDay())
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => Array.from({ length: 14 }, emptyDay))
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)
  const [tier, setTier] = useState<TierKey>('M')

  const { profile, isLoggedIn, logout, computeTDEE } = useProfileStore()

  // Chưa đăng nhập → màn hình nhập SĐT
  if (!isLoggedIn) return <LoginScreen />

  const isStep0Valid = !!profile.age && !!profile.weight && !!profile.height
  const pkgObj = PACKAGES.find(p => p.key === pkg)!

  const handleNext = () => {
    if (step === 0) {
      computeTDEE(pkgObj.days)
      const { tKcal } = useProfileStore.getState()
      setTier(suggestTier(tKcal ?? 1800).key)
    }
    setStep(s => Math.min(s + 1, 3))
  }

  const handlePrev = () => setStep(s => Math.max(s - 1, 0))

  if (done) {
    return (
      <div className="min-h-screen bg-cream-light flex flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h1 className="text-2xl font-bold text-olive-800">Đơn hàng đã gửi!</h1>
          <p className="text-olive-500">Bếp sẽ xử lý và liên hệ bạn sớm nhất.</p>
          <button
            onClick={() => { setStep(0); setDone(false); setSingleSel(emptyDay()); setNote('') }}
            className="bg-olive-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-olive-700 transition-colors"
          >
            Đặt thêm
          </button>
          <a href="#/kitchen" className="block text-sm text-olive-400 hover:text-olive-600 underline mt-2">
            Xem giao diện bếp
          </a>
        </div>
      </div>
    )
  }

  const nextDisabled = step === 0 && !isStep0Valid

  return (
    <div className="min-h-screen bg-cream-light">
      <div className="max-w-lg mx-auto px-4 pt-6 pb-28">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-olive-800">NutriKitchen</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs text-olive-400">📱 {profile.phone}</span>
            <button onClick={() => { logout(); setStep(0) }} className="text-xs text-olive-400 hover:text-olive-600">Đăng xuất</button>
          </div>
        </div>

        <StepBar step={step} />

        {step === 0 && <Step0Profile />}
        {step === 1 && <Step1TDEE pkg={pkg} onPkgChange={setPkg} />}
        {step === 2 && (
          <Step2Menu
            pkg={pkg}
            tier={tier}
            onTierChange={setTier}
            orderMode={orderMode}
            onOrderModeChange={setOrderMode}
            singleSel={singleSel}
            onSingleSelChange={setSingleSel}
            weekPlan={weekPlan}
            onWeekPlanChange={setWeekPlan}
          />
        )}
        {step === 3 && (
          <Step3Confirm
            pkg={pkg}
            tier={tier}
            orderMode={orderMode}
            singleSel={singleSel}
            weekPlan={weekPlan.slice(0, pkgObj.days)}
            note={note}
            onNoteChange={setNote}
            onConfirmed={() => setDone(true)}
          />
        )}
      </div>

      {step < 3 && (
        <BottomNav
          step={step}
          onPrev={handlePrev}
          onNext={handleNext}
          nextDisabled={nextDisabled}
          showPrev={step > 0}
        />
      )}
    </div>
  )
}
