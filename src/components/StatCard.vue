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
  <div
    class="flex flex-col bg-white border border-gray-200 h-fit rounded-2xl shadow-xl dark:bg-gray-50 w-full max-w-sm p-4">
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