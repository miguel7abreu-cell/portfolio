# Portfolio — Senior/Lead BA + BI

Portfolio profesional one-page para roles Senior/Lead Business Analyst y BI Analytics.

## Stack
- HTML5 semántico + CSS3 custom properties
- Vanilla JS (sin frameworks)
- Google Fonts: Manrope + DM Sans
- Sin dependencias pesadas

## Estructura
```
portfolio-site/
  index.html              ← One-page principal
  assets/
    css/styles.css        ← Todos los estilos
    js/main.js            ← Interactividad
    img/                  ← Imágenes (og-cover, favicon, logos)
  README.md
```

## Placeholders a reemplazar
Busca y reemplaza en `index.html` y `main.js`:

| Placeholder     | Descripción                                 |
|-----------------|---------------------------------------------|
| `{NOMBRE}`      | Tu nombre completo                          |
| `{NOM}`         | Versión corta del nombre (para el logo nav) |
| `{EMAIL}`       | tu@email.com                                |
| `{LINKEDIN}`    | tu-usuario (sin la URL)                     |
| `{GITHUB}`      | tu-usuario-github                           |
| `{CV_PDF}`      | assets/img/cv-nombre.pdf                    |
| `{EMPRESA_1}`   | Nombre empresa actual (o genérico)          |
| `{EMPRESA_2}`   | Nombre empresa anterior                     |
| `{EMPRESA_3}`   | Nombre empresa anterior                     |
| `{UNIVERSIDAD}` | Universidad del master                      |
| `{UNIVERSIDAD_2}` | Universidad del grado                     |

## Deploy en GitHub Pages

1. Crea un repositorio en GitHub (puede ser privado o público)
2. Sube todos los archivos al repositorio
3. Ve a **Settings → Pages**
4. En "Source" selecciona `main` branch y carpeta `/ (root)`
5. Guarda. En ~2 minutos tu sitio estará en:
   `https://TU_USUARIO.github.io/NOMBRE_REPO/`

### Dominio personalizado (opcional)
1. En Settings → Pages → Custom domain: escribe `tudominio.com`
2. En tu proveedor DNS agrega un registro CNAME:
   - Host: `www` → Value: `TU_USUARIO.github.io`
3. O un registro A apuntando a las IPs de GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

## Formulario de contacto
El formulario viene en modo demo (muestra mensaje de éxito). Para activarlo:

**Opción A — Formspree (gratis, recomendado):**
1. Crea cuenta en formspree.io
2. Crea un form y copia tu endpoint
3. En `index.html` cambia: `<form ... action="https://formspree.io/f/TU_ID" method="POST">`
4. Quita el `e.preventDefault()` en `main.js` o redirige con Formspree

**Opción B — EmailJS (gratis):**
1. Crea cuenta en emailjs.com
2. Configura un servicio de email
3. En `main.js`, reemplaza el handler del form con la llamada a emailjs.send()

## Personalización rápida

### Cambiar color acento
En `assets/css/styles.css`, línea ~10:
```css
--accent: #1A6EFF;  /* Azul eléctrico (default) */
/* Alternativa verde datos: #00B37E */
```

### Agregar más case studies
En `assets/js/main.js`, dentro del objeto `caseStudies`, copia la estructura de `cs-1` y crea `cs-4`.
En `index.html`, copia un `.cs-card` y cambia el `data-modal="cs-4"`.

### Agregar logos reales de clientes
Reemplaza los `.client-logo` con tags `<img>` apuntando a SVGs de logos en `assets/img/`.
Usa logos en versión monocromática blanca/gris para mantener la estética.
