import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order, OrderStatus } from '../types'

const CHANNEL = 'tuan-food-orders'

interface OrderState {
  orders: Order[]
  addOrder: (o: Order) => void
  updateStatus: (id: number, status: OrderStatus) => void
  toggleItemDone: (orderId: number, itemId: string) => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (o) => {
        const next = [o, ...get().orders].slice(0, 50)
        set({ orders: next })
        try { new BroadcastChannel(CHANNEL).postMessage({ type: 'NEW_ORDER', order: o }) } catch { /* noop */ }
      },
      updateStatus: (id, status) => {
        const next = get().orders.map(o => o.id === id ? { ...o, status } : o)
        set({ orders: next })
        try { new BroadcastChannel(CHANNEL).postMessage({ type: 'STATUS_UPDATE', id, status }) } catch { /* noop */ }
      },
      toggleItemDone: (orderId, itemId) => {
        const next = get().orders.map(o => {
          if (o.id !== orderId) return o
          const done = o.doneItems ?? []
          const updated = done.includes(itemId)
            ? done.filter(x => x !== itemId)
            : [...done, itemId]
          return { ...o, doneItems: updated }
        })
        set({ orders: next })
      },
    }),
    { name: 'nk4-orders' }
  )
)
