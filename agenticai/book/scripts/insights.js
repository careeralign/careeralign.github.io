/**
 * Agentic AI: Build, Ship, Portfolio — Insight Panel
 * Dynamically injects "Why This Matters to You" right panel with contextual
 * summaries and "Things You Must Know" for each section, like the AIEA book.
 */
(function () {
  'use strict';

  // ── Insight data per chapter ──
  // Keys are chapter file names, values are arrays of section insights.
  var INSIGHTS = {
    'ch01-what-is-agentic-ai.html': [
      {
        section: 'the-chatbot-that-couldnt-act',
        label: 'The Chatbot That Couldn\'t Act',
        text: 'This failure scenario is not hypothetical — it plays out every time a team ships a stateless chatbot and wonders why users abandon it. The gap between "can answer questions" and "can get things done" is the gap between a language model and an agent. Understanding this distinction before you write a line of code will save you months of building the wrong thing.',
        mustknow: [
          'Chatbots that only generate text cannot take actions or maintain state.',
          'Users expect AI systems to do things, not just say things.',
          'The jump from chat to agent requires perception, memory, reasoning, and action.',
          'Most production AI failures stem from building chatbots when agents were needed.'
        ]
      },
      {
        section: 'defining-agency',
        label: 'Defining Agency',
        text: 'Having a precise definition of agency prevents scope creep and miscommunication. When a stakeholder says "we need an AI agent," they might mean anything from a smarter chatbot to a fully autonomous system. Your job is to pin down where on the autonomy spectrum the project should sit — and that conversation starts here.',
        mustknow: [
          'Agency = autonomous goal pursuit with perception, reasoning, and action.',
          'Not every AI system is an agent — classification matters for architecture.',
          'The degree of autonomy is a design choice, not a fixed property.',
          'More autonomy means more capability but also more risk to manage.'
        ]
      },
      {
        section: 'the-autonomy-spectrum',
        label: 'The Autonomy Spectrum',
        text: 'This spectrum is the most important mental model in the book. Every architecture decision you make — how much control to give the LLM, whether to add human approval gates, how to handle errors — maps back to where your system sits on this spectrum. Bookmark this section and return to it whenever you are scoping a new project.',
        mustknow: [
          'Scripts are deterministic with zero autonomy — fixed input, fixed output.',
          'Chains add LLM flexibility but follow predetermined paths.',
          'Agents choose their own actions based on observations and goals.',
          'Multi-agent systems coordinate multiple autonomous agents.',
          'Start lower on the spectrum and add autonomy only when needed.'
        ]
      },
      {
        section: 'why-now-the-llm-inflection-point',
        label: 'Why Now?',
        text: 'Understanding why agents became viable in 2023-2024 and not before helps you evaluate which capabilities are mature and which are still experimental. The three enablers — instruction following, tool use, and long context — each unlocked a different part of the agent architecture. Knowing which enabler your project depends on tells you where the risks are.',
        mustknow: [
          'Instruction following made LLMs reliable enough to be agent cores.',
          'Native tool/function calling gave agents hands to interact with the world.',
          'Long context windows enabled agents to maintain conversation state.',
          'These capabilities matured simultaneously, creating the agent moment.'
        ]
      },
      {
        section: 'agentic-vs-non-agentic',
        label: 'Agentic vs. Non-Agentic',
        text: 'This comparison is your decision framework for every new project. Before reaching for an agent framework, ask: does this problem actually require autonomous decision-making? Many excellent AI products are non-agentic — and that is fine. The cost of unnecessary agency is complexity, latency, and unpredictability.',
        mustknow: [
          'Non-agentic AI (RAG, classification, generation) solves many problems well.',
          'Agents add value when tasks require multi-step reasoning and tool use.',
          'Agent overhead includes latency, cost, observability, and safety concerns.',
          'Choose the simplest architecture that solves the actual problem.'
        ]
      },
      {
        section: 'the-anatomy-of-an-agent',
        label: 'Agent Anatomy',
        text: 'These four components — perception, memory, reasoning, action — appear in every agent you will ever build. When an agent fails in production, the root cause always traces back to one of these four. Learning to diagnose which component is failing is the most valuable debugging skill in agentic AI.',
        mustknow: [
          'Every agent has four components: perception, memory, reasoning, action.',
          'The LLM serves as the reasoning core — it does not do everything.',
          'Memory separates agents from stateless chatbots.',
          'Tools (action) are what give agents real-world impact.'
        ]
      },
      {
        section: 'real-world-agentic-systems',
        label: 'Real-World Systems',
        text: 'These examples prove that agentic AI is not theoretical — production systems exist today across industries. Study the architecture choices each example made: where they placed human oversight, which tools they exposed, how they handle failures. These patterns will directly inform your own designs.',
        mustknow: [
          'Coding agents (Copilot, Cursor) are the most mature agentic systems.',
          'Customer support agents combine RAG, memory, and escalation.',
          'Research agents coordinate multiple specialists with a supervisor.',
          'Every production agent has human-in-the-loop as a safety net.'
        ]
      },
      {
        section: 'the-agency-tax',
        label: 'The Agency Tax',
        text: 'This is the section that separates engineers who ship agents from those who just prototype them. Every autonomous capability has a cost: latency, token spend, debugging difficulty, safety risk. The agency tax is not a reason to avoid agents — it is a budget you must plan for. Teams that ignore it discover it in production.',
        mustknow: [
          'More autonomy means higher latency, cost, and unpredictability.',
          'Observability costs increase dramatically with agent complexity.',
          'Safety and guardrails are not optional — they are architecture requirements.',
          'Budget for the agency tax upfront or pay it as technical debt later.'
        ]
      }
    ],

    'ch02-llm-primitives.html': [
      {
        section: 'tokens-and-tokenization',
        label: 'Tokens and Tokenization',
        text: 'Tokens are the atoms of every LLM interaction. Every cost estimate, context window calculation, and latency prediction starts with token counts. Engineers who do not understand tokenization consistently underestimate costs and hit context limits in production.',
        mustknow: [
          'One token is roughly 4 characters or 0.75 words in English.',
          'Tokenization varies by model — the same text produces different token counts.',
          'Context window limits are measured in tokens, not characters or words.',
          'Token count directly determines API cost and response latency.'
        ]
      },
      {
        section: 'the-completion-api',
        label: 'The Completion API',
        text: 'The completion API is the single interface your agent uses to think. Every agent framework — LangChain, LangGraph, CrewAI — is ultimately a wrapper around this API call. Understanding it at the raw level means you can debug any framework and build without one when needed.',
        mustknow: [
          'Every LLM interaction is a completion request — input tokens in, output tokens out.',
          'The messages array (system, user, assistant) is how you shape behavior.',
          'API responses include usage metadata critical for cost tracking.',
          'You can build a complete agent using nothing but the completion API and a loop.'
        ]
      },
      {
        section: 'system-user-and-assistant-messages',
        label: 'Message Roles',
        text: 'The three message roles are your primary control mechanism. System messages set personality and constraints, user messages provide input, and assistant messages establish patterns. Mastering how these interact is how you go from "the LLM sort of does what I want" to precise, reliable behavior.',
        mustknow: [
          'System messages set behavior, constraints, and persona — they persist across turns.',
          'Few-shot examples via user/assistant pairs are more reliable than instructions.',
          'Message order matters — recent messages have stronger influence.',
          'Keep system prompts focused; long system prompts dilute instructions.'
        ]
      },
      {
        section: 'temperature-top-p-and-sampling',
        label: 'Temperature and Sampling',
        text: 'Temperature is the most misunderstood parameter in LLM development. It does not make the model "smarter" or "dumber" — it adjusts the probability distribution over the vocabulary. For agents, low temperature (0.0-0.2) is almost always correct because you want deterministic tool selection and consistent reasoning.',
        mustknow: [
          'Temperature 0 = greedy decoding = most deterministic output.',
          'For agents and tool calling, use temperature 0.0-0.2.',
          'Higher temperature increases creativity but also hallucination risk.',
          'Never set both temperature and top_p — adjust one, leave the other default.'
        ]
      },
      {
        section: 'streaming',
        label: 'Streaming',
        text: 'Streaming transforms user experience from "waiting for a wall of text" to "watching the agent think in real time." For agents, streaming is also an observability tool — you can see what the model is generating before the full response arrives, which is critical for catching runaway generations early.',
        mustknow: [
          'Streaming returns tokens as they are generated, reducing perceived latency.',
          'Tool calls during streaming require buffering until the call is complete.',
          'Streaming is essential for any user-facing agent interaction.',
          'Server-Sent Events (SSE) is the standard transport for streaming.'
        ]
      },
      {
        section: 'tool-and-function-calls',
        label: 'Tool and Function Calls',
        text: 'This is the capability that makes agents possible. Without tool calling, an LLM can only generate text. With it, the LLM can search databases, call APIs, run code, and interact with the world. Every agent you build in this book depends on this mechanism.',
        mustknow: [
          'Tool calling lets the LLM request execution of external functions.',
          'Tools are defined as JSON schemas — the LLM never sees your code.',
          'The LLM generates structured arguments; your code executes the function.',
          'Tool results are fed back to the LLM as context for the next step.',
          'Parallel tool calling allows multiple function calls in a single response.'
        ]
      },
      {
        section: 'structured-outputs',
        label: 'Structured Outputs',
        text: 'Structured outputs solve the "parsing problem" that plagues agent systems. Instead of hoping the LLM returns valid JSON and writing fragile regex parsers, structured outputs guarantee the response matches your schema. This single feature eliminates an entire class of production bugs.',
        mustknow: [
          'Structured outputs guarantee JSON conforming to your schema.',
          'Use Pydantic models to define output schemas in Python.',
          'Structured outputs eliminate parsing errors in agent pipelines.',
          'Not all models support structured outputs — check compatibility.'
        ]
      },
      {
        section: 'rate-limits-and-error-handling',
        label: 'Rate Limits',
        text: 'Rate limits are the most common production failure mode for agents. An agent that makes 10 tool calls per task can exhaust your rate limit in minutes under load. Exponential backoff with jitter is not optional — it is required infrastructure.',
        mustknow: [
          'Rate limits are per-minute and per-day, on both tokens and requests.',
          'Agents amplify rate limit risk because each task makes multiple API calls.',
          'Implement exponential backoff with jitter on every API call.',
          'Monitor rate limit headers to proactively throttle before hitting limits.'
        ]
      },
      {
        section: 'cost-optimization',
        label: 'Cost Optimization',
        text: 'LLM costs scale with usage in ways that surprise teams accustomed to fixed infrastructure costs. An agent processing 1,000 tasks per day at $0.05 per task is $18,000 per year — and that is before accounting for retries, verbose prompts, and multi-step reasoning chains. Cost awareness must be built into your agent architecture from day one.',
        mustknow: [
          'Input tokens are cheaper than output tokens — keep prompts concise.',
          'Caching identical prompts can reduce costs by 50-90%.',
          'Use smaller models for simple tasks, larger models only for complex reasoning.',
          'Track cost per task, not just cost per API call.'
        ]
      }
    ],

    'ch03-agent-anatomy.html': [
      {
        section: 'the-failure-that-teaches',
        label: 'The Failure That Teaches',
        text: 'This refund agent disaster is a pattern you will see repeatedly: teams expose powerful tools to an LLM without the architectural safeguards to prevent misuse. The lesson is not "don\'t build agents" — it is "every agent needs all four pillars or it will fail in a way that costs real money."',
        mustknow: [
          'Missing components cause catastrophic failures, not graceful degradation.',
          'An agent without proper memory will repeat expensive mistakes.',
          'An agent without perception cannot detect when its actions are failing.',
          'Production agents need all four pillars: perception, memory, reasoning, action.'
        ]
      },
      {
        section: 'the-four-pillars',
        label: 'The Four Pillars',
        text: 'This is the architectural blueprint every agent follows. When designing a new agent, start by mapping each pillar to concrete components. When debugging a failing agent, check each pillar systematically. This framework converts vague "the agent isn\'t working" into specific, actionable diagnoses.',
        mustknow: [
          'Perception: how the agent receives and interprets information.',
          'Memory: how the agent retains context across interactions.',
          'Reasoning: how the agent plans, decides, and thinks step-by-step.',
          'Action: how the agent affects the world through tools and outputs.'
        ]
      },
      {
        section: 'how-the-pillars-interact',
        label: 'How Pillars Interact',
        text: 'The agent loop — perceive, remember, reason, act, repeat — is the runtime pattern that ties everything together. Understanding this loop at the implementation level is what separates people who use agent frameworks from people who can build and debug them.',
        mustknow: [
          'The agent loop runs continuously: perceive → remember → reason → act.',
          'Each iteration may invoke multiple tools before the next reasoning step.',
          'The loop terminates when the agent determines the goal is met.',
          'Failures in one pillar cascade to all others — diagnose systematically.'
        ]
      },
      {
        section: 'the-llm-as-the-reasoning-core',
        label: 'LLM as Reasoning Core',
        text: 'The LLM is powerful but it is not magic. It cannot access databases, call APIs, or remember previous conversations on its own. Your architecture must provide these capabilities through the other three pillars. Teams that expect the LLM to do everything build fragile systems that fail unpredictably.',
        mustknow: [
          'The LLM provides reasoning — everything else is your architecture.',
          'LLMs are stateless — memory must be externally managed.',
          'LLMs cannot access the internet or databases without tools you provide.',
          'The quality of your tools and memory directly determines agent quality.'
        ]
      },
      {
        section: 'the-tool-belt-concept',
        label: 'The Tool Belt',
        text: 'Think of tools as the agent\'s hands. A static tool belt gives the agent a fixed set of capabilities. A dynamic tool belt loads tools based on the current task. Choosing between static and dynamic is an architecture decision with major implications for complexity, security, and capability.',
        mustknow: [
          'Static tool belts are simpler, more secure, and easier to test.',
          'Dynamic tool belts enable agents to handle a wider range of tasks.',
          'Tool descriptions are the primary way the LLM decides which tool to use.',
          'Poor tool descriptions cause more failures than poor tool implementations.'
        ]
      },
      {
        section: 'memory-stores-in-depth',
        label: 'Memory Stores',
        text: 'Memory architecture is where most agent projects underinvest. A buffer that holds the last N messages is table stakes. Production agents need vector stores for long-term recall, episodic memory for learning from past interactions, and summary memory to compress long conversations without losing critical context.',
        mustknow: [
          'Buffer memory is simplest but loses context as conversations grow.',
          'Vector stores enable semantic search over long-term agent memory.',
          'Episodic memory records what worked and what failed — agents learn from it.',
          'Most production agents need at least two memory types working together.'
        ]
      },
      {
        section: 'planning-strategies',
        label: 'Planning Strategies',
        text: 'Reactive agents respond to each observation independently. Deliberative agents plan multiple steps ahead. Hybrid agents plan but can adapt when things change. Choosing the right planning strategy depends on task complexity, time constraints, and how predictable the environment is.',
        mustknow: [
          'Reactive planning: respond to each observation independently. Fast but myopic.',
          'Deliberative planning: create a multi-step plan before acting. Slower but strategic.',
          'Hybrid planning: plan ahead but replan when observations invalidate the plan.',
          'More complex tasks require more deliberative planning.'
        ]
      },
      {
        section: 'the-agent-loop-in-code',
        label: 'Agent Loop in Code',
        text: 'This minimal implementation shows that an agent is, at its core, a while loop calling an LLM. Every framework — LangGraph, CrewAI, AutoGen — wraps this same pattern in different abstractions. When those abstractions break, you need to understand the loop underneath.',
        mustknow: [
          'An agent is fundamentally a loop: prompt LLM → parse response → execute tools → repeat.',
          'The loop needs explicit termination conditions to prevent infinite execution.',
          'Error handling in the loop determines whether agents recover or spiral.',
          'Understanding this loop lets you debug any agent framework.'
        ]
      },
      {
        section: 'structural-failure-modes',
        label: 'Failure Modes',
        text: 'This diagnostic table is your troubleshooting checklist. Print it and keep it next to your monitor. When an agent fails in production, walk through each failure mode systematically instead of guessing. The root cause is almost always one of these eight patterns.',
        mustknow: [
          'Tool selection failures are the most common agent failure mode.',
          'Memory overflow causes agents to lose critical context silently.',
          'Infinite loops occur when termination conditions are too loose.',
          'Most failures are diagnosable if you have proper observability in place.'
        ]
      }
    ],

    'ch04-first-agent.html': [
      {
        section: 'the-failure-that-teaches-everything',
        label: 'The Failure That Teaches',
        text: 'This example of a naive agent hallucinating answers instead of using tools is the single most common failure pattern in agent development. The fix — forcing the model to reason before acting — is the core insight of the ReAct pattern and the foundation for everything else in this book.',
        mustknow: [
          'Without explicit reasoning steps, LLMs default to generating plausible-sounding answers.',
          'Hallucinated answers are confident and convincing — they fool users and developers.',
          'The ReAct pattern fixes this by requiring observation before response.',
          'Always test agents with questions that require tool use to answer correctly.'
        ]
      },
      {
        section: 'react-reasoning--acting',
        label: 'ReAct Pattern',
        text: 'ReAct (Reasoning + Acting) is the most important single pattern in this book. It solves the fundamental problem of LLMs acting without thinking. By interleaving thought and action, the agent can plan, execute, observe results, and adjust — just like a human solving a problem step by step.',
        mustknow: [
          'ReAct alternates between thinking (reasoning) and doing (acting).',
          'The thought step makes the agent\'s decision process transparent and debuggable.',
          'ReAct dramatically reduces hallucination compared to direct prompting.',
          'This pattern is the foundation for every agent framework in the ecosystem.'
        ]
      },
      {
        section: 'the-observe-think-act-loop',
        label: 'Observe-Think-Act Loop',
        text: 'The three phases of each ReAct iteration are your debugging framework. When an agent fails: Did it observe correctly (perception)? Did it think correctly (reasoning)? Did it act correctly (tool use)? This decomposition turns opaque failures into specific, fixable problems.',
        mustknow: [
          'Observe: gather information from tool results and environment.',
          'Think: reason about what to do next given observations.',
          'Act: execute a tool or deliver a final answer.',
          'Log all three phases — they are your primary debugging tool.'
        ]
      },
      {
        section: 'building-a-react-agent-from-scratch',
        label: 'Building from Scratch',
        text: 'Building a ReAct agent without frameworks is the most important exercise in this book. It gives you an irreplaceable understanding of what frameworks like LangGraph actually do. When frameworks produce mysterious errors — and they will — this understanding is what lets you diagnose and fix them.',
        mustknow: [
          'A ReAct agent needs: an LLM client, a tool registry, a prompt template, and a loop.',
          'The prompt must explicitly instruct the model to think before acting.',
          'Parse the model\'s output to extract thoughts, tool calls, and final answers.',
          'Start simple — add complexity only when you hit a specific limitation.'
        ]
      },
      {
        section: 'stopping-conditions',
        label: 'Stopping Conditions',
        text: 'Agents without proper stopping conditions are the number one cause of runaway API costs. A single stuck agent can burn through hundreds of dollars in minutes. Every production agent needs at least three independent stopping conditions: explicit completion, iteration limit, and token budget.',
        mustknow: [
          'Always set a maximum iteration count — never rely solely on the LLM to stop.',
          'Token budgets prevent cost overruns from verbose reasoning chains.',
          'Stuck detection catches agents repeating the same actions in a loop.',
          'Log which stopping condition triggered — it reveals agent behavior patterns.'
        ]
      },
      {
        section: 'error-recovery',
        label: 'Error Recovery',
        text: 'Tool failures are inevitable in production — APIs go down, rate limits hit, data is malformed. An agent that crashes on the first error is useless. An agent that retries intelligently, tries alternative tools, and gracefully degrades is production-ready. Error recovery is not a nice-to-have; it is a core capability.',
        mustknow: [
          'Feed tool errors back to the LLM as observations — let it reason about recovery.',
          'Implement exponential backoff for transient failures.',
          'Provide fallback tools for critical capabilities.',
          'Set a maximum retry count per tool to prevent infinite retry loops.'
        ]
      },
      {
        section: 'why-build-without-frameworks-first',
        label: 'Why No Frameworks First',
        text: 'This section explains why we delayed introducing LangGraph and other frameworks. Engineers who start with frameworks without understanding the underlying mechanics are permanently limited. They can use the framework but cannot extend it, debug it, or know when to abandon it for a simpler approach.',
        mustknow: [
          'Frameworks are abstractions over the ReAct loop — understand the loop first.',
          'Framework debugging requires understanding what the framework is doing underneath.',
          'Many production agents do not need a framework — a simple loop suffices.',
          'Framework knowledge becomes powerful only when layered on foundational understanding.'
        ]
      },
      {
        section: 'making-it-configurable',
        label: 'Making It Configurable',
        text: 'A configurable agent is a reusable agent. By parameterizing the tools, prompts, and stopping conditions, you turn a one-off script into a framework you can deploy across domains. This is exactly the architecture the project variants use — same agent core, different tools and prompts per domain.',
        mustknow: [
          'Separate agent logic from domain-specific tools and prompts.',
          'Use configuration objects or dependency injection for tools and settings.',
          'Configurable agents can be deployed across domains without code changes.',
          'This pattern is the foundation of the variant system used throughout the book.'
        ]
      }
    ],

    'ch05-reasoning-patterns.html': [
      {
        section: 'when-direct-prompting-breaks',
        label: 'When Direct Prompting Breaks',
        text: 'This section demonstrates that LLMs fail predictably on multi-step problems when forced to answer in a single shot. Recognizing when a task requires reasoning — and choosing the right reasoning pattern — is what separates agents that work from agents that hallucinate.',
        mustknow: [
          'Direct prompting fails on tasks requiring more than one logical step.',
          'The failure is systematic, not random — the same types of problems always fail.',
          'Adding "let\'s think step by step" can improve accuracy by 20-40%.',
          'Reasoning patterns are a reliability tool, not a performance optimization.'
        ]
      },
      {
        section: 'chain-of-thought-prompting',
        label: 'Chain-of-Thought',
        text: 'Chain-of-Thought is the simplest reasoning pattern and should be your default starting point. It works by making the model show its work — just like a student solving a math problem. The reasoning steps are not just for accuracy; they are your primary debugging tool when the agent reaches wrong conclusions.',
        mustknow: [
          'Zero-shot CoT: add "think step by step" to any prompt for instant improvement.',
          'Few-shot CoT: provide worked examples for domain-specific reasoning.',
          'CoT makes reasoning visible and debuggable — critical for production.',
          'CoT increases token usage — budget for 2-5x more output tokens.'
        ]
      },
      {
        section: 'tree-of-thought-reasoning',
        label: 'Tree-of-Thought',
        text: 'Tree-of-Thought extends CoT by exploring multiple reasoning paths and pruning dead ends. It is dramatically more expensive but solves problems that linear reasoning cannot. Use it sparingly — for high-stakes decisions where correctness matters more than speed or cost.',
        mustknow: [
          'ToT generates multiple reasoning branches and evaluates each one.',
          'Pruning eliminates unpromising branches early to control costs.',
          'ToT costs 5-20x more than CoT — reserve for high-value decisions.',
          'Combine ToT with self-evaluation for the most reliable results.'
        ]
      },
      {
        section: 'self-consistency',
        label: 'Self-Consistency',
        text: 'Self-consistency is the easiest way to improve agent reliability without changing your prompts. Run the same query multiple times, take the majority vote, and you get more consistent results. It is particularly powerful for classification and extraction tasks where the answer should be deterministic.',
        mustknow: [
          'Generate 3-5 responses and take the majority vote.',
          'Self-consistency reduces variance without changing the prompt.',
          'Disagreement between runs is a signal that the task needs a better approach.',
          'Cost scales linearly with the number of runs — typically 3-5x baseline.'
        ]
      },
      {
        section: 'reflection-and-self-critique',
        label: 'Reflection',
        text: 'Teaching agents to critique their own output before returning it is one of the highest-impact patterns you can implement. A single reflection step catches obvious errors, improves formatting, and fills gaps — turning a "pretty good" response into a polished one.',
        mustknow: [
          'Reflection adds a critique step: generate → evaluate → revise.',
          'The critique prompt should list specific quality criteria to check.',
          'One reflection pass catches most errors; diminishing returns after two.',
          'Reflection doubles token cost but dramatically improves output quality.'
        ]
      },
      {
        section: 'reasoning-improves-tool-selection',
        label: 'Reasoning and Tools',
        text: 'Reasoning patterns do not just improve text generation — they fundamentally improve tool selection and planning. An agent that thinks before acting chooses better tools, constructs better queries, and sequences actions more effectively. This is where reasoning patterns have their biggest impact in agent systems.',
        mustknow: [
          'CoT before tool selection reduces incorrect tool calls by 30-50%.',
          'Reasoning helps agents decompose complex tasks into tool-appropriate subtasks.',
          'Plan-then-execute outperforms reactive tool calling on multi-step tasks.',
          'Always log the reasoning step — it explains why the agent chose each tool.'
        ]
      },
      {
        section: 'choosing-a-reasoning-strategy',
        label: 'Choosing a Strategy',
        text: 'This decision framework prevents over-engineering. Most tasks need only zero-shot CoT. A few need few-shot CoT or self-consistency. Tree-of-Thought and full reflection are reserved for high-stakes, complex reasoning. Start simple, measure accuracy, and escalate only when the simpler approach fails.',
        mustknow: [
          'Default to zero-shot CoT — it works for 70% of agent reasoning tasks.',
          'Add few-shot examples when domain-specific reasoning is needed.',
          'Use self-consistency when reliability matters more than latency.',
          'Reserve ToT for problems where CoT consistently produces wrong answers.'
        ]
      }
    ],

    'ch06-tool-use.html': [
      {
        section: 'the-hallucination-problem',
        label: 'The Hallucination Problem',
        text: 'This failure scenario — an agent confidently fabricating order statuses — is the canonical argument for tool use. Without tools, an LLM can only generate text from its training data. With tools, it can query real databases, call real APIs, and return real answers. Tool use is what makes the difference between a toy and a product.',
        mustknow: [
          'LLMs hallucinate facts when they lack access to real data sources.',
          'Tools ground agent responses in verified, real-time information.',
          'Users cannot distinguish hallucinated answers from correct ones.',
          'Every agent that returns factual data needs tools — no exceptions.'
        ]
      },
      {
        section: 'the-function-calling-protocol',
        label: 'Function Calling Protocol',
        text: 'Function calling is the API mechanism that enables tool use. The LLM does not execute code — it generates a structured request saying "call this function with these arguments." Your code executes the function and returns the result. Understanding this separation is critical for security and debugging.',
        mustknow: [
          'The LLM generates tool call requests — it never executes code directly.',
          'Tool definitions are JSON schemas describing name, parameters, and descriptions.',
          'The model selects tools based on descriptions, not implementation details.',
          'Tool call results are fed back as context for the next reasoning step.'
        ]
      },
      {
        section: 'tool-definitions-json-schema',
        label: 'Tool Definitions',
        text: 'Tool definitions are the interface contract between your agent and its capabilities. A poorly written tool description causes more failures than buggy tool code. The model reads the description to decide when and how to use the tool — if the description is ambiguous, the model will misuse it.',
        mustknow: [
          'Tool descriptions are the primary way the LLM decides which tool to use.',
          'Include what the tool does, when to use it, and what it returns.',
          'Parameter descriptions should include valid ranges and formats.',
          'Test tool descriptions by asking the LLM to explain when it would use each tool.'
        ]
      },
      {
        section: 'tool-registry-architecture',
        label: 'Tool Registry',
        text: 'A tool registry is the organizational pattern that scales tool management from 3 tools to 300. It centralizes tool definitions, enables auto-discovery, supports tagging and filtering, and provides a single point for validation and security checks. Every production agent system needs one.',
        mustknow: [
          'Registries centralize tool definitions, validation, and discovery.',
          'Use decorators or auto-registration to reduce boilerplate.',
          'Tag tools by category so agents can dynamically load relevant subsets.',
          'The registry is also your audit point for tool access control.'
        ]
      },
      {
        section: 'the-dispatcher',
        label: 'The Dispatcher',
        text: 'The dispatcher is the bridge between the LLM\'s tool call request and your actual function execution. It handles lookup, argument validation, execution, error handling, and result serialization. A well-built dispatcher is the difference between an agent that crashes on malformed tool calls and one that recovers gracefully.',
        mustknow: [
          'Dispatchers validate arguments before executing tools.',
          'Always catch and serialize tool execution errors — never let them crash the agent.',
          'Confirmation gates in the dispatcher enable human-in-the-loop for sensitive tools.',
          'Log every tool dispatch for observability and debugging.'
        ]
      },
      {
        section: 'result-parsing',
        label: 'Result Parsing',
        text: 'Tool results can be massive — a database query might return thousands of rows, an API call might return deeply nested JSON. Feeding raw results to the LLM wastes tokens and confuses the model. Result parsing — truncation, projection, summarization — is essential for keeping agents efficient and focused.',
        mustknow: [
          'Truncate large results to fit within token budgets.',
          'Project only relevant fields from complex data structures.',
          'Paginate results and let the agent request more if needed.',
          'Always include metadata (row count, truncation notice) so the agent knows what it is missing.'
        ]
      },
      {
        section: 'dynamic-tool-selection',
        label: 'Dynamic Tool Selection',
        text: 'As your agent accumulates dozens of tools, you cannot include all of them in every request — it wastes tokens and confuses the model. Dynamic tool selection loads only relevant tools based on the current task, using tags, embeddings, or a two-stage selection process.',
        mustknow: [
          'Including too many tools degrades model performance and increases cost.',
          'Tag-based selection filters tools by task category — simple and effective.',
          'Embedding-based selection uses semantic similarity for more nuanced matching.',
          'Two-stage selection: first pick a category, then load tools from that category.'
        ]
      },
      {
        section: 'tool-composition',
        label: 'Tool Composition',
        text: 'Complex tasks require chaining multiple tools together. The agent can compose tools by calling them sequentially with the LLM deciding the order, or you can pre-compose tool pipelines for common workflows. The right choice depends on how predictable the workflow is.',
        mustknow: [
          'Agent-driven composition lets the LLM decide tool ordering — flexible but unpredictable.',
          'Pre-composed pipelines are faster and more reliable for known workflows.',
          'Use agent-driven composition for exploration, pre-composed for production.',
          'Always validate intermediate results before passing them to the next tool.'
        ]
      },
      {
        section: 'error-handling-patterns',
        label: 'Error Handling',
        text: 'Tool failures are not edge cases — they are a regular part of agent operation. APIs time out, databases return empty results, and inputs are malformed. Your error handling strategy determines whether the agent recovers gracefully or enters a failure spiral.',
        mustknow: [
          'Return structured error objects — never let tools throw unhandled exceptions.',
          'Feed errors back to the LLM as observations so it can reason about recovery.',
          'Implement retry with exponential backoff for transient failures.',
          'Provide fallback tools for critical capabilities.'
        ]
      },
      {
        section: 'security-considerations',
        label: 'Security',
        text: 'Tools are the attack surface of your agent. A tool that executes arbitrary SQL, writes to the filesystem, or calls external APIs is a vector for prompt injection attacks. Every tool needs input validation, output sanitization, least-privilege access, and audit logging. Security is not a phase — it is a property of every tool you write.',
        mustknow: [
          'Validate all tool inputs against schemas before execution.',
          'Run tools with minimum necessary permissions — never admin access.',
          'Sanitize tool outputs to prevent data leakage back to the user.',
          'Log every tool execution for security auditing and incident response.'
        ]
      }
    ],

    'ch07-memory.html': [
      {
        section: 'the-forgetting-problem',
        label: 'The Forgetting Problem',
        text: 'An agent that forgets what the user said three messages ago is worse than useless — it is frustrating. Memory is what separates a stateless Q&A bot from an agent that can carry out multi-step tasks. This failure scenario plays out in every agent that relies solely on the LLM\'s context window.',
        mustknow: [
          'LLMs are stateless — they do not remember previous conversations.',
          'Without external memory, agents lose context as conversations grow.',
          'Users expect agents to remember what was said earlier in the conversation.',
          'Memory architecture is a core design decision, not an afterthought.'
        ]
      },
      {
        section: 'short-term-memory-buffers',
        label: 'Conversation Buffers',
        text: 'The conversation buffer is the simplest memory pattern: store all messages and include them in every prompt. It works until the conversation exceeds the context window — then you either truncate (losing context) or pay for increasingly expensive API calls. Every other memory pattern exists to solve this scaling problem.',
        mustknow: [
          'Buffer memory stores the complete conversation history.',
          'Simple to implement but does not scale beyond the context window.',
          'Token costs grow linearly with conversation length.',
          'Use as a starting point, then add other memory types as needed.'
        ]
      },
      {
        section: 'summary-memory',
        label: 'Summary Memory',
        text: 'Summary memory compresses long conversations into concise summaries, preserving key facts while dramatically reducing token usage. It is the first memory upgrade you should make when conversation buffers get too large. The trade-off is lossy compression — summaries omit details that might matter later.',
        mustknow: [
          'Summaries compress long conversations into a few hundred tokens.',
          'Use the LLM itself to generate summaries — it understands what is important.',
          'Summarize incrementally (every N messages) rather than all at once.',
          'Always keep the last 3-5 raw messages alongside the summary for recent context.'
        ]
      },
      {
        section: 'long-term-memory-vector-stores',
        label: 'Vector Stores',
        text: 'Vector stores give agents long-term memory that scales to millions of entries. By embedding memories as vectors and retrieving by semantic similarity, agents can recall relevant information from weeks or months ago. This is how you build agents that learn and improve over time.',
        mustknow: [
          'Vector stores embed memories as high-dimensional vectors.',
          'Retrieval is by semantic similarity — not keyword matching.',
          'Choose embedding models carefully — they determine retrieval quality.',
          'Vector stores need periodic cleanup to prevent memory pollution.'
        ]
      },
      {
        section: 'episodic-memory',
        label: 'Episodic Memory',
        text: 'Episodic memory records what happened, what worked, and what failed. It is how agents learn from experience — not by retraining the model, but by retrieving relevant past episodes when facing similar situations. This pattern is dramatically underused and represents one of the biggest opportunities in agent design.',
        mustknow: [
          'Episodic memory stores complete interaction episodes with outcomes.',
          'Agents retrieve similar past episodes to inform current decisions.',
          'Success/failure labels enable agents to learn from mistakes.',
          'Episodic memory is the closest thing to "agent learning" without fine-tuning.'
        ]
      },
      {
        section: 'semantic-memory',
        label: 'Semantic Memory',
        text: 'Semantic memory stores facts and knowledge — things that are true regardless of when they were learned. It is distinct from episodic memory (events) and buffer memory (conversations). Think of it as the agent\'s knowledge base: user preferences, domain facts, learned rules.',
        mustknow: [
          'Semantic memory stores facts, not events or conversations.',
          'Facts should be updated when new information contradicts stored knowledge.',
          'User preferences and domain knowledge are ideal semantic memory entries.',
          'Separate semantic from episodic memory for cleaner retrieval.'
        ]
      },
      {
        section: 'memory-retrieval-strategies',
        label: 'Retrieval Strategies',
        text: 'How you retrieve memories is as important as how you store them. Recency, relevance, and importance are three independent signals that should be combined. A purely relevance-based retrieval misses recent context; a purely recency-based one misses distant but important memories.',
        mustknow: [
          'Recency: prefer recent memories for conversational context.',
          'Relevance: use semantic similarity to find topically related memories.',
          'Importance: weight memories by their significance (user preferences, decisions).',
          'Combine all three signals with tunable weights for best results.'
        ]
      },
      {
        section: 'choosing-the-right-memory-type',
        label: 'Choosing Memory Types',
        text: 'This decision framework maps your use case to the right memory architecture. Most production agents need at least two memory types: a buffer for the current conversation and a vector store for long-term recall. The comparison table in this section should guide your architecture decisions.',
        mustknow: [
          'Single-session agents need only buffer memory.',
          'Multi-session agents need at least buffer + vector store.',
          'Agents that learn from experience need episodic memory.',
          'Start with the minimum memory architecture and add types as you hit limits.'
        ]
      },
      {
        section: 'integration-patterns',
        label: 'Integration Patterns',
        text: 'There are two main patterns for integrating memory with agents: pre-prompt injection (retrieve and inject into the system prompt) and tool-based retrieval (the agent explicitly queries memory as a tool). Each has trade-offs in control, cost, and transparency.',
        mustknow: [
          'Pre-prompt injection is simpler but adds tokens to every request.',
          'Tool-based retrieval is more efficient but requires the agent to know when to search.',
          'Pre-prompt works best for always-relevant context (user preferences).',
          'Tool-based works best for situational recall (past incidents, similar cases).'
        ]
      }
    ],

    'ch08-rag-pipelines.html': [
      {
        section: 'why-rag',
        label: 'Why RAG',
        text: 'RAG solves the fundamental limitation of LLMs: their knowledge is frozen at training time. When your agent needs to answer questions about your company\'s data, last week\'s policy changes, or this morning\'s support tickets, RAG is how you ground it in reality instead of hallucination.',
        mustknow: [
          'LLM training data is months to years old — it cannot know your current data.',
          'RAG retrieves relevant documents and includes them in the prompt.',
          'RAG is cheaper and faster than fine-tuning for most knowledge grounding tasks.',
          'RAG quality depends on retrieval quality — garbage in, garbage out.'
        ]
      },
      {
        section: 'document-loading',
        label: 'Document Loading',
        text: 'Your RAG pipeline is only as good as the documents you feed it. Loading documents seems simple until you encounter PDFs with tables, HTML with navigation boilerplate, or scanned images that need OCR. Investing in robust document loading pays dividends in retrieval quality.',
        mustknow: [
          'Different file formats require different parsing strategies.',
          'PDFs are the hardest format — tables, images, and multi-column layouts break naive parsers.',
          'Always strip navigation, headers, footers, and boilerplate from HTML.',
          'Store metadata (source, date, author) alongside content for filtering.'
        ]
      },
      {
        section: 'chunking-strategies',
        label: 'Chunking Strategies',
        text: 'Chunking determines what the retriever can find. Chunks that are too large waste context tokens and dilute relevant information. Chunks that are too small lose context and meaning. Finding the right chunking strategy for your data is the single highest-impact optimization in a RAG pipeline.',
        mustknow: [
          'Fixed-size chunking is simple but often splits sentences and ideas.',
          'Recursive character splitting respects document structure (paragraphs, sections).',
          'Semantic chunking groups text by meaning — best quality but slowest.',
          'Chunk size of 500-1000 tokens with 100-200 token overlap is a good default.'
        ]
      },
      {
        section: 'embedding-models',
        label: 'Embedding Models',
        text: 'The embedding model converts text into vectors that capture meaning. A good embedding model places semantically similar text close together in vector space. Choosing the right model affects every retrieval in your pipeline — it is a decision that is expensive to change later.',
        mustknow: [
          'Embedding quality directly determines retrieval quality.',
          'OpenAI text-embedding-3-small is a solid default for most use cases.',
          'Open-source models (BGE, E5) offer good quality without API dependency.',
          'Always normalize embeddings and use cosine similarity for comparison.'
        ]
      },
      {
        section: 'vector-databases',
        label: 'Vector Databases',
        text: 'Vector databases store and index embeddings for fast similarity search. The choice between FAISS, ChromaDB, Qdrant, Pinecone, and pgvector depends on your scale, deployment constraints, and whether you need managed infrastructure. Start simple and migrate if you outgrow it.',
        mustknow: [
          'ChromaDB or FAISS for prototyping and small-to-medium datasets.',
          'Qdrant or Pinecone for production workloads needing managed infrastructure.',
          'pgvector if you already have PostgreSQL and want to minimize dependencies.',
          'All vector DBs support metadata filtering — use it to narrow search scope.'
        ]
      },
      {
        section: 'retrieval-strategies',
        label: 'Retrieval Strategies',
        text: 'Dense retrieval (embeddings), sparse retrieval (BM25/keyword), and hybrid retrieval (both combined) each have strengths. Dense finds semantically similar text; sparse finds exact keyword matches. Hybrid gives you the best of both worlds and should be your default for production.',
        mustknow: [
          'Dense retrieval excels at semantic similarity but misses exact terms.',
          'Sparse retrieval (BM25) excels at keyword matching but misses synonyms.',
          'Hybrid retrieval combines both using Reciprocal Rank Fusion.',
          'Always start with hybrid retrieval unless you have a specific reason not to.'
        ]
      },
      {
        section: 're-ranking',
        label: 'Re-ranking',
        text: 'Re-ranking is the highest-impact post-retrieval optimization. Initial retrieval is fast but approximate; re-ranking with a cross-encoder model re-scores results for precise relevance. Adding a re-ranker typically improves retrieval quality by 10-30% with minimal latency cost.',
        mustknow: [
          'Re-ranking re-scores retrieved results using a more powerful model.',
          'Cross-encoder re-rankers are more accurate than bi-encoder retrievers.',
          'Retrieve 20-50 results, re-rank, then use the top 3-5.',
          'Re-ranking adds 100-300ms latency — acceptable for most applications.'
        ]
      },
      {
        section: 'augmented-generation',
        label: 'Augmented Generation',
        text: 'This is where retrieval meets generation. The prompt template that combines the user\'s question with retrieved context is surprisingly important. A well-crafted augmentation prompt tells the LLM to use the provided context, cite sources, and say "I don\'t know" when the context is insufficient.',
        mustknow: [
          'Place retrieved context before the user question in the prompt.',
          'Explicitly instruct the LLM to base answers only on provided context.',
          'Include source metadata so the LLM can cite its sources.',
          'Instruct the LLM to say "I don\'t know" rather than hallucinate when context is insufficient.'
        ]
      },
      {
        section: 'advanced-patterns',
        label: 'Advanced Patterns',
        text: 'Query transformation, parent document retrieval, and contextual compression are three patterns that solve specific RAG failure modes. Query transformation handles poorly worded questions; parent retrieval provides surrounding context for small chunks; compression reduces noise in retrieved passages.',
        mustknow: [
          'Query transformation rewrites user queries for better retrieval.',
          'Parent document retrieval: retrieve by small chunk, return the full document.',
          'Contextual compression strips irrelevant parts from retrieved passages.',
          'Apply these patterns only when basic RAG does not meet quality requirements.'
        ]
      },
      {
        section: 'evaluation',
        label: 'Evaluation',
        text: 'RAG evaluation requires measuring both retrieval quality and generation quality separately. A bad answer could be caused by retrieving the wrong documents or by the LLM misinterpreting good documents. Without separate evaluation, you cannot diagnose which component to fix.',
        mustknow: [
          'Measure retrieval separately: precision, recall, MRR, NDCG.',
          'Measure generation separately: faithfulness, relevance, completeness.',
          'Faithfulness = does the answer match the retrieved context? (not hallucinated)',
          'Build an evaluation dataset of 50-100 question/answer pairs for your domain.'
        ]
      },
      {
        section: 'common-failure-modes',
        label: 'Common Failure Modes',
        text: 'These five failure patterns account for 90% of RAG quality issues. Memorize them: wrong chunks retrieved, right chunks but answer not in them, answer in chunks but LLM ignores it, hallucination despite good context, and stale/outdated documents. Each has a different fix.',
        mustknow: [
          'Wrong chunks: fix chunking strategy or embedding model.',
          'Answer not in chunks: expand your document corpus or improve loading.',
          'LLM ignores context: improve the augmentation prompt template.',
          'Hallucination despite context: lower temperature, add "only use provided context."',
          'Stale data: implement document refresh pipelines with TTL.'
        ]
      }
    ],

    'ch09-orchestration.html': [
      {
        section: 'ad-hoc-chaining-problems',
        label: 'Ad-Hoc Chaining Problems',
        text: 'If you have been chaining LLM calls with if-else statements and prayer, this section explains why that approach collapses at scale. Ad-hoc chaining has no state management, no error recovery, no checkpointing, and no way to inspect what went wrong. Orchestration frameworks exist because every team eventually reinvents them poorly.',
        mustknow: [
          'Ad-hoc chains break when any step fails — no recovery path.',
          'Without state management, you cannot resume interrupted workflows.',
          'Debugging nested function calls is nearly impossible at scale.',
          'Orchestration is not overhead — it is the infrastructure that makes agents reliable.'
        ]
      },
      {
        section: 'state-machines-for-agents',
        label: 'State Machines',
        text: 'State machines are the conceptual foundation of agent orchestration. Every agent workflow can be modeled as states (what the agent is doing), transitions (what triggers the next step), and conditions (which path to take). If you can draw your agent as a state machine, you can build it reliably.',
        mustknow: [
          'States represent what the agent is currently doing (researching, writing, reviewing).',
          'Transitions are triggered by events (tool result, user input, timeout).',
          'Conditional transitions enable branching logic (if confident → respond, else → research more).',
          'State machines make agent behavior predictable, testable, and debuggable.'
        ]
      },
      {
        section: 'graph-based-workflows',
        label: 'Graph-Based Workflows',
        text: 'Graphs extend state machines with richer topology: parallel branches, cycles, subgraphs, and dynamic routing. LangGraph implements this pattern, representing agent workflows as directed graphs where nodes are functions and edges are transitions. This is the standard architecture for production multi-step agents.',
        mustknow: [
          'Nodes are functions that process state and return updates.',
          'Edges define the flow between nodes — can be conditional.',
          'Graphs support cycles (agent loops) and parallel execution.',
          'Shared state object flows through the graph, accumulating results.'
        ]
      },
      {
        section: 'langgraph-concepts',
        label: 'LangGraph Concepts',
        text: 'LangGraph is the industry-standard framework for building agentic workflows as graphs. Understanding its core abstractions — StateGraph, nodes, edges, conditional edges, and state schema — is essential vocabulary for any production agent project. These concepts map directly to the state machine patterns you already know.',
        mustknow: [
          'StateGraph defines the workflow with typed state, nodes, and edges.',
          'Nodes are Python functions that receive state and return state updates.',
          'Conditional edges route flow based on state values — this enables decision logic.',
          'The state schema (TypedDict or Pydantic) is the contract between all nodes.'
        ]
      },
      {
        section: 'routing-patterns',
        label: 'Routing Patterns',
        text: 'Routing is how agents make decisions about what to do next. Static routing follows predetermined paths. Dynamic routing lets the LLM choose the next step. Semantic routing matches user intent to specialized handlers. Choosing the right routing pattern determines how flexible and reliable your agent is.',
        mustknow: [
          'Static routing: predetermined paths — simplest, most predictable.',
          'LLM-based routing: the model decides the next node — flexible but less predictable.',
          'Semantic routing: embed the input and route to the nearest handler.',
          'Use static routing for known workflows, dynamic routing for open-ended tasks.'
        ]
      },
      {
        section: 'interrupts-and-hitl',
        label: 'Interrupts and HITL',
        text: 'Interrupts pause agent execution at specific points to wait for human input or approval. This is how you build agents that can handle sensitive operations — the agent works autonomously until it reaches a decision that requires human judgment, then pauses and resumes after approval.',
        mustknow: [
          'LangGraph interrupt() pauses execution and saves state to a checkpoint.',
          'The agent resumes exactly where it left off after human input.',
          'Place interrupts before irreversible actions (payments, emails, deployments).',
          'Interrupts require a checkpointing backend (SQLite, PostgreSQL, Redis).'
        ]
      },
      {
        section: 'checkpointing',
        label: 'Checkpointing',
        text: 'Checkpointing saves the complete agent state at each step, enabling resume-after-interrupt, time-travel debugging, and crash recovery. Without checkpointing, a server restart means losing the entire agent run. With it, agents are durable and debuggable.',
        mustknow: [
          'Checkpoints save complete state after every node execution.',
          'Enable resume after interrupts, crashes, or server restarts.',
          'Time-travel debugging: replay any previous state to understand decisions.',
          'Use SQLite for development, PostgreSQL for production checkpointing.'
        ]
      },
      {
        section: 'error-handling-in-graphs',
        label: 'Error Handling',
        text: 'Error handling in graph-based agents requires thinking about failures at the node level, the edge level, and the graph level. Node-level retries handle transient tool failures. Edge-level fallbacks route to alternative paths. Graph-level timeouts prevent runaway executions.',
        mustknow: [
          'Wrap individual nodes with retry logic for transient failures.',
          'Use conditional edges to route to fallback nodes on error.',
          'Set graph-level timeouts to prevent infinite execution.',
          'Log errors with full state context — you need it for debugging.'
        ]
      }
    ],

    'ch10-supervisor-worker.html': [
      {
        section: 'the-case-for-hierarchy',
        label: 'The Case for Hierarchy',
        text: 'Not every multi-agent system needs a supervisor, but most non-trivial ones do. Without coordination, agents duplicate work, contradict each other, and produce incoherent results. A supervisor provides task decomposition, work assignment, quality control, and result synthesis — the same roles a human team lead performs.',
        mustknow: [
          'Flat multi-agent systems fail when tasks require coordination.',
          'Supervisors decompose tasks, assign work, and aggregate results.',
          'The supervisor pattern scales from 2 workers to dozens.',
          'Not every system needs a supervisor — simple pipelines work for sequential tasks.'
        ]
      },
      {
        section: 'architecture-overview',
        label: 'Architecture Overview',
        text: 'The supervisor-worker architecture has three layers: the supervisor (plans and coordinates), workers (execute specialized tasks), and tools (the capabilities workers use). The supervisor never directly uses tools — it delegates to workers who have domain-specific tool access. This separation of concerns is what makes the pattern scalable.',
        mustknow: [
          'Supervisors plan and delegate — they do not execute tasks directly.',
          'Workers are specialized agents with domain-specific tools and prompts.',
          'Each worker should have a focused responsibility and limited tool access.',
          'The supervisor sees worker outputs but not their internal reasoning.'
        ]
      },
      {
        section: 'designing-the-supervisor',
        label: 'Designing the Supervisor',
        text: 'The supervisor is the most critical component — a bad supervisor produces bad results regardless of how good the workers are. The supervisor prompt must clearly define available workers, their capabilities, and when to delegate to each. It must also know when the task is complete and how to synthesize results.',
        mustknow: [
          'The supervisor prompt must list all available workers and their specialties.',
          'Include explicit criteria for when to delegate vs. respond directly.',
          'The supervisor needs a termination condition — when is the task done?',
          'Give the supervisor a quality-check step before returning final results.'
        ]
      },
      {
        section: 'building-worker-agents',
        label: 'Building Workers',
        text: 'Workers should be narrowly specialized. A worker that tries to do everything is just another monolithic agent. Give each worker a focused system prompt, a small set of relevant tools, and clear output schemas. Narrow workers are easier to test, debug, and improve independently.',
        mustknow: [
          'Each worker should have a single, well-defined responsibility.',
          'Limit each worker to 3-5 tools relevant to its specialty.',
          'Workers should return structured outputs the supervisor can parse.',
          'Test workers independently before integrating with the supervisor.'
        ]
      },
      {
        section: 'task-decomposition',
        label: 'Task Decomposition',
        text: 'Task decomposition is the supervisor\'s most important capability. Breaking a complex task into subtasks that workers can handle independently is what makes the system parallel and scalable. The decomposition quality directly determines the output quality.',
        mustknow: [
          'Good decomposition produces independent, parallelizable subtasks.',
          'Each subtask should map to exactly one worker\'s specialty.',
          'Include dependencies between subtasks when order matters.',
          'The supervisor should be able to re-decompose if a subtask fails.'
        ]
      },
      {
        section: 'parallel-execution',
        label: 'Parallel Execution',
        text: 'Parallel execution is the primary performance advantage of the supervisor-worker pattern. Independent subtasks run simultaneously, reducing total latency from the sum of all tasks to the duration of the longest single task. Proper parallelization can make a 10-step agent 5x faster.',
        mustknow: [
          'Use asyncio.gather() to run independent worker tasks in parallel.',
          'Only parallelize tasks with no dependencies between them.',
          'Set per-worker timeouts to prevent one slow worker from blocking everything.',
          'Monitor parallel execution costs — they are concurrent, not sequential.'
        ]
      },
      {
        section: 'result-aggregation',
        label: 'Result Aggregation',
        text: 'Aggregating results from multiple workers is harder than it sounds. Workers may produce contradictory information, overlapping content, or differently formatted outputs. The aggregation step must deduplicate, resolve conflicts, and synthesize a coherent final result.',
        mustknow: [
          'Deduplication: remove overlapping content from different workers.',
          'Conflict resolution: when workers disagree, the supervisor must decide.',
          'Synthesis: combine results into a coherent output, not just concatenation.',
          'Quality check: the supervisor should validate the aggregated result before returning.'
        ]
      },
      {
        section: 'error-handling',
        label: 'Error Handling',
        text: 'In multi-agent systems, errors are amplified. A failed worker can block the supervisor, a timeout can leave tasks incomplete, and retries can cause duplicate work. Your error handling must be explicit about what happens when each worker fails and whether the system can produce a partial result.',
        mustknow: [
          'Define fallback behavior for each worker — what if it fails completely?',
          'Partial results are often acceptable — do not fail the whole system for one worker.',
          'Set worker-level timeouts independent of the overall task timeout.',
          'Log which workers succeeded and failed for debugging and improvement.'
        ]
      }
    ],

    'ch11-human-in-the-loop.html': [
      {
        section: 'the-case-for-human-oversight',
        label: 'Human Oversight',
        text: 'Every agent takes actions with real consequences. The question is not whether humans should be involved — it is where in the workflow human oversight adds the most value. This section establishes the principle that human-in-the-loop is not a limitation of agents; it is a design pattern that makes them trustworthy enough to deploy.',
        mustknow: [
          'Agents that take irreversible actions without oversight are liability risks.',
          'Human oversight is a feature, not a limitation — it enables trust.',
          'The goal is to minimize human effort while maximizing safety.',
          'Every production agent should have at least one human checkpoint.'
        ]
      },
      {
        section: 'interrupt-points',
        label: 'Interrupt Points',
        text: 'Interrupt points are specific locations in your agent workflow where execution pauses for human input. Placing them correctly is an art: too few and you risk uncontrolled actions; too many and you negate the efficiency gains of automation. The key is placing interrupts before irreversible or high-stakes actions.',
        mustknow: [
          'Place interrupts before irreversible actions (send email, process payment).',
          'Place interrupts before high-stakes decisions (medical, legal, financial).',
          'Avoid interrupts on routine, easily reversible actions.',
          'Interrupts should include context so the human can make an informed decision.'
        ]
      },
      {
        section: 'approval-gates',
        label: 'Approval Gates',
        text: 'Approval gates are the implementation of interrupt points: the agent presents its proposed action, the human approves or rejects, and the agent proceeds or adjusts. Well-designed approval gates show the human exactly what will happen, why the agent chose it, and what the alternatives are.',
        mustknow: [
          'Show the proposed action, the reasoning behind it, and alternatives.',
          'Support approve, reject, and modify responses from the human.',
          'On rejection, feed the reason back to the agent so it can adjust.',
          'Log all approval decisions for audit trails and compliance.'
        ]
      },
      {
        section: 'confidence-thresholds',
        label: 'Confidence Thresholds',
        text: 'Confidence thresholds automate the decision of when to involve a human. If the agent is confident, it proceeds autonomously. If confidence is low, it escalates for human review. This pattern lets agents handle routine cases at machine speed while ensuring edge cases get human attention.',
        mustknow: [
          'Set thresholds based on the cost of errors, not just model confidence.',
          'High-cost actions need high confidence thresholds (95%+).',
          'Low-cost, reversible actions can use lower thresholds (70-80%).',
          'Monitor and adjust thresholds based on actual error rates in production.'
        ]
      },
      {
        section: 'escalation-patterns',
        label: 'Escalation Patterns',
        text: 'Escalation is what happens when the agent cannot handle a request — either because it lacks confidence, the task is out of scope, or something went wrong. Good escalation preserves all context so the human does not need to start from scratch. Bad escalation loses context and frustrates everyone.',
        mustknow: [
          'Preserve full conversation history and agent reasoning when escalating.',
          'Include what the agent tried, what failed, and why it is escalating.',
          'Route escalations to the right specialist based on the issue type.',
          'Track escalation rates — rising rates indicate agent capability gaps.'
        ]
      },
      {
        section: 'ux-for-human-review',
        label: 'UX for Human Review',
        text: 'The human review interface determines whether HITL is efficient or a bottleneck. Reviewers need to see the agent\'s proposed action, its reasoning, relevant context, and one-click approve/reject. If reviewing an agent decision takes longer than doing the task manually, the HITL pattern is failing.',
        mustknow: [
          'Show the proposed action prominently — do not make reviewers hunt for it.',
          'Include agent reasoning so reviewers understand why this action was chosen.',
          'One-click approve/reject with optional comment for rejection reason.',
          'Track review times — if they exceed 30 seconds, simplify the interface.'
        ]
      },
      {
        section: 'resuming-after-interruption',
        label: 'Resuming After Interruption',
        text: 'Resuming correctly after a human interrupt is technically challenging. The agent must restore its full state, incorporate the human\'s decision, and continue from exactly where it left off. This requires durable checkpointing and careful state management — which is why orchestration frameworks like LangGraph handle it for you.',
        mustknow: [
          'State must be fully serialized and restored for correct resumption.',
          'Human input (approve/reject/modify) must be injected into agent state.',
          'The agent should acknowledge the human decision in its next reasoning step.',
          'Test resume flows explicitly — they are a common source of subtle bugs.'
        ]
      },
      {
        section: 'langgraph-interrupt',
        label: 'LangGraph interrupt()',
        text: 'LangGraph\'s interrupt() function is the production-ready implementation of all the patterns in this chapter. It pauses execution, saves state to a checkpoint backend, and resumes with human input when ready. Understanding this mechanism lets you implement HITL in minutes instead of days.',
        mustknow: [
          'interrupt() pauses the graph and returns control to the caller.',
          'State is automatically checkpointed — no manual serialization needed.',
          'Resume by invoking the graph with the same thread_id and human input.',
          'Requires a checkpointer backend (MemorySaver, SqliteSaver, PostgresSaver).'
        ]
      }
    ],

    'ch12-agent-communication.html': [
      {
        section: 'why-communication-is-hard',
        label: 'Why Communication Is Hard',
        text: 'When you have multiple agents working together, the communication protocol between them becomes the system\'s architecture. Get it wrong and agents talk past each other, duplicate work, or deadlock waiting for responses. This chapter gives you the patterns to get it right.',
        mustknow: [
          'Agent communication failures are the top cause of multi-agent system bugs.',
          'Without structured protocols, agents produce incoherent joint outputs.',
          'Communication overhead grows quadratically with the number of agents.',
          'Choose the simplest communication pattern that solves your coordination problem.'
        ]
      },
      {
        section: 'message-passing-patterns',
        label: 'Message Passing',
        text: 'The three core patterns — broadcast, request/reply, and pub/sub — solve different coordination problems. Broadcast is for announcements. Request/reply is for delegation. Pub/sub is for event-driven reactions. Most multi-agent systems use a combination of all three.',
        mustknow: [
          'Broadcast: one agent sends to all others — for announcements and state updates.',
          'Request/reply: one agent asks another for a specific result — for delegation.',
          'Pub/sub: agents subscribe to topics and react to events — for loose coupling.',
          'Request/reply is the most common pattern in supervisor-worker architectures.'
        ]
      },
      {
        section: 'shared-state',
        label: 'Shared State',
        text: 'Shared state is the alternative to message passing: instead of agents sending messages to each other, they read and write to a common state object. LangGraph uses this pattern — nodes communicate by modifying the graph state. It is simpler than message passing but requires careful management of concurrent writes.',
        mustknow: [
          'Shared state eliminates message routing complexity.',
          'All agents read from and write to the same state object.',
          'Concurrent writes require conflict resolution strategies.',
          'LangGraph\'s reducer pattern handles state merging automatically.'
        ]
      },
      {
        section: 'structured-message-formats',
        label: 'Structured Messages',
        text: 'Unstructured natural language between agents sounds appealing but fails at scale. Structured message formats — with explicit types, payloads, and metadata — make communication reliable, parseable, and debuggable. Use Pydantic models for inter-agent messages just like you use them for API schemas.',
        mustknow: [
          'Define message types (request, response, error, status) as Pydantic models.',
          'Include sender, recipient, timestamp, and correlation ID in every message.',
          'Structured messages are parseable, loggable, and testable.',
          'Type safety in messages catches integration errors at development time, not production.'
        ]
      },
      {
        section: 'agent-protocols',
        label: 'Agent Protocols',
        text: 'Protocols define the rules of engagement between agents: who can talk to whom, what message types are valid, and what response is expected. Without protocols, agents are just shouting into the void. With protocols, multi-agent systems are predictable and verifiable.',
        mustknow: [
          'Protocols define valid message sequences between agents.',
          'Include timeout and retry behavior in the protocol definition.',
          'Protocol violations should be logged and flagged — they indicate bugs.',
          'Start with simple request/response protocols and add complexity as needed.'
        ]
      },
      {
        section: 'conversation-management',
        label: 'Conversation Management',
        text: 'When agents have multi-turn conversations, managing conversation state becomes critical. Thread IDs track separate conversations. Turn limits prevent infinite back-and-forth. Context windows must be managed so agents do not lose track of what was discussed.',
        mustknow: [
          'Use thread IDs to track separate agent-to-agent conversations.',
          'Set maximum turn limits to prevent agents from conversing indefinitely.',
          'Summarize long conversations to keep context within token budgets.',
          'Log all inter-agent conversations for debugging and quality analysis.'
        ]
      },
      {
        section: 'conflict-resolution',
        label: 'Conflict Resolution',
        text: 'When multiple agents produce contradictory outputs — and they will — you need a resolution strategy. Voting works for simple disagreements. Authority hierarchies work when one agent\'s expertise takes precedence. Evidence-based resolution works when you can verify claims against data.',
        mustknow: [
          'Voting: majority wins — simple but does not account for expertise differences.',
          'Authority hierarchy: designated expert agent\'s opinion takes precedence.',
          'Evidence-based: verify claims against data sources to resolve conflicts.',
          'Always log conflicts and resolutions — they reveal gaps in agent capabilities.'
        ]
      }
    ],

    'ch13-observability.html': [
      {
        section: 'why-agents-need-observability',
        label: 'Why Observability',
        text: 'Agents fail silently in ways that traditional software does not. A web server crash is obvious; an agent quietly returning hallucinated data is not. Without observability, you have no way to know if your agent is working correctly, how much it costs per request, or why it gave a wrong answer last Tuesday.',
        mustknow: [
          'Agent failures are often silent — wrong answers look like correct answers.',
          'Without tracing, you cannot reconstruct why an agent made a specific decision.',
          'Cost and latency per task vary wildly — you need metrics to manage them.',
          'Observability is not optional — it is what makes agents production-ready.'
        ]
      },
      {
        section: 'traces-and-spans',
        label: 'Traces and Spans',
        text: 'Traces and spans are the fundamental building blocks of agent observability. A trace represents a complete agent run. Spans represent individual steps within that run — LLM calls, tool executions, memory lookups. Together, they give you a complete timeline of everything the agent did and why.',
        mustknow: [
          'One trace per agent task — it captures the full execution from start to finish.',
          'Spans nest hierarchically: agent run → reasoning step → tool call → API request.',
          'Record input, output, duration, and token count on every span.',
          'Trace IDs let you correlate logs, metrics, and errors for a single agent run.'
        ]
      },
      {
        section: 'structured-logging',
        label: 'Structured Logging',
        text: 'Unstructured log messages (print statements) are useless for agent debugging. Structured logging with JSON fields — trace ID, step type, tool name, token count — enables filtering, searching, and alerting. Invest in structured logging from day one; retrofitting it is painful.',
        mustknow: [
          'Use JSON-structured logs with consistent fields across all agent components.',
          'Include trace_id, step_type, tool_name, tokens_used, and duration in every log.',
          'Log at appropriate levels: INFO for normal flow, WARN for degraded behavior, ERROR for failures.',
          'Structured logs feed directly into monitoring dashboards and alert rules.'
        ]
      },
      {
        section: 'metrics-that-matter',
        label: 'Metrics That Matter',
        text: 'Not all metrics are worth tracking. Focus on the ones that drive decisions: task success rate, average latency, cost per task, tool failure rate, and escalation rate. These five metrics tell you if your agent is working, how fast, how expensive, and where it struggles.',
        mustknow: [
          'Task success rate: percentage of tasks completed correctly.',
          'P50/P95 latency: how long tasks take (median and tail).',
          'Cost per task: total token cost including retries.',
          'Tool failure rate: which tools are unreliable.',
          'Escalation rate: how often the agent gives up and asks for human help.'
        ]
      },
      {
        section: 'instrumenting-an-agent',
        label: 'Instrumenting Agents',
        text: 'Instrumentation is the process of adding traces, spans, and metrics to your agent code. OpenTelemetry is the standard framework. The key is instrumenting at the right granularity — trace every LLM call and tool execution, but do not trace every internal function call.',
        mustknow: [
          'Use OpenTelemetry for vendor-neutral instrumentation.',
          'Trace every LLM call with input tokens, output tokens, model, and latency.',
          'Trace every tool execution with arguments, results, and duration.',
          'Add custom attributes for domain-specific metadata (task type, user ID).'
        ]
      },
      {
        section: 'the-observability-stack',
        label: 'The Observability Stack',
        text: 'A complete observability stack collects traces, logs, and metrics; stores them durably; and presents them in dashboards and alerts. For agents, you also need LLM-specific tooling that understands token costs, prompt templates, and reasoning chains.',
        mustknow: [
          'Collection: OpenTelemetry SDK for traces, structured logging for logs.',
          'Storage: Jaeger/Tempo for traces, Loki/Elasticsearch for logs, Prometheus for metrics.',
          'Visualization: Grafana dashboards for metrics, trace viewers for debugging.',
          'LLM-specific: LangSmith or Langfuse for prompt debugging and cost analysis.'
        ]
      },
      {
        section: 'debugging-agent-behavior',
        label: 'Debugging Agents',
        text: 'Agent debugging is fundamentally different from traditional software debugging. You cannot set a breakpoint in an LLM\'s reasoning. Instead, you reconstruct the agent\'s decision chain from traces: what did it observe, what did it think, what did it do, and where did the chain go wrong?',
        mustknow: [
          'Replay traces to walk through the agent\'s exact decision sequence.',
          'Compare successful and failed traces for the same task type.',
          'Check the prompt at each step — the input to the LLM explains its output.',
          'Tool result inspection often reveals the root cause of wrong answers.'
        ]
      },
      {
        section: 'building-dashboards',
        label: 'Dashboards',
        text: 'Dashboards turn raw metrics into actionable information. Build three dashboards: an operational dashboard (is the system healthy?), a cost dashboard (are we within budget?), and a quality dashboard (are agents producing good results?). Review them daily.',
        mustknow: [
          'Operational: request rate, error rate, latency percentiles, active agents.',
          'Cost: daily spend, cost per task, cost trend, budget remaining.',
          'Quality: success rate, escalation rate, user satisfaction, hallucination rate.',
          'Set alerts on key thresholds — do not rely on manual dashboard watching.'
        ]
      },
      {
        section: 'langsmith-and-langfuse',
        label: 'LangSmith & Langfuse',
        text: 'LangSmith and Langfuse are purpose-built observability platforms for LLM applications. They understand prompts, completions, token costs, and reasoning chains in ways that generic observability tools do not. Use them alongside (not instead of) your general observability stack.',
        mustknow: [
          'LangSmith (LangChain) and Langfuse (open-source) are the leading options.',
          'Both capture full prompt/completion pairs with token costs.',
          'Use them for prompt debugging, A/B testing, and regression detection.',
          'Self-host Langfuse if you cannot send prompts to external services.'
        ]
      }
    ],

    'ch14-security.html': [
      {
        section: 'the-agentic-attack-surface',
        label: 'Attack Surface',
        text: 'Agents have a dramatically larger attack surface than traditional software. Every tool is an execution endpoint. Every prompt is an injection opportunity. Every data source is a potential vector for indirect prompt injection. Understanding this expanded attack surface is the first step to defending it.',
        mustknow: [
          'Agents combine LLM vulnerabilities with traditional software vulnerabilities.',
          'Every tool the agent can call is an attack surface.',
          'User inputs, tool results, and retrieved documents can all contain attacks.',
          'The attack surface grows with every tool and data source you add.'
        ]
      },
      {
        section: 'prompt-injection',
        label: 'Prompt Injection',
        text: 'Prompt injection is the SQL injection of the AI era. Direct injection comes from user input; indirect injection comes from data the agent retrieves (documents, web pages, tool results). Both can hijack the agent\'s behavior. This is the most critical security topic in agentic AI.',
        mustknow: [
          'Direct injection: malicious instructions in user messages.',
          'Indirect injection: malicious instructions hidden in retrieved data.',
          'No perfect defense exists — use defense-in-depth with multiple layers.',
          'Test your agents with adversarial inputs before deploying.'
        ]
      },
      {
        section: 'data-exfiltration',
        label: 'Data Exfiltration',
        text: 'An agent with tools can be tricked into sending sensitive data to external endpoints. Imagine a prompt injection that says "summarize the database and email it to attacker@evil.com." If the agent has email and database tools, it can comply. Tool permissions and output filtering are your defenses.',
        mustknow: [
          'Agents with network tools can be weaponized for data exfiltration.',
          'Restrict outbound network access to whitelisted domains.',
          'Scan tool arguments for sensitive data patterns before execution.',
          'Log all outbound data transmissions for security auditing.'
        ]
      },
      {
        section: 'input-validation',
        label: 'Input Validation',
        text: 'Input validation is your first line of defense. Validate user inputs, tool arguments, and data from external sources before they reach the LLM or tool execution. Reject inputs that match known attack patterns, exceed length limits, or contain suspicious content.',
        mustknow: [
          'Validate all inputs at the boundary — before they enter the agent pipeline.',
          'Length limits prevent context stuffing attacks.',
          'Pattern matching catches known injection techniques.',
          'Separate user input from system instructions in the prompt architecture.'
        ]
      },
      {
        section: 'output-filtering',
        label: 'Output Filtering',
        text: 'Output filtering catches sensitive information that the agent should not reveal: API keys, personal data, internal system details. Even without an attack, LLMs can accidentally include sensitive data in their responses. Output filters are your safety net.',
        mustknow: [
          'Scan agent outputs for PII, credentials, and internal system information.',
          'Use regex patterns for structured data (emails, SSNs, API keys).',
          'Use an LLM classifier for nuanced sensitivity detection.',
          'Log filtered content for security review — it may indicate an attack attempt.'
        ]
      },
      {
        section: 'tool-sandboxing',
        label: 'Tool Sandboxing',
        text: 'Every tool should run with the minimum permissions needed. A search tool does not need write access. A database tool does not need admin privileges. Sandboxing limits the blast radius when an agent is compromised — the attacker can only do what the tool\'s permissions allow.',
        mustknow: [
          'Apply least privilege: each tool gets only the permissions it needs.',
          'Run code execution tools in isolated containers or sandboxes.',
          'Use read-only database connections for query tools.',
          'Separate tool credentials from application credentials.'
        ]
      },
      {
        section: 'secrets-management',
        label: 'Secrets Management',
        text: 'Never hardcode API keys, database passwords, or other secrets in your agent code or prompts. Use a secrets manager, inject credentials at runtime, and ensure the LLM never sees raw credential values. A single leaked API key can compromise your entire infrastructure.',
        mustknow: [
          'Use environment variables or a secrets manager — never hardcode credentials.',
          'The LLM should never see raw API keys or passwords in its context.',
          'Rotate credentials regularly and after any security incident.',
          'Audit which tools have access to which credentials.'
        ]
      },
      {
        section: 'audit-logging',
        label: 'Audit Logging',
        text: 'Audit logs record every action the agent takes — every tool call, every LLM response, every human approval. They are essential for security investigations, compliance requirements, and understanding what went wrong after an incident. Build audit logging from day one; you cannot add it retroactively.',
        mustknow: [
          'Log every tool execution with full arguments and results.',
          'Log every LLM call with prompts and completions.',
          'Include timestamps, user IDs, and trace IDs for correlation.',
          'Store audit logs in tamper-resistant, immutable storage.'
        ]
      },
      {
        section: 'defense-in-depth',
        label: 'Defense-in-Depth',
        text: 'No single security measure is sufficient. Defense-in-depth layers multiple controls: input validation, output filtering, tool sandboxing, secrets management, and audit logging. When one layer fails — and it will — the others catch the attack. This is how you build agents that are safe enough for production.',
        mustknow: [
          'Layer multiple defenses — never rely on a single security control.',
          'Input validation → LLM guardrails → tool sandboxing → output filtering.',
          'Assume each individual layer will sometimes fail.',
          'Regular security testing (red-teaming) validates your defense layers.'
        ]
      }
    ],

    'ch15-deployment.html': [
      {
        section: 'why-deployment-is-different',
        label: 'Why Deployment Is Different',
        text: 'Agents are not typical web services. They have long-running tasks, variable resource usage, external API dependencies, and non-deterministic behavior. Deployment strategies that work for REST APIs may fail for agents. This chapter covers the specific challenges and solutions.',
        mustknow: [
          'Agent tasks can run for minutes — standard HTTP timeouts do not work.',
          'Resource usage varies wildly between simple and complex tasks.',
          'External LLM API dependencies add failure modes traditional services lack.',
          'Non-deterministic behavior makes integration testing fundamentally harder.'
        ]
      },
      {
        section: 'containerization',
        label: 'Containerization',
        text: 'Docker containers are the standard packaging format for agent deployments. They bundle your agent code, dependencies, and configuration into a portable unit. The key considerations for agents are: large dependency sizes, GPU requirements for local models, and secrets injection at runtime.',
        mustknow: [
          'Use multi-stage Docker builds to minimize image size.',
          'Pin all dependency versions — non-deterministic builds cause production surprises.',
          'Never bake secrets into Docker images — inject at runtime.',
          'Use .dockerignore to exclude test data, notebooks, and development files.'
        ]
      },
      {
        section: 'cicd-pipelines',
        label: 'CI/CD Pipelines',
        text: 'Agent CI/CD pipelines need additional stages beyond traditional software: prompt regression tests, tool integration tests, cost estimation, and security scanning. A pipeline that only runs unit tests will not catch the most common agent failures.',
        mustknow: [
          'Add prompt regression tests that verify agent behavior on known inputs.',
          'Include tool integration tests that call real (or realistic mock) APIs.',
          'Add a cost estimation stage that flags tasks exceeding budget thresholds.',
          'Security scanning should check for hardcoded secrets and injection vulnerabilities.'
        ]
      },
      {
        section: 'environment-management',
        label: 'Environment Management',
        text: 'Agents need separate environments for development, staging, and production — with different LLM endpoints, tool configurations, and safety constraints. Development uses cheap models and permissive tools. Production uses premium models and locked-down tools. Getting this wrong means testing with the wrong model or deploying with development credentials.',
        mustknow: [
          'Use environment variables for model selection, API keys, and tool configs.',
          'Development: cheap models, permissive tools, verbose logging.',
          'Staging: production models, production tools, production safety checks.',
          'Production: premium models, locked-down tools, audit logging, monitoring.'
        ]
      },
      {
        section: 'scaling-strategies',
        label: 'Scaling Strategies',
        text: 'Agents scale differently than web services because each agent task consumes significant resources (LLM tokens, tool calls, memory). Horizontal scaling (more instances) works but you must also manage concurrency limits on external APIs and coordinate shared state across instances.',
        mustknow: [
          'Horizontal scaling: add more agent instances behind a load balancer.',
          'Manage API rate limits across all instances — use centralized rate limiting.',
          'Task queues (Celery, Redis Queue) decouple request handling from agent execution.',
          'Auto-scaling based on queue depth, not just CPU — agent work is I/O bound.'
        ]
      },
      {
        section: 'load-balancing--health-checks',
        label: 'Load Balancing',
        text: 'Health checks for agents must go beyond "is the process running?" A healthy agent can reach its LLM API, connect to its vector store, and execute its critical tools. Shallow health checks let broken agents receive traffic and fail on every request.',
        mustknow: [
          'Deep health checks verify LLM API connectivity, not just process liveness.',
          'Include vector store and tool connectivity in health checks.',
          'Use readiness probes to prevent traffic to agents that are still initializing.',
          'Health check endpoints should be fast — do not run full agent tasks as health checks.'
        ]
      },
      {
        section: 'graceful-degradation',
        label: 'Graceful Degradation',
        text: 'When the LLM API goes down, your agent should degrade gracefully — not crash. Fallback strategies include cached responses, simplified models, rule-based fallbacks, and honest "I cannot help right now" messages. The worst outcome is an agent that silently returns garbage.',
        mustknow: [
          'Cache common responses for immediate fallback during outages.',
          'Fall back to smaller/cheaper models when the primary model is unavailable.',
          'Rule-based fallbacks handle the most common queries without an LLM.',
          'Always be honest with users when operating in degraded mode.'
        ]
      },
      {
        section: 'cost-management',
        label: 'Cost Management',
        text: 'LLM costs in production can be surprising. A single verbose agent handling 10,000 requests per day can cost more than your entire cloud infrastructure. Cost management requires per-task budgets, usage monitoring, automatic throttling, and regular optimization of prompts and model selection.',
        mustknow: [
          'Set per-task token budgets that halt execution if exceeded.',
          'Monitor daily spend with alerts at 50%, 80%, and 100% of budget.',
          'Use prompt caching to reduce costs for repetitive inputs.',
          'Route simple tasks to cheaper models — not everything needs GPT-4.'
        ]
      },
      {
        section: 'monitoring-in-production',
        label: 'Production Monitoring',
        text: 'Production monitoring for agents combines infrastructure monitoring (CPU, memory, uptime) with AI-specific monitoring (token usage, latency, quality scores). Set up dashboards and alerts for both categories. The infrastructure can be healthy while the agent produces garbage — you need both views.',
        mustknow: [
          'Monitor infrastructure metrics (CPU, memory, uptime) and AI metrics (tokens, quality).',
          'Alert on quality degradation — falling success rates, rising escalation rates.',
          'Track cost trends — gradual increases indicate prompt drift or inefficiency.',
          'Review a sample of agent outputs daily — automated metrics miss subtle quality issues.'
        ]
      },
      {
        section: 'deployment-topology',
        label: 'Deployment Topology',
        text: 'This section ties everything together into a complete deployment architecture: from code push through CI/CD, container build, orchestrator deployment, health checks, monitoring, and alerting. This is the reference architecture for your production agent deployments.',
        mustknow: [
          'CI/CD → Container Registry → Orchestrator → Load Balancer → Agent Instances.',
          'Monitoring and alerting must cover the entire pipeline, not just the agents.',
          'Use blue-green or canary deployments for zero-downtime updates.',
          'Maintain rollback capability — agents can degrade subtly after updates.'
        ]
      }
    ],

    'capstone-01.html': [
      {
        section: 'the-research-problem',
        label: 'The Research Problem',
        text: 'This capstone integrates nearly every pattern from the book: multi-agent orchestration, RAG, tool use, memory, and synthesis. The research assistant is the most representative example of what production agentic systems look like — multiple specialists coordinated by a supervisor to produce a coherent output.',
        mustknow: [
          'This capstone combines patterns from chapters 4-12 into a complete system.',
          'The supervisor-worker pattern coordinates 4 specialist agents.',
          'RAG grounds the research in real documents, not LLM hallucination.',
          'Citation tracking ensures every claim is traceable to a source.'
        ]
      }
    ],

    'capstone-02.html': [
      {
        section: 'the-code-review-problem',
        label: 'The Code Review Problem',
        text: 'This capstone applies agent patterns to developer tooling — one of the most commercially viable applications of agentic AI. Automated code review combines static analysis tools with LLM-powered understanding of intent, logic, and best practices. It is a showcase project for any portfolio.',
        mustknow: [
          'Combines tool use (AST parsing, regex scanning) with LLM reasoning.',
          'Parallel analysis of security, style, and logic reduces review time.',
          'Confidence scoring helps prioritize findings — not every issue is critical.',
          'Git integration makes this immediately deployable as a GitHub Action.'
        ]
      }
    ],

    'capstone-03.html': [
      {
        section: 'the-support-problem',
        label: 'The Support Problem',
        text: 'Customer support is the highest-volume application of agentic AI in production today. This capstone combines RAG (knowledge base search), memory (conversation history), sentiment analysis, and human-in-the-loop escalation into a complete support system. It is the most directly job-relevant project in the book.',
        mustknow: [
          'RAG grounds answers in your actual documentation and policies.',
          'Conversation memory enables multi-turn support interactions.',
          'Sentiment detection triggers proactive escalation before customers get angry.',
          'Human handoff preserves full context so agents do not ask customers to repeat themselves.'
        ]
      }
    ],

    'capstone-04.html': [
      {
        section: 'the-pipeline-problem',
        label: 'The Pipeline Problem',
        text: 'This capstone applies agentic AI to data engineering — a domain where automation has massive impact. Self-healing data pipelines that detect schema drift, validate data quality, and fix common issues autonomously save hours of manual work per week. This project demonstrates agent patterns in a non-conversational context.',
        mustknow: [
          'Agents can automate data pipeline operations, not just conversational tasks.',
          'Schema inference and drift detection are the agent\'s perception layer.',
          'Quality checks and validation are reasoning about data correctness.',
          'Self-healing (auto-fix) is the action layer — with human approval for risky fixes.'
        ]
      }
    ]
  };

  // ── Generate insight data for chapters not explicitly defined ──
  // Falls back to extracting from the page h2 elements
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

  function slugify(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function getCurrentChapter() {
    return window.location.pathname.split('/').pop() || '';
  }

  function buildInsightPanel(insights) {
    var html = '';
    html += '<div class="insight-header">';
    html += '<div class="insight-header-title">Why This Matters to You</div>';
    html += '<div class="insight-header-sub">Context as you read</div>';
    html += '</div>';
    html += '<div class="insight-body">';

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
    panel.innerHTML = buildInsightPanel(insights);
    document.body.appendChild(panel);

    // Setup scroll spy for insight cards
    setupInsightScrollSpy();
  }

  function setupInsightScrollSpy() {
    var cards = document.querySelectorAll('.insight-card');
    if (cards.length === 0) return;

    var cardMap = {};
    cards.forEach(function (card) {
      cardMap[card.dataset.section] = card;
    });

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
