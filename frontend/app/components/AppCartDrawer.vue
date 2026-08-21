<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()
</script>

<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="cart.isOpen"
      class="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
      @click="cart.closeCart()"
    />
  </Transition>

  <!-- Drawer -->
  <Transition name="slide-right">
    <aside
      v-if="cart.isOpen"
      class="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <Icon name="lucide:shopping-bag" class="w-6 h-6 text-primary-600" />
          <h2 class="text-lg font-bold text-gray-900">Shopping Cart</h2>
          <span class="badge bg-primary-100 text-primary-700">{{ cart.totalItems }}</span>
        </div>
        <button
          class="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          @click="cart.closeCart()"
        >
          <Icon name="lucide:x" class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto py-4 px-6">
        <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center h-full gap-4 text-center">
          <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon name="lucide:shopping-cart" class="w-9 h-9 text-gray-400" />
          </div>
          <div>
            <p class="font-semibold text-gray-700">Your cart is empty</p>
            <p class="text-sm text-gray-400 mt-1">Add some electronics to get started!</p>
          </div>
          <button class="btn-outline text-sm" @click="cart.closeCart()">Continue Shopping</button>
        </div>

        <TransitionGroup name="list" tag="ul" class="flex flex-col gap-4">
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="flex gap-4 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-xl shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-primary-600">{{ item.brand }}</p>
              <p class="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{{ item.name }}</p>
              <p class="text-base font-bold text-gray-900 mt-1">${{ item.price.toLocaleString() }}</p>
            </div>
            <div class="flex flex-col items-end justify-between gap-2">
              <button
                class="p-1.5 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                @click="cart.removeItem(item.id)"
              >
                <Icon name="lucide:trash-2" class="w-4 h-4" />
              </button>
              <div class="flex items-center gap-1.5 bg-white rounded-xl border border-gray-200 px-1">
                <button
                  class="p-1 hover:text-primary-600 transition-colors"
                  @click="cart.updateQuantity(item.id, item.quantity - 1)"
                >
                  <Icon name="lucide:minus" class="w-3.5 h-3.5" />
                </button>
                <span class="text-sm font-bold w-5 text-center">{{ item.quantity }}</span>
                <button
                  class="p-1 hover:text-primary-600 transition-colors"
                  @click="cart.updateQuantity(item.id, item.quantity + 1)"
                >
                  <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </li>
        </TransitionGroup>
      </div>

      <!-- Footer summary -->
      <div v-if="cart.items.length > 0" class="border-t border-gray-100 px-6 py-5 space-y-4">
        <div class="space-y-2">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span class="font-semibold">${{ cart.subtotal.toLocaleString() }}</span>
          </div>
          <div v-if="cart.discount > 0" class="flex justify-between text-sm text-green-600">
            <span>You save</span>
            <span class="font-semibold">-${{ cart.discount.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span class="font-semibold text-green-600">Free</span>
          </div>
          <div class="flex justify-between font-bold text-gray-900 text-lg pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>${{ cart.total.toLocaleString() }}</span>
          </div>
        </div>

        <NuxtLink
          to="/cart"
          class="btn-primary w-full text-base"
          @click="cart.closeCart()"
        >
          <Icon name="lucide:credit-card" class="w-5 h-5" />
          Proceed to Checkout
        </NuxtLink>
        <button class="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors" @click="cart.closeCart()">
          Continue Shopping
        </button>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

.list-enter-active, .list-leave-active { transition: all 0.25s ease; }
.list-enter-from { transform: translateX(20px); opacity: 0; }
.list-leave-to { transform: translateX(-10px); opacity: 0; }
</style>
