import { site } from '../../data/site.js'
import { hero } from '../../data/hero.js'
import { montarWaves } from '../../lib/fondo-waves.js'

/* ============================================================
   HERO / PORTADA

   No usa el envoltorio seccion(): es a sangre completa, sin cabecera y con
   su propio fondo. Es la única sección que se salta ese molde.

   El `isolation: isolate` del .hero (styles/components.css) contiene sus
   capas decorativas de z-index negativo. Sin él se colarían por debajo del
   fondo de la página y no se verían.
   ============================================================ */

export function renderHero() {
  const botones = hero.acciones
    .map(
      (a, i) => `
        <a class="hero-btn ${i === 0 ? 'primario' : 'fantasma'}" href="${a.href}"
           ${a.externo ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          ${a.icon ? `<i class="${a.icon}" aria-hidden="true"></i>` : ''}${a.label}
        </a>
      `
    )
    .join('')

  const cinta = hero.cinta.length
    ? `
      <ul class="hero-cinta" aria-label="En cifras" data-anim="subir">
        ${hero.cinta
          .map(
            d => `
          <li>
            <span class="hero-cinta-dato">${d.dato}</span>
            <span class="hero-cinta-pie">${d.pie}</span>
          </li>
        `
          )
          .join('')}
      </ul>
    `
    : ''

  return `
    <header class="hero" id="inicio">
      <div class="hero-fondo" aria-hidden="true"></div>
      <!-- Ondas animadas (lib/fondo-waves.js). Las monta initHero() (conducta,
           no render: los componentes de aquí son funciones puras que no tocan
           el DOM). -->
      <div class="hero-ondas" aria-hidden="true"></div>

      <!-- SECUENCIA DE ENTRADA DE LA PORTADA. El atributo data-anim-secuencia
           escalona a los hijos 70ms cada uno (src/lib/reveal.js), y el orden
           del HTML es el orden en el que se quiere que se lean: antetítulo →
           nombre → lema → bajada → botones → cifras. Es lo mismo que se
           leería sin animación, solo que la página lo va marcando. Los seis a
           la vez —lo que había antes, sin animación ninguna en la portada—
           obligan al visitante a decidir por dónde empieza.

           OJO: en este comentario no puede haber comillas invertidas. Está
           DENTRO de un literal de plantilla, y una comilla invertida lo cierra
           ahí mismo: el archivo deja de compilar con un error que señala la
           línea siguiente y no dice nada del comentario. -->
      <div class="hero-contenido" data-anim-secuencia>
        ${hero.antetitulo ? `<p class="hero-antetitulo" data-anim="subir">${hero.antetitulo}</p>` : ''}
        <h1 class="hero-titulo" data-anim="subir">${site.nombre}</h1>
        ${site.lema ? `<p class="hero-lema" data-anim="subir">«${site.lema}»</p>` : ''}
        <p class="hero-bajada" data-anim="subir">${hero.bajada}</p>

        <div class="hero-acciones" data-anim="subir">${botones}</div>
        ${cinta}
      </div>

      <!-- Indicador de que hay más abajo. Se oculta en móvil (responsive.css):
           en una pantalla corta cae encima de los botones. -->
      <a class="hero-scroll" href="#${hero.siguiente}" aria-label="Ir a la siguiente sección">
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </a>
    </header>
  `
}

/**
 * Monta las ondas de la portada, tras inyectar el HTML en #app. Los colores
 * salen de --primario-claro y --acento, y la opacidad de --opacidad-ondas
 * (tokens.css), que es distinta en cada tema.
 *
 * Sustituye a la matriz de puntos el 2026-10-04: en el tema claro casi no se
 * veía. Las líneas cubren toda la portada, se leen sobre blanco y sobre
 * pizarra, y siguen siendo una textura técnica, no una figura.
 */
export function initHero() {
  const lienzo = document.querySelector('.hero-ondas')
  if (!lienzo) return
  let fondo = montar(lienzo)
  // El canvas guarda los colores que leyó al montarse: al cambiar de tema se
  // rehace con los nuevos (src/lib/tema.js avisa con este evento).
  window.addEventListener('tema:cambio', () => {
    fondo?.destruir()
    fondo = montar(lienzo)
  })
}

function montar(lienzo) {
  const css = getComputedStyle(document.documentElement)
  return montarWaves(lienzo, {
    colorA: css.getPropertyValue('--primario-claro').trim() || '#2563eb',
    colorB: css.getPropertyValue('--acento').trim() || '#0e7490',
    opacidad: parseFloat(css.getPropertyValue('--opacidad-ondas')) || 0.5,
  })
}
