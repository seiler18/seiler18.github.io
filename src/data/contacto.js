/* ============================================================
   CONTACTO — destinos del formulario

   NUNCA pongas aquí una clave de API. Esto se compila a un .js que sirve
   GitHub Pages en claro: cualquiera lo lee con «ver código fuente». Por eso
   el formulario usa FormSubmit, que no necesita credenciales.

   PRIMERA VEZ: FormSubmit exige confirmar el buzón. Manda un envío de
   prueba desde el sitio publicado y acepta el correo que llega. Hasta que se
   confirme, el formulario responde «pendiente de confirmación» — y eso es lo
   que se le enseña al visitante, en vez de un «enviado» que sería mentira.
   ============================================================ */

export const contacto = {
  eyebrow: 'Hablemos',
  titulo: 'Contacto',
  subtitulo: 'Escríbame por donde prefiera. Respondo yo, no un formulario automático.',

  correo: 'ichbinseiler@gmail.com',
  // Formato internacional sin signos: 56912345678. Cadena vacía = sin
  // WhatsApp, y el botón desaparece solo.
  whatsapp: '56953292612',

  motivos: [
    'Sistemas de gestión ISO',
    'Un sitio web',
    'Una oferta de trabajo',
    'Otro motivo',
  ],

  // Se muestran en la columna de al lado del formulario.
  canales: [
    { label: 'Correo', valor: 'ichbinseiler@gmail.com', href: 'mailto:ichbinseiler@gmail.com', icon: 'fa-solid fa-envelope' },
    { label: 'Dónde estoy', valor: 'Puerto Montt, Chile · trabajo a distancia', href: null, icon: 'fa-solid fa-location-dot' },
  ],
}

export const endpointCorreo = `https://formsubmit.co/ajax/${contacto.correo}`

export const enlaceWhatsapp = contacto.whatsapp
  ? `https://wa.me/${contacto.whatsapp}`
  : ''
