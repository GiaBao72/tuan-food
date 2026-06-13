import type { UserProfile, MenuItem, ScaledItem } from '../types'
import { ACTIVITY } from '../data/activity'
import { MACRO_TARGETS, MENU_TIERS } from '../data/packages'
import type { MenuTier } from '../data/packages'

export function calcBMI(weight: string, height: string): number | null {
  const w = parseFloat(weight), h = parseFloat(height) / 100
  return h > 0 ? parseFloat((w / (h * h)).toFixed(1)) : null
}

export function bmiInfo(bmi: number | null) {
  if (!bmi) return null
  if (bmi < 18.5) return { label: 'Thiếu cân',   color: '#d97706', bg: '#fef3c7' }
  if (bmi < 23)   return { label: 'Bình thường', color: '#4a7a3a', bg: '#e8f2e2' }
  if (bmi < 27.5) return { label: 'Thừa cân',    color: '#c2410c', bg: '#ffedd5' }
  return               { label: 'Béo phì',      color: '#991b1b', bg: '#fee2e2' }
}

export function calcBMR(p: UserProfile): number {
  const a = parseFloat(p.age), w = parseFloat(p.weight), h = parseFloat(p.height)
  if (!a || !w || !h) return 0
  return p.gender === 'male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161
}

export function calcTDEE(p: UserProfile, pkgDays = 7): { tdee: number; tKcal: number; tKcalWeek: number } {
  const bmr = calcBMR(p)
  const factor = ACTIVITY.find(a => a.key === p.activity)?.factor ?? 1.55
  const tdee = Math.round(bmr * factor)
  // adj tính theo ngày, nhân pkgDays để ra tổng tuần
  const adjPerDay = p.goal === 'lose' ? -500 : p.goal === 'gain' ? 400 : 0
  const tKcal = Math.max(1200, tdee + adjPerDay)           // kcal/ngày (dùng để scale món)
  const tKcalWeek = Math.max(1200 * pkgDays, tKcal * pkgDays) // kcal tổng gói (hiển thị)
  return { tdee, tKcal, tKcalWeek }
}

export function itemBaseKcal(item: MenuItem): number {
  return item.ingredients.reduce((s, i) => s + i.baseAmt * i.kP, 0)
}

export function scaleItem(item: MenuItem, factor: number): ScaledItem {
  const ings = item.ingredients.map(i => ({ ...i, amt: Math.round(i.baseAmt * factor * 10) / 10 }))
  return {
    ...item,
    factor: Math.round(factor * 100) / 100,
    ings,
    kcal:    Math.round(ings.reduce((s, i) => s + i.amt * i.kP, 0)),
    price:   Math.round(item.basePrice * factor / 1000) * 1000,
    protein: Math.round(ings.reduce((s, i) => s + i.amt * i.pP, 0)),
    carb:    Math.round(ings.reduce((s, i) => s + i.amt * i.cP, 0)),
    fat:     Math.round(ings.reduce((s, i) => s + i.amt * i.fP, 0)),
  }
}

export function getMacroTarget(goal: string): [number, number, number] {
  return MACRO_TARGETS[goal] ?? MACRO_TARGETS['maintain']
}

// Chọn mức menu cố định (S/M/L/XL) có kcal gần với tKcal nhất
export function suggestTier(tKcal: number): MenuTier {
  return MENU_TIERS.reduce((best, t) =>
    Math.abs(t.kcal - tKcal) < Math.abs(best.kcal - tKcal) ? t : best
  , MENU_TIERS[0])
}

export type HealthLevel = 'ok' | 'warn' | 'danger'
export interface HealthCheck {
  level: HealthLevel
  icon: string
  title: string
  msg: string
  tip?: string
}

export function healthCheck(goal: string, curW: string, tgtW: string, days: number): HealthCheck | null {
  if (goal === 'maintain' || !tgtW || !curW || !days) return null
  const diff = parseFloat(tgtW) - parseFloat(curW)
  if (isNaN(diff) || diff === 0) return null
  const kgW = Math.abs(diff) / (days / 7)
  const losing = diff < 0
  if (losing) {
    if (kgW > 1.0) return { level: 'danger', icon: '😨', title: 'Nguy hiểm!', msg: `${kgW.toFixed(2)}kg/tuần — có thể gây suy dinh dưỡng.`, tip: `Cần ít nhất ${Math.ceil(Math.abs(diff)/0.75*7)} ngày.` }
    if (kgW > 0.75) return { level: 'warn', icon: '⚠️', title: 'Hơi nhanh', msg: `${kgW.toFixed(2)}kg/tuần dễ mệt cơ.`, tip: 'Chọn gói dài hơn.' }
    return { level: 'ok', icon: '✅', title: 'An toàn', msg: `${kgW.toFixed(2)}kg/tuần — bền vững và lành mạnh.` }
  } else {
    if (kgW > 0.75) return { level: 'warn', icon: '⚠️', title: 'Tăng quá nhanh', msg: `${kgW.toFixed(2)}kg/tuần dễ tích mỡ.`, tip: 'Kéo dài gói.' }
    return { level: 'ok', icon: '✅', title: 'Hợp lý', msg: `${kgW.toFixed(2)}kg/tuần — tốc độ tăng cơ lý tưởng.` }
  }
}

export const MILESTONES = [
  { kg: 0.5, label: 'Bước đầu tiên! 🎯', color: '#4a7a3a' },
  { kg: 1,   label: '1kg rồi! 💪',        color: '#3a5e2e' },
  { kg: 2,   label: '2kg — Tuyệt! ⚡',    color: '#0d9488' },
  { kg: 3,   label: '3kg — Kiên trì! 🔥', color: '#0284c7' },
  { kg: 5,   label: '5kg — Xuất sắc! 🏆', color: '#7c3aed' },
]

export function getMilestone(lost: number) {
  return MILESTONES.filter(m => lost >= m.kg).slice(-1)[0] ?? null
}
