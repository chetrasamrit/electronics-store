<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const { getById, getByCategory } = useProducts()
const cart = useCartStore()

const product = computed(() => getById(Number(route.params.id)))
const related = computed(() =>
  product.value ? getByCategory(product.value.category).filter((p) => p.id !== product.value!.id).slice(0, 4) : [],
)

useHead(() => ({
  title: product.value ? `${product.value.name} - TechZone` : 'Product - TechZone',
}))

const added = ref(false)
const quantity = ref(1)
const activeTab = ref<'specs' | 'reviews'>('specs')

function addToCart() {
  if (!product.value) return
  for (let i = 0; i < quantity.value; i++) cart.addItem(product.value)
  added.value = true
  setTimeout(() => (added.value = false), 2000)
}

function discountPct() {
  if (!product.value?.originalPrice) return 0
  return Math.round(((product.value.originalPrice - product.value.price) / product.value.originalPrice) * 100)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-gray-500 mb-8">
      <NuxtLink to="/" class="hover:text-primary-600 transition-colors">Home</NuxtLink>
      <Icon name="lucide:chevron-right" class="w-4 h-4" />
      <NuxtLink to="/products" class="hover:text-primary-600 transition-colors">Products</NuxtLink>
      <Icon name="lucide:chevron-right" class="w-4 h-4" />
      <span class="text-gray-900 font-medium truncate">{{ product?.name }}</span>
    </nav>

    <div v-if="!product" class="text-center py-20">
      <Icon name="lucide:package-x" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p class="text-xl font-semibold text-gray-700">Product not found</p>
      <NuxtLink to="/products" class="btn-primary mt-6">Back to Products</NuxtLink>
    </div>

    <div v-else>
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Image -->
        <div class="space-y-4">
          <div class="card overflow-hidden aspect-square flex items-center justify-center bg-gray-50 p-8">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-contain" />
          </div>
          <div v-if="!product.inStock" class="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
            <Icon name="lucide:alert-circle" class="w-5 h-5 text-red-500 shrink-0" />
            <p class="text-sm text-red-700 font-medium">This product is currently out of stock. Check back soon!</p>
          </div>
        </div>

        <!-- Details -->
        <div class="space-y-6">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="badge bg-primary-100 text-primary-700 text-sm">{{ product.brand }}</span>
              <span v-if="product.badge" class="badge bg-red-500 text-white text-sm">{{ product.badge }}</span>
            </div>
            <h1 class="text-3xl font-black text-gray-900 leading-tight">{{ product.name }}</h1>
          </div>

          <UiStarRating :rating="product.rating" :reviews="product.reviews" size="md" />

          <!-- Pricing -->
          <div class="flex items-end gap-4 py-4 border-y border-gray-100">
            <p class="text-4xl font-black text-gray-900">${{ product.price.toLocaleString() }}</p>
            <div v-if="product.originalPrice" class="flex flex-col">
              <span class="text-lg text-gray-400 line-through">${{ product.originalPrice.toLocaleString() }}</span>
              <span class="badge bg-green-100 text-green-700 text-sm">Save {{ discountPct() }}%</span>
            </div>
          </div>

          <!-- Add to cart controls -->
          <div class="flex items-center gap-4">
            <div class="flex items-center rounded-xl border-2 border-gray-200">
              <button
                class="px-4 py-3 hover:text-primary-600 transition-colors disabled:opacity-30"
                :disabled="quantity <= 1"
                @click="quantity--"
              >
                <Icon name="lucide:minus" class="w-4 h-4" />
              </button>
              <span class="px-4 font-bold text-lg w-12 text-center">{{ quantity }}</span>
              <button class="px-4 py-3 hover:text-primary-600 transition-colors" @click="quantity++">
                <Icon name="lucide:plus" class="w-4 h-4" />
              </button>
            </div>

            <button
              :disabled="!product.inStock || added"
              class="btn-primary flex-1 text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="added ? '!bg-green-600 hover:!bg-green-600' : ''"
              @click="addToCart"
            >
              <Icon :name="added ? 'lucide:check' : 'lucide:shopping-cart'" class="w-5 h-5" />
              {{ added ? 'Added to Cart!' : 'Add to Cart' }}
            </button>
          </div>

          <!-- Trust badges -->
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="b in [
                { icon: 'lucide:truck', label: 'Free Shipping' },
                { icon: 'lucide:rotate-ccw', label: '30-Day Return' },
                { icon: 'lucide:shield-check', label: '2yr Warranty' },
              ]"
              :key="b.label"
              class="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 text-center"
            >
              <Icon :name="b.icon" class="w-5 h-5 text-primary-600" />
              <span class="text-xs font-medium text-gray-700">{{ b.label }}</span>
            </div>
          </div>

          <!-- Specs tabs -->
          <div>
            <div class="flex gap-1 border-b border-gray-200 mb-4">
              <button
                v-for="tab in ['specs', 'reviews'] as const"
                :key="tab"
                class="px-4 py-2 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px"
                :class="activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                @click="activeTab = tab"
              >
                {{ tab }}
              </button>
            </div>

            <div v-if="activeTab === 'specs'">
              <ul class="space-y-3">
                <li
                  v-for="spec in product.specs"
                  :key="spec"
                  class="flex items-center gap-3 text-sm text-gray-700"
                >
                  <div class="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                  {{ spec }}
                </li>
              </ul>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="i in 3"
                :key="i"
                class="p-4 rounded-2xl bg-gray-50 space-y-2"
              >
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center">
                    <Icon name="lucide:user" class="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">Customer {{ i }}</p>
                    <UiStarRating :rating="product.rating - (i - 1) * 0.1" size="sm" />
                  </div>
                </div>
                <p class="text-sm text-gray-600">
                  {{ i === 1 ? 'Absolutely love this product! The build quality is exceptional and performance exceeded my expectations.'
                  : i === 2 ? 'Great value for money. Ships fast and works exactly as described. Would definitely recommend.'
                  : 'Solid product. Set up was easy and everything works perfectly. Very happy with the purchase.' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <section v-if="related.length > 0" class="mt-20">
        <h2 class="text-2xl font-black text-gray-900 mb-6">You may also like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </section>
    </div>
  </div>
</template>
