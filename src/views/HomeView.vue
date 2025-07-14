<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShieldCheckIcon, UserIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
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

const activeTab = ref('todos')

const mostrarModalBusqueda = ref(false)
const mostrarModalDetalle = ref(false)
const busqueda = ref('')
const bomberoSeleccionado = ref<Bombero | null>(null)

const bomberos: Bombero[] = [
  {
    id: 1,
    nombre: 'Jorge Daniel Aguilar Díaz',
    rango: 'Subteniente',
    departamento: 'Rescate',
    estado: 'Crítico',
    horasTrabajadas: 33,
    horasRequeridas: 120,
    porcentaje: 27.5,
    faltantes: 87,
    grupo: 'Oficiales',
    colorEstado: 'red',
  },
  {
    id: 2,
    nombre: 'Laura Fernández Castro',
    rango: 'Teniente',
    departamento: 'Emergencias',
    estado: 'Óptimo',
    horasTrabajadas: 100,
    horasRequeridas: 100,
    porcentaje: 100,
    faltantes: 0,
    grupo: 'Oficiales',
    colorEstado: 'green',
  },
  {
    id: 3,
    nombre: 'Ana García Morales',
    rango: 'Teniente',
    departamento: 'Emergencias',
    estado: 'Regular',
    horasTrabajadas: 85,
    horasRequeridas: 100,
    porcentaje: 85,
    faltantes: 15,
    grupo: 'Oficiales',
    colorEstado: 'yellow',
  },
]

const resultadosBusqueda = computed(() => {
  if (!busqueda.value) return []
  return bomberos.filter((b: Bombero) =>
    b.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
    b.rango.toLowerCase().includes(busqueda.value.toLowerCase()) ||
    b.departamento.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function abrirModalBusqueda() {
  mostrarModalBusqueda.value = true
  busqueda.value = ''
  bomberoSeleccionado.value = null
}
function cerrarModalBusqueda() {
  mostrarModalBusqueda.value = false
  mostrarModalDetalle.value = false // Cierra también el detalle si estuviera abierto
}
function seleccionarBombero(b: Bombero) {
  bomberoSeleccionado.value = b
  mostrarModalDetalle.value = true
}
function cerrarModalDetalle() {
  mostrarModalDetalle.value = false
  mostrarModalBusqueda.value = false // Cierra también la búsqueda si estuviera abierta
}

const tabs = [
  { key: 'todos', label: 'todos' },
  { key: 'optimo', label: 'optimo' },
  { key: 'regular', label: 'regular' },
  { key: 'critico', label: 'critico' }
]

const totalBomberos = computed(() => bomberos.length)
const totalOptimo = computed(() => bomberos.filter(b => b.estado === 'Óptimo').length)
const totalRegular = computed(() => bomberos.filter(b => b.estado === 'Regular').length)
const totalCritico = computed(() => bomberos.filter(b => b.estado === 'Crítico').length)

const bomberosOptimo = computed(() => bomberos.filter(b => b.estado === 'Óptimo'))
const bomberosRegular = computed(() => bomberos.filter(b => b.estado === 'Regular'))
const bomberosCritico = computed(() => bomberos.filter(b => b.estado === 'Crítico'))
</script>

<template>
  <div class="min-h-screen bg-gray-200">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

      <div class="flex flex-col bg-white border-0 rounded-2xl shadow-xl dark:bg-gray-50">
        <div class="flex p-4 leading-normal items-center gap-2 justify-between">
          <div class="flex items-center gap-2">
            <ShieldCheckIcon class="mt-0 w-12 h-12 text-red-500" />
            <h5 class="text-2xl font-bold tracking-tight text-gray-900">
              Sistema de Control de Horas - Bomberos
            </h5>
          </div>
          <div class="flex gap-2">
            <button @click="abrirModalBusqueda" class="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 bg-white hover:bg-gray-100 transition text-gray-700 shadow-sm">
              <MagnifyingGlassIcon class="w-5 h-5" />
              Buscar Bombero
            </button>
            <button @click="$router.push('/login-usuario')" class="flex items-center gap-2 border border-blue-500 rounded-xl px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white shadow-sm">
              <UserIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <br>

      <!-- Modal de búsqueda de bombero -->
      <div
        v-if="mostrarModalBusqueda"
        class="fixed inset-0 z-50 flex items-center justify-center"
        style="background: rgba(0, 0, 0, 0.95);"
      >
        <div
          :class="[
            'bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative transition-all duration-200',
            mostrarModalDetalle ? 'opacity-40 blur-sm pointer-events-none select-none' : ''
          ]"
        >
          <button @click="cerrarModalBusqueda" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
          <div class="flex items-center gap-2 mb-2">
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-500" />
            <span class="font-semibold text-lg">Buscar Bombero</span>
          </div>
          <p class="text-gray-500 text-sm mb-2">Ingresa el nombre, rango o departamento del bombero que deseas encontrar</p>
          <div class="flex items-center border rounded-xl px-2 py-1 mb-2 bg-gray-50">
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
            <input v-model="busqueda" type="text" placeholder="Buscar..." class="flex-1 bg-transparent outline-none px-2 py-1 border-0 focus:ring-0 shadow-none" />
            <button v-if="busqueda" @click="busqueda = ''" class="text-gray-400 hover:text-gray-700">&times;</button>
          </div>
          <div v-if="busqueda && resultadosBusqueda.length === 0" class="text-gray-500 text-sm mt-2">No se encontraron resultados.</div>
          <div v-if="busqueda && resultadosBusqueda.length > 0" class="mt-2">
            <div class="text-xs text-gray-500 mb-1">{{ resultadosBusqueda.length }} resultado{{ resultadosBusqueda.length > 1 ? 's' : '' }} encontrado{{ resultadosBusqueda.length > 1 ? 's' : '' }}:</div>
            <div v-for="b in resultadosBusqueda" :key="b.id" @click="seleccionarBombero(b)" class="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-3 mb-2 cursor-pointer border border-gray-200">
              <span class="bg-gray-100 p-2 rounded-full"><UserIcon class="w-6 h-6 text-gray-500" /></span>
              <div class="flex-1">
                <div class="font-semibold text-gray-900">{{ b.nombre }}</div>
                <div class="text-xs text-gray-500">{{ b.rango }} - {{ b.departamento }}</div>
                <div class="text-xs text-gray-500">{{ b.horasTrabajadas }}h / {{ b.horasRequeridas }}h ({{ b.porcentaje }}%)</div>
              </div>
              <span v-if="b.estado === 'Crítico'" class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Crítico</span>
              <span v-else-if="b.estado === 'Óptimo'" class="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Óptimo</span>
              <span v-else-if="b.estado === 'Regular'" class="bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full">Regular</span>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button @click="cerrarModalBusqueda" class="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700">Cerrar</button>
          </div>
        </div>
      </div>

      <!-- Modal de detalle de bombero -->
      <div
        v-if="mostrarModalDetalle && bomberoSeleccionado"
        class="fixed inset-0 z-50 flex items-center justify-center"
        style="background: rgba(0, 0, 0, 0.10);"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
          <button @click="cerrarModalDetalle" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
          <div class="flex items-center gap-2 mb-2">
            <UserIcon class="w-6 h-6 text-gray-500" />
            <span class="font-semibold text-lg">Información del Bombero</span>
          </div>
          <div class="font-bold text-lg text-gray-900 mb-1">{{ bomberoSeleccionado.nombre }}</div>
          <div class="flex items-center gap-2 mb-1">
            <span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ bomberoSeleccionado.grupo }}</span>
            <span class="text-sm text-gray-500">{{ bomberoSeleccionado.rango }} - {{ bomberoSeleccionado.departamento }}</span>
            <span v-if="bomberoSeleccionado.estado === 'Crítico'" class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-auto">Crítico</span>
            <span v-else-if="bomberoSeleccionado.estado === 'Óptimo'" class="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-auto">Óptimo</span>
            <span v-else-if="bomberoSeleccionado.estado === 'Regular'" class="bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full ml-auto">Regular</span>
          </div>
          <div class="mt-4 flex gap-4">
            <div class="flex-1 bg-gray-50 rounded-xl p-3 flex flex-col items-center">
              <ClockIcon class="w-5 h-5 text-gray-400 mb-1" />
              <div class="text-xs text-gray-500">Horas Trabajadas</div>
              <div class="text-xl font-bold text-gray-900">{{ bomberoSeleccionado.horasTrabajadas }}h</div>
            </div>
            <div class="flex-1 bg-gray-50 rounded-xl p-3 flex flex-col items-center">
              <div class="text-xs text-gray-500 mb-1">Horas Requeridas (trimestral)</div>
              <div class="text-xl font-bold text-gray-900">{{ bomberoSeleccionado.horasRequeridas }}h</div>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-gray-600 text-sm">Progreso</span>
            <span :class="{
              'text-red-500': bomberoSeleccionado.estado === 'Crítico',
              'text-green-500': bomberoSeleccionado.estado === 'Óptimo',
              'text-yellow-500': bomberoSeleccionado.estado === 'Regular',
              'font-bold': true,
              'text-sm': true
            }">{{ bomberoSeleccionado.porcentaje }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-1">
            <div :class="{
              'bg-red-500': bomberoSeleccionado.estado === 'Crítico',
              'bg-green-500': bomberoSeleccionado.estado === 'Óptimo',
              'bg-yellow-400': bomberoSeleccionado.estado === 'Regular',
              'h-2.5': true,
              'rounded-full': true
            }" :style="{ width: bomberoSeleccionado.porcentaje + '%' }"></div>
          </div>
          <div :class="{
            'text-red-500': bomberoSeleccionado.estado === 'Crítico',
            'text-green-500': bomberoSeleccionado.estado === 'Óptimo',
            'text-yellow-500': bomberoSeleccionado.estado === 'Regular',
            'text-sm': true,
            'font-semibold': true,
            'mb-4': true
          }">{{ bomberoSeleccionado.faltantes }}h faltantes para completar</div>
          <div class="flex justify-end mt-2">
            <button @click="cerrarModalDetalle" class="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700">Cerrar</button>
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-4">
        <div
          class="flex flex-col bg-white border border-gray-200 h-fit rounded-2xl shadow-xl dark:bg-gray-50 w-full max-w-sm p-4">
          <div class="flex leading-normal items-center gap-2">
            <UsersIcon class="w-6 h-6" />
            <div class="flex flex-col">
              <p class="font-normal text-gray-700 dark:text-gray-400">Total Bomberos</p>
              <h5 class="text-2xl font-bold tracking-tight text-gray-900">{{ totalBomberos }}</h5>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col bg-white border border-gray-200 h-fit rounded-2xl shadow-xl dark:bg-gray-50 w-full max-w-sm p-4">
          <div class="flex leading-normal items-center gap-2">
            <span class="w-12 h-12 rounded-full bg-green-500 inline-block"></span>
            <div class="flex flex-col">
              <p class="font-normal text-gray-700 dark:text-gray-400">Estado óptimo</p>
              <h5 class="text-2xl font-bold tracking-tight text-gray-900">{{ totalOptimo }}</h5>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col bg-white border border-gray-200 h-fit rounded-2xl shadow-xl dark:bg-gray-50 w-full max-w-sm p-4">
          <div class="flex leading-normal items-center gap-2">
            <span class="w-12 h-12 rounded-full bg-yellow-500 inline-block"></span>
            <div class="flex flex-col">
              <p class="font-normal text-gray-700 dark:text-gray-400">Estado regular</p>
              <h5 class="text-2xl font-bold tracking-tight text-gray-900">{{ totalRegular }}</h5>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col bg-white border border-gray-200 h-fit rounded-2xl shadow-xl dark:bg-gray-50 w-full max-w-sm p-4">
          <div class="flex leading-normal items-center gap-2">
            <span class="w-12 h-12 rounded-full bg-red-500 inline-block"></span>
            <div class="flex flex-col">
              <p class="font-normal text-gray-700 dark:text-gray-400">Estado crítico</p>
              <h5 class="text-2xl font-bold tracking-tight text-gray-900">{{ totalCritico }}</h5>
            </div>
          </div>
        </div>
      </div>
      <br>


      <!-- Tabs para mobile -->
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Selecciona una opción</label>
        <select
          id="tabs"
          v-model="activeTab"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="tab in tabs" :key="tab.key" :value="tab.key">{{ tab.label }}</option>
        </select>
      </div>

      <!-- Tabs para desktop -->
      <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-2xl shadow-xl sm:flex dark:divide-gray-700 dark:text-gray-400 bg-white border border-gray-200" style="overflow: hidden;">
        <li v-for="tab in tabs" :key="tab.key" class="w-full">
          <button
            @click="activeTab = tab.key"
            :class="[
              'inline-block w-full p-4 uppercase transition',
              tab.key === 'todos'
                ? 'rounded-s-lg'
                : tab.key === 'critico'
                  ? 'rounded-e-lg'
                  : '',
              activeTab === tab.key
                ? 'bg-gray-100 text-gray-900 font-bold'
                : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            ]"
            :aria-current="activeTab === tab.key ? 'page' : undefined"
            tabindex="0"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <br />

      <!-- Contenido de los tabs -->
      <div class="flex justify-between gap-4" v-if="activeTab === 'todos'">
        <template v-for="b in bomberos" :key="b.id">
          <div class="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="bg-gray-100 p-2 rounded-full">
                  <UserIcon class="w-6 h-6 text-gray-500" />
                </span>
                <span class="text-lg font-semibold text-gray-900">{{ b.nombre }}</span>
              </div>
              <span v-if="b.estado === 'Crítico'" class="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Crítico</span>
              <span v-else-if="b.estado === 'Óptimo'" class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Óptimo</span>
              <span v-else-if="b.estado === 'Regular'" class="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">Regular</span>
            </div>
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ b.grupo }}</span>
              <span class="text-sm text-gray-500">{{ b.rango }} - {{ b.departamento }}</span>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <ClockIcon class="w-5 h-5 text-gray-400" />
              <span class="text-gray-600 text-sm">Horas trabajadas:</span>
              <span class="font-bold text-gray-900 ml-1">{{ b.horasTrabajadas }}h</span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-gray-600 text-sm">Horas requeridas (trimestral):</span>
              <span class="font-bold text-gray-900 ml-1">{{ b.horasRequeridas }}h</span>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-gray-600 text-sm">Progreso</span>
              <span :class="{
                'text-red-500': b.estado === 'Crítico',
                'text-green-500': b.estado === 'Óptimo',
                'text-yellow-500': b.estado === 'Regular',
                'font-bold': true,
                'text-sm': true
              }">{{ b.porcentaje }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-1">
              <div :class="{
                'bg-red-500': b.estado === 'Crítico',
                'bg-green-500': b.estado === 'Óptimo',
                'bg-yellow-400': b.estado === 'Regular',
                'h-2.5': true,
                'rounded-full': true
              }" :style="{ width: b.porcentaje + '%' }"></div>
            </div>
            <div :class="{
              'text-red-500': b.estado === 'Crítico',
              'text-green-500': b.estado === 'Óptimo',
              'text-yellow-500': b.estado === 'Regular',
              'text-sm': true,
              'font-semibold': true,
              'mb-4': true
            }">{{ b.faltantes }}h faltantes</div>
          </div>
        </template>
      </div>
      <div class="inline-flex gap-4" v-else-if="activeTab === 'optimo'">
        <template v-for="b in bomberosOptimo" :key="b.id">
          <div class="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="bg-gray-100 p-2 rounded-full">
                  <UserIcon class="w-6 h-6 text-gray-500" />
                </span>
                <span class="text-lg font-semibold text-gray-900">{{ b.nombre }}</span>
              </div>
              <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Óptimo</span>
            </div>
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ b.grupo }}</span>
              <span class="text-sm text-gray-500">{{ b.rango }} - {{ b.departamento }}</span>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <ClockIcon class="w-5 h-5 text-gray-400" />
              <span class="text-gray-600 text-sm">Horas trabajadas:</span>
              <span class="font-bold text-gray-900 ml-1">{{ b.horasTrabajadas }}h</span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-gray-600 text-sm">Horas requeridas (trimestral):</span>
              <span class="font-bold text-gray-900 ml-1">{{ b.horasRequeridas }}h</span>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-gray-600 text-sm">Progreso</span>
              <span class="text-green-500 font-bold text-sm">{{ b.porcentaje }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-1">
              <div class="bg-green-500 h-2.5 rounded-full" :style="{ width: b.porcentaje + '%' }"></div>
            </div>
            <div class="text-green-500 text-sm font-semibold mb-4">{{ b.faltantes }}h faltantes</div>
          </div>
        </template>
      </div>
      <div class="inline-flex gap-4" v-else-if="activeTab === 'regular'">
        <template v-for="b in bomberosRegular" :key="b.id">
          <div class="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="bg-gray-100 p-2 rounded-full">
                  <UserIcon class="w-6 h-6 text-gray-500" />
                </span>
                <span class="text-lg font-semibold text-gray-900">{{ b.nombre }}</span>
              </div>
              <span class="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">Regular</span>
            </div>
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ b.grupo }}</span>
              <span class="text-sm text-gray-500">{{ b.rango }} - {{ b.departamento }}</span>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <ClockIcon class="w-5 h-5 text-gray-400" />
              <span class="text-gray-600 text-sm">Horas trabajadas:</span>
              <span class="font-bold text-gray-900 ml-1">{{ b.horasTrabajadas }}h</span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-gray-600 text-sm">Horas requeridas (trimestral):</span>
              <span class="font-bold text-gray-900 ml-1">{{ b.horasRequeridas }}h</span>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-gray-600 text-sm">Progreso</span>
              <span class="text-yellow-500 font-bold text-sm">{{ b.porcentaje }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-1">
              <div class="bg-yellow-400 h-2.5 rounded-full" :style="{ width: b.porcentaje + '%' }"></div>
            </div>
            <div class="text-red-500 text-sm font-semibold mb-4">{{ b.faltantes }}h faltantes</div>
          </div>
        </template>
      </div>
      <div class="inline-flex gap-4" v-else-if="activeTab === 'critico'">
        <template v-for="b in bomberosCritico" :key="b.id">
          <div class="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="bg-gray-100 p-2 rounded-full">
                  <UserIcon class="w-6 h-6 text-gray-500" />
                </span>
                <span class="text-lg font-semibold text-gray-900">{{ b.nombre }}</span>
              </div>
              <span class="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Crítico</span>
            </div>
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{ b.grupo }}</span>
              <span class="text-sm text-gray-500">{{ b.rango }} - {{ b.departamento }}</span>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <ClockIcon class="w-5 h-5 text-gray-400" />
              <span class="text-gray-600 text-sm">Horas trabajadas:</span>
              <span class="font-bold text-gray-900 ml-1">{{ b.horasTrabajadas }}h</span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-gray-600 text-sm">Horas requeridas (trimestral):</span>
              <span class="font-bold text-gray-900 ml-1">{{ b.horasRequeridas }}h</span>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-gray-600 text-sm">Progreso</span>
              <span class="text-red-500 font-bold text-sm">{{ b.porcentaje }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1 mb-1">
              <div class="bg-red-500 h-2.5 rounded-full" :style="{ width: b.porcentaje + '%' }"></div>
            </div>
            <div class="text-red-500 text-sm font-semibold mb-4">{{ b.faltantes }}h faltantes</div>
          </div>
        </template>
      </div>

  </main>
  </div>
</template>

<style scoped>
</style>
