<template>
  <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
    <h3 class="text-lg font-bold mb-2">Historial de Horas</h3>
    <ul>
      <li class="mb-2" v-for="i in 3" :key="i">
        <span class="font-semibold">2024-06-1{{i}}</span>: <span class="text-gray-700">8 horas</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
</script> 