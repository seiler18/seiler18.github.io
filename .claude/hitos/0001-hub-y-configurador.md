# 0001 — El hub y el configurador de sitios

- **Fecha:** 2026-09-19
- **Estado:** completado
- **Commits:** `572b43c`, `e6cfb6b`, `3ed4748`

## Contexto

La presencia digital de Jesús estaba repartida en piezas que no se conocían
entre sí: un CV en `/Curriculo/`, un sitio de cliente en `/ceder/`, repos de
Java y una línea de consultoría ISO sin publicar. Quien llegaba a una no
tenía forma de saber que existían las otras.

La petición original fue «juntar todos los sitios en uno». No se puede tal
cual, y el motivo es concreto: la URL del CV (`/Curriculo/`) está en su PDF,
en su LinkedIn y en postulaciones ya enviadas. Moverla convierte todo eso en
404. Se unieron por la puerta, no por la carpeta.

## Qué se hizo

- Repositorio `seiler18/seiler18.github.io` — el user-site, que sirve la raíz
  del dominio. Tres secciones: portada, las cuatro puertas y contacto.
- `src/data/trabajo.js` — las cuatro caras (ISO, currículum, sitios web,
  código abierto) en una sola rejilla. Añadir una cara es añadir un objeto ahí.
- `configurador/` — página estática con formulario de cinco pasos y vista
  previa en vivo. Genera el `briefing.md` que consume WebMaker y lo envía por
  FormSubmit, o lo descarga como archivo.
- `scripts/copy-assets.js` — se declaró `configurador` como carpeta a copiar y
  se añadió el array `paginas` para que la página entre en el `sitemap.xml`.

## Decisiones y alternativas descartadas

**El configurador NO genera el sitio, genera el briefing.** Se descartaron dos
alternativas: un ZIP autoservicio del proyecto Vite —entregaría la plantilla
con otros textos, que no es un sitio a medida, y dejaría tirado a quien no
sepa usar Node— y un backend con IA, que exige servidor, cobro por uso y
control de abuso. El briefing tiene coste cero de infraestructura y produce
justo lo que faltaba: encargos con el briefing ya hecho.

**Se descartó el ejecutable descargable**, que era la petición inicial. El
diseño a medida lo produce un LLM, no un algoritmo, así que un `.exe` solo
puede ser un rellenador de plantilla o un cliente de API con la clave dentro.
Además: SmartScreen bloquea binarios sin firma (~300 USD/año de certificado),
no hay versión Mac y cada mejora exige volver a descargar.

**La maqueta de la vista previa no es un iframe con el sitio real.** Un iframe
obligaría a compilar un sitio por cada cambio de color, que es exactamente lo
que la página existe para evitar. Es una miniatura que usa los mismos tokens.

**ISO dejó de ser una sección de aquí.** El plan original lo tenía como
sección; el usuario pidió un sitio de venta completo y se construyó aparte en
`seiler18/sistemas-gestion`. Fue una mejora: un hub que explica los servicios
compite con el sitio que los vende.

## Consecuencias

- **`base` de Vite es `'/'`, no `'/repo/'`.** Es el user-site: sirve la raíz
  del dominio. Poner `'/seiler18.github.io/'` —la tentación evidente— carga el
  index y deja todo lo demás en 404. Está anotado en `vite.config.js`.
- **GitHub habilitó Pages solo, desde `main`**, y sirvió el código sin
  compilar. Hubo que lanzar el workflow a mano (`workflow_dispatch`), cambiar
  la fuente a `gh-pages` con `gh api -X PUT …/pages` y forzar un rebuild con
  `POST …/pages/builds`. **En el próximo user-site, comprobarlo antes de dar
  el deploy por bueno**: el index responde 200 igualmente.
- **Dos sistemas de color conviven en el configurador** y no se mezclan: los
  `--ui-*` son la piel de la herramienta, los `--p-*` la paleta que el cliente
  elige y solo valen dentro de `.maqueta`.
- Si WebMaker gana una paleta o una sección, se añade en
  `configurador/datos.js`. Ofrecer algo que el taller no sabe construir es una
  promesa rota.

## Defecto de plantilla encontrado

`left: -9999px` para esconder el enlace de salto infla el `scrollWidth` del
documento: medidos **22px de desplazamiento horizontal** en un viewport de
390px. Se corrigió escondiéndolo hacia arriba (`top: -100px`). La plantilla de
WebMaker tiene el mismo patrón y debería revisarse allí.

## Pendiente

- Confirmar el buzón en FormSubmit: el primer envío del configurador no llega
  hasta aceptar el correo de activación.
- `og.webp` para las tarjetas de redes sociales.
- El configurador no guarda lo tecleado: al recargar se pierde. Un
  `localStorage` con try/catch lo arreglaría.
