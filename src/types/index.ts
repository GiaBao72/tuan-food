export type Goal = 'lose' | 'maintain' | 'gain'
export type ActivityKey = 'sedentary' | 'light' | 'moderate' | 'active' | 'very'
export type MealSlot = 'breakfast' | 'lunch' | 'dinner'
export type OrderStatus = 'new' | 'confirmed' | 'delivering' | 'done'
export type PackageKey = 'day1' | 'day5' | 'day20'

export interface Ingredient {
  name: string
  baseAmt: number
  unit: string
  kP: number
  pP: number
  cP: number
  fP: number
}

export interface MenuItem {
  id: string
  name: string
  icon: string
  tag: string
  basePrice: number
  ingredients: Ingredient[]
}

export interface ScaledItem extends MenuItem {
  factor: number
  kcal: number
  price: number
  protein: number
  carb: number
  fat: number
  ings: Array<Ingredient & { amt: number }>
}

export interface DayPlan {
  breakfast: string[]
  lunch: string[]
  dinner: string[]
}

export interface UserProfile {
  phone: string   // dùng làm ID khách hàng
  name: string    // tự động lấy từ phone hoặc để trống
  gender: 'male' | 'female'
  age: string
  weight: string
  height: string
  activity: ActivityKey
  goal: Goal
}

export interface Order {
  id: number
  date: string
  startDate: string   // ISO yyyy-mm-dd — ngày 1 của thực đơn
  profile: UserProfile
  tdee: number
  tKcal: number
  tier: string        // S/M/L/XL — mức menu cố định khách chọn
  pkg: PackageKey
  pkgDays: number
  pkgWeeks: number
  pkgDisc: number
  orderMode: 'single' | 'weekly'
  singleSel: DayPlan
  weekPlan: DayPlan[]
  pkgTotal: number
  pkgSave: number
  note: string
  status: OrderStatus
  doneItems: string[]  // ids của món đã xong
}

export interface WeightLog {
  week: number
  weight: number
  date: string
  tdeeUpdated: number
}
