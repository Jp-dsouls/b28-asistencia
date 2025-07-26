<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShieldCheckIcon, UserIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { UsersIcon } from '@heroicons/vue/24/solid'
import StatCard from '../components/StatCard.vue'
import BomberoCard from '../components/BomberoCard.vue'
import LogoHeader from '../components/LogoHeader.vue'

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
const mostrarDropdown = ref(false)
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

function cerrarDropdown() {
  mostrarDropdown.value = false
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
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">

      <div class="flex flex-col bg-white border-0 rounded-2xl shadow-xl dark:bg-gray-50">
        <div
          class="flex flex-col sm:flex-row p-4 leading-normal items-start sm:items-center gap-3 sm:gap-2 justify-between">
          <LogoHeader size="md" :show-text="true" />
          <div class="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button @click="abrirModalBusqueda"
              class="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 sm:px-4 bg-white hover:bg-gray-100 transition text-gray-700 shadow-sm">
              <MagnifyingGlassIcon class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button @click="$router.push('/login-usuario')"
              class="flex items-center gap-2 border border-blue-500 rounded-xl px-3 py-2 sm:px-4 bg-blue-500 hover:bg-blue-600 transition text-white shadow-sm">
              <UserIcon class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
      <br>

      <!-- Modal de búsqueda de bombero -->
      <div v-if="mostrarModalBusqueda" class="fixed inset-0 z-50 flex items-center justify-center p-4"
        style="background: rgba(0, 0, 0, 0.95);">
        <div :class="[
          'bg-white rounded-xl lg:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-lg lg:max-w-xl p-4 sm:p-6 relative transition-all duration-200',
          mostrarModalDetalle ? 'opacity-40 blur-sm pointer-events-none select-none' : ''
        ]">
          <button @click="cerrarModalBusqueda"
            class="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 text-lg sm:text-xl">&times;</button>
          <div class="flex items-center gap-2 mb-3">
            <MagnifyingGlassIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <span class="font-semibold text-base sm:text-lg">Buscar Bombero</span>
          </div>
          <p class="text-gray-500 text-xs sm:text-sm mb-3">Ingresa el nombre, rango o departamento del bombero que
            deseas encontrar
          </p>
          <div class="flex items-center border rounded-lg sm:rounded-xl px-2 py-2 mb-3 bg-gray-50">
            <MagnifyingGlassIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input v-model="busqueda" type="text" placeholder="Buscar..."
              class="flex-1 bg-transparent outline-none px-2 py-1 border-0 focus:ring-0 shadow-none text-sm sm:text-base" />
            <button v-if="busqueda" @click="busqueda = ''" class="text-gray-400 hover:text-gray-700">&times;</button>
          </div>
          <div v-if="busqueda && resultadosBusqueda.length === 0" class="text-gray-500 text-xs sm:text-sm mt-2">No se
            encontraron
            resultados.</div>
          <div v-if="busqueda && resultadosBusqueda.length > 0" class="mt-3">
            <div class="text-xs text-gray-500 mb-2">{{ resultadosBusqueda.length }} resultado{{
              resultadosBusqueda.length > 1 ? 's' : '' }} encontrado{{ resultadosBusqueda.length > 1 ? 's' : '' }}:
            </div>
            <div v-for="b in resultadosBusqueda" :key="b.id" @click="seleccionarBombero(b)"
              class="flex items-center gap-2 sm:gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-2 cursor-pointer border border-gray-200">
              <span class="bg-gray-100 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                <UserIcon class="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />
              </span>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 text-sm sm:text-base truncate">{{ b.nombre }}</div>
                <div class="text-xs text-gray-500">{{ b.rango }}</div>
                <div class="text-xs text-gray-500">{{ b.horasTrabajadas }}h / {{ b.horasRequeridas }}h ({{ b.porcentaje
                  }}%)</div>
              </div>
              <span v-if="b.estado === 'Crítico'"
                class="bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full flex-shrink-0">Crítico</span>
              <span v-else-if="b.estado === 'Óptimo'"
                class="bg-green-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full flex-shrink-0">Óptimo</span>
              <span v-else-if="b.estado === 'Regular'"
                class="bg-yellow-400 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full flex-shrink-0">Regular</span>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button @click="cerrarModalBusqueda"
              class="px-3 py-2 sm:px-4 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm sm:text-base">Cerrar</button>
          </div>
        </div>
      </div>

      <!-- Modal de detalle de bombero -->
      <div v-if="mostrarModalDetalle && bomberoSeleccionado"
        class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background: rgba(0, 0, 0, 0.10);">
        <div
          class="bg-white rounded-xl lg:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 relative">
          <button @click="cerrarModalDetalle"
            class="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 text-lg sm:text-xl">&times;</button>
          <div class="flex items-center gap-2 mb-3">
            <UserIcon class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            <span class="font-semibold text-base sm:text-lg">Información del Bombero</span>
          </div>
          <div class="font-bold text-base sm:text-lg text-gray-900 mb-2">{{ bomberoSeleccionado.nombre }}</div>
          <div class="flex items-center gap-2 mb-3">
            <span class="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{{
              bomberoSeleccionado.grupo }}</span>
            <span class="text-xs sm:text-sm text-gray-500">{{ bomberoSeleccionado.rango }}</span>
            <span v-if="bomberoSeleccionado.estado === 'Crítico'"
              class="bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full ml-auto">Crítico</span>
            <span v-else-if="bomberoSeleccionado.estado === 'Óptimo'"
              class="bg-green-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full ml-auto">Óptimo</span>
            <span v-else-if="bomberoSeleccionado.estado === 'Regular'"
              class="bg-yellow-400 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full ml-auto">Regular</span>
          </div>
          <div class="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div class="flex-1 bg-gray-50 rounded-lg sm:rounded-xl p-3 flex flex-col items-center">
              <ClockIcon class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mb-1" />
              <div class="text-xs text-gray-500 text-center">Horas Trabajadas</div>
              <div class="text-lg sm:text-xl font-bold text-gray-900">{{ bomberoSeleccionado.horasTrabajadas }}h</div>
            </div>
            <div class="flex-1 bg-gray-50 rounded-lg sm:rounded-xl p-3 flex flex-col items-center">
              <div class="text-xs text-gray-500 mb-1 text-center">Horas Requeridas (trimestral)</div>
              <div class="text-lg sm:text-xl font-bold text-gray-900">{{ bomberoSeleccionado.horasRequeridas }}h</div>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-gray-600 text-xs sm:text-sm">Progreso</span>
            <span :class="{
              'text-red-500': bomberoSeleccionado.estado === 'Crítico',
              'text-green-500': bomberoSeleccionado.estado === 'Óptimo',
              'text-yellow-500': bomberoSeleccionado.estado === 'Regular',
              'font-bold': true,
              'text-xs sm:text-sm': true
            }">{{ bomberoSeleccionado.porcentaje }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 mt-1 mb-2">
            <div :class="{
              'bg-red-500': bomberoSeleccionado.estado === 'Crítico',
              'bg-green-500': bomberoSeleccionado.estado === 'Óptimo',
              'bg-yellow-400': bomberoSeleccionado.estado === 'Regular',
              'h-2 sm:h-2.5': true,
              'rounded-full': true
            }" :style="{ width: bomberoSeleccionado.porcentaje + '%' }"></div>
          </div>
          <div :class="{
            'text-red-500': bomberoSeleccionado.estado === 'Crítico',
            'text-green-500': bomberoSeleccionado.estado === 'Óptimo',
            'text-yellow-500': bomberoSeleccionado.estado === 'Regular',
            'text-xs sm:text-sm': true,
            'font-semibold': true,
            'mb-4': true
          }">{{ bomberoSeleccionado.faltantes }}h faltantes para completar</div>
          <div class="flex justify-end mt-3">
            <button @click="cerrarModalDetalle"
              class="px-3 py-2 sm:px-4 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm sm:text-base">Cerrar</button>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard title="Total Bomberos activos" :value="totalBomberos" :icon="UsersIcon" />
        <StatCard title="Asistencia optima" :value="totalOptimo" bgColor="bg-green-500" />
        <StatCard title="Asistencia regular" :value="totalRegular" bgColor="bg-yellow-500" />
        <StatCard title="Asistencia crítica" :value="totalCritico" bgColor="bg-red-500" />
      </div>
      <br>


      <!-- Tabs para mobile -->
      <div class="sm:hidden">
        <div class="relative">
          <button @click="mostrarDropdown = !mostrarDropdown"
            class="w-full bg-white border border-gray-200 text-gray-500 text-sm rounded-xl shadow-xl p-3 font-medium uppercase flex items-center justify-between">
            <span>{{tabs.find(t => t.key === activeTab)?.label}}</span>
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mostrarDropdown }" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div v-if="mostrarDropdown"
            class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-10">
            <div v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key; mostrarDropdown = false" :class="[
              'p-3 text-sm font-medium uppercase cursor-pointer transition',
              tab.key === 'todos' ? 'rounded-t-xl' : '',
              tab.key === 'critico' ? 'rounded-b-xl' : '',
              activeTab === tab.key
                ? 'bg-gray-100 text-gray-900 font-bold'
                : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            ]">
              {{ tab.label }}
            </div>
          </div>
        </div>

        <!-- Overlay para cerrar dropdown al hacer clic fuera -->
        <div v-if="mostrarDropdown" @click="cerrarDropdown" class="fixed inset-0 z-5 bg-transparent"></div>
      </div>

      <!-- Tabs para tablet y desktop -->
      <ul
        class="hidden sm:flex text-sm font-medium text-center text-gray-500 rounded-xl lg:rounded-2xl shadow-xl dark:divide-gray-700 dark:text-gray-400 bg-white border border-gray-200"
        style="overflow: hidden;">
        <li v-for="tab in tabs" :key="tab.key" class="w-full">
          <button @click="activeTab = tab.key" :class="[
            'inline-block w-full p-3 lg:p-4 uppercase transition text-xs lg:text-sm',
            tab.key === 'todos'
              ? 'rounded-s-xl lg:rounded-s-2xl'
              : tab.key === 'critico'
                ? 'rounded-e-xl lg:rounded-e-2xl'
                : '',
            activeTab === tab.key
              ? 'bg-gray-100 text-gray-900 font-bold'
              : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          ]" :aria-current="activeTab === tab.key ? 'page' : undefined" tabindex="0">
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <br />

      <!-- Contenido de los tabs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" v-if="activeTab === 'todos'">
        <template v-for="b in bomberos" :key="b.id">
          <BomberoCard :bombero="b" />
        </template>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        v-else-if="activeTab === 'optimo'">
        <template v-for="b in bomberosOptimo" :key="b.id">
          <BomberoCard :bombero="b" />
        </template>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        v-else-if="activeTab === 'regular'">
        <template v-for="b in bomberosRegular" :key="b.id">
          <BomberoCard :bombero="b" />
        </template>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        v-else-if="activeTab === 'critico'">
        <template v-for="b in bomberosCritico" :key="b.id">
          <BomberoCard :bombero="b" />
        </template>
      </div>

    </main>
  </div>
</template>

<style scoped></style>
