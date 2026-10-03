# 0004 — Efectos de interacción en el hub

- **Fecha:** 2026-10-03
- **Estado:** completado, pendiente de visto bueno visual y de commit
- **Commits:** pendiente de commit

## Contexto

Mismos efectos que el Curriculo (su hito 0023), en la portada y las fichas del
hub.

## Qué se hizo

- `src/lib/efectos.js`: **copia** del módulo del Curriculo. Contiene también
  los contadores, que aquí no se usan (`hero.cinta` está vacía): se dejó la
  copia idéntica para poder sincronizarla sin pensar.
- `src/styles/efectos.css`, importado entre `components.css` y
  `responsive.css`, y **añadido a `CSS_REVISADOS`** de `check-integrity.js`: así
  las reglas de colores, tamaños y duraciones literales también valen para él.
- Brillo del cursor en `.tarjeta` y `.destacado`; imán y chispas en
  `.hero-btn`; destello que recorre `.hero-titulo`.
- Tokens nuevos en `tokens.css`: `--brillo-cursor`, `--brillo-texto`,
  `--blanco-titulo`, `--ciclo-brillo`, `--espera-brillo`.

## Decisiones y alternativas descartadas

- **Título por palabras: probado y descartado aquí.** El nombre lleva degradado
  recortado al texto más un contorno con `filter`; con las palabras como
  `inline-block` animadas, el nombre quedó **invisible**. Funciona solo en
  títulos de color liso. Está anotado en `efectos.css` para no repetirlo.
- **El destello usa `background-image` suelto**, no `background`, por el mismo
  motivo que en el Curriculo (el atajo reinicia el `background-clip`).
  Excepción deliberada a la regla 12 («solo transform y opacity»).
- **`check` falló al primer intento** por una duración literal (`1.6s`) en el
  `animation`: se convirtió en el token `--espera-brillo`. La disciplina hizo
  su trabajo.

## Consecuencias

- Sin dependencias nuevas.
- Verificado con Playwright contra `preview`: imán 9 px, 8 chispas, brillo con
  `--mx` y sin errores de consola. **Sin visto bueno visual del usuario.**

## Pendiente

- Visto bueno visual y prueba en móvil real.
- Si se cambia `efectos.js` en un sitio, hay que copiarlo al otro a mano.
