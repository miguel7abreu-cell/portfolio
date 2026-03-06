// Data simulada (Evita NDA, muestra impacto técnico)
const casesData = {
    'case-1': {
        title: 'Optimización de Customer Journey B2B',
        problem: 'El proceso de alta de clientes tomaba 15 días promedio, causando un abandono del 30%.',
        approach: 'Discovery participativo con Ventas y Ops + Mapeo de procesos AS-IS.',
        deliverables: 'Documento BRD, Mapa de Procesos To-Be en BPMN, Dashboard de Onboarding.',
        result: 'Reducción del tiempo de alta a 4 días y mejora del 22% en retención inicial.',
        disclaimer: 'Datos modificados para preservar confidencialidad de la Fintech origen.'
    },
    'case-2': {
        title: 'Dashboard de Rentabilidad Real-Time',
        problem: 'Stakeholders tardaban 10 días tras el cierre de mes para conocer el margen real por unidad.',
        approach: 'Diseño de modelo estrella en SQL Server y ETL para unificar ERP y CRM.',
        deliverables: 'Modelo de datos tabular, Reporte en Power BI con RLS (Row Level Security).',
        result: 'Visibilidad diaria del margen operativo. Identificación de $200k en fugas anuales.',
        disclaimer: 'Implementado con datasets públicos simulando entorno Retail.'
    }
};

// Función para abrir Drawer
function openDrawer(caseId) {
    const data = casesData[caseId];
    const body = document.getElementById('drawer-body');
    body.innerHTML = `
        <span class="tag">Case Study</span>
        <h2 style="margin: 15px 0">${data.title}</h2>
        <div class="case-section">
            <h4>El Problema</h4>
            <p>${data.problem}</p>
        </div>
        <div class="case-section">
            <h4>Enfoque & Solución</h4>
            <p>${data.approach}</p>
        </div>
        <div class="case-section">
            <h4>Entregables Key</h4>
            <p>${data.deliverables}</p>
        </div>
        <div class="case-result" style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4>Impacto</h4>
            <p><strong>${data.result}</strong></p>
        </div>
        <small style="color: #999 italic">${data.disclaimer}</small>
    `;
    document.getElementById('project-drawer').classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll
}

function closeDrawer() {
    document.getElementById('project-drawer').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Intersection Observer para animaciones fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));