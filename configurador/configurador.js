/* ============================================================
   CONFIGURADOR — lógica

   Tres trabajos, en este orden de importancia:

     1. Pintar los controles desde `datos.js`. Ninguna opción está escrita a
        mano en el HTML: si mañana WebMaker gana una paleta, se añade allí y
        aparece aquí sola.
     2. Mantener la vista previa al día. Cada cambio reescribe los tokens
        `--p-*` sobre .maqueta y vuelve a montar su interior.
     3. Componer el briefing en Markdown y enviarlo por FormSubmit.

   LO QUE NO HACE, Y ES DELIBERADO: no genera el sitio. Produce el documento
   con el que se construye. Un ZIP autoservicio entregaría la plantilla con
   otros textos —que no es un sitio a medida— y dejaría tirado a cualquiera
   que no sepa usar Node.

   NO HAY CLAVES EN ESTE ARCHIVO NI PUEDE HABERLAS: GitHub Pages lo sirve en
   claro y cualquiera lo lee con «ver código fuente». FormSubmit se eligió
   justamente porque no necesita ninguna.
   ============================================================ */

import { PALETAS, TIPOGRAFIAS, SECCIONES, ARMAZONES } from './datos.js'

const DESTINO = 'https://formsubmit.co/ajax/ichbinseiler@gmail.com'

/* Lo que el cliente ya tiene. Cambia el plazo más que ninguna otra
   respuesta, así que va en el briefing bien visible. */
const TIENE = [
  { id: 'logo', label: 'Logo', desc: 'En archivo, no una foto del logo impreso' },
  { id: 'textos', label: 'Los textos escritos', desc: 'Aunque sean borradores' },
  { id: 'fotos', label: 'Fotos propias', desc: 'De la empresa, el equipo o los trabajos' },
  { id: 'dominio', label: 'Dominio contratado', desc: 'Un .cl o .com ya comprado' },
  { id: 'web', label: 'Una web antigua', desc: 'Que haya que reemplazar o migrar' },
  { id: 'nada', label: 'Nada de lo anterior', desc: 'Se parte de cero. Es lo más común.' },
]

const $ = sel => document.querySelector(sel)

/* Estado único. Todo lo que se ve en pantalla sale de aquí. */
const estado = {
  nombre: '', nombre_corto: '', lema: '', actividad: '', publico: '', objetivo: '',
  secciones: SECCIONES.filter(s => s.base).map(s => s.id),
  armazon: 'topbar',
  paleta: 'tech',
  tipografia: 'raleway',
  tiene: [],
  correo_sitio: '', whatsapp_sitio: '', plazo: '', extra: '',
  contacto_nombre: '', contacto_correo: '', contacto_tel: '',
}

/* ---------------------------------------------------------------
   PINTAR LOS CONTROLES
   --------------------------------------------------------------- */

function pintarSecciones() {
  $('#f-secciones').innerHTML = SECCIONES.map(s => `
    <li>
      <label class="casilla">
        <input type="checkbox" value="${s.id}" data-grupo="secciones"
               ${estado.secciones.includes(s.id) ? 'checked' : ''}
               ${s.fijo ? 'disabled' : ''}>
        <span>
          <span class="casilla-txt">${s.label}${s.fijo ? ' · siempre' : ''}</span>
          <span class="casilla-desc">${s.desc}</span>
        </span>
      </label>
    </li>
  `).join('')
}

function pintarTiene() {
  $('#f-tiene').innerHTML = TIENE.map(t => `
    <li>
      <label class="casilla">
        <input type="checkbox" value="${t.id}" data-grupo="tiene">
        <span>
          <span class="casilla-txt">${t.label}</span>
          <span class="casilla-desc">${t.desc}</span>
        </span>
      </label>
    </li>
  `).join('')
}

function pintarArmazones() {
  $('#f-armazon').innerHTML = ARMAZONES.map(a => `
    <label class="opcion">
      <input type="radio" name="armazon" value="${a.id}" ${estado.armazon === a.id ? 'checked' : ''}>
      <span class="opcion-nombre">${a.nombre}</span>
      <span class="opcion-desc">${a.desc}</span>
    </label>
  `).join('')
}

function pintarPaletas() {
  $('#f-paletas').innerHTML = PALETAS.map(p => `
    <label class="paleta">
      <input type="radio" name="paleta" value="${p.id}" ${estado.paleta === p.id ? 'checked' : ''}>
      <span class="paleta-muestra" aria-hidden="true">
        <i style="background:${p.c.bg}"></i>
        <i style="background:${p.c.surface}"></i>
        <i style="background:${p.c.primario}"></i>
        <i style="background:${p.c.acento}"></i>
      </span>
      <span class="paleta-nombre">${p.nombre}</span>
      <span class="paleta-para">${p.para}</span>
    </label>
  `).join('')
}

function pintarTipografias() {
  $('#f-tipografias').innerHTML = TIPOGRAFIAS.map(t => `
    <label class="opcion">
      <input type="radio" name="tipografia" value="${t.id}" ${estado.tipografia === t.id ? 'checked' : ''}>
      <span class="opcion-nombre" style="font-family:${t.titulos}, system-ui, sans-serif">${t.nombre}</span>
      <span class="opcion-desc">${t.siente}</span>
    </label>
  `).join('')
}

/* ---------------------------------------------------------------
   LA VISTA PREVIA
   --------------------------------------------------------------- */

/* Deriva del `nombre` un monograma de dos letras: iniciales de las dos
   primeras palabras, o las dos primeras letras si es una sola palabra. */
function monograma(nombre) {
  const palabras = nombre.trim().split(/\s+/).filter(Boolean)
  if (!palabras.length) return 'SU'
  if (palabras.length === 1) return palabras[0].slice(0, 2).toUpperCase()
  return (palabras[0][0] + palabras[1][0]).toUpperCase()
}

function slug(nombre) {
  return nombre.trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')   // fuera acentos
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/* Cuerpo de cada sección dentro de la maqueta. No todas se dibujan igual:
   una lista de servicios es una rejilla y «quiénes somos» es prosa, que es
   exactamente la distinción que hace `generar-andamiaje` al elegir entre
   renderTarjetas y renderBloque. */
const CUERPOS = {
  prosa: `<div class="mq-prosa">
      <div class="mq-linea"></div><div class="mq-linea"></div>
      <div class="mq-linea"></div><div class="mq-linea corta"></div>
    </div>`,
  tarjetas: n => `<div class="mq-rejilla">${
    Array.from({ length: n }, (_, i) => `
      <div class="mq-tarjeta">
        <span class="mq-icono">${i + 1}</span>
        <b>Elemento ${i + 1}</b>
        <div class="mq-linea"></div><div class="mq-linea corta"></div>
      </div>`).join('')
  }</div>`,
  formulario: `<div class="mq-prosa">
      <div class="mq-campo"></div><div class="mq-campo"></div>
      <div class="mq-campo" style="height:52px"></div>
      <span class="mq-btn lleno" style="display:inline-block;margin-top:4px">Enviar</span>
    </div>`,
}

const PINTA = {
  nosotros:    { titulo: 'Quiénes somos',   eyebrow: 'La empresa',   cuerpo: () => CUERPOS.prosa },
  servicios:   { titulo: 'Servicios',       eyebrow: 'Qué hacemos',  cuerpo: () => CUERPOS.tarjetas(3) },
  proyectos:   { titulo: 'Proyectos',       eyebrow: 'Trabajos',     cuerpo: () => CUERPOS.tarjetas(4) },
  equipo:      { titulo: 'Equipo',          eyebrow: 'Las personas', cuerpo: () => CUERPOS.tarjetas(3) },
  precios:     { titulo: 'Planes',          eyebrow: 'Precios',      cuerpo: () => CUERPOS.tarjetas(3) },
  preguntas:   { titulo: 'Preguntas frecuentes', eyebrow: 'Dudas',   cuerpo: () => CUERPOS.prosa },
  testimonios: { titulo: 'Testimonios',     eyebrow: 'Clientes',     cuerpo: () => CUERPOS.tarjetas(2) },
  ubicacion:   { titulo: 'Dónde estamos',   eyebrow: 'Visítenos',    cuerpo: () => CUERPOS.prosa },
  contacto:    { titulo: 'Contacto',        eyebrow: 'Hablemos',     cuerpo: () => CUERPOS.formulario },
}

function pintarVista() {
  const p = PALETAS.find(x => x.id === estado.paleta)
  const t = TIPOGRAFIAS.find(x => x.id === estado.tipografia)
  const maqueta = $('#maqueta')

  const nombre = estado.nombre.trim() || 'Su Empresa'
  const corto = estado.nombre_corto.trim() || nombre
  const lema = estado.lema.trim()

  /* Los tokens de la paleta elegida, y SOLO dentro de la maqueta.
     `color-mix` deriva los brillos igual que lo hace la plantilla real, así
     que lo que se ve aquí es el mismo cálculo que se va a publicar. */
  maqueta.setAttribute('style', [
    `--p-bg:${p.c.bg}`,
    `--p-bg-2:${p.c.bg2}`,
    `--p-surface:${p.c.surface}`,
    `--p-primario:${p.c.primario}`,
    `--p-primario-claro:${p.c.primario}`,
    `--p-acento:${p.c.acento}`,
    `--p-texto:${p.c.texto}`,
    `--p-texto-fuerte:${p.id === 'papel' ? '#0b1116' : '#ffffff'}`,
    `--p-tenue:${p.c.tenue}`,
    `--p-borde:${p.c.borde}`,
    `--p-brillo:color-mix(in srgb, ${p.c.primario} 28%, transparent)`,
    `--p-brillo-acento:color-mix(in srgb, ${p.c.acento} 22%, transparent)`,
    `--p-fuente-titulos:${t.titulos}, system-ui, sans-serif`,
    `--p-fuente-texto:${t.texto}, system-ui, sans-serif`,
  ].join(';'))

  const lateral = estado.armazon === 'sidebar'
  maqueta.classList.toggle('lateral', lateral)

  const enlaces = estado.secciones
    .map(id => id === 'inicio' ? 'Inicio' : (PINTA[id]?.titulo || id))
    .slice(0, lateral ? 6 : 5)
    .map(l => `<span>${l}</span>`).join('')

  const marca = `<div class="mq-marca"><span class="mq-mono">${monograma(nombre)}</span>${corto}</div>`
  const nav = `<div class="mq-nav">${enlaces}</div>`

  const hero = `
    <div class="mq-hero">
      <p class="mq-eyebrow">${estado.publico.trim() ? 'Para ' + estado.publico.trim().split(/[.,]/)[0].slice(0, 40) : 'Bienvenido'}</p>
      <h1 class="mq-h1">${nombre}</h1>
      ${lema ? `<p class="mq-lema">«${lema}»</p>` : ''}
      <p class="mq-bajada">${estado.actividad.trim() || 'Aquí va la frase que explica a qué se dedican, en dos líneas como máximo.'}</p>
      <div class="mq-botones">
        <span class="mq-btn lleno">Ver más</span>
        <span class="mq-btn linea">Contacto</span>
      </div>
    </div>`

  const secciones = estado.secciones.filter(id => id !== 'inicio').map(id => {
    const s = PINTA[id]
    if (!s) return ''
    return `
      <div class="mq-seccion">
        <div class="mq-divisor"></div>
        <p class="mq-eyebrow" style="text-align:center">${s.eyebrow}</p>
        <h2 class="mq-h2">${s.titulo}</h2>
        <p class="mq-sub">Una línea que sitúa de qué va esta sección.</p>
        ${s.cuerpo()}
      </div>`
  }).join('')

  const pie = `<div class="mq-pie">© ${nombre} ${new Date().getFullYear()}</div>`

  maqueta.innerHTML = lateral
    ? `<div class="mq-sidebar">${marca}${nav}</div><div>${hero}${secciones}${pie}</div>`
    : `<div class="mq-topbar">${marca}${nav}</div>${hero}${secciones}${pie}`

  $('#vista-url').textContent = (slug(estado.nombre) || 'su-empresa') + '.cl'

  /* Aviso de la topbar apretada: es una regla real de la plantilla, no una
     manía. Con ocho o más enlaces se parten en dos líneas. */
  $('#aviso-secciones').hidden = !(estado.secciones.length > 7 && estado.armazon === 'topbar')
}

/* ---------------------------------------------------------------
   EL BRIEFING
   --------------------------------------------------------------- */

function componerBriefing() {
  const p = PALETAS.find(x => x.id === estado.paleta)
  const t = TIPOGRAFIAS.find(x => x.id === estado.tipografia)
  const a = ARMAZONES.find(x => x.id === estado.armazon)
  const hoy = new Date().toISOString().slice(0, 10)
  const nombre = estado.nombre.trim() || '(sin nombre)'
  const marcar = v => v && v.trim() ? v.trim() : '— no respondido —'

  const secciones = estado.secciones
    .map(id => {
      const s = SECCIONES.find(x => x.id === id)
      return `| \`${id}\` | ${s ? s.label : id} |`
    }).join('\n')

  const tiene = estado.tiene.length
    ? estado.tiene.map(id => `- ${TIENE.find(x => x.id === id)?.label || id}`).join('\n')
    : '- (no respondido)'

  return `# Briefing — ${nombre}

- **Fecha:** ${hoy}
- **Estado:** borrador — generado por el configurador, sin revisar
- **Fuente:** formulario de https://seiler18.github.io/configurador/

## Qué es esto

${marcar(estado.actividad)}

## Objetivo del sitio

${marcar(estado.objetivo)}

## Público

${marcar(estado.publico)}

## Identidad

| Decisión | Valor |
|---|---|
| **Armazón** | \`${estado.armazon}\` — ${a.nombre} |
| **Paleta** | ${p.nombre} |
| **Tipografía** | ${t.nombre} |

## Secciones

| Id | Sección |
|---|---|
${secciones}

## Marcadores de la plantilla

| Marcador | Valor |
|---|---|
| \`{{NOMBRE}}\` | ${nombre} |
| \`{{NOMBRE_CORTO}}\` | ${estado.nombre_corto.trim() || nombre} |
| \`{{MONOGRAMA}}\` | ${monograma(nombre)} |
| \`{{LEMA}}\` | ${estado.lema.trim() || '(sin lema)'} |
| \`{{SLUG}}\` | ${slug(nombre) || '(por definir)'} |
| \`{{CORREO}}\` | ${estado.correo_sitio.trim() || '(por definir)'} |
| \`{{WHATSAPP}}\` | ${estado.whatsapp_sitio.trim() || '(sin botón)'} |

## Assets que faltan

Lo que el cliente dice tener:

${tiene}

## Plazo

${marcar(estado.plazo)}

## Notas del cliente

${marcar(estado.extra)}

## Quién lo envió

- **Nombre:** ${marcar(estado.contacto_nombre)}
- **Correo:** ${marcar(estado.contacto_correo)}
- **Teléfono:** ${estado.contacto_tel.trim() || '(no dejó)'}

## Cerrar

**Este briefing NO está aprobado.** Lo rellenó el cliente sin
acompañamiento, así que antes de \`generar-andamiaje\` hay que repasarlo con
él: confirmar el objetivo, cerrar las secciones y comprobar que existe
contenido real para cada una.
`
}

/* ---------------------------------------------------------------
   VALIDACIÓN Y ENVÍO
   --------------------------------------------------------------- */

const OBLIGATORIOS = [
  ['f-nombre', 'nombre', 'Hace falta el nombre de la organización.'],
  ['f-actividad', 'actividad', 'Cuente en dos frases a qué se dedican.'],
  ['f-cnombre', 'contacto_nombre', 'Hace falta su nombre para responderle.'],
  ['f-ccorreo', 'contacto_correo', 'Hace falta un correo donde responderle.'],
]

function limpiarError(campo) {
  campo.classList.remove('error')
  campo.querySelector('.campo-error')?.remove()
}

function validar() {
  let primero = null
  for (const [id, clave, mensaje] of OBLIGATORIOS) {
    const input = document.getElementById(id)
    const campo = input.closest('.campo')
    limpiarError(campo)

    let malo = !estado[clave].trim()
    if (!malo && input.type === 'email') malo = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estado[clave].trim())

    if (malo) {
      campo.classList.add('error')
      const aviso = document.createElement('span')
      aviso.className = 'campo-error'
      aviso.textContent = input.type === 'email' && estado[clave].trim()
        ? 'Ese correo no parece válido.'
        : mensaje
      campo.appendChild(aviso)
      if (!primero) primero = input
    }
  }
  if (primero) {
    primero.focus()
    primero.scrollIntoView({ block: 'center', behavior: 'smooth' })
    return false
  }
  return true
}

function decirEstado(texto, clase = '') {
  const el = $('#estado')
  el.textContent = texto
  el.className = 'estado ' + clase
}

async function enviar(evento) {
  evento.preventDefault()

  // Si la trampa trae texto, lo rellenó un robot. Se finge éxito para no
  // darle señal de que fue detectado, y no se envía nada.
  if (document.querySelector('[name="_honey"]').value) {
    decirEstado('Briefing enviado. Le respondo en menos de 48 horas.', 'ok')
    return
  }

  if (!validar()) {
    decirEstado('Faltan un par de datos, los marqué arriba.', 'mal')
    return
  }

  const boton = $('#btn-enviar')
  boton.disabled = true
  decirEstado('Enviando…')

  try {
    const respuesta = await fetch(DESTINO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Briefing web — ${estado.nombre.trim()}`,
        // `_replyto` hace que al responder el correo se conteste al cliente
        // y no a uno mismo.
        _replyto: estado.contacto_correo.trim(),
        _template: 'table',
        Empresa: estado.nombre.trim(),
        Contacto: `${estado.contacto_nombre.trim()} · ${estado.contacto_correo.trim()} · ${estado.contacto_tel.trim() || 'sin teléfono'}`,
        Plazo: estado.plazo || 'sin fecha',
        Briefing: componerBriefing(),
      }),
    })

    const datos = await respuesta.json().catch(() => ({}))

    if (respuesta.ok) {
      decirEstado('Briefing enviado. Le respondo en menos de 48 horas.', 'ok')
      boton.textContent = 'Enviado'
    } else if (String(datos.message || '').toLowerCase().includes('activat')) {
      // El buzón de destino todavía no está confirmado en FormSubmit. Se dice
      // tal cual: un «enviado» aquí sería mentira.
      decirEstado('El buzón está pendiente de confirmación. Escríbame a ichbinseiler@gmail.com mientras tanto.', 'mal')
      boton.disabled = false
    } else {
      throw new Error(datos.message || 'respuesta no válida')
    }
  } catch (error) {
    decirEstado('No salió el envío. Descargue el briefing y mándemelo a ichbinseiler@gmail.com.', 'mal')
    boton.disabled = false
  }
}

function descargar() {
  const nombre = slug(estado.nombre) || 'briefing'
  const blob = new Blob([componerBriefing()], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `briefing-${nombre}.md`
  a.click()
  URL.revokeObjectURL(url)
  decirEstado('Briefing descargado. Si prefiere, revíselo y mándemelo por correo.', 'ok')
}

/* ---------------------------------------------------------------
   ARRANQUE
   --------------------------------------------------------------- */

function conectar() {
  const form = $('#formulario')

  // Un solo escuchador para todo el formulario en vez de uno por campo: los
  // controles de paletas y secciones se repintan, y con escuchadores propios
  // habría que volver a engancharlos en cada repintado.
  form.addEventListener('input', e => {
    const el = e.target
    if (el.name && el.name in estado && el.type !== 'checkbox' && el.type !== 'radio') {
      estado[el.name] = el.value
      if (el.closest('.campo')?.classList.contains('error')) limpiarError(el.closest('.campo'))
    }
    if (el.type === 'radio') {
      if (el.name === 'paleta') estado.paleta = el.value
      if (el.name === 'tipografia') estado.tipografia = el.value
      if (el.name === 'armazon') estado.armazon = el.value
    }
    if (el.type === 'checkbox' && el.dataset.grupo) {
      const grupo = el.dataset.grupo
      if (el.checked) {
        if (!estado[grupo].includes(el.value)) {
          // Las secciones se guardan en el ORDEN DEL CATÁLOGO, no en el orden
          // en que el cliente las marca: ese orden es el del sitio.
          estado[grupo] = (grupo === 'secciones' ? SECCIONES : TIENE)
            .map(x => x.id)
            .filter(id => id === el.value || estado[grupo].includes(id))
        }
      } else {
        estado[grupo] = estado[grupo].filter(v => v !== el.value)
      }
    }
    pintarVista()
  })

  form.addEventListener('submit', enviar)
  $('#btn-descargar').addEventListener('click', descargar)

  $('.vista-tamanos').addEventListener('click', e => {
    const boton = e.target.closest('button')
    if (!boton) return
    document.querySelectorAll('.vista-tamanos button').forEach(b => {
      const activo = b === boton
      b.classList.toggle('activo', activo)
      b.setAttribute('aria-pressed', String(activo))
    })
    $('#vista-marco').classList.toggle('movil', boton.dataset.tam === 'movil')
  })
}

pintarSecciones()
pintarTiene()
pintarArmazones()
pintarPaletas()
pintarTipografias()
conectar()
pintarVista()
