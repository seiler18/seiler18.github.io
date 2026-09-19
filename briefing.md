# Briefing — seiler18.github.io

- **Fecha:** 2026-09-19
- **Estado:** aprobado y construido (2026-09-19)
- **Fuentes:** conversación del 2026-09-19, `Curriculo/CLAUDE.md`,
  `WebMaker/CLAUDE.md`, `Negocios Digitales/CLAUDE.md`, listado de repos de
  `seiler18` en GitHub.

## Qué es esto

El **sitio raíz** de Jesús Seiler: la página que se abre al escribir
`seiler18.github.io`, y desde la que se llega a todo lo demás. No sustituye al
CV: lo enmarca.

Hoy la presencia digital está repartida en piezas que no se conocen entre sí —
un CV en `/Curriculo/`, un sitio de cliente en `/ceder/`, unos repos de Java,
y una línea de consultoría ISO que no está publicada en ninguna parte. Quien
llega a una de ellas no tiene forma de saber que existen las otras.

Este sitio es el índice que faltaba, y a la vez la vitrina de las dos líneas
de trabajo que hoy no se ven: **ISO** y **sitios web**.

## Objetivo del sitio

Tres cosas, en este orden de importancia:

1. Que quien busque a Jesús encuentre **las cuatro caras** y no solo una.
2. Que un cliente B2B de **consultoría ISO** entienda qué se ofrece y escriba.
3. Que un cliente de **sitio web** pueda configurar lo que quiere y enviar un
   briefing sin que haya una llamada de por medio.

No es objetivo vender un producto autoservicio ni cobrar en línea. El sitio
capta y cualifica; el trabajo se sigue entregando a mano.

## Público

- **Reclutadores y empresas** que buscan a un analista administrativo /
  auditor interno. Llegan por el CV y por LinkedIn. Quieren ver trayectoria.
- **Empresas medianas chilenas** con un proceso de certificación ISO encima
  (9001, 14001, 45001, 27001, 22301, 20000-1). Nicho B2B, ticket alto, muy
  poca oferta seria en español. Es el público con más valor.
- **Pymes y profesionales** que necesitan un sitio web y no saben por dónde
  empezar. Llegan por recomendación.

## Identidad

- **Paleta:** pendiente — se decide con `definir-identidad`. Restricción: debe
  convivir con el cyan de marca que ya usa el CV sin que parezcan dos marcas
  distintas.
- **Tipografía:** Raleway, por coherencia con el CV (pesos 400/500/600/700/800).
- **Armazón:** topbar. La sidebar es del CV y le da su carácter; el hub debe
  leerse distinto y más ligero.
- **Tono:** el de la casa — directo, sin humo, sin motivación vacía. «Honestidad
  antes que marketing.»

## Secciones

| # | Sección | Id | Qué hace |
|---|---|---|---|
| 1 | Portada | `inicio` | Quién es Jesús en una frase y las cuatro caras |
| 2 | Las cuatro caras | `caras` | CV · ISO · Web · Proyectos. Tarjeta y enlace |
| 3 | Contacto | `contacto` | FormSubmit + WhatsApp, igual que el CV |

**CAMBIO SOBRE EL PLAN ORIGINAL (2026-09-19).** ISO y Sitios web ya no son
secciones de aquí: el usuario pidió que ISO fuera un sitio de venta completo,
y se construyó aparte en `seiler18/sistemas-gestion`. El hub quedó reducido a
lo que de verdad le toca —repartir tráfico— y eso es una mejora: un hub que
explica los servicios compite con el sitio que los vende.

Las cuatro caras viven en `src/data/trabajo.js`, en una sola rejilla de
tarjetas. Añadir una cara es añadir un objeto ahí.

El **configurador** (fase 3) no es una sección: es una página propia en
`/web/configurador/`, enlazada desde la sección 4.

## Contenido por sección

- **Portada y caras:** se escribe aquí, desde cero. No se recicla del CV.
- **ISO:** materia prima en `Negocios Digitales/organizador_iso/`. ⚖️ **Antes
  de publicar una sola línea hay que pasar por
  `organizador_iso/contexto/limites_legales.md`.** Resumen de esos límites: no
  se reproduce el texto de las normas, no se usa la palabra «certificador», no
  se usan logos de ISO/INN/organismos, y **jamás** entra material de OPCIONES
  S.A. (NDA vigente). Nada de `_privado/` sale de esa carpeta.
- **Web:** se escribe desde `WebMaker/referencia/` y `ceder`. Nada del cliente
  de CEDER que no esté ya publicado en su propio sitio.
- **Proyectos:** enlaces al CV y a los repos públicos. No se duplica catálogo.

## Contacto

Mismo mecanismo que el CV, ya probado: **FormSubmit** (`/ajax/`, sin cuenta,
sin backend) + enlace `wa.me`. Ver `Curriculo/src/data/contact.js`.

> Ojo con FormSubmit: **el primer envío desde un dominio nuevo no llega** —
> manda un correo de activación que hay que confirmar una vez. Hay que hacerlo
> antes de anunciar el sitio, no después.

- **Correo:** `ichbinseiler@gmail.com`
- **WhatsApp:** `56953292612`

## Publicación

- **Repo:** `seiler18/seiler18.github.io` — **público**. El nombre no es
  opcional: es el que GitHub exige para un user-site.
- **URL:** `https://seiler18.github.io/` — sin subcarpeta, así que
  `vite.config.js` lleva `base: '/'` (no `/repo/`, que es el caso habitual de
  la plantilla). Es la trampa más silenciosa de este proyecto.
- **Deploy:** GitHub Actions → `gh-pages`, igual que el CV.

## Assets que faltan

- [ ] Foto o retrato para la portada (el CV tiene uno; decidir si se reutiliza).
- [ ] Captura de `ceder` para la vitrina de sitios web.
- [ ] Contenido real de los servicios ISO: qué se ofrece exactamente, en qué
      formato y a qué precio. Hoy no existe escrito para publicar.
- [ ] Estado del `iso-toolkit`: según `Negocios Digitales/CLAUDE.md` estaba a
      medias (`00_mapa_anexo_sl.md` sin completar). Si no hay contenido que
      enseñar, la sección ISO enlaza al servicio y no al repo.

## Fuera de alcance

Decidido explícitamente en la conversación del 2026-09-19:

- **Ejecutable descargable.** El «diseño a medida» lo produce un LLM, no un
  algoritmo, así que un `.exe` solo puede ser un rellenador de plantilla o un
  cliente de API con la clave dentro. Además: SmartScreen bloquea binarios sin
  firma (~300 USD/año), no hay versión Mac, y cada mejora exige que el cliente
  vuelva a descargar. El configurador web no tiene ninguno de esos problemas.
- **Generación de sitios con IA desde el navegador.** Necesita backend propio,
  cobro por uso y control de abuso. Se reevalúa si el configurador demuestra
  que se usa.
- **ZIP autoservicio del proyecto Vite.** Entregaría plantilla con otros
  textos, y quien no sepa usar Node se queda a medias.
- **Publicar `cnp_marca_personal` y `gestor_negocios_digitales`.** Uno está
  pausado por decisión del usuario y el otro en desarrollo. Sus carpetas son
  material de trabajo interno, no producto.

## Las tres fases

1. **Hub.** Portada + las cuatro caras + contacto. Contenido sobre plantilla.
2. **Vitrina ISO.** La cara con valor comercial. Depende de que exista
   contenido publicable y de los límites legales.
3. **Configurador.** Formulario + vista previa en vivo sobre la plantilla real
   de WebMaker → genera `briefing.md` y lo envía por FormSubmit. Es la única
   fase con código nuevo de verdad.

## Decisiones pendientes, fuera de este briefing

- **`Curriculo` es un repo privado.** El sitio se ve, el código no. Si la idea
  es que un reclutador pueda mirarlo, hay que hacerlo público — y antes,
  revisar que no haya quedado nada sensible en el historial.

## Cerrar

Este briefing es **borrador**. Para construir hace falta:

1. Que el usuario lo apruebe o lo corrija.
2. Resolver la identidad (`definir-identidad`).
3. Que exista contenido ISO publicable, o aceptar que la fase 2 espera.

El trabajo se ejecuta desde **WebMaker** (`levantar-sitio`), no desde
`Curriculo`: las skills viven allí.
