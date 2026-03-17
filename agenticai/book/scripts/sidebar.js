/**
 * Agentic AI: Build, Ship, Portfolio — Sidebar Navigation
 * Dynamically injects the full sidebar TOC with sub-topics on every page.
 * Mirrors the AIEA htmlbook sidebar pattern.
 */
(function () {
  'use strict';

  // ── Chapter definitions with sections ──
  const TOC = [
    {
      part: 'Part 1 — Foundations',
      chapters: [
        {
          num: '01', title: 'What Is Agentic AI?',
          href: 'part-01-foundations/ch01-what-is-agentic-ai.html',
          sections: [
            'The Chatbot That Couldn\'t Act',
            'Defining Agency',
            'The Autonomy Spectrum',
            'Why Now? The LLM Inflection Point',
            'Agentic vs. Non-Agentic',
            'The Anatomy of an Agent',
            'Real-World Agentic Systems',
            'The Agency Tax'
          ]
        },
        {
          num: '02', title: 'LLM Primitives',
          href: 'part-01-foundations/ch02-llm-primitives.html',
          sections: [
            'Tokens and Tokenization',
            'The Completion API',
            'System, User, and Assistant Messages',
            'Temperature, Top-p, and Sampling',
            'Streaming',
            'Tool and Function Calls',
            'Structured Outputs',
            'Rate Limits and Error Handling',
            'Cost Optimization'
          ]
        },
        {
          num: '03', title: 'Agent Anatomy',
          href: 'part-01-foundations/ch03-agent-anatomy.html',
          sections: [
            'The Failure That Teaches',
            'The Four Pillars',
            'How the Pillars Interact',
            'The LLM as the Reasoning Core',
            'The Tool Belt Concept',
            'Memory Stores in Depth',
            'Planning Strategies',
            'The Agent Loop in Code',
            'Structural Failure Modes'
          ]
        },
        {
          num: '04', title: 'Your First Agent',
          href: 'part-01-foundations/ch04-first-agent.html',
          sections: [
            'The Failure That Teaches Everything',
            'ReAct: Reasoning + Acting',
            'The Observe-Think-Act Loop',
            'Building a ReAct Agent from Scratch',
            'Stopping Conditions',
            'Error Recovery',
            'Why Build Without Frameworks First',
            'Making It Configurable'
          ]
        }
      ]
    },
    {
      part: 'Part 2 — Core Patterns',
      chapters: [
        {
          num: '05', title: 'Reasoning Patterns',
          href: 'part-02-core-patterns/ch05-reasoning-patterns.html',
          sections: [
            'When Direct Prompting Breaks',
            'Chain-of-Thought Prompting',
            'Tree-of-Thought Reasoning',
            'Self-Consistency',
            'Reflection and Self-Critique',
            'Reasoning Improves Tool Selection',
            'Choosing a Reasoning Strategy'
          ]
        },
        {
          num: '06', title: 'Tool Use',
          href: 'part-02-core-patterns/ch06-tool-use.html',
          sections: [
            'The Hallucination Problem',
            'The Function Calling Protocol',
            'Tool Definitions: JSON Schema',
            'Tool Registry Architecture',
            'The Dispatcher',
            'Result Parsing',
            'Dynamic Tool Selection',
            'Tool Composition',
            'Error Handling Patterns',
            'Security Considerations'
          ]
        },
        {
          num: '07', title: 'Memory',
          href: 'part-02-core-patterns/ch07-memory.html',
          sections: [
            'The Forgetting Problem',
            'Short-Term Memory: Buffers',
            'Summary Memory',
            'Long-Term Memory: Vector Stores',
            'Episodic Memory',
            'Semantic Memory',
            'Memory Retrieval Strategies',
            'Choosing the Right Memory Type',
            'Integration Patterns'
          ]
        },
        {
          num: '08', title: 'RAG Pipelines',
          href: 'part-02-core-patterns/ch08-rag-pipelines.html',
          sections: [
            'Why RAG',
            'Document Loading',
            'Chunking Strategies',
            'Embedding Models',
            'Vector Databases',
            'Retrieval Strategies',
            'Re-ranking',
            'Augmented Generation',
            'Advanced Patterns',
            'Evaluation',
            'Common Failure Modes'
          ]
        }
      ]
    },
    {
      part: 'Part 3 — Multi-Agent',
      chapters: [
        {
          num: '09', title: 'Orchestration',
          href: 'part-03-multi-agent/ch09-orchestration.html',
          sections: [
            'Ad-Hoc Chaining Problems',
            'State Machines for Agents',
            'Graph-Based Workflows',
            'LangGraph Concepts',
            'Routing Patterns',
            'Interrupts and HITL',
            'Checkpointing',
            'Error Handling in Graphs'
          ]
        },
        {
          num: '10', title: 'Supervisor-Worker',
          href: 'part-03-multi-agent/ch10-supervisor-worker.html',
          sections: [
            'The Case for Hierarchy',
            'Architecture Overview',
            'Designing the Supervisor',
            'Building Worker Agents',
            'Task Decomposition',
            'Parallel Execution',
            'Result Aggregation',
            'Error Handling'
          ]
        },
        {
          num: '11', title: 'Human-in-the-Loop',
          href: 'part-03-multi-agent/ch11-human-in-the-loop.html',
          sections: [
            'The Case for Human Oversight',
            'Interrupt Points',
            'Approval Gates',
            'Confidence Thresholds',
            'Escalation Patterns',
            'UX for Human Review',
            'Resuming After Interruption',
            'LangGraph interrupt()'
          ]
        },
        {
          num: '12', title: 'Agent Communication',
          href: 'part-03-multi-agent/ch12-agent-communication.html',
          sections: [
            'Why Communication Is Hard',
            'Message Passing Patterns',
            'Shared State',
            'Structured Message Formats',
            'Agent Protocols',
            'Conversation Management',
            'Conflict Resolution'
          ]
        }
      ]
    },
    {
      part: 'Part 4 — Production',
      chapters: [
        {
          num: '13', title: 'Observability',
          href: 'part-04-production/ch13-observability.html',
          sections: [
            'Why Agents Need Observability',
            'Traces and Spans',
            'Structured Logging',
            'Metrics That Matter',
            'Instrumenting an Agent',
            'The Observability Stack',
            'Debugging Agent Behavior',
            'Building Dashboards',
            'LangSmith and Langfuse'
          ]
        },
        {
          num: '14', title: 'Security',
          href: 'part-04-production/ch14-security.html',
          sections: [
            'The Agentic Attack Surface',
            'Prompt Injection',
            'Data Exfiltration',
            'Input Validation',
            'Output Filtering',
            'Tool Sandboxing',
            'Secrets Management',
            'Audit Logging',
            'Defense-in-Depth'
          ]
        },
        {
          num: '15', title: 'Deployment',
          href: 'part-04-production/ch15-deployment.html',
          sections: [
            'Why Deployment Is Different',
            'Containerization',
            'CI/CD Pipelines',
            'Environment Management',
            'Scaling Strategies',
            'Load Balancing & Health Checks',
            'Graceful Degradation',
            'Cost Management',
            'Monitoring in Production',
            'Deployment Topology'
          ]
        }
      ]
    },
    {
      part: 'Part 5 — Capstones',
      chapters: [
        { num: 'C1', title: 'Research Assistant', href: 'part-05-capstones/capstone-01.html', sections: [] },
        { num: 'C2', title: 'Code Review Agent', href: 'part-05-capstones/capstone-02.html', sections: [] },
        { num: 'C3', title: 'Customer Support', href: 'part-05-capstones/capstone-03.html', sections: [] },
        { num: 'C4', title: 'Data Pipeline', href: 'part-05-capstones/capstone-04.html', sections: [] }
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
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // ── Build sidebar HTML ──
  function buildSidebar() {
    var base = getBasePath();
    var current = getCurrentHref();
    var html = '';

    html += '<div class="sidebar-header">';
    html += '<a href="' + base + 'index.html" class="sidebar-title">Agentic AI</a>';
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
          var chFile = ch.href.split('/').pop();
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
