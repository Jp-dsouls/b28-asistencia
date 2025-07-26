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
  <!-- Mobile: Tarjeta vertical compacta -->
  <div class="w-full bg-white rounded-2xl shadow-xl p-4 mb-4 sm:hidden">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="bg-gray-100 p-1.5 rounded-full">
          <UserIcon class="w-4 h-4 text-gray-500" />
        </span>
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-900 leading-tight">{{ bombero.nombre }}</span>
          <span class="text-xs text-gray-500">{{ bombero.rango }}</span>
        </div>
      </div>
      <span v-if="bombero.estado === 'Crítico'"
        class="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">Crítico</span>
      <span v-else-if="bombero.estado === 'Óptimo'"
        class="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Óptimo</span>
      <span v-else-if="bombero.estado === 'Regular'"
        class="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">Regular</span>
    </div>

    <div class="grid grid-cols-2 gap-2 mb-3">
      <div class="flex items-center gap-1">
        <ClockIcon class="w-4 h-4 text-gray-400" />
        <div class="flex flex-col">
          <span class="text-xs text-gray-500">Trabajadas</span>
          <span class="text-sm font-bold text-gray-900">{{ bombero.horasTrabajadas }}h</span>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <div class="flex flex-col">
          <span class="text-xs text-gray-500">Requeridas</span>
          <span class="text-sm font-bold text-gray-900">{{ bombero.horasRequeridas }}h</span>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mb-2">
      <span class="text-xs text-gray-600">Progreso</span>
      <span :class="{
        'text-red-500': bombero.estado === 'Crítico',
        'text-green-500': bombero.estado === 'Óptimo',
        'text-yellow-500': bombero.estado === 'Regular',
        'font-bold': true,
        'text-xs': true
      }">{{ bombero.porcentaje }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-1.5 mb-2">
      <div :class="{
        'bg-red-500': bombero.estado === 'Crítico',
        'bg-green-500': bombero.estado === 'Óptimo',
        'bg-yellow-400': bombero.estado === 'Regular',
        'h-1.5': true,
        'rounded-full': true
      }" :style="{ width: bombero.porcentaje + '%' }"></div>
    </div>
    <div :class="{
      'text-red-500': bombero.estado === 'Crítico',
      'text-green-500': bombero.estado === 'Óptimo',
      'text-yellow-500': bombero.estado === 'Regular',
      'text-xs': true,
      'font-semibold': true
    }">{{ bombero.faltantes }}h faltantes</div>
  </div>

  <!-- Tablet: Tarjeta horizontal -->
  <div class="hidden sm:block lg:hidden w-full bg-white rounded-2xl shadow-xl p-4 mb-4">
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0">
        <span class="bg-gray-100 p-2 rounded-full">
          <UserIcon class="w-5 h-5 text-gray-500" />
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-2">
          <div class="flex flex-col min-w-0">
            <span class="text-base font-semibold text-gray-900 truncate">{{ bombero.nombre }}</span>
            <span class="text-sm text-gray-500">{{ bombero.rango }}</span>
          </div>
          <span v-if="bombero.estado === 'Crítico'"
            class="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">Crítico</span>
          <span v-else-if="bombero.estado === 'Óptimo'"
            class="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">Óptimo</span>
          <span v-else-if="bombero.estado === 'Regular'"
            class="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">Regular</span>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-3">
          <div class="flex items-center gap-2">
            <ClockIcon class="w-4 h-4 text-gray-400" />
            <div>
              <span class="text-xs text-gray-500">Trabajadas</span>
              <div class="text-sm font-bold text-gray-900">{{ bombero.horasTrabajadas }}h</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div>
              <span class="text-xs text-gray-500">Requeridas</span>
              <div class="text-sm font-bold text-gray-900">{{ bombero.horasRequeridas }}h</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-600">Progreso</span>
          <span :class="{
            'text-red-500': bombero.estado === 'Crítico',
            'text-green-500': bombero.estado === 'Óptimo',
            'text-yellow-500': bombero.estado === 'Regular',
            'font-bold': true,
            'text-sm': true
          }">{{ bombero.porcentaje }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div :class="{
            'bg-red-500': bombero.estado === 'Crítico',
            'bg-green-500': bombero.estado === 'Óptimo',
            'bg-yellow-400': bombero.estado === 'Regular',
            'h-2': true,
            'rounded-full': true
          }" :style="{ width: bombero.porcentaje + '%' }"></div>
        </div>
        <div :class="{
          'text-red-500': bombero.estado === 'Crítico',
          'text-green-500': bombero.estado === 'Óptimo',
          'text-yellow-500': bombero.estado === 'Regular',
          'text-sm': true,
          'font-semibold': true
        }">{{ bombero.faltantes }}h faltantes</div>
      </div>
    </div>
  </div>

  <!-- Desktop: Tarjeta completa original -->
  <div class="hidden lg:block max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 mb-6">
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
      <span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ bombero.rango
        }}</span>
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