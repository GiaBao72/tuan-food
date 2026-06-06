import { create } from 'zustand'
import type { UserProfile, WeightLog } from '../types'
import { calcTDEE } from '../utils/nutrition'

// Lưu data theo từng SĐT — phone là ID khách hàng
const STORAGE_KEY = (phone: string) => `nk4-profile-${phone}`

export interface CustomerData {
  profile: UserProfile
  tdee: number | null
  tKcal: number | null
  weekLogs: WeightLog[]
}

function loadCustomer(phone: string): CustomerData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(phone))
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveCustomer(phone: string, data: CustomerData) {
  try { localStorage.setItem(STORAGE_KEY(phone), JSON.stringify(data)) } catch {}
}

const defaultProfile: UserProfile = {
  phone: '', name: '', gender: 'male', age: '', weight: '',
  height: '', activity: 'moderate', goal: 'lose',
}

interface ProfileState {
  phone: string           // SĐT đang đăng nhập
  isLoggedIn: boolean
  profile: UserProfile
  tdee: number | null
  tKcal: number | null
  weekLogs: WeightLog[]
  // Actions
  login: (phone: string) => { isNew: boolean }  // trả về isNew để UI biết khách mới/cũ
  logout: () => void
  setProfile: (p: Partial<UserProfile>) => void
  computeTDEE: (pkgDays?: number) => void
  addWeightLog: (weight: number) => void
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  phone: '',
  isLoggedIn: false,
  profile: defaultProfile,
  tdee: null,
  tKcal: null,
  weekLogs: [],

  login: (phone) => {
    const existing = loadCustomer(phone)
    if (existing) {
      // Khách cũ — load data
      set({
        phone,
        isLoggedIn: true,
        profile: { ...existing.profile, phone },
        tdee: existing.tdee,
        tKcal: existing.tKcal,
        weekLogs: existing.weekLogs ?? [],
      })
      return { isNew: false }
    } else {
      // Khách mới — tạo profile rỗng
      const fresh: UserProfile = { ...defaultProfile, phone }
      set({ phone, isLoggedIn: true, profile: fresh, tdee: null, tKcal: null, weekLogs: [] })
      return { isNew: true }
    }
  },

  logout: () => set({
    phone: '', isLoggedIn: false, profile: defaultProfile,
    tdee: null, tKcal: null, weekLogs: [],
  }),

  setProfile: (p) => {
    const { phone, profile, tdee, tKcal, weekLogs } = get()
    const updated = { ...profile, ...p }
    set({ profile: updated })
    if (phone) saveCustomer(phone, { profile: updated, tdee, tKcal, weekLogs })
  },

  computeTDEE: (pkgDays = 7) => {
    const { profile, phone, weekLogs } = get()
    const { tdee, tKcal } = calcTDEE(profile, pkgDays)
    set({ tdee, tKcal })
    if (phone) saveCustomer(phone, { profile, tdee, tKcal, weekLogs })
  },

  addWeightLog: (weight) => {
    const { weekLogs, profile, phone } = get()
    const wk = weekLogs.length + 1
    const log: WeightLog = {
      week: wk, weight,
      date: new Date().toLocaleDateString('vi-VN'),
      tdeeUpdated: 0,
    }
    const updProfile = { ...profile, weight: String(weight) }
    const { tdee, tKcal } = calcTDEE(updProfile)
    log.tdeeUpdated = tKcal
    const newLogs = [...weekLogs, log]
    set({ weekLogs: newLogs, profile: updProfile, tdee, tKcal })
    if (phone) saveCustomer(phone, { profile: updProfile, tdee, tKcal, weekLogs: newLogs })
  },
}))
