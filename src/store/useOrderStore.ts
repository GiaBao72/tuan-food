import { create } from 'zustand'
import type { Order, OrderStatus } from '../types'
import { api } from '../utils/api'

interface OrderState {
  orders: Order[]
  loading: boolean
  fetchOrders: () => Promise<void>
  addOrder: (o: Order) => Promise<void>
  updateStatus: (id: number, status: OrderStatus) => Promise<void>
  toggleItemDone: (orderId: number, itemId: string) => Promise<void>
}

export const useOrderStore = create<OrderState>()((set, get) => ({
  orders: [],
  loading: false,

  fetchOrders: async () => {
    set({ loading: true })
    try {
      const res = await api.getOrders()
      if (res.ok) {
        const data = await res.json()
        set({ orders: data })
      }
    } catch { /* network error — giữ nguyên orders cũ */ }
    finally { set({ loading: false }) }
  },

  addOrder: async (o) => {
    // Optimistic update ngay
    set(s => ({ orders: [o, ...s.orders] }))
    try {
      await api.createOrder(o)
    } catch {
      // Nếu API lỗi vẫn giữ local — retry sau
      console.warn('API unavailable, order saved locally only')
    }
  },

  updateStatus: async (id, status) => {
    // Optimistic update
    set(s => ({ orders: s.orders.map(o => o.id === id ? { ...o, status } : o) }))
    try {
      await api.updateStatus(id, status)
    } catch { console.warn('Failed to sync status') }
  },

  toggleItemDone: async (orderId, itemId) => {
    // Optimistic update
    set(s => ({
      orders: s.orders.map(o => {
        if (o.id !== orderId) return o
        const done = o.doneItems ?? []
        const updated = done.includes(itemId) ? done.filter(x => x !== itemId) : [...done, itemId]
        return { ...o, doneItems: updated }
      })
    }))
    try {
      const res = await api.toggleItemDone(orderId, itemId)
      if (res.ok) {
        const { doneItems } = await res.json()
        // Sync lại từ server
        set(s => ({
          orders: s.orders.map(o => o.id === orderId ? { ...o, doneItems } : o)
        }))
      }
    } catch { console.warn('Failed to sync done items') }
  },
}))
