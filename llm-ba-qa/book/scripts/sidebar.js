/**
 * LLMs for Business & Quality Analysts — Sidebar Navigation
 * Dynamically injects the full sidebar TOC with sub-topics on every page.
 * Mirrors the Agentic AI htmlbook sidebar pattern.
 */
(function () {
  'use strict';

  // ── Chapter definitions with sections ──
  const TOC = [
    {
      part: 'Part 1 — Foundations',
      chapters: [
        {
          num: '01', title: 'Why LLMs Matter for BAs and QAs',
          href: 'part-01-foundations/ch01-why-llms-matter.html',
          sections: [
            'The Analyst\'s New Superpower',
            'What LLMs Actually Do',
            'From Manual to Augmented',
            'The BA-QA Advantage',
            'Where LLMs Fit in the SDLC',
            'Common Misconceptions',
            'The Cost of Not Adopting'
          ]
        },
        {
          num: '02', title: 'How LLMs Work (No PhD Required)',
          href: 'part-01-foundations/ch02-how-llms-work.html',
          sections: [
            'Tokens and Language',
            'The Transformer Architecture',
            'Pre-Training and Fine-Tuning',
            'Context Windows Explained',
            'Temperature and Creativity',
            'Model Selection for Analysts',
            'Limitations You Must Know'
          ]
        },
        {
          num: '03', title: 'Prompt Engineering Fundamentals',
          href: 'part-01-foundations/ch03-prompt-engineering.html',
          sections: [
            'The Anatomy of a Good Prompt',
            'Zero-Shot vs Few-Shot',
            'Role-Based Prompting',
            'Chain-of-Thought for Analysis',
            'Output Formatting Techniques',
            'Prompt Templates and Libraries',
            'Common Prompt Pitfalls'
          ]
        },
        {
          num: '04', title: 'Your First LLM-Powered Workflow',
          href: 'part-01-foundations/ch04-first-llm-workflow.html',
          sections: [
            'Setting Up Your Environment',
            'API Keys and Authentication',
            'Making Your First API Call',
            'Building a Simple Analyzer',
            'Handling Responses and Errors',
            'From Script to Reusable Tool',
            'Measuring Quality and Cost'
          ]
        }
      ]
    },
    {
      part: 'Part 2 — Business Analysis',
      chapters: [
        {
          num: '05', title: 'Requirements Elicitation and Analysis',
          href: 'part-02-business-analysis/ch05-requirements-elicitation.html',
          sections: [
            'The Requirements Challenge',
            'Extracting Requirements from Documents',
            'Ambiguity Detection and Resolution',
            'Requirements Classification',
            'Traceability Matrix Generation',
            'Gap Analysis Automation',
            'Stakeholder Review Workflows'
          ]
        },
        {
          num: '06', title: 'User Story Generation and Refinement',
          href: 'part-02-business-analysis/ch06-user-story-generation.html',
          sections: [
            'From Requirements to Stories',
            'Generating User Stories with LLMs',
            'Acceptance Criteria Automation',
            'Story Splitting Strategies',
            'INVEST Criteria Validation',
            'Story Mapping with AI',
            'Backlog Grooming Assistant'
          ]
        },
        {
          num: '07', title: 'Process Modeling and Optimization',
          href: 'part-02-business-analysis/ch07-process-modeling.html',
          sections: [
            'Understanding Business Processes',
            'Process Discovery from Documents',
            'BPMN Generation with LLMs',
            'Bottleneck Identification',
            'Process Optimization Suggestions',
            'As-Is to To-Be Mapping',
            'Change Impact Analysis'
          ]
        },
        {
          num: '08', title: 'Stakeholder Communication and Reporting',
          href: 'part-02-business-analysis/ch08-stakeholder-communication.html',
          sections: [
            'The Communication Challenge',
            'Executive Summary Generation',
            'Technical-to-Business Translation',
            'Status Report Automation',
            'Meeting Notes and Action Items',
            'Presentation Deck Drafting',
            'Multi-Audience Adaptation'
          ]
        }
      ]
    },
    {
      part: 'Part 3 — Quality Assurance',
      chapters: [
        {
          num: '09', title: 'Test Case Generation',
          href: 'part-03-quality-assurance/ch09-test-case-generation.html',
          sections: [
            'The Testing Bottleneck',
            'Generating Tests from Requirements',
            'Boundary Value Analysis with LLMs',
            'Equivalence Partitioning Automation',
            'Negative Test Case Generation',
            'Test Case Prioritization',
            'Coverage Analysis'
          ]
        },
        {
          num: '10', title: 'Test Data and Scenario Design',
          href: 'part-03-quality-assurance/ch10-test-data-design.html',
          sections: [
            'The Test Data Challenge',
            'Synthetic Data Generation',
            'Edge Case Discovery',
            'Persona-Based Test Scenarios',
            'Data Privacy and Masking',
            'Cross-System Test Data',
            'Data Validation Rules'
          ]
        },
        {
          num: '11', title: 'Defect Analysis and Triage',
          href: 'part-03-quality-assurance/ch11-defect-analysis.html',
          sections: [
            'The Defect Flood',
            'Automated Defect Classification',
            'Root Cause Analysis with LLMs',
            'Duplicate Detection',
            'Severity and Priority Scoring',
            'Defect Pattern Recognition',
            'Regression Risk Assessment'
          ]
        },
        {
          num: '12', title: 'Regression Testing and Automation',
          href: 'part-03-quality-assurance/ch12-regression-testing.html',
          sections: [
            'The Regression Burden',
            'Test Script Generation',
            'Self-Healing Test Selectors',
            'Visual Regression with LLMs',
            'API Test Automation',
            'Performance Test Scenarios',
            'Test Maintenance Strategies'
          ]
        }
      ]
    },
    {
      part: 'Part 4 — Advanced Patterns',
      chapters: [
        {
          num: '13', title: 'RAG for Enterprise Knowledge',
          href: 'part-04-advanced-patterns/ch13-rag-enterprise.html',
          sections: [
            'Why RAG Matters for Analysts',
            'Building a Knowledge Base',
            'Document Chunking Strategies',
            'Embedding and Retrieval',
            'Query Enhancement Techniques',
            'Evaluating RAG Quality',
            'Enterprise RAG Architecture'
          ]
        },
        {
          num: '14', title: 'Building Custom AI Assistants',
          href: 'part-04-advanced-patterns/ch14-custom-assistants.html',
          sections: [
            'Beyond One-Off Prompts',
            'Designing Assistant Workflows',
            'Multi-Step Reasoning Chains',
            'Tool Integration Patterns',
            'Memory and Context Management',
            'User Experience Design',
            'Deployment and Monitoring'
          ]
        },
        {
          num: '15', title: 'Evaluating and Validating LLM Outputs',
          href: 'part-04-advanced-patterns/ch15-evaluating-outputs.html',
          sections: [
            'The Validation Imperative',
            'Accuracy Metrics for Text',
            'Hallucination Detection',
            'Consistency Checking',
            'Human-in-the-Loop Validation',
            'A/B Testing LLM Workflows',
            'Building Trust with Stakeholders'
          ]
        }
      ]
    },
    {
      part: 'Part 5 — Capstones',
      chapters: [
        { num: 'C1', title: 'Requirements-to-Test-Cases Pipeline', href: 'part-05-capstones/capstone-01.html', sections: [] },
        { num: 'C2', title: 'Automated BRD Analyzer', href: 'part-05-capstones/capstone-02.html', sections: [] },
        { num: 'C3', title: 'Intelligent Test Suite Generator', href: 'part-05-capstones/capstone-03.html', sections: [] },
        { num: 'C4', title: 'AI-Powered Sprint Assistant', href: 'part-05-capstones/capstone-04.html', sections: [] }
      ]
    }
  ];

  // ── Resolve base path (works from any depth) ──
  function getBasePath() {
    var path = window.location.pathname;
    if (path.includes('/part-01-') || path.includes('/part-02-') ||
        path.includes('/part-03-') || path.includes('/part-04-') ||
        path.includes('/part-05-')) {
      return '../';
    }
    return '';
  }

  // ── Determine current page ──
  function getCurrentHref() {
    var path = window.location.pathname;
    for (var i = 0; i < TOC.length; i++) {
      for (var j = 0; j < TOC[i].chapters.length; j++) {
        var ch = TOC[i].chapters[j];
        if (path.endsWith(ch.href) || path.endsWith(ch.href.split('/').pop())) {
          return ch.href;
        }
      }
    }
    return '';
  }

  // ── Slugify a section title for anchor links ──
  function slugify(text) {
    return text.replace(/'/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // ── Build sidebar HTML ──
  function buildSidebar() {
    var base = getBasePath();
    var current = getCurrentHref();
    var html = '';

    html += '<div class="sidebar-home"><a href="https://careeralign.com/">&#127919; CareerAlign Home</a></div>';
    html += '<div class="sidebar-header">';
    html += '<a href="' + base + 'index.html" class="sidebar-title">LLMs for BA &amp; QA</a>';
    html += '</div>';
    html += '<div class="sidebar-body">';

    for (var i = 0; i < TOC.length; i++) {
      var part = TOC[i];
      html += '<div class="sidebar-part">' + part.part + '</div>';

      for (var j = 0; j < part.chapters.length; j++) {
        var ch = part.chapters[j];
        var isActive = (ch.href === current);
        var cls = 'sidebar-chapter' + (isActive ? ' active' : '');

        html += '<div class="' + cls + '">';
        html += '<a class="chapter-link" href="' + base + ch.href + '">';
        html += '<span class="chapter-num">' + ch.num + '</span> ' + ch.title;
        html += '</a>';

        if (ch.sections.length > 0) {
          html += '<ul class="sidebar-sections">';
          for (var k = 0; k < ch.sections.length; k++) {
            var anchor = slugify(ch.sections[k]);
            html += '<li><a href="' + base + ch.href + '#' + anchor + '">' + ch.sections[k] + '</a></li>';
          }
          html += '</ul>';
        }
        html += '</div>';
      }
    }

    html += '</div>';
    return html;
  }

  // ── Inject sidebar into page ──
  function injectSidebar() {
    // Remove existing book-nav if present (old style)
    var oldNav = document.querySelector('.book-nav');
    if (oldNav) oldNav.style.display = 'none';

    // Check if sidebar already exists
    if (document.querySelector('.sidebar')) return;

    // Create sidebar
    var sidebar = document.createElement('nav');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';
    sidebar.innerHTML = buildSidebar();
    document.body.insertBefore(sidebar, document.body.firstChild);

    // Create mobile menu button
    var btn = document.createElement('button');
    btn.className = 'mobile-menu-btn';
    btn.innerHTML = '&#9776;';
    btn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
    document.body.insertBefore(btn, sidebar.nextSibling);

    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
    document.body.insertBefore(overlay, btn.nextSibling);

    // Adjust main content to have sidebar margin
    var main = document.querySelector('.main-content') || document.querySelector('.chapter');
    if (main) {
      main.style.marginLeft = 'var(--sidebar-width)';
    }

    // Adjust footer
    var footer = document.querySelector('.chapter-footer');
    if (footer) {
      footer.style.marginLeft = 'var(--sidebar-width)';
      footer.style.maxWidth = 'var(--content-max)';
    }

    // Toggle expand/collapse on chapter links with subsections
    sidebar.querySelectorAll('.sidebar-chapter').forEach(function (ch) {
      var link = ch.querySelector('.chapter-link');
      var secs = ch.querySelector('.sidebar-sections');
      if (secs && link) {
        link.addEventListener('click', function (e) {
          // If not the active chapter, navigate normally
          if (!ch.classList.contains('active')) return;
          // If active, toggle sections
          ch.classList.toggle('expanded');
        });
      }
    });

    // Auto-expand active chapter
    var activeCh = sidebar.querySelector('.sidebar-chapter.active');
    if (activeCh) {
      activeCh.classList.add('expanded');
      // Scroll active chapter into view in sidebar
      setTimeout(function () {
        activeCh.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 100);
    }
  }

  // ── Add IDs to h2 elements for anchor links ──
  function addHeadingIds() {
    document.querySelectorAll('h2').forEach(function (h2) {
      if (!h2.id) {
        var text = h2.textContent.replace(/^\d+\.\d+\s*/, ''); // strip "1.1 " prefix
        h2.id = slugify(text);
      }
    });
  }

  // ── Highlight current section in sidebar on scroll ──
  function setupScrollSpy() {
    var sections = [];
    document.querySelectorAll('h2[id]').forEach(function (h2) {
      sections.push({ id: h2.id, top: h2.offsetTop });
    });

    if (sections.length === 0) return;

    var sidebarLinks = document.querySelectorAll('.sidebar-sections a');
    var linkMap = {};
    sidebarLinks.forEach(function (a) {
      var hash = a.href.split('#')[1];
      if (hash) linkMap[hash] = a;
    });

    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 120;
      var currentId = sections[0].id;
      for (var i = 0; i < sections.length; i++) {
        if (scrollPos >= sections[i].top) {
          currentId = sections[i].id;
        }
      }
      sidebarLinks.forEach(function (a) { a.classList.remove('current'); });
      if (linkMap[currentId]) {
        linkMap[currentId].classList.add('current');
      }
    });
  }

  // ── Initialize ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      addHeadingIds();
      injectSidebar();
      setupScrollSpy();
    });
  } else {
    addHeadingIds();
    injectSidebar();
    setupScrollSpy();
  }
})();
