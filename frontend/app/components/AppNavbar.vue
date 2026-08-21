<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { categories } from '~/composables/useProducts'

const cart = useCartStore()
const router = useRouter()
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { q: searchQuery.value.trim() } })
    searchQuery.value = ''
    mobileMenuOpen.value = false
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">

    <!-- ── Row 1: Logo · Search · Cart ── -->
    <div class="border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 h-16 sm:h-18 lg:h-20">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/images/logo.jpeg"
              alt="VN NEXT"
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover shadow-md"
            />
            <div class="flex flex-col leading-tight">
              <span class="text-base sm:text-lg font-black tracking-tight text-gray-900">
                VN <span class="text-primary-600">NEXT</span>
              </span>
              <span class="hidden sm:block text-[10px] font-medium text-gray-400 tracking-widest uppercase">Electronics</span>
            </div>
          </NuxtLink>

          <!-- Search bar (sm+) -->
          <form class="flex-1 hidden sm:flex max-w-2xl mx-auto" @submit.prevent="handleSearch">
            <div class="relative w-full">
              <Icon
                name="lucide:search"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              />
              <input
                v-model="searchQuery"
                type="search"
                placeholder="Search phones, laptops, TVs, cameras..."
                class="input pl-11 pr-4 text-sm h-11"
              />
            </div>
          </form>

          <!-- Right: Cart + Hamburger -->
          <div class="ml-auto sm:ml-0 flex items-center gap-1 sm:gap-2">
            <!-- Cart -->
            <button
              class="relative flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors group"
              @click="cart.toggleCart()"
            >
              <Icon name="lucide:shopping-bag" class="w-6 h-6 text-gray-700" />
              <span class="hidden md:block text-sm font-medium text-gray-700">Cart</span>
              <span
                v-if="cart.totalItems > 0"
                class="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center leading-none"
              >
                {{ cart.totalItems > 9 ? '9+' : cart.totalItems }}
              </span>
            </button>

            <!-- Hamburger (hidden on lg+) -->
            <button
              class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <Icon
                :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
                class="w-5 h-5 text-gray-700"
              />
            </button>
          </div>
        </div>

        <!-- Mobile search bar -->
        <form class="sm:hidden pb-3" @submit.prevent="handleSearch">
          <div class="relative">
            <Icon
              name="lucide:search"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search electronics..."
              class="input pl-11 text-sm h-11"
            />
          </div>
        </form>
      </div>
    </div>

    <!-- ── Row 2: Category nav ── -->
    <!-- Desktop: full nav links -->
    <div class="hidden lg:block bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-8">
        <nav class="flex items-center gap-1 h-11">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-all whitespace-nowrap"
            active-class="text-primary-600 bg-primary-50 font-semibold"
          >
            <Icon :name="cat.icon" class="w-4 h-4" />
            {{ cat.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Tablet: scrollable category pills -->
    <div class="hidden sm:flex lg:hidden items-center gap-2 bg-white border-b border-gray-100 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-none">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="`/products?category=${cat.slug}`"
        class="flex items-center gap-1.5 shrink-0 text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
        active-class="text-primary-600 border-primary-400 bg-primary-50 font-semibold"
      >
        <Icon :name="cat.icon" class="w-3.5 h-3.5" />
        {{ cat.label }}
      </NuxtLink>
    </div>

    <!-- Mobile slide-down menu -->
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-100 bg-white shadow-lg">
        <nav class="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 gap-2">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-primary-50 transition-colors text-center"
            active-class="bg-primary-50"
            @click="mobileMenuOpen = false"
          >
            <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
              <Icon :name="cat.icon" class="w-5 h-5 text-primary-600" />
            </div>
            <span class="text-xs font-medium text-gray-700">{{ cat.label }}</span>
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
.scrollbar-none {
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
