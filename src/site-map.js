/* ============================================================
   MAPA DEL SITIO — la única fuente de verdad de la navegación

   Esta lista alimenta a la vez CUATRO cosas:
     · el orden de las secciones en el DOM      (src/main.js)
     · los enlaces del armazón                  (src/components/shell.js)
     · el resaltado de la sección visible       (src/lib/scrollspy.js)
     · el verificador de integridad             (scripts/check-integrity.js)

   POR QUÉ ESTÁ TODO JUNTO. En el proyecto del que sale esta plantilla, el
   orden de las secciones vivía en un archivo y el render en otro, así que
   podían desincronizarse; hacía falta una regla en el CLAUDE.md y una
   comprobación en el checker para vigilarlo. Aquí no puede pasar: el enlace
   y el bloque que abre salen de la misma fila.

   Añadir una sección = añadir una fila aquí. No hay que tocar nada más.

   Campos:
     id      Ancla y `id` del <section>. Sin espacios ni acentos: va en la URL.
     label   Texto del enlace en escritorio.
     short   Etiqueta del menú móvil. ~8 caracteres o se parte.
     icon    Clase de Font Awesome 6 (la que carga index.html).
     render  Función que devuelve el HTML del bloque, ya con su <section>.
     enMenu  `false` para una sección que existe pero no se enlaza.
   ============================================================ */

import { renderHero } from './components/sections/hero.js'
import { renderTarjetas } from './components/sections/tarjetas.js'
import { renderContacto } from './components/sections/contacto.js'

import { trabajo } from './data/trabajo.js'
import { proyectos } from './data/proyectos.js'

export const mapa = [
  {
    id: 'inicio',
    label: 'Inicio',
    short: 'Inicio',
    icon: 'fa-solid fa-house',
    render: renderHero,
  },
  {
    id: 'trabajo',
    label: 'En qué trabajo',
    short: 'Trabajo',
    icon: 'fa-solid fa-grip',
    render: () => renderTarjetas(trabajo),
  },
  {
    id: 'proyectos',
    label: 'Proyectos',
    short: 'Proyectos',
    icon: 'fa-solid fa-diagram-project',
    render: () => renderTarjetas(proyectos),
  },
  {
    id: 'contacto',
    label: 'Contacto',
    short: 'Contacto',
    icon: 'fa-solid fa-paper-plane',
    render: renderContacto,
  },
]

/** Solo las secciones que se enlazan desde el menú. */
export const mapaMenu = mapa.filter(s => s.enMenu !== false)
