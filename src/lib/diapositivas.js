/* ============================================================
   DIAPOSITIVAS — el sitio como una presentación horizontal

   SOLO EN ESCRITORIO (≥ 992px, la misma frontera en la que el menú baja a la
   cinta inferior). En el teléfono las secciones miden dos o tres pantallas
   cada una, y una diapositiva que además hace scroll hacia abajo obliga a
   decidir entre dos gestos que compiten. Ahí el sitio sigue siendo una
   página vertical, con las entradas de reveal.js. Si la ventana cruza la
   frontera, el modo se enciende o se apaga sin recargar.

   Cada hijo de <main id="contenido"> con id (la portada y cada sección de
   site-map.js) pasa a ser una diapositiva a pantalla completa. Solo una está
   activa; el resto queda fuera del cuadro e `inert` (ni foco ni lector de
   pantalla). Si una sección no cabe en la pantalla, hace scroll por dentro.

   CÓMO SE PASA DE UNA A OTRA
     · menú, botones del hero y cualquier enlace #ancla de la página;
     · la píldora inferior: contador, una marca por diapositiva y flechas;
     · teclado: ← → siempre; AvPág / RePág / espacio cuando la diapositiva ya
       no tiene más contenido en esa dirección; Inicio / Fin;
     · rueda o trackpad: horizontal siempre; vertical al llegar al borde;
     · deslizar el dedo en una tablet.
   El historial del navegador sigue a la diapositiva (#servicios…): los
   enlaces compartidos abren directamente en la suya.

   LA RUEDA, que es lo delicado. Un trackpad manda decenas de eventos por
   gesto, y con inercia sigue mandándolos un segundo después de soltar. Si
   cada evento contara, un solo gesto atravesaría tres diapositivas. Por eso
   se agrupan en GESTOS (eventos separados por menos de 220ms) y un gesto
   puede hacer una sola cosa: o desplazar el contenido de la diapositiva, o
   cambiar de diapositiva. Al llegar al final del contenido hay que soltar y
   volver a girar para pasar a la siguiente: sin eso, la inercia del scroll
   cambiaba de página sin que nadie lo pidiera.

   TRANSICIONES. Una distinta según la diapositiva de destino (la portada
   siempre entra igual, la de servicios siempre igual…), así cada página
   tiene su forma de llegar y no se lee como un carrusel. Van en
   styles/diapositivas.css y respetan el sentido: hacia atrás, al revés.
   Con prefers-reduced-motion el cambio es instantáneo.
   ============================================================ */

const CONSULTA = '(min-width: 992px)'
const TRANSICIONES = ['profundidad', 'deslizar', 'barrido', 'cubo', 'cortina', 'iris']
const PAUSA_GESTO = 220 // ms sin eventos de rueda para dar un gesto por terminado
const UMBRAL_DEDO = 60  // px de desplazamiento horizontal para que un toque cuente
/* Lo último de cada diapositiva es el hueco que reserva para la píldora
   (--diapo-hueco-pie, 6rem). Si lo único que queda por bajar son unos pocos
   píxeles de ese hueco, el contenido ya se ve entero: no se señala «hay más»
   ni hace falta un gesto de rueda para recorrer relleno vacío. */
const HOLGURA_PIE = 40

export function initDiapositivas() {
  const main = document.getElementById('contenido')
  if (!main) return
  const diapos = [...main.children].filter(el => el.id)
  if (diapos.length < 2) return

  const medio = window.matchMedia(CONSULTA)
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)')
  const pie = document.querySelector('.pie')
  const sitioPie = pie && { padre: pie.parentElement, siguiente: pie.nextSibling }

  const nombre = d =>
    document.querySelector(`[data-spy-link="${d.id}"] .nav-largo`)?.textContent.trim() ||
    d.querySelector('h1, h2')?.textContent.trim() ||
    d.id

  let activa = 0
  let transicion = null
  let controles = null
  let ctl = null // AbortController de los oyentes del modo

  const indiceDe = id => {
    const el = id ? document.getElementById(id) : null
    const d = el?.closest('#contenido > [id]')
    return d ? diapos.indexOf(d) : -1
  }

  // En segundos O en milisegundos: el minificador del build reescribe
  // `760ms` como `.76s`, y leído como milisegundos la red de seguridad de
  // abajo cortaba cada transición a los 150ms.
  const duracion = () => {
    const v = getComputedStyle(main).getPropertyValue('--diapo-duracion').trim()
    const n = parseFloat(v)
    if (!n) return 700
    return v.endsWith('ms') ? n : n * 1000
  }

  /* ----------------------- Estado visible ----------------------- */

  function marcar() {
    const id = diapos[activa].id
    for (const l of document.querySelectorAll('[data-spy-link]')) {
      const es = l.dataset.spyLink === id
      l.classList.toggle('is-active', es)
      es ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')
    }
    diapos.forEach((d, i) => (d.inert = i !== activa))
    if (!controles) return
    controles.querySelector('.diapo-num').textContent = String(activa + 1).padStart(2, '0')
    controles.querySelector('.diapo-nombre').textContent = nombre(diapos[activa])
    controles.querySelectorAll('[data-ir]').forEach((b, i) => {
      b.classList.toggle('is-active', i === activa)
      i === activa ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current')
    })
    controles.querySelector('[data-paso="-1"]').disabled = activa === 0
    controles.querySelector('[data-paso="1"]').disabled = activa === diapos.length - 1
  }

  /* ¿Queda contenido por debajo en la diapositiva activa? Se marca en ella
     (desvanecido inferior) y en la píldora (flecha ↓). Sin esa señal, una
     sección que no cabe en la pantalla parece terminar donde la corta el
     borde, y el visitante pasa a la siguiente sin haberla leído entera. */
  function senalarMas() {
    const hay = puedeDesplazar(1)
    diapos[activa].classList.toggle('con-mas', hay)
    controles?.classList.toggle('hay-mas', hay)
  }

  function terminar() {
    if (!transicion) return
    const { desde, hacia, temporizador } = transicion
    clearTimeout(temporizador)
    desde.classList.remove('saliendo')
    hacia.classList.remove('entrando')
    delete main.dataset.trans
    delete main.dataset.dir
    transicion = null
  }

  /**
   * @param {number} destino
   * @param {Object} [o]
   * @param {false|'push'|'replace'} [o.historial='push']
   * @param {boolean} [o.alFinal=false]  entrar con el contenido al fondo
   *        (al retroceder con la rueda, para que la lectura siga donde iba)
   */
  function ir(destino, { historial = 'push', alFinal = false } = {}) {
    destino = Math.max(0, Math.min(diapos.length - 1, destino))
    if (destino === activa && !transicion) return
    terminar()

    const desde = diapos[activa]
    const hacia = diapos[destino]
    const dir = destino > activa ? 1 : -1
    activa = destino

    hacia.scrollTop = alFinal ? hacia.scrollHeight : 0
    hacia.classList.add('activa')
    desde.classList.remove('activa')

    if (historial) {
      const hash = `#${hacia.id}`
      if (location.hash !== hash) history[historial === 'push' ? 'pushState' : 'replaceState'](null, '', hash)
    }
    marcar()
    senalarMas()
    // El foco va a la diapositiva: así las flechas ↑ ↓ y AvPág desplazan SU
    // contenido, y un lector de pantalla anuncia que cambió la página.
    hacia.focus({ preventScroll: true })

    if (quieto.matches) return

    main.dataset.trans = TRANSICIONES[destino % TRANSICIONES.length]
    main.dataset.dir = dir > 0 ? 'adelante' : 'atras'
    main.style.setProperty('--dir', dir)
    desde.classList.add('saliendo')
    hacia.classList.add('entrando')
    transicion = {
      desde,
      hacia,
      // Red de seguridad: con la pestaña oculta `animationend` puede no
      // llegar nunca, y la diapositiva saliente se quedaría visible debajo.
      temporizador: setTimeout(terminar, duracion() + 150),
    }
  }

  /* ----------------------- Controles ----------------------- */

  function crearControles() {
    const nav = document.createElement('nav')
    nav.className = 'diapo-controles'
    nav.setAttribute('aria-label', 'Diapositivas')
    nav.innerHTML = `
      <span class="diapo-mas" aria-hidden="true" title="Hay más contenido abajo">
        <i class="fa-solid fa-arrow-down"></i>
      </span>
      <p class="diapo-contador" aria-live="polite">
        <span class="diapo-num">01</span><span class="diapo-total">/ ${String(diapos.length).padStart(2, '0')}</span>
        <span class="diapo-nombre"></span>
      </p>
      <ol class="diapo-marcas">
        ${diapos
          .map((d, i) => `<li><button type="button" data-ir="${i}" aria-label="Ir a ${nombre(d)}"></button></li>`)
          .join('')}
      </ol>
      <div class="diapo-flechas">
        <button type="button" data-paso="-1" aria-label="Diapositiva anterior">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
        </button>
        <button type="button" data-paso="1" aria-label="Diapositiva siguiente">
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    `
    nav.addEventListener('click', e => {
      const b = e.target.closest('button')
      if (!b) return
      if (b.dataset.ir) ir(Number(b.dataset.ir))
      else ir(activa + Number(b.dataset.paso))
    })
    document.body.appendChild(nav)
    return nav
  }

  /* ----------------------- Entrada del visitante ----------------------- */

  // ¿Puede el contenido de la diapositiva activa desplazarse en ese sentido?
  function puedeDesplazar(sentido) {
    const d = diapos[activa]
    return sentido > 0
      ? d.scrollTop + d.clientHeight < d.scrollHeight - HOLGURA_PIE
      : d.scrollTop > 2
  }

  const enCampo = el => el?.closest?.('input, textarea, select, [contenteditable], dialog')

  function oyentes(signal) {
    // Enlaces a anclas: llevan a la diapositiva que contiene el destino.
    document.addEventListener(
      'click',
      e => {
        const a = e.target.closest('a[href^="#"]')
        if (!a || e.defaultPrevented) return
        const id = decodeURIComponent(a.hash.slice(1))
        const i = indiceDe(id)
        if (i < 0) return
        e.preventDefault()
        ir(i)
        const el = document.getElementById(id)
        // Un ancla DENTRO de una sección (no la sección misma): se lleva a la
        // vista cuando la diapositiva ya llegó.
        if (el !== diapos[i]) setTimeout(() => el.scrollIntoView({ block: 'start' }), duracion())
      },
      { signal }
    )

    window.addEventListener(
      'popstate',
      () => {
        const i = indiceDe(location.hash.slice(1))
        ir(i < 0 ? 0 : i, { historial: false })
      },
      { signal }
    )

    const gesto = { ultimo: 0, hecho: false, cambio: false }
    main.addEventListener(
      'wheel',
      e => {
        if (e.ctrlKey || enCampo(e.target)) return // ctrl + rueda es zoom
        const ahora = performance.now()
        if (ahora - gesto.ultimo > PAUSA_GESTO) gesto.hecho = gesto.cambio = false
        gesto.ultimo = ahora

        // Lo que queda de un gesto que ya cambió de diapositiva no se usa
        // para nada: ni para otra diapositiva ni para desplazar la recién
        // llegada mientras entra.
        if (gesto.cambio) return e.preventDefault()

        const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
        const delta = horizontal ? e.deltaX : e.deltaY
        if (Math.abs(delta) < 4) return

        if (!horizontal && puedeDesplazar(delta)) {
          gesto.hecho = true // este gesto desplaza: ya no cambiará de página
          return
        }
        e.preventDefault()
        if (gesto.hecho || transicion) return
        gesto.hecho = gesto.cambio = true
        ir(activa + Math.sign(delta), { historial: 'replace', alFinal: delta < 0 && !horizontal })
      },
      { passive: false, signal }
    )

    document.addEventListener(
      'keydown',
      e => {
        if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || enCampo(e.target)) return
        if (document.querySelector('dialog[open]')) return
        const enBoton = e.target.closest?.('button, a')
        let paso = 0
        switch (e.key) {
          case 'ArrowRight': paso = 1; break
          case 'ArrowLeft': paso = -1; break
          case 'PageDown': paso = puedeDesplazar(1) ? 0 : 1; break
          case 'PageUp': paso = puedeDesplazar(-1) ? 0 : -1; break
          case ' ':
            if (enBoton) return // el espacio activa el botón, no pasa página
            paso = puedeDesplazar(e.shiftKey ? -1 : 1) ? 0 : e.shiftKey ? -1 : 1
            break
          case 'Home': e.preventDefault(); ir(0); return
          case 'End': e.preventDefault(); ir(diapos.length - 1); return
          default: return
        }
        if (!paso) return // el navegador desplaza el contenido
        e.preventDefault()
        if (!transicion) ir(activa + paso, { historial: 'replace' })
      },
      { signal }
    )

    let toque = null
    main.addEventListener(
      'touchstart',
      e => {
        const t = e.touches[0]
        toque = e.touches.length === 1 && !enCampo(e.target) ? { x: t.clientX, y: t.clientY } : null
      },
      { passive: true, signal }
    )
    main.addEventListener(
      'touchend',
      e => {
        if (!toque) return
        const t = e.changedTouches[0]
        const dx = t.clientX - toque.x
        const dy = t.clientY - toque.y
        toque = null
        if (Math.abs(dx) > UMBRAL_DEDO && Math.abs(dx) > Math.abs(dy) * 1.5) {
          ir(activa + (dx < 0 ? 1 : -1), { historial: 'replace' })
        }
      },
      { passive: true, signal }
    )

    // `scroll` no burbujea, pero sí se puede escuchar en fase de captura: un
    // solo oyente para todas las diapositivas.
    main.addEventListener('scroll', senalarMas, { capture: true, passive: true, signal })
    window.addEventListener('resize', senalarMas, { passive: true, signal })
    // Las imágenes y las fuentes cambian el alto después de montar.
    window.addEventListener('load', senalarMas, { signal })

    main.addEventListener(
      'animationend',
      e => {
        if (transicion && e.target === transicion.hacia) terminar()
      },
      { signal }
    )
  }

  /* ----------------------- Encender / apagar ----------------------- */

  function encender() {
    // La diapositiva inicial: la del enlace si se llegó con #ancla, y si no,
    // la que se estaba viendo (al ensanchar la ventana a media página).
    let inicial = indiceDe(location.hash.slice(1))
    if (inicial < 0) {
      inicial = 0
      diapos.forEach((d, i) => {
        if (d.getBoundingClientRect().top <= 120) inicial = i
      })
    }

    document.body.dataset.diapositivas = ''
    for (const d of diapos) {
      d.classList.add('diapo')
      d.tabIndex = -1
    }
    // El pie va al final de la última diapositiva: fuera de ellas no hay
    // ningún sitio donde se pueda ver.
    if (pie) diapos[diapos.length - 1].appendChild(pie)
    window.scrollTo(0, 0)

    activa = inicial
    diapos[activa].classList.add('activa')
    controles = crearControles()
    marcar()
    senalarMas()

    ctl = new AbortController()
    oyentes(ctl.signal)
  }

  function apagar() {
    terminar()
    ctl?.abort()
    controles?.remove()
    controles = null
    for (const d of diapos) {
      d.classList.remove('diapo', 'activa')
      d.removeAttribute('tabindex')
      d.inert = false
    }
    if (pie && sitioPie) sitioPie.padre.insertBefore(pie, sitioPie.siguiente)
    delete document.body.dataset.diapositivas
    // Se vuelve a la página vertical en la sección que se estaba viendo.
    diapos[activa].scrollIntoView({ block: 'start', behavior: 'instant' })
  }

  if (medio.matches) encender()
  medio.addEventListener('change', e => (e.matches ? encender() : apagar()))
}
