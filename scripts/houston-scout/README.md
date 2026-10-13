# Houston Location Scout

Herramienta en **https://www.unknowncreaturegames.com/houston-scout**: barrios reales de Houston en 3D (OpenStreetMap + three.js) dibujados como fondo de manga.

## Dónde vive

- `public/houston-scout/index.html` — la app completa (un solo archivo, three.js desde jsDelivr).
- `public/houston-scout/data/*.json` — una zona por archivo, descargada de Overpass.
- `next.config.ts` — rewrite `/houston-scout` → `/houston-scout/index.html`.
- `scripts/houston-scout/descargar_zona.py` — baja o actualiza una zona.

## Cómo funciona (resumen)

Inspirado en "Dokodemo Rokehan" (tools.oyasumi-gamedev.com/rokehan); esta es una implementación propia.

1. **Datos:** edificios, `building:part`, calles, vías de tren, parques, agua y árboles vía Overpass.
2. **3D:** cada edificio se extruye con `height` / `building:levels` (si no hay, se estima por tipo y tamaño). Si un contorno tiene partes adentro, se dibujan las partes (así salen bien TC Energy Center, Enterprise Plaza, Pennzoil). Techos `skillion`, `gabled` (4 vértices) y `pyramidal`/`hipped`.
3. **Freeways:** los puentes suben 7 m por `layer` y la altura baja al 5 % por los tramos conectados (rampas). Losa con barandales y columnas; el tren hace trestle.
4. **Vistas:** 4 pasadas ocultas (normales+profundidad, ID de objeto con ventanas, iluminación en blanco, color) y un shader final: líneas donde salta la profundidad, se dobla la superficie o cambia el objeto; la sombra se vuelve trama (puntos, rayado o cruzado).

## Agregar o actualizar una zona

```bash
cd web/scripts/houston-scout
python3 descargar_zona.py montrose 29.7442 -95.3906 450 "Montrose"
```

Después agrega la clave en `AREAS` dentro de `index.html` (nombre, lat, lon y, opcional, una vista `{ cam, look, lens, sun }` y el archivo de datos a usar), prueba en local y haz push a `main`.

Probar en local:

```bash
cd web/public/houston-scout && python3 -m http.server 8765
```

## Trampas conocidas

- **Overpass falla mucho** (504 / timeouts). El script rota espejos y reintenta; `maps.mail.ru` fue el que más respondió.
- **Vercel cachea un 404** si pides un JSON nuevo justo mientras cambia el deploy. Se arregla solo en segundos; verifica con `?v=123` si dudas.
- **Push al repo:** el repo es de `alowonka`. Si `gh` tiene activa otra cuenta, el push da 403.
- **Crédito obligatorio** al publicar imágenes: "© OpenStreetMap contributors".
