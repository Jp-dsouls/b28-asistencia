<template>
  <div class="min-h-screen bg-gray-200 p-8">
    <h2 class="text-2xl font-bold mb-4">Panel Privado Bombero</h2>
    <RegistrarHoras />
    <HistorialHoras class="mt-8" />
  </div>
</template>

<script setup lang="ts">
import RegistrarHoras from '../components/RegistrarHoras.vue'
import HistorialHoras from '../components/HistorialHoras.vue'
</script> 