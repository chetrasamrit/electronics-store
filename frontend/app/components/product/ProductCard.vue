<script setup lang="ts">
import type { Product } from '~/stores/cart'
import { useCartStore } from '~/stores/cart'

defineProps<{ product: Product }>()

const cart = useCartStore()
const added = ref(false)

function addToCart(product: Product) {
  cart.addItem(product)
  added.value = true
  setTimeout(() => (added.value = false), 1500)
}

function discountPct(product: Product) {
  if (!product.originalPrice) return 0
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
}
</script>

<template>
  <div class="card flex flex-col overflow-hidden group">
    <!-- Image -->
    <div class="relative overflow-hidden bg-gray-50 aspect-square">
      <NuxtLink :to="`/products/${product.id}`">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </NuxtLink>

      <!-- Badge -->
      <span
        v-if="product.badge"
        class="absolute top-3 left-3 badge text-white"
        :class="{
          'bg-red-500': product.badge === 'Sale' || product.badge === 'Hot Deal',
          'bg-blue-500': product.badge === 'New',
          'bg-amber-500': product.badge === 'Best Seller' || product.badge === 'Top Rated',
        }"
      >
        {{ product.badge }}
      </span>

      <!-- Discount -->
      <span
        v-if="product.originalPrice"
        class="absolute top-3 right-3 badge bg-green-500 text-white"
      >
        -{{ discountPct(product) }}%
      </span>

      <!-- Out of stock overlay -->
      <div
        v-if="!product.inStock"
        class="absolute inset-0 bg-white/70 flex items-center justify-center"
      >
        <span class="badge bg-gray-700 text-white text-sm px-3 py-1">Out of Stock</span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 p-4 gap-2">
      <p class="text-xs font-semibold text-primary-600 uppercase tracking-wider">{{ product.brand }}</p>
      <NuxtLink :to="`/products/${product.id}`" class="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
        {{ product.name }}
      </NuxtLink>

      <UiStarRating :rating="product.rating" :reviews="product.reviews" />

      <!-- Specs preview -->
      <ul class="hidden sm:flex flex-col gap-0.5 mt-1">
        <li v-for="spec in product.specs.slice(0, 2)" :key="spec" class="text-xs text-gray-500 flex items-center gap-1">
          <Icon name="lucide:check" class="w-3 h-3 text-green-500 shrink-0" />
          {{ spec }}
        </li>
      </ul>

      <div class="mt-auto pt-3 flex items-end justify-between gap-3">
        <div>
          <p class="text-xl font-bold text-gray-900">${{ product.price.toLocaleString() }}</p>
          <p v-if="product.originalPrice" class="text-sm text-gray-400 line-through">
            ${{ product.originalPrice.toLocaleString() }}
          </p>
        </div>

        <button
          :disabled="!product.inStock || added"
          class="btn-primary text-sm py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          :class="added ? 'bg-green-600 hover:bg-green-600' : ''"
          @click="addToCart(product)"
        >
          <Icon :name="added ? 'lucide:check' : 'lucide:shopping-cart'" class="w-4 h-4" />
          {{ added ? 'Added!' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>
