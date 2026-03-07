# Portfolio — Senior/Lead BA + BI

## Estructura de archivos

```
portfolio/
├── index.html              ← HTML principal (edita textos aquí)
├── assets/
│   ├── css/
│   │   └── styles.css      ← Estilos (colores, tipografía, layout)
│   ├── js/
│   │   └── main.js         ← Interactividad + contenido de modales
│   └── img/
│       ├── og-cover.png    ← Imagen para compartir en redes (1200×630px)
│       ├── favicon.svg     ← Ícono del sitio
│       ├── cv-nombre.pdf   ← Tu CV descargable
│       ├── logos/          ← Logos de clientes (SVG monocromo)
│       │   ├── empresa-a.svg
│       │   └── empresa-b.svg
│       ├── bi-project-1.png  ← Screenshot de dashboard (opcional)
│       ├── bi-project-2.png
│       └── bi-project-3.png
└── README.md
```

---

## Placeholders a reemplazar

Busca y reemplaza estos textos en `index.html` y `main.js`:

| Placeholder       | Dónde           | Valor de ejemplo              |
|-------------------|-----------------|-------------------------------|
| `{NOMBRE}`        | index.html      | Miguel Abreu                  |
| `{NOM}`           | index.html      | Miguel (versión corta navbar) |
| `{EMAIL}`         | index.html      | miguel@email.com              |
| `{LINKEDIN}`      | index.html      | miguelabreu (solo el usuario) |
| `{GITHUB}`        | index.html      | miguel7abreu-cell             |
| `{CV_PDF}`        | index.html      | cv-miguel-abreu.pdf           |
| `{EMPRESA_1}`     | index.html      | Nombre genérico empresa actual|
| `{EMPRESA_2}`     | index.html      | Nombre empresa anterior       |
| `{EMPRESA_3}`     | index.html      | Nombre empresa anterior       |
| `{UNIVERSIDAD}`   | index.html      | Universidad del master        |
| `{UNIVERSIDAD_2}` | index.html      | Universidad del grado         |

---

## Agregar imágenes

### Logos de clientes
Reemplaza los `<div class="client-logo">` en `index.html` por:
```html
<div class="client-logo anim anim-delay-1">
  <img src="assets/img/logos/empresa-a.svg" alt="Empresa A" loading="lazy">
</div>
```
- Formato recomendado: **SVG**
- El CSS ya aplica `filter: brightness(0) invert(1)` para que queden blancos sobre fondo oscuro
- Tamaño: 130×64px de área de display (el objeto-fit se encarga)

### Screenshots de dashboards (BI Projects)
Reemplaza el bloque de emoji + barras por una imagen real:
```html
<div class="bi-card-preview">
  <img src="assets/img/bi-project-1.png" alt="Dashboard morosidad" loading="lazy">
</div>
```
- Formato: PNG o WebP
- Tamaño recomendado: **800×400px mínimo**
- El CSS hace `object-fit: cover` para adaptar al área de 160px de alto

### OG Cover (redes sociales)
- `assets/img/og-cover.png` → **1200×630px**
- Incluye tu nombre, título y el acento azul del sitio

---

## Deploy en GitHub Pages

1. Sube **toda la carpeta `portfolio/`** al repo (o el contenido directamente en la raíz)
2. En el repo → **Settings → Pages**
3. Source: `main` branch, carpeta `/ (root)` (si subiste a la raíz)
   o `/ (root)` y apuntas al directorio si lo subiste como subcarpeta
4. Guarda → en ~2 minutos estará en: `https://{GITHUB}.github.io/portfolio/`

### Dominio propio (opcional)
Añade un archivo `CNAME` en la raíz del repo con solo tu dominio:
```
tudominio.com
```
Y configura en tu DNS un registro CNAME: `www` → `{GITHUB}.github.io`

---

## Conectar el formulario de contacto

El formulario actualmente hace demo (muestra mensaje de éxito). Para activarlo con **Formspree** (gratis):

1. Crea cuenta en [formspree.io](https://formspree.io)
2. Crea un nuevo form → copia el endpoint (ej: `https://formspree.io/f/xabc1234`)
3. En `index.html`, agrega `action` y `method` al form:
```html
<form class="contact-form" id="contactForm"
      action="https://formspree.io/f/xabc1234"
      method="POST" novalidate>
```
4. En `main.js`, dentro de `initForm()`, quita el `e.preventDefault()` y deja que el form envíe normalmente, o usa el fetch API de Formspree.

---

## Editar Case Studies

Los textos de los modales están en `assets/js/main.js`, en el objeto `data` dentro de `initModal()`. Cada case study tiene esta estructura:

```js
'cs-1': {
  type:         'Tipo visible en el modal',
  title:        'Título del case study',
  context:      'Párrafo de contexto...',
  problem:      'Párrafo del problema...',
  approach:     ['Paso 1...', 'Paso 2...', 'Paso 3...'],
  deliverables: ['Entregable 1...', 'Entregable 2...'],
  results:      [
    { number: '62%', label: 'descripción' },
    { number: '3x',  label: 'descripción' },
  ],
  tradeoff:     'Texto del trade-off...',
},
```

Para agregar un cuarto case study:
1. Agrega `'cs-4': { ... }` en el objeto `data` de `main.js`
2. Agrega una nueva `<article class="cs-card" data-modal="cs-4">` en `index.html`

---

## Personalización rápida

### Cambiar color acento
En `assets/css/styles.css`, línea 13:
```css
--accent: #1A6EFF;   /* Azul eléctrico (default) */
/* Alternativa verde datos: --accent: #00B37E; */
```

### Ocultar sección Awards
Si no quieres mostrar reconocimientos, en `index.html` agrega al section:
```html
<section id="awards" style="display:none">
```
