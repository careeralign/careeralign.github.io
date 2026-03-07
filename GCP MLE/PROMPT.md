# Prompt: Generate GCP Machine Learning Engineer Study Material

Copy the prompt below and use it with Claude or GPT-4o. Feed the PDF as context alongside this prompt.

---

## THE PROMPT

You are building a comprehensive, plain-language study guide website for the **Google Cloud Professional Machine Learning Engineer** certification. The target audience is working professionals who learn best from clear explanations and runnable code — not slides or marketing copy.

### Source Material
I'm providing the official GCP Professional Machine Learning Engineer Study Guide v2.0 (PDF). It contains:
- 20 courses across 6 exam sections
- Detailed focus areas for each section
- A glossary of key terms
- A list of Google Cloud products

### What I Need

For **each of the 20 courses** listed in the "Outline of learning path content" (pages 5-9 of the PDF), create:

#### A. One HTML study guide page
Follow this structure for each page:

1. **Title & Overview** — Course name, which exam section(s) it maps to, learning objectives in plain language
2. **Core Concepts** — Deep-dive explanation of every topic in the course's modules/labs. Write as if explaining to a smart colleague who hasn't used GCP before. Use analogies. No marketing language.
3. **GCP Services Deep Dive** — For each Google Cloud service mentioned (BigQuery, Vertex AI, Dataflow, etc.):
   - What it does in one sentence
   - When to use it vs alternatives
   - Key configuration options that appear on the exam
   - Pricing model (pay-per-query, per-node-hour, etc.)
4. **Architecture Patterns** — Common architectures combining these services (with text-based diagrams). Show how data flows from ingestion → preprocessing → training → serving → monitoring.
5. **Exam Focus Areas** — Map directly to the "Focus areas" listed in the PDF's exam knowledge sections. For each focus area, explain what the exam tests and the key decision points.
6. **Hands-On Walkthrough** — Step-by-step instructions for the key tasks (e.g., "Create a BigQuery ML model", "Deploy to Vertex AI endpoint"). Use `gcloud` CLI commands and Python SDK code.
7. **Common Mistakes & Exam Tips** — What candidates get wrong, tricky distinctions (e.g., AutoML vs custom training, online vs batch prediction, Dataflow vs Dataproc)
8. **Key Terms** — Glossary specific to this course, pulled from the study guide glossary + any additional terms

**Design**: Use the exact same dark theme, CSS variables, fonts, and component patterns as the existing GenAI study guides at careeralign.com/genai/. Specifically:
- Dark background (`#0b0d14` base), indigo accents (`#6366f1`)
- Space Grotesk (headings), Nunito (body), JetBrains Mono (code)
- Sticky nav with `CareerAlign` branding
- Collapsible table of contents sidebar
- Callout boxes for tips, warnings, and exam focus
- Code blocks with syntax highlighting
- Prev/next navigation between courses
- Self-contained HTML with inline CSS (no external stylesheet)

#### B. One companion Jupyter notebook (.ipynb)
For each course, create a runnable notebook that demonstrates the key concepts with working code:

1. **Setup cell** — `%pip install google-cloud-aiplatform google-cloud-bigquery google-cloud-storage tensorflow` + imports + authentication pattern using `google.auth.default()` or service account JSON
2. **For each module/lab in the course**, create markdown + code cells covering:
   - The concept explained in plain language (markdown)
   - Working Python code demonstrating it (code cell)
   - Expected output or explanation of what would happen in a live GCP environment (markdown)
3. **Use these patterns**:
   - Real GCP Python SDK calls where possible (`google-cloud-bigquery`, `google-cloud-aiplatform`, etc.)
   - Mark cells that require a live GCP project with `# REQUIRES: GCP project with billing enabled`
   - For expensive operations (training, deployment), show the code but comment it out with `# Uncomment to run — will incur charges`
   - Include mock/simulated alternatives where possible so the notebook is educational even without GCP access
   - Use `PROJECT_ID = os.environ.get("GCP_PROJECT_ID", "your-project-id")` pattern
4. **Include practical exam-relevant code** like:
   - BigQuery ML: `CREATE MODEL`, feature engineering, evaluation queries
   - Vertex AI: AutoML training, custom training jobs, endpoint deployment, batch prediction
   - TFX/Kubeflow: Pipeline definition, component creation
   - Feature Store: Feature creation, serving, online/offline retrieval
   - Model monitoring: Setting up drift detection, skew detection
   - Responsible AI: Explainability, What-If Tool usage

### Course List (create one HTML + one notebook for each)

```
01 - Introduction to AI and ML on Google Cloud
02 - Prepare Data for ML APIs on Google Cloud
03 - Working with Notebooks in Vertex AI
04 - Create ML Models with BigQuery ML
05 - Engineer Data for Predictive Modeling with BigQuery ML
06 - Feature Engineering
07 - TensorFlow on Google Cloud
08 - Production Machine Learning Systems
09 - MLOps Getting Started
10 - MLOps with Vertex AI: Manage Features
11 - Introduction to Generative AI
12 - Introduction to Large Language Models
13 - MLOps for Generative AI
14 - MLOps with Vertex AI: Model Evaluation
15 - ML Pipelines on Google Cloud
16 - Build and Deploy ML Solutions on Vertex AI
17 - Build Generative AI Applications on Google Cloud
18 - Responsible AI: Fairness and Bias
19 - Responsible AI: Interpretability and Transparency
20 - Responsible AI: Privacy and Safety
```

### Exam Section Mapping
Each HTML page should clearly indicate which exam section(s) it covers:
- **Section 1**: Architecting low-code ML solutions (Courses 01-05, 16, 17)
- **Section 2**: Collaborating to manage data and models (Courses 02, 03, 05, 06, 10)
- **Section 3**: Scaling prototypes into ML models (Courses 04, 06, 07, 08, 16)
- **Section 4**: Serving and scaling models (Courses 08, 10, 16)
- **Section 5**: Automating and orchestrating ML pipelines (Courses 09, 13, 15, 16)
- **Section 6**: Monitoring ML solutions (Courses 08, 14, 18, 19, 20)

### Additional Deliverables

1. **Index page** (`index.html`) — Course hub with:
   - All 20 courses as cards, organized by exam section
   - Progress tracking (localStorage checkboxes)
   - Exam section overview with percentage weights if known
   - "Open in Colab" badges for each notebook
   - Same design system as the GenAI learning path

2. **Folder structure**:
```
gcp-mle/
  index.html
  01-intro-ai-ml-gcp.html
  02-prepare-data-ml-apis.html
  ...
  20-responsible-ai-privacy-safety.html
  notebooks/
    01-intro-ai-ml-gcp.ipynb
    ...
    20-responsible-ai-privacy-safety.ipynb
```

### Quality Guidelines
- **Plain language**: No "leverage", "utilize", or "empower". Write like you're explaining to a friend.
- **Exam-focused**: Every section should help someone pass the exam, not just understand the theory.
- **Practical**: Show real `gcloud` commands and Python code, not just concepts.
- **Honest about complexity**: Don't oversimplify. If something is hard, say so and explain why.
- **Compare and contrast**: The exam loves asking "when would you use X vs Y?" — address these explicitly.
- **No plagiarism**: Do not copy text from the PDF. Rewrite everything in your own words. The PDF is the outline, not the content.
