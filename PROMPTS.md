# PROMPTS.md: Prompt Engineering System for the Smart Quiz Builder

> How we turned a single, carefully engineered prompt into a repeatable question-generation pipeline for Microsoft certification practice (starting with **AZ-900: Azure Fundamentals**).

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Persona & Role Framing](#2-persona--role-framing)
3. [Constraint Engineering](#3-constraint-engineering)
4. [Schema Enforcement](#4-schema-enforcement)
5. [Scalability Template](#5-scalability-template)
6. [Quality Assurance Checklist](#6-quality-assurance-checklist)

---

## 1. Executive Summary

### The Problem: Memorization vs. Mastery

Most certification prep falls into one of two traps:

| Trap | What it looks like | Why it fails learners |
|---|---|---|
| **Exam dumps** | Recycled, leaked, or near-verbatim exam questions | Violates exam policies, rewards pattern recognition over understanding, and goes stale when the exam changes |
| **Shallow flashcards** | "What does IaaS stand for?" | Tests vocabulary, not the ability to choose the right service for a real situation |

Learners who memorize answers can pass a familiar question and still fail the same concept when it is reworded. Real certification exams, and real jobs, test whether you can **map a business scenario to the correct concept**.

### Our Approach

The Smart Quiz Builder generates **original, scenario-based questions** aligned to the public Microsoft Learn skills outline. Every question ships with:

- A realistic business scenario (not a definition recall)
- Four distinct options
- An explanation of why the correct answer is right
- A **one-sentence debunk of every wrong option**, so learners study the distractors, not just the answer
- A **real-world analogy** that anchors the concept in everyday experience

The result is a dataset designed to build *conceptual mastery*: the learner understands why an answer is right and why the near-misses are wrong.

### Deliverable Produced by This Prompt System

- **12 questions** across the **3 AZ-900 skill domains** (4 per domain)
- Output as a **single valid JSON array** that drops directly into the app

---

## 2. Persona & Role Framing

### The Technique

Instead of asking a generic model to "write some quiz questions," we frame the model as a specific expert with a specific job:

```text
You are an expert Azure Cloud Architect and curriculum designer for the
Microsoft AZ-900 (Azure Fundamentals) exam.
```

### Why a Dual Persona Works

The role combines two complementary skill sets:

| Persona facet | What it contributes |
|---|---|
| **Azure Cloud Architect** | Technical accuracy and realistic scenarios. Architects think in trade-offs (cost vs. resilience, managed vs. self-managed), which is exactly how good fundamentals questions are built |
| **Curriculum Designer** | Pedagogy. It pushes the model toward balanced difficulty, one concept per question, plausible distractors, and explanations that teach |

### Observed Benefits

- **Scenario realism:** Questions start from a business need ("A healthcare company must stay available if a datacenter loses power") rather than a definition.
- **Consistent register:** Vocabulary and tone stay at the right level for a *fundamentals* exam: not too trivial, not specialist-level.
- **Better distractors:** An architect persona naturally picks wrong answers that are real Azure services used in the wrong context, which is far more instructive than obviously absurd options.

### Anchoring to an Authoritative Source

The persona is paired with an explicit reference point: *"the public Microsoft Learn AZ-900 outline."* Anchoring to a public, official skills outline keeps content aligned to the syllabus without relying on any proprietary exam material.

---

## 3. Constraint Engineering

The persona sets the voice; **constraints set the guardrails**. We engineered three families of rules.

### 3.1 Eliminating Exam-Dump Duplication

| Constraint | Prompt language | Purpose |
|---|---|---|
| Originality | "12 **original**, scenario-based multiple-choice practice questions" | Forces fresh composition instead of recall of memorized items |
| Explicit prohibition | "Do NOT copy real exam dumps or use proprietary Microsoft logos" | States the legal and ethical boundary directly |
| Public-source anchoring | "Use realistic scenarios based on the public Microsoft Learn AZ-900 outline" | Restricts the knowledge base to openly published syllabus topics |
| Scenario-first design | Every question must be a "realistic problem or business scenario" | Makes verbatim copying structurally unlikely, since each scenario is newly invented |

**Why this works:** exam dumps are overwhelmingly definition-recall or fixed-wording items. By requiring a *newly invented business scenario* for each question, the output is original by construction rather than by hope.

### 3.2 Reducing Hallucinations

LLMs can invent service names, features, or behaviors. We reduced this risk with layered controls:

1. **Closed topic list per domain.** The prompt enumerates the exact concepts in scope (e.g., *Domain 3: Azure Policy, Resource Locks, Cost Management, Microsoft Entra ID, Microsoft Defender for Cloud*). The model chooses from a known set rather than free-associating.
2. **Current naming.** The prompt uses current product names (e.g., *Microsoft Entra ID*, not the older Azure Active Directory), which steers the model away from outdated terminology.
3. **Fundamentals-level scope.** Staying at AZ-900 depth avoids edge cases where a model is likely to guess at limits, SKUs, or pricing.
4. **Explanations that must justify.** Requiring `explanationCorrect` forces the model to state *why*, which surfaces reasoning errors that a bare answer key would hide.
5. **Human-in-the-loop verification.** Generated content is reviewed against Microsoft Learn before publishing (see [Quality Assurance Checklist](#6-quality-assurance-checklist)). Prompting reduces hallucination risk; it does not remove the need to verify.

### 3.3 Forcing Distractor Debunking

This is the highest-value constraint for learning outcomes.

```text
"explanationDistractors": A concise 1-sentence breakdown explaining
specifically why EACH wrong option is incorrect (crucial for learner value).
```

| Design choice | Effect |
|---|---|
| **"EACH wrong option"** | No wrong answer is left unexplained, so the model cannot skip the hard ones |
| **"specifically"** | Blocks generic filler like "this is not correct"; explanations must reference the scenario |
| **"1-sentence"** | Keeps feedback scannable and the dataset compact |
| **Keys limited to wrong options** | The schema omits the correct key, so there is no ambiguity about what each entry means |

**Why it matters:** learners often hold *partial* misconceptions (e.g., confusing resource groups with availability zones). Debunking every distractor attacks those misconceptions directly, turning every question into several mini-lessons.

### 3.4 Supporting Quality Constraints

- **Even coverage:** exactly 4 questions per domain, so no domain is over- or under-represented.
- **Difficulty labels:** each question is tagged `Easy`, `Medium`, or `Hard` for progressive learning paths.
- **Analogy requirement:** a single-sentence `realWorldAnalogy` supports memory retention without bloating the content.

---

## 4. Schema Enforcement

### The Technique

We specify the output as a **concrete JSON schema, shown by example**, plus strict output rules:

```text
Output the entire dataset as a single valid, production-ready JSON array
with NO trailing text or markdown wrapping outside the JSON.
```

### The Schema

```json
[
  {
    "id": 1,
    "domain": "Cloud Concepts",
    "difficulty": "Easy",
    "question": "...",
    "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
    "correctAnswer": "B",
    "explanationCorrect": "...",
    "explanationDistractors": {
      "A": "Why A is wrong...",
      "C": "Why C is wrong...",
      "D": "Why D is wrong..."
    },
    "realWorldAnalogy": "..."
  }
]
```

### Why This Enabled Zero-Friction Integration with Bolt.new

| Schema decision | Integration benefit |
|---|---|
| **Single top-level array** | Can be pasted straight into a `questions.json` file or imported as a constant, with no wrapper object to unwrap |
| **No markdown fences or prose** | The output parses with `JSON.parse` immediately; there is no cleanup step |
| **Flat, predictable keys** | A Bolt.new prompt can reference exact field names (`question`, `options`, `correctAnswer`) when generating the UI |
| **`options` as an object keyed A-D** | Maps directly to rendering answer buttons and comparing against `correctAnswer` |
| **`explanationDistractors` keyed by option letter** | The UI can show the explanation for whichever wrong option the learner clicked, with a simple key lookup |
| **`domain` and `difficulty` fields** | Enables filtering, domain-level progress tracking, and score breakdowns with no additional data modeling |
| **Stable numeric `id`** | Supports tracking progress, bookmarking, and spaced repetition |

### Practical Tips

When you hand the dataset to Bolt.new (or any app generator), tell it the schema explicitly, for example:

```text
Build a quiz app that loads questions from questions.json. Each item has:
id, domain, difficulty, question, options{A,B,C,D}, correctAnswer,
explanationCorrect, explanationDistractors{<letter>: string}, realWorldAnalogy.
After the user answers, show whether they were right, then display
explanationCorrect. If they chose a wrong option, show that option's entry
from explanationDistractors, and finish with the realWorldAnalogy.
```

Because the data contract is identical every time, regenerating the dataset never requires changes to the app.

### Validation Rules (Recommended)

Run these checks automatically before shipping a dataset:

- Output parses as valid JSON
- Exactly 4 options per question, keyed `A`-`D`
- `correctAnswer` is one of `A`-`D`
- `explanationDistractors` contains exactly the **three** incorrect keys, and not the correct one
- `id` values are unique and sequential
- `domain` is one of the allowed domain strings

---

## 5. Scalability Template

The same pipeline works for any Microsoft Fundamentals exam. Only the **exam name, domains, and in-scope topics** change; persona, constraints, and schema stay fixed.

### 5.1 Reusable Master Prompt

Copy, fill in the `{{placeholders}}`, and run.

```text
You are an expert {{ROLE}} and curriculum designer for the Microsoft
{{EXAM_CODE}} ({{EXAM_NAME}}) exam.

I need an official-syllabus-aligned dataset of {{TOTAL_QUESTIONS}} original,
scenario-based multiple-choice practice questions ({{PER_DOMAIN}} for each of
the {{DOMAIN_COUNT}} official {{EXAM_CODE}} exam domains).

Strict Guidelines:
1. Do NOT copy real exam dumps or use proprietary Microsoft logos. Use
   realistic scenarios based on the public Microsoft Learn {{EXAM_CODE}}
   skills outline.
2. Target the official domains:
   - Domain 1: {{DOMAIN_1_NAME}} ({{DOMAIN_1_TOPICS}})
   - Domain 2: {{DOMAIN_2_NAME}} ({{DOMAIN_2_TOPICS}})
   - Domain 3: {{DOMAIN_3_NAME}} ({{DOMAIN_3_TOPICS}})
   {{ADD_MORE_DOMAINS_IF_NEEDED}}
3. Use current Microsoft product names, and stay at fundamentals depth.
   Do not invent features, limits, SKUs, or prices.
4. Spread difficulty across Easy, Medium, and Hard within each domain.
5. For every single question, provide:
   - "question": A realistic problem or business scenario.
   - "options": 4 distinct, plausible options (labeled A, B, C, D).
   - "correctAnswer": The correct option key.
   - "explanationCorrect": Clear explanation of why this answer is right.
   - "explanationDistractors": A concise 1-sentence breakdown explaining
     specifically why EACH wrong option is incorrect. Include only the three
     incorrect keys.
   - "realWorldAnalogy": A 1-sentence relatable real-life analogy.

Output the entire dataset as a single valid, production-ready JSON array with
NO trailing text or markdown wrapping outside the JSON, using this exact shape:
[
  {
    "id": 1,
    "domain": "...",
    "difficulty": "Easy",
    "question": "...",
    "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
    "correctAnswer": "B",
    "explanationCorrect": "...",
    "explanationDistractors": { "A": "...", "C": "...", "D": "..." },
    "realWorldAnalogy": "..."
  }
]
```

### 5.2 Parameter Presets

> **Important:** Microsoft periodically updates exam skills outlines and weightings. Before generating, copy the current domain names and topics from the official **"Skills measured"** section of each exam's Microsoft Learn page and use those in the placeholders. The presets below are starting points.

| Placeholder | AI-900 | DP-900 | SC-900 |
|---|---|---|---|
| `{{EXAM_NAME}}` | Azure AI Fundamentals | Azure Data Fundamentals | Security, Compliance, and Identity Fundamentals |
| `{{ROLE}}` | Azure AI Solutions Architect | Azure Data Architect | Microsoft Security Architect |
| Domain 1 | AI workloads and considerations (responsible AI, common AI scenarios) | Core data concepts (structured vs. unstructured, batch vs. streaming) | Security, compliance, and identity concepts (Zero Trust, shared responsibility, defense in depth) |
| Domain 2 | Fundamental principles of machine learning on Azure (regression, classification, clustering) | Relational data on Azure (SQL offerings, normalization, common database objects) | Microsoft Entra capabilities (authentication, access management, identity protection) |
| Domain 3 | Computer vision, natural language processing, and generative AI workloads on Azure | Non-relational data and analytics workloads on Azure (Cosmos DB, Blob storage, data warehousing, Power BI) | Microsoft security and compliance solutions (Defender, Sentinel, Purview, Compliance Manager) |

### 5.3 Example: Filled-In Header for SC-900

```text
You are an expert Microsoft Security Architect and curriculum designer for
the Microsoft SC-900 (Security, Compliance, and Identity Fundamentals) exam.

I need an official-syllabus-aligned dataset of 12 original, scenario-based
multiple-choice practice questions (4 for each of the 3 official SC-900 exam
domains).
...
- Domain 1: Security, Compliance, and Identity Concepts (Zero Trust, shared
  responsibility, defense in depth, encryption, hashing)
- Domain 2: Microsoft Entra Capabilities (authentication methods, MFA,
  Conditional Access, identity governance)
- Domain 3: Microsoft Security and Compliance Solutions (Microsoft Defender,
  Microsoft Sentinel, Microsoft Purview, Compliance Manager)
```

### 5.4 Scaling Beyond 12 Questions

| Goal | Change |
|---|---|
| Bigger question bank | Increase `{{PER_DOMAIN}}`. For large sets, generate in batches of ~10-15 questions per request and continue `id` numbering from the previous batch |
| Avoid repeated scenarios across batches | Add a line such as: *"Do not reuse these scenarios: [list of prior question stems]."* |
| Focus on weak areas | Narrow `{{DOMAIN_N_TOPICS}}` to a single sub-topic and raise `{{PER_DOMAIN}}` |
| Targeted difficulty | Add: *"Generate only Hard questions"* or specify a ratio |
| Localization | Add: *"Write all text fields in {{LANGUAGE}}; keep JSON keys and option letters in English."* |

---

## 6. Quality Assurance Checklist

Prompting gets us a high-quality first draft. These steps make the dataset trustworthy.

**Automated**

- [ ] JSON parses without errors
- [ ] Schema validation passes (see [Validation Rules](#validation-rules-recommended))
- [ ] No duplicate `id` values or duplicate question stems

**Human review (recommended before publishing)**

- [ ] Each `correctAnswer` verified against current Microsoft Learn documentation
- [ ] Exactly one option is defensibly correct (no ambiguous "also correct" distractors)
- [ ] Distractor explanations are accurate, not just plausible-sounding
- [ ] Product names and features are current (Microsoft renames services periodically)
- [ ] No text is lifted from exam dumps or third-party question banks
- [ ] Difficulty labels roughly match the actual cognitive load of the question

---

### Summary

| Layer | Technique | Outcome |
|---|---|---|
| **Persona** | Azure Architect + Curriculum Designer | Technically credible, pedagogically sound questions |
| **Constraints** | Originality rules, closed topic lists, mandatory distractor debunking | No dump copying, fewer hallucinations, deeper learning |
| **Schema** | Example-driven JSON with strict output rules | Paste-and-run integration into Bolt.new |
| **Template** | Parameterized master prompt | One pipeline for AZ-900, AI-900, DP-900, SC-900, and beyond |
