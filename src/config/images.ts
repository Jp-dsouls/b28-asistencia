// Configuración de imágenes del proyecto
export const IMAGES = {
  // Logos y escudos
  ESCUDO_B28: '/src/assets/images/escudo b28.png',
  LOGO_CGBVP: '/src/assets/images/logo cgbvp.png',
  
  // Textos alternativos para accesibilidad
  ALT_TEXTS: {
    ESCUDO_B28: 'Escudo B28 - Bomberos Voluntarios Miraflores',
    LOGO_CGBVP: 'Logo CGBVP - Cuerpo General de Bomberos Voluntarios del Perú'
  }
} as const

// Configuración de tamaños de imágenes
export const IMAGE_SIZES = {
  sm: 'w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8',
  md: 'w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12',
  lg: 'w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16'
} as const

// Tipos para TypeScript
export type ImageSize = keyof typeof IMAGE_SIZES
export type ImageType = keyof typeof IMAGES 