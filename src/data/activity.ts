import type { ActivityKey } from '../types'

export interface ActivityOption {
  key: ActivityKey
  label: string
  desc: string
  factor: number
}

export const ACTIVITY: ActivityOption[] = [
  { key: 'sedentary', label: 'Ít vận động',    desc: 'Văn phòng, ít đi lại',  factor: 1.2   },
  { key: 'light',     label: 'Nhẹ nhàng',       desc: 'Tập 1-3 buổi/tuần',    factor: 1.375 },
  { key: 'moderate',  label: 'Vừa phải',         desc: 'Tập 3-5 buổi/tuần',    factor: 1.55  },
  { key: 'active',    label: 'Năng động',        desc: 'Tập 6-7 buổi/tuần',    factor: 1.725 },
  { key: 'very',      label: 'Vận động viên',    desc: 'Tập cường độ cao',      factor: 1.9   },
]
