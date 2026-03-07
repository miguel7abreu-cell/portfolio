/* ============================================
   PORTFOLIO — main.js
   Nav · Animations · Filters · Modal · Form · Education
   ============================================ */

'use strict';

/* ── Navbar scroll + scroll spy ─────────────── */
(function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // Mobile hamburger
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.style.display === 'flex';
      mobileNav.style.display = isOpen ? 'none' : 'flex';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => { mobileNav.style.display = 'none'; });
    });
  }
})();

/* ── IntersectionObserver — fade/slide in ───── */
(function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
})();

/* ── Case Studies Filter ────────────────────── */
(function initFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.cs-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const show = f === 'all' || card.dataset.type === f;
        card.style.opacity       = show ? '1' : '0.2';
        card.style.pointerEvents = show ? '' : 'none';
        card.style.transform     = show ? '' : 'scale(0.97)';
        card.style.transition    = 'opacity 0.3s ease, transform 0.3s ease';
      });
    });
  });
})();

/* ── Modal / Drawer ─────────────────────────── */
(function initModal() {
  const overlay   = document.getElementById('modalOverlay');
  const drawer    = document.getElementById('modalDrawer');
  const closeBtn  = document.getElementById('modalClose');
  const typeEl    = document.getElementById('modalType');
  const titleEl   = document.getElementById('modalTitle');
  const bodyEl    = document.getElementById('modalBody');
  if (!overlay) return;

  /* ─── CASE STUDY DATA ───────────────────────
     Edit this object to update case study content
     without touching the HTML
  ─────────────────────────────────────────── */
  const data = {
    'cs-1': {
      type: 'Business Analysis — Lead BA',
      title: 'Rediseño del proceso de originación de créditos B2B',
      context: 'Empresa de servicios financieros con operaciones en 4 países de Latam. Proceso de originación con más de 8 actores internos y ciclos de aprobación superiores a 14 días hábiles promedio.',
      problem: 'El equipo comercial perdía el 30–40% de oportunidades de cierre por tiempos de respuesta excesivos. El proceso mezclaba validación manual, herramientas desconectadas y criterios de aprobación no estandarizados entre regiones.',
      approach: [
        'Discovery: 22 entrevistas con stakeholders de negocio, operaciones, risk y tecnología. Mapeo del proceso AS-IS con BPMN, identificando 14 puntos de fricción.',
        'Métricas clave definidas: tiempo de ciclo total, tasa de aprobación por segmento, NPS interno del equipo comercial.',
        'Diseño TO-BE: eliminación de 3 pasos redundantes, motor de reglas para decisiones de bajo riesgo, integración con CRM existente.',
        'Alineación C-level mediante workshops de priorización MoSCoW y matriz esfuerzo/impacto.',
        'BRD y 42 user stories con criterios de aceptación para el equipo de desarrollo.',
      ],
      deliverables: [
        'BRD completo con 42 user stories y criterios de aceptación',
        'BPMN AS-IS y TO-BE validados con negocio y tecnología',
        'KPI tree con 8 métricas de proceso y 3 de negocio',
        'RACI y RAID log del programa',
        'Prototipo de UI del nuevo portal de originación',
      ],
      results: [
        { number: '62%', label: 'reducción en tiempo de ciclo promedio' },
        { number: '3x',  label: 'capacidad sin incrementar headcount' },
        { number: '28pt', label: 'mejora en NPS interno del equipo comercial' },
      ],
      tradeoff: 'Se priorizó la automatización del segmento de bajo riesgo (70% del volumen) dejando el segmento enterprise para fase 2, aceptando impacto parcial a cambio de velocidad de entrega y menor riesgo de implementación.',
    },
    'cs-2': {
      type: 'Business Intelligence — Lead BI',
      title: 'Arquitectura de datos y dashboard ejecutivo de ventas',
      context: 'Empresa de retail con 200+ SKUs activos, 5 canales de venta (tienda física, e-commerce, marketplace ×3) y reportes manuales en Excel que tardaban 3 días hábiles en consolidarse para la reunión mensual de dirección.',
      problem: 'Ausencia de fuente única de verdad para métricas de ventas. Cada área manejaba definiciones distintas de "venta neta", "margen" y "devoluciones". Decisiones de pricing con datos de hasta 6 semanas de retraso.',
      approach: [
        'Auditoría de calidad de datos en 3 fuentes principales (ERP, e-commerce, POS): 19 inconsistencias críticas documentadas.',
        'Modelo estrella en Snowflake: fact_ventas, dim_producto, dim_canal, dim_tiempo, dim_cliente.',
        'Pipelines ELT con dbt: 11 modelos staging, 4 modelos intermedios, 3 marts.',
        'Glosario de métricas validado con Finanzas y Comercial (15 definiciones formalizadas).',
        'Dashboard Power BI con 3 vistas: CEO, Comercial, Operaciones.',
      ],
      deliverables: [
        'Modelo estrella documentado en Snowflake',
        'Pipeline dbt con data quality tests (>99.5% pass rate)',
        'Dashboard Power BI con actualización cada 4 horas',
        'Glosario de métricas ratificado por Finanzas, Comercial y Dirección',
        'Runbook de mantenimiento para el equipo de datos',
      ],
      results: [
        { number: '100%', label: 'eliminación de reportes manuales en Excel' },
        { number: '-6sem', label: 'reducción en latencia de datos de reporting' },
        { number: '4h',   label: 'actualización automática de KPIs ejecutivos' },
      ],
      tradeoff: 'Se eligió dbt + Snowflake sobre la solución ETL legacy existente priorizando escalabilidad y data lineage. El cambio requirió 3 semanas de enablement y generó resistencia inicial en IT.',
    },
    'cs-3': {
      type: 'Hybrid BA + BI',
      title: 'OKR framework + métricas de producto para app de pagos',
      context: 'Startup fintech en crecimiento (Serie A) con producto de pagos móviles. El equipo de producto tomaba decisiones de roadmap basadas en intuición y feedback cualitativo. Sin métricas formalizadas ni framework de OKRs.',
      problem: 'Desalineación entre negocio, producto y tecnología sobre qué constituía "éxito". Tres trimestres sin demostrar impacto cuantitativo a inversores. Alto riesgo de features sin validación de valor.',
      approach: [
        'Workshops de product discovery con 4 squads para mapear value streams.',
        'KPI tree desde North Star Metric (transacciones activas mensuales) hasta métricas de feature.',
        'Instrumentación con Amplitude: 47 eventos definidos, taxonomía estandarizada.',
        'Framework OKR para 3 squads: proceso de definition, check-in quincenal, retrospectiva trimestral.',
        'Dashboard en Metabase con actualización diaria para PMs y weekly digest para C-level.',
      ],
      deliverables: [
        'North Star Metric y KPI tree completo (4 niveles)',
        'Taxonomía de eventos de analytics + plan de instrumentación',
        'Framework OKR implementado para 3 squads',
        'Dashboard de producto en Metabase (12 KPIs)',
        'Plantilla de PRD actualizada con sección obligatoria de métricas de éxito',
      ],
      results: [
        { number: '3x',   label: 'features con métricas de éxito definidas en PRD' },
        { number: '40%',  label: 'reducción en features "zombie" sin adopción' },
        { number: '100%', label: 'OKRs alineados a North Star al Q siguiente' },
      ],
      tradeoff: 'Se simplificó el OKR framework a 3 OKRs por squad (vs 8+ métricas que cada equipo pedía), generando tensión inicial pero logrando mayor foco. Las métricas secundarias se movieron a un health dashboard separado.',
    },
  };

  function open(id) {
    const cs = data[id];
    if (!cs) return;
    typeEl.textContent  = cs.type;
    titleEl.textContent = cs.title;
    const resultsHTML      = cs.results.map(r =>
      `<div class="modal-result"><div class="result-number">${r.number}</div><div class="result-label">${r.label}</div></div>`
    ).join('');
    const approachHTML     = cs.approach.map(a     => `<li>${a}</li>`).join('');
    const deliverablesHTML = cs.deliverables.map(d => `<li>${d}</li>`).join('');
    bodyEl.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-label">Contexto</div><p>${cs.context}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Problema</div><p>${cs.problem}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Enfoque</div><ul>${approachHTML}</ul>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Entregables</div><ul>${deliverablesHTML}</ul>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Resultado</div>
        <div class="modal-results-grid">${resultsHTML}</div>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Trade-off y Aprendizaje</div>
        <div class="modal-tradeoff">${cs.tradeoff}</div>
      </div>
      <div class="modal-disclaimer">
        🔒 <strong>Nota NDA:</strong> Datos, nombres y cifras son equivalentes sintéticos o públicos.
        Los detalles específicos pueden discutirse bajo acuerdo de confidencialidad.
      </div>`;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cs-card[data-modal]').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', () => open(card.dataset.modal));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') open(card.dataset.modal); });
  });

  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Swipe down to close on mobile
  let startY = 0;
  drawer?.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  drawer?.addEventListener('touchend',   e => { if (e.changedTouches[0].clientY - startY > 80) close(); }, { passive: true });
})();

/* ── Education expand ───────────────────────── */
(function initEdu() {
  const btn = document.getElementById('eduExpandBtn');
  const col = document.getElementById('eduCollapsible');
  if (!btn || !col) return;
  btn.addEventListener('click', () => {
    const open = col.classList.toggle('open');
    btn.textContent = open ? 'Ver menos ↑' : 'Ver otras certificaciones ↓';
    btn.setAttribute('aria-expanded', String(open));
  });
})();

/* ── Contact form (demo — conectar a Formspree) */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.opacity    = '0';
    form.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 300);
  });
})();
