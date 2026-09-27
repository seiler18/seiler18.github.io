/* ============================================================
   PROYECTOS PUBLICADOS

   Las «cuatro puertas» de arriba dicen QUÉ se ofrece; esta sección enseña
   que ya está hecho. Va separada a propósito: meter estos proyectos como
   puertas nuevas mezclaría servicios con casos, y quien compara necesita
   ver las dos cosas por separado.

   Solo entra lo que está EN PRODUCCIÓN y responde: un enlace roto aquí
   cuenta lo contrario de lo que pretende la sección. Los ejercicios de
   práctica viven en el portafolio del currículum, no aquí.

   OPCIONES enlaza a la maqueta de GitHub Pages y no al repositorio: el
   repo es privado (es el sitio de un cliente) y la maqueta es lo que se
   enseña a Gerencia.
   ============================================================ */

export const proyectos = {
  id: 'proyectos',
  eyebrow: 'Ya en producción',
  titulo: 'Proyectos publicados',
  subtitulo: 'Trabajo real, funcionando hoy. Cada tarjeta abre el sitio en vivo.',
  filtro: false,
  densidad: 'amplia',

  items: [
    {
      titulo: 'FinanzasMaker',
      texto:
        'Gastos, ingresos e inversiones por día, mes y año, leídos de los avisos que mandan los bancos por correo: sin pedir claves bancarias. Un Apps Script registra cada movimiento en una hoja de Google y borra el correo; la página suma, compara y da consejos de ahorro.',
      icon: 'fa-solid fa-wallet',
      enlace: { label: 'Ver la demo', href: 'https://seiler18.github.io/FinanzasMaker/', externo: true },
    },
    {
      titulo: 'Gestor de acciones',
      texto:
        'Dashboard de una cartera de acciones: posiciones abiertas, resultado por activo, dividendos por mes, cambio de dólares y alertas. La hoja de Google importa sola los correos de la corredora y la página lee una API de solo lectura en Apps Script.',
      icon: 'fa-solid fa-chart-line',
      enlace: { label: 'Ver la demo', href: 'https://seiler18.github.io/gestor-acciones/', externo: true },
    },
    {
      titulo: 'Regenera Market',
      texto:
        'Marketplace multi-proveedor de productos, experiencias y servicios regenerativos para el turismo colombiano: catálogo sobre Postgres, registro con segundo factor, panel de administración y comunidad. Next.js, Supabase y Vercel.',
      icon: 'fa-solid fa-leaf',
      enlace: { label: 'Ver el marketplace', href: 'https://regenera-market.vercel.app/', externo: true },
    },
    {
      titulo: 'VentasMaker',
      texto:
        'Catálogo, punto de venta e inventario para una tienda de Puerto Montt, sin mensualidad: pedido por WhatsApp, venta con lector de códigos, reportes y etiquetas. Front estático y Google Sheets con Apps Script como base de datos.',
      icon: 'fa-solid fa-cash-register',
      enlace: { label: 'Ver el catálogo', href: 'https://seiler18.github.io/VentasMaker/', externo: true },
    },
    {
      titulo: 'Sitio corporativo Opciones S.A.',
      texto:
        'Nuevo sitio de una empresa chilena de soluciones TI y data center: tema propio de WordPress sin plugins, formulario con protección anti-spam y bandeja de mensajes, y una guía de entrega para el área de Sistemas.',
      icon: 'fa-solid fa-building',
      enlace: { label: 'Ver la maqueta', href: 'https://seiler18.github.io/OPCIONES/', externo: true },
    },
    {
      titulo: 'CEDER SpA',
      texto:
        'Perfil institucional de un centro de estudios de desarrollo regional, pensado también para postular a licitaciones públicas. El primer sitio fabricado con la plantilla propia.',
      icon: 'fa-solid fa-landmark',
      enlace: { label: 'Ver el sitio', href: 'https://seiler18.github.io/ceder/', externo: true },
    },
  ],
}
