/* ============================================
   PORTFOLIO — main.js
   Cursor · Nav scroll · Filters · Modal/Drawer
   Animations · Form · Education expand
   ============================================ */

'use strict';

/* ── Custom Cursor ──────────────────────────── */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, [data-modal], .cs-card, .toolkit-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

/* ── Navbar scroll ──────────────────────────── */
(function initNav() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.style.display === 'flex';
      mobileNav.style.display = open ? 'none' : 'flex';
      hamburger.setAttribute('aria-expanded', String(!open));
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => { mobileNav.style.display = 'none'; });
    });
  }
})();

/* ── IntersectionObserver Animations ──────────── */
(function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
})();

/* ── Case Studies Filter ───────────────────── */
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.cs-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.type === filter;
        card.style.opacity    = show ? '1' : '0.25';
        card.style.transform  = show ? '' : 'scale(0.97)';
        card.style.pointerEvents = show ? 'all' : 'none';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      });
    });
  });
})();

/* ── Modal / Drawer ────────────────────────── */
(function initModal() {
  const overlay     = document.getElementById('modalOverlay');
  const drawer      = document.getElementById('modalDrawer');
  const closeBtn    = document.getElementById('modalClose');
  const modalType   = document.getElementById('modalType');
  const modalTitle  = document.getElementById('modalTitle');
  const modalBody   = document.getElementById('modalBody');

  if (!overlay) return;

  // Case study data
  const caseStudies = {
    'cs-1': {
      type: 'Business Analysis — Lead BA',
      title: 'Rediseño del proceso de originación de créditos B2B',
      context: 'Empresa de servicios financieros con operaciones en 4 países de Latam. Proceso de originación de créditos B2B con más de 8 actores internos y ciclos de aprobación superiores a 14 días hábiles en promedio.',
      problem: 'El equipo comercial perdía el 30–40% de oportunidades de cierre por tiempos de respuesta excesivos. El proceso mezclaba validación manual, múltiples herramientas desconectadas y criterios de aprobación no estandarizados entre regiones.',
      approach: [
        'Discovery: 22 entrevistas con stakeholders de negocio, operaciones, risk y tecnología. Mapeo del proceso AS-IS con BPMN, identificando 14 puntos de fricción prioritarios.',
        'Definición de métricas clave: tiempo de ciclo total, tasa de aprobación por segmento, NPS interno del equipo comercial.',
        'Diseño TO-BE: eliminación de 3 pasos redundantes, propuesta de motor de reglas para decisiones de bajo riesgo, integración con el CRM existente.',
        'Alineación con C-level mediante workshops de priorización MoSCoW y matriz de esfuerzo/impacto.',
        'Redacción de BRD y 42 user stories con criterios de aceptación para el equipo de desarrollo.',
      ],
      deliverables: [
        'BRD completo con 42 user stories y criterios de aceptación',
        'BPMN AS-IS y TO-BE validados con negocio y tecnología',
        'KPI tree con 8 métricas de proceso y 3 de negocio',
        'RACI y RAID log del programa',
        'Demo de prototipo de UI para el nuevo portal de originación',
      ],
      results: [
        { number: '62%', label: 'reducción en tiempo de ciclo promedio' },
        { number: '3x', label: 'capacidad de procesamiento sin incrementar headcount' },
        { number: '28 pt', label: 'mejora en NPS interno del equipo comercial' },
      ],
      tradeoff: 'Se decidió priorizar la automatización del segmento de bajo riesgo (70% del volumen) y dejar el segmento enterprise para una segunda fase, aceptando un impacto parcial inmediato a cambio de velocidad de entrega y menor riesgo de implementación.',
    },
    'cs-2': {
      type: 'Business Intelligence — Lead BI',
      title: 'Arquitectura de datos y dashboard ejecutivo de ventas',
      context: 'Empresa de retail con 200+ SKUs activos, 5 canales de venta (tienda física, e-commerce, marketplace x3) y reportes manuales en Excel que tomaban 3 días hábiles en consolidarse para la reunión mensual de dirección.',
      problem: 'Ausencia de una fuente única de verdad para métricas de ventas. Cada área manejaba definiciones distintas de "venta neta", "margen" y "devoluciones". Decisiones de pricing tomadas con datos de hasta 6 semanas de retraso.',
      approach: [
        'Auditoría de calidad de datos en las 3 fuentes principales (ERP, e-commerce, POS). Documentación de 19 inconsistencias críticas.',
        'Diseño de modelo estrella en Snowflake: fact_ventas, dim_producto, dim_canal, dim_tiempo, dim_cliente.',
        'Construcción de pipelines ELT con dbt: 11 modelos de staging, 4 modelos intermedios, 3 marts.',
        'Glosario de métricas validado con Finanzas y Comercial (15 definiciones formalizadas).',
        'Dashboard ejecutivo en Power BI con 3 vistas: CEO, Comercial, Operaciones.',
      ],
      deliverables: [
        'Modelo estrella documentado en Snowflake',
        'Pipeline dbt con tests de calidad de datos (>99.5% pass rate)',
        'Dashboard Power BI con actualización cada 4 horas',
        'Glosario de métricas ratificado por Finanzas, Comercial y Dirección',
        'Runbook de mantenimiento para el equipo de datos',
      ],
      results: [
        { number: '100%', label: 'eliminación de reportes manuales en Excel' },
        { number: '-6sem', label: 'reducción en latencia de datos de reporting' },
        { number: '4h', label: 'actualización automática de KPIs ejecutivos' },
      ],
      tradeoff: 'Se eligió dbt + Snowflake sobre una solución ETL legacy ya existente (mayor curva de adopción para el equipo) priorizando escalabilidad y data lineage. El cambio requirió 3 semanas de enablement y generó resistencia inicial en el área de IT.',
    },
    'cs-3': {
      type: 'Hybrid BA + BI',
      title: 'OKR framework + métricas de producto para app de pagos',
      context: 'Startup fintech en etapa de crecimiento (Serie A) con un producto de pagos móviles. El equipo de producto tomaba decisiones de roadmap basadas en intuición y feedback cualitativo. No existían métricas de producto formalizadas ni framework de OKRs.',
      problem: 'Desalineación entre negocio, producto y tecnología sobre qué constituía "éxito". Tres trimestres consecutivos sin poder demostrar impacto cuantitativo a inversores. Alto riesgo de desarrollar features sin validación de valor.',
      approach: [
        'Workshops de product discovery con 4 squads de producto para mapear value streams.',
        'Diseño del KPI tree desde North Star Metric (transacciones activas mensuales) hasta métricas de feature.',
        'Instrumentación del producto con eventos de analytics (Amplitude): 47 eventos definidos, taxonomía estandarizada.',
        'Diseño del framework OKR para 3 squads: proceso de definition, check-in quincenal, retrospectiva trimestral.',
        'Dashboard de producto en Metabase con actualización diaria para PMs y weekly digest para C-level.',
      ],
      deliverables: [
        'North Star Metric y KPI tree completo (4 niveles)',
        'Taxonomía de eventos de analytics + plan de instrumentación',
        'Framework OKR implementado para 3 squads',
        'Dashboard de producto en Metabase (12 KPIs)',
        'Plantilla de PRD actualizada con sección obligatoria de métricas de éxito',
      ],
      results: [
        { number: '3x', label: 'más features con métricas de éxito definidas en PRD' },
        { number: '40%', label: 'reducción en features "zombie" (desarrolladas sin adopción)' },
        { number: '100%', label: 'OKRs del equipo alineados a North Star al Q siguiente' },
      ],
      tradeoff: 'Se simplificó el OKR framework a 3 OKRs por squad (vs. las 8+ métricas que cada equipo quería incluir), generando tensión inicial pero logrando mayor foco. Algunas métricas secundarias se movieron a un "health dashboard" separado para no perder visibilidad.',
    },
  };

  function openModal(id) {
    const cs = caseStudies[id];
    if (!cs) return;

    modalType.textContent  = cs.type;
    modalTitle.textContent = cs.title;

    // Build results HTML
    const resultsHTML = cs.results.map(r => `
      <div class="modal-result">
        <div class="result-number">${r.number}</div>
        <div class="result-label">${r.label}</div>
      </div>`).join('');

    // Build approach bullets
    const approachHTML = cs.approach.map(a => `<li>${a}</li>`).join('');
    const deliverablesHTML = cs.deliverables.map(d => `<li>${d}</li>`).join('');

    modalBody.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-label">Contexto</div>
        <p>${cs.context}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Problema</div>
        <p>${cs.problem}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Enfoque</div>
        <ul>${approachHTML}</ul>
      </div>
      <div class="modal-section">
        <div class="modal-section-label">Entregables</div>
        <ul>${deliverablesHTML}</ul>
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
        🔒 <strong>Nota NDA:</strong> Los datos, nombres de empresa, cifras y contexto presentados son equivalentes sintéticos o públicos. Cualquier similitud con proyectos reales es referencial. Los detalles específicos pueden discutirse bajo acuerdo de confidencialidad.
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalBody.querySelector('.modal-section')?.focus?.(), 300);
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open on card click
  document.querySelectorAll('.cs-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.modal));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(card.dataset.modal); });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
  });

  // Close
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Swipe down to close on mobile
  let startY = 0;
  drawer?.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  drawer?.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientY - startY;
    if (delta > 80) closeModal();
  }, { passive: true });
})();

/* ── Education expand ──────────────────────── */
(function initEduExpand() {
  const btn = document.getElementById('eduExpandBtn');
  const col = document.getElementById('eduCollapsible');
  if (!btn || !col) return;
  btn.addEventListener('click', () => {
    const open = col.classList.toggle('open');
    btn.innerHTML = open
      ? 'Ver menos ↑'
      : 'Ver background diferencial ↓';
  });
})();

/* ── Contact form (demo) ───────────────────── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    // → Conectar a Formspree, EmailJS o backend propio
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      form.style.display = 'none';
      if (success) { success.style.display = 'block'; }
    }, 300);
  });
})();

/* ── Active nav link on scroll ─────────────── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  const onScroll = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle('active-link',
        link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();
