import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ username: string; role: 'bombero' | 'admin' | null } | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const isBombero = computed(() => user.value?.role === 'bombero')
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(username: string, role: 'bombero' | 'admin') {
    user.value = { username, role }
  }
  function logout() {
    user.value = null
  }

  return { user, isAuthenticated, isBombero, isAdmin, login, logout }
}) 