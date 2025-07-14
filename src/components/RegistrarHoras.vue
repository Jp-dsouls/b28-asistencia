<template>
  <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto flex flex-col items-center">
    <button
      class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      :disabled="isBlocked"
      @click="marcarHora"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, computed, onMounted } from 'vue'

// Obtener usuario logueado
const user = JSON.parse(localStorage.getItem('user') || '{}')
const username = user?.username

const today = new Date().toISOString().slice(0, 10)
const registrosKey = `registros_${username}`
const registros = ref<{ fecha: string, ingreso?: string, salida?: string }[]>([])

const estado = ref<'ninguno' | 'ingreso' | 'salida' | 'bloqueado'>('ninguno')

function cargarRegistros() {
  const data = localStorage.getItem(registrosKey)
  registros.value = data ? JSON.parse(data) : []
  const hoy = registros.value.find(r => r.fecha === today)
  if (!hoy) {
    estado.value = 'ninguno'
  } else if (hoy && hoy.ingreso && !hoy.salida) {
    estado.value = 'ingreso'
  } else if (hoy && hoy.ingreso && hoy.salida) {
    estado.value = 'bloqueado'
  }
}

onMounted(() => {
  cargarRegistros()
})

const isBlocked = computed(() => estado.value === 'bloqueado')
const buttonText = computed(() => {
  if (estado.value === 'ninguno') return 'Marcar hora de ingreso'
  if (estado.value === 'ingreso') return 'Marcar hora de salida'
  return 'Ya registraste tus horas hoy'
})

function marcarHora() {
  if (!username) return
  const now = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  let hoy = registros.value.find(r => r.fecha === today)
  if (!hoy) {
    // Registrar ingreso
    hoy = { fecha: today, ingreso: now }
    registros.value.push(hoy)
    localStorage.setItem(registrosKey, JSON.stringify(registros.value))
    estado.value = 'ingreso'
    Swal.fire('¡Ingreso registrado!', 'Se registró de manera satisfactoria su hora de ingreso.', 'success')
  } else if (hoy && hoy.ingreso && !hoy.salida) {
    // Registrar salida
    hoy.salida = now
    localStorage.setItem(registrosKey, JSON.stringify(registros.value))
    estado.value = 'bloqueado'
    Swal.fire('¡Salida registrada!', 'Se registró de manera satisfactoria su hora de salida.', 'success')
  }
}
</script> 