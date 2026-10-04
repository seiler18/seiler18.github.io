# 0005 — Paleta «Acero» y tema claro / oscuro

- **Fecha:** 2026-10-04
- **Estado:** completado
- **Commits:** `9082ff4`

## Contexto
El hub llevaba la paleta «Núcleo» (índigo eléctrico, lavanda y aguamarina neón
sobre casi negro), compartida con sistemas-gestion. Jesús la encontró
demasiado llamativa para su perfil —implementador ISO que aplica IA a los
procesos— y pidió blanco y azul, sobrio y tecnológico, en sus tres sitios
personales, con modo claro y oscuro como en Seregenera.

## Qué se hizo
El mismo cambio que el hito 0003 de `sistemas-gestion` (misma plantilla, mismos
archivos), que tiene el detalle completo:
- `src/styles/tokens.css`: paleta «Acero», tema claro en `:root` y oscuro en
  `:root[data-tema="oscuro"]`; sombras y contornos por tema.
- `src/lib/tema.js` + `public/tema-inicial.js`: interruptor y anti-destello.
- `src/components/shell.js`: botón luna/sol en la barra.
- `src/components/sections/hero.js`: el canvas de puntos se rehace al cambiar
  de tema.
- CSS de componentes sin supuestos de fondo oscuro; `check-integrity.js` mira
  también `public/`.

Propio del hub:
- **`configurador/`** (página estática, no pasa por Vite): su piel `--ui-*`
  pasa a «Acero» con bloque oscuro, y carga `../tema-inicial.js`. **No tiene
  botón**: sigue lo que el visitante eligió en el hub. Los colores de error
  (`#f87171`, `#fca5a5`) pasaron a `--ui-error` / `--ui-error-texto` porque en
  claro no se leían. Las paletas `--p-*` que elige el cliente no se tocaron.

## Decisiones y alternativas descartadas
- Ver hito 0003 de `sistemas-gestion` (claro por defecto, clave compartida
  `seiler18:tema` entre los tres sitios del dominio, archivo aparte por la
  CSP).
- **Sin botón en el configurador**: no puede importar `src/lib/tema.js` (no
  lo procesa Vite) y duplicarlo era una segunda copia que mantener. Quien
  llega al configurador viene del hub, donde ya eligió.

## Consecuencias
- Un color nuevo en `tokens.css` que no salga de `color-mix()` necesita su
  pareja en el bloque oscuro.
- Si cambian los colores base, cambian también los `--ui-*` de
  `configurador/configurador.css` (están copiados a mano).

## Pendiente
- `assets/img/og.jpg` sigue siendo una captura de la paleta anterior.
- Llevar el tema claro/oscuro a la plantilla de WebMaker.
- Visto bueno de Jesús en un navegador real.
