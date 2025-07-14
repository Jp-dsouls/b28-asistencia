<template>
  <div class="min-h-screen bg-gray-50 p-8 relative">
    <button
      class="absolute top-6 right-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      @click="logout"
    >
      <ArrowRightOnRectangleIcon class="w-6 h-6" />
    </button>
    <h2 class="text-2xl font-bold mb-4">Bienvenido, administrador</h2>

    <!-- Cards informativos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
        <UserIcon class="w-10 h-10 text-blue-500 mb-2" />
        <div class="text-2xl font-bold">{{ totalUsuarios }}</div>
        <div class="text-gray-500">Usuarios registrados</div>
      </div>
      <div class="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
        <ShieldCheckIcon class="w-10 h-10 text-green-500 mb-2" />
        <div class="text-2xl font-bold">{{ totalBomberos }}</div>
        <div class="text-gray-500">Bomberos</div>
      </div>
      <div class="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
        <UsersIcon class="w-10 h-10 text-purple-500 mb-2" />
        <div class="text-2xl font-bold">{{ totalRoles }}</div>
        <div class="text-gray-500">Roles distintos</div>
      </div>
      <div class="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
        <ClockIcon class="w-10 h-10 text-yellow-500 mb-2" />
        <div class="text-2xl font-bold">{{ totalHoras }}</div>
        <div class="text-gray-500">Horas registradas</div>
      </div>
    </div>
    <!-- Fin cards informativos -->

    <div class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-lg font-bold mb-4">Usuarios Registrados</h3>
      <div class="overflow-x-auto rounded-xl">
        <table class="w-full text-left min-w-[900px]">
          <thead>
            <tr>
              <th class="py-2 px-4">Código</th>
              <th class="py-2 px-4">Nombre</th>
              <th class="py-2 px-4">Semanas</th>
              <th class="py-2 px-4">Registro actual</th>
              <th class="py-2 px-4">Progreso</th>
              <th class="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, idx) in users" :key="user.username" :class="[idx % 2 === 0 ? 'bg-blue-50' : 'bg-white', 'transition-colors hover:bg-emerald-50']">
              <td class="py-2 px-4">{{ user.codigo }}</td>
              <td class="py-2 px-4">{{ user.nombre }}</td>
              <td class="py-2 px-4">
                <div class="flex gap-1">
                  <span v-for="i in 7" :key="i" :class="[user.semanas[i-1] ? user.semanas[i-1].color + ' text-white' : 'bg-gray-400 text-white', 'px-2 py-1 rounded text-xs font-semibold min-w-[64px] h-7 flex items-center justify-center']">
                    {{ user.semanas[i-1] ? user.semanas[i-1].tiempo : '\u00A0' }}
                  </span>
                </div>
              </td>
              <td class="py-2 px-4 font-semibold">
                {{
                  (() => {
                    const totalMin = user.semanas
                      .map(s => aMinutos(s.tiempo))
                      .reduce((a, b) => a + b, 0);
                    const h = Math.floor(totalMin / 60);
                    const m = totalMin % 60;
                    return `${h}h${m > 0 ? ' ' + m + 'min' : ''}`;
                  })()
                }}
              </td>
              <td class="py-2 px-4">
                <div class="flex items-center gap-2">
                  <span class="font-semibold">
                    {{
                      (() => {
                        const totalMin = user.semanas
                          .map(s => aMinutos(s.tiempo))
                          .reduce((a, b) => a + b, 0);
                        const porcentaje = Math.round((totalMin / 3360) * 100);
                        return porcentaje + '%';
                      })()
                    }}
                  </span>
                  <div class="w-24 bg-gray-200 rounded-full h-3">
                    <div
                      :style="{
                        width: (() => {
                          const totalMin = user.semanas
                            .map(s => aMinutos(s.tiempo))
                            .reduce((a, b) => a + b, 0);
                          const porcentaje = Math.round((totalMin / 3360) * 100);
                          return porcentaje + '%';
                        })()
                      }"
                      class="h-3 rounded-full"
                      :class="(() => {
                        const totalMin = user.semanas
                          .map(s => aMinutos(s.tiempo))
                          .reduce((a, b) => a + b, 0);
                        const porcentaje = Math.round((totalMin / 3360) * 100);
                        return porcentaje >= 80 ? 'bg-green-500' : porcentaje >= 40 ? 'bg-yellow-400' : 'bg-red-500';
                      })()"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="py-2 px-4">
                <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="editarUsuario(user)">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { UserIcon, UsersIcon, ShieldCheckIcon, ClockIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'

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

function editarUsuario(user: { username: string, role: string }) {
  Swal.fire({
    title: 'Editar usuario',
    html:
      `<input id="swal-username" class="swal2-input" placeholder="Usuario" value="${user.username}">` +
      `<select id="swal-role" class="swal2-input">
        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
        <option value="bombero" ${user.role === 'bombero' ? 'selected' : ''}>Bombero</option>
      </select>`,
    focusConfirm: false,
    preConfirm: () => {
      const username = (document.getElementById('swal-username') as HTMLInputElement).value
      const role = (document.getElementById('swal-role') as HTMLSelectElement).value
      return { username, role }
    }
  }).then(result => {
    if (result.isConfirmed && result.value) {
      // Actualizar usuario en la lista (solo frontend, demo)
      const idx = users.value.findIndex(u => u.username === user.username)
      if (idx !== -1) {
        users.value[idx] = { ...users.value[idx], ...result.value }
        Swal.fire('¡Actualizado!', 'El usuario ha sido actualizado.', 'success')
      }
    }
  })
}

function logout() {
  auth.logout()
  router.push({ name: 'login-usuario' })
}

const totalUsuarios = computed(() => users.value.length)
const totalBomberos = computed(() => users.value.filter(u => u.role === 'bombero').length)
const totalRoles = computed(() => Array.from(new Set(users.value.map(u => u.role))).length)
const totalHoras = 320 // Simulado, puedes reemplazarlo por un cálculo real
</script> 