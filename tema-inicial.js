/* Aplica el tema guardado ANTES de que se pinte la página.

   Va como script clásico (sin `type="module"`, sin `defer`) en el <head> de
   index.html, y por eso bloquea: es lo que evita que quien eligió el modo
   oscuro vea un destello blanco en cada carga. Los módulos de Vite corren
   después de pintar y llegarían tarde.

   Archivo aparte y no <script> en línea porque la CSP del sitio es
   `script-src 'self'` sin 'unsafe-inline' (ver index.html).
   La clave es la de src/lib/tema.js: si la cambias, cámbiala en los dos. */
try {
  if (localStorage.getItem('seiler18:tema') === 'oscuro') {
    document.documentElement.dataset.tema = 'oscuro'
  }
} catch (e) {
  /* sin almacenamiento: se queda en claro */
}
