/* ============================================================
   TEMA CLARO / OSCURO

   El tema vive en el atributo `data-tema` del <html> (solo existe en oscuro:
   sin atributo, el sitio es claro) y se recuerda en localStorage. Los colores
   de cada tema están en tokens.css.

   Claro por defecto y SIN seguir `prefers-color-scheme`: es el tema con el que
   se presenta el sitio, y el oscuro aparece solo si alguien lo pide. Si algún
   día se quiere seguir al sistema, es leer ese media query en
   public/tema-inicial.js cuando no hay nada guardado.

   LA CLAVE LA COMPARTEN LOS TRES SITIOS. El hub, sistemas-gestion y el
   Curriculo viven en el mismo origen (seiler18.github.io), así que comparten
   localStorage: quien elige oscuro en uno lo encuentra oscuro en los otros
   dos. Por eso la clave lleva el nombre de la cuenta y no el del sitio. Si
   la cambias aquí, cámbiala en public/tema-inicial.js y en los otros dos.

   El destello: este módulo corre DESPUÉS de pintar, así que no puede ser él
   quien aplique el tema guardado al cargar. Lo hace public/tema-inicial.js,
   un script clásico y bloqueante en el <head>.
   ============================================================ */

const CLAVE = 'seiler18:tema'

/* Color de la barra del navegador en Android, por tema. Son los --bg de
   tokens.css: el <meta> no entiende variables CSS. */
const COLOR_BARRA = { claro: '#ffffff', oscuro: '#0a101c' }

const raiz = document.documentElement

export const temaActual = () => (raiz.dataset.tema === 'oscuro' ? 'oscuro' : 'claro')

function aplicar(tema) {
  if (tema === 'oscuro') raiz.dataset.tema = 'oscuro'
  else delete raiz.dataset.tema

  try {
    localStorage.setItem(CLAVE, tema)
  } catch {
    // Navegación privada o almacenamiento bloqueado: el tema cambia igual,
    // solo que no se recordará en la próxima visita.
  }

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLOR_BARRA[tema])
  rotular()
  // Para lo que pinta con colores leídos de las variables (el canvas de la
  // portada), que no se entera solo de que cambiaron.
  window.dispatchEvent(new CustomEvent('tema:cambio', { detail: tema }))
}

/* Todos los botones dicen lo que HARÁN, no lo que hay: el icono de un
   interruptor que muestra el estado actual se lee al revés la mitad de las
   veces. El icono lo elige el CSS según `data-tema`. */
function rotular() {
  const oscuro = temaActual() === 'oscuro'
  for (const b of document.querySelectorAll('[data-tema-boton]')) {
    b.setAttribute('aria-pressed', String(oscuro))
    b.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro')
    b.title = oscuro ? 'Modo claro' : 'Modo oscuro'
  }
}

function alternar(evento) {
  const nuevo = temaActual() === 'oscuro' ? 'claro' : 'oscuro'
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (quieto || !document.startViewTransition) {
    aplicar(nuevo)
    return
  }

  // El círculo sale del centro del botón y llega a la esquina más lejana.
  const r = evento.currentTarget.getBoundingClientRect()
  const x = r.left + r.width / 2
  const y = r.top + r.height / 2
  const radio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  raiz.style.setProperty('--tema-x', `${x}px`)
  raiz.style.setProperty('--tema-y', `${y}px`)
  raiz.style.setProperty('--tema-r', `${radio}px`)
  raiz.dataset.cambiandoTema = ''

  document
    .startViewTransition(() => aplicar(nuevo))
    .finished.finally(() => delete raiz.dataset.cambiandoTema)
}

export function initTema() {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLOR_BARRA[temaActual()])
  rotular()
  for (const b of document.querySelectorAll('[data-tema-boton]')) {
    b.addEventListener('click', alternar)
  }
}
