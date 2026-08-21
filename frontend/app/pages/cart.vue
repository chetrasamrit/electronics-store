<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

useHead({ title: 'Cart - TechZone' })
const cart = useCartStore()

const checkoutDone = ref(false)

function checkout() {
  checkoutDone.value = true
  setTimeout(() => {
    cart.clearCart()
    checkoutDone.value = false
  }, 3000)
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>

    <!-- Success state -->
    <Transition name="fade">
      <div
        v-if="checkoutDone"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <div class="bg-white rounded-3xl p-10 text-center shadow-2xl space-y-4 max-w-sm mx-4">
          <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Icon name="lucide:check" class="w-10 h-10 text-green-600" />
          </div>
          <h2 class="text-2xl font-black text-gray-900">Order Placed!</h2>
          <p class="text-gray-500">Thank you for your purchase. Your order is being processed.</p>
        </div>
      </div>
    </Transition>

    <!-- Empty cart -->
    <div v-if="cart.items.length === 0" class="text-center py-24 space-y-4">
      <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
        <Icon name="lucide:shopping-cart" class="w-11 h-11 text-gray-400" />
      </div>
      <p class="text-xl font-semibold text-gray-700">Your cart is empty</p>
      <p class="text-gray-400">Looks like you haven't added anything yet.</p>
      <NuxtLink to="/products" class="btn-primary mt-4">Start Shopping</NuxtLink>
    </div>

    <div v-else class="grid lg:grid-cols-3 gap-10">
      <!-- Cart items -->
      <div class="lg:col-span-2 space-y-4">
        <TransitionGroup name="list" tag="div" class="space-y-4">
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="card p-5 flex gap-5"
          >
            <NuxtLink :to="`/products/${item.id}`" class="shrink-0">
              <img :src="item.image" :alt="item.name" class="w-28 h-28 object-cover rounded-xl" />
            </NuxtLink>
            <div class="flex-1 min-w-0 flex flex-col gap-2">
              <div>
                <p class="text-xs font-semibold text-primary-600">{{ item.brand }}</p>
                <NuxtLink :to="`/products/${item.id}`" class="font-bold text-gray-900 hover:text-primary-600 transition-colors leading-snug line-clamp-2">
                  {{ item.name }}
                </NuxtLink>
              </div>
              <p class="text-xl font-black text-gray-900">${{ (item.price * item.quantity).toLocaleString() }}</p>
              <div class="flex items-center gap-4 mt-auto">
                <div class="flex items-center rounded-xl border-2 border-gray-200">
                  <button class="px-3 py-1.5 hover:text-primary-600 transition-colors" @click="cart.updateQuantity(item.id, item.quantity - 1)">
                    <Icon name="lucide:minus" class="w-4 h-4" />
                  </button>
                  <span class="px-3 font-bold w-8 text-center">{{ item.quantity }}</span>
                  <button class="px-3 py-1.5 hover:text-primary-600 transition-colors" @click="cart.updateQuantity(item.id, item.quantity + 1)">
                    <Icon name="lucide:plus" class="w-4 h-4" />
                  </button>
                </div>
                <button
                  class="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                  @click="cart.removeItem(item.id)"
                >
                  <Icon name="lucide:trash-2" class="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <button class="text-sm text-gray-500 hover:text-red-500 font-medium flex items-center gap-1.5 transition-colors" @click="cart.clearCart()">
          <Icon name="lucide:trash" class="w-4 h-4" />
          Clear all items
        </button>
      </div>

      <!-- Order summary -->
      <div class="space-y-4">
        <div class="card p-6 space-y-4">
          <h2 class="text-lg font-bold text-gray-900">Order Summary</h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal ({{ cart.totalItems }} items)</span>
              <span class="font-semibold">${{ cart.subtotal.toLocaleString() }}</span>
            </div>
            <div v-if="cart.discount > 0" class="flex justify-between text-green-600">
              <span>Discount</span>
              <span class="font-semibold">-${{ cart.discount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span class="font-semibold text-green-600">Free</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Tax (est.)</span>
              <span class="font-semibold">${{ Math.round(cart.total * 0.08).toLocaleString() }}</span>
            </div>
          </div>

          <div class="flex justify-between font-black text-gray-900 text-xl pt-4 border-t border-gray-100">
            <span>Total</span>
            <span>${{ Math.round(cart.total * 1.08).toLocaleString() }}</span>
          </div>

          <button class="btn-primary w-full text-base py-3" @click="checkout">
            <Icon name="lucide:credit-card" class="w-5 h-5" />
            Place Order
          </button>

          <!-- Accepted payments -->
          <div class="flex items-center justify-center gap-3 pt-2">
            <span class="text-xs text-gray-400">We accept:</span>
            <div v-for="m in ['Visa', 'MC', 'PayPal']" :key="m" class="text-xs bg-gray-100 rounded px-2 py-0.5 font-medium text-gray-600">{{ m }}</div>
          </div>
        </div>

        <!-- Promo code -->
        <div class="card p-5">
          <p class="text-sm font-semibold text-gray-700 mb-3">Have a promo code?</p>
          <div class="flex gap-2">
            <input type="text" placeholder="Enter code" class="input text-sm py-2" />
            <button class="btn-outline text-sm py-2 px-4 shrink-0">Apply</button>
          </div>
        </div>

        <NuxtLink to="/products" class="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors font-medium">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Continue Shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.list-enter-active, .list-leave-active { transition: all 0.25s ease; }
.list-enter-from { transform: translateX(20px); opacity: 0; }
.list-leave-to { opacity: 0; }
</style>
