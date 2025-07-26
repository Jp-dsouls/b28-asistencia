<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  icon?: any
  iconColor?: string
  bgColor?: string
}

defineProps<Props>()
</script>

<template>
  <!-- Mobile: Tarjeta compacta -->
  <div class="w-full bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-50 p-3 sm:hidden">
    <div class="flex items-center gap-3">
      <component v-if="icon" :is="icon" :class="[
        'w-5 h-5',
        iconColor || 'text-gray-500'
      ]" />
      <div v-else-if="bgColor" :class="['w-8 h-8 rounded-full', bgColor]"></div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-normal text-gray-700 dark:text-gray-400 truncate">{{ title }}</p>
        <h5 class="text-lg font-bold tracking-tight text-gray-900">{{ value }}</h5>
      </div>
    </div>
  </div>

  <!-- Tablet: Tarjeta media -->
  <div
    class="hidden sm:block lg:hidden w-full bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-50 p-4">
    <div class="flex items-center gap-3">
      <component v-if="icon" :is="icon" :class="[
        'w-6 h-6',
        iconColor || 'text-gray-500'
      ]" />
      <div v-else-if="bgColor" :class="['w-10 h-10 rounded-full', bgColor]"></div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-normal text-gray-700 dark:text-gray-400 truncate">{{ title }}</p>
        <h5 class="text-xl font-bold tracking-tight text-gray-900">{{ value }}</h5>
      </div>
    </div>
  </div>

  <!-- Desktop: Tarjeta completa -->
  <div
    class="hidden lg:block w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl dark:bg-gray-50 p-4">
    <div class="flex leading-normal items-center gap-2">
      <component v-if="icon" :is="icon" :class="[
        'w-6 h-6',
        iconColor || 'text-gray-500'
      ]" />
      <div v-else-if="bgColor" :class="['w-12 h-12 rounded-full', bgColor]"></div>
      <div class="flex flex-col">
        <p class="font-normal text-gray-700 dark:text-gray-400">{{ title }}</p>
        <h5 class="text-2xl font-bold tracking-tight text-gray-900">{{ value }}</h5>
      </div>
    </div>
  </div>
</template>