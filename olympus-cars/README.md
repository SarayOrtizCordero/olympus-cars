# Olympus Cars

Sistema web premium para concesionario de vehículos de lujo desarrollado con tecnologías frontend modernas.

## Descripción del Proyecto

Olympus Cars es una aplicación web diseñada para un concesionario premium especializado en vehículos de lujo. El sistema ofrece una experiencia de usuario elegante y profesional, permitiendo a los visitantes explorar el catálogo de vehículos, solicitar presupuestos personalizados y contactar con el establecimiento a través de un mapa interactivo.

La aplicación implementa un diseño responsivo con una paleta de colores sofisticada (negro, dorado y grises), animaciones fluidas y una arquitectura modular que facilita el mantenimiento y la escalabilidad del código.

## Características Principales

- **Página de Inicio**: Presentación institucional con secciones sobre la empresa, estadísticas animadas, noticias y llamadas a la acción
- **Galería de Vehículos**: Sistema de filtrado avanzado por marca, tipo y búsqueda textual, con lightbox optimizado y descripciones detalladas
- **Formulario de Presupuesto**: Validación en tiempo real, cálculo automático de precios y múltiples opciones de servicio
- **Página de Contacto**: Mapa interactivo con Leaflet, geolocalización, cálculo de rutas optimizado y visualización del showroom
- **Sistema de Noticias**: Carga dinámica desde JSON con despliegue de información adicional mediante dropdown
- **Diseño Responsivo**: Adaptación completa a dispositivos móviles, tablets y escritorio con paleta negra/dorada premium

## Tecnologías Utilizadas

### Frontend
- HTML5 (semántico y accesible)
- CSS3 (variables CSS, Grid, Flexbox, animaciones)
- JavaScript ES6+ (modular y orientado a eventos)

### Librerías y Frameworks
- jQuery 3.7.1 (manipulación del DOM y eventos)
- Leaflet 1.9.4 (mapas interactivos)
- Leaflet Routing Machine (cálculo de rutas)
- Font Awesome 6.5.2 (iconografía)

### Tipografías
- Playfair Display (títulos elegantes)
- Montserrat (texto general)
- Cormorant Garamond (detalles especiales)

## Estructura del Proyecto

```
olympus-cars/
│
├── index.html                 # Página principal
├── olympus-cars.ico          # Favicon
│
├── assets/                    # Recursos estáticos
│   ├── data/                 # Archivos JSON
│   │   ├── noticias.json     # Datos de noticias
│   │   └── vehiculos.json    # Catálogo de vehículos
│   ├── fonts/                # Fuentes tipográficas
│   └── images/               # Imágenes del sitio
│
├── css/                       # Hojas de estilo
│   ├── index.css             # Estilos de página principal
│   ├── galeria.css           # Estilos de galería
│   ├── presupuesto.css       # Estilos de formulario
│   └── contacto.css          # Estilos de contacto
│
├── js/                        # Scripts JavaScript
│   ├── index.js              # Lógica página principal
│   ├── galeria.js            # Sistema de filtrado y lightbox
│   ├── presupuesto.js        # Validación y cálculos
│   └── contacto.js           # Mapa interactivo
│
└── views/                     # Páginas secundarias
    ├── galeria.html          # Catálogo de vehículos
    ├── presupuesto.html      # Formulario de cotización
    └── contacto.html         # Información y mapa
```

## Instalación

### Requisitos Previos

- Navegador web moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Servidor web local (opcional, para desarrollo)

### Pasos de Instalación

1. Clonar o descargar el repositorio en su máquina local:
   ```bash
   git clone https://github.com/SarayOrtizCordero/olympus-cars
   ```

2. Navegar al directorio del proyecto:
   ```bash
   cd olympus-cars
   ```

3. Abrir el archivo `index.html` en un navegador web, o bien, iniciar un servidor local:

   **Opción A - Servidor HTTP con Python:**
   ```bash
   python -m http.server 8000
   ```
   Luego acceder a `http://localhost:8000`

   **Opción B - Servidor HTTP con Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```
   Luego acceder a `http://localhost:8000`

   **Opción C - Live Server en VS Code:**
   - Instalar la extensión "Live Server"
   - Click derecho en `index.html`
   - Seleccionar "Open with Live Server"

## Uso

### Navegación Principal

El sitio cuenta con un menú de navegación fijo en la parte superior con las siguientes secciones:

- **Inicio**: Página principal con información institucional
- **Galería**: Catálogo completo de vehículos con filtros
- **Presupuesto**: Formulario de solicitud de cotización
- **Contacto**: Información de ubicación y contacto con mapa interactivo

### Funcionalidades por Página

#### Página de Inicio
- Visualización de noticias cargadas dinámicamente desde JSON
- Botón "Leer más" que despliega dropdown con información adicional (horario, ubicación, contacto)
- Contador animado de estadísticas que se activa al hacer scroll
- Sección de testimonios
- Call-to-action para galería y presupuesto

#### Galería de Vehículos
- **Búsqueda avanzada**: Campo de texto para buscar por nombre, marca o descripción del vehículo
- **Filtros independientes**:
  - Por marca (Porsche, Mercedes, BMW, Ferrari, Lamborghini, Audi, etc.)
  - Por tipo (Deportivo, SUV, Sedan)
  - Los filtros funcionan independientemente o combinados
- **Visualización**: Tarjetas con información detallada y etiquetas de destacado/nuevo
- **Lightbox optimizado**: 
  - Click en "Ver Detalles" para visualización completa
  - Scroll interno para contenido extenso
  - Muestra descripción técnica del vehículo
  - Navegación entre vehículos con flechas
- **Datos mostrados**: Marca, tipo, potencia, transmisión, precio y descripción completa

#### Formulario de Presupuesto
- **Campos validados**:
  - Nombre (2-50 caracteres, solo letras)
  - Apellidos (2-100 caracteres, solo letras)
  - Teléfono (9 dígitos, formato español)
  - Email (formato válido)
  - Tipo de servicio (selección requerida)
- **Opciones de servicio**:
  - Compra de vehículo
  - Financiación
  - Test Drive
  - Mantenimiento
  - Seguro
  - Valoración de vehículo usado
- **Presupuesto estimado**: Rango de precios calculado automáticamente
- **Validación en tiempo real**: Mensajes de error inmediatos
- **Botón de WhatsApp**: Contacto directo con ventas

#### Página de Contacto
- **Tarjetas de información**:
  - Teléfono de contacto
  - Dirección de email
  - Dirección física del showroom
  - Horario de atención
- **Mapa interactivo (Leaflet)**:
  - Geolocalización del usuario
  - Marcador personalizado del negocio con popup informativo
  - Cálculo de rutas con panel de instrucciones optimizado
  - Panel de rutas con scroll interno y estilo premium negro/dorado
  - Información de distancia y tiempo de viaje
- **Controles del mapa**:
  - Botón "Centrar Mapa"
  - Botón "Calcular Ruta"
- **Botón de WhatsApp**: Flotante con diseño acorde al sitio (negro/dorado)

## Configuración

### Modificar Datos de Vehículos

Editar el archivo `assets/data/vehiculos.json`:

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

### Modificar Noticias

Editar el archivo `assets/data/noticias.json`:

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

### Personalizar Información de Contacto

Modificar las constantes en `js/contacto.js`:

```javascript
const BUSINESS_COORDS = [40.42304, -3.70694]; // Latitud, Longitud
const BUSINESS_NAME = "Olympus Cars";
const BUSINESS_ADDRESS = "Calle de la Luna, 12<br>28004 Madrid, España";
const BUSINESS_PHONE = "+34 955 786 544";
```

### Ajustar Colores y Estilos

Modificar las variables CSS en `css/index.css`:

```css
:root {
    --color-primary: #000000;
    --color-secondary: #D4AF37;
    --color-background: #0A0A0A;
    /* ... más variables ... */
}
```

## Compatibilidad de Navegadores

| Navegador | Versión Mínima | Estado |
|-----------|----------------|--------|
| Chrome    | 90+            | Completo |
| Firefox   | 88+            | Completo |
| Safari    | 14+            | Completo |
| Edge      | 90+            | Completo |
| Opera     | 76+            | Completo |

**Nota**: El sitio utiliza características modernas de CSS y JavaScript. Se recomienda mantener los navegadores actualizados.

## Optimización y Rendimiento

- **Lazy Loading**: Imágenes cargadas bajo demanda
- **Debounce y Throttle**: Optimización de eventos de scroll y búsqueda
- **Minificación**: Archivos CSS y JS optimizados para producción
- **CDN**: Librerías externas servidas desde CDN para mejor caché

## Solución de Problemas

### Las imágenes no se muestran
- Verificar que las rutas en `vehiculos.json` sean relativas: `../assets/images/`
- Comprobar que las imágenes existan en el directorio `assets/images/`

### El mapa no carga
- Verificar conexión a internet (Leaflet requiere tiles de OpenStreetMap)
- Revisar la consola del navegador para errores de API
- Comprobar que Leaflet Routing Machine esté cargado correctamente

### El panel de rutas no se ve correctamente
- Verificar que los estilos CSS personalizados de Leaflet estén aplicados
- El panel tiene scroll interno si las instrucciones son muy largas
- Refrescar la página si el panel no se visualiza correctamente

### Los filtros no funcionan
- Asegurarse de que `vehiculos.json` tenga la estructura correcta con el campo "descripcion"
- Verificar que jQuery esté cargado correctamente
- Los valores de los filtros deben coincidir exactamente con los del JSON (case-sensitive)
- Las opciones "Todas las marcas" y "Todos los tipos" tienen value="" (string vacío)

### Errores de validación en el formulario
- Revisar las expresiones regulares en `js/presupuesto.js`
- Comprobar que todos los campos required tengan el atributo correcto

## Mantenimiento

### Actualización de Librerías

Verificar periódicamente las versiones de las librerías CDN utilizadas:

- jQuery: https://code.jquery.com/
- Font Awesome: https://cdnjs.com/libraries/font-awesome
- Leaflet: https://leafletjs.com/download.html

### Backup de Datos

Realizar copias de seguridad regulares de:
- `assets/data/vehiculos.json`
- `assets/data/noticias.json`
- Directorio `assets/images/`

## Contribución

Para contribuir al proyecto:

1. Realizar un fork del repositorio
2. Crear una rama para la nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realizar los cambios y commit (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

### Estándares de Código

- **HTML**: Utilizar etiquetas semánticas, indentación de 4 espacios
- **CSS**: Nomenclatura BEM, variables CSS para valores reutilizables
- **JavaScript**: ES6+, funciones puras cuando sea posible, comentarios concisos

## Licencia

Este proyecto es de uso educativo y demostrativo.

## Autor

Desarrollado por Saray Ortiz como trabajo práctico de JavaScript.

## Contacto

Para consultas o soporte relacionado con el proyecto:

- Email: sarayortizcordero4@gmail.com
- Teléfono: +34 675 84 36 55

## Changelog

### Versión 1.0.0 (2025-10-22)
- Lanzamiento inicial del proyecto
- Implementación de las 4 páginas principales
- Sistema de filtrado de vehículos con búsqueda avanzada
- Filtros independientes por marca y tipo
- Descripciones detalladas en lightbox de galería
- Lightbox optimizado con scroll interno y altura máxima
- Formulario de presupuesto con validación completa
- Mapa interactivo con Leaflet y cálculo de rutas
- Panel de rutas optimizado con diseño premium negro/dorado
- Botón de WhatsApp con estilo coherente al sitio
- Sistema de noticias dinámicas con dropdown
- Contador de estadísticas con animación al scroll
- Diseño responsivo completo
- Optimización de comentarios en código
- README.md con documentación profesional completa

---

**Última actualización**: 22 de octubre de 2025

