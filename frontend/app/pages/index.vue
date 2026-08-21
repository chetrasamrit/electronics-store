<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useProducts, categories } from '~/composables/useProducts'

const cart = useCartStore()
const { getFeatured, products } = useProducts()
const featured = getFeatured()

useHead({ title: 'TechZone - Latest Electronics at Best Prices' })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-primary-800 text-white">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary-400 blur-3xl" />
        <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              <Icon name="lucide:zap" class="w-4 h-4 text-yellow-400" />
              <span>New Arrivals — iPhone 16 Pro & Galaxy S25 Ultra</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Next-Level <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-blue-300">
                Electronics
              </span> <br />
              Await You
            </h1>
            <p class="text-lg text-gray-300 max-w-lg leading-relaxed">
              Discover the latest smartphones, laptops, TVs, cameras, and more.
              Free shipping on orders over $99. 30-day returns guaranteed.
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/products" class="btn-primary text-base px-8 py-3">
                <Icon name="lucide:shopping-bag" class="w-5 h-5" />
                Shop Now
              </NuxtLink>
              <NuxtLink to="/products?category=phones" class="btn-outline text-base px-8 py-3 border-white/30 text-white hover:bg-white/10">
                View Phones
              </NuxtLink>
            </div>
            <div class="flex items-center gap-8 pt-4">
              <div v-for="stat in [{ n: '50K+', l: 'Products' }, { n: '4.9★', l: 'Rating' }, { n: '99%', l: 'Satisfaction' }]" :key="stat.l">
                <p class="text-2xl font-black text-white">{{ stat.n }}</p>
                <p class="text-sm text-gray-400">{{ stat.l }}</p>
              </div>
            </div>
          </div>

          <div class="hidden lg:flex justify-center items-center">
            <div class="relative">
              <div class="w-80 h-80 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop"
                  alt="Featured product"
                  class="w-72 h-72 object-cover rounded-2xl"
                />
              </div>
              <!-- Floating badges -->
              <div class="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Icon name="lucide:trending-up" class="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">This week</p>
                  <p class="text-sm font-bold text-gray-900">+2,400 sold</p>
                </div>
              </div>
              <div class="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
                <Icon name="lucide:shield-check" class="w-6 h-6 text-primary-600" />
                <p class="text-sm font-bold text-gray-900">2yr Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-black text-gray-900">Shop by Category</h2>
          <p class="text-gray-500 mt-1">Browse our full range of electronics</p>
        </div>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/products?category=${cat.slug}`"
          class="card p-5 flex flex-col items-center gap-3 text-center group cursor-pointer hover:border-primary-200 border border-transparent"
        >
          <div :class="[cat.color, 'w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform']">
            <Icon :name="cat.icon" class="w-7 h-7" />
          </div>
          <span class="text-sm font-semibold text-gray-800">{{ cat.label }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Promo banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div class="rounded-3xl bg-gradient-to-r from-accent-500 to-orange-400 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div class="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div class="space-y-2 z-10">
          <span class="badge bg-white/20 text-white text-sm px-3 py-1">Limited Time</span>
          <h3 class="text-2xl sm:text-3xl font-black text-white">Up to 30% OFF</h3>
          <p class="text-orange-100">On selected laptops & TVs this weekend only</p>
        </div>
        <NuxtLink to="/products" class="btn-primary bg-white text-accent-600 hover:bg-gray-50 px-8 py-3 z-10 shrink-0">
          Grab the Deal
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-black text-gray-900">Featured Products</h2>
          <p class="text-gray-500 mt-1">Handpicked deals just for you</p>
        </div>
        <NuxtLink to="/products" class="btn-outline text-sm">
          View All
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductProductCard v-for="p in featured" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- Trust signals -->
    <section class="bg-white border-y border-gray-100 mt-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="item in [
              { icon: 'lucide:truck', title: 'Free Shipping', desc: 'On orders over $99' },
              { icon: 'lucide:rotate-ccw', title: '30-Day Returns', desc: 'Hassle-free returns' },
              { icon: 'lucide:shield-check', title: '2yr Warranty', desc: 'On all products' },
              { icon: 'lucide:headphones', title: '24/7 Support', desc: 'Always here for you' },
            ]"
            :key="item.title"
            class="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
          >
            <div class="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center shrink-0">
              <Icon :name="item.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p class="font-bold text-gray-900">{{ item.title }}</p>
              <p class="text-sm text-gray-500 mt-0.5">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Products grid preview -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-black text-gray-900">All Products</h2>
          <p class="text-gray-500 mt-1">{{ products.length }} items available</p>
        </div>
        <NuxtLink to="/products" class="btn-outline text-sm">
          Browse All
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductProductCard v-for="p in products.slice(0, 8)" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>
