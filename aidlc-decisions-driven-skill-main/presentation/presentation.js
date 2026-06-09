/**
 * AI-DLC Workshop Presentation Engine
 * Renders slides from slides.js data and handles navigation.
 */

(function () {
    'use strict';

    const container = document.getElementById('presentation');
    const progress = document.getElementById('progress');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slidesData = window.SLIDES;

    let currentSlide = 0;
    const totalSlides = slidesData.length;

    // === Renderers per layout ===

    function renderTitle(data) {
        return `
            <div class="badge">${data.badge}</div>
            <h1>${data.title}</h1>
            <p class="subtitle">${data.subtitle}</p>
            <p class="tagline">${data.tagline}</p>
            <div class="meta">
                ${data.meta.map((m, i) => `<span>${m}</span>${i < data.meta.length - 1 ? '<span class="separator">•</span>' : ''}`).join('')}
            </div>
        `;
    }

    function renderTwoCol(data) {
        return `
            <h2>${data.title}</h2>
            <div class="two-col">
                ${data.columns.map(col => `
                    <div class="col">
                        <h3>${col.heading}</h3>
                        <ul>${col.items.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderWorkflow(data) {
        return `
            <h2>${data.title}</h2>
            <div class="workflow-diagram">
                ${data.steps.map((step, i) => `
                    <div class="workflow-step">
                        <div class="step-number">${step.number}</div>
                        <div class="step-label">${step.label}</div>
                        <div class="step-desc">${step.desc}</div>
                    </div>
                    ${i < data.steps.length - 1 ? '<div class="workflow-arrow">→</div>' : ''}
                `).join('')}
            </div>
            <p class="note">${data.note}</p>
        `;
    }

    function renderGates(data) {
        return `
            <h2>${data.title}</h2>
            <p class="lead">${data.lead}</p>
            <div class="gates-grid">
                ${data.gates.map(gate => `
                    <div class="gate-card">
                        <div class="gate-id">${gate.id}</div>
                        <div class="gate-phase">${gate.phase}</div>
                        <div class="gate-covers">${gate.covers}</div>
                    </div>
                `).join('')}
            </div>
            <div class="gate-flow">
                ${data.flow.map((step, i) => `<span>${step}</span>${i < data.flow.length - 1 ? ' → ' : ''}`).join('')}
            </div>
        `;
    }

    function renderProjectCards(data) {
        return `
            <h2>${data.title}</h2>
            <div class="two-col">
                ${data.cards.map(card => `
                    <div class="col card-col">
                        <div class="project-card ${card.type}">
                            <h3>${card.icon} ${card.heading}</h3>
                            <p class="card-subtitle">${card.subtitle}</p>
                            <div class="flow-mini">${card.flow}</div>
                            <ul>${card.items.map(item => `<li>${item}</li>`).join('')}</ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderIncremental(data) {
        return `
            <h2>${data.title}</h2>
            <p class="lead">${data.lead}</p>
            <div class="incremental-diagram">
                <div class="shared-phases">
                    ${data.sharedPhases.map(p => `<div class="phase-box">${p}</div>`).join('')}
                </div>
                <div class="units-section">
                    ${data.units.map(unit => `
                        <div class="unit-lane">
                            <div class="unit-header">${unit.name}</div>
                            <div class="unit-phases">
                                ${unit.phases.map(p => `<span class="${p.status}">${p.label}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <p class="note">${data.note}</p>
        `;
    }

    function renderModes(data) {
        return `
            <h2>${data.title}</h2>
            <div class="modes-grid">
                ${data.modes.map(mode => `
                    <div class="mode-card">
                        <div class="mode-icon">${mode.icon}</div>
                        <h3>${mode.name}</h3>
                        <p>${mode.desc}</p>
                        <div class="mode-best">${mode.best}</div>
                        <div class="mode-platform">${mode.platform}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderArchitecture(data) {
        return `
            <h2>${data.title}</h2>
            <div class="arch-legend">
                ${data.legend.map(l => `<span class="legend-item"><span class="legend-swatch ${l.cls}"></span>${l.label}</span>`).join('')}
            </div>
            <div class="architecture-visual">
                <div class="arch-orchestrator">
                    <div class="arch-box orchestrator">
                        <span class="arch-name">${data.orchestrator.name}</span>
                        <span class="arch-desc">${data.orchestrator.desc}</span>
                    </div>
                </div>
                <div class="arch-connector">dispatches ↓</div>
                <div class="arch-skills">
                    ${data.coreSkills.map(s => `
                        <div class="arch-box skill">
                            <span class="arch-name">${s.name}</span>
                            <span class="arch-desc">${s.desc}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="arch-supporting">
                    ${data.supportingSkills.map(s => `
                        <div class="arch-box supporting">
                            <span class="arch-name">${s.name}</span>
                            <span class="arch-desc">${s.desc}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="skill-anatomy">
                <h3>Each Skill Contains:</h3>
                <code>${data.anatomy.join('<br>')}</code>
            </div>
        `;
    }

    function renderArtifacts(data) {
        var legend = data.legend ? `<div class="artifacts-legend">${data.legend.map(l => `<span class="legend-item"><span class="legend-swatch ${l.cls}"></span>${l.label}</span>`).join('')}</div>` : '';
        var lines = data.lines.map(function (line) {
            var cls = line.cls ? ' class="line-' + line.cls + '"' : '';
            return '<span' + cls + '>' + line.text + '</span>';
        }).join('\n');
        return `
            <h2>${data.title}</h2>
            ${legend}
            <div class="artifacts-tree">
                <pre>${lines}</pre>
            </div>
        `;
    }

    function renderFeatures(data) {
        return `
            <h2>${data.title}</h2>
            <div class="features-list">
                ${data.features.map(f => `
                    <div class="feature-item">
                        <span class="feature-label">${f.label}</span>
                        <span class="feature-dash">—</span>
                        <span class="feature-desc">${f.desc}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderMermaid(data) {
        return `
            <h2>${data.title}</h2>
            <p class="lead">${data.description}</p>
            <div class="workflow-paths">
                ${data.paths.map(p => `
                    <div class="workflow-path path--${p.color}">
                        <span class="path-label">${p.label}</span>
                        <div class="path-steps">
                            ${p.steps.map((step, i) => `
                                <div class="path-step">${step}</div>
                                ${i < p.steps.length - 1 ? '<div class="path-connector"></div>' : ''}
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderWorkflowDiagram(data) {
        return renderMermaid(data);
    }

    function renderAgenda(data) {
        return `
            <h2>${data.title}</h2>
            <div class="two-col">
                ${data.days.map(day => `
                    <div class="col">
                        <div class="day-card">
                            <h3>${day.heading}</h3>
                            <div class="timeline">
                                ${day.items.map(item => `
                                    <div class="timeline-item">
                                        <span class="time">${item.time}</span>
                                        <span class="activity">${item.activity}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderInstall(data) {
        return `
            <h2>${data.title}</h2>
            <div class="install-steps">
                ${data.steps.map((step, i) => `
                    <div class="install-step">
                        <div class="install-num">${i + 1}</div>
                        <div class="install-content">
                            <h3>${step.heading}</h3>
                            <code>${step.code}</code>
                            ${step.note ? `<p class="platform-note">${step.note}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderPlatforms(data) {
        return `
            <h2>${data.title}</h2>
            <p class="lead">${data.lead}</p>
            <div class="platforms-grid">
                ${data.platforms.map(p => `
                    <div class="platform-card">
                        <div class="platform-logo">${p.logo}</div>
                        <h3>${p.name}</h3>
                        <p>${p.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderClosing(data) {
        return `
            <h2>${data.title}</h2>
            <div class="takeaways">
                ${data.takeaways.map(t => `
                    <div class="takeaway">
                        <span class="takeaway-icon">${t.icon}</span>
                        <span>${t.text}</span>
                    </div>
                `).join('')}
            </div>
            <div class="cta"><p>${data.cta}</p></div>
        `;
    }

    // Layout → renderer map
    const renderers = {
        'title': renderTitle,
        'two-col': renderTwoCol,
        'workflow': renderWorkflow,
        'gates': renderGates,
        'project-cards': renderProjectCards,
        'incremental': renderIncremental,
        'modes': renderModes,
        'architecture': renderArchitecture,
        'artifacts': renderArtifacts,
        'features': renderFeatures,
        'mermaid': renderMermaid,
        'workflow-diagram': renderWorkflowDiagram,
        'agenda': renderAgenda,
        'install': renderInstall,
        'platforms': renderPlatforms,
        'closing': renderClosing
    };

    // === Build all slides ===

    function buildSlides() {
        container.innerHTML = slidesData.map(function (data, index) {
            const renderer = renderers[data.layout];
            if (!renderer) {
                console.warn('Unknown layout: ' + data.layout);
                return '';
            }
            const layoutClass = data.layout === 'title' ? ' slide--title' : data.layout === 'closing' ? ' slide--closing' : '';
            const activeClass = index === 0 ? ' active' : '';
            return `<section class="slide${layoutClass}${activeClass}" data-slide="${index}">
                <div class="slide__content">${renderer(data)}</div>
            </section>`;
        }).join('');
    }

    // === Navigation ===

    function buildProgress() {
        progress.innerHTML = '';
        for (var i = 0; i < totalSlides; i++) {
            var dot = document.createElement('span');
            dot.className = 'nav__dot' + (i === 0 ? ' active' : '');
            dot.dataset.index = i;
            (function (idx) {
                dot.addEventListener('click', function () { goToSlide(idx); });
            })(i);
            progress.appendChild(dot);
        }
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;

        var allSlides = container.querySelectorAll('.slide');

        allSlides[currentSlide].classList.remove('active');
        allSlides[currentSlide].classList.remove('prev');

        if (index > currentSlide) {
            allSlides[currentSlide].classList.add('prev');
        }

        currentSlide = index;
        allSlides[currentSlide].classList.add('active');
        allSlides[currentSlide].classList.remove('prev');

        document.querySelectorAll('.nav__dot').forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });

        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;

        // Update slide number
        var slideNumber = document.getElementById('slideNumber');
        if (slideNumber) {
            slideNumber.textContent = (currentSlide + 1) + ' / ' + totalSlides;
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        if (currentSlide > 0) goToSlide(currentSlide - 1);
    }

    // Keyboard
    document.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
                e.preventDefault(); nextSlide(); break;
            case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
                e.preventDefault(); prevSlide(); break;
            case 'Home':
                e.preventDefault(); goToSlide(0); break;
            case 'End':
                e.preventDefault(); goToSlide(totalSlides - 1); break;
        }
    });

    // Buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch/swipe
    var touchStartX = 0;
    var touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function (e) {
        var diffX = touchStartX - e.changedTouches[0].screenX;
        var diffY = touchStartY - e.changedTouches[0].screenY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            diffX > 0 ? nextSlide() : prevSlide();
        }
    });

    // === Init ===
    buildSlides();
    buildProgress();

})();
