# B28 - Sistema de Asistencia Frontend

Sistema moderno de gestión de asistencia desarrollado con Vue 3 y tecnologías modernas.

## 🚀 Tecnologías Utilizadas

- **Vue 3** - Framework de JavaScript progresivo
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Flowbite** - Componentes UI para Tailwind CSS
- **SweetAlert2** - Librería de alertas y modales
- **Swiper** - Carousel y slider moderno
- **Vue Router** - Enrutamiento oficial de Vue
- **Pinia** - Store de estado para Vue
- **ESLint** - Linter de código
- **Prettier** - Formateador de código

## 📦 Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd b28-front-asistencia
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

4. **Construir para producción:**
```bash
npm run build
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run format` - Formatea el código con Prettier
- `npm run lint` - Ejecuta ESLint para verificar el código

## 📁 Estructura del Proyecto

```
b28-front-asistencia/
├── public/                 # Archivos públicos
├── src/
│   ├── assets/            # Recursos estáticos
│   ├── components/        # Componentes Vue reutilizables
│   ├── router/           # Configuración de rutas
│   ├── stores/           # Stores de Pinia
│   ├── views/            # Páginas/Vistas
│   ├── App.vue           # Componente raíz
│   ├── main.ts           # Punto de entrada
│   └── style.css         # Estilos globales
├── tailwind.config.js    # Configuración de Tailwind CSS
├── postcss.config.js     # Configuración de PostCSS
└── package.json          # Dependencias y scripts
```

## 🎨 Características del Sistema

### Componentes Flowbite Integrados
- **FwbButton** - Botones con diferentes variantes y colores
- **FwbCard** - Tarjetas para mostrar información
- **FwbTable** - Tablas responsivas con estilos modernos
- **FwbBadge** - Badges para mostrar estados
- **FwbModal** - Modales y diálogos

### Alertas con SweetAlert2
- Alertas de éxito, error, advertencia e información
- Confirmaciones con botones personalizados
- Modales con formularios integrados
- Indicadores de carga

### Carousel con Swiper
- Navegación con flechas
- Paginación clickeable
- Responsive design
- Transiciones suaves

### Estilos con Tailwind CSS
- Clases utilitarias para diseño rápido
- Sistema de colores consistente
- Responsive design out-of-the-box
- Componentes personalizados

## 🔧 Configuración

### Tailwind CSS
El proyecto está configurado con Tailwind CSS v4. Los estilos se encuentran en `src/style.css` y la configuración en `tailwind.config.js`.

### Flowbite
Los componentes de Flowbite están disponibles globalmente a través del plugin configurado en `main.ts`.

### SweetAlert2
SweetAlert2 está disponible globalmente para mostrar alertas y modales personalizados.

### Swiper
Swiper está configurado para carousels y sliders con navegación y paginación.

## 📱 Responsive Design

El sistema está completamente optimizado para dispositivos móviles, tablets y desktop utilizando las clases responsive de Tailwind CSS.

## 🚀 Despliegue

Para desplegar la aplicación:

1. Construir la aplicación:
```bash
npm run build
```

2. Los archivos de producción se generarán en la carpeta `dist/`

3. Subir los archivos de `dist/` a tu servidor web

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo.
