/* ============================================================
   CATÁLOGO DEL CONFIGURADOR

   Las paletas y las tipografías son EXACTAMENTE las de
   WebMaker/referencia/paletas.md. No son inventadas para la demo: lo que el
   cliente ve aquí es lo que va a recibir, y por eso el briefing que sale al
   final se puede pasar a `generar-andamiaje` sin traducir nada.

   SI SE AÑADE UNA PALETA A WebMaker, SE AÑADE AQUÍ. Un configurador que
   ofrece opciones que el taller no sabe construir es una promesa rota.
   ============================================================ */

export const PALETAS = [
  { id: 'tech', nombre: 'Tech Corporate', para: 'Tecnología, ingeniería, ciberseguridad, datos',
    c: { bg:'#0a0e1a', bg2:'#0d1117', surface:'#111827', primario:'#2563eb', acento:'#22d3ee',
         texto:'#e5e7eb', tenue:'#94a3b8', borde:'rgba(255,255,255,0.08)' } },
  { id: 'pizarra', nombre: 'Pizarra Institucional', para: 'Consultoría, legal, auditoría, licitaciones',
    c: { bg:'#0f1419', bg2:'#131a21', surface:'#1a232c', primario:'#3b6ea5', acento:'#9ab8d4',
         texto:'#e8eaed', tenue:'#9aa5b1', borde:'rgba(255,255,255,0.07)' } },
  { id: 'verde', nombre: 'Verde Territorio', para: 'Medio ambiente, agro, forestal, energía',
    c: { bg:'#0a1410', bg2:'#0d1a14', surface:'#12241c', primario:'#2d7a4f', acento:'#a3e635',
         texto:'#e4ebe6', tenue:'#93a89a', borde:'rgba(255,255,255,0.08)' } },
  { id: 'cobre', nombre: 'Cobre y Grafito', para: 'Minería, metalmecánica, manufactura, logística',
    c: { bg:'#111112', bg2:'#17171a', surface:'#1f1f23', primario:'#b45309', acento:'#fbbf24',
         texto:'#eae8e6', tenue:'#a3a09c', borde:'rgba(255,255,255,0.08)' } },
  { id: 'marino', nombre: 'Marino Profundo', para: 'Salmonicultura, pesca, portuario, turismo, salud',
    c: { bg:'#071a24', bg2:'#0a212d', surface:'#0f2c3a', primario:'#0e7490', acento:'#5eead4',
         texto:'#e3edf0', tenue:'#8ea9b3', borde:'rgba(255,255,255,0.08)' } },
  { id: 'papel', nombre: 'Papel Claro', para: 'Educación, publicaciones, mucho texto. La única en claro',
    c: { bg:'#faf9f7', bg2:'#f3f1ee', surface:'#ffffff', primario:'#1d4ed8', acento:'#0e7490',
         texto:'#1f2933', tenue:'#52616b', borde:'rgba(15,23,42,0.10)' } },
]

export const TIPOGRAFIAS = [
  { id:'raleway',  nombre:'Raleway',                 titulos:"'Raleway'",         texto:"'Raleway'",        siente:'Limpio, técnico, neutro' },
  { id:'montse',   nombre:'Montserrat / Open Sans',  titulos:"'Montserrat'",      texto:"'Open Sans'",      siente:'Corporativo clásico' },
  { id:'playfair', nombre:'Playfair Display / Lato', titulos:"'Playfair Display'",texto:"'Lato'",           siente:'Con oficio, algo señorial' },
  { id:'grotesk',  nombre:'Space Grotesk / Inter',   titulos:"'Space Grotesk'",   texto:"'Inter'",          siente:'Actual, producto digital' },
  { id:'bitter',   nombre:'Bitter / Source Sans 3',  titulos:"'Bitter'",          texto:"'Source Sans 3'",  siente:'Editorial, para mucho texto' },
]

/* Catálogo de secciones. `base` marca las cuatro que trae la plantilla de
   fábrica y que vienen premarcadas: un sitio sin portada ni contacto no es
   un sitio. El resto sale de WebMaker/referencia/catalogo-secciones.md. */
export const SECCIONES = [
  { id:'inicio',     label:'Portada',            base:true,  fijo:true,  desc:'Quién es y qué ofrece, en cinco segundos' },
  { id:'nosotros',   label:'Quiénes somos',      base:true,  desc:'La historia, el equipo, por qué existen' },
  { id:'servicios',  label:'Servicios',          base:true,  desc:'Lo que vende, en tarjetas comparables' },
  { id:'proyectos',  label:'Proyectos o trabajos', desc:'Obras, casos o clientes, con imágenes' },
  { id:'equipo',     label:'Equipo',             desc:'Las personas, con foto y cargo' },
  { id:'precios',    label:'Planes y precios',   desc:'Tabla comparativa de planes' },
  { id:'preguntas',  label:'Preguntas frecuentes', desc:'Acordeón que responde las objeciones' },
  { id:'testimonios',label:'Testimonios',        desc:'Lo que dicen los clientes' },
  { id:'ubicacion',  label:'Dónde estamos',      desc:'Dirección, horario y cómo llegar' },
  { id:'contacto',   label:'Contacto',           base:true, fijo:true, desc:'Formulario que llega a su correo' },
]

export const ARMAZONES = [
  { id:'topbar',  nombre:'Barra superior', desc:'Lo que espera un visitante en un sitio de empresa. Con más de siete secciones se aprieta.' },
  { id:'sidebar', nombre:'Columna lateral', desc:'Distintiva y cómoda para recorrer muchas secciones. En móvil pasa a barra inferior.' },
]
