/**
 * LLMs for Business & Quality Analysts — Insight Panel
 * Dynamically injects "Why This Matters to You" right panel with contextual
 * summaries and "Things You Must Know" for each section, like the AIEA book.
 */
(function () {
  'use strict';

  // ── Insight data per chapter ──
  // Keys are chapter file names, values are arrays of section insights.
  var INSIGHTS = {
    'ch01-why-llms-matter.html': [
      {
        section: 'the-analysts-new-superpower',
        label: 'The Analyst\'s New Superpower',
        text: 'LLMs are not replacing analysts — they are giving you capabilities that were previously impossible for a single person. The analysts who learn to wield these tools will handle workloads that used to require entire teams, while producing higher-quality deliverables. This is not hype; organizations are already restructuring around AI-augmented analysts.',
        mustknow: [
          'LLMs augment analyst judgment — they do not replace domain expertise.',
          'Early adopters are already delivering 3-5x more output per sprint.',
          'The skill gap between AI-literate and traditional analysts is widening fast.',
          'Your existing analytical skills become more valuable, not less, with LLM augmentation.'
        ]
      },
      {
        section: 'what-llms-actually-do',
        label: 'What LLMs Actually Do',
        text: 'Before you can use LLMs effectively, you need an accurate mental model of what they are. They are not databases, not search engines, and not reasoning machines. They are statistical pattern matchers trained on vast text corpora that generate plausible continuations. Understanding this distinction prevents you from trusting them with tasks they cannot reliably perform.',
        mustknow: [
          'LLMs predict the next most likely token — they do not "understand" content.',
          'They excel at pattern recognition, summarization, and text transformation.',
          'They are unreliable for factual recall, math, and logical reasoning without scaffolding.',
          'Knowing what LLMs cannot do is as important as knowing what they can.'
        ]
      },
      {
        section: 'from-manual-to-augmented',
        label: 'From Manual to Augmented',
        text: 'Every analyst has tasks that eat hours but add little intellectual value — reformatting documents, writing boilerplate, cross-referencing tables, checking consistency. These are exactly the tasks LLMs handle well. The shift from manual to augmented workflows does not mean less thinking; it means spending your thinking time on problems that actually matter.',
        mustknow: [
          'Identify your highest-volume, lowest-judgment tasks first — those are your quick wins.',
          'Augmented workflows still require human review and sign-off.',
          'Start with one workflow end-to-end before trying to automate everything.',
          'Track time savings quantitatively to build the business case for expansion.'
        ]
      },
      {
        section: 'the-ba-qa-advantage',
        label: 'The BA/QA Advantage',
        text: 'Business Analysts and Quality Analysts have a unique advantage over developers in the LLM era. Your work is fundamentally about language — requirements, test cases, acceptance criteria, stakeholder communication. LLMs are language machines. The alignment between your daily tasks and LLM capabilities is stronger than for almost any other role in software delivery.',
        mustknow: [
          'BA/QA work is 80% text-based — perfectly aligned with LLM strengths.',
          'Your domain knowledge gives you the context LLMs need to produce useful output.',
          'You already think in structured formats (user stories, test cases) that LLMs handle well.',
          'The analyst who prompts well produces better results than the developer who prompts poorly.'
        ]
      },
      {
        section: 'where-llms-fit-in-the-sdlc',
        label: 'Where LLMs Fit in the SDLC',
        text: 'LLMs are not a single-purpose tool — they add value at every phase of the software development lifecycle. From requirements elicitation through regression testing, there are concrete applications waiting to be built. Understanding the full map of opportunities helps you prioritize which workflows to augment first based on your team\'s pain points.',
        mustknow: [
          'Requirements phase: extraction, classification, ambiguity detection, gap analysis.',
          'Design phase: process modeling, impact analysis, stakeholder communication.',
          'Testing phase: test case generation, test data design, defect analysis.',
          'Maintenance phase: regression testing, documentation updates, knowledge transfer.'
        ]
      },
      {
        section: 'common-misconceptions',
        label: 'Common Misconceptions',
        text: 'Misconceptions about LLMs lead to two equally damaging outcomes: dismissing them as toys and missing real value, or trusting them blindly and shipping flawed deliverables. This section addresses both failure modes. The analysts who succeed are the ones who calibrate their expectations accurately — neither overhyped nor dismissive.',
        mustknow: [
          'LLMs are not deterministic — the same prompt can produce different outputs.',
          'They do not replace the need for requirements validation with stakeholders.',
          'Bigger models are not always better — cost, latency, and task fit all matter.',
          'LLM-generated content always requires human review before it reaches stakeholders.'
        ]
      },
      {
        section: 'the-cost-of-not-adopting',
        label: 'The Cost of Not Adopting',
        text: 'This is not a theoretical future — teams using LLM-augmented workflows are already outperforming those that do not. The cost of inaction is not standing still; it is falling behind. As organizations adopt AI-augmented analysis, the baseline expectation for analyst output volume and quality will rise. Waiting is a strategy, but it is an expensive one.',
        mustknow: [
          'Competitors and adjacent teams are already adopting — the window of advantage is closing.',
          'Manual-only analysts will increasingly be assigned lower-value work.',
          'The learning curve is real but manageable — weeks, not years.',
          'Starting now, even imperfectly, builds compound skills that pay off over time.'
        ]
      }
    ],

    'ch02-how-llms-work.html': [
      {
        section: 'tokens-and-language',
        label: 'Tokens and Language',
        text: 'Tokens are the atomic unit of LLM processing, and understanding them changes how you write prompts. A token is roughly four characters or three-quarters of a word. This matters because you pay per token, context windows are measured in tokens, and some formatting choices consume tokens without adding value. Token-awareness makes you a more efficient and cost-effective LLM user.',
        mustknow: [
          'One token is approximately 4 characters or 0.75 words in English.',
          'You pay for both input tokens (your prompt) and output tokens (the response).',
          'Verbose prompts cost more but are not always more effective.',
          'Special characters, code, and non-English text often consume more tokens per word.'
        ]
      },
      {
        section: 'the-transformer-architecture',
        label: 'The Transformer Architecture',
        text: 'You do not need to understand every mathematical detail of transformers, but grasping the core concept — attention — will make you a better prompt engineer. Attention allows the model to weigh which parts of the input are most relevant to generating each output token. This explains why well-structured prompts with clear context outperform rambling ones.',
        mustknow: [
          'The attention mechanism lets models focus on relevant parts of the input.',
          'This is why putting important instructions at the start or end of prompts works better.',
          'Transformers process all tokens simultaneously, not sequentially.',
          'Understanding attention explains why prompt structure matters as much as content.'
        ]
      },
      {
        section: 'pre-training-and-fine-tuning',
        label: 'Pre-Training and Fine-Tuning',
        text: 'Pre-training gives a model general language capabilities; fine-tuning specializes it. As an analyst, this distinction matters because it tells you when an off-the-shelf model will work versus when you need something customized. Most BA/QA tasks work well with general-purpose models and good prompting — fine-tuning is rarely your first option.',
        mustknow: [
          'Pre-training teaches general language patterns from massive text corpora.',
          'Fine-tuning adapts a pre-trained model to specific tasks or domains.',
          'RLHF (Reinforcement Learning from Human Feedback) makes models more helpful and safe.',
          'Good prompting with a general model often outperforms a poorly prompted fine-tuned model.'
        ]
      },
      {
        section: 'context-windows-explained',
        label: 'Context Windows Explained',
        text: 'The context window is the total amount of text a model can consider at once — your prompt plus its response. This is the single most important constraint you will face in real-world workflows. When you need to analyze a 50-page BRD or process a large test suite, you will hit context limits. Knowing how to work within and around these limits is a core skill.',
        mustknow: [
          'Context window = input tokens + output tokens combined.',
          'GPT-4o supports 128K tokens (~96K words); Claude supports 200K tokens.',
          'Performance degrades before you hit the hard limit — the "lost in the middle" problem.',
          'Chunking, summarization, and RAG are strategies for working beyond context limits.'
        ]
      },
      {
        section: 'temperature-and-creativity',
        label: 'Temperature and Creativity',
        text: 'Temperature controls the randomness of model output. For analyst work, this is a critical lever: low temperature (0.0-0.3) gives you consistent, reproducible results ideal for requirements extraction and test case generation. Higher temperature (0.7-1.0) is useful for brainstorming and exploring edge cases. Using the wrong temperature for a task is one of the most common beginner mistakes.',
        mustknow: [
          'Temperature 0 gives the most deterministic output — best for structured deliverables.',
          'Temperature 0.3-0.5 adds slight variation while maintaining consistency.',
          'Temperature 0.7+ introduces creativity — useful for brainstorming and exploration.',
          'Always set temperature explicitly rather than relying on model defaults.'
        ]
      },
      {
        section: 'model-selection-for-analysts',
        label: 'Model Selection for Analysts',
        text: 'Choosing the right model is not about picking the "best" one — it is about matching model capabilities to task requirements. A smaller, faster, cheaper model is often the right choice for high-volume tasks like test case formatting. Reserve large frontier models for complex reasoning tasks like ambiguity detection and gap analysis. Model selection is an economic decision as much as a technical one.',
        mustknow: [
          'GPT-4o and Claude 3.5 Sonnet excel at complex reasoning and long documents.',
          'GPT-4o-mini and Claude 3 Haiku are cost-effective for simpler, high-volume tasks.',
          'Latency matters — a model that takes 30 seconds per call ruins interactive workflows.',
          'Test your specific use case on 2-3 models before committing to one.'
        ]
      },
      {
        section: 'limitations-you-must-know',
        label: 'Limitations You Must Know',
        text: 'Every LLM limitation maps to a specific risk in analyst work. Hallucinations mean fabricated requirements or non-existent test scenarios. Inconsistency means the same document analyzed twice may yield different results. Lack of real-time knowledge means the model does not know about your latest sprint. Acknowledging these limitations is not pessimism — it is professional responsibility.',
        mustknow: [
          'Hallucinations: LLMs confidently generate plausible but false information.',
          'Knowledge cutoff: models do not know about events after their training date.',
          'Inconsistency: the same prompt can yield different results on different runs.',
          'Bias: models reflect biases in their training data — always review for fairness.'
        ]
      }
    ],

    'ch03-prompt-engineering.html': [
      {
        section: 'the-anatomy-of-a-good-prompt',
        label: 'The Anatomy of a Good Prompt',
        text: 'A well-structured prompt has distinct components: role, context, task, format, and constraints. Treating prompt writing as a structured discipline rather than casual conversation is the single biggest improvement most analysts can make. The difference between a vague prompt and a well-crafted one is often the difference between useless output and production-ready deliverables.',
        mustknow: [
          'Every effective prompt has five components: role, context, task, format, constraints.',
          'Role-setting ("You are a senior BA...") dramatically improves output quality.',
          'Explicit output format specifications prevent reformatting work.',
          'Constraints ("Do not include...", "Limit to...") prevent scope creep in responses.'
        ]
      },
      {
        section: 'zero-shot-vs-few-shot',
        label: 'Zero-Shot vs. Few-Shot',
        text: 'Zero-shot prompting asks the model to perform a task with no examples. Few-shot prompting includes examples of the desired input-output pattern. For analyst work, few-shot prompting is almost always superior because it shows the model exactly what your deliverable format looks like. One or two well-chosen examples can replace paragraphs of instruction.',
        mustknow: [
          'Zero-shot works for simple, well-understood tasks like summarization.',
          'Few-shot is essential for tasks with specific formatting requirements.',
          'Two to three examples are usually sufficient — more adds cost without benefit.',
          'Choose examples that cover different scenarios, not just the happy path.'
        ]
      },
      {
        section: 'role-based-prompting',
        label: 'Role-Based Prompting',
        text: 'Assigning a role to the model is not just a trick — it activates different knowledge patterns in the model. "You are a senior QA engineer with 15 years of experience in financial services" produces meaningfully different output than a generic prompt. Role-based prompting is especially powerful for analyst work because it channels domain-specific terminology and quality standards.',
        mustknow: [
          'Specific roles produce better results than generic ones ("QA engineer" vs. "assistant").',
          'Include years of experience and domain to narrow the model\'s response style.',
          'Combine roles with explicit task context for best results.',
          'Different roles for different tasks — do not use one role for everything.'
        ]
      },
      {
        section: 'chain-of-thought-for-analysis',
        label: 'Chain-of-Thought for Analysis',
        text: 'Chain-of-thought (CoT) prompting asks the model to show its reasoning step by step before giving a final answer. For analytical tasks like requirements gap analysis or root cause investigation, CoT dramatically improves accuracy. It also gives you a visible audit trail — if the reasoning is wrong, you can see exactly where it went off track.',
        mustknow: [
          'Add "Think step by step" or "Show your reasoning" to analytical prompts.',
          'CoT improves accuracy on complex tasks by 20-40% in benchmarks.',
          'The visible reasoning chain lets you catch errors in the model\'s logic.',
          'CoT uses more tokens but is worth the cost for high-stakes analysis.'
        ]
      },
      {
        section: 'output-formatting-techniques',
        label: 'Output Formatting Techniques',
        text: 'Analysts produce structured deliverables — user stories, test cases, traceability matrices, status reports. Getting the model to output in your exact format eliminates the most tedious part of LLM-augmented workflows: reformatting. Master JSON, Markdown tables, CSV, and XML output formatting and you will cut your post-processing time by 80% or more.',
        mustknow: [
          'Specify output format explicitly: "Return as a Markdown table with columns X, Y, Z."',
          'JSON output is ideal for programmatic downstream processing.',
          'Provide a template or example of the exact format you want.',
          'Markdown tables work well for human-readable structured output.'
        ]
      },
      {
        section: 'prompt-templates-and-libraries',
        label: 'Prompt Templates and Libraries',
        text: 'Once you craft a prompt that works, templatize it. Prompt templates with variable placeholders let you reuse proven patterns across projects and share them with your team. A prompt library is one of the most valuable assets an analyst team can build — it encodes institutional knowledge about what works and prevents each analyst from starting from scratch.',
        mustknow: [
          'Use placeholders like {requirement_text} to create reusable prompt templates.',
          'Build a shared prompt library organized by task type (extraction, generation, review).',
          'Version your prompts — what works with GPT-4 may need adjustment for Claude.',
          'Document which model, temperature, and context each template was tested with.'
        ]
      },
      {
        section: 'common-prompt-pitfalls',
        label: 'Common Prompt Pitfalls',
        text: 'Most prompt failures fall into a small number of categories: vague instructions, missing context, contradictory constraints, and wrong model parameters. Learning to diagnose these failure modes will save you hours of frustration. When a prompt produces poor results, the fix is almost never "try again" — it is identifying which component is missing or misconfigured.',
        mustknow: [
          'Vague prompts produce vague results — specificity is the cure.',
          'Contradictory instructions confuse the model — review prompts for internal consistency.',
          'Too many constraints can make the task impossible — prioritize your requirements.',
          'If results are inconsistent, lower the temperature before rewriting the prompt.'
        ]
      }
    ],

    'ch04-first-llm-workflow.html': [
      {
        section: 'setting-up-your-environment',
        label: 'Setting Up Your Environment',
        text: 'A properly configured development environment eliminates friction from every subsequent task. For analysts who are not developers by training, this setup step can feel intimidating, but it is simpler than it appears. Python, a virtual environment, and an API key are all you need to start building production-quality workflows that transform your daily work.',
        mustknow: [
          'Python 3.10+ and pip are the only prerequisites for most LLM workflows.',
          'Virtual environments prevent dependency conflicts between projects.',
          'Jupyter notebooks are ideal for iterative prompt development and testing.',
          'VS Code with the Python extension provides the best analyst-friendly IDE experience.'
        ]
      },
      {
        section: 'api-keys-and-authentication',
        label: 'API Keys and Authentication',
        text: 'API keys are your credential for accessing LLM services, and mishandling them is one of the most common and costly mistakes. A leaked API key can result in thousands of dollars in unauthorized charges within hours. Understanding secure key management is not optional — it is the first professional responsibility of anyone building LLM-powered tools.',
        mustknow: [
          'Never hardcode API keys in scripts — always use environment variables or .env files.',
          'Add .env to your .gitignore immediately — leaked keys on GitHub are exploited within minutes.',
          'Set spending limits on your API accounts before running any automated workflows.',
          'Rotate keys regularly and revoke any key that may have been exposed.'
        ]
      },
      {
        section: 'making-your-first-api-call',
        label: 'Making Your First API Call',
        text: 'Your first API call is a milestone — it is the moment LLMs go from an abstract concept to a concrete tool you control. The call itself is simple: construct a message, send it, receive a response. But understanding the response structure — content, token usage, finish reason — gives you the diagnostic information you need to optimize every subsequent call.',
        mustknow: [
          'The OpenAI and Anthropic Python SDKs make API calls straightforward.',
          'Every response includes usage metadata — track tokens consumed from day one.',
          'The finish_reason field tells you whether the response was complete or truncated.',
          'Start with a simple test prompt to verify your setup before building complex workflows.'
        ]
      },
      {
        section: 'building-a-simple-analyzer',
        label: 'Building a Simple Analyzer',
        text: 'A requirements analyzer is a perfect first project because it mirrors real analyst work: take unstructured text input, apply analytical criteria, produce structured output. Building this tool teaches you prompt design, response parsing, and error handling in a context you understand deeply. It also gives you an immediately useful tool you can apply to your next project.',
        mustknow: [
          'Start with a single analysis task — do not try to build a Swiss Army knife.',
          'Separate the prompt template from the processing logic for reusability.',
          'Parse structured output (JSON) rather than trying to extract data from prose.',
          'Test with real documents from your projects, not just toy examples.'
        ]
      },
      {
        section: 'handling-responses-and-errors',
        label: 'Handling Responses and Errors',
        text: 'Production-quality workflows handle failures gracefully. API rate limits, network timeouts, malformed responses, and context window overflows are not edge cases — they are routine occurrences. Building retry logic, validation, and fallback behavior from the start saves you from debugging mysterious failures at the worst possible moment.',
        mustknow: [
          'Implement exponential backoff for rate limit errors (HTTP 429).',
          'Validate response structure before processing — do not assume valid JSON.',
          'Set reasonable timeouts — a hung API call can block your entire workflow.',
          'Log all API interactions for debugging and cost tracking purposes.'
        ]
      },
      {
        section: 'from-script-to-reusable-tool',
        label: 'From Script to Reusable Tool',
        text: 'The gap between a working script and a reusable tool is where most analyst-built workflows stall. A reusable tool has clear inputs and outputs, handles edge cases, provides meaningful error messages, and can be used by someone who did not write it. Making this transition is what separates a personal hack from a team asset.',
        mustknow: [
          'Extract hardcoded values into function parameters or configuration files.',
          'Add input validation — check file existence, format, and size before processing.',
          'Write clear docstrings that explain what the tool does, its inputs, and its outputs.',
          'Package related functions into modules that teammates can import and use.'
        ]
      },
      {
        section: 'measuring-quality-and-cost',
        label: 'Measuring Quality and Cost',
        text: 'If you cannot measure the quality of your LLM workflow, you cannot improve it — and you certainly cannot justify its cost. Establishing quality metrics and cost tracking from the beginning creates a feedback loop that drives continuous improvement. It also gives you the data you need to make the business case for expanding LLM adoption across your team.',
        mustknow: [
          'Track cost per task (tokens used x price per token) from the very first run.',
          'Define quality metrics specific to your task — accuracy, completeness, consistency.',
          'Compare LLM output against a human baseline to quantify improvement.',
          'Monitor quality over time — model updates and prompt drift can degrade performance.'
        ]
      }
    ],

    'ch05-requirements-elicitation.html': [
      {
        section: 'the-requirements-challenge',
        label: 'The Requirements Challenge',
        text: 'Requirements elicitation is the highest-leverage activity in software delivery — get it right and everything downstream flows smoothly; get it wrong and no amount of testing can save the project. LLMs do not replace the human judgment needed for stakeholder conversations, but they dramatically accelerate the documentation, analysis, and validation work that surrounds those conversations.',
        mustknow: [
          'Poor requirements are the root cause of 50-70% of project failures.',
          'LLMs accelerate the documentation work but cannot replace stakeholder interviews.',
          'The biggest time sink is not writing requirements — it is finding gaps and ambiguities.',
          'Automating requirements analysis lets you focus on the high-judgment work that matters.'
        ]
      },
      {
        section: 'extracting-requirements-from-documents',
        label: 'Extracting Requirements from Documents',
        text: 'Stakeholders communicate requirements in meeting notes, emails, RFPs, existing documentation, and conversation transcripts — rarely in structured requirement statements. LLMs excel at extracting structured requirements from these unstructured sources. The key is providing clear extraction criteria and output format so the model knows exactly what to look for and how to present it.',
        mustknow: [
          'Provide the model with explicit criteria for what constitutes a requirement.',
          'Use classification labels (functional, non-functional, constraint) in your extraction prompt.',
          'Process documents in manageable chunks to avoid context window limits.',
          'Always validate extracted requirements against the source document for accuracy.'
        ]
      },
      {
        section: 'ambiguity-detection-and-resolution',
        label: 'Ambiguity Detection and Resolution',
        text: 'Ambiguous requirements are silent project killers — they pass reviews because everyone interprets them differently. LLMs are remarkably good at detecting ambiguity because they process language literally. Words like "appropriate," "reasonable," "as needed," and "etc." that humans skim past are flagged as underspecified. This capability alone can prevent weeks of rework downstream.',
        mustknow: [
          'LLMs detect vague qualifiers ("appropriate," "reasonable") that humans overlook.',
          'Prompt the model to suggest specific resolution options for each ambiguity.',
          'Classify ambiguities by severity — not all require immediate resolution.',
          'Use ambiguity detection as a pre-review step before stakeholder validation sessions.'
        ]
      },
      {
        section: 'requirements-classification',
        label: 'Requirements Classification',
        text: 'Classifying requirements by type, priority, component, and stakeholder is tedious but essential work. Manual classification is slow, inconsistent, and error-prone — different analysts classify the same requirement differently. LLMs provide consistent classification against explicit criteria, and they can process hundreds of requirements in minutes rather than days.',
        mustknow: [
          'Define your classification taxonomy explicitly in the prompt.',
          'Use few-shot examples to calibrate the model to your organization\'s categories.',
          'Multi-label classification (a requirement can have multiple types) is supported.',
          'Validate classification accuracy on a sample before processing the full set.'
        ]
      },
      {
        section: 'traceability-matrix-generation',
        label: 'Traceability Matrix Generation',
        text: 'Traceability matrices connect requirements to design decisions, test cases, and deliverables. Building them manually is one of the most time-consuming tasks in requirements management. LLMs can generate initial traceability mappings by analyzing relationships between documents, giving you a draft matrix that takes minutes instead of days to produce.',
        mustknow: [
          'Provide both the requirements and the target artifacts (test cases, design docs) to the model.',
          'Use unique IDs for requirements to enable consistent cross-referencing.',
          'LLM-generated matrices are a starting point — always review for missing links.',
          'Traceability is bidirectional — check both forward (requirement to test) and backward.'
        ]
      },
      {
        section: 'gap-analysis-automation',
        label: 'Gap Analysis Automation',
        text: 'Gap analysis compares what a system currently does against what it needs to do. This comparison across potentially hundreds of features and requirements is exactly the kind of systematic cross-referencing where LLMs outperform human analysts. The model can compare feature lists, identify missing capabilities, and flag areas where requirements are silent on topics they should address.',
        mustknow: [
          'Provide both the current-state documentation and the target-state requirements.',
          'Ask the model to identify gaps in categories: functional, non-functional, data, integration.',
          'Missing requirements (things not mentioned at all) are harder to detect than mismatches.',
          'Combine gap analysis with industry standards or checklists for more thorough coverage.'
        ]
      },
      {
        section: 'stakeholder-review-workflows',
        label: 'Stakeholder Review Workflows',
        text: 'Getting stakeholder sign-off on requirements is a process bottleneck in every organization. LLMs can accelerate this by generating review-ready summaries, creating role-specific views of requirements, and drafting questions for review sessions. The goal is not to remove stakeholders from the loop but to make their review time as productive as possible.',
        mustknow: [
          'Generate executive summaries that highlight changes, risks, and decision points.',
          'Create role-specific views — technical stakeholders need different detail than business sponsors.',
          'Draft specific review questions rather than asking stakeholders to "review everything."',
          'Use LLMs to consolidate feedback from multiple reviewers into a unified change log.'
        ]
      }
    ],

    'ch06-user-story-generation.html': [
      {
        section: 'from-requirements-to-stories',
        label: 'From Requirements to Stories',
        text: 'The translation from high-level requirements to implementable user stories is where many projects lose fidelity. Requirements describe what the system should do; user stories describe who needs it and why. LLMs can bridge this gap systematically, ensuring that every requirement maps to at least one story and that no stakeholder perspective is accidentally dropped.',
        mustknow: [
          'User stories capture who, what, and why — not just the what of requirements.',
          'One requirement typically maps to multiple user stories across different personas.',
          'LLMs help ensure complete coverage — no requirement should be left without stories.',
          'The mapping between requirements and stories creates natural traceability.'
        ]
      },
      {
        section: 'generating-user-stories-with-llms',
        label: 'Generating User Stories with LLMs',
        text: 'LLMs generate user stories best when given clear context: the persona, the business domain, the system constraints, and examples of your team\'s preferred story format. Without this context, you get generic stories that need heavy editing. With it, you get draft stories that are 70-80% ready for backlog, cutting your story-writing time dramatically.',
        mustknow: [
          'Always specify the persona and business context in your story generation prompt.',
          'Provide 2-3 example stories in your team\'s format to calibrate output style.',
          'Generate stories in batches by feature area for better consistency.',
          'Include non-functional requirements as inputs — they generate important constraint stories.'
        ]
      },
      {
        section: 'acceptance-criteria-automation',
        label: 'Acceptance Criteria Automation',
        text: 'Acceptance criteria define when a story is done, and incomplete criteria are a leading cause of sprint rework. LLMs excel at generating comprehensive acceptance criteria because they can systematically consider happy paths, edge cases, error conditions, and boundary values. The model catches scenarios that tired analysts miss — especially negative cases and data validation rules.',
        mustknow: [
          'Use Given-When-Then format in your prompt for consistent, testable criteria.',
          'Ask the model to generate criteria for happy path, edge cases, and error scenarios.',
          'Overly broad criteria are as bad as missing ones — each criterion should be testable.',
          'Review generated criteria with developers to ensure they are technically feasible.'
        ]
      },
      {
        section: 'story-splitting-strategies',
        label: 'Story Splitting Strategies',
        text: 'Stories that are too large to complete in a single sprint are a planning liability. LLMs can suggest splitting strategies based on established patterns: by workflow step, by data variation, by user role, by business rule, or by interface. The model can also estimate relative complexity after splitting, helping you plan sprints more accurately.',
        mustknow: [
          'Split by workflow step, data variation, user role, or business rule complexity.',
          'Each split story must be independently valuable — not just a technical task.',
          'LLMs can suggest multiple splitting options so you can choose the best fit.',
          'Verify that split stories collectively cover the original story\'s acceptance criteria.'
        ]
      },
      {
        section: 'invest-criteria-validation',
        label: 'INVEST Criteria Validation',
        text: 'The INVEST acronym (Independent, Negotiable, Valuable, Estimable, Small, Testable) is the gold standard for user story quality. LLMs can evaluate stories against each INVEST criterion and flag violations. This automated quality check catches problems before they reach sprint planning, where discovering a non-estimable or untestable story wastes the entire team\'s time.',
        mustknow: [
          'INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable.',
          'Dependencies between stories are the most common INVEST violation.',
          'Untestable stories indicate missing or vague acceptance criteria.',
          'Run INVEST validation on every story batch before adding to the backlog.'
        ]
      },
      {
        section: 'story-mapping-with-ai',
        label: 'Story Mapping with AI',
        text: 'Story mapping arranges user stories along a narrative flow, showing the big picture of user activities while breaking them into releasable slices. LLMs can generate initial story maps by analyzing user stories and organizing them by user journey, activity, and priority. This gives you a structured starting point that would take hours to create manually.',
        mustknow: [
          'Story maps have two axes: user activities (horizontal) and priority (vertical).',
          'LLMs can group stories by user journey to create the horizontal backbone.',
          'Release slices (horizontal cuts) should deliver end-to-end user value.',
          'Use the generated map as a discussion tool with the team, not as a final artifact.'
        ]
      },
      {
        section: 'backlog-grooming-assistant',
        label: 'Backlog Grooming Assistant',
        text: 'Backlog grooming sessions are more productive when stories arrive pre-analyzed. An LLM-powered grooming assistant can review stories for completeness, flag missing acceptance criteria, identify dependencies, suggest story point estimates, and draft clarifying questions — all before the team meeting. This shifts grooming from story-fixing to story-confirming.',
        mustknow: [
          'Pre-grooming analysis catches 60-70% of issues before the team meeting.',
          'Generate a grooming checklist for each story: criteria completeness, dependencies, clarity.',
          'Suggest story point estimates based on complexity indicators in the story text.',
          'Draft specific questions for the product owner to resolve during grooming.'
        ]
      }
    ],

    'ch07-process-modeling.html': [
      {
        section: 'understanding-business-processes',
        label: 'Understanding Business Processes',
        text: 'Business process analysis is a core BA competency, and LLMs transform how you approach it. Instead of spending days manually mapping processes from interviews and documents, you can use LLMs to create initial process models from existing documentation. This frees you to focus on the high-value work: validating processes with stakeholders, identifying inefficiencies, and designing improvements.',
        mustknow: [
          'Processes exist in documents, SOPs, training materials, and stakeholder descriptions.',
          'LLMs can extract process steps from unstructured narrative descriptions.',
          'Start with the happy path before modeling exceptions and error handling.',
          'Process documentation is often outdated — always validate against current practice.'
        ]
      },
      {
        section: 'process-discovery-from-documents',
        label: 'Process Discovery from Documents',
        text: 'Process discovery from existing documentation is where LLMs deliver immediate value. SOPs, work instructions, training guides, and even email threads contain implicit process descriptions. LLMs can read these documents and extract ordered sequences of activities, decision points, roles, and handoffs — creating a structured process model from unstructured text.',
        mustknow: [
          'Feed SOPs, work instructions, and procedure documents directly to the model.',
          'Ask the model to identify actors, activities, decision points, and handoffs.',
          'Process multiple documents to build a comprehensive view of the same process.',
          'Flag discrepancies between documents — they reveal process inconsistencies.'
        ]
      },
      {
        section: 'bpmn-generation-with-llms',
        label: 'BPMN Generation with LLMs',
        text: 'BPMN (Business Process Model and Notation) is the standard visual language for process models. LLMs can generate BPMN-compatible XML or structured descriptions from process narratives, saving hours of manual diagramming. While the output may need refinement in a BPMN tool, having an 80%-complete model as a starting point dramatically accelerates the modeling cycle.',
        mustknow: [
          'LLMs can generate BPMN XML that imports into tools like Camunda, Bizagi, or draw.io.',
          'Specify BPMN elements explicitly: start events, tasks, gateways, end events.',
          'Swim lanes (pools/lanes) are essential — always specify role assignments.',
          'Generated BPMN is a draft — validate logic and layout in a proper BPMN tool.'
        ]
      },
      {
        section: 'bottleneck-identification',
        label: 'Bottleneck Identification',
        text: 'Bottlenecks are where processes slow down, and identifying them is one of the most valuable analytical tasks you perform. LLMs can analyze process descriptions to flag potential bottlenecks: sequential approval chains, manual handoffs, single-person dependencies, and batch processing steps. Combining LLM analysis with actual timing data gives you a powerful optimization toolkit.',
        mustknow: [
          'Common bottleneck patterns: sequential approvals, manual handoffs, single-point dependencies.',
          'Provide cycle time data alongside process descriptions for data-driven analysis.',
          'Ask the model to rank bottlenecks by estimated impact on total process time.',
          'Bottleneck identification should lead to specific, actionable recommendations.'
        ]
      },
      {
        section: 'process-optimization-suggestions',
        label: 'Process Optimization Suggestions',
        text: 'LLMs can suggest process improvements by comparing your current process against common optimization patterns: parallelization, automation, elimination of non-value-adding steps, and consolidation of handoffs. The model draws on patterns from thousands of process descriptions to suggest improvements you might not consider. Each suggestion should be evaluated for feasibility and impact.',
        mustknow: [
          'Common optimization patterns: parallelize, automate, eliminate, consolidate.',
          'Ask the model to classify suggestions by implementation effort and expected impact.',
          'Consider regulatory and compliance constraints before accepting optimization suggestions.',
          'Quick wins (low effort, high impact) should be prioritized in your recommendation report.'
        ]
      },
      {
        section: 'as-is-to-to-be-mapping',
        label: 'As-Is to To-Be Mapping',
        text: 'Mapping from the current state (as-is) to the future state (to-be) is the deliverable that drives process improvement projects. LLMs can generate to-be process models by applying optimization suggestions to your as-is model, creating side-by-side comparisons that clearly show what changes and why. This visual comparison is essential for stakeholder buy-in.',
        mustknow: [
          'Provide the complete as-is model before asking for to-be recommendations.',
          'Each change from as-is to to-be should have a clear rationale and expected benefit.',
          'Generate side-by-side comparisons that highlight specific changes.',
          'Include transition steps — how to get from as-is to to-be without disrupting operations.'
        ]
      },
      {
        section: 'change-impact-analysis',
        label: 'Change Impact Analysis',
        text: 'Every process change has ripple effects — on people, systems, data, and downstream processes. LLMs can systematically analyze proposed changes and identify impacts across these dimensions. This comprehensive impact analysis is often the difference between a smooth implementation and a chaotic one. The model catches cross-functional impacts that siloed analysis misses.',
        mustknow: [
          'Analyze impact across four dimensions: people, process, technology, and data.',
          'Identify upstream and downstream processes affected by the proposed change.',
          'Assess training needs — process changes often require new skills or updated procedures.',
          'Risk-rate each impact: high, medium, low, with specific mitigation strategies.'
        ]
      }
    ],

    'ch08-stakeholder-communication.html': [
      {
        section: 'the-communication-challenge',
        label: 'The Communication Challenge',
        text: 'Analysts spend 40-60% of their time communicating — writing reports, preparing presentations, drafting emails, and creating documentation. LLMs can accelerate every one of these activities without sacrificing quality. The challenge is not getting the model to write; it is ensuring the output matches your organization\'s voice, your stakeholders\' expectations, and the right level of technical detail.',
        mustknow: [
          'Communication is the largest time investment for most analysts — and the most improvable.',
          'LLMs handle the drafting; you handle the judgment about what to say and to whom.',
          'Organization-specific terminology and voice require few-shot examples to calibrate.',
          'Every generated communication should be reviewed for accuracy, tone, and appropriateness.'
        ]
      },
      {
        section: 'executive-summary-generation',
        label: 'Executive Summary Generation',
        text: 'Executives need the bottom line upfront — risks, decisions needed, and progress against goals. LLMs can distill a 30-page technical document into a one-page executive summary that highlights exactly these elements. The key is specifying the executive\'s perspective and concerns in your prompt so the summary addresses what they care about, not just what the document contains.',
        mustknow: [
          'Start with the audience: what does this executive care about and what decisions do they face?',
          'Structure summaries as: situation, key findings, risks, recommendations, next steps.',
          'Keep executive summaries under one page — brevity is a feature, not a limitation.',
          'Highlight decisions needed and deadlines — executives need to act, not just read.'
        ]
      },
      {
        section: 'technical-to-business-translation',
        label: 'Technical-to-Business Translation',
        text: 'Bridging the gap between technical teams and business stakeholders is a core analyst responsibility. LLMs are exceptional translators — they can take a technical architecture document and produce a business-language explanation, or convert a business requirement into technical specifications. This bidirectional translation saves hours and reduces the miscommunication that causes rework.',
        mustknow: [
          'Specify the source language (technical) and target language (business) explicitly.',
          'Include the audience\'s role and technical literacy level in your prompt.',
          'Preserve meaning while removing jargon — oversimplification is as bad as under-translation.',
          'Test translations with a representative from the target audience before distributing.'
        ]
      },
      {
        section: 'status-report-automation',
        label: 'Status Report Automation',
        text: 'Weekly status reports are necessary but repetitive. LLMs can generate status reports from structured inputs — completed items, in-progress work, blockers, metrics, and upcoming milestones. By templating your status report and feeding the model raw data, you reduce a 45-minute task to 5 minutes of review and editing. That time savings compounds every single week.',
        mustknow: [
          'Create a status report template with consistent sections and formatting.',
          'Feed the model raw data (JIRA exports, metrics, notes) and let it compose the narrative.',
          'Include traffic-light indicators (red/amber/green) for quick stakeholder scanning.',
          'Automate data collection where possible to make the entire pipeline low-friction.'
        ]
      },
      {
        section: 'meeting-notes-and-action-items',
        label: 'Meeting Notes and Action Items',
        text: 'Meeting notes and action item extraction are perfect LLM tasks — they involve processing a transcript and producing structured output. LLMs can identify decisions made, action items assigned, questions raised, and parking lot items from raw meeting notes or transcripts. This ensures nothing falls through the cracks and action items have clear owners and due dates.',
        mustknow: [
          'Structure output as: decisions, action items (with owner and due date), parking lot, key discussion points.',
          'Provide participant names and roles so the model can attribute actions correctly.',
          'Process meeting transcripts immediately while context is fresh for quick correction.',
          'Use consistent formatting across all meeting notes for searchability and accountability.'
        ]
      },
      {
        section: 'presentation-deck-drafting',
        label: 'Presentation Deck Drafting',
        text: 'Creating presentation content is time-consuming because it requires distilling complex information into slide-sized chunks with clear messaging. LLMs can generate slide outlines, talking points, and speaker notes from source documents. While you still need to design the visual layout, having the content structure and narrative arc pre-built saves 60-70% of the creation time.',
        mustknow: [
          'Specify the presentation goal, audience, and time limit in your prompt.',
          'Ask for one key message per slide with 3-4 supporting bullet points.',
          'Generate speaker notes that expand on slide content for deeper context.',
          'Request a narrative arc — introduction, problem, solution, benefits, next steps.'
        ]
      },
      {
        section: 'multi-audience-adaptation',
        label: 'Multi-Audience Adaptation',
        text: 'The same information needs to be communicated differently to developers, product owners, executives, and end users. LLMs can take a single source document and produce audience-specific versions with appropriate detail levels, terminology, and emphasis. This capability lets you serve multiple audiences without writing each communication from scratch.',
        mustknow: [
          'Define each audience by role, technical level, and primary concerns.',
          'The same fact has different implications for different audiences — emphasize accordingly.',
          'Create audience profiles that you reuse across communications for consistency.',
          'Review each version with a representative from the target audience when possible.'
        ]
      }
    ],

    'ch09-test-case-generation.html': [
      {
        section: 'the-testing-bottleneck',
        label: 'The Testing Bottleneck',
        text: 'Testing is almost always the schedule bottleneck in software delivery. There are never enough test cases, never enough time to execute them, and the test suite is perpetually behind the latest requirements changes. LLMs do not solve the execution problem, but they dramatically accelerate test case design — the intellectual work that determines whether your testing is thorough or superficial.',
        mustknow: [
          'Test case design is the bottleneck — execution and automation are downstream.',
          'Most projects have 30-50% less test coverage than they think they do.',
          'LLMs accelerate design by 3-5x, freeing QA time for exploratory testing.',
          'Generated test cases are a starting point — expert QA review is still essential.'
        ]
      },
      {
        section: 'generating-tests-from-requirements',
        label: 'Generating Tests from Requirements',
        text: 'Requirements-based testing is the foundation of systematic test design, and LLMs make it dramatically faster. Feed the model a requirement and its acceptance criteria, and it generates test cases that cover the specified behavior. The key is providing clear, unambiguous requirements — if the requirement is vague, the generated tests will be vague too.',
        mustknow: [
          'Clear acceptance criteria produce clear test cases — garbage in, garbage out.',
          'Specify the test case format: ID, preconditions, steps, expected results, priority.',
          'Generate tests for each acceptance criterion individually for complete coverage.',
          'Cross-reference generated tests against the traceability matrix to verify coverage.'
        ]
      },
      {
        section: 'boundary-value-analysis-with-llms',
        label: 'Boundary Value Analysis with LLMs',
        text: 'Boundary value analysis (BVA) is a proven test design technique that focuses on values at the edges of input ranges. LLMs are excellent at BVA because they can systematically identify boundaries for every input field and generate test cases for values at, just below, and just above each boundary. This catches the off-by-one errors and range validation bugs that hide in production.',
        mustknow: [
          'Boundaries exist wherever there are valid ranges: numeric fields, string lengths, dates.',
          'Test at the boundary, one below, and one above for thorough BVA coverage.',
          'LLMs identify boundaries you might miss — multi-field interactions and cascading ranges.',
          'Combine BVA with equivalence partitioning for comprehensive input coverage.'
        ]
      },
      {
        section: 'equivalence-partitioning-automation',
        label: 'Equivalence Partitioning Automation',
        text: 'Equivalence partitioning divides input data into groups where all values should produce the same behavior. LLMs can identify these partitions from requirements and generate representative test cases for each class. This systematic approach ensures you test every meaningfully different input scenario without redundant test cases that add effort but not coverage.',
        mustknow: [
          'Each equivalence class needs only one representative test case — efficiency over volume.',
          'Include both valid and invalid partitions in your analysis.',
          'LLMs can identify non-obvious partitions based on business rules and constraints.',
          'Document the partitioning rationale so reviewers understand why each test exists.'
        ]
      },
      {
        section: 'negative-test-case-generation',
        label: 'Negative Test Case Generation',
        text: 'Negative testing — verifying that the system handles invalid, unexpected, and malicious inputs correctly — is where most test suites are weakest. Analysts tend to focus on proving the system works, not on proving it fails gracefully. LLMs are excellent at generating negative test cases because they can systematically consider what could go wrong with every input, transition, and integration point.',
        mustknow: [
          'Negative tests verify error handling, validation, and system robustness.',
          'Prompt the model to think like an adversarial user trying to break the system.',
          'Categories: invalid input, missing required fields, out-of-range values, injection attacks.',
          'Security-related negative tests (SQL injection, XSS) should be included for web applications.'
        ]
      },
      {
        section: 'test-case-prioritization',
        label: 'Test Case Prioritization',
        text: 'When you have more test cases than time allows, prioritization determines whether your limited testing time catches the critical bugs or wastes effort on low-risk scenarios. LLMs can prioritize test cases based on risk, business impact, defect probability, and requirement criticality. This data-driven prioritization is more consistent and defensible than gut-feel ranking.',
        mustknow: [
          'Prioritize by risk (likelihood x impact), not just by importance.',
          'Business-critical paths should always have the highest priority test cases.',
          'Regression-prone areas (high change frequency) deserve elevated priority.',
          'Re-prioritize when requirements change — static priority becomes stale priority.'
        ]
      },
      {
        section: 'coverage-analysis',
        label: 'Coverage Analysis',
        text: 'Coverage analysis tells you what your test suite covers and, more importantly, what it does not. LLMs can compare your test cases against requirements to identify coverage gaps — untested requirements, partially covered acceptance criteria, and missing edge case scenarios. This analysis turns "we think we tested everything" into "we can prove what we tested and what we did not."',
        mustknow: [
          'Coverage is measured against requirements, not against code (for BA/QA purposes).',
          'Map every test case to at least one requirement — unmapped tests may be redundant.',
          'Identify requirements with zero test coverage — these are your highest-risk gaps.',
          'Coverage reports are essential artifacts for test completion sign-off and audit.'
        ]
      }
    ],

    'ch10-test-data-design.html': [
      {
        section: 'the-test-data-challenge',
        label: 'The Test Data Challenge',
        text: 'Test data is the fuel that makes test cases executable. Without realistic, comprehensive test data, even the best test cases are useless. The challenge is that production data cannot be used directly (privacy, volume, access), and manually creating test data is tedious and incomplete. LLMs offer a middle path: generating realistic synthetic data that covers the scenarios your test cases need.',
        mustknow: [
          'Test data quality directly determines test effectiveness — bad data means bad testing.',
          'Production data cannot be used directly due to privacy, compliance, and access restrictions.',
          'Manual test data creation is slow and typically covers only happy-path scenarios.',
          'Synthetic data generated by LLMs can cover edge cases that real data rarely contains.'
        ]
      },
      {
        section: 'synthetic-data-generation',
        label: 'Synthetic Data Generation',
        text: 'LLMs can generate synthetic test data that looks and behaves like real data without containing any actual personal or sensitive information. By describing the data schema, business rules, and distribution characteristics, you get data sets that exercise your system realistically. The key is specifying the relationships and constraints between fields — otherwise you get random data that fails validation.',
        mustknow: [
          'Specify the data schema, field types, valid ranges, and inter-field relationships.',
          'Include realistic distributions — not all test data should be perfectly formatted.',
          'Generate data in bulk using batch prompts or API calls for efficiency.',
          'Validate generated data against your system\'s validation rules before using it.'
        ]
      },
      {
        section: 'edge-case-discovery',
        label: 'Edge Case Discovery',
        text: 'Edge cases live at the boundaries of your system\'s expected behavior, and they are where bugs hide. LLMs excel at brainstorming edge cases because they can systematically consider unusual combinations, extreme values, timing issues, and rare but valid scenarios. An LLM asked to "think of ways this could break" generates test scenarios that would take a QA team hours to brainstorm.',
        mustknow: [
          'Edge cases include: maximum/minimum values, empty inputs, special characters, concurrent actions.',
          'Ask the model to consider what happens at system boundaries and state transitions.',
          'Cross-field edge cases (valid individually but invalid in combination) are often missed.',
          'Prioritize edge cases by likelihood and impact — not all edge cases need test data.'
        ]
      },
      {
        section: 'persona-based-test-scenarios',
        label: 'Persona-Based Test Scenarios',
        text: 'Different users interact with systems differently, and your test data should reflect this diversity. LLMs can generate test data for specific user personas — a power user who pushes limits, a new user who makes mistakes, an accessibility user who navigates differently. Persona-based test data reveals usability and robustness issues that generic test data misses entirely.',
        mustknow: [
          'Define 3-5 key personas that represent your actual user base diversity.',
          'Each persona should have characteristic behavior patterns and data patterns.',
          'Include personas that represent edge cases: low-tech users, power users, accessibility needs.',
          'Generate complete user journeys for each persona, not just isolated data points.'
        ]
      },
      {
        section: 'data-privacy-and-masking',
        label: 'Data Privacy and Masking',
        text: 'Using real data for testing creates legal, ethical, and compliance risks. LLMs can help by generating realistic data that mimics production patterns without containing any real personal information. They can also create data masking rules that replace sensitive fields while preserving data relationships and business logic. This is essential for GDPR, HIPAA, and SOX compliance.',
        mustknow: [
          'Never send real PII to an LLM API — this creates data privacy violations.',
          'Generate synthetic data that matches production patterns without real personal data.',
          'LLMs can create masking rules: name anonymization, address randomization, date shifting.',
          'Validate that masked data still triggers the same business logic as real data.'
        ]
      },
      {
        section: 'cross-system-test-data',
        label: 'Cross-System Test Data',
        text: 'Integration testing requires test data that is consistent across multiple systems — a customer record in the CRM must match the same customer in the billing system and the support portal. LLMs can generate cross-system test data sets that maintain referential integrity, consistent keys, and matching business states. This solves one of the hardest problems in integration test data management.',
        mustknow: [
          'Cross-system data must share consistent keys, IDs, and reference values.',
          'Specify the data model for each system and the relationships between them.',
          'Generate data in the correct sequence — parent records before child records.',
          'Include data state mismatches intentionally to test synchronization and error handling.'
        ]
      },
      {
        section: 'data-validation-rules',
        label: 'Data Validation Rules',
        text: 'LLMs can help you define and document data validation rules by analyzing requirements, business rules, and existing system behavior. These rules specify what constitutes valid data for each field and combination of fields. Having explicit validation rules improves test data quality and also serves as documentation for developers implementing validation logic.',
        mustknow: [
          'Validation rules should cover: type, format, range, required/optional, and cross-field logic.',
          'Generate both positive (valid) and negative (invalid) data for each validation rule.',
          'Document validation rules as testable specifications, not just descriptions.',
          'Share validation rules with developers to align implementation with test expectations.'
        ]
      }
    ],

    'ch11-defect-analysis.html': [
      {
        section: 'the-defect-flood',
        label: 'The Defect Flood',
        text: 'Testing generates a flood of defects that must be triaged, classified, assigned, and tracked. In a typical sprint, a QA team might log 50-100 defects, and each one needs analysis before it can be fixed. LLMs can accelerate defect triage by automatically classifying severity, suggesting root causes, and identifying duplicates — reducing the time from defect discovery to developer assignment.',
        mustknow: [
          'Defect triage is a time-critical bottleneck — delays cascade into sprint overruns.',
          'Manual triage is inconsistent — different QA engineers classify the same defect differently.',
          'LLMs provide consistent classification against explicit criteria every time.',
          'Automated triage is a complement to, not a replacement for, QA judgment.'
        ]
      },
      {
        section: 'automated-defect-classification',
        label: 'Automated Defect Classification',
        text: 'Defect classification by type (UI, data, logic, performance, security), component, and affected feature is essential for routing and trend analysis. LLMs can classify defects from their description text alone, matching or exceeding the consistency of human classifiers. Consistent classification enables meaningful defect trend analysis that drives process improvement.',
        mustknow: [
          'Define your classification taxonomy in the prompt with clear criteria for each category.',
          'Include few-shot examples of correctly classified defects for calibration.',
          'Multi-label classification catches defects that span multiple categories.',
          'Track classification accuracy by comparing LLM classifications against human triage decisions.'
        ]
      },
      {
        section: 'root-cause-analysis-with-llms',
        label: 'Root Cause Analysis with LLMs',
        text: 'Root cause analysis (RCA) goes beyond symptoms to identify why a defect occurred. LLMs can suggest probable root causes by analyzing the defect description, reproduction steps, and system context. While the model cannot debug code, it can narrow the investigation scope and suggest where to look — saving developers from starting their analysis from scratch.',
        mustknow: [
          'Provide defect description, reproduction steps, and system context for accurate RCA.',
          'LLMs suggest probable causes — developers must confirm through investigation.',
          'Common root cause categories: missing validation, race condition, incorrect logic, data issue.',
          'Pattern-based RCA improves over time as the model sees more defects from your system.'
        ]
      },
      {
        section: 'duplicate-detection',
        label: 'Duplicate Detection',
        text: 'Duplicate defects waste developer time and skew metrics. When multiple testers report the same underlying issue with different descriptions, it appears as multiple defects. LLMs can compare new defect reports against existing ones and flag potential duplicates based on semantic similarity, not just keyword matching. This catches duplicates that simple text search would miss.',
        mustknow: [
          'Semantic comparison catches duplicates with different wording but the same root issue.',
          'Feed the model the new defect and a batch of existing open defects for comparison.',
          'Flag probable duplicates for human review rather than auto-closing them.',
          'Duplicate detection also reveals defect clusters that indicate systemic issues.'
        ]
      },
      {
        section: 'severity-and-priority-scoring',
        label: 'Severity and Priority Scoring',
        text: 'Severity (technical impact) and priority (business urgency) are different dimensions that together determine fix order. LLMs can score both dimensions based on explicit criteria: user impact, data risk, workaround availability, and affected user count. Consistent scoring prevents the common problem where every defect is marked "high priority" because the reporter thinks their bug is the most important.',
        mustknow: [
          'Severity measures technical impact; priority measures business urgency — they are independent.',
          'Define scoring criteria explicitly: what makes a defect critical vs. major vs. minor.',
          'Include business context (affected users, revenue impact, compliance risk) for priority scoring.',
          'Consistent scoring enables meaningful SLA tracking and defect trend analysis.'
        ]
      },
      {
        section: 'defect-pattern-recognition',
        label: 'Defect Pattern Recognition',
        text: 'Individual defects are symptoms; patterns reveal systemic issues. LLMs can analyze defect histories to identify patterns — modules with recurring issues, defect types that cluster around certain features, and time-based trends that correlate with releases or sprints. Pattern recognition turns reactive bug-fixing into proactive quality improvement.',
        mustknow: [
          'Analyze defects by module, type, severity, and sprint to find recurring patterns.',
          'Clusters of similar defects usually indicate a systemic design or process issue.',
          'Feed the model 50+ defect descriptions to identify meaningful patterns.',
          'Pattern analysis should lead to specific process changes, not just awareness.'
        ]
      },
      {
        section: 'regression-risk-assessment',
        label: 'Regression Risk Assessment',
        text: 'Every code change carries regression risk — the chance that fixing one thing breaks another. LLMs can assess regression risk by analyzing the change scope, affected components, historical defect data, and dependency relationships. This risk assessment helps QA teams focus their regression testing on the areas most likely to be affected by recent changes.',
        mustknow: [
          'High regression risk indicators: shared components, complex dependencies, recent refactoring.',
          'Historical defect density is a strong predictor of future regression risk.',
          'Risk assessment should map directly to regression test selection and prioritization.',
          'Reassess risk after every significant code change, not just at release milestones.'
        ]
      }
    ],

    'ch12-regression-testing.html': [
      {
        section: 'the-regression-burden',
        label: 'The Regression Burden',
        text: 'Regression testing is the most resource-intensive testing activity because the test suite grows with every sprint while the available testing time does not. Teams face a constant tension between thoroughness and speed. LLMs can help by generating new regression tests, maintaining existing ones, and intelligently selecting which tests to run based on what changed — turning regression from a burden into a manageable process.',
        mustknow: [
          'Regression suites grow linearly but testing time stays flat — something has to give.',
          'Most teams run only 20-40% of their regression suite each sprint due to time constraints.',
          'Intelligent test selection based on change analysis is more effective than random sampling.',
          'LLMs help with test creation, maintenance, and selection — not just one of these.'
        ]
      },
      {
        section: 'test-script-generation',
        label: 'Test Script Generation',
        text: 'LLMs can generate automated test scripts from test case descriptions, acceptance criteria, or even user story text. Whether you need Selenium WebDriver scripts, API test code with requests or RestAssured, or Cypress end-to-end tests, the model can produce working code that needs minimal modification. This bridges the gap between manual test design and automated test implementation.',
        mustknow: [
          'Specify the target framework (Selenium, Cypress, Playwright, RestAssured) in your prompt.',
          'Provide page structure or API specifications for accurate selector and endpoint generation.',
          'Generated scripts need review for proper waits, assertions, and error handling.',
          'Start with smoke test scripts — high value, low complexity, immediately useful.'
        ]
      },
      {
        section: 'self-healing-test-selectors',
        label: 'Self-Healing Test Selectors',
        text: 'Fragile test selectors are the number one cause of test maintenance overhead. When a developer changes a CSS class or renames an ID, dozens of tests break even though the application behavior is unchanged. LLMs can generate resilient selectors and, more importantly, suggest self-healing strategies that adapt to UI changes without manual intervention.',
        mustknow: [
          'Fragile selectors (absolute XPath, generated IDs) are the top cause of test flakiness.',
          'Prefer data-testid attributes, ARIA labels, and semantic selectors over positional ones.',
          'LLMs can generate multiple fallback selectors for critical elements.',
          'Self-healing logic tries alternative selectors when the primary one fails.'
        ]
      },
      {
        section: 'visual-regression-with-llms',
        label: 'Visual Regression with LLMs',
        text: 'Visual regression testing catches UI changes that functional tests miss — shifted layouts, font changes, color mismatches, and broken responsive designs. LLMs with vision capabilities can compare screenshots and describe visual differences in human-readable terms. This is more useful than pixel-diff tools because the model can distinguish meaningful changes from harmless rendering variations.',
        mustknow: [
          'Visual regression catches layout, styling, and rendering issues that functional tests miss.',
          'LLMs with vision can describe visual changes in natural language, not just highlight pixels.',
          'Meaningful change detection reduces false positives that plague pixel-comparison tools.',
          'Combine visual regression with functional testing for comprehensive coverage.'
        ]
      },
      {
        section: 'api-test-automation',
        label: 'API Test Automation',
        text: 'API testing is often the highest-value automation target because APIs change less frequently than UIs and are faster to test. LLMs can generate API test suites from OpenAPI/Swagger specifications, Postman collections, or even API documentation. The generated tests cover positive scenarios, error codes, authentication, and payload validation — a comprehensive suite from a single specification.',
        mustknow: [
          'API tests are faster, more stable, and cheaper than UI tests — prioritize them.',
          'Provide the API specification (OpenAPI/Swagger) for the most accurate test generation.',
          'Generated tests should cover: happy path, error codes, authentication, and edge cases.',
          'Include response schema validation — not just status codes — in generated tests.'
        ]
      },
      {
        section: 'performance-test-scenarios',
        label: 'Performance Test Scenarios',
        text: 'Performance testing requires realistic load scenarios that mirror production usage patterns. LLMs can generate performance test scenarios by analyzing usage data, business requirements, and system architecture to create load profiles, ramp-up patterns, and stress scenarios. This is particularly valuable because most teams lack dedicated performance testing expertise.',
        mustknow: [
          'Performance scenarios need realistic user distributions, not just maximum load.',
          'Define key transactions, think times, and data volumes for each scenario.',
          'LLMs can generate JMeter, Gatling, or k6 test scripts from scenario descriptions.',
          'Include soak tests (sustained load) and spike tests (sudden bursts) in your suite.'
        ]
      },
      {
        section: 'test-maintenance-strategies',
        label: 'Test Maintenance Strategies',
        text: 'A test suite that is not maintained becomes a liability — flaky tests erode trust, outdated tests provide false confidence, and dead tests waste execution time. LLMs can help maintain test suites by identifying outdated tests, suggesting updates for changed requirements, and flagging redundant tests that can be consolidated. Maintenance is not glamorous, but it determines whether your test suite remains an asset.',
        mustknow: [
          'Review and maintain test suites every sprint — maintenance debt compounds quickly.',
          'LLMs can compare test cases against current requirements to flag outdated tests.',
          'Consolidate redundant tests that cover the same scenarios with different data.',
          'Track test failure rates — consistently failing tests need updating or removal.'
        ]
      }
    ],

    'ch13-rag-enterprise.html': [
      {
        section: 'why-rag-matters-for-analysts',
        label: 'Why RAG Matters for Analysts',
        text: 'Retrieval-Augmented Generation (RAG) solves the biggest limitation of LLMs for analyst work: they do not know your organization\'s specific documents, processes, and history. RAG connects LLMs to your internal knowledge bases, enabling questions like "What did the BRD for Project X say about authentication?" to get accurate, sourced answers. This transforms LLMs from generic tools into organization-specific assistants.',
        mustknow: [
          'RAG = Retrieval-Augmented Generation: fetch relevant documents, then generate answers.',
          'Without RAG, LLMs cannot access internal documents, wikis, or project history.',
          'RAG answers include source citations, enabling verification and trust.',
          'RAG is the foundation for building custom analyst assistants that know your organization.'
        ]
      },
      {
        section: 'building-a-knowledge-base',
        label: 'Building a Knowledge Base',
        text: 'A RAG system is only as good as its knowledge base. Building an effective knowledge base means collecting, cleaning, and organizing the documents your analysts need to reference — BRDs, SRS documents, test plans, process guides, and historical project documentation. The quality of your knowledge base determines the quality of every answer the system provides.',
        mustknow: [
          'Start with the documents analysts reference most frequently — that is your highest-value content.',
          'Include metadata (project name, date, author, document type) for better retrieval.',
          'Clean documents before ingestion — remove headers, footers, and formatting artifacts.',
          'Plan for regular updates — a stale knowledge base produces stale answers.'
        ]
      },
      {
        section: 'document-chunking-strategies',
        label: 'Document Chunking Strategies',
        text: 'Documents must be split into chunks for embedding and retrieval. Chunking strategy dramatically affects retrieval quality — chunks that are too small lose context, while chunks that are too large dilute relevance. For analyst documents, section-based chunking (splitting at headings) typically works best because requirements, test cases, and process steps are naturally organized by section.',
        mustknow: [
          'Chunk size of 500-1000 tokens works well for most analyst documents.',
          'Section-based chunking preserves document structure and context.',
          'Include overlap between chunks (10-20%) to avoid losing context at boundaries.',
          'Different document types may need different chunking strategies — one size does not fit all.'
        ]
      },
      {
        section: 'embedding-and-retrieval',
        label: 'Embedding and Retrieval',
        text: 'Embeddings convert text chunks into numerical vectors that capture semantic meaning. When a user asks a question, the question is also embedded, and the system retrieves chunks whose embeddings are closest to the question\'s embedding. Understanding this process helps you diagnose retrieval failures — if the system returns irrelevant results, the problem is in the embeddings, the chunking, or the query.',
        mustknow: [
          'Embeddings capture meaning — "user login" and "authentication" are close in embedding space.',
          'Popular embedding models: OpenAI text-embedding-3, Cohere embed, and open-source alternatives.',
          'Vector databases (Pinecone, Weaviate, ChromaDB) store and search embeddings efficiently.',
          'Retrieval quality depends on embedding model choice, chunk quality, and query formulation.'
        ]
      },
      {
        section: 'query-enhancement-techniques',
        label: 'Query Enhancement Techniques',
        text: 'Users rarely phrase questions in ways that match how documents are written. Query enhancement techniques rewrite, expand, or decompose user queries to improve retrieval results. LLMs themselves can enhance queries by generating synonyms, expanding abbreviations, and reformulating questions from multiple angles. This step is often the highest-leverage improvement in a RAG pipeline.',
        mustknow: [
          'Query expansion adds synonyms and related terms to improve recall.',
          'Hypothetical Document Embedding (HyDE) generates a hypothetical answer to improve retrieval.',
          'Query decomposition breaks complex questions into simpler sub-queries.',
          'Test query enhancement with real user questions to measure actual improvement.'
        ]
      },
      {
        section: 'evaluating-rag-quality',
        label: 'Evaluating RAG Quality',
        text: 'RAG systems must be evaluated on two dimensions: retrieval quality (did we find the right documents?) and generation quality (did we produce the right answer from those documents?). Without systematic evaluation, you cannot know whether your RAG system is trustworthy. Build evaluation datasets from real analyst questions and verified answers, and measure performance continuously.',
        mustknow: [
          'Evaluate retrieval and generation separately — they fail for different reasons.',
          'Retrieval metrics: precision (relevant results) and recall (found all relevant results).',
          'Generation metrics: faithfulness (answer matches sources) and relevance (answer addresses question).',
          'Build a test set of 50+ question-answer pairs from real analyst workflows.'
        ]
      },
      {
        section: 'enterprise-rag-architecture',
        label: 'Enterprise RAG Architecture',
        text: 'Scaling RAG from a prototype to an enterprise system requires addressing security, access control, scalability, and content freshness. Enterprise RAG must respect document-level permissions — an analyst should only get answers from documents they are authorized to view. Architecture decisions made at this stage determine whether your RAG system becomes a trusted enterprise tool or a security liability.',
        mustknow: [
          'Access control must filter results based on the user\'s document permissions.',
          'Content refresh pipelines keep the knowledge base current as documents change.',
          'Monitoring and logging are essential for audit trails and quality tracking.',
          'Start with a single team\'s documents before expanding to enterprise-wide deployment.'
        ]
      }
    ],

    'ch14-custom-assistants.html': [
      {
        section: 'beyond-one-off-prompts',
        label: 'Beyond One-Off Prompts',
        text: 'One-off prompts are useful for ad-hoc tasks, but the real power of LLMs emerges when you build persistent assistants that encode your workflows, domain knowledge, and quality standards. A custom assistant that knows your project\'s requirements format, testing standards, and communication preferences can be used by your entire team, multiplying the value of every prompt you have refined.',
        mustknow: [
          'Custom assistants encode institutional knowledge — they get smarter as you refine them.',
          'One well-built assistant serves the entire team, not just the analyst who built it.',
          'Assistants combine system prompts, tools, memory, and guardrails into a coherent workflow.',
          'Start with your team\'s most common, most time-consuming task as your first assistant.'
        ]
      },
      {
        section: 'designing-assistant-workflows',
        label: 'Designing Assistant Workflows',
        text: 'A well-designed assistant workflow breaks complex tasks into discrete steps, each with clear inputs, processing logic, and outputs. This modular design makes the assistant easier to build, test, and maintain. For analyst workflows like requirements-to-test-cases or BRD analysis, the workflow mirrors the steps you already follow manually — the assistant just executes them faster and more consistently.',
        mustknow: [
          'Map the manual workflow first — each step becomes a node in the assistant\'s workflow.',
          'Each step should have a single responsibility and clear success criteria.',
          'Include human review checkpoints at critical decision points.',
          'Design for failure — what happens when one step produces unexpected output?'
        ]
      },
      {
        section: 'multi-step-reasoning-chains',
        label: 'Multi-Step Reasoning Chains',
        text: 'Complex analyst tasks require multiple reasoning steps — extract requirements, classify them, identify gaps, generate test cases, prioritize. Multi-step chains connect these steps, passing output from one step as input to the next. Each step can use a different prompt, temperature, and even model, optimized for that specific sub-task. This produces better results than a single monolithic prompt.',
        mustknow: [
          'Break complex tasks into 3-5 focused steps rather than one massive prompt.',
          'Each step can use a different model and temperature optimized for that sub-task.',
          'Pass structured data (JSON) between steps for reliable parsing.',
          'Validate intermediate outputs before passing them to the next step.'
        ]
      },
      {
        section: 'tool-integration-patterns',
        label: 'Tool Integration Patterns',
        text: 'Assistants become truly powerful when they can use tools — reading files, querying databases, calling APIs, and writing outputs. Tool integration lets your assistant interact with the systems you already use: JIRA for backlog items, Confluence for documentation, test management tools for test cases, and email for stakeholder communication. This closes the loop between analysis and action.',
        mustknow: [
          'Common tools: file I/O, HTTP APIs, database queries, and document parsers.',
          'Define tool schemas clearly — the LLM needs to know what each tool does and its parameters.',
          'Validate tool inputs before execution — never let the LLM execute arbitrary commands.',
          'Start with read-only tools before adding tools that modify external systems.'
        ]
      },
      {
        section: 'memory-and-context-management',
        label: 'Memory and Context Management',
        text: 'Without memory, every interaction starts from scratch. Memory lets your assistant remember project context, user preferences, previous decisions, and accumulated knowledge. For analyst assistants, memory means the system knows your project\'s domain terminology, the requirements it has already analyzed, and the test cases it has generated — building context over time rather than losing it.',
        mustknow: [
          'Short-term memory: conversation history within a single session.',
          'Long-term memory: persistent storage of facts, preferences, and project context.',
          'Context window limits force you to summarize or compress long-term memory.',
          'Memory management is a design choice — decide what to remember and what to forget.'
        ]
      },
      {
        section: 'user-experience-design',
        label: 'User Experience Design',
        text: 'A powerful assistant with a poor interface will not be adopted. UX design for analyst assistants means clear input mechanisms, progress indicators for long tasks, well-formatted outputs, and the ability to modify or regenerate results. The goal is to make the assistant feel like a capable colleague, not a command-line tool that requires precise incantations to produce useful results.',
        mustknow: [
          'Provide templates and examples so users know what input format works best.',
          'Show progress on multi-step tasks — silence creates anxiety.',
          'Format output for immediate use — ready-to-paste user stories, test cases, or reports.',
          'Allow users to give feedback and regenerate specific sections, not the entire output.'
        ]
      },
      {
        section: 'deployment-and-monitoring',
        label: 'Deployment and Monitoring',
        text: 'Deploying an assistant means making it available, reliable, and observable. Monitoring tells you how the assistant is being used, where it fails, and how its quality changes over time. Without monitoring, you are flying blind — you will not know when model updates degrade quality, when users hit edge cases, or when the assistant\'s knowledge becomes outdated.',
        mustknow: [
          'Log all interactions for quality review, debugging, and continuous improvement.',
          'Monitor cost per interaction — unexpected spikes indicate prompt or loop issues.',
          'Track user satisfaction and task completion rates as quality metrics.',
          'Set up alerts for error rates, latency spikes, and cost anomalies.'
        ]
      }
    ],

    'ch15-evaluating-outputs.html': [
      {
        section: 'the-validation-imperative',
        label: 'The Validation Imperative',
        text: 'LLM output must be validated before it reaches stakeholders or enters production workflows. The consequences of unvalidated output range from embarrassing (a hallucinated requirement in a BRD) to dangerous (a fabricated test case that passes review and misses a critical bug). Validation is not an optional quality step — it is a professional obligation for any analyst using LLMs in their work.',
        mustknow: [
          'Unvalidated LLM output is a professional liability, not a time-saving shortcut.',
          'The cost of validation is always less than the cost of shipping incorrect deliverables.',
          'Establish validation criteria before generating output, not after reviewing it.',
          'Different output types need different validation approaches — one method does not fit all.'
        ]
      },
      {
        section: 'accuracy-metrics-for-text',
        label: 'Accuracy Metrics for Text',
        text: 'Measuring accuracy for generated text is harder than measuring it for code. Text can be factually correct but poorly structured, or well-written but inaccurate. For analyst deliverables, you need task-specific metrics: requirements completeness, test case coverage, classification accuracy, and summary fidelity. Defining these metrics upfront enables systematic quality tracking over time.',
        mustknow: [
          'Define accuracy metrics specific to each task — generic "quality" is not measurable.',
          'Requirements accuracy: completeness, correctness, consistency, and traceability.',
          'Test case accuracy: coverage, specificity, executability, and expected result correctness.',
          'Measure against human baselines — how does LLM output compare to expert output?'
        ]
      },
      {
        section: 'hallucination-detection',
        label: 'Hallucination Detection',
        text: 'Hallucinations — confident but false statements — are the most dangerous LLM failure mode for analysts. A hallucinated requirement, a fabricated stakeholder name, or a non-existent API endpoint in test data can pass casual review because the output looks plausible. Detection strategies include source verification, cross-reference checking, and using a second LLM call to fact-check the first.',
        mustknow: [
          'LLMs hallucinate more with obscure topics, specific numbers, and named entities.',
          'Cross-reference every factual claim against source documents.',
          'Use a second LLM call with instructions to verify claims against provided sources.',
          'Establish a "trust but verify" culture — treat all LLM output as draft until validated.'
        ]
      },
      {
        section: 'consistency-checking',
        label: 'Consistency Checking',
        text: 'Consistency across multiple LLM outputs is critical for professional deliverables. If your requirements document uses one term and your test cases use another, stakeholders lose confidence. LLMs can check their own outputs for internal consistency — terminology, formatting, numbering, and cross-references. Running a consistency check as a final step before delivery catches errors that human review often misses.',
        mustknow: [
          'Terminology consistency: the same concept should use the same term throughout.',
          'Format consistency: headers, numbering, and structure should follow a single pattern.',
          'Cross-reference consistency: IDs, names, and links should all resolve correctly.',
          'Run consistency checks across related documents, not just within a single output.'
        ]
      },
      {
        section: 'human-in-the-loop-validation',
        label: 'Human-in-the-Loop Validation',
        text: 'Human-in-the-loop (HITL) validation is not a fallback — it is a design requirement. The question is not whether to include human review, but where and how to make it efficient. Strategic placement of review checkpoints ensures human attention is focused on high-risk decisions while routine outputs flow through with lighter oversight. This balances quality with throughput.',
        mustknow: [
          'Place review checkpoints at high-risk decision points, not after every step.',
          'Provide reviewers with confidence scores to focus attention on uncertain outputs.',
          'Design review interfaces that make it easy to approve, modify, or reject.',
          'Track review outcomes to identify patterns — what the model gets right and wrong.'
        ]
      },
      {
        section: 'ab-testing-llm-workflows',
        label: 'A/B Testing LLM Workflows',
        text: 'A/B testing lets you compare two versions of a prompt, workflow, or model and measure which performs better. For analyst workflows, this means you can systematically improve quality over time by testing variations and keeping what works. Without A/B testing, prompt optimization is guesswork. With it, you have data-driven evidence for every change you make.',
        mustknow: [
          'Test one variable at a time — prompt wording, model, temperature, or output format.',
          'Define your evaluation metric before running the test, not after seeing results.',
          'Use at least 30-50 test cases for statistically meaningful comparisons.',
          'Document winning variations and the metrics that proved them superior.'
        ]
      },
      {
        section: 'building-trust-with-stakeholders',
        label: 'Building Trust with Stakeholders',
        text: 'Stakeholder trust in LLM-augmented deliverables must be earned through demonstrated quality, transparency, and gradual expansion. Start with low-risk deliverables where errors are easily caught, show the validation process, and build a track record of quality. Once stakeholders see consistent quality, they will actively request LLM-augmented analysis rather than resisting it.',
        mustknow: [
          'Start with low-risk tasks and expand as trust builds — do not lead with high-stakes deliverables.',
          'Be transparent about LLM involvement — hiding it erodes trust when discovered.',
          'Show your validation process — stakeholders trust the process, not just the output.',
          'Track and share quality metrics over time to demonstrate continuous improvement.'
        ]
      }
    ],

    'capstone-01.html': [
      {
        section: 'requirements-to-test-cases-pipeline',
        label: 'Requirements-to-Test-Cases Pipeline',
        text: 'This capstone brings together requirements analysis, user story generation, and test case design into a single end-to-end pipeline. You will build a tool that takes raw requirements as input and produces traceable, prioritized test cases as output. This is the workflow that delivers the most immediate value to BA/QA teams — it compresses days of manual work into minutes of automated processing with human review.',
        mustknow: [
          'The pipeline connects requirements extraction, story generation, and test case design.',
          'Traceability from requirement to test case is built into the pipeline by design.',
          'Each stage validates its input before processing — bad requirements produce bad tests.',
          'Human review checkpoints ensure quality at critical decision points in the pipeline.'
        ]
      }
    ],

    'capstone-02.html': [
      {
        section: 'automated-brd-analyzer',
        label: 'Automated BRD Analyzer',
        text: 'The BRD Analyzer is a practical tool that every BA can use immediately. It takes a Business Requirements Document as input and produces a comprehensive analysis: extracted requirements, ambiguity flags, gap identification, completeness scores, and stakeholder review questions. This capstone demonstrates how LLMs transform a multi-day manual review into a structured, repeatable analysis process.',
        mustknow: [
          'BRD analysis combines extraction, classification, ambiguity detection, and gap analysis.',
          'The analyzer produces actionable output: specific issues with locations and suggestions.',
          'Completeness scoring gives stakeholders a quantitative view of document quality.',
          'Generated review questions focus stakeholder attention on the areas that need it most.'
        ]
      }
    ],

    'capstone-03.html': [
      {
        section: 'intelligent-test-suite-generator',
        label: 'Intelligent Test Suite Generator',
        text: 'This capstone builds a test suite generator that goes beyond simple test case listing. It applies boundary value analysis, equivalence partitioning, and negative testing systematically across all requirements, then prioritizes the resulting test cases by risk and coverage contribution. The output is a complete, prioritized test suite with traceability — ready for review, not just a starting point.',
        mustknow: [
          'The generator applies BVA, equivalence partitioning, and negative testing systematically.',
          'Test cases are prioritized by risk, coverage contribution, and business criticality.',
          'Full traceability links every test case back to its source requirement.',
          'The output includes test data suggestions and execution sequence recommendations.'
        ]
      }
    ],

    'capstone-04.html': [
      {
        section: 'ai-powered-sprint-assistant',
        label: 'AI-Powered Sprint Assistant',
        text: 'The Sprint Assistant is the most ambitious capstone — a multi-tool assistant that supports analysts throughout a sprint. It can groom backlog items, generate test cases, analyze defect reports, draft status updates, and prepare sprint review materials. This capstone integrates every skill from the book into a single, deployable assistant that demonstrates the full potential of LLM-augmented analyst work.',
        mustknow: [
          'The Sprint Assistant combines backlog grooming, test generation, defect analysis, and reporting.',
          'Multi-tool architecture allows the assistant to handle diverse sprint activities.',
          'Memory and context management enable the assistant to learn sprint-specific details.',
          'This capstone is a portfolio project that demonstrates production-ready LLM engineering.'
        ]
      }
    ]
  };

  // ── Notebook mapping (chapter filename → notebook filename) ──
  var NOTEBOOKS = {
    'ch01-why-llms-matter.html': 'ch01-why-llms-matter.ipynb',
    'ch02-how-llms-work.html': 'ch02-how-llms-work.ipynb',
    'ch03-prompt-engineering.html': 'ch03-prompt-engineering.ipynb',
    'ch04-first-llm-workflow.html': 'ch04-first-llm-workflow.ipynb',
    'ch05-requirements-elicitation.html': 'ch05-requirements-elicitation.ipynb',
    'ch06-user-story-generation.html': 'ch06-user-story-generation.ipynb',
    'ch07-process-modeling.html': 'ch07-process-modeling.ipynb',
    'ch08-stakeholder-communication.html': 'ch08-stakeholder-communication.ipynb',
    'ch09-test-case-generation.html': 'ch09-test-case-generation.ipynb',
    'ch10-test-data-design.html': 'ch10-test-data-design.ipynb',
    'ch11-defect-analysis.html': 'ch11-defect-analysis.ipynb',
    'ch12-regression-testing.html': 'ch12-regression-testing.ipynb',
    'ch13-rag-enterprise.html': 'ch13-rag-enterprise.ipynb',
    'ch14-custom-assistants.html': 'ch14-custom-assistants.ipynb',
    'ch15-evaluating-outputs.html': 'ch15-evaluating-outputs.ipynb',
    'capstone-01.html': 'capstone-01-requirements-to-tests.ipynb',
    'capstone-02.html': 'capstone-02-brd-analyzer.ipynb',
    'capstone-03.html': 'capstone-03-test-suite-generator.ipynb',
    'capstone-04.html': 'capstone-04-sprint-assistant.ipynb'
  };

  var GITHUB_NOTEBOOKS_BASE = 'https://github.com/careeralign/careeralign.github.io/blob/main/llm-ba-qa/book/notebooks/';
  var COLAB_BASE = 'https://colab.research.google.com/github/careeralign/careeralign.github.io/blob/main/llm-ba-qa/book/notebooks/';

  // ── Notebook card builder ──
  function buildNotebookCard(chapter) {
    var nb = NOTEBOOKS[chapter];
    if (!nb) return '';
    var colabUrl = COLAB_BASE + nb;
    var githubUrl = GITHUB_NOTEBOOKS_BASE + nb;
    var html = '';
    html += '<div class="notebook-card">';
    html += '<div class="notebook-label">Companion Notebook</div>';
    html += '<div class="notebook-links">';
    html += '<a href="' + colabUrl + '" target="_blank" rel="noopener" class="notebook-link colab-link">';
    html += '<img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab">';
    html += '</a>';
    html += '<a href="' + githubUrl + '" target="_blank" rel="noopener" class="notebook-link github-link">View on GitHub</a>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ── Insight panel builder ──
  function buildInsightPanel(insights, chapter) {
    var html = '';
    html += '<div class="insight-header">';
    html += '<div class="insight-header-title">Why This Matters to You</div>';
    html += '<div class="insight-header-sub">Context as you read</div>';
    html += '</div>';
    html += '<div class="insight-body">';
    html += buildNotebookCard(chapter);

    for (var i = 0; i < insights.length; i++) {
      var ins = insights[i];
      html += '<div class="insight-card" data-section="' + ins.section + '">';
      html += '<div class="insight-section-label">' + ins.label + '</div>';
      html += '<div class="insight-text">' + ins.text + '</div>';
      if (ins.mustknow && ins.mustknow.length > 0) {
        html += '<div class="mustknow">';
        html += '<div class="mustknow-label">Things you must know</div>';
        html += '<ul>';
        for (var j = 0; j < ins.mustknow.length; j++) {
          html += '<li>' + ins.mustknow[j] + '</li>';
        }
        html += '</ul>';
        html += '</div>';
      }
      html += '</div>';
    }

    html += '<div class="insight-empty">Scroll through the chapter to see section insights.</div>';
    html += '</div>';
    return html;
  }

  // ── Helper functions ──
  function slugify(text) {
    return text.toLowerCase()
      .replace(/['']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function getCurrentChapter() {
    return window.location.pathname.split('/').pop() || '';
  }

  function generateInsightsFromPage() {
    var headings = document.querySelectorAll('h2');
    var insights = [];
    headings.forEach(function (h2) {
      var text = h2.textContent.trim();
      // Skip Project and Summary headings
      if (text.match(/^Project:|^Summary$/)) return;
      var slug = slugify(text.replace(/^\d+\.\d+\s*/, ''));
      var label = text.replace(/^\d+\.\d+\s*/, '');
      insights.push({
        section: slug,
        label: label,
        text: 'This section covers ' + label.toLowerCase() + '. Pay close attention to the key concepts and how they connect to the patterns you have learned in previous chapters. Understanding this material is essential for the chapter project and the capstone applications.',
        mustknow: []
      });
    });
    return insights;
  }

  function injectInsightPanel() {
    var chapter = getCurrentChapter();

    // Don't add insight panel to index page
    if (chapter === 'index.html' || chapter === '') return;

    // Get insights — from data or auto-generate
    var insights = INSIGHTS[chapter];
    if (!insights || insights.length === 0) {
      insights = generateInsightsFromPage();
    }
    if (insights.length === 0) return;

    // Add has-insights class to body
    document.body.classList.add('has-insights');

    // Create panel
    var panel = document.createElement('aside');
    panel.className = 'insight-panel';
    panel.innerHTML = buildInsightPanel(insights, chapter);
    document.body.appendChild(panel);

    // Setup scroll spy for insight cards
    setupInsightScrollSpy();
  }

  // ── Scroll spy with auto-ID assignment from insight keys ──
  function setupInsightScrollSpy() {
    var cards = document.querySelectorAll('.insight-card');
    if (cards.length === 0) return;

    var cardMap = {};
    cards.forEach(function (card) {
      cardMap[card.dataset.section] = card;
    });

    // Auto-assign IDs to h2 elements using insight section keys (matched by order)
    // This ensures IDs match the insight data even when headings have subtitles
    var chapter = getCurrentChapter();
    var chapterInsights = INSIGHTS[chapter];
    if (chapterInsights && chapterInsights.length > 0) {
      var sectionIndex = 0;
      document.querySelectorAll('h2').forEach(function (h2) {
        var text = h2.textContent.trim();
        // Skip Project and Summary headings — they don't have insight entries
        if (text.match(/^Project:|^Summary$/)) return;
        if (sectionIndex < chapterInsights.length) {
          h2.id = chapterInsights[sectionIndex].section;
          sectionIndex++;
        }
      });
    } else {
      // Fallback: generate IDs from heading text
      document.querySelectorAll('h2').forEach(function (h2) {
        if (!h2.id) {
          h2.id = slugify(h2.textContent.trim().replace(/^\d+\.\d+\s*/, ''));
        }
      });
    }

    // Collect all h2 elements with IDs
    var headings = [];
    document.querySelectorAll('h2[id]').forEach(function (h2) {
      headings.push({ id: h2.id, top: h2.offsetTop });
    });

    if (headings.length === 0) return;

    var currentId = null;

    function updateInsight() {
      var scrollY = window.scrollY + window.innerHeight * 0.2;
      var activeId = headings[0].id;

      for (var i = headings.length - 1; i >= 0; i--) {
        if (headings[i].top <= scrollY) {
          activeId = headings[i].id;
          break;
        }
      }

      if (activeId !== currentId) {
        currentId = activeId;
        cards.forEach(function (card) {
          if (card.dataset.section === activeId) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        });
      }
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateInsight();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Show first card initially
    updateInsight();
  }

  // ── Initialize ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectInsightPanel);
  } else {
    injectInsightPanel();
  }
})();
