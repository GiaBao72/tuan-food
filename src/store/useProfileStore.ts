import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, WeightLog } from '../types'
import { calcTDEE } from '../utils/nutrition'

interface ProfileState {
  profile: UserProfile
  tdee: number | null
  tKcal: number | null
  tKcalWeek: number | null
  weekLogs: WeightLog[]
  setProfile: (p: Partial<UserProfile>) => void
  computeTDEE: (pkgDays?: number) => void
  addWeightLog: (weight: number) => void
  reset: () => void
}

const defaultProfile: UserProfile = {
  phone: '', name: '', gender: 'male', age: '', weight: '',
  height: '', activity: 'moderate', goal: 'lose',
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      tdee: null,
      tKcal: null,
      tKcalWeek: null,
      weekLogs: [],
      setProfile: (p) => set(s => ({ profile: { ...s.profile, ...p } })),
      computeTDEE: (pkgDays = 7) => {
        const { profile } = get()
        const { tdee, tKcal, tKcalWeek } = calcTDEE(profile, pkgDays)
        set({ tdee, tKcal, tKcalWeek })
      },
      addWeightLog: (weight) => {
        const { weekLogs, profile } = get()
        const wk = weekLogs.length + 1
        const log: WeightLog = {
          week: wk, weight,
          date: new Date().toLocaleDateString('vi-VN'),
          tdeeUpdated: 0,
        }
        const updProfile = { ...profile, weight: String(weight) }
        const { tdee, tKcal, tKcalWeek } = calcTDEE(updProfile)
        log.tdeeUpdated = tKcal
        set({ weekLogs: [...weekLogs, log], profile: updProfile, tdee, tKcal, tKcalWeek })
      },
      reset: () => set({ profile: defaultProfile, tdee: null, tKcal: null, tKcalWeek: null }),
    }),
    { name: 'nk4-profile' }
  )
)
