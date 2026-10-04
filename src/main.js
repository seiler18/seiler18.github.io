/* ============================================================
   PUNTO DE ENTRADA

   Tres responsabilidades, en este orden:
     1. estilos   → el orden de import IMPORTA (responsive.css va último)
     2. markup    → cada componente devuelve un string de HTML
     3. conducta  → scroll-spy, animaciones, filtros, formulario
   ============================================================ */

/* --- 1. Estilos ---------------------------------------------------------
   responsive.css SIEMPRE al final: sus overrides ganan por orden en la
   cascada, sin necesidad de un solo !important. Si lo subes de sitio,
   empezarás a necesitarlos. */
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/efectos.css'
import './styles/diapositivas.css'
import './styles/responsive.css'

/* --- 2. Markup --------------------------------------------------------- */
import { site } from './data/site.js'
import { mapa } from './site-map.js'
import { renderShell } from './components/shell.js'
import { renderFooter } from './components/footer.js'
import { initHero } from './components/sections/hero.js'
import { initTarjetas } from './components/sections/tarjetas.js'
import { initContacto } from './components/sections/contacto.js'

import { initBrillo, initMagnetico, initChispas } from './lib/efectos.js'
import { initScrollSpy } from './lib/scrollspy.js'
import { initReveal } from './lib/reveal.js'
import { initModales } from './lib/modal.js'
import { initTema } from './lib/tema.js'
import { initDiapositivas } from './lib/diapositivas.js'

const app = document.getElementById('app')

// El armazón elegido se anuncia en el <body>: es lo que usa el CSS para
// decidir entre columna lateral y barra superior sin duplicar selectores.
document.body.dataset.armazon = site.armazon

// Las secciones salen del mapa, en su orden. No hay lista que mantener
// aquí: añadir una fila a site-map.js la coloca en el DOM y en el menú.
app.innerHTML = `
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  ${renderShell()}
  <div class="app-main">
    <main id="contenido">
      ${mapa.map(s => s.render()).join('\n')}
    </main>
    ${renderFooter()}
  </div>
`

/* --- 3. Conducta ------------------------------------------------------- */

// El offset debe ser >= al alto de la barra fija (--topbar-h) para que una
// sección no se marque activa antes de asomar por debajo de ella.
const refrescarSpy = initScrollSpy({
  offset: 96,
  pausado: () => document.body.hasAttribute('data-diapositivas'),
})

initTema()       // interruptor claro / oscuro (el tema guardado ya lo puso public/tema-inicial.js)
initReveal()     // animaciones de entrada
initHero()       // ondas de la portada
initDiapositivas() // escritorio: secciones como diapositivas horizontales

// Efectos de interacción (ver src/lib/efectos.js). Todos se apagan con
// prefers-reduced-motion y los de puntero solo corren donde hay hover real.
initBrillo('.tarjeta, .destacado')
initMagnetico('.hero-btn')
initChispas('.hero-btn')
initModales()    // diálogos «ver más», si alguna sección los usa
initTarjetas()   // botoneras de filtro de las rejillas
initContacto()   // formulario: correo por FormSubmit o WhatsApp

// Al terminar de cargar fuentes e imágenes la página puede haber cambiado de
// alto: hay que recalcular qué sección está activa.
window.addEventListener('load', refrescarSpy)

// Filtrar una rejilla también cambia el alto del documento.
document.addEventListener('click', evento => {
  if (evento.target.closest('[data-filtro]')) setTimeout(refrescarSpy, 60)
})
