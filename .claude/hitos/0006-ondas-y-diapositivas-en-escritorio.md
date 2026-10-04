# 0006 — Ondas en la portada y el sitio como diapositivas en escritorio

- **Fecha:** 2026-10-04
- **Estado:** completado
- **Commits:** pendiente de commit

## Contexto
El mismo pedido y la misma decisión que en `sistemas-gestion` (su hito
0004, que tiene el detalle completo). En el tema claro, la matriz de puntos
de la portada casi no se veía, y la página se sentía como un scroll infinito.
Jesús eligió el fondo **Waves** y **diapositivas horizontales solo en
escritorio**, con una transición distinta al entrar cada una.

## Qué se hizo
Los mismos archivos que en sistemas-gestion, copiados tal cual:
- `src/lib/fondo-waves.js` sustituye a `src/lib/fondo-dotField.js` (borrado).
  La portada usa `.hero-ondas`, con la máscara que atenúa las líneas detrás
  del texto (más ancha en móvil).
- `src/lib/diapositivas.js` + `src/styles/diapositivas.css`: a partir de
  992px, cuatro diapositivas (Inicio, En qué trabajo, Proyectos, Contacto).
  Transiciones: profundidad, deslizar, barrido y cubo.
- `src/lib/scrollspy.js` con la opción `pausado`; tokens nuevos en
  `tokens.css`; `diapositivas.css` en la revisión del check.

El configurador (`configurador/`) es una página aparte y no cambia.

## Decisiones y alternativas descartadas
Ver hito 0004 de sistemas-gestion: solo escritorio, diapositivas fuera del
cuadro e `inert`, rueda agrupada en gestos, una transición fija por destino,
señal de «hay más abajo» y la lectura de la duración en `s` o `ms` (el build
reescribe `760ms` como `.76s`).

Propio del hub: con solo cuatro secciones, las cuatro primeras transiciones
del catálogo bastan; cortina e iris quedan para cuando haya más secciones.

## Ajustes tras la revisión de Jesús (mismo día)
- **El menú en móvil marcaba la sección anterior** al tocar un enlace (ya
  pasaba antes de este trabajo). El salto a un ancla sumaba dos márgenes de
  80px: `scroll-padding-top` en el `<html>` y `scroll-margin-top` en cada
  `.section`. La sección aterrizaba a 160px, por debajo de la línea de
  lectura del scroll-spy (96px). Se quitó el de las secciones; comprobado
  enlace por enlace en móvil.
- **Capas del fondo de la portada fijas** en modo diapositivas
  (`.hero-fondo`, `.hero-ondas`): absolutas medían una pantalla y, en una
  ventana baja, al desplazar la portada dejaban una franja sin fondo (se vio
  en el Curriculo). Su caja pasa a ser `#contenido`.
- **`assets/img/og.jpg` nuevo**: captura de la portada a 1200×630 en el tema
  claro, sin la píldora. La anterior era de la paleta «Núcleo».

## Consecuencias
- En escritorio `<main>` es `position: fixed` y la página no tiene scroll
  propio; cada diapositiva desplaza el suyo.
- `diapositivas.js`, `fondo-waves.js` y `diapositivas.css` son idénticos a
  los de sistemas-gestion: un arreglo en uno se copia al otro.

## Pendiente
- Visto bueno de Jesús en un navegador real.
