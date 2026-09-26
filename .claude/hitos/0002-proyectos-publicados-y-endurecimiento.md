# 0002 — Proyectos publicados y endurecimiento

- **Fecha:** 2026-09-26
- **Estado:** completado
- **Commits:** `c0e95e4` y el de la sección `proyectos`

## Contexto

El hub enseñaba qué se ofrece (las cuatro puertas) pero no qué está hecho.
Regenera Market, VentasMaker y el sitio de Opciones S.A. no aparecían en
ningún sitio, y CEDER solo como un enlace dentro del texto de una tarjeta.

En la misma jornada se pasó una auditoría de seguridad por todos los
repositorios del portafolio.

## Qué se hizo

- `src/data/proyectos.js` + fila en `src/site-map.js` — sección nueva
  «Proyectos publicados», entre las puertas y el contacto: Regenera Market,
  VentasMaker, Opciones S.A. (maqueta) y CEDER SpA.
- `configurador/configurador.js` — `escapar()` antes de pintar en la vista
  previa lo que escribe el visitante. Era self-XSS (nada entra por la URL ni
  se guarda) y la CSP ya impedía ejecutar código, pero un nombre con `&` o
  `<` se pintaba mal.
- `index.html` — la CSP pierde `'unsafe-inline'` y el CDN en `script-src`:
  Font Awesome es una hoja de estilo y no hay scripts en línea.
- `scripts/check-integrity.js` — revisa también `configurador/index.html`
  (`PAGINAS_SUELTAS`) y falla si hay un script en línea que la CSP bloquearía.
- `.github/workflows/deploy.yml` — Node 24; Node 20 ya no recibe parches.

## Decisiones y alternativas descartadas

**Sección aparte, no puertas nuevas.** Añadir los proyectos como tarjetas de
«Cuatro puertas» mezclaba servicios con casos y rompía el título. Son dos
preguntas distintas de quien llega: qué haces y qué has hecho.

**Opciones enlaza a la maqueta, no al repo.** El repositorio es privado —es el
sitio de un cliente— y su historial arrastra un volcado de base de datos que
no debe publicarse. La maqueta de GitHub Pages es lo que se enseña.

**Regenera Market sin mención a coautoría**, por indicación de Jesús.

## Pendiente

- Revisión visual en navegador de la sección nueva y de la CSP (consola sin
  avisos, iconos y tipografías cargando).
