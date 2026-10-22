# Smart Quiz Builder

**Practice Azure concepts. Understand your answers. Learn beyond memorization.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Try%20the%20App-0ea5e9)](https://smartquiz-az900-prep.vercel.app/)

## About the Project

Smart Quiz Builder is an unofficial Azure Fundamentals (AZ-900) practice application developed for the Vibe Coding Hackathon: AZ-900 Exam Prep Edition.

The project addresses a common challenge in exam preparation: learners can memorize answers without understanding the concepts behind them. Smart Quiz Builder makes practice more educational by providing immediate feedback, detailed answer explanations, and beginner-friendly analogies.

**Target users:** AZ-900 candidates, including learners in the #1MillionDevs community.

## Problem Statement

Traditional practice can encourage learners to memorize answers instead of understanding the underlying concepts. When a question is presented differently, learners may struggle to apply what they have memorized.

## Our Solution

Smart Quiz Builder turns multiple-choice practice into a learning experience. After a learner selects an answer, the application provides feedback, explains the correct answer, discusses incorrect options, and offers a beginner-friendly analogy.

The goal is to help learners understand why an answer is correct rather than simply remember which option to select.

## Live Demo

**Try the application:** https://smartquiz-az900-prep.vercel.app/

## Features

* **Topic selection:** Practise Cloud Concepts, Architecture & Core Services, or Management & Governance.
* **Multiple-choice quizzes:** Answer questions with four possible options.
* **Instant feedback:** See whether your selected answer is correct.
* **Detailed explanations:** Learn why the correct answer is right and why the other options are incorrect.
* **Beginner-friendly analogies:** Reveal simple real-world comparisons to help explain Azure concepts.
* **Progress tracking:** Follow your progress and monitor correct answers.
* **Streak tracking:** Track consecutive correct answers and your best streak.
* **Results screen:** Review your performance when you finish a quiz.
* **Pass threshold:** The application uses an 80% threshold for its completion celebration.
* **Sound controls:** Enable or disable sound effects.
* **Randomized question order:** Questions are shuffled when a quiz starts or restarts.

## Technology Stack

| Technology   | Purpose                                            |
| ------------ | -------------------------------------------------- |
| React        | Builds the interactive user interface.             |
| TypeScript   | Provides static typing for the application.        |
| Vite         | Provides development and production build tooling. |
| Tailwind CSS | Styles the application.                            |
| Lucide React | Provides interface icons.                          |
| GitHub       | Hosts the source code and supports collaboration.  |
| Vercel       | Hosts the live application.                        |
| Bolt.new     | Used in the application's development workflow.    |

## Architecture

Smart Quiz Builder uses a React and TypeScript frontend.

### Main Components

* **`src/App.tsx`** — coordinates the quiz state, selected topic, question progression, scoring, streaks, and results.
* **`src/components/QuizCard.tsx`** — renders the current question, answer choices, feedback, explanations, and beginner analogy.
* **`src/components/Header.tsx`** — displays the application heading, topic selectors, and sound control.
* **`src/data/questions.ts`** — contains the question data, answer options, correct answers, explanations, analogies, and topic definitions.
* **`src/main.tsx`** — initializes and renders the React application.
* **`src/index.css`** — defines global styles, visual effects, and animations.

### Quiz Workflow

1. The learner opens the application.
2. The learner selects a topic or chooses all topics.
3. The application displays a multiple-choice question.
4. The learner selects an answer.
5. The application provides immediate feedback and explains the correct answer and incorrect alternatives.
6. The learner can reveal a beginner-friendly analogy.
7. The learner continues through the quiz.
8. The results screen presents the learner's performance.

The question bank is defined in the application's source code. The quiz state and scoring are managed by the React application.

## Getting Started

### Prerequisites

Install Node.js and npm before running the project locally.

### Installation

Clone the repository:

```bash
git clone https://github.com/weyne-4/Smartquiz-az900-prep.git
```

Enter the project directory:

```bash
cd Smartquiz-az900-prep
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

To create a production build, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

## Future Scalability

The Smart Quiz Builder approach could be extended to other Microsoft Fundamentals certification paths:

* **AI-900:** Azure AI Fundamentals.
* **DP-900:** Azure Data Fundamentals.
* **SC-900:** Security, Compliance, and Identity Fundamentals.

These are proposed future extensions, not claims that these additional quiz tracks are currently implemented.

## Prompt Engineering

The repository includes `PROMPTS.md`, which documents the approach used to generate structured, original, scenario-based practice questions.

The approach emphasizes explanations, plausible incorrect options, beginner-friendly analogies, and alignment with the publicly available certification skills outline.

Generated learning content should be reviewed for accuracy against current Microsoft Learn documentation before publication.

## Team

Developed collaboratively by a team of three for the Vibe Coding Hackathon: AZ-900 Exam Prep Edition.

* **theeorip-collab**
* **mursalharun2000-byteblitz**
* **weyne-4**

## Disclaimer

Smart Quiz Builder is an unofficial exam preparation project. It is not affiliated with, endorsed by, or sponsored by Microsoft.

The application is intended for learning and practice. Questions should be original and must not reproduce real certification exam questions or proprietary exam material.

