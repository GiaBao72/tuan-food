export const vnd = (n: number) => Math.round(n).toLocaleString('vi-VN') + 'd'
export const r1  = (n: number) => Math.round(n * 10) / 10

const WEEKDAYS = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

// "Thứ 2, 16/06" — định dạng Thứ, ngày, tháng
export function dateLabel(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${WEEKDAYS[d.getDay()]}, ${dd}/${mm}`
}

// startDate (ISO yyyy-mm-dd) + offset ngày → Date
export function dayFromStart(startISO: string | undefined, offset: number): Date {
  const base = startISO ? new Date(startISO + 'T00:00:00') : new Date()
  base.setDate(base.getDate() + offset)
  return base
}

// Nhãn ngày thứ N của đơn (offset 0 = ngày bắt đầu)
export function planDayLabel(startISO: string | undefined, offset: number): string {
  return dateLabel(dayFromStart(startISO, offset))
}

// ISO date hôm nay (yyyy-mm-dd, local)
export function todayISO(): string {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

// Date → ISO yyyy-mm-dd (local)
export function isoOf(d: Date): string {
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

