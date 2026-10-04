/*
 * Fondo «Waves» — columnas de líneas finas que ondulan con un ruido Perlin y
 * se apartan al paso del cursor, como la señal de un instrumento o las
 * curvas de un plano técnico.
 *
 * Adaptado de React Bits (https://github.com/DavidHDev/react-bits),
 * Copyright (c) 2026 David Haz, licencia MIT + Commons Clause.
 * Se usa AQUÍ, dentro de un sitio; la licencia prohíbe redistribuir el
 * componente en sí, así que este archivo no debe copiarse a plantillas ni
 * publicarse como librería. Conservar este aviso.
 *
 * Sustituye a la matriz de puntos (DotField) el 2026-10-04: sobre el fondo
 * blanco del tema claro los puntos casi no se veían. Las líneas cubren la
 * portada entera y se leen en los dos temas.
 *
 * Cambios respecto al original (React, 60 fps sin pausa):
 *   · canvas a la densidad de píxeles real (el original se ve borroso en
 *     pantallas retina);
 *   · un degradado entre dos colores de marca en vez de un color plano;
 *   · pausa fuera de pantalla (IntersectionObserver) y con la pestaña oculta;
 *   · prefers-reduced-motion → un solo fotograma quieto, sin cursor;
 *   · el rectángulo del contenedor se relee en cada movimiento del puntero:
 *     el original lo guardaba al montar y, tras hacer scroll, el cursor
 *     empujaba las líneas desde un punto equivocado;
 *   · se quita el punto decorativo que seguía al cursor.
 */

/* ----------------------- Ruido Perlin 2D (del original) ----------------------- */
class Grad {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
  dot2(x, y) {
    return this.x * x + this.y * y
  }
}

const P = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240,
  21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88,
  237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83,
  111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216,
  80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,
  3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58,
  17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
  129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193,
  238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
  184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,
  195, 78, 66, 215, 61, 156, 180,
]

class Ruido {
  constructor(semilla = 0) {
    this.grad3 = [
      new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
      new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
      new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1),
    ]
    this.perm = new Array(512)
    this.gradP = new Array(512)
    if (semilla > 0 && semilla < 1) semilla *= 65536
    semilla = Math.floor(semilla)
    if (semilla < 256) semilla |= semilla << 8
    for (let i = 0; i < 256; i++) {
      const v = i & 1 ? P[i] ^ (semilla & 255) : P[i] ^ ((semilla >> 8) & 255)
      this.perm[i] = this.perm[i + 256] = v
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12]
    }
  }
  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }
  lerp(a, b, t) {
    return (1 - t) * a + t * b
  }
  perlin2(x, y) {
    let X = Math.floor(x)
    let Y = Math.floor(y)
    x -= X
    y -= Y
    X &= 255
    Y &= 255
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y)
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1)
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y)
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1)
    const u = this.fade(x)
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y))
  }
}

/**
 * Monta las ondas dentro de `contenedor` (que debe tener tamaño propio). El
 * cursor se escucha en `window` porque el canvas va detrás del texto con
 * pointer-events:none.
 *
 * @param {HTMLElement} contenedor
 * @param {Object} [o]
 * @param {string} [o.colorA]       color de la izquierda del degradado
 * @param {string} [o.colorB]       color de la derecha
 * @param {number} [o.opacidad=0.5]
 * @param {number} [o.grosor=1]     ancho de línea, en px
 * @param {number} [o.xGap=12]      separación entre columnas, en px
 * @param {number} [o.yGap=36]      separación entre puntos de una columna
 * @param {number} [o.ampX=32]      amplitud de la onda en horizontal
 * @param {number} [o.ampY=16]      amplitud en vertical
 * @param {number} [o.velX=0.0125]  velocidad del ruido
 * @param {number} [o.velY=0.005]
 * @param {number} [o.friccion=0.925]
 * @param {number} [o.tension=0.005]  lo que tarda una línea en volver a su sitio
 * @param {number} [o.maxCursor=100]  cuánto puede apartarla el cursor, en px
 * @returns {{destruir: () => void} | null}  null si no hay canvas 2D.
 */
export function montarWaves(contenedor, o = {}) {
  const op = {
    colorA: '#2563eb',
    colorB: '#0e7490',
    opacidad: 0.5,
    grosor: 1,
    xGap: 12,
    yGap: 36,
    ampX: 32,
    ampY: 16,
    velX: 0.0125,
    velY: 0.005,
    friccion: 0.925,
    tension: 0.005,
    maxCursor: 100,
    ...o,
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return null
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block'
  contenedor.appendChild(canvas)

  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const ruido = new Ruido(Math.random())
  const raton = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, vs: 0, a: 0, puesto: false }

  let w = 0
  let h = 0
  let lineas = []
  let trazo = null
  let fotograma = 0
  let visible = false

  function medir() {
    const r = contenedor.getBoundingClientRect()
    w = r.width
    h = r.height
    canvas.width = Math.max(1, Math.round(w * dpr))
    canvas.height = Math.max(1, Math.round(h * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, op.colorA)
    grad.addColorStop(1, op.colorB)
    trazo = grad

    // Un margen fuera del cuadro por cada lado: la onda desplaza las líneas
    // hasta ampX px, y sin él se verían los extremos vacíos.
    lineas = []
    const anchoTotal = w + 200
    const altoTotal = h + 30
    const columnas = Math.ceil(anchoTotal / op.xGap)
    const puntos = Math.ceil(altoTotal / op.yGap)
    const x0 = (w - op.xGap * columnas) / 2
    const y0 = (h - op.yGap * puntos) / 2
    for (let i = 0; i <= columnas; i++) {
      const pts = []
      for (let j = 0; j <= puntos; j++) {
        pts.push({ x: x0 + op.xGap * i, y: y0 + op.yGap * j, ox: 0, oy: 0, cx: 0, cy: 0, vx: 0, vy: 0 })
      }
      lineas.push(pts)
    }
  }

  function mover(t) {
    const alcance = Math.max(175, raton.vs)
    for (const pts of lineas) {
      for (const p of pts) {
        const giro = ruido.perlin2((p.x + t * op.velX) * 0.002, (p.y + t * op.velY) * 0.0015) * 12
        p.ox = Math.cos(giro) * op.ampX
        p.oy = Math.sin(giro) * op.ampY

        const dist = Math.hypot(p.x - raton.sx, p.y - raton.sy)
        if (dist < alcance) {
          const f = Math.cos(dist * 0.001) * (1 - dist / alcance)
          p.vx += Math.cos(raton.a) * f * alcance * raton.vs * 0.00065
          p.vy += Math.sin(raton.a) * f * alcance * raton.vs * 0.00065
        }
        p.vx = (p.vx + (0 - p.cx) * op.tension) * op.friccion
        p.vy = (p.vy + (0 - p.cy) * op.tension) * op.friccion
        p.cx = Math.min(op.maxCursor, Math.max(-op.maxCursor, p.cx + p.vx * 2))
        p.cy = Math.min(op.maxCursor, Math.max(-op.maxCursor, p.cy + p.vy * 2))
      }
    }
  }

  function dibujar() {
    ctx.clearRect(0, 0, w, h)
    ctx.globalAlpha = op.opacidad
    ctx.lineWidth = op.grosor
    ctx.strokeStyle = trazo
    ctx.beginPath()
    for (const pts of lineas) {
      // El primer y el último punto no siguen al cursor: así cada línea queda
      // anclada por arriba y por abajo y se dobla, en vez de desplazarse entera.
      const ultimo = pts.length - 1
      ctx.moveTo(pts[0].x + pts[0].ox, pts[0].y + pts[0].oy)
      for (let j = 1; j <= ultimo; j++) {
        const p = pts[j]
        const conCursor = j !== ultimo
        ctx.lineTo(p.x + p.ox + (conCursor ? p.cx : 0), p.y + p.oy + (conCursor ? p.cy : 0))
      }
    }
    ctx.stroke()
  }

  function paso(t) {
    raton.sx += (raton.x - raton.sx) * 0.1
    raton.sy += (raton.y - raton.sy) * 0.1
    const dx = raton.x - raton.lx
    const dy = raton.y - raton.ly
    raton.vs = Math.min(100, raton.vs + (Math.hypot(dx, dy) - raton.vs) * 0.1)
    raton.lx = raton.x
    raton.ly = raton.y
    raton.a = Math.atan2(dy, dx)

    mover(t)
    dibujar()
    fotograma = requestAnimationFrame(paso)
  }

  function arrancar() {
    if (reducido || fotograma || !visible || document.hidden) return
    fotograma = requestAnimationFrame(paso)
  }
  function parar() {
    cancelAnimationFrame(fotograma)
    fotograma = 0
  }

  function alMover(e) {
    if (!visible) return
    const r = contenedor.getBoundingClientRect()
    raton.x = e.clientX - r.left
    raton.y = e.clientY - r.top
    if (!raton.puesto) {
      raton.sx = raton.lx = raton.x
      raton.sy = raton.ly = raton.y
      raton.puesto = true
    }
  }

  let temporizador = 0
  function alRedimensionar() {
    clearTimeout(temporizador)
    temporizador = setTimeout(() => {
      medir()
      if (reducido) {
        mover(0)
        dibujar()
      }
    }, 120)
  }

  const alCambiarVisibilidad = () => (document.hidden ? parar() : arrancar())

  const observador = new IntersectionObserver(([entrada]) => {
    visible = entrada.isIntersecting
    visible ? arrancar() : parar()
  })
  observador.observe(contenedor)

  medir()
  if (reducido) {
    mover(0)
    dibujar()
  } else {
    window.addEventListener('pointermove', alMover, { passive: true })
  }
  window.addEventListener('resize', alRedimensionar)
  document.addEventListener('visibilitychange', alCambiarVisibilidad)

  return {
    destruir() {
      parar()
      clearTimeout(temporizador)
      observador.disconnect()
      window.removeEventListener('pointermove', alMover)
      window.removeEventListener('resize', alRedimensionar)
      document.removeEventListener('visibilitychange', alCambiarVisibilidad)
      canvas.remove()
    },
  }
}
