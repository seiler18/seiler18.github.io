# 0003 — Fondo de puntos animado en la portada

- **Fecha:** 2026-10-03
- **Estado:** completado, pendiente de visto bueno visual y de commit
- **Commits:** pendiente de commit

## Contexto

La portada del hub tenía luces que derivan y una rejilla CSS, pero se leía
plana al lado de la del Curriculo, que desde sus hitos 0019–0022 lleva una
matriz de puntos animada. Se pidió «algo similar».

## Qué se hizo

- `src/lib/fondo-dotField.js`: **copia** del port de DotField (React Bits)
  hecho en `Curriculo`. Canvas 2D, sin dependencias. Conserva el aviso de
  licencia en la cabecera.
- `src/components/sections/hero.js`: capa `.hero-puntos` e `initHero()`, que
  toma los colores de `--primario-claro` y `--acento`.
- `src/main.js`: llama a `initHero()` en la conducta.
- `src/styles/components.css`: `.hero-puntos`, con máscara radial.

## Decisiones y alternativas descartadas

- **El mismo efecto que el Curriculo**, no uno distinto: los dos sitios son del
  mismo autor y se leen como una familia. Los colores son los de la paleta del
  hub (azul y verde), no los del Curriculo (azul y cian), por token.
- **Se conservan las luces y la rejilla CSS.** Los puntos se suman; no
  sustituyen. Si el conjunto resulta recargado, lo primero que se quita es la
  rejilla (`.hero-fondo::after`).
- **`initHero` va en `hero.js` pero se llama desde `main.js`**: los componentes
  de este proyecto son funciones puras que no tocan el DOM, y montar un canvas
  es conducta, igual que `initTarjetas`.
- **Copia, no paquete compartido**: la licencia (MIT + Commons Clause) veta
  redistribuir el componente; compartir un paquete entre repos se parece
  demasiado. Cada sitio lleva su copia, dentro del sitio, con el aviso. Si el
  port cambia en uno, se actualiza a mano en el otro.

## Consecuencias

- Sin dependencias nuevas.
- Verificado: `npm run check` y `npm run build` pasan; Playwright contra
  `preview`: canvas montado, sin errores de consola, sin desborde horizontal.
  **Sin visto bueno visual del usuario.**
- Las reglas del `check` de este proyecto (colores, tamaños y duraciones
  literales) solo revisan CSS; el JS recibe los colores por token, como en
  Curriculo.

## Pendiente

- Visto bueno visual. Se ajusta con `opacidad` y `ondulacion` en `initHero`.
- Si se va a repetir en más sitios, la skill `fondos-react-bits` (WebMaker)
  ya tiene el procedimiento; este port es la segunda copia.
