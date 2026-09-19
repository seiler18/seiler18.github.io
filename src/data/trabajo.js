/* ============================================================
   LAS CUATRO CARAS

   ES LA ÚNICA SECCIÓN QUE IMPORTA de este sitio: cuatro puertas, cada una a
   un sitio que ya existe y se mantiene por su cuenta.

   TODOS los enlaces son `externo: true` aunque vivan bajo el mismo dominio.
   No es un descuido: son despliegues independientes, con su propio repo y su
   propio ciclo. Abrirlos en pestaña nueva deja el hub donde estaba, que es lo
   que quiere quien está comparando antes de decidir a quién escribir.

   SI SE AÑADE UNA CARA, se añade aquí y en ningún otro sitio.
   ============================================================ */

export const trabajo = {
  id: 'trabajo',
  eyebrow: 'En qué trabajo',
  titulo: 'Cuatro puertas',
  subtitulo: 'Cada una lleva a un sitio propio. Elija la que le sirva.',
  filtro: false,
  densidad: 'amplia',

  items: [
    {
      titulo: 'Sistemas de gestión ISO',
      texto:
        'Diagnóstico de brechas, preparación para la auditoría de certificación, integración multinorma y automatización del sistema. Auditor interno en ISO 9001, 14001, 45001, 27001, 22301 y 20000-1.',
      icon: 'fa-solid fa-shield-halved',
      enlace: { label: 'Ver servicios', href: 'https://seiler18.github.io/sistemas-gestion/', externo: true },
    },
    {
      titulo: 'Currículum y portafolio',
      texto:
        'La trayectoria completa: experiencia, certificaciones verificables y el portafolio de proyectos de desarrollo. Con el CV descargable en español y en inglés.',
      icon: 'fa-solid fa-id-card',
      enlace: { label: 'Ver el currículum', href: 'https://seiler18.github.io/Curriculo/', externo: true },
    },
    {
      titulo: 'Sitios web',
      texto:
        'Sitios rápidos y sin dependencias innecesarias, con el contenido separado de la presentación para que se puedan mantener sin rehacerlos. Construidos sobre una plantilla propia, no sobre un tema comprado.',
      icon: 'fa-solid fa-window-maximize',
      enlace: { label: 'Ver un sitio real', href: 'https://seiler18.github.io/ceder/', externo: true },
    },
    {
      titulo: 'Código abierto',
      texto:
        'Los repositorios de todo lo anterior: las plantillas, las herramientas y los proyectos de práctica. Está publicado porque se puede revisar, que es la única forma seria de demostrar cómo se trabaja.',
      icon: 'fa-brands fa-github',
      enlace: { label: 'Ver en GitHub', href: 'https://github.com/seiler18', externo: true },
    },
  ],
}
