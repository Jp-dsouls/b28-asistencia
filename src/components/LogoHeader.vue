<script setup lang="ts">
import { ref } from 'vue'
import { IMAGES, IMAGE_SIZES, type ImageSize } from '../config/images'

interface Props {
  size?: ImageSize
  showText?: boolean
  layout?: 'horizontal' | 'vertical' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showText: true,
  layout: 'auto'
})

// Estado para manejar errores de carga de imágenes
const escudoError = ref(false)
const logoError = ref(false)

// Tamaños responsivos para las imágenes
const responsiveSizeClasses = {
  sm: 'w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8',
  md: 'w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12',
  lg: 'w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16'
}

// Layouts responsivos
const layoutClasses = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
  auto: 'flex-col sm:flex-row'
}

// Función para manejar errores de carga
const handleImageError = (type: 'escudo' | 'logo') => {
  if (type === 'escudo') {
    escudoError.value = true
  } else {
    logoError.value = true
  }
}
</script>

<template>
  <!-- Mobile: Layout vertical compacto -->
  <div class="sm:hidden flex flex-col items-center gap-2">
    <div class="flex items-center gap-1">
      <!-- Escudo B28 -->
      <div class="relative">
        <img v-if="!escudoError" :src="IMAGES.ESCUDO_B28" :alt="IMAGES.ALT_TEXTS.ESCUDO_B28" :class="[
          responsiveSizeClasses[size],
          'object-contain'
        ]" loading="lazy" @error="handleImageError('escudo')" />
        <!-- Fallback si la imagen no carga -->
        <div v-if="escudoError" :class="[
          responsiveSizeClasses[size],
          'bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-red-600'
        ]">
          B28
        </div>
      </div>

      <!-- Logo CGBVP -->
      <div class="relative">
        <img v-if="!logoError" :src="IMAGES.LOGO_CGBVP" :alt="IMAGES.ALT_TEXTS.LOGO_CGBVP" :class="[
          responsiveSizeClasses[size],
          'object-contain'
        ]" loading="lazy" @error="handleImageError('logo')" />
        <!-- Fallback si la imagen no carga -->
        <div v-if="logoError" :class="[
          responsiveSizeClasses[size],
          'bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-blue-600'
        ]">
          CGBVP
        </div>
      </div>
    </div>

    <!-- Texto del título en mobile -->
    <h5 v-if="showText" class="text-sm font-bold tracking-tight text-gray-900 uppercase leading-tight text-center">
      Dashboard de asistencia interna personal B28
    </h5>
  </div>

  <!-- Tablet: Layout horizontal medio -->
  <div class="hidden sm:block lg:hidden flex items-center gap-3">
    <!-- Escudo B28 -->
    <div class="relative">
      <img v-if="!escudoError" :src="IMAGES.ESCUDO_B28" :alt="IMAGES.ALT_TEXTS.ESCUDO_B28" :class="[
        responsiveSizeClasses[size],
        'object-contain'
      ]" loading="lazy" @error="handleImageError('escudo')" />
      <!-- Fallback si la imagen no carga -->
      <div v-if="escudoError" :class="[
        responsiveSizeClasses[size],
        'bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-red-600'
      ]">
        B28
      </div>
    </div>

    <!-- Logo CGBVP -->
    <div class="relative">
      <img v-if="!logoError" :src="IMAGES.LOGO_CGBVP" :alt="IMAGES.ALT_TEXTS.LOGO_CGBVP" :class="[
        responsiveSizeClasses[size],
        'object-contain'
      ]" loading="lazy" @error="handleImageError('logo')" />
      <!-- Fallback si la imagen no carga -->
      <div v-if="logoError" :class="[
        responsiveSizeClasses[size],
        'bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-blue-600'
      ]">
        CGBVP
      </div>
    </div>

    <!-- Texto del título en tablet -->
    <h5 v-if="showText" class="text-base font-bold tracking-tight text-gray-900 uppercase leading-tight">
      Dashboard de asistencia interna personal B28
    </h5>
  </div>

  <!-- Desktop: Layout horizontal completo -->
  <div class="hidden lg:flex items-center gap-4">
    <!-- Escudo B28 -->
    <div class="relative">
      <img v-if="!escudoError" :src="IMAGES.ESCUDO_B28" :alt="IMAGES.ALT_TEXTS.ESCUDO_B28" :class="[
        responsiveSizeClasses[size],
        'object-contain'
      ]" loading="lazy" @error="handleImageError('escudo')" />
      <!-- Fallback si la imagen no carga -->
      <div v-if="escudoError" :class="[
        responsiveSizeClasses[size],
        'bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-red-600'
      ]">
        B28
      </div>
    </div>

    <!-- Logo CGBVP -->
    <div class="relative">
      <img v-if="!logoError" :src="IMAGES.LOGO_CGBVP" :alt="IMAGES.ALT_TEXTS.LOGO_CGBVP" :class="[
        responsiveSizeClasses[size],
        'object-contain'
      ]" loading="lazy" @error="handleImageError('logo')" />
      <!-- Fallback si la imagen no carga -->
      <div v-if="logoError" :class="[
        responsiveSizeClasses[size],
        'bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-blue-600'
      ]">
        CGBVP
      </div>
    </div>

    <!-- Texto del título en desktop -->
    <h5 v-if="showText" class="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 uppercase leading-tight">
      Dashboard de asistencia interna personal B28
    </h5>
  </div>
</template>

<style scoped>
/* Optimizaciones para imágenes */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  will-change: opacity;
}

/* Animación de carga suave */
img {
  transition: opacity 0.3s ease-in-out;
}

/* Mejoras de accesibilidad */
img:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Optimización para pantallas de alta densidad */
@media (-webkit-min-device-pixel-ratio: 2),
(min-resolution: 192dpi) {
  img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}

/* Transiciones suaves para cambios de layout */
div {
  transition: all 0.3s ease-in-out;
}
</style>