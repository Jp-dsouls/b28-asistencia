<template>
  <div class="min-h-screen bg-gray-50 p-8 relative">
    <button
      class="absolute top-6 right-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      @click="logout"
    >
      Cerrar sesión
    </button>
    <h2 class="text-2xl font-bold mb-4">Panel de Administración</h2>
    <p class="mb-8">Aquí el admin podrá gestionar la configuración y ver reportes globales.</p>

    <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
      <h3 class="text-lg font-bold mb-4">Usuarios Registrados</h3>
      <table class="w-full text-left border">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Usuario</th>
            <th class="py-2 px-4 border-b">Rol</th>
            <th class="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.username">
            <td class="py-2 px-4 border-b">{{ user.username }}</td>
            <td class="py-2 px-4 border-b capitalize">{{ user.role }}</td>
            <td class="py-2 px-4 border-b">
              <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="editarUsuario(user)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const users = ref<{ username: string, role: string }[]>([])
const auth = useAuthStore()
const router = useRouter()

function cargarUsuarios() {
  // Buscar todos los usuarios guardados en localStorage (simulación)
  // En este ejemplo, solo admin y user, pero puedes extenderlo si hay registro
  const base = [
    { username: 'admin', role: 'admin' },
    { username: 'user', role: 'bombero' }
  ]
  // Si en el futuro hay más usuarios, puedes agregarlos aquí
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
</script> 