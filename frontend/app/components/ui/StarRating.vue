<script setup lang="ts">
const props = defineProps<{ rating: number; reviews?: number; size?: 'sm' | 'md' }>()
const size = computed(() => props.size ?? 'sm')
</script>

<template>
  <div class="flex items-center gap-1.5">
    <div class="flex">
      <template v-for="i in 5" :key="i">
        <Icon
          :name="i <= Math.round(rating) ? 'lucide:star' : 'lucide:star'"
          :class="[
            size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5',
            i <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200',
          ]"
        />
      </template>
    </div>
    <span :class="size === 'sm' ? 'text-xs' : 'text-sm'" class="text-gray-500 font-medium">
      {{ rating.toFixed(1) }}
      <span v-if="reviews" class="text-gray-400">({{ reviews.toLocaleString() }})</span>
    </span>
  </div>
</template>
