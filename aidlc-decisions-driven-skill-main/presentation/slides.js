/**
 * AI-DLC Workshop Presentation — Slide Content
 * Edit this file to change slide content without touching HTML/CSS.
 */

const slides = [
    {
        id: 'title',
        layout: 'title',
        badge: 'Unicorn Gym 2026 — 2-Day Workshop',
        title: 'AI-DLC',
        subtitle: 'AI-Driven Development Life Cycle',
        tagline: 'Build production-ready applications with structured AI assistance',
        meta: ['Greenfield & Brownfield', 'Decision Gates', 'Multi-Platform']
    },
    {
        id: 'problem',
        layout: 'two-col',
        title: 'The Problem',
        columns: [
            {
                heading: '🤖 AI Without Structure',
                items: [
                    'Inconsistent architectures',
                    'Skipped edge cases',
                    'Technology choices that don\'t align',
                    'No audit trail',
                    'Can\'t pause and resume',
                    'Hallucinated patterns'
                ]
            },
            {
                heading: '✅ AI-DLC Solution',
                items: [
                    'Decision gates at every phase',
                    'Conflict validation before generating',
                    'Manifest-based state tracking',
                    'Full audit trail',
                    'Pause, resume, rollback',
                    'Design-driven implementation'
                ]
            }
        ]
    },
    {
        id: 'key-features',
        layout: 'features',
        title: 'Key Features',
        features: [
            { label: 'Decision-driven workflow', desc: '4 decision gates (D1–D4) surface the right questions and validate for conflicts before generating' },
            { label: 'Adaptive complexity', desc: 'Simple features get lightweight output, complex systems get full modular specs with unit decomposition' },
            { label: 'Incremental mode', desc: 'Large systems decompose into units, each designed and implemented independently with curated, unit-scoped artifacts' },
            { label: 'Resume across sessions', desc: 'Workflow state/manifest persisted, pick up where you left off' },
            { label: 'Full traceability', desc: 'Every artifact references its source decisions, audit trail tracks all approvals and changes' },
            { label: 'Steering files', desc: 'Persistent project context (product, tech stack, structure) progressively enriched across phases' }
        ]
    },
    {
        id: 'workflow-overview',
        layout: 'workflow-diagram',
        title: 'Workflow Overview',
        description: 'The workflow adapts to project complexity — simple projects skip decomposition, complex ones break into units.',
        paths: [
            {
                label: 'Simple',
                color: 'secondary',
                steps: ['Context', 'Requirements', 'Design', 'Tasks', 'Implement', 'Code Review']
            },
            {
                label: 'Complex',
                color: 'primary',
                steps: ['Context', 'Requirements', 'Decomposition', 'Foundation', 'Unit × N', 'Review']
            },
            {
                label: 'Prototype',
                color: 'muted',
                steps: ['Requirements', 'Prototype', 'Refine', '→ continue']
            }
        ]
    },

    {
        id: 'decision-gates',
        layout: 'gates',
        title: 'Decision Gates',
        lead: 'Structured questions that surface the right decisions at the right time.',
        gates: [
            { id: 'D1', phase: 'Requirements', covers: 'Scope, users, features, integrations, constraints' },
            { id: 'D2', phase: 'Decomposition', covers: 'Architecture, strategy, unit proposals, dependencies' },
            { id: 'DF', phase: 'Foundation', covers: 'Repo strategy, auth, comms, DB, shared types' },
            { id: 'D3', phase: 'Design', covers: 'Stack, frameworks, data layer, testing, infra' },
            { id: 'D4', phase: 'Tasks', covers: 'Breakdown strategy, TDD/test-after, priorities' }
        ],
        flow: ['Generate Questions', 'Fill Answers', 'Validate Conflicts', 'Resolve', 'Generate Artifacts']
    },
    {
        id: 'greenfield-brownfield',
        layout: 'project-cards',
        title: 'Greenfield vs Brownfield',
        cards: [
            {
                type: 'greenfield',
                icon: '🌱',
                heading: 'Greenfield',
                subtitle: 'New project from scratch',
                flow: 'Context → Requirements → Decomposition → Foundation → Design → Tasks → Implement',
                items: [
                    'Full workflow with foundation',
                    'Define conventions from scratch',
                    'Technology decisions via D3 gate',
                    'Infrastructure units generated'
                ]
            },
            {
                type: 'brownfield',
                icon: '🏗️',
                heading: 'Brownfield',
                subtitle: 'Existing codebase',
                flow: 'Context → Requirements → Design → Tasks → Implement',
                items: [
                    'Skip foundation (conventions exist)',
                    'Auto-detects stack & patterns',
                    'Respects existing architecture',
                    'Reverse-engineer skill available'
                ]
            }
        ]
    },
    {
        id: 'incremental',
        layout: 'incremental',
        title: 'Complex Projects — Incremental Delivery',
        lead: 'For projects with 5+ stories, 2+ domains — decompose into units.',
        sharedPhases: ['Context ✅', 'Requirements ✅', 'Decomposition ✅', 'Foundation ✅'],
        units: [
            { name: 'Unit: Auth', phases: [
                { label: 'Design ✅', status: 'done' },
                { label: 'Tasks ✅', status: 'done' },
                { label: 'Implement 🔄', status: 'active' }
            ]},
            { name: 'Unit: Payments', phases: [
                { label: 'Design ✅', status: 'done' },
                { label: 'Tasks 🔄', status: 'active' },
                { label: 'Implement', status: 'pending' }
            ]},
            { name: 'Unit: Notifications', phases: [
                { label: 'Design', status: 'pending' },
                { label: 'Tasks', status: 'pending' },
                { label: 'Implement', status: 'pending' }
            ]}
        ],
        note: 'Units can be worked on in parallel by different team members or sessions.'
    },
    {
        id: 'impl-modes',
        layout: 'modes',
        title: 'Implementation Modes',
        modes: [
            {
                icon: '🎯',
                name: 'Standard',
                desc: 'One task at a time. Review after each.',
                best: 'Best for: learning, tight control',
                platform: 'All platforms'
            },
            {
                icon: '⚡',
                name: 'Parallel',
                desc: 'Wave-based sub-agents with file ownership isolation.',
                best: 'Best for: speed with review',
                platform: 'Kiro, Claude Code'
            },
            {
                icon: '🚀',
                name: 'Autonomous',
                desc: 'All waves, no stops. Summary at end.',
                best: 'Best for: trusted specs',
                platform: 'Kiro, Claude Code'
            }
        ]
    },
    {
        id: 'architecture',
        layout: 'architecture',
        title: 'Skill Architecture',
        orchestrator: { name: 'aidlc', desc: 'Workflow orchestrator — dispatches, status, rollback' },
        legend: [
            { cls: 'orchestrator', label: 'Orchestrator' },
            { cls: 'skill', label: 'Core workflow (in order)' },
            { cls: 'supporting', label: 'Supporting (on demand)' }
        ],
        coreSkills: [
            { name: 'context', desc: 'Scan workspace, detect stack' },
            { name: 'requirements', desc: 'User stories + EARS criteria' },
            { name: 'decomposition', desc: 'Break into units (DDD)' },
            { name: 'foundation', desc: 'Shared conventions' },
            { name: 'design', desc: 'Architecture + tech decisions' },
            { name: 'tasks', desc: 'Sequenced execution waves' },
            { name: 'implement', desc: 'Code generation + tests' }
        ],
        supportingSkills: [
            { name: 'prototype', desc: 'Throwaway spike' },
            { name: 'reverse-engineer', desc: 'Deep codebase analysis' },
            { name: 'solutions-review', desc: 'Cross-unit design review' },
            { name: 'code-review', desc: 'Code quality review' }
        ],
        anatomy: [
            'aidlc-{name}/',
            '├── SKILL.md          ← Process instructions',
            '├── assets/           ← Output templates',
            '└── references/       ← Conditional guides'
        ]
    },
    {
        id: 'artifacts',
        layout: 'artifacts',
        title: 'What Gets Generated',
        legend: [
            { cls: 'review', label: 'Review & approve' },
            { cls: 'decision', label: 'Your decisions' }
        ],
        lines: [
            { text: '.aidlc/', cls: '' },
            { text: '├── specs/{feature}/', cls: '' },
            { text: '│   ├── context.md            ← project landscape', cls: 'review' },
            { text: '│   ├── requirements.md       ← user stories + EARS', cls: 'review' },
            { text: '│   ├── personas.md           ← user personas', cls: 'review' },
            { text: '│   ├── units.md              ← decomposition', cls: 'review' },
            { text: '│   ├── foundation.md         ← shared conventions', cls: 'review' },
            { text: '│   ├── design/', cls: '' },
            { text: '│   │   ├── components.md     ← component specs', cls: 'review' },
            { text: '│   │   ├── data-model.md     ← entities & schemas', cls: 'review' },
            { text: '│   │   ├── api-spec.md       ← endpoints', cls: 'review' },
            { text: '│   │   └── implementation.md ← directory structure', cls: 'review' },
            { text: '│   └── tasks.md              ← sequenced tasks', cls: 'review' },
            { text: '├── workflow/{feature}/', cls: '' },
            { text: '│   ├── aidlc-manifest.yaml   ← workflow state', cls: '' },
            { text: '│   ├── audit.md              ← action log', cls: '' },
            { text: '│   └── decisions-*.md        ← gate answers', cls: 'decision' },
            { text: '└── {platform}/steering/', cls: '' },
            { text: '    ├── product.md            ← persistent context', cls: '' },
            { text: '    ├── tech.md', cls: '' },
            { text: '    └── structure.md', cls: '' }
        ]
    },
    {
        id: 'artifacts-incremental',
        layout: 'artifacts',
        title: 'Incremental Mode — Per-Unit Artifacts',
        legend: [
            { cls: 'shared', label: 'Shared (project-wide)' },
            { cls: 'unit', label: 'Unit-scoped (independent)' }
        ],
        lines: [
            { text: '.aidlc/specs/{feature}/', cls: '' },
            { text: '├── context.md                    ← shared', cls: 'shared' },
            { text: '├── requirements.md               ← shared', cls: 'shared' },
            { text: '├── units.md                      ← shared', cls: 'shared' },
            { text: '├── foundation.md                 ← shared', cls: 'shared' },
            { text: '│', cls: '' },
            { text: '├── units/auth/                   ← unit: auth', cls: '' },
            { text: '│   ├── design/', cls: 'unit' },
            { text: '│   │   ├── components.md', cls: 'unit' },
            { text: '│   │   ├── data-model.md', cls: 'unit' },
            { text: '│   │   └── api-spec.md', cls: 'unit' },
            { text: '│   └── tasks.md', cls: 'unit' },
            { text: '│', cls: '' },
            { text: '├── units/payments/               ← unit: payments', cls: '' },
            { text: '│   ├── design/', cls: 'unit' },
            { text: '│   │   ├── components.md', cls: 'unit' },
            { text: '│   │   ├── data-model.md', cls: 'unit' },
            { text: '│   │   └── api-spec.md', cls: 'unit' },
            { text: '│   └── tasks.md', cls: 'unit' },
            { text: '│', cls: '' },
            { text: '└── units/notifications/          ← unit: notifications', cls: '' },
            { text: '    ├── design/', cls: 'unit' },
            { text: '    │   └── ...', cls: 'unit' },
            { text: '    └── tasks.md', cls: 'unit' }
        ]
    },

    {
        id: 'getting-started',
        layout: 'install',
        title: 'Getting Started',
        steps: [
            {
                heading: 'Clone the skills repo',
                code: 'git clone <repo-url> aidlc-skills'
            },
            {
                heading: 'Copy skills to your project',
                code: 'cp -r skills/aidlc* your-project/{platform}/skills/',
                note: '.kiro/skills/ · .claude/skills/ · .cursor/skills/ · .windsurf/skills/'
            },
            {
                heading: 'Start building',
                code: '/aidlc build a fitness app with user auth, scheduling, and payments'
            }
        ]
    },
    {
        id: 'platforms',
        layout: 'platforms',
        title: 'Multi-Platform Support',
        lead: 'Same skills, same workflow — adapts to your tool.',
        platforms: [
            { logo: 'K', name: 'Kiro', desc: 'Full support including Powers, Autopilot, and parallel mode' },
            { logo: 'C', name: 'Claude Code', desc: 'Full support with sub-agents and parallel mode' },
            { logo: 'Cu', name: 'Cursor', desc: 'Standard mode — sequential reads, no sub-agents' },
            { logo: 'W', name: 'Windsurf', desc: 'Standard mode — sequential reads, no sub-agents' }
        ]
    },
    {
        id: 'takeaways',
        layout: 'closing',
        title: 'Key Takeaways',
        takeaways: [
            { icon: '🎯', text: 'Decision gates keep you in control — AI executes, you decide' },
            { icon: '📋', text: 'Full specification before code — no more ad-hoc AI generation' },
            { icon: '🔄', text: 'Pause, resume, rollback — manifest tracks everything' },
            { icon: '⚡', text: 'Scales from simple features to complex multi-unit projects' },
            { icon: '🌐', text: 'Works with Kiro, Claude Code, Cursor, and Windsurf' }
        ],
        cta: 'Let\'s build something together.'
    }
];

// Export for use by presentation.js
window.SLIDES = slides;
