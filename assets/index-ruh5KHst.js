(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={nombre:`Jesús Seiler`,nombreCorto:`J. Seiler`,lema:`Normas, sistemas y sitios que se sostienen`,descripcion:`Auditor interno ISO y desarrollador. Sistemas de gestión multinorma, automatización y sitios web. Puerto Montt, Chile.`,url:`https://seiler18.github.io/`,armazon:`topbar`,logo:`assets/img/avatar.webp`,monograma:`JS`,idioma:`es`},t=[{label:`LinkedIn`,href:`https://www.linkedin.com/in/ichbinseiler/`,icon:`fa-brands fa-linkedin`},{label:`GitHub`,href:`https://github.com/seiler18`,icon:`fa-brands fa-github`},{label:`GitLab`,href:`https://gitlab.com/seiler18`,icon:`fa-brands fa-gitlab`}],n=[],r={antetitulo:`Puerto Montt, Chile`,bajada:`Auditor interno en seis normas ISO y desarrollador. Tres cosas distintas que hago con el mismo criterio: sistemas de gestión, software y sitios web.`,acciones:[{label:`Ver en qué trabajo`,href:`#trabajo`,icon:`fa-solid fa-arrow-down`},{label:`Escríbeme`,href:`#contacto`,icon:`fa-solid fa-paper-plane`}],cinta:[],siguiente:`trabajo`};function i(){let t=r.acciones.map((e,t)=>`
        <a class="hero-btn ${t===0?`primario`:`fantasma`}" href="${e.href}"
           ${e.externo?`target="_blank" rel="noopener noreferrer"`:``}>
          ${e.icon?`<i class="${e.icon}" aria-hidden="true"></i>`:``}${e.label}
        </a>
      `).join(``),n=r.cinta.length?`
      <ul class="hero-cinta" aria-label="En cifras" data-anim="subir">
        ${r.cinta.map(e=>`
          <li>
            <span class="hero-cinta-dato">${e.dato}</span>
            <span class="hero-cinta-pie">${e.pie}</span>
          </li>
        `).join(``)}
      </ul>
    `:``;return`
    <header class="hero" id="inicio">
      <div class="hero-fondo" aria-hidden="true"></div>

      <!-- SECUENCIA DE ENTRADA DE LA PORTADA. El atributo data-anim-secuencia
           escalona a los hijos 70ms cada uno (src/lib/reveal.js), y el orden
           del HTML es el orden en el que se quiere que se lean: antetítulo →
           nombre → lema → bajada → botones → cifras. Es lo mismo que se
           leería sin animación, solo que la página lo va marcando. Los seis a
           la vez —lo que había antes, sin animación ninguna en la portada—
           obligan al visitante a decidir por dónde empieza.

           OJO: en este comentario no puede haber comillas invertidas. Está
           DENTRO de un literal de plantilla, y una comilla invertida lo cierra
           ahí mismo: el archivo deja de compilar con un error que señala la
           línea siguiente y no dice nada del comentario. -->
      <div class="hero-contenido" data-anim-secuencia>
        ${r.antetitulo?`<p class="hero-antetitulo" data-anim="subir">${r.antetitulo}</p>`:``}
        <h1 class="hero-titulo" data-anim="subir">${e.nombre}</h1>
        ${e.lema?`<p class="hero-lema" data-anim="subir">«${e.lema}»</p>`:``}
        <p class="hero-bajada" data-anim="subir">${r.bajada}</p>

        <div class="hero-acciones" data-anim="subir">${t}</div>
        ${n}
      </div>

      <!-- Indicador de que hay más abajo. Se oculta en móvil (responsive.css):
           en una pantalla corta cae encima de los botones. -->
      <a class="hero-scroll" href="#${r.siguiente}" aria-label="Ir a la siguiente sección">
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </a>
    </header>
  `}function a({id:e,eyebrow:t,titulo:n,subtitulo:r,contenido:i,sinSeparador:a=!1}){return`
    <section class="section" id="${e}">
      ${a?``:`<div class="section-divider" aria-hidden="true"><span></span></div>`}
      <div class="section-inner">
        ${t||n||r?`
        <div class="section-head" data-anim="subir">
          ${t?`<span class="section-eyebrow">${t}</span>`:``}
          ${n?`<h2 class="section-title">${n}</h2>`:``}
          ${n?`<div class="section-rule"></div>`:``}
          ${r?`<p class="section-subtitle">${r}</p>`:``}
        </div>
      `:``}
        ${i}
      </div>
    </section>
  `}function o(e){let t=e.items||[],n=e=>{let t=e.imagen?`<div class="tarjeta-portada"><img src="${e.imagen.src}" alt="${e.imagen.alt}" loading="lazy"></div>`:e.icon?`<div class="tarjeta-icono"><i class="${e.icon}" aria-hidden="true"></i></div>`:``,n=e.enlace?`
        <p class="tarjeta-accion">
          <a class="btn-linea" href="${e.enlace.href}"
             ${e.enlace.externo?`target="_blank" rel="noopener noreferrer"`:``}>
            ${e.enlace.label}
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      `:``;return`
      <article class="tarjeta" ${e.area?`data-area="${e.area}"`:``} data-anim="subir">
        ${t}
        <div class="tarjeta-cuerpo">
          <h3 class="tarjeta-titulo">${e.titulo}</h3>
          ${e.texto?`<p class="tarjeta-texto">${e.texto}</p>`:``}
          ${n}
        </div>
      </article>
    `},r=``;if(e.filtro){let e=[...new Set(t.map(e=>e.area).filter(Boolean))],n=(e,t,n)=>`
      <button type="button" class="filtro ${e===`todas`?`is-active`:``}"
              data-filtro="${e}">
        ${t} <span class="filtro-cuenta">${n}</span>
      </button>
    `;r=`
      <div class="filtros" role="group" aria-label="Filtrar por área" data-anim="subir">
        ${n(`todas`,`Todas`,t.length)}
        ${e.map(e=>n(e,e,t.filter(t=>t.area===e).length)).join(``)}
      </div>
    `}let i=`
    ${r}
    <!-- data-anim-secuencia: las tarjetas entran escalonadas en vez de todas
         a la vez. Va en la rejilla y no en cada tarjeta porque el retardo lo
         calcula reveal.js con la posición del hijo: añadir una tarjeta no
         obliga a renumerar nada. -->
    <div class="rejilla" data-densidad="${e.densidad||`amplia`}" data-rejilla="${e.id}"
         data-anim-secuencia>
      ${t.map(n).join(``)}
    </div>
    <p class="rejilla-vacia" hidden>No hay nada en esta área todavía.</p>
  `;return a({...e,contenido:i})}function s(){for(let e of document.querySelectorAll(`.filtros`)){let t=e.closest(`.section`),n=t?.querySelector(`.rejilla`),r=t?.querySelector(`.rejilla-vacia`);n&&e.addEventListener(`click`,t=>{let i=t.target.closest(`[data-filtro]`);if(!i)return;for(let t of e.querySelectorAll(`[data-filtro]`))t.classList.toggle(`is-active`,t===i);let a=i.dataset.filtro,o=0;for(let e of n.querySelectorAll(`.tarjeta`)){let t=a===`todas`||e.dataset.area===a;e.hidden=!t,t&&o++}r&&(r.hidden=o>0)})}}var c={eyebrow:`Hablemos`,titulo:`Contacto`,subtitulo:`Escríbame por donde prefiera. Respondo yo, no un formulario automático.`,correo:`ichbinseiler@gmail.com`,whatsapp:`56953292612`,motivos:[`Sistemas de gestión ISO`,`Un sitio web`,`Una oferta de trabajo`,`Otro motivo`],canales:[{label:`Correo`,valor:`ichbinseiler@gmail.com`,href:`mailto:ichbinseiler@gmail.com`,icon:`fa-solid fa-envelope`},{label:`Dónde estoy`,valor:`Puerto Montt, Chile · trabajo a distancia`,href:null,icon:`fa-solid fa-location-dot`}]},l=`https://formsubmit.co/ajax/${c.correo}`,u=c.whatsapp?`https://wa.me/${c.whatsapp}`:``;function d(){let e=c.motivos.map(e=>`<option value="${e}">${e}</option>`).join(``),t=c.canales.map(e=>`
      <li>
        <i class="${e.icon}" aria-hidden="true"></i>
        <div>
          <span class="canal-etiqueta">${e.label}</span>
          ${e.href?`<a href="${e.href}">${e.valor}</a>`:`<span>${e.valor}</span>`}
        </div>
      </li>
    `).join(``),n=`
    <div class="contacto-columnas" data-anim-secuencia>
      <form class="contacto-form" id="formContacto" novalidate data-anim="subir">
        <div class="contacto-grid">
          <div class="campo">
            <label for="cf-nombre">Nombre</label>
            <input type="text" id="cf-nombre" name="nombre" required maxlength="80"
                   autocomplete="name" placeholder="Cómo te llamas">
          </div>
          <div class="campo">
            <label for="cf-correo">Tu correo</label>
            <input type="email" id="cf-correo" name="correo" required maxlength="120"
                   autocomplete="email" placeholder="para poder responderte">
          </div>
          <div class="campo campo-ancho">
            <label for="cf-motivo">Motivo</label>
            <select id="cf-motivo" name="motivo">${e}</select>
          </div>
          <div class="campo campo-ancho">
            <label for="cf-mensaje">Mensaje</label>
            <textarea id="cf-mensaje" name="mensaje" required maxlength="1500" rows="5"
                      placeholder="Cuéntanos qué necesitas"></textarea>
          </div>
        </div>

        <!-- Trampa para bots: FormSubmit descarta el envío si llega rellena.
             Un humano no la ve, así que siempre llega vacía. -->
        <input type="text" name="_honey" class="campo-trampa" tabindex="-1"
               autocomplete="off" aria-hidden="true">

        <div class="contacto-acciones">
          <button type="submit" class="btn primario" id="btnCorreo">
            <i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Enviar por correo
          </button>
          ${u?`<button type="button" class="btn fantasma" id="btnWhatsapp">
                   <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Enviar por WhatsApp
                 </button>`:``}
        </div>

        <!-- aria-live: quien use lector de pantalla oye el resultado sin
             tener que ir a buscarlo. -->
        <p class="contacto-aviso" id="avisoContacto" role="status" aria-live="polite"></p>
      </form>

      <aside class="contacto-datos" data-anim="subir">
        <h3>Dónde encontrarnos</h3>
        <ul class="canales">${t}</ul>
      </aside>
    </div>
  `;return a({id:`contacto`,eyebrow:c.eyebrow,titulo:c.titulo,subtitulo:c.subtitulo,contenido:n})}function f(){let e=document.getElementById(`formContacto`);if(!e)return;let t=document.getElementById(`avisoContacto`),n=document.getElementById(`btnCorreo`),r=document.getElementById(`btnWhatsapp`);function i(e,n){t.textContent=e,t.className=`contacto-aviso visible ${n}`}let a=()=>({nombre:e.nombre.value.trim(),correo:e.correo.value.trim(),motivo:e.motivo.value,mensaje:e.mensaje.value.trim()});function o(){return e.checkValidity()?!0:(i(`Faltan datos: revisa el nombre, el correo y el mensaje.`,`malo`),e.querySelector(`:invalid`)?.focus(),!1)}e.addEventListener(`submit`,async t=>{if(t.preventDefault(),!o())return;let r=a();n.disabled=!0,i(`Enviando…`,`nota`);try{let t=await fetch(l,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({Nombre:r.nombre,Correo:r.correo,Motivo:r.motivo,Mensaje:r.mensaje,_subject:`Web · ${r.motivo} — ${r.nombre}`,_template:`table`,_captcha:`false`,_honey:e.elements._honey.value})}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(`HTTP ${t.status}`);if(n.success===`false`||n.success===!1){i(n.message||`El envío quedó pendiente de confirmación.`,`nota`);return}e.reset(),i(`¡Mensaje enviado! Te responderemos al correo que dejaste.`,`ok`)}catch(e){console.error(`No se pudo enviar el formulario:`,e),i(`No se pudo enviar. Escríbenos a ${c.correo}.`,`malo`)}finally{n.disabled=!1}}),r?.addEventListener(`click`,()=>{if(!o())return;let e=a(),t=`Hola, escribo desde la web.\n\nMotivo: ${e.motivo}\nNombre: ${e.nombre}\nCorreo: ${e.correo}\n\n${e.mensaje}`;window.open(`${u}?text=${encodeURIComponent(t)}`,`_blank`,`noopener`),i(`Se abrió WhatsApp con el mensaje listo: solo falta enviarlo.`,`ok`)})}var p={id:`trabajo`,eyebrow:`En qué trabajo`,titulo:`Cuatro puertas`,subtitulo:`Cada una lleva a un sitio propio. Elija la que le sirva.`,filtro:!1,densidad:`amplia`,items:[{titulo:`Sistemas de gestión ISO`,texto:`Estructura documental del sistema en SharePoint, Drive o Dropbox —que es donde de verdad se gana o se pierde una auditoría—, diagnóstico de brechas, integración multinorma y automatización. Auditor interno en ISO 9001, 14001, 45001, 27001, 22301 y 20000-1.`,icon:`fa-solid fa-shield-halved`,enlace:{label:`Ver servicios`,href:`https://seiler18.github.io/sistemas-gestion/`,externo:!0}},{titulo:`Currículum y portafolio`,texto:`La trayectoria completa: experiencia, certificaciones verificables y el portafolio de proyectos de desarrollo. Con el CV descargable en español y en inglés.`,icon:`fa-solid fa-id-card`,enlace:{label:`Ver el currículum`,href:`https://seiler18.github.io/Curriculo/`,externo:!0}},{titulo:`Sitios web`,texto:`Sitios rápidos y sin dependencias innecesarias, construidos sobre una plantilla propia y no sobre un tema comprado. Hay un configurador: elija estructura, color y tipografía, véalo en vivo y envíe el briefing en cinco minutos. Un ejemplo publicado: <a href="https://seiler18.github.io/ceder/" target="_blank" rel="noopener noreferrer">CEDER SpA</a>.`,icon:`fa-solid fa-window-maximize`,enlace:{label:`Armar el mío`,href:`configurador/`}},{titulo:`Código abierto`,texto:`Los repositorios de todo lo anterior: las plantillas, las herramientas y los proyectos de práctica. Está publicado porque se puede revisar, que es la única forma seria de demostrar cómo se trabaja.`,icon:`fa-brands fa-github`,enlace:{label:`Ver en GitHub`,href:`https://github.com/seiler18`,externo:!0}}]},m=[{id:`inicio`,label:`Inicio`,short:`Inicio`,icon:`fa-solid fa-house`,render:i},{id:`trabajo`,label:`En qué trabajo`,short:`Trabajo`,icon:`fa-solid fa-grip`,render:()=>o(p)},{id:`contacto`,label:`Contacto`,short:`Contacto`,icon:`fa-solid fa-paper-plane`,render:d}],h=m.filter(e=>e.enMenu!==!1);function g(t){return`
    <a class="${t}" href="#inicio" aria-label="Ir al inicio">
      ${e.logo?`<img class="${t}-logo" src="${e.logo}" alt="Foto de ${e.nombre}" width="40" height="40">`:`<span class="${t}-monograma" aria-hidden="true">${e.monograma}</span>`}
      <span class="${t}-texto">
        <span class="${t}-nombre">${e.nombre}</span>
        ${e.lema?`<span class="${t}-lema">${e.lema}</span>`:``}
      </span>
    </a>
  `}function _(e){return h.map(t=>`
      <li>
        <a class="${e}" href="#${t.id}" data-spy-link="${t.id}">
          <i class="${t.icon}" aria-hidden="true"></i>
          <span class="nav-largo">${t.label}</span>
          <span class="nav-corto">${t.short}</span>
        </a>
      </li>
    `).join(``)}function v(){return n.map(e=>`
      <a class="btn-descarga" href="${e.href}" target="_blank" rel="noopener noreferrer"
         download="${e.download}">
        <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>${e.label}
      </a>
    `).join(``)}function y(){return t.map(e=>`
      <a href="${e.href}" target="_blank" rel="noopener noreferrer"
         title="${e.label}" aria-label="${e.label}">
        <i class="${e.icon}" aria-hidden="true"></i>
      </a>
    `).join(``)}function b(){return`
    <header class="topbar">
      <div class="topbar-inner">
        ${g(`marca`)}

        <nav class="topbar-nav" id="menuPrincipal" aria-label="Secciones">
          <ul>${_(`nav-link`)}</ul>
          ${n.length?`<div class="topbar-extras">${v()}</div>`:``}
        </nav>

        <button type="button" class="menu-boton" id="botonMenu"
                aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menú">
          <span class="menu-boton-barras" aria-hidden="true"></span>
        </button>
      </div>
    </header>
  `}function x(){return`
    <aside class="sidenav" aria-label="Secciones">
      <div class="sidenav-brand">${g(`marca`)}</div>
      <ul class="sidenav-nav">${_(`nav-link`)}</ul>
      <div class="sidenav-actions">
        ${v()}
        ${t.length?`<div class="sidenav-social">${y()}</div>`:``}
      </div>
    </aside>

    <!-- En el armazón 'sidebar' la barra superior queda casi vacía en
         escritorio, pero en móvil es donde vive la marca: la sidebar se
         convierte en barra de iconos y su cabecera desaparece por falta de
         sitio. Sin esto, el logo no se ve en el celular. -->
    <header class="topbar topbar-minima">
      <div class="topbar-inner">
        ${g(`marca marca-movil`)}
        ${n.length?`<div class="topbar-extras">${v()}</div>`:``}
      </div>
    </header>
  `}function S(){return e.armazon===`sidebar`?x():b()}function C(){let e=document.getElementById(`botonMenu`),t=document.getElementById(`menuPrincipal`);if(!e||!t)return;let n=()=>{t.classList.remove(`abierto`),e.setAttribute(`aria-expanded`,`false`),e.setAttribute(`aria-label`,`Abrir menú`)};e.addEventListener(`click`,()=>{let n=t.classList.toggle(`abierto`);e.setAttribute(`aria-expanded`,String(n)),e.setAttribute(`aria-label`,n?`Cerrar menú`:`Abrir menú`)}),t.addEventListener(`click`,e=>{e.target.closest(`a`)&&n()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&n()}),window.matchMedia(`(min-width: 992px)`).addEventListener(`change`,e=>{e.matches&&n()})}function w(){let n=h.map(e=>`<li><a href="#${e.id}">${e.label}</a></li>`).join(``),r=t.map(e=>`
      <a href="${e.href}" target="_blank" rel="noopener noreferrer" aria-label="${e.label}">
        <i class="${e.icon}" aria-hidden="true"></i> <span>${e.label}</span>
      </a>
    `).join(``);return`
    <footer class="pie">
      <div class="pie-inner">
        <div class="pie-marca">
          <span class="pie-nombre">${e.nombre}</span>
          ${e.lema?`<p class="pie-lema">«${e.lema}»</p>`:``}
          ${c.correo?`<p class="pie-dato"><a href="mailto:${c.correo}">${c.correo}</a></p>`:``}
        </div>

        <nav class="pie-nav" aria-label="Mapa del sitio">
          <h2>Secciones</h2>
          <ul>${n}</ul>
        </nav>

        ${t.length?`<div class="pie-redes">
                 <h2>Síguenos</h2>
                 <div class="pie-redes-lista">${r}</div>
               </div>`:``}
      </div>

      <p class="pie-legal">
        © ${e.nombre} ${new Date().getFullYear()}. Todos los derechos reservados.
      </p>
    </footer>
  `}function T({linkSelector:e=`[data-spy-link]`,offset:t=96}={}){let n=new Map;for(let t of document.querySelectorAll(e)){let e=document.getElementById(t.dataset.spyLink);e&&(n.has(e)||n.set(e,{section:e,links:[]}),n.get(e).links.push(t))}let r=[...n.values()];if(!r.length)return()=>{};let i=null,a=!1;function o(e){if(e!==i){if(i)for(let e of i.links)e.classList.remove(`is-active`),e.removeAttribute(`aria-current`);for(let t of e.links)t.classList.add(`is-active`),t.setAttribute(`aria-current`,`true`);i=e}}function s(){a=!1;let e=window.scrollY;if(e+window.innerHeight>=document.documentElement.scrollHeight-4){o(r[r.length-1]);return}let n=e+t,i=r[0];for(let t of r)if(t.section.getBoundingClientRect().top+e<=n)i=t;else break;o(i)}function c(){a||(a=!0,requestAnimationFrame(s))}return window.addEventListener(`scroll`,c,{passive:!0}),window.addEventListener(`resize`,c),window.addEventListener(`load`,c),s(),c}var E=`0px 0px -12% 0px`,D=70,O=6;function k(){let e=document.querySelectorAll(`[data-anim]`);if(!e.length)return;if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches||!(`IntersectionObserver`in window)){for(let t of e)t.classList.add(`anim-visible`);return}let t=e=>{let t=Number(e.dataset.animEspera);if(t)return t;let n=e.parentElement;if(!n||!n.hasAttribute(`data-anim-secuencia`))return 0;let r=[...n.children].filter(e=>e.hasAttribute(`data-anim`)).indexOf(e);return Math.min(r,O)*D},n=new IntersectionObserver((e,n)=>{for(let r of e){if(!r.isIntersecting)continue;let e=r.target,i=t(e);i&&(e.style.transitionDelay=`${i}ms`),e.classList.add(`anim-visible`),n.unobserve(e)}},{rootMargin:E,threshold:.05}),r=e=>{let t=e.target;t.hasAttribute(`data-anim`)&&t.style.transitionDelay&&(t.style.transitionDelay=``)};for(let t of e)t.addEventListener(`transitionend`,r,{once:!0}),n.observe(t)}function A(){let e=document.querySelectorAll(`[data-modal]`);if(e.length){for(let t of e)t.addEventListener(`click`,()=>{let e=document.querySelector(t.dataset.modal);if(!e){console.warn(`Modal no encontrado: ${t.dataset.modal}`);return}e.parentElement!==document.body&&document.body.appendChild(e),e.showModal()});for(let e of document.querySelectorAll(`dialog.modal`)){e.addEventListener(`click`,t=>{let n=e.querySelector(`.modal-caja`);if(!n)return;let r=n.getBoundingClientRect();t.clientX>=r.left&&t.clientX<=r.right&&t.clientY>=r.top&&t.clientY<=r.bottom||e.close()});for(let t of e.querySelectorAll(`[data-cerrar-modal]`))t.addEventListener(`click`,()=>e.close())}}}var j=document.getElementById(`app`);document.body.dataset.armazon=e.armazon,j.innerHTML=`
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  ${S()}
  <div class="app-main">
    <main id="contenido">
      ${m.map(e=>e.render()).join(`
`)}
    </main>
    ${w()}
  </div>
`;var M=T({offset:96});C(),k(),A(),s(),f(),window.addEventListener(`load`,M),document.addEventListener(`click`,e=>{e.target.closest(`[data-filtro]`)&&setTimeout(M,60)});