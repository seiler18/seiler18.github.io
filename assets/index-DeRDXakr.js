(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={nombre:`Jesús Seiler`,nombreCorto:`J. Seiler`,lema:`Normas, sistemas y sitios que se sostienen`,descripcion:`Auditor interno ISO y desarrollador. Sistemas de gestión multinorma, automatización y sitios web. Puerto Montt, Chile.`,url:`https://seiler18.github.io/`,armazon:`topbar`,logo:`assets/img/avatar.webp`,monograma:`JS`,idioma:`es`},t=[{label:`LinkedIn`,href:`https://www.linkedin.com/in/ichbinseiler/`,icon:`fa-brands fa-linkedin`},{label:`GitHub`,href:`https://github.com/seiler18`,icon:`fa-brands fa-github`},{label:`GitLab`,href:`https://gitlab.com/seiler18`,icon:`fa-brands fa-gitlab`}],n=[],r={antetitulo:`Puerto Montt, Chile`,bajada:`Auditor interno en seis normas ISO y desarrollador. Tres cosas distintas que hago con el mismo criterio: sistemas de gestión, software y sitios web.`,acciones:[{label:`Ver en qué trabajo`,href:`#trabajo`,icon:`fa-solid fa-arrow-down`},{label:`Escríbeme`,href:`#contacto`,icon:`fa-solid fa-paper-plane`}],cinta:[],siguiente:`trabajo`},i=class{constructor(e,t,n){this.x=e,this.y=t,this.z=n}dot2(e,t){return this.x*e+this.y*t}},a=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],o=class{constructor(e=0){this.grad3=[new i(1,1,0),new i(-1,1,0),new i(1,-1,0),new i(-1,-1,0),new i(1,0,1),new i(-1,0,1),new i(1,0,-1),new i(-1,0,-1),new i(0,1,1),new i(0,-1,1),new i(0,1,-1),new i(0,-1,-1)],this.perm=Array(512),this.gradP=Array(512),e>0&&e<1&&(e*=65536),e=Math.floor(e),e<256&&(e|=e<<8);for(let t=0;t<256;t++){let n=t&1?a[t]^e&255:a[t]^e>>8&255;this.perm[t]=this.perm[t+256]=n,this.gradP[t]=this.gradP[t+256]=this.grad3[n%12]}}fade(e){return e*e*e*(e*(e*6-15)+10)}lerp(e,t,n){return(1-n)*e+n*t}perlin2(e,t){let n=Math.floor(e),r=Math.floor(t);e-=n,t-=r,n&=255,r&=255;let i=this.gradP[n+this.perm[r]].dot2(e,t),a=this.gradP[n+this.perm[r+1]].dot2(e,t-1),o=this.gradP[n+1+this.perm[r]].dot2(e-1,t),s=this.gradP[n+1+this.perm[r+1]].dot2(e-1,t-1),c=this.fade(e);return this.lerp(this.lerp(i,o,c),this.lerp(a,s,c),this.fade(t))}};function s(e,t={}){let n={colorA:`#2563eb`,colorB:`#0e7490`,opacidad:.5,grosor:1,xGap:12,yGap:36,ampX:32,ampY:16,velX:.0125,velY:.005,friccion:.925,tension:.005,maxCursor:100,...t},r=document.createElement(`canvas`),i=r.getContext(`2d`,{alpha:!0});if(!i)return null;r.style.cssText=`position:absolute;inset:0;width:100%;height:100%;display:block`,e.appendChild(r);let a=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,s=Math.min(window.devicePixelRatio||1,2),c=new o(Math.random()),l={x:-10,y:0,lx:0,ly:0,sx:0,sy:0,vs:0,a:0,puesto:!1},u=0,d=0,f=[],p=null,m=0,h=!1;function g(){let t=e.getBoundingClientRect();u=t.width,d=t.height,r.width=Math.max(1,Math.round(u*s)),r.height=Math.max(1,Math.round(d*s)),i.setTransform(s,0,0,s,0,0);let a=i.createLinearGradient(0,0,u,d);a.addColorStop(0,n.colorA),a.addColorStop(1,n.colorB),p=a,f=[];let o=u+200,c=d+30,l=Math.ceil(o/n.xGap),m=Math.ceil(c/n.yGap),h=(u-n.xGap*l)/2,g=(d-n.yGap*m)/2;for(let e=0;e<=l;e++){let t=[];for(let r=0;r<=m;r++)t.push({x:h+n.xGap*e,y:g+n.yGap*r,ox:0,oy:0,cx:0,cy:0,vx:0,vy:0});f.push(t)}}function _(e){let t=Math.max(175,l.vs);for(let r of f)for(let i of r){let r=c.perlin2((i.x+e*n.velX)*.002,(i.y+e*n.velY)*.0015)*12;i.ox=Math.cos(r)*n.ampX,i.oy=Math.sin(r)*n.ampY;let a=Math.hypot(i.x-l.sx,i.y-l.sy);if(a<t){let e=Math.cos(a*.001)*(1-a/t);i.vx+=Math.cos(l.a)*e*t*l.vs*65e-5,i.vy+=Math.sin(l.a)*e*t*l.vs*65e-5}i.vx=(i.vx+(0-i.cx)*n.tension)*n.friccion,i.vy=(i.vy+(0-i.cy)*n.tension)*n.friccion,i.cx=Math.min(n.maxCursor,Math.max(-n.maxCursor,i.cx+i.vx*2)),i.cy=Math.min(n.maxCursor,Math.max(-n.maxCursor,i.cy+i.vy*2))}}function v(){i.clearRect(0,0,u,d),i.globalAlpha=n.opacidad,i.lineWidth=n.grosor,i.strokeStyle=p,i.beginPath();for(let e of f){let t=e.length-1;i.moveTo(e[0].x+e[0].ox,e[0].y+e[0].oy);for(let n=1;n<=t;n++){let r=e[n],a=n!==t;i.lineTo(r.x+r.ox+(a?r.cx:0),r.y+r.oy+(a?r.cy:0))}}i.stroke()}function y(e){l.sx+=(l.x-l.sx)*.1,l.sy+=(l.y-l.sy)*.1;let t=l.x-l.lx,n=l.y-l.ly;l.vs=Math.min(100,l.vs+(Math.hypot(t,n)-l.vs)*.1),l.lx=l.x,l.ly=l.y,l.a=Math.atan2(n,t),_(e),v(),m=requestAnimationFrame(y)}function b(){a||m||!h||document.hidden||(m=requestAnimationFrame(y))}function x(){cancelAnimationFrame(m),m=0}function S(t){if(!h)return;let n=e.getBoundingClientRect();l.x=t.clientX-n.left,l.y=t.clientY-n.top,l.puesto||=(l.sx=l.lx=l.x,l.sy=l.ly=l.y,!0)}let C=0;function w(){clearTimeout(C),C=setTimeout(()=>{g(),a&&(_(0),v())},120)}let T=()=>document.hidden?x():b(),E=new IntersectionObserver(([e])=>{h=e.isIntersecting,h?b():x()});return E.observe(e),g(),a?(_(0),v()):window.addEventListener(`pointermove`,S,{passive:!0}),window.addEventListener(`resize`,w),document.addEventListener(`visibilitychange`,T),{destruir(){x(),clearTimeout(C),E.disconnect(),window.removeEventListener(`pointermove`,S),window.removeEventListener(`resize`,w),document.removeEventListener(`visibilitychange`,T),r.remove()}}}function c(){let t=r.acciones.map((e,t)=>`
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
      <!-- Ondas animadas (lib/fondo-waves.js). Las monta initHero() (conducta,
           no render: los componentes de aquí son funciones puras que no tocan
           el DOM). -->
      <div class="hero-ondas" aria-hidden="true"></div>

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
  `}function l(){let e=document.querySelector(`.hero-ondas`);if(!e)return;let t=u(e);window.addEventListener(`tema:cambio`,()=>{t?.destruir(),t=u(e)})}function u(e){let t=getComputedStyle(document.documentElement);return s(e,{colorA:t.getPropertyValue(`--primario-claro`).trim()||`#2563eb`,colorB:t.getPropertyValue(`--acento`).trim()||`#0e7490`,opacidad:parseFloat(t.getPropertyValue(`--opacidad-ondas`))||.5})}function d({id:e,eyebrow:t,titulo:n,subtitulo:r,contenido:i,sinSeparador:a=!1}){return`
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
  `}function f(e){let t=e.items||[],n=e=>{let t=e.imagen?`<div class="tarjeta-portada"><img src="${e.imagen.src}" alt="${e.imagen.alt}" loading="lazy"></div>`:e.icon?`<div class="tarjeta-icono"><i class="${e.icon}" aria-hidden="true"></i></div>`:``,n=e.enlace?`
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
  `;return d({...e,contenido:i})}function p(){for(let e of document.querySelectorAll(`.filtros`)){let t=e.closest(`.section`),n=t?.querySelector(`.rejilla`),r=t?.querySelector(`.rejilla-vacia`);n&&e.addEventListener(`click`,t=>{let i=t.target.closest(`[data-filtro]`);if(!i)return;for(let t of e.querySelectorAll(`[data-filtro]`))t.classList.toggle(`is-active`,t===i);let a=i.dataset.filtro,o=0;for(let e of n.querySelectorAll(`.tarjeta`)){let t=a===`todas`||e.dataset.area===a;e.hidden=!t,t&&o++}r&&(r.hidden=o>0)})}}var m={eyebrow:`Hablemos`,titulo:`Contacto`,subtitulo:`Escríbame por donde prefiera. Respondo yo, no un formulario automático.`,correo:`ichbinseiler@gmail.com`,whatsapp:`56953292612`,motivos:[`Sistemas de gestión ISO`,`Un sitio web`,`Una oferta de trabajo`,`Otro motivo`],canales:[{label:`Correo`,valor:`ichbinseiler@gmail.com`,href:`mailto:ichbinseiler@gmail.com`,icon:`fa-solid fa-envelope`},{label:`Dónde estoy`,valor:`Puerto Montt, Chile · trabajo a distancia`,href:null,icon:`fa-solid fa-location-dot`}]},h=`https://formsubmit.co/ajax/${m.correo}`,g=m.whatsapp?`https://wa.me/${m.whatsapp}`:``;function _(){let e=m.motivos.map(e=>`<option value="${e}">${e}</option>`).join(``),t=m.canales.map(e=>`
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
          ${g?`<button type="button" class="btn fantasma" id="btnWhatsapp">
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
  `;return d({id:`contacto`,eyebrow:m.eyebrow,titulo:m.titulo,subtitulo:m.subtitulo,contenido:n})}function v(){let e=document.getElementById(`formContacto`);if(!e)return;let t=document.getElementById(`avisoContacto`),n=document.getElementById(`btnCorreo`),r=document.getElementById(`btnWhatsapp`);function i(e,n){t.textContent=e,t.className=`contacto-aviso visible ${n}`}let a=()=>({nombre:e.nombre.value.trim(),correo:e.correo.value.trim(),motivo:e.motivo.value,mensaje:e.mensaje.value.trim()});function o(){return e.checkValidity()?!0:(i(`Faltan datos: revisa el nombre, el correo y el mensaje.`,`malo`),e.querySelector(`:invalid`)?.focus(),!1)}e.addEventListener(`submit`,async t=>{if(t.preventDefault(),!o())return;let r=a();n.disabled=!0,i(`Enviando…`,`nota`);try{let t=await fetch(h,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({Nombre:r.nombre,Correo:r.correo,Motivo:r.motivo,Mensaje:r.mensaje,_subject:`Web · ${r.motivo} — ${r.nombre}`,_template:`table`,_captcha:`false`,_honey:e.elements._honey.value})}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(`HTTP ${t.status}`);if(n.success===`false`||n.success===!1){i(n.message||`El envío quedó pendiente de confirmación.`,`nota`);return}e.reset(),i(`¡Mensaje enviado! Te responderemos al correo que dejaste.`,`ok`)}catch(e){console.error(`No se pudo enviar el formulario:`,e),i(`No se pudo enviar. Escríbenos a ${m.correo}.`,`malo`)}finally{n.disabled=!1}}),r?.addEventListener(`click`,()=>{if(!o())return;let e=a(),t=`Hola, escribo desde la web.\n\nMotivo: ${e.motivo}\nNombre: ${e.nombre}\nCorreo: ${e.correo}\n\n${e.mensaje}`;window.open(`${g}?text=${encodeURIComponent(t)}`,`_blank`,`noopener`),i(`Se abrió WhatsApp con el mensaje listo: solo falta enviarlo.`,`ok`)})}var y={id:`trabajo`,eyebrow:`En qué trabajo`,titulo:`Cuatro puertas`,subtitulo:`Cada una lleva a un sitio propio. Elija la que le sirva.`,filtro:!1,densidad:`amplia`,items:[{titulo:`Sistemas de gestión ISO`,texto:`Estructura documental del sistema en SharePoint, Drive o Dropbox —que es donde de verdad se gana o se pierde una auditoría—, diagnóstico de brechas, integración multinorma y automatización. Auditor interno en ISO 9001, 14001, 45001, 27001, 22301 y 20000-1.`,icon:`fa-solid fa-shield-halved`,enlace:{label:`Ver servicios`,href:`https://seiler18.github.io/sistemas-gestion/`,externo:!0}},{titulo:`Currículum y portafolio`,texto:`La trayectoria completa: experiencia, certificaciones verificables y el portafolio de proyectos de desarrollo. Con el CV descargable en español y en inglés.`,icon:`fa-solid fa-id-card`,enlace:{label:`Ver el currículum`,href:`https://seiler18.github.io/Curriculo/`,externo:!0}},{titulo:`Sitios web`,texto:`Sitios rápidos y sin dependencias innecesarias, construidos sobre una plantilla propia y no sobre un tema comprado. Hay un configurador: elija estructura, color y tipografía, véalo en vivo y envíe el briefing en cinco minutos. Un ejemplo publicado: <a href="https://seiler18.github.io/ceder/" target="_blank" rel="noopener noreferrer">CEDER SpA</a>.`,icon:`fa-solid fa-window-maximize`,enlace:{label:`Armar el mío`,href:`configurador/`}},{titulo:`Código abierto`,texto:`Los repositorios de todo lo anterior: las plantillas, las herramientas y los proyectos de práctica. Está publicado porque se puede revisar, que es la única forma seria de demostrar cómo se trabaja.`,icon:`fa-brands fa-github`,enlace:{label:`Ver en GitHub`,href:`https://github.com/seiler18`,externo:!0}}]},b={id:`proyectos`,eyebrow:`Ya en producción`,titulo:`Proyectos publicados`,subtitulo:`Trabajo real, funcionando hoy. Cada tarjeta abre el sitio en vivo.`,filtro:!1,densidad:`amplia`,items:[{titulo:`FinanzasMaker`,texto:`Gastos, ingresos e inversiones por día, mes y año, leídos de los avisos que mandan los bancos por correo: sin pedir claves bancarias. Un Apps Script registra cada movimiento en una hoja de Google y borra el correo; la página suma, compara y da consejos de ahorro.`,icon:`fa-solid fa-wallet`,enlace:{label:`Ver la demo`,href:`https://seiler18.github.io/FinanzasMaker/`,externo:!0}},{titulo:`Gestor de acciones`,texto:`Dashboard de una cartera de acciones: posiciones abiertas, resultado por activo, dividendos por mes, cambio de dólares y alertas. La hoja de Google importa sola los correos de la corredora y la página lee una API de solo lectura en Apps Script.`,icon:`fa-solid fa-chart-line`,enlace:{label:`Ver la demo`,href:`https://seiler18.github.io/gestor-acciones/`,externo:!0}},{titulo:`Regenera Market`,texto:`Marketplace multi-proveedor de productos, experiencias y servicios regenerativos para el turismo colombiano: catálogo sobre Postgres, registro con segundo factor, panel de administración y comunidad. Next.js, Supabase y Vercel.`,icon:`fa-solid fa-leaf`,enlace:{label:`Ver el marketplace`,href:`https://regenera-market.vercel.app/`,externo:!0}},{titulo:`VentasMaker`,texto:`Catálogo, punto de venta e inventario para una tienda de Puerto Montt, sin mensualidad: pedido por WhatsApp, venta con lector de códigos, reportes y etiquetas. Front estático y Google Sheets con Apps Script como base de datos.`,icon:`fa-solid fa-cash-register`,enlace:{label:`Ver el catálogo`,href:`https://seiler18.github.io/VentasMaker/`,externo:!0}},{titulo:`Sitio corporativo Opciones S.A.`,texto:`Nuevo sitio de una empresa chilena de soluciones TI y data center: tema propio de WordPress sin plugins, formulario con protección anti-spam y bandeja de mensajes, y una guía de entrega para el área de Sistemas.`,icon:`fa-solid fa-building`,enlace:{label:`Ver la maqueta`,href:`https://seiler18.github.io/OPCIONES/`,externo:!0}},{titulo:`CEDER SpA`,texto:`Perfil institucional de un centro de estudios de desarrollo regional, pensado también para postular a licitaciones públicas. El primer sitio fabricado con la plantilla propia.`,icon:`fa-solid fa-landmark`,enlace:{label:`Ver el sitio`,href:`https://seiler18.github.io/ceder/`,externo:!0}}]},x=[{id:`inicio`,label:`Inicio`,short:`Inicio`,icon:`fa-solid fa-house`,render:c},{id:`trabajo`,label:`En qué trabajo`,short:`Trabajo`,icon:`fa-solid fa-grip`,render:()=>f(y)},{id:`proyectos`,label:`Proyectos`,short:`Proyectos`,icon:`fa-solid fa-diagram-project`,render:()=>f(b)},{id:`contacto`,label:`Contacto`,short:`Contacto`,icon:`fa-solid fa-paper-plane`,render:_}],S=x.filter(e=>e.enMenu!==!1);function C(t){return`
    <a class="${t}" href="#inicio" aria-label="Ir al inicio">
      ${e.logo?`<img class="${t}-logo" src="${e.logo}" alt="Foto de ${e.nombre}" width="40" height="40">`:`<span class="${t}-monograma" aria-hidden="true">${e.monograma}</span>`}
      <span class="${t}-texto">
        <span class="${t}-nombre">${e.nombre}</span>
        ${e.lema?`<span class="${t}-lema">${e.lema}</span>`:``}
      </span>
    </a>
  `}function w(e){return S.map(t=>`
      <li>
        <a class="${e}" href="#${t.id}" data-spy-link="${t.id}">
          <i class="${t.icon}" aria-hidden="true"></i>
          <span class="nav-largo">${t.label}</span>
          <span class="nav-corto">${t.short}</span>
        </a>
      </li>
    `).join(``)}function T(){return n.map(e=>`
      <a class="btn-descarga" href="${e.href}" target="_blank" rel="noopener noreferrer"
         download="${e.download}">
        <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>${e.label}
      </a>
    `).join(``)}function E(){return t.map(e=>`
      <a href="${e.href}" target="_blank" rel="noopener noreferrer"
         title="${e.label}" aria-label="${e.label}">
        <i class="${e.icon}" aria-hidden="true"></i>
      </a>
    `).join(``)}function D(){return`
    <button class="tema-boton" type="button" data-tema-boton aria-label="Cambiar a modo oscuro">
      <i class="fa-solid fa-moon tema-icono-luna" aria-hidden="true"></i>
      <i class="fa-solid fa-sun tema-icono-sol" aria-hidden="true"></i>
    </button>
  `}function O(){return`
    <header class="topbar">
      <div class="topbar-inner">
        ${C(`marca`)}

        <nav class="topbar-nav" aria-label="Secciones">
          <ul>${w(`nav-link`)}</ul>
        </nav>

        <!-- Fuera del <nav> a propósito: en móvil el <nav> baja a la cinta
             inferior y las descargas y el tema tienen que quedarse arriba. -->
        <div class="topbar-extras">${T()}${D()}</div>
      </div>
    </header>
  `}function k(){return`
    <aside class="sidenav" aria-label="Secciones">
      <div class="sidenav-brand">${C(`marca`)}</div>
      <ul class="sidenav-nav">${w(`nav-link`)}</ul>
      <div class="sidenav-actions">
        ${T()}
        ${D()}
        ${t.length?`<div class="sidenav-social">${E()}</div>`:``}
      </div>
    </aside>

    <!-- En el armazón 'sidebar' la barra superior queda casi vacía en
         escritorio, pero en móvil es donde vive la marca: la sidebar se
         convierte en barra de iconos y su cabecera desaparece por falta de
         sitio. Sin esto, el logo no se ve en el celular. -->
    <header class="topbar topbar-minima">
      <div class="topbar-inner">
        ${C(`marca marca-movil`)}
        <div class="topbar-extras">${T()}${D()}</div>
      </div>
    </header>
  `}function A(){return e.armazon===`sidebar`?k():O()}function j(){let n=S.map(e=>`<li><a href="#${e.id}">${e.label}</a></li>`).join(``),r=t.map(e=>`
      <a href="${e.href}" target="_blank" rel="noopener noreferrer" aria-label="${e.label}">
        <i class="${e.icon}" aria-hidden="true"></i> <span>${e.label}</span>
      </a>
    `).join(``);return`
    <footer class="pie">
      <div class="pie-inner">
        <div class="pie-marca">
          <span class="pie-nombre">${e.nombre}</span>
          ${e.lema?`<p class="pie-lema">«${e.lema}»</p>`:``}
          ${m.correo?`<p class="pie-dato"><a href="mailto:${m.correo}">${m.correo}</a></p>`:``}
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
  `}var M=()=>window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,N=()=>window.matchMedia(`(hover: hover) and (pointer: fine)`).matches;function P(e,t){let n=getComputedStyle(document.documentElement).getPropertyValue(e).trim();return n.endsWith(`ms`)?parseFloat(n):n.endsWith(`s`)?parseFloat(n)*1e3:t}function F(e){!M()&&N()&&document.addEventListener(`pointermove`,t=>{let n=t.target.closest?.(e);if(!n)return;let r=n.getBoundingClientRect();n.style.setProperty(`--mx`,`${t.clientX-r.left}px`),n.style.setProperty(`--my`,`${t.clientY-r.top}px`)},{passive:!0})}function I(e,{alcance:t=90,fuerza:n=.22,maximo:r=9}={}){if(M()||!N())return;let i=[...document.querySelectorAll(e)];i.length&&document.addEventListener(`pointermove`,e=>{for(let a of i){let i=a.getBoundingClientRect(),o=e.clientX-(i.left+i.width/2),s=e.clientY-(i.top+i.height/2),c=Math.max(Math.abs(o)-i.width/2,0),l=Math.max(Math.abs(s)-i.height/2,0);if(Math.hypot(c,l)>t){a.style.removeProperty(`--mag-x`),a.style.removeProperty(`--mag-y`);continue}let u=e=>Math.max(-r,Math.min(r,e*n));a.style.setProperty(`--mag-x`,`${u(o)}px`),a.style.setProperty(`--mag-y`,`${u(s)}px`)}},{passive:!0})}function L(e,{cantidad:t=8,radio:n=38}={}){M()||document.addEventListener(`click`,r=>{let i=r.target.closest?.(e);if(!i)return;let a=i.getBoundingClientRect(),o=r.detail===0?a.left+a.width/2:r.clientX,s=r.detail===0?a.top+a.height/2:r.clientY,c=P(`--lento`,420);for(let e=0;e<t;e++){let r=document.createElement(`span`);r.className=`chispa`,r.setAttribute(`aria-hidden`,`true`),r.style.left=`${o}px`,r.style.top=`${s}px`,document.body.appendChild(r);let i=Math.PI*2*e/t+Math.random()*.5,a=n*(.6+Math.random()*.6);r.animate([{transform:`translate(-50%, -50%) scale(1)`,opacity:1},{transform:`translate(calc(-50% + ${Math.cos(i)*a}px), calc(-50% + ${Math.sin(i)*a}px)) scale(0.2)`,opacity:0}],{duration:c,easing:`cubic-bezier(0.22, 0.61, 0.36, 1)`,fill:`forwards`}).finished.then(()=>r.remove()).catch(()=>r.remove())}})}function R({linkSelector:e=`[data-spy-link]`,offset:t=96,pausado:n=()=>!1}={}){let r=new Map;for(let t of document.querySelectorAll(e)){let e=document.getElementById(t.dataset.spyLink);e&&(r.has(e)||r.set(e,{section:e,links:[]}),r.get(e).links.push(t))}let i=[...r.values()];if(!i.length)return()=>{};let a=!1;function o(e){for(let e of i)for(let t of e.links)t.classList.remove(`is-active`),t.removeAttribute(`aria-current`);for(let t of e.links)t.classList.add(`is-active`),t.setAttribute(`aria-current`,`true`)}function s(){if(a=!1,n())return;let e=window.scrollY;if(e+window.innerHeight>=document.documentElement.scrollHeight-4){o(i[i.length-1]);return}let r=e+t,s=i[0];for(let t of i)if(t.section.getBoundingClientRect().top+e<=r)s=t;else break;o(s)}function c(){a||(a=!0,requestAnimationFrame(s))}return window.addEventListener(`scroll`,c,{passive:!0}),window.addEventListener(`resize`,c),window.addEventListener(`load`,c),s(),c}var z=`0px 0px -12% 0px`,B=70,V=6;function H(){let e=document.querySelectorAll(`[data-anim]`);if(!e.length)return;if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches||!(`IntersectionObserver`in window)){for(let t of e)t.classList.add(`anim-visible`);return}let t=e=>{let t=Number(e.dataset.animEspera);if(t)return t;let n=e.parentElement;if(!n||!n.hasAttribute(`data-anim-secuencia`))return 0;let r=[...n.children].filter(e=>e.hasAttribute(`data-anim`)).indexOf(e);return Math.min(r,V)*B},n=new IntersectionObserver((e,n)=>{for(let r of e){if(!r.isIntersecting)continue;let e=r.target,i=t(e);i&&(e.style.transitionDelay=`${i}ms`),e.classList.add(`anim-visible`),n.unobserve(e)}},{rootMargin:z,threshold:.05}),r=e=>{let t=e.target;t.hasAttribute(`data-anim`)&&t.style.transitionDelay&&(t.style.transitionDelay=``)};for(let t of e)t.addEventListener(`transitionend`,r,{once:!0}),n.observe(t)}function U(){let e=document.querySelectorAll(`[data-modal]`);if(e.length){for(let t of e)t.addEventListener(`click`,()=>{let e=document.querySelector(t.dataset.modal);if(!e){console.warn(`Modal no encontrado: ${t.dataset.modal}`);return}e.parentElement!==document.body&&document.body.appendChild(e),e.showModal()});for(let e of document.querySelectorAll(`dialog.modal`)){e.addEventListener(`click`,t=>{let n=e.querySelector(`.modal-caja`);if(!n)return;let r=n.getBoundingClientRect();t.clientX>=r.left&&t.clientX<=r.right&&t.clientY>=r.top&&t.clientY<=r.bottom||e.close()});for(let t of e.querySelectorAll(`[data-cerrar-modal]`))t.addEventListener(`click`,()=>e.close())}}}var W=`seiler18:tema`,G={claro:`#ffffff`,oscuro:`#0a101c`},K=document.documentElement,q=()=>K.dataset.tema===`oscuro`?`oscuro`:`claro`;function J(e){e===`oscuro`?K.dataset.tema=`oscuro`:delete K.dataset.tema;try{localStorage.setItem(W,e)}catch{}document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,G[e]),Y(),window.dispatchEvent(new CustomEvent(`tema:cambio`,{detail:e}))}function Y(){let e=q()===`oscuro`;for(let t of document.querySelectorAll(`[data-tema-boton]`))t.setAttribute(`aria-pressed`,String(e)),t.setAttribute(`aria-label`,e?`Cambiar a modo claro`:`Cambiar a modo oscuro`),t.title=e?`Modo claro`:`Modo oscuro`}function X(e){let t=q()===`oscuro`?`claro`:`oscuro`;if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches||!document.startViewTransition){J(t);return}let n=e.currentTarget.getBoundingClientRect(),r=n.left+n.width/2,i=n.top+n.height/2,a=Math.hypot(Math.max(r,innerWidth-r),Math.max(i,innerHeight-i));K.style.setProperty(`--tema-x`,`${r}px`),K.style.setProperty(`--tema-y`,`${i}px`),K.style.setProperty(`--tema-r`,`${a}px`),K.dataset.cambiandoTema=``,document.startViewTransition(()=>J(t)).finished.finally(()=>delete K.dataset.cambiandoTema)}function Z(){document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,G[q()]),Y();for(let e of document.querySelectorAll(`[data-tema-boton]`))e.addEventListener(`click`,X)}var ee=`(min-width: 992px)`,Q=[`profundidad`,`deslizar`,`barrido`,`cubo`,`cortina`,`iris`],te=220,ne=60,re=40;function ie(){let e=document.getElementById(`contenido`);if(!e)return;let t=[...e.children].filter(e=>e.id);if(t.length<2)return;let n=window.matchMedia(ee),r=window.matchMedia(`(prefers-reduced-motion: reduce)`),i=document.querySelector(`.pie`),a=i&&{padre:i.parentElement,siguiente:i.nextSibling},o=e=>document.querySelector(`[data-spy-link="${e.id}"] .nav-largo`)?.textContent.trim()||e.querySelector(`h1, h2`)?.textContent.trim()||e.id,s=0,c=null,l=null,u=null,d=e=>{let n=(e?document.getElementById(e):null)?.closest(`#contenido > [id]`);return n?t.indexOf(n):-1},f=()=>{let t=getComputedStyle(e).getPropertyValue(`--diapo-duracion`).trim(),n=parseFloat(t);return n?t.endsWith(`ms`)?n:n*1e3:700};function p(){let e=t[s].id;for(let t of document.querySelectorAll(`[data-spy-link]`)){let n=t.dataset.spyLink===e;t.classList.toggle(`is-active`,n),n?t.setAttribute(`aria-current`,`true`):t.removeAttribute(`aria-current`)}t.forEach((e,t)=>e.inert=t!==s),l&&(l.querySelector(`.diapo-num`).textContent=String(s+1).padStart(2,`0`),l.querySelector(`.diapo-nombre`).textContent=o(t[s]),l.querySelectorAll(`[data-ir]`).forEach((e,t)=>{e.classList.toggle(`is-active`,t===s),t===s?e.setAttribute(`aria-current`,`step`):e.removeAttribute(`aria-current`)}),l.querySelector(`[data-paso="-1"]`).disabled=s===0,l.querySelector(`[data-paso="1"]`).disabled=s===t.length-1)}function m(){let e=v(1);t[s].classList.toggle(`con-mas`,e),l?.classList.toggle(`hay-mas`,e)}function h(){if(!c)return;let{desde:t,hacia:n,temporizador:r}=c;clearTimeout(r),t.classList.remove(`saliendo`),n.classList.remove(`entrando`),delete e.dataset.trans,delete e.dataset.dir,c=null}function g(n,{historial:i=`push`,alFinal:a=!1}={}){if(n=Math.max(0,Math.min(t.length-1,n)),n===s&&!c)return;h();let o=t[s],l=t[n],u=n>s?1:-1;if(s=n,l.scrollTop=a?l.scrollHeight:0,l.classList.add(`activa`),o.classList.remove(`activa`),i){let e=`#${l.id}`;location.hash!==e&&history[i===`push`?`pushState`:`replaceState`](null,``,e)}p(),m(),l.focus({preventScroll:!0}),!r.matches&&(e.dataset.trans=Q[n%Q.length],e.dataset.dir=u>0?`adelante`:`atras`,e.style.setProperty(`--dir`,u),o.classList.add(`saliendo`),l.classList.add(`entrando`),c={desde:o,hacia:l,temporizador:setTimeout(h,f()+150)})}function _(){let e=document.createElement(`nav`);return e.className=`diapo-controles`,e.setAttribute(`aria-label`,`Diapositivas`),e.innerHTML=`
      <span class="diapo-mas" aria-hidden="true" title="Hay más contenido abajo">
        <i class="fa-solid fa-arrow-down"></i>
      </span>
      <p class="diapo-contador" aria-live="polite">
        <span class="diapo-num">01</span><span class="diapo-total">/ ${String(t.length).padStart(2,`0`)}</span>
        <span class="diapo-nombre"></span>
      </p>
      <ol class="diapo-marcas">
        ${t.map((e,t)=>`<li><button type="button" data-ir="${t}" aria-label="Ir a ${o(e)}"></button></li>`).join(``)}
      </ol>
      <div class="diapo-flechas">
        <button type="button" data-paso="-1" aria-label="Diapositiva anterior">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
        </button>
        <button type="button" data-paso="1" aria-label="Diapositiva siguiente">
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    `,e.addEventListener(`click`,e=>{let t=e.target.closest(`button`);t&&(t.dataset.ir?g(Number(t.dataset.ir)):g(s+Number(t.dataset.paso)))}),document.body.appendChild(e),e}function v(e){let n=t[s];return e>0?n.scrollTop+n.clientHeight<n.scrollHeight-re:n.scrollTop>2}let y=e=>e?.closest?.(`input, textarea, select, [contenteditable], dialog`);function b(n){document.addEventListener(`click`,e=>{let n=e.target.closest(`a[href^="#"]`);if(!n||e.defaultPrevented)return;let r=decodeURIComponent(n.hash.slice(1)),i=d(r);if(i<0)return;e.preventDefault(),g(i);let a=document.getElementById(r);a!==t[i]&&setTimeout(()=>a.scrollIntoView({block:`start`}),f())},{signal:n}),window.addEventListener(`popstate`,()=>{let e=d(location.hash.slice(1));g(e<0?0:e,{historial:!1})},{signal:n});let r={ultimo:0,hecho:!1,cambio:!1};e.addEventListener(`wheel`,e=>{if(e.ctrlKey||y(e.target))return;let t=performance.now();if(t-r.ultimo>te&&(r.hecho=r.cambio=!1),r.ultimo=t,r.cambio)return e.preventDefault();let n=Math.abs(e.deltaX)>Math.abs(e.deltaY),i=n?e.deltaX:e.deltaY;if(!(Math.abs(i)<4)){if(!n&&v(i)){r.hecho=!0;return}e.preventDefault(),!(r.hecho||c)&&(r.hecho=r.cambio=!0,g(s+Math.sign(i),{historial:`replace`,alFinal:i<0&&!n}))}},{passive:!1,signal:n}),document.addEventListener(`keydown`,e=>{if(e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||y(e.target)||document.querySelector(`dialog[open]`))return;let n=e.target.closest?.(`button, a`),r=0;switch(e.key){case`ArrowRight`:r=1;break;case`ArrowLeft`:r=-1;break;case`PageDown`:r=+!v(1);break;case`PageUp`:r=v(-1)?0:-1;break;case` `:if(n)return;r=v(e.shiftKey?-1:1)?0:e.shiftKey?-1:1;break;case`Home`:e.preventDefault(),g(0);return;case`End`:e.preventDefault(),g(t.length-1);return;default:return}r&&(e.preventDefault(),c||g(s+r,{historial:`replace`}))},{signal:n});let i=null;e.addEventListener(`touchstart`,e=>{let t=e.touches[0];i=e.touches.length===1&&!y(e.target)?{x:t.clientX,y:t.clientY}:null},{passive:!0,signal:n}),e.addEventListener(`touchend`,e=>{if(!i)return;let t=e.changedTouches[0],n=t.clientX-i.x,r=t.clientY-i.y;i=null,Math.abs(n)>ne&&Math.abs(n)>Math.abs(r)*1.5&&g(s+(n<0?1:-1),{historial:`replace`})},{passive:!0,signal:n}),e.addEventListener(`scroll`,m,{capture:!0,passive:!0,signal:n}),window.addEventListener(`resize`,m,{passive:!0,signal:n}),window.addEventListener(`load`,m,{signal:n}),e.addEventListener(`animationend`,e=>{c&&e.target===c.hacia&&h()},{signal:n})}function x(){let e=d(location.hash.slice(1));e<0&&(e=0,t.forEach((t,n)=>{t.getBoundingClientRect().top<=120&&(e=n)})),document.body.dataset.diapositivas=``;for(let e of t)e.classList.add(`diapo`),e.tabIndex=-1;i&&t[t.length-1].appendChild(i),window.scrollTo(0,0),s=e,t[s].classList.add(`activa`),l=_(),p(),m(),u=new AbortController,b(u.signal)}function S(){h(),u?.abort(),l?.remove(),l=null;for(let e of t)e.classList.remove(`diapo`,`activa`),e.removeAttribute(`tabindex`),e.inert=!1;i&&a&&a.padre.insertBefore(i,a.siguiente),delete document.body.dataset.diapositivas,t[s].scrollIntoView({block:`start`,behavior:`instant`})}n.matches&&x(),n.addEventListener(`change`,e=>e.matches?x():S())}var ae=document.getElementById(`app`);document.body.dataset.armazon=e.armazon,ae.innerHTML=`
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  ${A()}
  <div class="app-main">
    <main id="contenido">
      ${x.map(e=>e.render()).join(`
`)}
    </main>
    ${j()}
  </div>
`;var $=R({offset:96,pausado:()=>document.body.hasAttribute(`data-diapositivas`)});Z(),H(),l(),ie(),F(`.tarjeta, .destacado`),I(`.hero-btn`),L(`.hero-btn`),U(),p(),v(),window.addEventListener(`load`,$),document.addEventListener(`click`,e=>{e.target.closest(`[data-filtro]`)&&setTimeout($,60)});