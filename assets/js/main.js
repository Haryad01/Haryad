/* =====================================================
   HARYAD MASSUD — Main Script
   Language switching (3 langs) · RTL/LTR · Theme · Nav
   ===================================================== */

(function () {
    'use strict';

    const LS_LANG = 'hm_lang';
    const LS_THEME = 'hm_theme';
    const DEFAULT_LANG = 'en';
    const WHATSAPP_NUMBER = '9647510689969';

    let currentLang = DEFAULT_LANG;

    /* ---------- helpers ---------- */
    function getByPath(obj, path) {
        return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
    }

    // Apply translations to all [data-i18n] elements
    function applyTranslations() {
        const t = TRANSLATIONS[currentLang];
        if (!t) return;

        // Set direction and language attributes
        const html = document.documentElement;
        html.setAttribute('dir', t.dir);
        html.setAttribute('lang', currentLang);
        html.style.direction = t.dir;

        // Translate all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            let value = getByPath(t, key);
            if (value === undefined) return;
            // Allow HTML in title strings (like gradient spans)
            el.innerHTML = value;
        });

        // Update placeholders via data-i18n-ph
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            const value = getByPath(t, key);
            if (value !== undefined) el.setAttribute('placeholder', value);
        });

        // Update lang menu active state
        document.querySelectorAll('.lang-opt').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });

        const formNote = document.getElementById('formNote');
        if (formNote && formNote.dataset.state) {
            formNote.textContent = t['whatsapp' + formNote.dataset.state];
        }

        // Update lang-btn label
        const lbl = document.querySelector('.lang-btn .lang-label');
        if (lbl && t.langLabel) lbl.textContent = t.langLabel;
    }

    /* ---------- language switching ---------- */
    function setLang(lang) {
        if (!TRANSLATIONS[lang]) return;
        currentLang = lang;
        localStorage.setItem(LS_LANG, lang);
        applyTranslations();
        setupScramble();
        // Re-render data-driven sections in the new language
        renderProjects();
        renderLanguages();
        renderTools();
        renderCertificates();
        renderExperience();
        renderFooterSocial();
        renderTerminal();
        updateBuildDemoLanguage();
        setupTypeCode();
        setupBgType();
        setupContactConnect();
        updateScrollStatusLanguage();
        updateStatsLanguage();
        setupSkillBars();
        setupReveal();
        setupExperienceJourney();
        setup3DButtons();
        setupTilt();
        closeLangMenu();
    }

    /* ---------- language menu ---------- */
    let langMenuOpen = false;
    function setupLangSelect() {
        const btn = document.getElementById('langBtn');
        const menu = document.getElementById('langMenu');

        if (!btn || !menu) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenuOpen = !langMenuOpen;
            menu.classList.toggle('open', langMenuOpen);
        });

        document.querySelectorAll('.lang-opt').forEach(opt => {
            opt.addEventListener('click', () => setLang(opt.dataset.lang));
        });

        document.addEventListener('click', () => closeLangMenu());
    }

    function closeLangMenu() {
        langMenuOpen = false;
        const menu = document.getElementById('langMenu');
        if (menu) menu.classList.remove('open');
    }

    /* ---------- theme toggle ---------- */
    function setupTheme() {
        const toggle = document.getElementById('themeToggle');
        const moon = document.getElementById('iconMoon');
        const sun = document.getElementById('iconSun');
        const html = document.documentElement;

        const savedTheme = localStorage.getItem(LS_THEME) || 'dark';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);

        if (!toggle) return;

        toggle.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem(LS_THEME, next);
            updateThemeIcons(next);
        });

        function updateThemeIcons(theme) {
            if (!moon || !sun) return;
            if (theme === 'dark') {
                moon.style.display = '';
                sun.style.display = 'none';
            } else {
                moon.style.display = 'none';
                sun.style.display = '';
            }
        }
    }

    /* ---------- mobile hamburger ---------- */
    function setupHamburger() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            }
        });
    }

    /* ---------- navbar scroll ---------- */
    function setupNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- reveal on scroll ---------- */
    let revealObserver = null;
    function setupReveal() {
        const els = document.querySelectorAll('.reveal, .reveal-file, .section-in');
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('visible'));
            return;
        }
        if (!revealObserver) {
            revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
        }
        els.forEach(el => {
            if (!el.classList.contains('visible')) revealObserver.observe(el);
        });
    }

    /* ---------- tech skill bars ---------- */
    function setupSkillBars() {
        const fills = document.querySelectorAll('.tech-fill');
        if (!fills.length) return;
        // On the tech page the skill-loader drives bar filling; skip observer here.
        if (document.getElementById('skillLoader')) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const level = el.getAttribute('data-level') || '0';
                    el.style.width = level + '%';
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.4 });

        fills.forEach(el => observer.observe(el));
    }

    /* ---------- WhatsApp contact form ---------- */
    function setupContactForm() {
        const form = document.getElementById('contactForm');
        const note = document.getElementById('formNote');
        if (!form || !note) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!form.reportValidity()) return;

            const fields = new FormData(form);
            const t = TRANSLATIONS[currentLang];
            const messageParts = [
                t.nameLabel + ': ' + fields.get('name'),
                t.msgLabel + ': ' + fields.get('message')
            ];
            const email = fields.get('email');
            if (email) messageParts.splice(1, 0, t.emailPhLabel + ': ' + email);
            const message = messageParts.join('\n');
            const whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
            const chatWindow = window.open(whatsappUrl, '_blank');

            if (!chatWindow) {
                note.dataset.state = 'Blocked';
                note.textContent = t.whatsappBlocked;
                return;
            }

            chatWindow.opener = null;
            note.dataset.state = 'Ready';
            note.textContent = t.whatsappReady;
        });
    }

    /* =====================================================
       CONTENT RENDERER
       Renders data-driven sections (projects, tech languages,
       tools, certificates, experience timeline, footer social)
       from SITE_DATA. Data lives in assets/js/data.js
       ===================================================== */

    function langData() {
        return SITE_DATA ? SITE_DATA : {};
    }

    function statusLabel(code) {
        const t = TRANSLATIONS[currentLang] || {};
        switch (code) {
            case 'using': return t.statusUsing || 'Using';
            case 'learning': return t.statusLearning || 'Learning';
            case 'inprogress': return t.statusInProgress || 'In Progress';
            case 'completed': return t.statusCompleted || 'Completed';
            case 'done': return t.statusDone || 'Done';
            case 'soon': return t.statusSoon || 'Coming Soon';
            default: return code;
        }
    }

    function statusClass(code) {
        const map = { using: 's-using', learning: 's-learning', inprogress: 's-inprogress', completed: 's-completed', soon: 's-soon', done: 's-done' };
        return map[code] || '';
    }

    /* ---- Project cards ---- */
    function renderProjects() {
        const grid = document.getElementById('projectsGrid');
        const data = langData().projects;
        if (!grid || !data || !data[currentLang]) return;
        const items = data[currentLang];
        const t = TRANSLATIONS[currentLang] || {};
        const tLabel = t.projStatus || 'Status';
        const dLabel = t.projDate || 'Date';
        const gitLabel = t.viewGitHub || 'GitHub';
        const demoLabel = t.liveDemo || 'Live Demo';

        let html = '';
        items.forEach(p => {
            const canGit = p.github && p.github.length > 0;
            const canDemo = p.demo && p.demo.length > 0;
            const tags = (p.tech || []).map(tag => '<span class="tag">' + tag + '</span>').join('');
            html += `
                <div class="project-card reveal-file">
                    <div class="project-preview">
                        <div class="ph">${p.icon || '🚧'}</div>
                        <div class="docs"><span class="f">📄</span><span class="f">📄</span><span class="f">📄</span></div>
                        <span class="project-status status-soon"><span class="pd"></span><span>${statusLabel(p.status)}</span></span>
                    </div>
                    <div class="project-body">
                        <h3 class="project-title">${p.title}</h3>
                        <p class="project-desc">${p.desc}</p>
                        <div class="project-tags">${tags}</div>
                        <div class="project-meta">
                            <span>${dLabel}: ${p.date || ''}</span>
                            <span>${tLabel}: ${statusLabel(p.status)}</span>
                        </div>
                        <div class="project-actions">
                            ${canGit ? '<a href="' + p.github + '" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">' + gitLabel + '</a>' : '<span class="btn btn-ghost btn-sm btn-disabled">' + gitLabel + '</span>'}
                            ${canDemo ? '<a href="' + p.demo + '" target="_blank" rel="noopener" class="btn btn-primary btn-sm">' + demoLabel + '</a>' : '<span class="btn btn-primary btn-sm btn-disabled">' + demoLabel + '</span>'}
                        </div>
                    </div>
                </div>`;
        });
        grid.innerHTML = html;
    }

    /* ---- Tech languages ---- */
    function renderLanguages() {
        const grid = document.getElementById('langGrid');
        const data = langData().techLanguages;
        if (!grid || !data || !data[currentLang]) return;

        let html = '';
        data[currentLang].forEach((lang, i) => {
            html += `
                <div class="tech-card reveal-file" style="transition-delay:${i * 90}ms">
                    <div class="tech-head">
                        <div class="tech-ico">${lang.icon}</div>
                        <div class="tech-title-wrap">
                            <div class="tech-name">${lang.name}</div>
                            <span class="status-chip ${statusClass(lang.status)}">${statusLabel(lang.status)}</span>
                        </div>
                    </div>
                    <div class="tech-loaded"><span>${TRANSLATIONS[currentLang].techLoadedText} <b>✓</b></span></div>
                    <div class="tech-status">${TRANSLATIONS[currentLang].techActiveText}</div>
                </div>`;
        });
        grid.innerHTML = html;
        setupSkillLoader();
        setupReveal();
        setupTechLoaded();
    }

    /* ---- Tools ---- */
    function renderTools() {
        const grid = document.getElementById('toolsGrid');
        const data = langData().tools;
        if (!grid || !data || !data[currentLang]) return;

        let html = '';
        data[currentLang].forEach(tool => {
            html += `
                <div class="tool-card reveal-file">
                    <div class="tool-ico">${tool.icon}</div>
                    <div class="tool-body">
                        <div class="tool-head">
                            <h4 class="tool-name">${tool.name}</h4>
                            <span class="status-chip ${statusClass(tool.status)}">${statusLabel(tool.status)}</span>
                        </div>
                        <p class="tool-desc">${tool.desc}</p>
                    </div>
                </div>`;
        });
        grid.innerHTML = html;
        setupReveal();
    }

    /* ---- Certificates ---- */
    function certCard(c, status) {
        const t = TRANSLATIONS[currentLang] || {};
        const isDone = status === 'done' || status === 'completed';
        const badge = isDone
            ? '<span class="cert-badge b-done">' + (t.statusCompleted || 'COMPLETED') + ' ✓</span>'
            : '<span class="cert-badge b-progress">' + (t.statusInProgress || 'IN PROGRESS') + '</span>';
        return `
            <div class="cert-card reveal-file">
                <div class="cert-ribbon"></div>
                <div class="cert-ico">${c.icon || '🏅'}</div>
                <h3 class="cert-title">${c.title}</h3>
                <div class="cert-subject">${(t.certSubjectLabel || 'Subject') + ': ' + c.subject}</div>
                ${c.year ? '<div class="cert-year">' + (t.certYearLabel || 'Year') + ': ' + c.year + '</div>' : ''}
                ${badge}
                ${isDone ? '<div class="verify">✓</div>' : ''}
            </div>`;
    }

    function renderCertificates() {
        const doneGrid = document.getElementById('certDoneGrid');
        const doingGrid = document.getElementById('certDoingGrid');
        const data = langData().certificates;
        if (!data || !data[currentLang]) return;
        const cat = data[currentLang];
        if (doneGrid && cat.completed) {
            doneGrid.innerHTML = cat.completed.map(c => certCard(c, 'done')).join('');
        }
        if (doingGrid && cat.inprogress) {
            doingGrid.innerHTML = cat.inprogress.map(c => certCard(c, 'inprogress')).join('');
        }
        setupReveal();
    }

    /* ---- Experience timeline ---- */
    function renderExperience() {
        const track = document.getElementById('expTimeline');
        const data = langData().experience;
        if (!track || !data || !data[currentLang]) return;

        let html = '';
        data[currentLang].forEach((item, i) => {
            const points = (item.points || []).map(pt => '<li>' + pt + '</li>').join('');
            html += `
                <div class="tl-item reveal">
                    <div class="tl-dot"></div>
                    <div class="tl-card">
                        <span class="tl-period">${item.period}</span>
                        <h3 class="tl-role">${item.role}</h3>
                        <ul class="tl-points">${points}</ul>
                    </div>
                </div>`;
        });
        track.innerHTML = html;
    }

    /* ---- Footer social links ---- */
    function renderFooterSocial() {
        renderSocials('footerSocial', 'icon-btn social-icon');
        renderSocials('platformGrid', 'platform-btn');
    }

    function renderSocials(containerId, cls) {
        const container = document.getElementById(containerId);
        const data = langData().socials;
        if (!container || !data) return;

        const socialTypes = ['tiktok', 'instagram', 'facebook'];
        let html = '';
        socialTypes.forEach(type => {
            const s = data[type];
            if (!s) return;
            const finalHref = s.href;
            const icon = socialIcon(type);
            const labelSpan = (containerId === 'platformGrid') ? '<span>' + s.label + '</span>' : '';
            html += `<a href="${finalHref}" class="${cls}" data-type="${type}" title="${s.label}" aria-label="${s.label}">${icon}${labelSpan}</a>`;
        });
        container.innerHTML = html;
    }

    function socialIcon(type) {
        const paths = {
            github: '<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>',
            tiktok: '<svg viewBox="0 0 24 24"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.36-2.27V9.97a5.76 5.76 0 0 0-.45-.05 5.66 5.66 0 1 0 5.66 5.66V9.26a7.35 7.35 0 0 0 4.3 1.38V7.55a4.28 4.28 0 0 1-4-1.73z"/></svg>',
            instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.77.07-1.15.05-1.77.24-2.18.41-.55.22-.94.48-1.35.89-.41.41-.67.8-.89 1.35-.16.41-.36 1.03-.41 2.18-.06 1.25-.07 1.62-.07 4.77s.01 3.52.07 4.77c.05 1.15.24 1.77.41 2.18.22.55.48.94.89 1.35.41.41.8.67 1.35.89.41.16 1.03.36 2.18.41 1.25.06 1.62.07 4.77.07s3.52-.01 4.77-.07c1.15-.05 1.77-.24 2.18-.41.55-.22.94-.48 1.35-.89.41-.41.67-.8.89-1.35.16-.41.36-1.03.41-2.18.06-1.25.07-1.62.07-4.77s-.01-3.52-.07-4.77c-.05-1.15-.24-1.77-.41-2.18a3.6 3.6 0 0 0-.89-1.35 3.6 3.6 0 0 0-1.35-.89c-.41-.16-1.03-.36-2.18-.41-1.25-.06-1.62-.07-4.77-.07zm0 3.08a5.04 5.04 0 1 1 0 10.08 5.04 5.04 0 0 1 0-10.08zm0 1.8a3.24 3.24 0 1 0 0 6.48 3.24 3.24 0 0 0 0-6.48zm5.26-3.08a1.18 1.18 0 1 1 0 2.36 1.18 1.18 0 0 1 0-2.36z"/></svg>',
            facebook: '<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
            email: '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg>'
        };
        return paths[type] || '';
    }

    /* =====================================================
       TERMINAL TYPING EFFECT for the hero terminal
       Types out whoami / role / location lines, then shows
       a blinking cursor.
       ===================================================== */

    let terminalTicking = false;
    let terminalTimers = [];
    let buildDemoTimer = null;
    let buildDemoIndex = 0;
    let buildDemoState = 'idle';

    function updateBuildDemoLanguage() {
        const demo = document.getElementById('buildDemo');
        if (!demo) return;
        const t = TRANSLATIONS[currentLang].buildDemo;
        const stages = document.getElementById('buildDemoStages');
        if (stages) stages.setAttribute('aria-label', t.progress);
        demo.querySelectorAll('.build-demo-stage').forEach((stage, index) => {
            stage.textContent = t.stages[index];
            stage.classList.toggle('done', buildDemoState === 'complete' || index < buildDemoIndex);
            stage.classList.toggle('active', buildDemoState === 'running' && index === buildDemoIndex);
        });
        const button = document.getElementById('buildDemoRun');
        if (button) {
            button.textContent = buildDemoState === 'running' ? t.running :
                buildDemoState === 'complete' ? t.replay : t.run;
            button.disabled = buildDemoState === 'running';
        }
        const code = document.getElementById('buildDemoCode');
        if (code) code.textContent = t.code.slice(0, buildDemoIndex).join('\n');
        const preview = document.getElementById('buildDemoPreview');
        if (preview) {
            preview.classList.remove('step-1', 'step-2', 'step-3', 'assembled');
            if (buildDemoIndex > 0) {
                preview.classList.add('step-' + Math.min(buildDemoIndex, 3));
                if (buildDemoState === 'complete') preview.classList.add('assembled');
            }
            preview.setAttribute('aria-hidden', buildDemoIndex === 0 ? 'true' : 'false');
        }
        const projects = document.getElementById('buildDemoProjects');
        if (projects) projects.hidden = buildDemoState !== 'complete';
    }

    function setupBuildDemo() {
        const button = document.getElementById('buildDemoRun');
        if (!button || button.hasAttribute('data-init')) return;
        button.setAttribute('data-init', '1');
        button.addEventListener('click', () => {
            if (buildDemoState === 'running') return;
            if (buildDemoTimer) clearTimeout(buildDemoTimer);
            buildDemoIndex = 0;
            buildDemoState = 'running';
            updateBuildDemoLanguage();

            if (prefersReduced) {
                buildDemoIndex = TRANSLATIONS[currentLang].buildDemo.stages.length;
                buildDemoState = 'complete';
                updateBuildDemoLanguage();
                return;
            }

            const advance = () => {
                if (buildDemoIndex >= TRANSLATIONS[currentLang].buildDemo.stages.length) {
                    buildDemoState = 'complete';
                    updateBuildDemoLanguage();
                    buildDemoTimer = null;
                    return;
                }
                buildDemoIndex++;
                updateBuildDemoLanguage();
                buildDemoTimer = setTimeout(advance, 620);
            };
            advance();
        });
        updateBuildDemoLanguage();
    }

    function clearTerminalTimers() {
        terminalTimers.forEach(timer => {
            clearTimeout(timer);
            clearInterval(timer);
        });
        terminalTimers = [];
    }

    function terminalTimeout(callback, delay) {
        const timer = setTimeout(callback, delay);
        terminalTimers.push(timer);
        return timer;
    }

    function terminalLines() {
        const t = TRANSLATIONS[currentLang];
        const commands = t.terminalCommands;
        return [
            { prompt: '>', cmd: commands.whoami, out: t.terminalName, cls: 'tk-id' },
            { prompt: '>', cmd: commands.role, out: t.heroProf, cls: 'tk-str' },
            { prompt: '>', cmd: commands.location, out: t.heroLoc, cls: 'tk-cm' },
            { prompt: '>', cmd: commands.status, out: t.heroStatus, cls: 'tk-fn' }
        ];
    }

    function setupTerminal() {
        const body = document.getElementById('termBody');
        if (!body || body.hasAttribute('data-init')) return;
        body.setAttribute('data-init', '1');
        terminalTicking = true;
        buildTerminal(body);
    }

    function renderTerminal() {
        const body = document.getElementById('termBody');
        if (!body) return;
        // Rebuild in a new language (clear existing typed lines)
        clearTerminalTimers();
        body.innerHTML = '';
        terminalTicking = true;
        buildTerminal(body);
    }

    function buildTerminal(body) {
        const lines = terminalLines();
        let lineIdx = 0;
        const root = document.createElement('div');
        const terminal = body.closest('.terminal');
        const boot = document.getElementById('terminalBoot');
        const bootLabel = boot && boot.querySelector('.terminal-boot-label');
        const progress = boot && boot.querySelector('.terminal-progress i');
        if (terminal) terminal.classList.remove('is-ready');
        if (bootLabel) bootLabel.textContent = TRANSLATIONS[currentLang].terminalBoot;
        if (progress) progress.style.width = '0%';
        if (terminal) terminal.classList.add('is-booting');

        const updateProgress = () => {
            if (progress) progress.style.width = Math.round((lineIdx / lines.length) * 100) + '%';
        };
        const finish = () => {
            terminalTicking = false;
            if (terminal) {
                terminal.classList.remove('is-booting');
                terminal.classList.add('is-ready');
            }
            if (bootLabel) bootLabel.textContent = TRANSLATIONS[currentLang].terminalReady;
        };

        const next = () => {
            if (lineIdx >= lines.length) {
                // Final cursor-only line
                const final = document.createElement('div');
                final.className = 'term-line';
                final.innerHTML = '<span class="prompt">&gt;</span><span class="cmd">&nbsp;</span><span class="blink-cursor"></span>';
                root.appendChild(final);
                updateProgress();
                finish();
                return;
            }
            buildLine(root, lines[lineIdx++], next);
            updateProgress();
        };
        if (prefersReduced) {
            root.innerHTML = lines.map(line =>
                '<div class="term-entry"><div class="term-line term-command"><span class="prompt">&gt;</span><span class="cmd"> ' +
                escapeHtml(line.cmd) + '</span></div><div class="term-output complete ' + line.cls + '">' +
                escapeHtml(line.out) + '</div></div>'
            ).join('') + '<div class="term-line"><span class="prompt">&gt;</span><span class="cmd">&nbsp;</span></div>';
            body.appendChild(root);
            lineIdx = lines.length;
            updateProgress();
            finish();
            return;
        }
        body.appendChild(root);
        terminalTimeout(next, 60);
    }

    function buildLine(root, line, done) {
        const entry = document.createElement('div');
        entry.className = 'term-entry';
        const commandRow = document.createElement('div');
        commandRow.className = 'term-line term-command';
        commandRow.innerHTML = '<span class="prompt">' + line.prompt + '</span><span class="cmd"></span><span class="blink-cursor"></span>';
        const commandText = commandRow.querySelector('.cmd');
        const output = document.createElement('div');
        output.className = 'term-output ' + (line.cls || 'tk-id');
        entry.append(commandRow, output);
        root.appendChild(entry);

        const typeText = (element, text, speed, complete) => {
            let index = 0;
            const timer = setInterval(() => {
                element.textContent = text.slice(0, ++index);
                if (index >= text.length) {
                    clearInterval(timer);
                    complete();
                }
            }, speed);
            terminalTimers.push(timer);
        };

        typeText(commandText, ' ' + line.cmd, 8, () => {
            const cursor = commandRow.querySelector('.blink-cursor');
            if (cursor) cursor.remove();
            if (!line.out) { terminalTimeout(done, 40); return; }
            output.classList.add('typing');
            typeText(output, line.out, 4, () => {
                output.classList.remove('typing');
                output.classList.add('complete');
                terminalTimeout(done, 70);
            });
        });
    }

    /* =====================================================
       PROGRAMMING-INSPIRED ANIMATIONS
       Connecting nodes canvas, bg typing lines, typed code,
       viewport transitions, skill init loader, cursor.
       ===================================================== */

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Connecting nodes canvas ---------- */
    function setupSysCanvas() {
        const canvas = document.getElementById('sysCanvas');
        if (!canvas || prefersReduced) return;
        const ctx = canvas.getContext('2d');
        let w, h, nodes = [];

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        const count = Math.min(34, Math.floor(w / 40));
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.6
            });
        }

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            const lineDist = 130;
            // lines
            ctx.lineWidth = 0.4;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const d = Math.hypot(dx, dy);
                    if (d < lineDist) {
                        const a = (1 - d / lineDist) * 0.5;
                        ctx.strokeStyle = 'rgba(88,166,255,' + a.toFixed(3) + ')';
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
                // node
                nodes[i].x += nodes[i].vx;
                nodes[i].y += nodes[i].vy;
                if (nodes[i].x < 0 || nodes[i].x > w) nodes[i].vx *= -1;
                if (nodes[i].y < 0 || nodes[i].y > h) nodes[i].vy *= -1;
                ctx.fillStyle = 'rgba(63,185,80,0.6)';
                ctx.beginPath();
                ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
                ctx.fill();
            }
            raf = requestAnimationFrame(draw);
        };
        draw();

        // pause when hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(raf);
            else if (!prefersReduced) raf = requestAnimationFrame(draw);
        });
    }

    /* ---------- Background typing lines ---------- */
    let bgTypeTimers = [];
    function setupBgType() {
        bgTypeTimers.forEach(timer => {
            clearTimeout(timer);
            clearInterval(timer);
        });
        bgTypeTimers = [];
        const els = document.querySelectorAll('.bg-type');
        if (prefersReduced) {
            els.forEach((el, idx) => { el.textContent = TRANSLATIONS[currentLang].bgTypeLines[idx] || ''; });
            return;
        }
        const lines = TRANSLATIONS[currentLang].bgTypeLines;
        els.forEach((el, idx) => {
            const code = lines[idx] || '';
            el.innerHTML = '<span class="caret">_</span>';
            let i = 0;
            const tick = () => {
                if (i < code.length) {
                    el.innerHTML = escapeHtml(code.slice(0, ++i)) + '<span class="caret">_</span>';
                    bgTypeTimers.push(setTimeout(tick, 16));
                }
            };
            bgTypeTimers.push(setTimeout(tick, 80 + idx * 120));
            // recycle
            bgTypeTimers.push(setInterval(() => {
                if (i >= code.length) { i = 0; el.innerHTML = '<span class="caret">_</span>'; tick(); }
            }, 20000 + idx * 6000));
        });
    }

    function escapeHtml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* ---------- Typed code block ---------- */
    let typeCodeTimer = null;
    function setupTypeCode() {
        const el = document.getElementById('typeCode');
        if (!el) return;
        if (typeCodeTimer) clearInterval(typeCodeTimer);
        const lines = TRANSLATIONS[currentLang].profileCodeLines;
        if (prefersReduced) {
            el.textContent = lines.join('\n');
            return;
        }

        el.textContent = '';
        let lineIdx = 0, charIdx = 0;
        typeCodeTimer = setInterval(() => {
            if (lineIdx >= lines.length) {
                clearInterval(typeCodeTimer);
                typeCodeTimer = null;
                el.innerHTML = lines.map(escapeHtml).join('\n') + '\n<span class="caret">_</span>';
                return;
            }
            const typed = lines.slice(0, lineIdx).join('\n')
                + (lineIdx < lines.length ? '\n' + escapeHtml(lines[lineIdx].slice(0, charIdx)) : '')
                + '\n<span class="caret">_</span>';
            el.innerHTML = typed;
            charIdx++;
            if (charIdx >= lines[lineIdx].length) {
                charIdx = 0; lineIdx++;
            }
        }, 8);
    }

    /* ---------- Skill init loader (tech page) ---------- */
    let skillInitRan = false;
    function setupSkillLoader() {
        const grid = document.getElementById('langGrid');
        if (!grid) return;
        if (prefersReduced) { const l = document.getElementById('skillLoader'); if (l) l.classList.add('hidden'); skillInitRan = true; return; }

        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(en => {
                    if (en.isIntersecting) { skillRun(); obs.disconnect(); }
                });
            }, { threshold: 0.15 });
            obs.observe(grid);
        } else { skillRun(); }

        function skillRun() {
            if (skillInitRan) return;
            const loader = document.getElementById('skillLoader');
            if (!loader) { skillInitRan = true; return; }
            skillInitRan = true;
            let i = 0;
            const typeTimer = setInterval(() => {
                const full = TRANSLATIONS[currentLang].skillInitText;
                i++;
                loader.textContent = full.slice(0, i);
                if (i >= full.length) {
                    clearInterval(typeTimer);
                    runProgress(loader);
                }
            }, 10);
        }

        function runProgress(loader) {
            const blocks = 8;
            let p = 0;
            const bar = setInterval(() => {
                p += 8;
                const filled = '█'.repeat(Math.round(p / 100 * blocks));
                const empty = '░'.repeat(blocks - filled.length);
                loader.innerHTML = TRANSLATIONS[currentLang].skillLoadingText + ' <span class="bar">' + filled + empty + '</span> <span class="pct">' + p + '%</span>';
                if (p >= 100) {
                    clearInterval(bar);
                    loader.classList.add('hidden');
                    revealFills(grid);
                }
            }, 45);
        }
    }

    function revealFills(grid) {
        if (!grid) return;
        grid.querySelectorAll('.tech-fill').forEach(f => {
            const level = f.getAttribute('data-level') || '0';
            f.style.width = level + '%';
        });
    }

    /* ---------- Status-based skill loaded marker ---------- */
    function setupTechLoaded() {
        const tags = document.querySelectorAll('.tech-loaded');
        if (!tags.length) return;
        if (prefersReduced || !('IntersectionObserver' in window)) {
            tags.forEach(t => t.classList.add('loaded'));
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    const card = en.target.closest('.tech-card');
                    en.target.classList.add('loaded');
                    if (card) card.classList.add('loaded');
                    obs.unobserve(en.target);
                }
            });
        }, { threshold: 0.3 });
        tags.forEach(t => obs.observe(t));
    }

    /* ---------- Process pipeline (IDEA -> CODE -> BUILD -> IMPROVE) ---------- */
    function setupPipeline() {
        const pipe = document.getElementById('pipeline');
        if (!pipe) return;
        const nodes = pipe.querySelectorAll('.pipe-node');
        const wrap = pipe;
        if (prefersReduced) {
            nodes.forEach(n => n.classList.add('active'));
            wrap.classList.add('active', 'looped');
            return;
        }
        let started = false;
        const run = () => {
            if (started) return;
            started = true;
            nodes.forEach((n, i) => {
                setTimeout(() => {
                    n.classList.add('active');
                    if (i === 1) wrap.classList.add('active');
                }, 120 + i * 300);
            });
            setTimeout(() => wrap.classList.add('looped'), 120 + nodes.length * 300 + 200);
        };
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(en => { if (en.isIntersecting) { run(); obs.disconnect(); } });
            }, { threshold: 0.3 });
            obs.observe(pipe);
        } else run();
    }

    /* ---------- Journey counters ---------- */
    let statsTimers = [];
    function setupStats() {
        const nums = document.querySelectorAll('.stat-num[data-stat]');
        if (!nums.length) return;
        let fill = () => {
            nums.forEach(el => {
                const k = el.getAttribute('data-stat');
                const val = (TRANSLATIONS[currentLang] || {})['stat' + k] || '';
                el.textContent = val;
                if (/^[\d+]+$/.test(val) && !prefersReduced) {
                    const target = parseInt(val, 10);
                    el.textContent = '0';
                    let start = 0;
                    const step = Math.max(1, Math.round(target / 40));
                    const t = setInterval(() => {
                        start += step;
                        if (start >= target) { start = target; clearInterval(t); }
                        el.textContent = start + (val.includes('+') ? '+' : '');
                    }, 30);
                    statsTimers.push(t);
                }
            });
        };
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(en => { if (en.isIntersecting) { fill(); obs.disconnect(); } });
            }, { threshold: 0.4 });
            obs.observe(document.getElementById('stats') || nums[0]);
        } else fill();
    }

    function updateStatsLanguage() {
        statsTimers.forEach(timer => clearInterval(timer));
        statsTimers = [];
        document.querySelectorAll('.stat-num[data-stat]').forEach(el => {
            const key = 'stat' + el.getAttribute('data-stat');
            el.textContent = TRANSLATIONS[currentLang][key] || '';
        });
    }

    /* ---------- Contact connection terminal ---------- */
    let contactConnectObserver = null;
    let contactConnectTimers = [];
    function setupContactConnect() {
        const section = document.getElementById('contact');
        if (!section) return;
        const head = section.querySelector('.section-head');
        if (!head) return;
        let slug = section.querySelector('.contact-connect');
        if (!slug) {
            slug = document.createElement('div');
            slug.className = 'contact-connect';
            head.after(slug);
        }
        if (contactConnectObserver) contactConnectObserver.disconnect();
        contactConnectTimers.forEach(timer => {
            clearTimeout(timer);
            clearInterval(timer);
        });
        contactConnectTimers = [];
        slug.classList.remove('secured');
        section.classList.remove('connected');
        slug.textContent = '';
        const lines = TRANSLATIONS[currentLang].contactConnectLines;
        if (prefersReduced) {
            slug.textContent = lines[lines.length - 1];
            slug.classList.add('secured');
            section.classList.add('connected');
            return;
        }
        let li = 0;
        const typeLine = () => {
            if (li >= lines.length) { reveal(); return; }
            slug.innerHTML = '<span class="prompt">></span> ';
            let i = 0;
            const text = lines[li];
            const tick = setInterval(() => {
                i++;
                slug.innerHTML = '<span class="prompt">></span> ' + text.slice(0, i) + '<span class="caret">_</span>';
                if (i >= text.length) { clearInterval(tick); li++; contactConnectTimers.push(setTimeout(typeLine, 80)); }
            }, 8);
            contactConnectTimers.push(tick);
        };
        const reveal = () => {
            const caret = slug.querySelector('.caret');
            if (caret) caret.remove();
            slug.classList.add('secured');
            section.classList.add('connected');
            const soc = section.querySelectorAll('.platform-btn, .social-icon');
            soc.forEach((s, i) => s.style.transitionDelay = (i * 90) + 'ms');
        };
        if ('IntersectionObserver' in window) {
            const headEl = section.querySelector('.section-head');
            let ran = false;
            contactConnectObserver = new IntersectionObserver((entries) => {
                entries.forEach(en => { if (en.isIntersecting && !ran) { ran = true; typeLine(); contactConnectObserver.disconnect(); } });
            }, { threshold: 0.25 });
            contactConnectObserver.observe(headEl);
        } else typeLine();
    }

    /* ---------- Experience timeline journey ---------- */
    let experienceObserver = null;
    function setupExperienceJourney() {
        const timeline = document.getElementById('expTimeline');
        if (!timeline) return;
        if (experienceObserver) {
            experienceObserver.disconnect();
            experienceObserver = null;
        }
        const items = timeline.querySelectorAll('.tl-item');
        if (!items.length) return;
        if (prefersReduced || !('IntersectionObserver' in window)) {
            timeline.classList.add('drawn');
            items.forEach(it => it.classList.add('active'));
            return;
        }
        experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    timeline.classList.add('drawn');
                    en.target.classList.add('active');
                    experienceObserver.unobserve(en.target);
                }
            });
        }, { threshold: 0.25 });
        items.forEach(it => experienceObserver.observe(it));
    }

    /* ---------- Scroll command reveal lines ---------- */
    function setupScrollStatus() {
        const sections = document.querySelectorAll('[data-scroll-key], [data-scroll-cmd]');
        if (!sections.length) return;
        if (prefersReduced) return;

        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(en => {
                    if (!en.isIntersecting) return;
                    const sec = en.target;
                    const key = sec.getAttribute('data-scroll-key');
                    const cmd = (key && TRANSLATIONS[currentLang].scrollCommands[key]) || sec.getAttribute('data-scroll-cmd');
                    obs.unobserve(sec);
                    if (!cmd) return;
                    const status = document.createElement('div');
                    status.className = 'scroll-status';
                    status.textContent = '';
                    sec.insertBefore(status, sec.firstChild);
                    let i = 0;
                    const t = setInterval(() => {
                        i++;
                        status.textContent = '> ' + cmd.slice(0, i);
                        if (i >= cmd.length) { clearInterval(t); status.classList.add('show'); }
                    }, 8);
                    status._hmTimer = t;
                });
            }, { threshold: 0.2 });
            sections.forEach(s => obs.observe(s));
        }
    }

    function updateScrollStatusLanguage() {
        document.querySelectorAll('[data-scroll-key]').forEach(section => {
            const key = section.getAttribute('data-scroll-key');
            const command = TRANSLATIONS[currentLang].scrollCommands[key];
            const status = section.querySelector('.scroll-status');
            if (!command || !status) return;
            if (status._hmTimer) clearInterval(status._hmTimer);
            status.textContent = '> ' + command;
            status.classList.add('show');
        });
    }

    /* ---------- Viewport transitions ---------- */
    function setupTransitions() {
        const overlay = document.getElementById('viewportTransition');
        const cmdEl = document.getElementById('transCmd');
        const snipEl = document.getElementById('transSnippet');
        const fill = document.getElementById('transFill');
        if (!overlay) return;

        const transition = (page, command) => {
            if (!page) return;
            const reduced = prefersReduced;
            if (reduced) { window.location.href = page; return; }

            overlay.classList.add('active');
            if (cmdEl) {
                cmdEl.textContent = '';
                let i = 0;
                const cmdTimer = setInterval(() => {
                    i++;
                    cmdEl.textContent = command.slice(0, i);
                    if (i >= command.length) clearInterval(cmdTimer);
                }, 18);
            }

            // type a context-specific snippet
            const base = page.split('.')[0];
            const lines = TRANSLATIONS[currentLang].transitionSnippets[base];
            if (snipEl && lines) {
                snipEl.innerHTML = '';
                let li = 0;
                const typeSnippet = () => {
                    if (li >= lines.length) return;
                    const pre = document.createElement('div');
                    pre.className = 'snip';
                    snipEl.appendChild(pre);
                    let ci = 0;
                    const text = lines[li];
                    const t = setInterval(() => {
                        ci++;
                        pre.textContent = text.slice(0, ci);
                        if (ci >= text.length) {
                            clearInterval(t);
                            li++;
                            setTimeout(typeSnippet, 60);
                        }
                    }, 16);
                };
                typeSnippet();
            }

            if (fill) { fill.style.transition = 'none'; fill.style.width = '0%'; }
            setTimeout(() => { if (fill) fill.style.width = '100%'; }, 30);

            const duration = lines ? 1100 : 480;
            setTimeout(() => { window.location.href = page; }, duration);
        };

        // category cards
        document.querySelectorAll('[data-nav-page]').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                transition(card.getAttribute('data-nav-page'), card.getAttribute('data-nav-cmd') || 'open');
            });
        });

        // nav links + hero action buttons to sub-pages get a quick transition too
        const bindPageLink = (link) => {
            link.addEventListener('click', (e) => {
                const page = link.getAttribute('href');
                if (!page || page[0] === '#') return;
                e.preventDefault();
                let cmd = 'open ' + (page.split('.')[0] || page);
                if (page.indexOf('projects') === 0) cmd = 'cd ./projects';
                else if (page.indexOf('techstack') === 0) cmd = 'npm run skills';
                else if (page.indexOf('certificates') === 0) cmd = 'open certificates';
                else if (page.indexOf('index') === 0) cmd = 'cd ~';
                transition(page, cmd);
            });
        };
        document.querySelectorAll('.nav-links a[href$=".html"], .hero-actions a[href$=".html"]').forEach(bindPageLink);
    }

    /* =====================================================
       PROGRAMMATIC PERFORMANCE ANIMATIONS (rAF / transform)
       ===================================================== */

    /* ---------- Scroll progress bar (top) ---------- */
    function setupScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;
        if (prefersReduced) { bar.style.opacity = 0; return; }
        let ticking = false;
        const update = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
            bar.style.transform = 'scaleX(' + (pct / 100) + ')';
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        window.addEventListener('resize', () => {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        });
        update();
    }

    /* ---------- 3D tactile buttons (cursor tilt + press depth) ---------- */
    function setup3DButtons() {
        if (prefersReduced) return;

        const sel = '.btn:not(.btn-disabled), .cat-card, .nav-links a, .icon-btn, .lang-btn, .hamburger, .back-btn, .platform-btn, .lang-opt';
        const els = document.querySelectorAll(sel);
        if (!els.length) return;

        const hoverable = !(window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches);

        if (!setup3DButtons.releaseListenersBound) {
            const releaseAll = () => {
                document.querySelectorAll('.btn3d.pressed').forEach((el) => {
                    if (el._hmRelease) el._hmRelease();
                });
            };
            window.addEventListener('pointerup', releaseAll);
            window.addEventListener('blur', releaseAll);
            setup3DButtons.releaseListenersBound = true;
        }

        els.forEach(el => {
            if (el.classList.contains('btn3d')) return;
            el.classList.add('btn3d');
            const maxTilt = el.classList.contains('cat-card') ? 10 : 7;

            let raf = null;
            const resetTilt = () => {
                if (raf) { cancelAnimationFrame(raf); raf = null; }
                el.style.setProperty('--rx', '0deg');
                el.style.setProperty('--ry', '0deg');
            };
            const press = () => {
                el.classList.add('pressed');
                el.classList.remove('spring');
                el.style.setProperty('--ty', '5px');
                el.style.setProperty('--sc', '0.97');
            };
            const release = () => {
                el.classList.remove('pressed');
                el.style.setProperty('--ty', '0px');
                el.style.setProperty('--sc', '1');
                el.classList.add('spring');
                clearTimeout(el._hmSpring);
                el._hmSpring = setTimeout(() => el.classList.remove('spring'), 360);
            };
            el._hmRelease = release;

            const onDown = () => {
                resetTilt();
                press();
            };
            const onLeave = () => {
                resetTilt();
                if (el.classList.contains('pressed')) release();
            };

            el.addEventListener('pointerdown', onDown);
            el.addEventListener('pointerup', () => { if (el.classList.contains('pressed')) release(); });
            el.addEventListener('pointercancel', () => { if (el.classList.contains('pressed')) release(); });
            el.addEventListener('mouseleave', onLeave);

            if (!hoverable) return;

            const move = (e) => {
                if (raf) return;
                if (el.classList.contains('pressed')) return;
                raf = requestAnimationFrame(() => {
                    const r = el.getBoundingClientRect();
                    const px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
                    const py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
                    el.style.setProperty('--rx', ((0.5 - py) * maxTilt).toFixed(2) + 'deg');
                    el.style.setProperty('--ry', ((px - 0.5) * maxTilt).toFixed(2) + 'deg');
                    raf = null;
                });
            };
            el.addEventListener('mousemove', move, { passive: true });
        });
    }

    /* ---------- 3D Tilt cards (GPU parallax on hover) ---------- */
    function setupTilt() {
        if (prefersReduced) return;
        const isTouch = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
        if (isTouch) return;
        const els = document.querySelectorAll('.terminal, .code-window, .about-terminal-card, .project-card');
        if (!els.length) return;

        els.forEach(card => {
            if (card.classList.contains('tilt')) return;
            card.classList.add('tilt');
            let raf = null;
            const onMove = (e) => {
                if (raf) return;
                raf = requestAnimationFrame(() => {
                    const r = card.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width;
                    const py = (e.clientY - r.top) / r.height;
                    const rx = (0.5 - py) * 8;
                    const ry = (px - 0.5) * 8;
                    card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
                    card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
                    raf = null;
                });
            };
            const reset = () => {
                if (raf) { cancelAnimationFrame(raf); raf = null; }
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
            };
            card.addEventListener('mousemove', onMove, { passive: true });
            card.addEventListener('mouseleave', reset);
        });
    }

    /* ---------- Floating background orbs (parallax) ---------- */
    function setupOrbFloat() {
        if (prefersReduced) return;
        const orbs = document.querySelectorAll('.bg-orb');
        if (!orbs.length) return;
        const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;
        let raf = null;
        const t0 = performance.now();
        const update = () => {
            const t = (performance.now() - t0) / 1000;
            orbs.forEach((orb, i) => {
                const amp = 12 + i * 6;
                const speed = 0.4 + i * 0.15;
                const oy = Math.sin(t * speed + i * 1.8) * amp;
                const ox = Math.cos(t * speed * 0.8 + i) * (amp * 0.5);
                orb.style.transform = 'translate3d(' + ox.toFixed(2) + 'px,' + oy.toFixed(2) + 'px,0)';
            });
            raf = requestAnimationFrame(update);
        };
        raf = requestAnimationFrame(update);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) { if (raf) cancelAnimationFrame(raf); }
            else if (!prefersReduced) raf = requestAnimationFrame(update);
        });
    }

    /* ---------- Text scramble on hover (titles) ---------- */
    const scrambleStates = new WeakMap();
    function setupScramble() {
        if (prefersReduced) return;
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        document.querySelectorAll('.section-title').forEach(el => {
            let state = scrambleStates.get(el);
            if (state) {
                if (state.raf) cancelAnimationFrame(state.raf);
                state.raf = null;
                return;
            }

            state = { raf: null };
            scrambleStates.set(el, state);
            el.addEventListener('mouseenter', () => {
                if (state.raf) return;
                const originalHTML = el.innerHTML;
                const text = [...el.textContent.trim()];
                let frame = 0;
                const fx = () => {
                    const progress = Math.min(text.length, frame / 16);
                    let out = '';
                    for (let i = 0; i < text.length; i++) {
                        if (/\s/.test(text[i]) || i < progress) out += text[i];
                        else out += chars[Math.floor(Math.random() * chars.length)];
                    }
                    el.textContent = out;
                    frame++;
                    if (progress >= text.length) {
                        el.innerHTML = originalHTML;
                        state.raf = null;
                        return;
                    }
                    state.raf = requestAnimationFrame(fx);
                };
                state.raf = requestAnimationFrame(fx);
            });
        });
    }

    /* ---------- Interactive cursor ---------- */
    function setupCursor() {
        if (prefersReduced) return;
        const coarse = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
        if (coarse) return;

        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');
        const label = document.querySelector('.cursor-label');
        let mx = -100, my = -100, rx = -100, ry = -100;
        let has = false;

        const CURSOR_VARS = [
            { sel: '.project-card, .cat-card[data-nav-page*="projects"]', icon: '📁' },
            { sel: '.tech-card, .tool-card, .cat-card[data-nav-page*="techstack"]', icon: '{ }' },
            { sel: '.cert-card, .cat-card[data-nav-page*="certificates"]', icon: '📄' },
            { sel: '.platform-btn, .social-icon, .cat-card[data-nav-page*="contact"], #contact a', icon: '↗' }
        ];
        function clearVar() {
            if (ring) ring.classList.remove('cursor-var');
            if (label) label.textContent = '';
        }

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            if (!has) { dot.style.opacity = 1; ring.style.opacity = 1; has = true; }
        }, { passive: true });

        const loop = () => {
            rx += (mx - rx) * 0.2;
            ry += (my - ry) * 0.2;
            if (dot) dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
            if (ring) ring.style.transform = 'translate(' + (rx - ring.offsetWidth / 2) + 'px,' + (ry - ring.offsetHeight / 2) + 'px)';
            requestAnimationFrame(loop);
        };
        loop();

        // interactive elements
        const hoverSel = 'a, .btn, .cat-card, .project-card, .tech-card, .tool-card, .cert-card, .social-icon, .platform-btn, .lang-btn, .icon-btn, .hamburger';
        const activeSel = 'button';

        document.addEventListener('mouseover', (e) => {
            const t = e.target;
            if (t.closest(hoverSel)) ring.classList.add('is-hover');
            if (t.closest(activeSel)) ring.classList.add('is-active');
            clearVar();
            for (const v of CURSOR_VARS) {
                if (t.closest(v.sel)) {
                    ring.classList.add('cursor-var');
                    if (label) label.textContent = v.icon;
                    break;
                }
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverSel)) ring.classList.remove('is-hover');
            if (e.target.closest(activeSel)) ring.classList.remove('is-active');
            clearVar();
        });
    }

    /* ---------- init ---------- */
    function init() {
        // Load saved language
        const saved = localStorage.getItem(LS_LANG) || DEFAULT_LANG;
        currentLang = TRANSLATIONS[saved] ? saved : DEFAULT_LANG;

        // Apply initial translations BEFORE anything else (critical for RTL)
        applyTranslations();

        // Render data-driven content (depends on currentLang)
        renderProjects();
        renderLanguages();
        renderTools();
        renderCertificates();
        renderExperience();
        renderFooterSocial();

        setupLangSelect();
        setupTheme();
        setupHamburger();
        setupNavbar();
        setupReveal();
        setupBuildDemo();
        setupSkillBars();
        setupContactForm();
        setupTerminal();
        setupSysCanvas();
        setupBgType();
        setupTypeCode();
        setupTransitions();
        setupScrollProgress();
        setup3DButtons();
        setupTilt();
        setupOrbFloat();
        setupScramble();
        setupCursor();
        setupPipeline();
        setupStats();
        setupContactConnect();
        setupExperienceJourney();
        setupScrollStatus();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
