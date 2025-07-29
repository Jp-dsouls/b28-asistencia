<template>
  <div class="bg-gray-100 min-h-screen p-8">
    <button
      class="absolute top-6 right-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      @click="logout"
    >
      <ArrowRightOnRectangleIcon class="w-6 h-6" />
    </button>
    <h2 class="text-2xl font-bold mb-4">Bienvenido, administrador</h2>

    <!-- Eliminar la tabla de Usuarios Registrados -->

    <!-- Card flotante para horas requeridas por Q con select de rango -->
  <div class="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 mt-8">
    <h3 class="text-xl font-bold mb-6">Horas requeridas por trimestre (Q)</h3>
    <div class="mb-4 flex items-center gap-4">
      <label for="rango-select" class="font-semibold">Rango:</label>
      <select id="rango-select" v-model="rangoSeleccionado" class="border rounded px-2 py-1">
        <option v-for="r in rangos" :key="r" :value="r">{{ r }}</option>
      </select>
      <label for="anio-select" class="font-semibold">Año:</label>
      <select id="anio-select" v-model="anioSeleccionado" class="border rounded px-2 py-1 w-28">
        <option v-for="a in anios" :key="a" :value="a">{{ a }}</option>
      </select>
      <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" @click="guardarCambiosQ">Guardar cambios</button>
    </div>
    <table class="w-full text-left">
          <thead>
            <tr>
          <th class="py-2 px-4">Trimestre</th>
          <th class="py-2 px-4">Meses</th>
          <th class="py-2 px-4">Horas requeridas</th>
            </tr>
          </thead>
          <tbody>
        <tr v-for="(q, idx) in horasRequeridasPorQ" :key="q.q" :class="idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'">
          <td class="py-2 px-4 font-semibold">{{ q.q }}</td>
          <td class="py-2 px-4">{{ q.meses.join(', ') }}</td>
              <td class="py-2 px-4">
            <input
              type="number"
              min="0"
              class="border rounded px-2 py-1 w-24"
              v-model.number="horasEditablesQPorRango[idx]"
            />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

  <!-- Tabla resumen de horas por usuario, meses y Q intercalados -->
<div class="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 mt-8">
  <div class="flex justify-between items-center mb-6">
    <h3 class="text-xl font-bold">Resumen de horas por usuario (anual y trimestral)</h3>
    <div class="flex gap-2">
      <button v-if="cambiosPendientes" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" @click="guardarCambiosMeses">
        Guardar cambios
      </button>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="descargarExcel">
        Descargar Reporte
      </button>
      <button class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700" @click="descargarHTML">
        Descargar HTML
      </button>
    </div>
  </div>
  <table class="w-full text-left min-w-[1400px]">
    <thead>
      <tr>
        <th class="py-2 px-2 text-left">CÓDIGO</th>
        <th class="py-2 px-2 text-left">GRADO</th>
        <th class="py-2 px-2 text-left">NOMBRE</th>
        <th class="py-2 px-2 text-left">ENE</th>
        <th class="py-2 px-2 text-left">FEB</th>
        <th class="py-2 px-2 text-left">MAR</th>
        <th class="py-2 px-2 text-left">Q1</th>
        <th class="py-2 px-2 text-left">ABR</th>
        <th class="py-2 px-2 text-left">MAY</th>
        <th class="py-2 px-2 text-left">JUN</th>
        <th class="py-2 px-2 text-left">Q2</th>
        <th class="py-2 px-2 text-left">JUL</th>
        <th class="py-2 px-2 text-left">AGO</th>
        <th class="py-2 px-2 text-left">SEP</th>
        <th class="py-2 px-2 text-left">Q3</th>
        <th class="py-2 px-2 text-left">OCT</th>
        <th class="py-2 px-2 text-left">NOV</th>
        <th class="py-2 px-2 text-left">DIC</th>
        <th class="py-2 px-2 text-left">Q4</th>
        <th class="py-2 px-2 text-left">TOTAL</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, idxU) in usuariosMock" :key="user.codigo">
        <td class="py-1 px-2 text-left">{{ user.codigo }}</td>
        <td class="py-1 px-2 text-left">{{ user.grado }}</td>
        <td class="py-1 px-2 text-left">{{ user.nombre }}</td>
        <!-- ENE, FEB, MAR -->
        <template v-for="idxM in 3">
          <td class="py-1 px-2 text-left" @dblclick="activarEdicion(idxU, idxM-1)">
            <template v-if="celdaEditando && celdaEditando.idxUsuario === idxU && celdaEditando.idxMes === (idxM-1)">
              <input type="number" min="0" class="border rounded px-1 py-0.5 w-16" :value="getHorasMes(user)[idxM-1]"
                @blur="confirmarEdicion(idxU, idxM-1, ($event.target as HTMLInputElement).valueAsNumber)"
                @keyup.enter="confirmarEdicion(idxU, idxM-1, ($event.target as HTMLInputElement).valueAsNumber)"
                autofocus
              />
            </template>
            <template v-else>
              {{ getHorasMes(user)[idxM-1] }}
            </template>
          </td>
        </template>
        <!-- Q1 -->
        <td class="py-1 px-2 font-bold text-left" :class="colorQ(qHoras(user, 0), horasPorQPorRangoPorAnio[anioSeleccionado][user.grado as keyof HorasPorQPorRango]?.[0] ?? 0)">{{ qHoras(user, 0) }}</td>
        <!-- ABR, MAY, JUN -->
        <template v-for="idxM in 3">
          <td class="py-1 px-2 text-left" @dblclick="activarEdicion(idxU, idxM+2)">
            <template v-if="celdaEditando && celdaEditando.idxUsuario === idxU && celdaEditando.idxMes === (idxM+2)">
              <input type="number" min="0" class="border rounded px-1 py-0.5 w-16" :value="getHorasMes(user)[idxM+2]"
                @blur="confirmarEdicion(idxU, idxM+2, ($event.target as HTMLInputElement).valueAsNumber)"
                @keyup.enter="confirmarEdicion(idxU, idxM+2, ($event.target as HTMLInputElement).valueAsNumber)"
                autofocus
              />
            </template>
            <template v-else>
              {{ getHorasMes(user)[idxM+2] }}
            </template>
          </td>
        </template>
        <!-- Q2 -->
        <td class="py-1 px-2 font-bold text-left" :class="colorQ(qHoras(user, 1), horasPorQPorRangoPorAnio[anioSeleccionado][user.grado as keyof HorasPorQPorRango]?.[1] ?? 0)">{{ qHoras(user, 1) }}</td>
        <!-- JUL, AGO, SEP -->
        <template v-for="idxM in 3">
          <td class="py-1 px-2 text-left" @dblclick="activarEdicion(idxU, idxM+5)">
            <template v-if="celdaEditando && celdaEditando.idxUsuario === idxU && celdaEditando.idxMes === (idxM+5)">
              <input type="number" min="0" class="border rounded px-1 py-0.5 w-16" :value="getHorasMes(user)[idxM+5]"
                @blur="confirmarEdicion(idxU, idxM+5, ($event.target as HTMLInputElement).valueAsNumber)"
                @keyup.enter="confirmarEdicion(idxU, idxM+5, ($event.target as HTMLInputElement).valueAsNumber)"
                autofocus
              />
            </template>
            <template v-else>
              {{ getHorasMes(user)[idxM+5] }}
            </template>
          </td>
        </template>
        <!-- Q3 -->
        <td class="py-1 px-2 font-bold text-left" :class="colorQ(qHoras(user, 2), horasPorQPorRangoPorAnio[anioSeleccionado][user.grado as keyof HorasPorQPorRango]?.[2] ?? 0)">{{ qHoras(user, 2) }}</td>
        <!-- OCT, NOV, DIC -->
        <template v-for="idxM in 3">
          <td class="py-1 px-2 text-left" @dblclick="activarEdicion(idxU, idxM+8)">
            <template v-if="celdaEditando && celdaEditando.idxUsuario === idxU && celdaEditando.idxMes === (idxM+8)">
              <input type="number" min="0" class="border rounded px-1 py-0.5 w-16" :value="getHorasMes(user)[idxM+8]"
                @blur="confirmarEdicion(idxU, idxM+8, ($event.target as HTMLInputElement).valueAsNumber)"
                @keyup.enter="confirmarEdicion(idxU, idxM+8, ($event.target as HTMLInputElement).valueAsNumber)"
                autofocus
              />
            </template>
            <template v-else>
              {{ getHorasMes(user)[idxM+8] }}
            </template>
          </td>
        </template>
        <!-- Q4 -->
        <td class="py-1 px-2 font-bold text-left" :class="colorQ(qHoras(user, 3), horasPorQPorRangoPorAnio[anioSeleccionado][user.grado as keyof HorasPorQPorRango]?.[3] ?? 0)">{{ qHoras(user, 3) }}</td>
        <!-- TOTAL -->
        <td class="py-1 px-2 font-bold text-left">{{ totalHoras(user) }}</td>
      </tr>
    </tbody>
  </table>
</div>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'
// Importar xlsx y file-saver
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface SemanaData {
  tiempo: string;
  color: string;
}
interface UsuarioData {
  codigo: string;
  username: string;
  nombre: string;
  role: string;
  progreso: number;
  semanas: SemanaData[];
  registrado: string;
  esperado: string;
  icono: string;
}
const users = ref<UsuarioData[]>([])
const auth = useAuthStore()
const router = useRouter()

// Helper para parsear string "xh ymin" a minutos (accesible en template)
function aMinutos(str: string): number {
  const match = str.match(/(\d+)h\s*(\d+)?min?/);
  if (!match) return 0;
  return parseInt(match[1]) * 60 + (parseInt(match[2]) || 0);
}

function cargarUsuarios() {
  // Meta diaria en minutos
  const metaDiaria = 8 * 60;
  // Helper para calcular color según minutos
  function colorPorMinutos(minutos: number): string {
    const porcentaje = (minutos / metaDiaria) * 100;
    if (porcentaje >= 80) return 'bg-green-500';
    if (porcentaje >= 40) return 'bg-yellow-400';
    return 'bg-red-500';
  }
  // Simulación de usuarios con datos dinámicos y semanas
  const base = [
    {
      codigo: 'U001', username: 'admin', nombre: 'Carlos Ramírez', role: 'admin', progreso: Math.floor(Math.random() * 41) + 60,
      semanas: [
        '9h02min', '8h5min', '8h03min', '9h08min', '3h12min', '6h35min', '1h4min'
      ].map(tiempo => ({
        tiempo: tiempo || '\u00A0',
        color: tiempo ? colorPorMinutos(aMinutos(tiempo)) : 'bg-gray-400 text-white'
      })),
      registrado: '42h 30min', esperado: '40h 0min', icono: 'location',
    },
    {
      codigo: 'U002', username: 'user', nombre: 'Juan Pérez', role: 'bombero', progreso: Math.floor(Math.random() * 41) + 60,
      semanas: [
        '5h0min', '3h0min', '2h0min', '4h18min', '5h0min', '3h0min', '1h0min'
      ].map(tiempo => ({
        tiempo: tiempo || '\u00A0',
        color: tiempo ? colorPorMinutos(aMinutos(tiempo)) : 'bg-gray-400 text-white'
      })),
      registrado: '0h 0min', esperado: '25h 0min', icono: 'location',
    },
    {
      codigo: 'U003', username: 'maria', nombre: 'María López', role: 'bombero', progreso: Math.floor(Math.random() * 41) + 60,
      semanas: [
        '7h22min', '7h18min', '0h19min', '8h0min', '8h0min', '5h0min', '4h0min'
      ].map(tiempo => ({
        tiempo: tiempo || '\u00A0',
        color: tiempo ? colorPorMinutos(aMinutos(tiempo)) : 'bg-gray-400 text-white'
      })),
      registrado: '37h 59min', esperado: '0h 0min', icono: 'location',
    }
  ]
  users.value = base
}

onMounted(() => {
  cargarUsuarios()
})

function logout() {
  auth.logout()
  router.push({ name: 'login-usuario' })
}

// Horas requeridas por trimestre (Q)
const horasRequeridasPorQ = [
  { q: '1Q', meses: ['Enero', 'Febrero', 'Marzo'], horas: 80 },
  { q: '2Q', meses: ['Abril', 'Mayo', 'Junio'], horas: 75 },
  { q: '3Q', meses: ['Julio', 'Agosto', 'Septiembre'], horas: 90 },
  { q: '4Q', meses: ['Octubre', 'Noviembre', 'Diciembre'], horas: 85 }
]

interface UsuarioMock {
  codigo: string;
  grado: string;
  nombre: string;
  horasMes: number[];
}
// Mock de usuarios con horas por mes (12 meses)
const usuariosMock: UsuarioMock[] = [
  { codigo: "A07298", grado: "BRIGADIER", nombre: "ABARCA CHOQUEHUANCA, Uriel Ezequiel", horasMes: [21,0,0,0,0,2,0,0,0,0,0,0] },
  { codigo: "A00945", grado: "BRIGADIER", nombre: "ADIEGO VILLAGRACA, Eduardo Juan Pablo", horasMes: [103,66,14,183,2,8,4,0,26,0,0,0] },
  { codigo: "A01973", grado: "BRIGADIER", nombre: "ARDITTO ALEJOS, Giancarlo", horasMes: [39,159,21,11,0,0,0,0,0,0,0,0] },
  { codigo: "A05131", grado: "BRIGADIER", nombre: "BASTAS SANCHEZ , Luis Estuardo", horasMes: [3,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A01345", grado: "BRIGADIER", nombre: "BECERRA ALVARADO, Arturo Luis", horasMes: [0,0,0,39,0,0,0,0,0,0,0,0] },
  { codigo: "A01404", grado: "BRIGADIER", nombre: "CAIJA MAGUIÑA ZAPATA, José Augusto Martín Mariano", horasMes: [0,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A01834", grado: "BRIGADIER", nombre: "CAINO FLORES, Sergio Efraín", horasMes: [0,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00981", grado: "BRIGADIER", nombre: "ESPINOSA BELAUNDE, Ernesto Martín", horasMes: [16,0,2,18,0,0,0,0,0,0,0,0] },
  { codigo: "A01109", grado: "BRIGADIER", nombre: "GARCIA LANFRANCO, Cesar Fernando", horasMes: [180,163,231,574,236,180,0,0,0,0,0,0] },
  { codigo: "A01009", grado: "BRIGADIER", nombre: "GARCIA MESONES, Martin Wilton", horasMes: [12,13,26,39,9,5,0,0,0,0,0,0] },
  { codigo: "A00984", grado: "BRIGADIER", nombre: "GUERRERO YAÑEZ, Carlos Alberto", horasMes: [122,117,150,389,52,164,0,0,0,0,0,0] },
  { codigo: "A00941", grado: "BRIGADIER", nombre: "MARTIN ALVA, Fanor Eduardo", horasMes: [0,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00982", grado: "BRIGADIER", nombre: "OREJAS VEGA , José Luis", horasMes: [0,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00948", grado: "BRIGADIER", nombre: "RIVARA DAVILA, julio Alberto", horasMes: [12,21,10,43,0,19,0,0,0,0,0,0] },
  { codigo: "A00987", grado: "BRIGADIER", nombre: "SILVA FAEDO, Giorgio", horasMes: [1,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00910", grado: "BRIGADIER", nombre: "TANTAHUATAY PROAÑO, Victor Eduardo", horasMes: [10,9,21,40,36,8,0,0,0,0,0,0] },
  { codigo: "A00981", grado: "BRIGADIER", nombre: "TITO SUAREZ, Juan Carlos", horasMes: [1,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A00980", grado: "BRIGADIER", nombre: "TORRES CROSSAR, Fabricio", horasMes: [3,0,0,37,0,0,0,0,0,0,0,0] },
  { codigo: "A00979", grado: "BRIGADIER", nombre: "VARALLANOS GAMARRA, José Adalberto", horasMes: [1,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A05741", grado: "BRIGADIER", nombre: "VARGAS ALZAMORA, Segundo Juan", horasMes: [46,0,0,9,0,0,0,0,0,0,0,0] },
  { codigo: "A07851", grado: "TENIENTE BRIGADIER", nombre: "AINZAIN RODRIGUEZ, Rafael Eduardo", horasMes: [84,0,0,99,0,0,0,0,0,0,0,0] },
  { codigo: "A07818", grado: "TENIENTE BRIGADIER", nombre: "BLONDET GARCIA, Helmut Elias", horasMes: [74,0,0,183,0,0,0,0,0,0,0,0] },
  { codigo: "A07819", grado: "TENIENTE BRIGADIER", nombre: "FRANCO BLAS, Christian Jesús", horasMes: [19,0,0,55,0,0,0,0,0,0,0,0] },
  { codigo: "A07820", grado: "TENIENTE BRIGADIER", nombre: "ITURRIZAGA CACERES, Juan Manuel", horasMes: [39,0,0,55,0,0,0,0,0,0,0,0] },
  { codigo: "A07821", grado: "TENIENTE BRIGADIER", nombre: "SALINAS CHIRINOS, Miguel Angel", horasMes: [332,336,322,990,378,421,0,0,0,0,0,0] },
  { codigo: "A07822", grado: "TENIENTE BRIGADIER", nombre: "SANGUINETTI CACHAY, Nicole Cecilia", horasMes: [21,0,0,148,0,0,0,0,0,0,0,0] },
  { codigo: "A07823", grado: "TENIENTE BRIGADIER", nombre: "TARAZONA VALENCIA, Paolo Milagro", horasMes: [75,36,37,148,41,26,0,0,0,0,0,0] },
  { codigo: "A07824", grado: "TENIENTE BRIGADIER", nombre: "VILLARREAL SEVILLANO, Ivan Fernando", horasMes: [24,0,0,24,0,0,0,0,0,0,0,0] },
  { codigo: "A07825", grado: "TENIENTE BRIGADIER", nombre: "YIKA MEZZANO, Mario Attilio", horasMes: [9,0,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A07912", grado: "CAPITAN", nombre: "BARAHONA TORRES, Monica Vanessa", horasMes: [61,0,0,102,0,0,0,0,0,0,0,0] },
  { codigo: "A01063", grado: "CAPITAN", nombre: "BONILLA PINAZO, Alex", horasMes: [4,17,0,0,0,0,0,0,0,0,0,0] },
  { codigo: "A01064", grado: "CAPITAN", nombre: "CASTILLO MENDIETA, Viviana Stefany", horasMes: [29,0,0,71,0,0,0,0,0,0,0,0] },
  { codigo: "A01065", grado: "CAPITAN", nombre: "CORDERO NUPAY, Jesús Armando", horasMes: [59,31,52,142,0,0,0,0,0,0,0,0] },
  { codigo: "A05120", grado: "CAPITAN", nombre: "FLORES URQUIA, Alejandra Cecilia", horasMes: [4,0,3,7,0,0,0,0,0,0,0,0] },
  { codigo: "A05121", grado: "CAPITAN", nombre: "GARCIA VALLE , Sharon Verónica", horasMes: [24,0,0,0,0,0,0,0,0,0,0,0] },
]
// Agregar usuarios de grado SEGUNDO
usuariosMock.push(
  { codigo: "A24671", grado: "SEGUNDO", nombre: "ALEGRIA SANCHEZ, Mario Cesar Alberto", horasMes: [461,250,296,247,248,182,0,0,0,0,0,0] },
  { codigo: "A23762", grado: "SEGUNDO", nombre: "ALVA HILARIO, Diego Andres", horasMes: [117,85,47,19,9,43,0,0,0,0,0,0] },
  { codigo: "A22888", grado: "SEGUNDO", nombre: "ARIAS MIGNONE, Gianni", horasMes: [44,36,73,52,68,38,0,0,0,0,0,0] },
  { codigo: "A22313", grado: "SEGUNDO", nombre: "ARIAS ORE, Juan Luis", horasMes: [0,0,2,0,0,3,0,0,0,0,0,0] },
  { codigo: "A13270", grado: "SEGUNDO", nombre: "BASTAS QUEVEDO, Alejandro Estuardo", horasMes: [0,0,10,31,0,0,0,0,0,0,0,0] },
  { codigo: "A12678", grado: "SEGUNDO", nombre: "CABRERA POMA, Antonella Tamara", horasMes: [122,109,58,173,0,0,0,0,0,0,0,0] },
  { codigo: "A22562", grado: "SEGUNDO", nombre: "CASTREJÓN VASQUEZ, Marya Rossana", horasMes: [331,253,186,178,70,57,0,0,0,0,0,0] },
  { codigo: "A24705", grado: "SEGUNDO", nombre: "CASTRO ASENCIO, Xiomara Rachiel", horasMes: [24,26,63,20,0,0,0,0,0,0,0,0] },
  { codigo: "A22308", grado: "SEGUNDO", nombre: "CENTENO GUTIERREZ, Veronica Patricia", horasMes: [102,64,75,39,36,73,0,0,0,0,0,0] },
  { codigo: "A22904", grado: "SEGUNDO", nombre: "CHAVEZ LLAQUE, Carolina", horasMes: [0,0,11,17,15,32,0,0,0,0,0,0] },
  { codigo: "A20874", grado: "SEGUNDO", nombre: "CHAVEZ MIANI, Carlos Nicolas", horasMes: [294,279,256,370,296,247,0,0,0,0,0,0] },
  { codigo: "A22896", grado: "SEGUNDO", nombre: "CORONEL-ZEGARRA BUSCAGLIA, Brisa Paola", horasMes: [3,0,17,0,0,0,0,0,0,0,0,0] },
  { codigo: "A23708", grado: "SEGUNDO", nombre: "COTRINA PAREDES, Edgar Armando", horasMes: [106,48,94,63,24,37,0,0,0,0,0,0] },
)
// Función para sumar horas de un Q (0=Q1, 1=Q2, ...)
function qHoras(user: UsuarioMock, qIdx: number): number {
  const start = qIdx * 3
  return user.horasMes.slice(start, start+3).reduce((a: number, b: number) => a+b, 0)
}
// Función para sumar total anual
function totalHoras(user: UsuarioMock): number {
  return user.horasMes.reduce((a: number, b: number) => a+b, 0)
}
// Función para colorear Q según % cumplimiento
function colorQ(valor: number, meta: number): string {
  const pct = (valor / meta) * 100;
  if (pct >= 100) return 'bg-green-400';
  if (pct > 50) return 'bg-yellow-300';
  return 'bg-red-400';
}

interface HorasPorQPorRango {
  BRIGADIER: number[];
  'TENIENTE BRIGADIER': number[];
  CAPITAN: number[];
  TENIENTE: number[];
  SEGUNDO: number[];
}
const horasPorQPorRango = reactive<HorasPorQPorRango>({
  'BRIGADIER':    [80, 75, 90, 85],
  'TENIENTE BRIGADIER': [70, 65, 80, 75],
  'CAPITAN':      [60, 55, 70, 65],
  'TENIENTE':     [50, 45, 60, 55],
  'SEGUNDO':      [40, 35, 50, 45],
})
const rangos: (keyof HorasPorQPorRango | 'TODOS')[] = [
  'TODOS',
  'BRIGADIER',
  'TENIENTE BRIGADIER',
  'CAPITAN',
  'TENIENTE',
  'SEGUNDO',
]
const rangoSeleccionado = ref<typeof rangos[number]>('TODOS')
const horasEditablesQPorRango = ref([...horasPorQPorRango['BRIGADIER']])

// Select de años
const anioActual = new Date().getFullYear()
const anios = Array.from({length: (anioActual + 2) - 2020 + 1}, (_, i) => 2020 + i)
const anioSeleccionado = ref(anioActual)

// Estructura: { [anio]: { [rango]: [horasQ1, horasQ2, horasQ3, horasQ4] } }
const horasPorQPorRangoPorAnio = reactive<{ [anio: number]: HorasPorQPorRango }>({
  [anioActual]: JSON.parse(JSON.stringify(horasPorQPorRango)) // Copia inicial para el año actual
})

// Actualizar horasEditablesQPorRango según año y rango
watch([anioSeleccionado, rangoSeleccionado], ([nuevoAnio, nuevoRango]) => {
  if (!horasPorQPorRangoPorAnio[nuevoAnio]) {
    // Si no existe el año, inicializar con valores por defecto (de BRIGADIER)
    horasPorQPorRangoPorAnio[nuevoAnio] = JSON.parse(JSON.stringify(horasPorQPorRango))
  }
  if (nuevoRango === 'TODOS') {
    horasEditablesQPorRango.value = [...horasPorQPorRangoPorAnio[nuevoAnio]['BRIGADIER']]
  } else {
    horasEditablesQPorRango.value = [...horasPorQPorRangoPorAnio[nuevoAnio][nuevoRango as keyof HorasPorQPorRango]]
  }
})

// En el script, agregar la función global para guardar todos los cambios de Q
function guardarCambiosQ() {
  const anio = anioSeleccionado.value
  // Validar que no haya valores negativos
  if (horasEditablesQPorRango.value.some(h => h < 0)) {
    Swal.fire('Error', 'Las horas deben ser un número positivo.', 'error')
    return
  }
  if (rangoSeleccionado.value === 'TODOS') {
    (Object.keys(horasPorQPorRangoPorAnio[anio]) as (keyof HorasPorQPorRango)[]).forEach(rango => {
      horasPorQPorRangoPorAnio[anio][rango] = [...horasEditablesQPorRango.value]
    })
    Swal.fire('¡Actualizado!', `Horas requeridas para todos los rangos en ${anio} actualizadas.`, 'success')
    // Refrescar referencia para forzar reactividad
    horasEditablesQPorRango.value = [...horasPorQPorRangoPorAnio[anio][rangos[1] as keyof HorasPorQPorRango]]
  } else {
    horasPorQPorRangoPorAnio[anio][rangoSeleccionado.value as keyof HorasPorQPorRango] = [...horasEditablesQPorRango.value]
    Swal.fire('¡Actualizado!', `Horas requeridas para el rango de ${rangoSeleccionado.value} en ${anio} actualizadas.`, 'success')
    // Refrescar referencia para forzar reactividad
    horasEditablesQPorRango.value = [...horasPorQPorRangoPorAnio[anio][rangoSeleccionado.value as keyof HorasPorQPorRango]]
  }
}

// Función para descargar la tabla como Excel
function descargarExcel() {
  // Encabezados
  const headers = [
    'CÓDIGO', 'GRADO', 'NOMBRE',
    'ENE', 'FEB', 'MAR', 'Q1',
    'ABR', 'MAY', 'JUN', 'Q2',
    'JUL', 'AGO', 'SEP', 'Q3',
    'OCT', 'NOV', 'DIC', 'Q4', 'TOTAL'
  ]
  // Datos y estilos
  const data = usuariosMock.map(user => {
    const horas = getHorasMes(user)
    const q1 = qHoras(user, 0)
    const q2 = qHoras(user, 1)
    const q3 = qHoras(user, 2)
    const q4 = qHoras(user, 3)
    const total = totalHoras(user)
    return [
      user.codigo,
      user.grado,
      user.nombre,
      horas[0], horas[1], horas[2], q1,
      horas[3], horas[4], horas[5], q2,
      horas[6], horas[7], horas[8], q3,
      horas[9], horas[10], horas[11], q4,
      total
    ]
  })
  // Crear hoja y libro
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data])

  // Colores para los Q (usando colores hex de Excel)
  function getExcelColor(valor: number, meta: number): string {
    const pct = (valor / meta) * 100
    if (pct >= 100) return 'FF4ADE80' // verde
    if (pct > 50) return 'FFFDE047' // amarillo
    return 'FFF87171' // rojo
  }
  // Aplicar estilos a las celdas de Q1, Q2, Q3, Q4
  for (let i = 0; i < usuariosMock.length; i++) {
    const user = usuariosMock[i]
    const row = i + 1 // +1 por encabezado
    const metas = horasPorQPorRangoPorAnio[anioSeleccionado.value][user.grado as keyof HorasPorQPorRango]
    // Q1: columna G (6), Q2: K (10), Q3: O (14), Q4: S (18)
    const qIdxs = [6, 10, 14, 18]
    const qs = [qHoras(user, 0), qHoras(user, 1), qHoras(user, 2), qHoras(user, 3)]
    qIdxs.forEach((col, idx) => {
      const cell = XLSX.utils.encode_cell({ r: row, c: col })
      if (!ws[cell]) return
      ws[cell].s = {
        fill: {
          patternType: 'solid',
          fgColor: { rgb: getExcelColor(qs[idx], metas?.[idx] ?? 0) }
        }
      }
    })
  }
  // Definir estilos en el libro
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Resumen')
  // Generar y descargar
  XLSX.writeFile(wb, 'resumen_horas_usuarios.xlsx', { cellStyles: true })
}

// Estado para edición inline de celdas
const celdaEditando = ref<{ idxUsuario: number; idxMes: number } | null>(null)
const cambiosPendientes = ref(false)

function activarEdicion(idxUsuario: number, idxMes: number) {
  celdaEditando.value = { idxUsuario, idxMes }
}
function confirmarEdicion(idxUsuario: number, idxMes: number, nuevoValor: number) {
  if (nuevoValor < 0) return
  usuariosMock[idxUsuario].horasMes[idxMes] = nuevoValor
  celdaEditando.value = null
  cambiosPendientes.value = true
}
function guardarCambiosMeses() {
  cambiosPendientes.value = false
  Swal.fire('¡Actualizado!', 'Horas mensuales actualizadas correctamente.', 'success')
}

// Helper para asegurar 12 meses en horasMes
function getHorasMes(user: UsuarioMock): number[] {
  return [...user.horasMes, ...Array(12 - user.horasMes.length).fill(0)].slice(0, 12)
}

function descargarHTML() {
  // Encabezados y estructura
  const headers = [
    'CÓDIGO', 'GRADO', 'NOMBRE',
    'ENE', 'FEB', 'MAR', 'Q1',
    'ABR', 'MAY', 'JUN', 'Q2',
    'JUL', 'AGO', 'SEP', 'Q3',
    'OCT', 'NOV', 'DIC', 'Q4', 'TOTAL'
  ]
  // Colores para los Q (hex)
  function getHtmlColor(valor: number, meta: number): string {
    const pct = (valor / meta) * 100
    if (pct >= 100) return '#4ade80' // verde
    if (pct > 50) return '#fde047' // amarillo
    return '#f87171' // rojo
  }
  // Construir tabla HTML
  let html = '<table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:12px;">'
  html += '<thead><tr>' + headers.map(h => `<th style="background:#f3f4f6;">${h}</th>`).join('') + '</tr></thead>'
  html += '<tbody>'
  for (const user of usuariosMock) {
    const horas = getHorasMes(user)
    const metas = horasPorQPorRangoPorAnio[anioSeleccionado.value][user.grado as keyof HorasPorQPorRango]
    // Q1-Q4 y TOTAL calculados con los índices correctos
    const q1 = horas[0] + horas[1] + horas[2]
    const q2 = horas[3] + horas[4] + horas[5]
    const q3 = horas[6] + horas[7] + horas[8]
    const q4 = horas[9] + horas[10] + horas[11]
    const total = horas.reduce((a, b) => a + b, 0)
    html += '<tr>'
    html += `<td>${user.codigo}</td><td>${user.grado}</td><td>${user.nombre}</td>`
    // ENE, FEB, MAR
    html += `<td>${horas[0]}</td><td>${horas[1]}</td><td>${horas[2]}</td>`
    // Q1
    html += `<td style="background:${getHtmlColor(q1, metas?.[0] ?? 0)};font-weight:bold;">${q1}</td>`
    // ABR, MAY, JUN
    html += `<td>${horas[3]}</td><td>${horas[4]}</td><td>${horas[5]}</td>`
    // Q2
    html += `<td style="background:${getHtmlColor(q2, metas?.[1] ?? 0)};font-weight:bold;">${q2}</td>`
    // JUL, AGO, SEP
    html += `<td>${horas[6]}</td><td>${horas[7]}</td><td>${horas[8]}</td>`
    // Q3
    html += `<td style="background:${getHtmlColor(q3, metas?.[2] ?? 0)};font-weight:bold;">${q3}</td>`
    // OCT, NOV, DIC
    html += `<td>${horas[9]}</td><td>${horas[10]}</td><td>${horas[11]}</td>`
    // Q4
    html += `<td style="background:${getHtmlColor(q4, metas?.[3] ?? 0)};font-weight:bold;">${q4}</td>`
    // TOTAL
    html += `<td style="font-weight:bold;">${total}</td>`
    html += '</tr>'
  }
  html += '</tbody></table>'
  // Descargar como archivo .html
  const blob = new Blob([
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Reporte Horas</title></head><body>' +
    html +
    '</body></html>'
  ], { type: 'text/html' })
  saveAs(blob, 'reporte_horas_usuarios.html')
}
</script>
