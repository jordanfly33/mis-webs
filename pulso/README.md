# Pulso — Portal de Inteligencia Artificial

> **La IA, sin filtros.** · pulso.ai

---

## Estructura de archivos

```
pulso/
├── index.html              ← Página principal (un solo archivo HTML)
├── css/
│   └── style.css           ← Todos los estilos
├── js/
│   ├── app.js              ← Lógica principal (cursor, nav, hero, ticker, noticias)
│   ├── comparator.js       ← Comparador horizontal de modelos
│   ├── tools.js            ← Grid filtrable de herramientas
│   └── glossary.js         ← Acordeón del glosario con búsqueda
├── lib/
│   ├── manifest.js         ← ⭐ TODOS LOS DATOS DEL SITIO (editar aquí)
│   ├── gsap.min.js         ← (descargar — ver abajo)
│   └── ScrollTrigger.min.js ← (descargar — ver abajo)
├── img/
│   └── og.jpg              ← Imagen para redes sociales (1200×630 px)
├── .htaccess               ← Config Apache para Hostinger
└── README.md               ← Este archivo
```

---

## Cómo subir a Hostinger

1. Inicia sesión en [hPanel de Hostinger](https://hpanel.hostinger.com)
2. Ve a **Administrador de archivos** → carpeta `public_html`
3. Sube **todos los archivos y carpetas** manteniendo la estructura
4. ¡Listo! El sitio debería funcionar inmediatamente

No se necesita npm, Node.js ni ningún build step.

---

## Cómo editar el contenido

Todo el contenido está en **`lib/manifest.js`**. Edita ese único archivo con cualquier editor de texto (Notepad, VS Code, etc.).

### Cambiar modelos

Busca el array `models:` y edita los campos:
- `name`: nombre del modelo
- `company`: empresa
- `quote`: frase destacada
- `scores.mmlu / humaneval / math`: puntuaciones benchmark
- `pricing.input / output`: precios por millón de tokens
- `pulsoscore`: puntuación editorial (0–10)

### Añadir una herramienta

En el array `tools:`, copia un elemento existente y cambia:
```js
{ id: "nueva-herramienta", name: "Nombre", cat: "escritura", tagline: "Descripción breve", pulsoscore: 8.5, free: true, url: "https://...", emoji: "✨" }
```

Las categorías disponibles son: `escritura`, `codigo`, `imagen`, `video`, `audio`, `productividad`, `investigacion`, `agentes`

### Añadir un artículo

En el array `articles:`:
```js
{
  id: "slug-del-articulo",
  title: "Título del artículo",
  excerpt: "Resumen de 1-2 frases.",
  tag: "Análisis",       // Análisis, Guía, Opinión, Industria
  readTime: 8,           // minutos de lectura
  date: "2026-06-10",    // formato YYYY-MM-DD
  featured: false,       // true = tarjeta destacada (más grande)
  accent: "#6C63FF"      // color de acento para la tarjeta
}
```

### Añadir término al glosario

En el array `glossary:`:
```js
{ term: "Nuevo Término", def: "Definición clara en 2-3 frases." }
```

### Cambiar el ticker (barra de noticias)

Edita el array `ticker:` — cada string es una entrada del ticker animado.

---

## Descargar GSAP (para uso local sin CDN)

El sitio usa GSAP para la animación del comparador de modelos. Por defecto carga desde CDN. Para tenerlo offline:

1. Ve a [https://gsap.com/docs/v3/Installation/](https://gsap.com/docs/v3/Installation/)
2. Descarga `gsap.min.js` y `ScrollTrigger.min.js`
3. Colócalos en la carpeta `lib/`
4. En `index.html`, reemplaza las líneas CDN (al fondo del `<body>`) por:
   ```html
   <script src="lib/gsap.min.js?v=20260610" defer></script>
   <script src="lib/ScrollTrigger.min.js?v=20260610" defer></script>
   ```

---

## Cache busting

Cuando hagas cambios y subas archivos actualizados, incrementa el número de versión en las URLs de los scripts. Busca `?v=20260610` en `index.html` y cambia la fecha.

---

## Imagen OG (redes sociales)

Crea un archivo `img/og.jpg` de **1200×630 px** con el nombre/logo del sitio. Se muestra cuando alguien comparte el enlace en WhatsApp, Twitter/X, etc.

---

*Hecho con HTML puro + CSS + JS · Sin npm · Sin frameworks*
