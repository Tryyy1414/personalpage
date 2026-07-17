/* ==========================================================================
   SRE TELMETRY DASHBOARD & ROADMAP - APP LOGIC
   Paolo Casasola Esteban - Senior Site Reliability Engineer Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let cvData = null;
  let currentLang = localStorage.getItem('sre_portfolio_lang') || 'es';

  // UI Translation Dictionaries for static elements
  const translations = {
    es: {
      headerSubtitle: "Senior SRE & DevOps",
      headerStatus: "Target SLO: 99.99% Operational",
      heroKicker: "Reliability & Observability Engineering",
      heroTitle: "Ingeniero de Sistemas & SRE Senior",
      heroDescription: "Especializado en la optimización de plataformas críticas, observabilidad de extremo a extremo, automatización con la nube (AWS/Azure) y despliegue de agentes inteligentes como AWS DevOps Agent para la eliminación proactiva del toil operativo.",
      btnExplore: "Explorar Roadmap",
      btnContact: "Contactar SRE",
      journeyTag: "// Career Telemetry & Evolution",
      journeyTitle: "Roadmap & Trayectoria Profesional",
      skillsTag: "// Tech Stack & Ecosystem",
      skillsTitle: "Herramientas & Tecnologías",
      certsTag: "// Verified Credentials",
      certsTitle: "Certificaciones Profesionales",
      filterAll: "Todos",
      filterObs: "Observabilidad & APM",
      filterCloud: "Cloud & Containers",
      filterIac: "IaC & Config",
      filterAutomation: "AI & CI/CD",
      filterDev: "Desarrollo & Scripting",
      eduSchool: "UNIVERSIDAD CATÓLICA SEDES SAPIENTIAE",
      eduDegree: "Ingeniería de Sistemas",
      modalRespHeader: "// Principales Responsabilidades & Logros",
      modalStackHeader: "// Tech Stack Asociado",
      footerCopy: "Site Reliability Engineering Portfolio © 2026. Diseñado con HTML5, CSS3 y JS Vanilla."
    },
    en: {
      headerSubtitle: "Senior SRE & DevOps",
      headerStatus: "Target SLO: 99.99% Operational",
      heroKicker: "Reliability & Observability Engineering",
      heroTitle: "Systems Engineer & Senior SRE",
      heroDescription: "Specialized in optimizing critical platforms, end-to-end observability, cloud automation (AWS/Azure), and intelligent agent deployment like AWS DevOps Agent for proactive toil reduction.",
      btnExplore: "Explore Roadmap",
      btnContact: "Contact SRE",
      journeyTag: "// Career Telemetry & Evolution",
      journeyTitle: "Professional Roadmap & Journey",
      skillsTag: "// Tech Stack & Ecosystem",
      skillsTitle: "Tools & Ecosystem",
      certsTag: "// Verified Credentials",
      certsTitle: "Professional Certifications",
      filterAll: "All",
      filterObs: "Observability & APM",
      filterCloud: "Cloud & Containers",
      filterIac: "IaC & Config",
      filterAutomation: "AI & CI/CD",
      filterDev: "Development & Scripting",
      eduSchool: "UNIVERSIDAD CATÓLICA SEDES SAPIENTIAE",
      eduDegree: "Bachelor of Science in Systems Engineering",
      modalRespHeader: "// Key Responsibilities & Achievements",
      modalStackHeader: "// Associated Tech Stack",
      footerCopy: "Site Reliability Engineering Portfolio © 2026. Built with HTML5, CSS3 & Vanilla JS."
    }
  };

  // Load CV data from window.CV_DATA (or fallback to fetch for http servers)
  if (window.CV_DATA) {
    cvData = window.CV_DATA;
    initApp();
  } else {
    fetch('./cv_data_bilingual.json')
      .then(res => res.json())
      .then(data => {
        cvData = data;
        initApp();
      })
      .catch(err => {
        console.error("Error loading CV data:", err);
      });
  }

  function initApp() {
    setupLanguageSwitcher();
    renderAll();
    setupSkillsFilter();
    setupModal();
    initAnimations();
  }

  // Language Switcher Handler
  function setupLanguageSwitcher() {
    const langBtn = document.getElementById('lang-switch-btn');
    const langBadge = document.getElementById('current-lang-badge');

    langBadge.textContent = currentLang.toUpperCase();

    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      localStorage.setItem('sre_portfolio_lang', currentLang);
      langBadge.textContent = currentLang.toUpperCase();
      
      // Re-render UI with smooth transition
      document.body.style.opacity = '0.9';
      setTimeout(() => {
        renderAll();
        document.body.style.opacity = '1';
      }, 150);
    });
  }

  // Render main dynamic sections
  function renderAll() {
    updateStaticText();
    renderMetrics();
    renderTimeline();
    renderSkills('all');
    renderCertifications();
    if (window.lucide) window.lucide.createIcons();
  }

  // Update Static Elements Translation
  function updateStaticText() {
    const t = translations[currentLang];
    
    document.getElementById('header-subtitle').textContent = t.headerSubtitle;
    document.getElementById('header-status').textContent = t.headerStatus;
    document.getElementById('hero-kicker').textContent = t.heroKicker;
    document.getElementById('hero-title').textContent = t.heroTitle;
    document.getElementById('hero-description').textContent = t.heroDescription;

    const exploreSpan = document.querySelector('#btn-explore span');
    if (exploreSpan) exploreSpan.textContent = t.btnExplore;

    const contactSpan = document.querySelector('#btn-contact span');
    if (contactSpan) contactSpan.textContent = t.btnContact;

    document.getElementById('journey-tag').textContent = t.journeyTag;
    document.getElementById('journey-title').textContent = t.journeyTitle;
    document.getElementById('skills-tag').textContent = t.skillsTag;
    document.getElementById('skills-title').textContent = t.skillsTitle;
    document.getElementById('certs-tag').textContent = t.certsTag;
    document.getElementById('certs-title').textContent = t.certsTitle;

    document.getElementById('filter-all').textContent = t.filterAll;
    document.getElementById('filter-obs').textContent = t.filterObs;
    document.getElementById('filter-cloud').textContent = t.filterCloud;
    document.getElementById('filter-iac').textContent = t.filterIac;
    document.getElementById('filter-automation').textContent = t.filterAutomation;
    document.getElementById('filter-dev').textContent = t.filterDev;

    document.getElementById('edu-school').textContent = t.eduSchool;
    document.getElementById('edu-degree').textContent = t.eduDegree;

    document.getElementById('modal-resp-header').textContent = t.modalRespHeader;
    document.getElementById('modal-stack-header').textContent = t.modalStackHeader;

    document.getElementById('footer-copy').textContent = t.footerCopy;
  }

  // Render Metrics
  function renderMetrics() {
    const container = document.getElementById('metrics-container');
    if (!container || !cvData.metrics) return;

    container.innerHTML = cvData.metrics.map(m => `
      <div class="metric-card">
        <div class="metric-value">${m.value}</div>
        <div class="metric-label">${m.label[currentLang]}</div>
      </div>
    `).join('');
  }

  // Render Journey / Roadmap Timeline Nodes
  function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || !cvData.experience) return;

    // Preserving background timeline line
    let html = '<div class="timeline-line"></div>';

    cvData.experience.forEach((exp, idx) => {
      const roleText = exp.role[currentLang];
      const periodText = exp.period[currentLang];
      const highlight = exp.highlights[currentLang];

      const techChips = exp.tech_stack.map(tech => `<span class="chip">${tech}</span>`).join('');

      html += `
        <div class="timeline-node" data-id="${exp.id}">
          <div class="timeline-content">
            <div class="timeline-card" onclick="openRoleModal('${exp.id}')">
              ${exp.badge ? `<span class="role-badge">${exp.badge}</span>` : ''}
              <h3 class="company-title">${exp.company}</h3>
              <div class="role-name">${roleText}</div>
              <div class="period-text">
                <i data-lucide="calendar" style="width: 14px; height: 14px;"></i>
                <span>${periodText}</span>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${highlight}</p>
              <div class="tech-chips">${techChips}</div>
              <div style="margin-top: 1rem; text-align: right;">
                <span style="font-size: 0.8rem; color: var(--accent-cyan); font-family: var(--font-mono); text-transform: uppercase;">
                  ${currentLang === 'es' ? 'Ver Detalles +' : 'View Details +'}
                </span>
              </div>
            </div>
          </div>

          <div class="timeline-point" onclick="openRoleModal('${exp.id}')" title="Click to view details">
            <i data-lucide="git-commit"></i>
          </div>

          <div class="timeline-empty"></div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Render Technical Skills Grid
  function renderSkills(category = 'all') {
    const container = document.getElementById('skills-grid');
    if (!container || !cvData.technical_skills) return;

    const filtered = category === 'all' 
      ? cvData.technical_skills 
      : cvData.technical_skills.filter(s => s.category === category);

    container.innerHTML = filtered.map(skill => `
      <div class="skill-card">
        <div class="skill-icon">
          <i data-lucide="${skill.icon || 'code'}"></i>
        </div>
        <span class="skill-name">${skill.name}</span>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Setup Skills Filter Buttons
  function setupSkillsFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        renderSkills(cat);
      });
    });
  }

  // Render Certifications Wall
  function renderCertifications() {
    const container = document.getElementById('certs-grid');
    if (!container || !cvData.certifications) return;

    container.innerHTML = cvData.certifications.map(cert => `
      <div class="cert-card">
        <div class="cert-header">
          <div class="cert-icon-box" style="color: ${cert.badge_color || 'var(--accent-cyan)'}">
            <i data-lucide="${cert.icon || 'award'}"></i>
          </div>
          <span class="cert-issuer">${cert.issuer}</span>
        </div>
        <h3 class="cert-name">${cert.name}</h3>
        <div class="cert-date">${cert.date}</div>
        <p class="cert-desc">${cert.description[currentLang]}</p>
      </div>
    `).join('');
  }

  // Setup Modal Drawer for Role Deep-Dive
  function setupModal() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });

    window.openRoleModal = function(roleId) {
      if (!cvData || !cvData.experience) return;
      const exp = cvData.experience.find(e => e.id === roleId);
      if (!exp) return;

      document.getElementById('modal-badge').textContent = exp.badge || 'Role Telemetry';
      document.getElementById('modal-role-name').textContent = exp.role[currentLang];
      document.getElementById('modal-company-name').textContent = exp.company;
      document.getElementById('modal-period').innerHTML = `<i data-lucide="calendar" style="width:14px;height:14px;display:inline;"></i> ${exp.period[currentLang]}`;
      document.getElementById('modal-location').innerHTML = `<i data-lucide="map-pin" style="width:14px;height:14px;display:inline;"></i> ${exp.location}`;

      const resps = exp.responsibilities[currentLang];
      document.getElementById('modal-responsibilities').innerHTML = resps.map(r => `<li>${r}</li>`).join('');

      document.getElementById('modal-tech-chips').innerHTML = exp.tech_stack.map(t => `<span class="chip">${t}</span>`).join('');

      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      if (window.lucide) window.lucide.createIcons();
    };

    function closeModal() {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
    }
  }

  // GSAP Scroll Animations
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' });
    gsap.from('.hero-description', { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: 'power2.out' });
    gsap.from('.metric-card', {
      scrollTrigger: { trigger: '.metrics-section', start: 'top 85%' },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.6
    });

    gsap.from('.timeline-node', {
      scrollTrigger: { trigger: '#journey', start: 'top 75%' },
      opacity: 0,
      y: 40,
      stagger: 0.25,
      duration: 0.7
    });

    gsap.from('.cert-card', {
      scrollTrigger: { trigger: '#certifications', start: 'top 80%' },
      opacity: 0,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.5
    });
  }
});
