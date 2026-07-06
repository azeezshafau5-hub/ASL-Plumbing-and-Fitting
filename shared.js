/* ── ASL Shared JS: nav, footer, scroll reveal, float CTA ── */

// ── Inject Nav ──
function injectNav(activePage) {
  const pages = [
    { href:'index.html',    label:'Home'     },
    { href:'about.html',    label:'About'    },
    { href:'services.html', label:'Services' },
    { href:'gallery.html',  label:'Gallery'  },
    { href:'contact.html',  label:'Contact'  },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${p.label===activePage?'active':''}">${p.label}</a></li>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" onclick="closeMenu()">${p.label}</a>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav id="navbar">
      <a href="index.html">
        <img src="preview.webp" alt="ASL Awe Stanley Plumbing Logo" class="nav-logo-img" />
      </a>
      <ul class="nav-links">${links}</ul>
      <a href="contact.html" class="nav-cta">📲 Free Quote</a>
      <button id="hamburger" onclick="openMenu()" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div id="mobile-menu">
      <button id="mobile-close" onclick="closeMenu()" aria-label="Close menu">✕</button>
      <img src="logo.png" alt="ASL Logo" style="height:64px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.6));" />
      ${mobileLinks}
    </div>
  `);
}

// ── Inject Footer ──
function injectFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="preview.webp" alt="ASL Logo" class="footer-logo" />
          <p>Nigeria's trusted experts in plumbing, water treatment, borehole drilling, pipe fitting, and complete bathroom design. Serving Lagos and beyond.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="services.html">Pipe Installation</a></li>
            <li><a href="services.html">Water Treatment</a></li>
            <li><a href="services.html">Bathroom Design</a></li>
            <li><a href="services.html">Borehole Drilling</a></li>
            <li><a href="services.html">Emergency Plumbing</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+2348024235909">📞 +234 802 423 5909</a></li>
            <li><a href="https://wa.me/2348037110675" target="_blank">💬 +234 803 711 0675</a></li>
            <li><a href="mailto:Stanleyawe2016@gmail.com">✉️ Stanleyawe2016@gmail.com</a></li>
            <li><a href="contact.html">📍 23, Ezeobi Alapere, Ketu, Lagos</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Awe Stanley Plumbing & Pipe and Fitting — Bathroom Design Plus Nigeria Limited. All rights reserved.</p>
        <p style="color:var(--gold);font-size:.78rem;font-family:var(--condense);letter-spacing:.1em;">ASL — Built to Last</p>
      </div>
    </footer>

    <div class="float-cta">
      <a href="tel:+2348024235909" class="f-call">📞 <span>Call Now</span></a>
      <a href="https://wa.me/2348037110675" target="_blank" class="f-wa">💬 <span>WhatsApp</span></a>
    </div>
  `);
}

// ── Ticker ──
function injectTicker() {
  const items = [
    'Pipe Installation','Water Treatment','Borehole Drilling',
    'Bathroom Design','Emergency Plumbing','Overhead Tank Installation',
    'Commercial Plumbing','Leak Detection',
  ];
  const doubled = [...items,...items];
  const html = doubled.map(i =>
    `<span class="ticker-item">${i} <span class="ticker-dot"></span></span>`
  ).join('');
  return `<div class="ticker"><div class="ticker-track">${html}</div></div>`;
}

// ── Mobile menu ──
function openMenu()  { document.getElementById('mobile-menu').classList.add('open'); }
function closeMenu() { document.getElementById('mobile-menu').classList.remove('open'); }

// ── Navbar scroll ──
function initNavScroll() {
  const nb = document.getElementById('navbar');
  window.addEventListener('scroll', () => nb.classList.toggle('scrolled', scrollY > 60));
}

// ── Scroll reveal ──
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
  }, { threshold:.1 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
}

// ── WhatsApp form ──
function sendToWhatsApp(btn) {
  const name    = (document.getElementById('q-name')?.value||'').trim();
  const phone   = (document.getElementById('q-phone')?.value||'').trim();
  const service = document.getElementById('q-service')?.value||'';
  const desc    = (document.getElementById('q-desc')?.value||'').trim();
  if (!name) {
    const el = document.getElementById('q-name');
    if(el){ el.style.borderColor='#e53e3e'; el.focus(); } return;
  }
  const msg =
    `Hello ASL — Awe Stanley Plumbing! I'd like a *Free Quote* 🔧\n\n`+
    `👤 *Name:* ${name}\n📞 *Phone:* ${phone||'—'}\n`+
    `🛠️ *Service:* ${service||'—'}\n📝 *Details:* ${desc||'—'}`;
  window.open(`https://wa.me/2348037110675?text=${encodeURIComponent(msg)}`,'_blank');
  btn.textContent='✅ Opening WhatsApp…';
  btn.style.background='#128C7E'; btn.disabled=true;
  setTimeout(()=>{
    btn.textContent='📲 Send via WhatsApp';
    btn.style.background=''; btn.disabled=false;
    ['q-name','q-phone','q-service','q-desc'].forEach(id=>{
      const el=document.getElementById(id);
      if(el){el.value='';el.style.borderColor='';}
    });
  },4000);
}
