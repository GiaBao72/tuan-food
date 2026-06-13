import type { PackageKey } from '../types'

export interface Package {
  key: PackageKey
  label: string
  days: number
  weeks: number
  discount: number
  badge: string | null
  color: string
}

export const PACKAGES: Package[] = [
  { key: 'single', label: 'Lẻ / Thử', days: 1,  weeks: 0, discount: 0,    badge: null,  color: '#5c9448' },
  { key: 'week1',  label: '1 Tuần',   days: 7,  weeks: 1, discount: 0,    badge: null,  color: '#64748b' },
  { key: 'week2',  label: '2 Tuần',   days: 14, weeks: 2, discount: 0.05, badge: '-5%', color: '#0ea5e9' },
]

export type TierKey = 'S' | 'M' | 'L' | 'XL'

export interface MenuTier {
  key: TierKey
  kcal: number
  label: string
}

export const MENU_TIERS: MenuTier[] = [
  { key: 'S',  kcal: 1400, label: 'S — 1400 kcal'  },
  { key: 'M',  kcal: 1800, label: 'M — 1800 kcal'  },
  { key: 'L',  kcal: 2200, label: 'L — 2200 kcal'  },
  { key: 'XL', kcal: 2800, label: 'XL — 2800 kcal' },
]

export const MEAL_SLOTS = [
  { key: 'breakfast' as const, label: 'Bữa Sáng', icon: '🌅', ratio: 0.25, time: '6-9h'   },
  { key: 'lunch'     as const, label: 'Bữa Trưa',  icon: '☀️', ratio: 0.40, time: '11-13h' },
  { key: 'dinner'    as const, label: 'Bữa Tối',   icon: '🌙', ratio: 0.35, time: '17-20h' },
]

export const DAYS = ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật']

export const MACRO_TARGETS: Record<string, [number, number, number]> = {
  lose:     [0.40, 0.35, 0.25],
  maintain: [0.30, 0.45, 0.25],
  gain:     [0.35, 0.45, 0.20],
}
