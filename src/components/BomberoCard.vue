<script setup lang="ts">
import { UserIcon, ClockIcon } from '@heroicons/vue/24/solid'

interface Bombero {
  id: number
  nombre: string
  rango: string
  departamento: string
  estado: 'Crítico' | 'Óptimo' | 'Regular'
  horasTrabajadas: number
  horasRequeridas: number
  porcentaje: number
  faltantes: number
  grupo: string
  colorEstado: string
}

interface Props {
  bombero: Bombero
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 mb-6">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <span class="bg-gray-100 p-2 rounded-full">
          <UserIcon class="w-6 h-6 text-gray-500" />
        </span>
        <span class="text-lg font-semibold text-gray-900">{{ bombero.nombre }}</span>
      </div>
      <span v-if="bombero.estado === 'Crítico'"
        class="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Crítico</span>
      <span v-else-if="bombero.estado === 'Óptimo'"
        class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Óptimo</span>
      <span v-else-if="bombero.estado === 'Regular'"
        class="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">Regular</span>
    </div>
    <div class="flex items-center gap-2 mb-1">
      <span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ bombero.rango }}</span>
    </div>
    <div class="mt-4 flex items-center gap-2">
      <ClockIcon class="w-5 h-5 text-gray-400" />
      <span class="text-gray-600 text-sm">Horas trabajadas:</span>
      <span class="font-bold text-gray-900 ml-1">{{ bombero.horasTrabajadas }}h</span>
    </div>
    <div class="flex items-center gap-2 mt-1">
      <ClockIcon class="w-5 h-5 text-gray-400" />
      <span class="text-gray-600 text-sm">Horas requeridas (trimestral):</span>
      <span class="font-bold text-gray-900 ml-1">{{ bombero.horasRequeridas }}h</span>
    </div>
    <div class="mt-4 flex items-center justify-between">
      <span class="text-gray-600 text-sm">Progreso</span>
      <span :class="{
        'text-red-500': bombero.estado === 'Crítico',
        'text-green-500': bombero.estado === 'Óptimo',
        'text-yellow-500': bombero.estado === 'Regular',
        'font-bold': true,
        'text-sm': true
      }">{{ bombero.porcentaje }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-1">
      <div :class="{
        'bg-red-500': bombero.estado === 'Crítico',
        'bg-green-500': bombero.estado === 'Óptimo',
        'bg-yellow-400': bombero.estado === 'Regular',
        'h-2.5': true,
        'rounded-full': true
      }" :style="{ width: bombero.porcentaje + '%' }"></div>
    </div>
    <div :class="{
      'text-red-500': bombero.estado === 'Crítico',
      'text-green-500': bombero.estado === 'Óptimo',
      'text-yellow-500': bombero.estado === 'Regular',
      'text-sm': true,
      'font-semibold': true,
      'mb-4': true
    }">{{ bombero.faltantes }}h faltantes</div>
  </div>
</template>