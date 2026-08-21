import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  badge?: string
  specs: string[]
  inStock: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    discount: (state) =>
      state.items.reduce((sum, i) => sum + ((i.originalPrice ?? i.price) - i.price) * i.quantity, 0),
    total(): number {
      return this.subtotal
    },
  },

  actions: {
    addItem(product: Product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.isOpen = true
    },
    removeItem(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    updateQuantity(id: number, quantity: number) {
      const item = this.items.find((i) => i.id === id)
      if (item) {
        if (quantity <= 0) this.removeItem(id)
        else item.quantity = quantity
      }
    },
    clearCart() {
      this.items = []
    },
    toggleCart() {
      this.isOpen = !this.isOpen
    },
    closeCart() {
      this.isOpen = false
    },
  },
})
