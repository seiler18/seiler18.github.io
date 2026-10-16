# 0007 — El dominio declara a la app Android de FinanzasMaker

- **Fecha:** 2026-10-16
- **Estado:** completado
- **Commits:** pendiente de commit

## Contexto
La app Android de FinanzasMaker (repo privado `FinanzasMaker-android`, su hito
0002) pasó a mostrar la página de FinanzasMaker dentro de la app, como Trusted
Web Activity: Chrome a pantalla completa. Chrome solo quita la barra de URL si
el **origen** de la página declara a la app como suya, y el origen de
`seiler18.github.io/FinanzasMaker/` es la raíz del dominio, que publica este
repo.

## Qué se hizo
- `public/.well-known/assetlinks.json`: paquete
  `io.github.seiler18.finanzasmaker` y la huella SHA-256 del certificado con
  que el CI firma los APK de Releases (sale en las notas de cada Release).
- Vite copia `public/` tal cual a `dist/`, y la rama `gh-pages` ya tiene
  `.nojekyll`, así que la carpeta con punto se publica sin tocar el deploy.

## Decisiones y alternativas descartadas
- **Aquí y no en el repo de FinanzasMaker:** GitHub Pages sirve
  `/.well-known/` solo desde el sitio de usuario (la raíz). Un
  `assetlinks.json` en `/FinanzasMaker/.well-known/` no lo mira nadie.
- **Solo la huella de release.** El APK de debug tiene otra firma: se abre
  igual, con la barra de URL. Agregar la huella del debug de un PC concreto
  ataría el dominio a una clave que no está respaldada.
- `handle_all_urls` es la relación que pide una TWA. La app no declara
  enlaces verificados (`autoVerify`), así que no se apropia de ningún enlace
  del dominio: el hub, el Curriculo y los demás sitios siguen abriéndose en el
  navegador.

## Consecuencias
- Si la app se firma con otra clave (ver `SECURITY.md` de la app), hay que
  cambiar la huella aquí o la página se verá con barra de URL.
- No borrar `public/.well-known/` al limpiar `public/`.

## Pendiente
Ninguno.
