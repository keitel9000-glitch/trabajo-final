# Trabajo Final - SPA con IA de Emociones (Español)

Esta aplicación es una Single Page Application (SPA) construida con Vite + React + Tailwind CSS que consume una API pública (por defecto `https://rickandmortyapi.com/api`) y que integra un módulo de Inteligencia Artificial que clasifica emociones en texto en español ejecutándose únicamente en el navegador (TensorFlow.js).

Características principales
- Rutas: `/` (Inicio), `/catalogo` (Catálogo), `/detalle/:id` (Detalle).
- Catálogo con buscador, filtros, paginación infinita (20 por página) y manejo de estados (cargando, vacío, error).
- Favoritos guardados en `localStorage` y accesibles desde la UI.
- Módulo de IA de emociones: tokenización simple, vectorización (bolsa de palabras), red neuronal densa entrenada en el cliente y persistida en IndexedDB.
- Accesibilidad básica: roles, labels, navegación por teclado y contraste razonable.

Repositorio
- Estructura de archivos clave:
	- `index.html`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
	- `/src`: código fuente (componentes, páginas, servicios, IA, contexto)
	- `/server/proxy.js`: servidor Express opcional para evitar CORS durante desarrollo

Requisitos previos
- Node.js (recomendado LTS) y npm

Instalación y ejecución local
1) Clonar el repositorio

```bash
git clone <repo-url>
cd trabajo-final
```

2) Instalar dependencias

```bash
npm install
```

3) Copiar variables de entorno

```bash
cp .env.example .env
# Ajustar VITE_API_URL si se usa proxy: ejemplo http://localhost:8787/proxy
```

4) Ejecutar en desarrollo

```bash
npm run dev
```

5) (Opcional) Iniciar el proxy CORS

```bash
npm run server
# Esto levanta Express en el puerto 8787 y reenvía /proxy -> API objetivo
```

Build y preview

```bash
npm run build
npm run preview
```

Estructura relevante en `/src`
- `src/router` : define rutas
- `src/layouts` : layout principal con header/nav/footer
- `src/pages` : `Inicio.jsx`, `Catalogo.jsx`, `Detalle.jsx`
- `src/components` : UI (Buscador, Filtros, TarjetaItem, SentimientoCaja, etc.)
- `src/services/api.js` : funciones `listarRecursos` y `obtenerDetalle` que usan `import.meta.env.VITE_API_URL`
- `src/services/favoritos.js` : persistencia en `localStorage`
- `src/context/FavoritosContext.jsx` : proveedor global de favoritos
- `src/ai` : `vectorizador.js`, `datos_emociones.json`, `emociones.js` (TensorFlow.js)

API externa
- La URL base de la API se lee desde `import.meta.env.VITE_API_URL`.
- Por defecto en `.env.example`: `VITE_API_URL=https://rickandmortyapi.com/api`.
- `src/services/api.js` implementa reintentos exponenciales (máx 3) y acepta `signal` de `AbortController`.

IA de emociones (detalles técnicos)
- Dataset: `src/ai/datos_emociones.json` (mini dataset para entrenamiento rápido en el cliente).
- Vectorización: `src/ai/vectorizador.js` tokeniza y genera bolsa de palabras (count vectorizer simple).
- Modelo: red neuronal densa con una capa oculta y salida `softmax` creada y entrenada en el navegador usando `@tensorflow/tfjs`.
- Persistencia: el modelo se guarda en `IndexedDB` usando `tf.io.browserIndexedDB` (`indexeddb://modelo_emociones_v1`) y el vocabulario en `localStorage` para evitar reentrenar en cada carga.
- API pública del módulo:
	- `cargarModelo()` : carga desde IndexedDB o entrena la primera vez.
	- `predecirEmocion(texto)` : devuelve `{ etiqueta, confianza, vector }`.
	- `limpiarTexto(texto)` y funciones de tokenización en `vectorizador.js`.

Limitaciones
- El dataset incluido es reducido para entrenamientos rápidos; la precisión es limitada. Para producción conviene entrenar con un dataset amplio y/o exportar un modelo preentrenado.
- Entrenar en el navegador puede consumir CPU y tiempo; el modelo se persiste para evitar reentrenamientos repetidos.

Accesibilidad y diseño
- Uso de roles y `aria-label` en controles importantes.
- Contrastes y tamaños de fuente pensados para legibilidad.

Despliegue
- Netlify y Vercel están configurados para servir la SPA (`netlify.toml`, `vercel.json`).
- Subir a GitHub y conectar a Netlify/Vercel hará deploy automático.

Scripts npm
- `npm run dev` — Inicia Vite en modo desarrollo.
- `npm run build` — Construye la app para producción.
- `npm run preview` — Sirve la build localmente.
- `npm run lint` — Ejecuta ESLint.
- `npm run format` — Ejecuta Prettier.
- `npm run server` — Inicia proxy Express opcional en `server/proxy.js`.

Licencia
- Código de ejemplo, libre para uso educativo.

Contacto
- Proyecto creado como entrega de ejemplo.
