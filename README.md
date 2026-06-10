# mis-webs · jordanfly33

Monorepo con todos mis proyectos web.

---

## Proyectos

| Proyecto | Descripción | Stack | Estado |
|---|---|---|---|
| [`pulso/`](./pulso) | Portal de IA — comparador de modelos, herramientas, glosario | HTML + CSS + JS | ✅ Activo |
| [`kairos/`](./kairos) | Blog de herramientas IA — reviews, guías, comparativas | Next.js 14 · TypeScript · Tailwind | 🔧 En desarrollo |

---

## Estructura

```
mis-webs/
├── pulso/              ← Portal IA estático (listo para Hostinger / Vercel)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── lib/manifest.js ← editar aquí para actualizar contenido
│
├── kairos/             ← Blog Next.js (requiere Node.js 18+)
│   ├── src/
│   ├── package.json
│   └── next.config.mjs
│
└── README.md
```

---

## Despliegue rápido

### Pulso (estático)
```bash
# Vercel CLI
npx vercel --cwd pulso

# O arrastrar la carpeta pulso/ a Hostinger File Manager
```

### Kairos (Next.js)
```bash
cd kairos
npm install
npm run dev        # desarrollo en localhost:3000
npm run build      # build de producción
```

---

## Autor

**jordanfly33** · bruno.alvarez.maestre@gmail.com
