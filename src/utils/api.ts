const API_BASE = import.meta.env.VITE_API_URL ?? 'http://103.166.183.57:3001'

export const api = {
  async getOrders(status?: string): Promise<Response> {
    const url = status && status !== 'all'
      ? `${API_BASE}/orders?status=${status}`
      : `${API_BASE}/orders`
    return fetch(url)
  },

  async createOrder(order: unknown): Promise<Response> {
    return fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
  },

  async updateStatus(id: number, status: string): Promise<Response> {
    return fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
  },

  async toggleItemDone(id: number, itemId: string): Promise<Response> {
    return fetch(`${API_BASE}/orders/${id}/done-items`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId }),
    })
  },
}
