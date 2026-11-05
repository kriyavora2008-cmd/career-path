// app.js - Main Application Controller
import { initialJobs } from './jobsData.js';
import { dsaTopics, dsaProblems } from './dsaSheetData.js';
import { prepData } from './prepData.js';

// --- STATE MANAGEMENT ---
class Store {
  constructor() {
    this.jobs = JSON.parse(localStorage.getItem('cc_jobs')) || initialJobs;
    this.savedJobs = new Set(JSON.parse(localStorage.getItem('cc_saved_jobs')) || []);
    this.appliedJobs = JSON.parse(localStorage.getItem('cc_applied_jobs')) || [];
    this.dsaSolved = new Set(JSON.parse(localStorage.getItem('cc_dsa_solved')) || []);
    this.dsaBookmarked = new Set(JSON.parse(localStorage.getItem('cc_dsa_bookmarked')) || []);
    this.dsaNotes = JSON.parse(localStorage.getItem('cc_dsa_notes')) || {};
    this.quizScores = JSON.parse(localStorage.getItem('cc_quiz_scores')) || [];
    this.theme = localStorage.getItem('cc_theme') || 'dark';
    this.currentView = 'dashboard';
    this.activeJobFilter = 'all';
    this.activeDsaTopic = 'All Topics';
    this.activeDsaDifficulty = 'all';
    this.activeDsaStatus = 'all';
    this.dsaSearchQuery = '';
    this.jobsSearchQuery = '';
  }

  save() {
    localStorage.setItem('cc_jobs', JSON.stringify(this.jobs));
    localStorage.setItem('cc_saved_jobs', JSON.stringify([...this.savedJobs]));
    localStorage.setItem('cc_applied_jobs', JSON.stringify(this.appliedJobs));
    localStorage.setItem('cc_dsa_solved', JSON.stringify([...this.dsaSolved]));
    localStorage.setItem('cc_dsa_bookmarked', JSON.stringify([...this.dsaBookmarked]));
    localStorage.setItem('cc_dsa_notes', JSON.stringify(this.dsaNotes));
    localStorage.setItem('cc_quiz_scores', JSON.stringify(this.quizScores));
    localStorage.setItem('cc_theme', this.theme);
  }

  toggleSaveJob(jobId) {
    if (this.savedJobs.has(jobId)) {
      this.savedJobs.delete(jobId);
    } else {
      this.savedJobs.add(jobId);
    }
    this.save();
  }

  applyToJob(jobId, applicantData) {
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) return false;
    const existingIndex = this.appliedJobs.findIndex(a => a.jobId === jobId);
    const application = {
      jobId,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      appliedAt: new Date().toISOString(),
      status: 'Under Review',
      ...applicantData
    };
    if (existingIndex >= 0) {
      this.appliedJobs[existingIndex] = application;
    } else {
      this.appliedJobs.unshift(application);
    }
    this.save();
    return true;
  }

  isJobApplied(jobId) {
    return this.appliedJobs.some(a => a.jobId === jobId);
  }

  isJobSaved(jobId) {
    return this.savedJobs.has(jobId);
  }

  addJob(newJob) {
    this.jobs.unshift(newJob);
    this.save();
  }

  toggleDsaSolved(problemId) {
    if (this.dsaSolved.has(problemId)) {
      this.dsaSolved.delete(problemId);
    } else {
      this.dsaSolved.add(problemId);
    }
    this.save();
  }

  toggleDsaBookmark(problemId) {
    if (this.dsaBookmarked.has(problemId)) {
      this.dsaBookmarked.delete(problemId);
    } else {
      this.dsaBookmarked.add(problemId);
    }
    this.save();
  }

  saveDsaNote(problemId, note) {
    if (!note.trim()) {
      delete this.dsaNotes[problemId];
    } else {
      this.dsaNotes[problemId] = note;
    }
    this.save();
  }
}

const store = new Store();

// --- TOAST NOTIFICATIONS ---
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span class="toast-msg">${message}</span>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- CONFETTI EFFECT ---
function triggerConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  }
}

// --- DOM ELEMENTS & INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initDashboard();
  initJobPortal();
  initPrepHub();
  initDsaSheet();
  initTracker();
  initModals();
});

// --- THEME MANAGEMENT ---
function initTheme() {
  document.documentElement.setAttribute('data-theme', store.theme);
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      store.theme = store.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', store.theme);
      store.save();
      updateThemeIcon(store.theme);
    });
    updateThemeIcon(store.theme);
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.innerHTML = theme === 'dark' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// --- NAVIGATION ---
function initNavigation() {
  const navLinks = document.querySelectorAll('[data-nav-target]');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('main-nav');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-nav-target');
      switchView(target);
      if (navMenu && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
  }

  // Handle URL hash if provided
  const hash = window.location.hash.replace('#', '');
  if (['dashboard', 'jobs', 'prep', 'dsa-sheet', 'tracker'].includes(hash)) {
    switchView(hash);
  } else {
    switchView('dashboard');
  }
}

function switchView(viewName) {
  store.currentView = viewName;
  window.location.hash = viewName;

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const activeSec = document.getElementById(`view-${viewName}`);
  if (activeSec) activeSec.classList.add('active');

  document.querySelectorAll('[data-nav-target]').forEach(link => {
    if (link.getAttribute('data-nav-target') === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Refresh dynamic contents for view
  if (viewName === 'dashboard') renderDashboard();
  if (viewName === 'jobs') renderJobs();
  if (viewName === 'dsa-sheet') renderDsaSheet();
  if (viewName === 'tracker') renderTracker();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 1. DASHBOARD VIEW
// ==========================================
function initDashboard() {
  renderDashboard();
  const heroExploreBtn = document.getElementById('hero-explore-jobs');
  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => switchView('jobs'));
  }
  const heroStartDsaBtn = document.getElementById('hero-start-dsa');
  if (heroStartDsaBtn) {
    heroStartDsaBtn.addEventListener('click', () => switchView('dsa-sheet'));
  }
  const heroStartPrepBtn = document.getElementById('hero-start-prep');
  if (heroStartPrepBtn) {
    heroStartPrepBtn.addEventListener('click', () => switchView('prep'));
  }
}

function renderDashboard() {
  // Stats
  const totalSolved = store.dsaSolved.size;
  const totalProblems = dsaProblems.length;
  const dsaPercent = Math.round((totalSolved / totalProblems) * 100);

  const totalApplied = store.appliedJobs.length;
  const totalSaved = store.savedJobs.size;

  const statDsa = document.getElementById('dash-stat-dsa');
  if (statDsa) statDsa.textContent = `${totalSolved} / ${totalProblems}`;

  const statDsaBar = document.getElementById('dash-stat-dsa-bar');
  if (statDsaBar) statDsaBar.style.width = `${dsaPercent}%`;

  const statDsaPct = document.getElementById('dash-stat-dsa-pct');
  if (statDsaPct) statDsaPct.textContent = `${dsaPercent}% Completed`;

  const statApplied = document.getElementById('dash-stat-applied');
  if (statApplied) statApplied.textContent = totalApplied;

  const statSaved = document.getElementById('dash-stat-saved');
  if (statSaved) statSaved.textContent = totalSaved;

  // Daily Challenge Problem
  const dailyProblemContainer = document.getElementById('dash-daily-problem');
  if (dailyProblemContainer) {
    // Pick problem based on date or default first unsolved
    const unsolved = dsaProblems.filter(p => !store.dsaSolved.has(p.id));
    const problem = unsolved.length > 0 ? unsolved[0] : dsaProblems[0];
    dailyProblemContainer.innerHTML = `
      <div class="dash-card-header">
        <span class="badge badge-accent">Daily Problem Pick</span>
        <span class="badge badge-${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
      </div>
      <h3 class="dash-card-title">${problem.title}</h3>
      <p class="dash-card-sub">${problem.topic} • Asked at ${problem.companies.slice(0, 3).join(', ')}</p>
      <div class="dash-card-footer">
        <button class="btn btn-primary btn-sm" id="btn-daily-solve">Solve Problem</button>
        <span class="text-muted text-sm">${store.dsaSolved.has(problem.id) ? '✓ Solved' : '○ Not yet solved'}</span>
      </div>
    `;
    const btnDailySolve = document.getElementById('btn-daily-solve');
    if (btnDailySolve) {
      btnDailySolve.addEventListener('click', () => openDsaSolutionModal(problem.id));
    }
  }

  // Featured Jobs in Dashboard
  const featuredJobsContainer = document.getElementById('dash-featured-jobs');
  if (featuredJobsContainer) {
    const featured = store.jobs.filter(j => j.featured).slice(0, 3);
    featuredJobsContainer.innerHTML = featured.map(job => createJobCardHtml(job)).join('');
    attachJobCardEvents(featuredJobsContainer);
  }
}

// ==========================================
// 2. JOB PORTAL VIEW
// ==========================================
function initJobPortal() {
  const searchInput = document.getElementById('jobs-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      store.jobsSearchQuery = e.target.value.toLowerCase();
      renderJobs();
    });
  }

  const filterChips = document.querySelectorAll('.job-filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      store.activeJobFilter = chip.getAttribute('data-filter');
      renderJobs();
    });
  });

  const btnOpenPostJob = document.getElementById('btn-open-post-job');
  if (btnOpenPostJob) {
    btnOpenPostJob.addEventListener('click', () => {
      openPostJobModal();
    });
  }

  renderJobs();
}

function renderJobs() {
  const container = document.getElementById('jobs-list-container');
  const countEl = document.getElementById('jobs-count-badge');
  if (!container) return;

  let filtered = store.jobs.filter(job => {
    // Search
    if (store.jobsSearchQuery) {
      const matchTitle = job.title.toLowerCase().includes(store.jobsSearchQuery);
      const matchComp = job.company.toLowerCase().includes(store.jobsSearchQuery);
      const matchLoc = job.location.toLowerCase().includes(store.jobsSearchQuery);
      const matchSkills = job.skills.some(s => s.toLowerCase().includes(store.jobsSearchQuery));
      if (!matchTitle && !matchComp && !matchLoc && !matchSkills) return false;
    }

    // Filter Chips
    if (store.activeJobFilter === 'remote') return job.workplace.toLowerCase() === 'remote';
    if (store.activeJobFilter === 'intern') return job.type.toLowerCase().includes('intern');
    if (store.activeJobFilter === 'high-ctc') return job.salaryNum >= 22;
    if (store.activeJobFilter === 'fresher') return job.experience.includes('0') || job.type.toLowerCase().includes('intern');
    if (store.activeJobFilter === 'saved') return store.isJobSaved(job.id);
    if (store.activeJobFilter === 'applied') return store.isJobApplied(job.id);

    return true;
  });

  if (countEl) countEl.textContent = `${filtered.length} Jobs Found`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No matching jobs found</h3>
        <p>Try tweaking your search keywords or clearing filter tags.</p>
        <button class="btn btn-outline btn-sm" id="btn-clear-job-filters">Clear Filters</button>
      </div>
    `;
    const clearBtn = document.getElementById('btn-clear-job-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        store.jobsSearchQuery = '';
        store.activeJobFilter = 'all';
        const searchInput = document.getElementById('jobs-search-input');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.job-filter-chip').forEach(c => c.classList.toggle('active', c.getAttribute('data-filter') === 'all'));
        renderJobs();
      });
    }
    return;
  }

  container.innerHTML = filtered.map(job => createJobCardHtml(job)).join('');
  attachJobCardEvents(container);
}

function createJobCardHtml(job) {
  const isApplied = store.isJobApplied(job.id);
  const isSaved = store.isJobSaved(job.id);

  return `
    <article class="job-card" data-job-id="${job.id}">
      <div class="job-card-top">
        <div class="company-logo" style="background: ${job.logoBg || '#2563EB'}">
          ${job.logoText || job.company.charAt(0)}
        </div>
        <div class="job-card-title-group">
          <div class="job-card-company-row">
            <span class="company-name">${job.company}</span>
            ${job.featured ? `<span class="badge badge-accent">Featured</span>` : ''}
            ${isApplied ? `<span class="badge badge-success">✓ Applied</span>` : ''}
          </div>
          <h3 class="job-title" data-action="view-details">${job.title}</h3>
        </div>
        <button class="btn-save-job ${isSaved ? 'saved' : ''}" data-action="toggle-save" title="Save Job" aria-label="Save Job">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>

      <div class="job-meta-row">
        <span class="job-meta-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${job.location}
        </span>
        <span class="job-meta-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          ${job.workplace}
        </span>
        <span class="job-meta-pill highlight">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          ${job.salary}
        </span>
        <span class="job-meta-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${job.experience}
        </span>
      </div>

      <div class="job-skills-row">
        ${job.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>

      <div class="job-card-bottom">
        <span class="text-muted text-xs">Posted ${job.postedDaysAgo === 1 ? '1 day ago' : `${job.postedDaysAgo} days ago`}</span>
        <div class="job-action-buttons">
          <button class="btn btn-outline btn-sm" data-action="view-details">View Details</button>
          <button class="btn ${isApplied ? 'btn-secondary' : 'btn-primary'} btn-sm" data-action="apply-now" ${isApplied ? 'disabled' : ''}>
            ${isApplied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function attachJobCardEvents(container) {
  container.querySelectorAll('.job-card').forEach(card => {
    const jobId = card.getAttribute('data-job-id');

    card.querySelectorAll('[data-action="view-details"]').forEach(el => {
      el.addEventListener('click', () => openJobDetailsModal(jobId));
    });

    card.querySelectorAll('[data-action="apply-now"]').forEach(el => {
      el.addEventListener('click', () => openApplyJobModal(jobId));
    });

    const saveBtn = card.querySelector('[data-action="toggle-save"]');
    if (saveBtn) {
      saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        store.toggleSaveJob(jobId);
        const isSaved = store.isJobSaved(jobId);
        showToast(isSaved ? 'Job saved to your bookmarks!' : 'Job removed from bookmarks', 'info');
        renderJobs();
        if (store.currentView === 'tracker') renderTracker();
      });
    }
  });
}

function openJobDetailsModal(jobId) {
  const job = store.jobs.find(j => j.id === jobId);
  if (!job) return;

  const modal = document.getElementById('modal-job-details');
  const modalBody = document.getElementById('modal-job-details-body');
  if (!modal || !modalBody) return;

  const isApplied = store.isJobApplied(job.id);
  const isSaved = store.isJobSaved(job.id);

  modalBody.innerHTML = `
    <div class="modal-job-header">
      <div class="company-logo large" style="background: ${job.logoBg || '#2563EB'}">
        ${job.logoText || job.company.charAt(0)}
      </div>
      <div>
        <h2 class="modal-job-title">${job.title}</h2>
        <p class="modal-job-sub">${job.company} • ${job.location} • ${job.workplace}</p>
      </div>
    </div>

    <div class="modal-job-metrics">
      <div class="metric-card">
        <span class="metric-label">Salary CTC</span>
        <span class="metric-val">${job.salary}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Experience</span>
        <span class="metric-val">${job.experience}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Job Type</span>
        <span class="metric-val">${job.type}</span>
      </div>
    </div>

    <div class="modal-job-section">
      <h3>Required Skills</h3>
      <div class="job-skills-row">
        ${job.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    </div>

    <div class="modal-job-section">
      <h3>Job Description</h3>
      <div class="markdown-preview">${job.description.replace(/\n/g, '<br/>')}</div>
    </div>

    <div class="modal-job-actions">
      <button class="btn btn-outline" id="modal-btn-save-toggle">
        ${isSaved ? '★ Bookmarked' : '☆ Save Job'}
      </button>
      <button class="btn ${isApplied ? 'btn-secondary' : 'btn-primary'}" id="modal-btn-apply" ${isApplied ? 'disabled' : ''}>
        ${isApplied ? 'Already Applied' : 'Apply for this Position'}
      </button>
    </div>
  `;

  document.getElementById('modal-btn-apply')?.addEventListener('click', () => {
    closeModal('modal-job-details');
    openApplyJobModal(jobId);
  });

  document.getElementById('modal-btn-save-toggle')?.addEventListener('click', () => {
    store.toggleSaveJob(jobId);
    showToast(store.isJobSaved(jobId) ? 'Job saved!' : 'Job removed from saved list', 'info');
    openJobDetailsModal(jobId);
    renderJobs();
  });

  openModal('modal-job-details');
}

function openApplyJobModal(jobId) {
  const job = store.jobs.find(j => j.id === jobId);
  if (!job) return;

  const modal = document.getElementById('modal-apply-job');
  const modalJobTitle = document.getElementById('apply-modal-job-title');
  const form = document.getElementById('form-job-application');
  if (!modal || !form) return;

  if (modalJobTitle) {
    modalJobTitle.textContent = `Apply for: ${job.title} at ${job.company}`;
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const applicantData = {
      fullName: document.getElementById('app-full-name').value,
      email: document.getElementById('app-email').value,
      phone: document.getElementById('app-phone').value,
      linkedin: document.getElementById('app-linkedin').value,
      portfolio: document.getElementById('app-portfolio').value,
      experienceYears: document.getElementById('app-exp').value,
      coverNote: document.getElementById('app-cover').value,
    };

    store.applyToJob(jobId, applicantData);
    closeModal('modal-apply-job');
    form.reset();
    triggerConfetti();
    showToast(`Application submitted successfully to ${job.company}! Check My Tracker to see your status.`, 'success');
    renderJobs();
    if (store.currentView === 'tracker') renderTracker();
  };

  openModal('modal-apply-job');
}

function openPostJobModal() {
  const modal = document.getElementById('modal-post-job');
  const form = document.getElementById('form-post-job');
  if (!modal || !form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const company = document.getElementById('post-company').value;
    const location = document.getElementById('post-location').value;
    const workplace = document.getElementById('post-workplace').value;
    const type = document.getElementById('post-type').value;
    const salary = document.getElementById('post-salary').value;
    const experience = document.getElementById('post-exp').value;
    const skillsRaw = document.getElementById('post-skills').value;
    const description = document.getElementById('post-desc').value;

    const newJob = {
      id: `job-${Date.now()}`,
      title,
      company,
      logoText: company.slice(0, 2).toUpperCase(),
      logoBg: '#10B981',
      location,
      type,
      workplace,
      experience,
      salary,
      salaryNum: 20,
      postedDaysAgo: 0,
      category: 'Software Engineering',
      skills: skillsRaw.split(',').map(s => s.trim()).filter(Boolean),
      featured: true,
      description
    };

    store.addJob(newJob);
    closeModal('modal-post-job');
    form.reset();
    triggerConfetti();
    showToast(`Job listing posted successfully! It is now live on the portal.`, 'success');
    renderJobs();
  };

  openModal('modal-post-job');
}

// ==========================================
// 3. PREPARATION HUB VIEW
// ==========================================
function initPrepHub() {
  // Prep tab switching
  const prepTabs = document.querySelectorAll('.prep-nav-tab');
  prepTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      prepTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetSub = tab.getAttribute('data-prep-sub');
      document.querySelectorAll('.prep-sub-pane').forEach(p => p.classList.remove('active'));
      const activePane = document.getElementById(`prep-pane-${targetSub}`);
      if (activePane) activePane.classList.add('active');
    });
  });

  // Render Aptitude Notes
  renderAptitudeSection();

  // Render Tech Section
  renderTechnicalSection();

  // Render HR Section
  renderHrSection();

  // Aptitude Quiz Button
  const btnStartQuiz = document.getElementById('btn-start-aptitude-quiz');
  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', () => startAptitudeQuiz());
  }
}

function renderAptitudeSection() {
  const container = document.getElementById('aptitude-notes-container');
  if (!container) return;

  container.innerHTML = prepData.aptitude.notes.map(note => `
    <article class="prep-note-card">
      <div class="prep-note-header">
        <span class="badge badge-accent">${note.category}</span>
        <h3 class="prep-note-title">${note.title}</h3>
        <p class="prep-note-summary">${note.summary}</p>
      </div>
      <div class="prep-note-body markdown-preview">
        ${formatMarkdownText(note.content)}
      </div>
    </article>
  `).join('');
}

function renderTechnicalSection() {
  const notesContainer = document.getElementById('tech-notes-container');
  const qaContainer = document.getElementById('tech-qa-container');

  if (notesContainer) {
    notesContainer.innerHTML = prepData.technical.topics.map(topic => `
      <article class="prep-note-card">
        <div class="prep-note-header">
          <span class="badge badge-primary">${topic.badge}</span>
          <h3 class="prep-note-title">${topic.name}</h3>
          <p class="prep-note-summary">${topic.summary}</p>
        </div>
        <div class="prep-note-body markdown-preview">
          ${formatMarkdownText(topic.content)}
        </div>
      </article>
    `).join('');
  }

  if (qaContainer) {
    qaContainer.innerHTML = prepData.technical.qaList.map((item, idx) => `
      <div class="accordion-item" data-qa-idx="${idx}">
        <button class="accordion-header">
          <span class="accordion-title"><strong>Q:</strong> ${item.q}</span>
          <span class="badge badge-neutral text-xs">${item.category}</span>
          <span class="accordion-chevron">▼</span>
        </button>
        <div class="accordion-body">
          <p>${item.a}</p>
        </div>
      </div>
    `).join('');

    qaContainer.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('open');
      });
    });
  }
}

function renderHrSection() {
  const starContainer = document.getElementById('hr-star-container');
  const questionsContainer = document.getElementById('hr-questions-container');
  const askQuestionsContainer = document.getElementById('hr-ask-questions-container');

  if (starContainer) {
    const star = prepData.hr.starFramework;
    starContainer.innerHTML = `
      <div class="star-framework-header">
        <h3>${star.title}</h3>
        <p class="text-muted">${star.summary}</p>
      </div>
      <div class="star-steps-grid">
        ${star.steps.map(step => `
          <div class="star-step-card">
            <div class="star-letter">${step.letter}</div>
            <div class="star-step-title">${step.name}</div>
            <div class="star-step-desc">${step.desc}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (questionsContainer) {
    questionsContainer.innerHTML = prepData.hr.topQuestions.map((q, idx) => `
      <div class="accordion-item" data-hr-idx="${idx}">
        <button class="accordion-header">
          <span class="accordion-title"><strong>Q:</strong> ${q.question}</span>
          <span class="accordion-chevron">▼</span>
        </button>
        <div class="accordion-body">
          <div class="hr-intent-box">
            <strong>🎯 What they're assessing:</strong> ${q.intent}
          </div>
          <div class="hr-tips-box">
            <strong>💡 Key Tip:</strong> ${q.tips}
          </div>
          <div class="hr-sample-box">
            <strong>🏆 Winning Answer Blueprint:</strong>
            <p>${q.sampleAnswer}</p>
          </div>
        </div>
      </div>
    `).join('');

    questionsContainer.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('open');
      });
    });
  }

  if (askQuestionsContainer) {
    askQuestionsContainer.innerHTML = `
      <div class="smart-questions-card">
        <h3>Top 5 High-Impact Questions to Ask Your Interviewer</h3>
        <p class="text-muted text-sm">Asking thoughtful questions at the end signals deep curiosity, high standards, and maturity.</p>
        <ul class="smart-questions-list">
          ${prepData.hr.smartQuestionsToAsk.map(q => `
            <li>
              <span class="bullet">✓</span>
              <span>${q}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
}

// --- APTITUDE QUIZ ENGINE ---
let quizState = {
  currentQuestion: 0,
  score: 0,
  selectedAnswers: {},
  questions: []
};

function startAptitudeQuiz() {
  quizState.questions = [...prepData.aptitude.questions];
  quizState.currentQuestion = 0;
  quizState.score = 0;
  quizState.selectedAnswers = {};

  renderQuizQuestion();
  openModal('modal-aptitude-quiz');
}

function renderQuizQuestion() {
  const modalBody = document.getElementById('modal-quiz-body');
  if (!modalBody) return;

  const q = quizState.questions[quizState.currentQuestion];
  const total = quizState.questions.length;
  const isAnswered = quizState.selectedAnswers[quizState.currentQuestion] !== undefined;
  const selectedIdx = quizState.selectedAnswers[quizState.currentQuestion];

  modalBody.innerHTML = `
    <div class="quiz-header-bar">
      <span class="badge badge-accent">${q.category}</span>
      <span class="quiz-counter">Question ${quizState.currentQuestion + 1} of ${total}</span>
      <span class="quiz-score-badge">Score: ${quizState.score}</span>
    </div>

    <div class="quiz-question-box">
      <h3 class="quiz-question-text">${q.question}</h3>
    </div>

    <div class="quiz-options-list">
      ${q.options.map((opt, i) => {
        let optClass = 'quiz-option';
        if (isAnswered) {
          if (i === q.correctIndex) optClass += ' correct';
          else if (i === selectedIdx) optClass += ' incorrect';
          else optClass += ' disabled';
        }
        return `
          <button class="${optClass}" data-opt-idx="${i}" ${isAnswered ? 'disabled' : ''}>
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt}</span>
          </button>
        `;
      }).join('')}
    </div>

    ${isAnswered ? `
      <div class="quiz-explanation-box">
        <h4>${selectedIdx === q.correctIndex ? '✓ Correct Answer!' : '✕ Incorrect'}</h4>
        <p class="quiz-exp-text">${q.explanation.replace(/\n/g, '<br/>')}</p>
      </div>
    ` : ''}

    <div class="quiz-footer-nav">
      <button class="btn btn-outline" id="quiz-btn-prev" ${quizState.currentQuestion === 0 ? 'disabled' : ''}>Previous</button>
      ${quizState.currentQuestion === total - 1 ? `
        <button class="btn btn-primary" id="quiz-btn-finish" ${!isAnswered ? 'disabled' : ''}>Complete Quiz</button>
      ` : `
        <button class="btn btn-primary" id="quiz-btn-next" ${!isAnswered ? 'disabled' : ''}>Next Question</button>
      `}
    </div>
  `;

  // Option click handlers
  modalBody.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
      quizState.selectedAnswers[quizState.currentQuestion] = idx;
      if (idx === q.correctIndex) {
        quizState.score++;
      }
      renderQuizQuestion();
    });
  });

  document.getElementById('quiz-btn-prev')?.addEventListener('click', () => {
    if (quizState.currentQuestion > 0) {
      quizState.currentQuestion--;
      renderQuizQuestion();
    }
  });

  document.getElementById('quiz-btn-next')?.addEventListener('click', () => {
    if (quizState.currentQuestion < total - 1) {
      quizState.currentQuestion++;
      renderQuizQuestion();
    }
  });

  document.getElementById('quiz-btn-finish')?.addEventListener('click', () => {
    finishQuiz();
  });
}

function finishQuiz() {
  closeModal('modal-aptitude-quiz');
  const total = quizState.questions.length;
  const score = quizState.score;
  const pct = Math.round((score / total) * 100);

  // Record score
  store.quizScores.unshift({
    date: new Date().toLocaleDateString(),
    score,
    total,
    pct
  });
  store.save();

  triggerConfetti();

  const resultsModal = document.getElementById('modal-quiz-results');
  const resultsBody = document.getElementById('modal-quiz-results-body');
  if (resultsModal && resultsBody) {
    resultsBody.innerHTML = `
      <div class="quiz-result-hero">
        <div class="result-score-circle">${pct}%</div>
        <h3>${pct >= 80 ? '🎉 Outstanding Performance!' : pct >= 50 ? '👍 Good Effort!' : '📚 Keep Practicing!'}</h3>
        <p>You scored <strong>${score} out of ${total}</strong> questions correctly.</p>
      </div>
      <div class="quiz-result-actions">
        <button class="btn btn-outline" id="btn-retake-quiz">Retake Quiz</button>
        <button class="btn btn-primary" id="btn-quiz-done">View Progress in Tracker</button>
      </div>
    `;

    document.getElementById('btn-retake-quiz')?.addEventListener('click', () => {
      closeModal('modal-quiz-results');
      startAptitudeQuiz();
    });

    document.getElementById('btn-quiz-done')?.addEventListener('click', () => {
      closeModal('modal-quiz-results');
      switchView('tracker');
    });

    openModal('modal-quiz-results');
  }
}

// ==========================================
// 4. DEDICATED DSA SHEET VIEW
// ==========================================
function initDsaSheet() {
  // Topic selector pills
  const topicContainer = document.getElementById('dsa-topic-filters');
  if (topicContainer) {
    topicContainer.innerHTML = dsaTopics.map(topic => `
      <button class="topic-chip ${topic === store.activeDsaTopic ? 'active' : ''}" data-topic="${topic}">
        ${topic}
      </button>
    `).join('');

    topicContainer.querySelectorAll('.topic-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        topicContainer.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        store.activeDsaTopic = chip.getAttribute('data-topic');
        renderDsaSheet();
      });
    });
  }

  // Difficulty filters
  const diffFilters = document.querySelectorAll('.dsa-diff-btn');
  diffFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      diffFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      store.activeDsaDifficulty = btn.getAttribute('data-diff');
      renderDsaSheet();
    });
  });

  // Status filters
  const statusFilters = document.querySelectorAll('.dsa-status-btn');
  statusFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      statusFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      store.activeDsaStatus = btn.getAttribute('data-status');
      renderDsaSheet();
    });
  });

  // Search input
  const dsaSearch = document.getElementById('dsa-search-input');
  if (dsaSearch) {
    dsaSearch.addEventListener('input', (e) => {
      store.dsaSearchQuery = e.target.value.toLowerCase();
      renderDsaSheet();
    });
  }

  // Pick random problem
  const btnRandom = document.getElementById('btn-dsa-random');
  if (btnRandom) {
    btnRandom.addEventListener('click', () => {
      const unsolved = dsaProblems.filter(p => !store.dsaSolved.has(p.id));
      if (unsolved.length === 0) {
        showToast('Amazing job! You have solved all problems in this sheet!', 'success');
        return;
      }
      const randomProblem = unsolved[Math.floor(Math.random() * unsolved.length)];
      openDsaSolutionModal(randomProblem.id);
    });
  }

  renderDsaSheet();
}

function renderDsaSheet() {
  const container = document.getElementById('dsa-problems-table-body');
  const totalCountEl = document.getElementById('dsa-total-solved-badge');
  const progressBar = document.getElementById('dsa-overall-progress-bar');
  const easyCountEl = document.getElementById('dsa-easy-count');
  const medCountEl = document.getElementById('dsa-med-count');
  const hardCountEl = document.getElementById('dsa-hard-count');

  if (!container) return;

  // Global counts
  const totalSolved = store.dsaSolved.size;
  const totalCount = dsaProblems.length;
  const pct = Math.round((totalSolved / totalCount) * 100);

  if (totalCountEl) totalCountEl.textContent = `${totalSolved} / ${totalCount} (${pct}%)`;
  if (progressBar) progressBar.style.width = `${pct}%`;

  const easySolved = dsaProblems.filter(p => p.difficulty === 'Easy' && store.dsaSolved.has(p.id)).length;
  const easyTotal = dsaProblems.filter(p => p.difficulty === 'Easy').length;
  if (easyCountEl) easyCountEl.textContent = `Easy: ${easySolved}/${easyTotal}`;

  const medSolved = dsaProblems.filter(p => p.difficulty === 'Medium' && store.dsaSolved.has(p.id)).length;
  const medTotal = dsaProblems.filter(p => p.difficulty === 'Medium').length;
  if (medCountEl) medCountEl.textContent = `Med: ${medSolved}/${medTotal}`;

  const hardSolved = dsaProblems.filter(p => p.difficulty === 'Hard' && store.dsaSolved.has(p.id)).length;
  const hardTotal = dsaProblems.filter(p => p.difficulty === 'Hard').length;
  if (hardCountEl) hardCountEl.textContent = `Hard: ${hardSolved}/${hardTotal}`;

  // Filtering
  let filtered = dsaProblems.filter(p => {
    // Topic
    if (store.activeDsaTopic !== 'All Topics' && p.topic !== store.activeDsaTopic) return false;

    // Difficulty
    if (store.activeDsaDifficulty !== 'all' && p.difficulty.toLowerCase() !== store.activeDsaDifficulty) return false;

    // Status
    const isSolved = store.dsaSolved.has(p.id);
    const isBookmarked = store.dsaBookmarked.has(p.id);
    if (store.activeDsaStatus === 'solved' && !isSolved) return false;
    if (store.activeDsaStatus === 'unsolved' && isSolved) return false;
    if (store.activeDsaStatus === 'bookmarked' && !isBookmarked) return false;

    // Search
    if (store.dsaSearchQuery) {
      const matchTitle = p.title.toLowerCase().includes(store.dsaSearchQuery);
      const matchTopic = p.topic.toLowerCase().includes(store.dsaSearchQuery);
      const matchComp = p.companies.some(c => c.toLowerCase().includes(store.dsaSearchQuery));
      if (!matchTitle && !matchTopic && !matchComp) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-8">
          <div class="empty-state">
            <p>No DSA problems match your filter selection.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const isSolved = store.dsaSolved.has(p.id);
    const isBookmarked = store.dsaBookmarked.has(p.id);
    const hasNote = Boolean(store.dsaNotes[p.id]);

    return `
      <tr class="dsa-row ${isSolved ? 'row-solved' : ''}" data-problem-id="${p.id}">
        <td class="col-status">
          <button class="status-checkbox ${isSolved ? 'checked' : ''}" data-action="toggle-dsa-solve" title="${isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}">
            ${isSolved ? '✓' : ''}
          </button>
        </td>
        <td class="col-title">
          <div class="problem-title-box">
            <span class="problem-name" data-action="view-solution">${p.title}</span>
            <div class="problem-companies-tags">
              ${p.companies.slice(0, 3).map(c => `<span class="company-tag">${c}</span>`).join('')}
              ${p.companies.length > 3 ? `<span class="company-tag text-xs">+${p.companies.length - 3}</span>` : ''}
            </div>
          </div>
        </td>
        <td class="col-topic">
          <span class="badge badge-neutral">${p.topic}</span>
        </td>
        <td class="col-diff">
          <span class="badge badge-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
        </td>
        <td class="col-leetcode">
          <a href="${p.leetcodeUrl}" target="_blank" rel="noopener noreferrer" class="lc-link" title="Open on LeetCode">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            LC
          </a>
        </td>
        <td class="col-solution">
          <button class="btn btn-outline btn-xs" data-action="view-solution">
            Solution & Code
          </button>
        </td>
        <td class="col-actions">
          <button class="btn-icon ${isBookmarked ? 'active' : ''}" data-action="toggle-dsa-bookmark" title="Bookmark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
          <button class="btn-icon ${hasNote ? 'active' : ''}" data-action="open-notes" title="${hasNote ? 'Edit Notes' : 'Add Note'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Row event listeners
  container.querySelectorAll('.dsa-row').forEach(row => {
    const problemId = row.getAttribute('data-problem-id');

    row.querySelector('[data-action="toggle-dsa-solve"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      store.toggleDsaSolved(problemId);
      if (store.dsaSolved.has(problemId)) {
        triggerConfetti();
        showToast('Problem marked as solved! Great job!', 'success');
      } else {
        showToast('Problem status updated to unsolved', 'info');
      }
      renderDsaSheet();
      if (store.currentView === 'dashboard') renderDashboard();
      if (store.currentView === 'tracker') renderTracker();
    });

    row.querySelectorAll('[data-action="view-solution"]').forEach(el => {
      el.addEventListener('click', () => openDsaSolutionModal(problemId));
    });

    row.querySelector('[data-action="toggle-dsa-bookmark"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      store.toggleDsaBookmark(problemId);
      showToast(store.dsaBookmarked.has(problemId) ? 'Problem added to bookmarks' : 'Problem removed from bookmarks', 'info');
      renderDsaSheet();
    });

    row.querySelector('[data-action="open-notes"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openDsaNotesModal(problemId);
    });
  });
}

function openDsaSolutionModal(problemId) {
  const p = dsaProblems.find(item => item.id === problemId);
  if (!p) return;

  const modal = document.getElementById('modal-dsa-solution');
  const modalBody = document.getElementById('modal-dsa-solution-body');
  if (!modal || !modalBody) return;

  const isSolved = store.dsaSolved.has(p.id);

  modalBody.innerHTML = `
    <div class="modal-dsa-header">
      <div class="dsa-header-badges">
        <span class="badge badge-accent">${p.topic}</span>
        <span class="badge badge-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
        <a href="${p.leetcodeUrl}" target="_blank" rel="noopener noreferrer" class="lc-badge-link">
          LeetCode ↗
        </a>
      </div>
      <h2 class="modal-dsa-title">${p.title}</h2>
      <div class="modal-dsa-companies">
        <span>Companies:</span>
        ${p.companies.map(c => `<span class="company-tag">${c}</span>`).join('')}
      </div>
    </div>

    <div class="dsa-solution-tabs">
      <button class="dsa-tab-btn active" data-tab="problem">Problem Description</button>
      <button class="dsa-tab-btn" data-tab="approach">Approach & Complexity</button>
      <button class="dsa-tab-btn" data-tab="code">Multi-Language Code</button>
    </div>

    <div class="dsa-tab-pane active" id="pane-problem">
      <div class="dsa-desc-box markdown-preview">
        ${p.description.replace(/\n/g, '<br/>')}
      </div>
    </div>

    <div class="dsa-tab-pane" id="pane-approach">
      <div class="approach-box">
        <h3>Intuition & Algorithm</h3>
        <p>${p.intuition.replace(/\n/g, '<br/>')}</p>
        <div class="complexity-grid">
          <div class="complexity-item">
            <span class="comp-label">Time Complexity</span>
            <span class="comp-val">${p.timeComplexity}</span>
          </div>
          <div class="complexity-item">
            <span class="comp-label">Space Complexity</span>
            <span class="comp-val">${p.spaceComplexity}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dsa-tab-pane" id="pane-code">
      <div class="code-lang-selector">
        <button class="code-lang-btn active" data-lang="cpp">C++</button>
        <button class="code-lang-btn" data-lang="java">Java</button>
        <button class="code-lang-btn" data-lang="python">Python 3</button>
        <button class="code-lang-btn" data-lang="javascript">JavaScript</button>
        <button class="btn btn-outline btn-xs" id="btn-copy-code" style="margin-left: auto;">Copy Code</button>
      </div>
      <div class="code-preview-wrapper">
        <pre><code class="language-code" id="dsa-code-display">${escapeHtml(p.code.cpp)}</code></pre>
      </div>
    </div>

    <div class="modal-dsa-footer">
      <button class="btn btn-outline" id="modal-btn-open-notes">
        📝 ${store.dsaNotes[p.id] ? 'Edit Notes' : 'Add Note'}
      </button>
      <button class="btn ${isSolved ? 'btn-secondary' : 'btn-primary'}" id="modal-btn-toggle-solve">
        ${isSolved ? 'Mark as Unsolved' : '✓ Mark as Solved'}
      </button>
    </div>
  `;

  // Tab switching
  modalBody.querySelectorAll('.dsa-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modalBody.querySelectorAll('.dsa-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      modalBody.querySelectorAll('.dsa-tab-pane').forEach(p => p.classList.remove('active'));
      document.getElementById(`pane-${tab}`)?.classList.add('active');
    });
  });

  // Code lang switching
  let currentLang = 'cpp';
  modalBody.querySelectorAll('.code-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modalBody.querySelectorAll('.code-lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.getAttribute('data-lang');
      const codeDisplay = document.getElementById('dsa-code-display');
      if (codeDisplay && p.code[currentLang]) {
        codeDisplay.innerHTML = escapeHtml(p.code[currentLang]);
      }
    });
  });

  // Copy code
  document.getElementById('btn-copy-code')?.addEventListener('click', () => {
    const codeText = p.code[currentLang] || '';
    navigator.clipboard.writeText(codeText).then(() => {
      showToast('Code copied to clipboard!', 'success');
    });
  });

  // Notes button
  document.getElementById('modal-btn-open-notes')?.addEventListener('click', () => {
    closeModal('modal-dsa-solution');
    openDsaNotesModal(problemId);
  });

  // Toggle solve button
  document.getElementById('modal-btn-toggle-solve')?.addEventListener('click', () => {
    store.toggleDsaSolved(problemId);
    if (store.dsaSolved.has(problemId)) {
      triggerConfetti();
      showToast('Solved! Keep the streak going!', 'success');
    }
    closeModal('modal-dsa-solution');
    renderDsaSheet();
    if (store.currentView === 'dashboard') renderDashboard();
  });

  openModal('modal-dsa-solution');
}

function openDsaNotesModal(problemId) {
  const p = dsaProblems.find(item => item.id === problemId);
  if (!p) return;

  const modal = document.getElementById('modal-dsa-notes');
  const titleEl = document.getElementById('notes-modal-title');
  const textarea = document.getElementById('notes-textarea');
  const saveBtn = document.getElementById('btn-save-note');
  if (!modal || !textarea) return;

  if (titleEl) titleEl.textContent = `Personal Notes: ${p.title}`;
  textarea.value = store.dsaNotes[problemId] || '';

  if (saveBtn) {
    saveBtn.onclick = () => {
      store.saveDsaNote(problemId, textarea.value);
      showToast('Notes saved successfully!', 'success');
      closeModal('modal-dsa-notes');
      renderDsaSheet();
    };
  }

  openModal('modal-dsa-notes');
}

// ==========================================
// 5. TRACKER VIEW
// ==========================================
function initTracker() {
  const trackerTabs = document.querySelectorAll('.tracker-nav-tab');
  trackerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      trackerTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tracker-target');
      document.querySelectorAll('.tracker-pane').forEach(p => p.classList.remove('active'));
      document.getElementById(`tracker-pane-${target}`)?.classList.add('active');
    });
  });

  // Export progress
  document.getElementById('btn-export-progress')?.addEventListener('click', () => {
    const data = {
      dsaSolved: [...store.dsaSolved],
      dsaBookmarked: [...store.dsaBookmarked],
      dsaNotes: store.dsaNotes,
      appliedJobs: store.appliedJobs,
      savedJobs: [...store.savedJobs],
      quizScores: store.quizScores,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_path_progress_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Progress exported as JSON!', 'success');
  });

  // Reset progress
  document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your DSA progress? This action cannot be undone.')) {
      store.dsaSolved.clear();
      store.dsaBookmarked.clear();
      store.dsaNotes = {};
      store.save();
      showToast('DSA progress has been reset.', 'info');
      renderTracker();
      renderDsaSheet();
      renderDashboard();
    }
  });

  renderTracker();
}

function renderTracker() {
  // 1. Applied jobs pane
  const appliedContainer = document.getElementById('tracker-applied-jobs');
  if (appliedContainer) {
    if (store.appliedJobs.length === 0) {
      appliedContainer.innerHTML = `
        <div class="empty-state">
          <p>You haven't applied to any jobs yet.</p>
          <button class="btn btn-primary btn-sm" onclick="window.location.hash='jobs'">Explore Jobs</button>
        </div>
      `;
    } else {
      appliedContainer.innerHTML = `
        <div class="applied-table-wrapper">
          <table class="applied-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Applied Date</th>
                <th>Application Status</th>
              </tr>
            </thead>
            <tbody>
              ${store.appliedJobs.map(app => `
                <tr>
                  <td><strong>${app.company}</strong></td>
                  <td>${app.jobTitle}</td>
                  <td>${new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td><span class="badge badge-accent">${app.status || 'Under Review'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  // 2. Saved jobs pane
  const savedContainer = document.getElementById('tracker-saved-jobs');
  if (savedContainer) {
    const savedList = store.jobs.filter(j => store.isJobSaved(j.id));
    if (savedList.length === 0) {
      savedContainer.innerHTML = `
        <div class="empty-state">
          <p>No saved jobs in your bookmarks.</p>
          <button class="btn btn-outline btn-sm" onclick="window.location.hash='jobs'">Browse Job Listings</button>
        </div>
      `;
    } else {
      savedContainer.innerHTML = savedList.map(j => createJobCardHtml(j)).join('');
      attachJobCardEvents(savedContainer);
    }
  }

  // 3. DSA Mastery Breakdown
  const dsaMasteryContainer = document.getElementById('tracker-dsa-topics-mastery');
  if (dsaMasteryContainer) {
    const topicsMap = {};
    dsaProblems.forEach(p => {
      if (!topicsMap[p.topic]) topicsMap[p.topic] = { total: 0, solved: 0 };
      topicsMap[p.topic].total++;
      if (store.dsaSolved.has(p.id)) topicsMap[p.topic].solved++;
    });

    dsaMasteryContainer.innerHTML = Object.entries(topicsMap).map(([topic, stats]) => {
      const topicPct = Math.round((stats.solved / stats.total) * 100);
      return `
        <div class="topic-progress-card">
          <div class="topic-progress-header">
            <span class="topic-name">${topic}</span>
            <span class="topic-stat">${stats.solved} / ${stats.total} (${topicPct}%)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${topicPct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. Quiz History
  const quizHistoryContainer = document.getElementById('tracker-quiz-history');
  if (quizHistoryContainer) {
    if (store.quizScores.length === 0) {
      quizHistoryContainer.innerHTML = `
        <div class="empty-state">
          <p>No quiz attempts recorded yet.</p>
          <button class="btn btn-primary btn-sm" onclick="window.location.hash='prep'">Take an Aptitude Quiz</button>
        </div>
      `;
    } else {
      quizHistoryContainer.innerHTML = `
        <div class="quiz-history-list">
          ${store.quizScores.map(q => `
            <div class="quiz-history-item">
              <span class="quiz-hist-date">${q.date}</span>
              <span class="quiz-hist-score">${q.score} / ${q.total}</span>
              <span class="badge ${q.pct >= 70 ? 'badge-success' : 'badge-neutral'}">${q.pct}%</span>
            </div>
          `).join('')}
        </div>
      `;
    }
  }
}

// ==========================================
// MODAL CONTROLS & UTILITIES
// ==========================================
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function formatMarkdownText(text) {
  if (!text) return '';
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/• (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/gim, '<br/><br/>');
}

