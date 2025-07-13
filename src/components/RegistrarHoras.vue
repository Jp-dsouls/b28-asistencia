<template>
  <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
    <h3 class="text-lg font-bold mb-2">Registrar Horas</h3>
    <form>
      <div class="mb-4">
        <label class="block text-gray-700">Fecha</label>
        <input type="date" class="w-full border rounded px-3 py-2 mt-1" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Cantidad de horas</label>
        <input type="number" class="w-full border rounded px-3 py-2 mt-1" min="1" max="24" />
      </div>
      <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Registrar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
</script> 