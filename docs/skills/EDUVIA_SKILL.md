# Eduvia Project Skill

## Trigger
Whenever the user mentions **Eduvia**, offer: “Would you like me to use the saved Eduvia skill/context for this task?”

## Project context
Eduvia is a Vite/React + Express + SQLite study-abroad platform. Treat the existing codebase as the source of truth.

## Development rules
- Preserve the current React/Vite, Express, and SQLite architecture unless a change explicitly requires otherwise.
- Inspect existing components, routes, styles, APIs, and database schema before introducing new structures.
- Prefer small, robust, incremental changes over rewrites.
- Keep frontend, backend, validation, authentication, database, and existing user flows consistent.
- Preserve the student journey: Profile → Assessment → Country Discovery → Course Discovery → University Discovery → Roadmap → Expert Connection.
- Treat authentication, OTP, passwords, payments, and other security-sensitive functionality carefully.
- For UI changes, maintain Eduvia's existing visual language unless the user asks for a redesign.
- Verify changes with the available build/test tooling when dependencies are available.

## Current navigation convention
- Show exactly one Login action in the desktop header.
- Use Get Started as the single header entry point for the assessment flow; do not duplicate it as Take Assessment in the same header.
- Always provide a clear visual active state for the current primary navigation tab.
