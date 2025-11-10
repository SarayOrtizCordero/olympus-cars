# Olympus Cars

Sistema web premium para concesionario de vehículos de lujo desarrollado con tecnologías frontend modernas.

## Descripción

Aplicación web para concesionario premium especializado en vehículos de lujo. Experiencia de usuario elegante y profesional con catálogo de vehículos, sistema de presupuestos y mapa interactivo de contacto.

**Características principales:**
- Galería con filtrado avanzado por marca, tipo y búsqueda textual
- Lightbox optimizado con scroll interno y descripciones detalladas
- Formulario de presupuesto con validación en tiempo real y cálculo automático
- Mapa interactivo con geolocalización y cálculo de rutas
- Sistema de noticias dinámicas cargadas desde JSON
- Diseño responsivo con paleta negra/dorada premium

**Paleta de colores:**
- Negro (`#000000`) - Color principal
- Dorado (`#D4AF37`) - Acentos premium
- Grises - Elementos secundarios

**Tipografías:**
- Playfair Display - Títulos elegantes
- Montserrat - Texto general
- Cormorant Garamond - Detalles especiales

## Tecnologías

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+** - Modular y orientado a eventos
- **jQuery 3.7.1** - Manipulación del DOM
- **Leaflet 1.9.4** - Mapas interactivos
- **Leaflet Routing Machine** - Cálculo de rutas
- **Font Awesome 6.5.2** - Iconografía
- **Google Fonts** - Tipografías premium

## Funcionalidades

**Página de Inicio:**
- Presentación institucional con estadísticas animadas
- Noticias dinámicas cargadas desde JSON
- Dropdown con información adicional (horario, ubicación, contacto)
- Contador animado al hacer scroll
- Call-to-action para galería y presupuesto

**Galería de Vehículos:**
- Búsqueda por texto (nombre, marca, descripción)
- Filtros por marca (Porsche, Mercedes, BMW, Ferrari, Lamborghini, Audi)
- Filtros por tipo (Deportivo, SUV, Sedan)
- Lightbox con scroll interno y navegación entre vehículos
- Información detallada: marca, tipo, potencia, transmisión, precio

**Formulario de Presupuesto:**
- Validación en tiempo real con mensajes de error
- Campos: nombre, apellidos, teléfono, email, tipo de servicio
- Servicios: compra, financiación, test drive, mantenimiento, seguro, valoración
- Cálculo automático de presupuesto estimado
- Botón WhatsApp para contacto directo

**Página de Contacto:**
- Información de contacto (teléfono, email, dirección, horario)
- Mapa interactivo con Leaflet
- Geolocalización del usuario
- Cálculo de rutas con panel de instrucciones optimizado
- Marcador personalizado del negocio con popup
- Botón WhatsApp flotante

## Arquitectura

```
olympus-cars/
├── index.html              # Página principal
├── views/
│   ├── galeria.html       # Catálogo de vehículos
│   ├── presupuesto.html   # Formulario de cotización
│   └── contacto.html      # Mapa y contacto
├── css/
│   ├── index.css          # Estilos página principal
│   ├── galeria.css        # Estilos galería
│   ├── presupuesto.css    # Estilos formulario
│   └── contacto.css       # Estilos contacto
├── js/
│   ├── index.js           # Lógica página principal
│   ├── galeria.js         # Sistema de filtrado y lightbox
│   ├── presupuesto.js     # Validación y cálculos
│   └── contacto.js        # Mapa interactivo
└── assets/
    ├── data/
    │   ├── vehiculos.json # Catálogo
    │   └── noticias.json  # Noticias
    └── images/            # Recursos gráficos
```

## Instalación

**Requisitos:** Navegador web moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

**Servidor local (Python):**
```bash
cd olympus-cars
python -m http.server 8000
```

**Servidor local (Node.js):**
```bash
npx http-server -p 8000
```

**VS Code Live Server:**
- Click derecho en `index.html` → "Open with Live Server"

## Configuración

**Modificar vehículos** (`assets/data/vehiculos.json`):
```json
{
  "vehiculos": [
    {
      "id": 1,
      "marca": "Porsche",
      "modelo": "911 Turbo S",
      "ano": 2024,
      "tipo": "deportivo",
      "potencia": "650",
      "precio": 250000,
      "imagen": "../assets/images/coche-1.jpeg",
      "descripcion": "Descripción del vehículo"
    }
  ]
}
```

**Modificar noticias** (`assets/data/noticias.json`):
```json
{
  "noticias": [
    {
      "id": 1,
      "categoria": "lanzamiento",
      "titulo": "Título de la noticia",
      "descripcion": "Descripción breve",
      "imagen": "./assets/images/noticia.jpeg",
      "fecha": "2025-10-15",
      "enlace": "./views/galeria.html"
    }
  ]
}
```

**Actualizar información de contacto** (`js/contacto.js`):
```javascript
const BUSINESS_COORDS = [40.42304, -3.70694];
const BUSINESS_NAME = "Olympus Cars";
const BUSINESS_ADDRESS = "Calle de la Luna, 12<br>28004 Madrid, España";
const BUSINESS_PHONE = "+34 955 786 544";
```

## Compatibilidad

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## Rendimiento

- Lazy loading de imágenes
- Debounce y throttle en eventos
- Archivos optimizados para producción
- Librerías servidas desde CDN

## Licencia

Este proyecto es parte de un portafolio. El código está disponible para propósitos de aprendizaje y demostración.

**Nota Legal**: Los nombres, logotipos e imágenes de videojuegos son propiedad de sus respectivos titulares y se utilizan únicamente con fines educativos y de demostración.

## Autor

**Saray Ortiz Cordero**

Proyecto desarrollado como parte del aprendizaje en desarrollo web frontend, demostrando competencias en HTML5, CSS3, diseño responsivo, accesibilidad web y mejores prácticas de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Estado del proyecto**: Activo - En desarrollo continuo

