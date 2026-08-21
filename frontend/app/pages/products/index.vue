<script setup lang="ts">
import { useProducts, categories } from '~/composables/useProducts'
import type { Product } from '~/stores/cart'

useHead({ title: 'Products - TechZone' })

const route = useRoute()
const { products, getByCategory, search } = useProducts()

const activeCategory = ref((route.query.category as string) ?? 'all')
const searchQuery = ref((route.query.q as string) ?? '')
const sortBy = ref('featured')
const priceRange = ref([0, 5000])

watch(() => route.query, (q) => {
  activeCategory.value = (q.category as string) ?? 'all'
  searchQuery.value = (q.q as string) ?? ''
})

const filtered = computed<Product[]>(() => {
  let list = products

  if (searchQuery.value) {
    list = search(searchQuery.value)
  } else if (activeCategory.value !== 'all') {
    list = getByCategory(activeCategory.value)
  }

  list = list.filter((p) => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

  switch (sortBy.value) {
    case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
    case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
    case 'rating': return [...list].sort((a, b) => b.rating - a.rating)
    case 'reviews': return [...list].sort((a, b) => b.reviews - a.reviews)
    default: return list
  }
})

const router = useRouter()
function setCategory(slug: string) {
  activeCategory.value = slug
  searchQuery.value = ''
  router.push({ query: slug === 'all' ? {} : { category: slug } })
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-black text-gray-900">
        <template v-if="searchQuery">Results for "{{ searchQuery }}"</template>
        <template v-else-if="activeCategory !== 'all'">
          {{ categories.find(c => c.slug === activeCategory)?.label ?? activeCategory }}
        </template>
        <template v-else>All Products</template>
      </h1>
      <p class="text-gray-500 mt-1">{{ filtered.length }} products found</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar filters -->
      <aside class="w-full lg:w-60 shrink-0 space-y-6">
        <!-- Categories -->
        <div class="card p-5">
          <h3 class="font-bold text-gray-900 mb-3">Categories</h3>
          <ul class="space-y-1">
            <li>
              <button
                class="w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                :class="activeCategory === 'all' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'"
                @click="setCategory('all')"
              >
                All Products
              </button>
            </li>
            <li v-for="cat in categories" :key="cat.slug">
              <button
                class="w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                :class="activeCategory === cat.slug ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'"
                @click="setCategory(cat.slug)"
              >
                <Icon :name="cat.icon" class="w-4 h-4" />
                {{ cat.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Price range -->
        <div class="card p-5">
          <h3 class="font-bold text-gray-900 mb-3">Price Range</h3>
          <div class="space-y-2">
            <input
              v-model="priceRange[1]"
              type="range"
              min="0"
              max="5000"
              step="100"
              class="w-full accent-primary-600"
            />
            <div class="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span class="font-semibold text-primary-600">${{ priceRange[1].toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Products -->
      <div class="flex-1">
        <!-- Sort bar -->
        <div class="flex items-center justify-between mb-6 gap-4">
          <p class="text-sm text-gray-500 shrink-0">{{ filtered.length }} results</p>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600 font-medium shrink-0">Sort by:</label>
            <select v-model="sortBy" class="input text-sm py-2 w-auto">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rating</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>

        <div v-if="filtered.length === 0" class="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <Icon name="lucide:search-x" class="w-16 h-16 text-gray-300" />
          <div>
            <p class="font-semibold text-gray-700 text-lg">No products found</p>
            <p class="text-gray-400 mt-1">Try a different category or search term</p>
          </div>
          <button class="btn-outline" @click="setCategory('all')">Clear filters</button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductProductCard v-for="p in filtered" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>
