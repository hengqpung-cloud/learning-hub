---
name: fullstack-app-builder-ponytail
description: End-to-end web app planning and building skill that combines Ponytail's Lazy Senior Dev principles (minimum code, zero over-engineering, max token savings) with strict UI layout preservation and secure architecture.
rules:
  - ponytail-decision-ladder
  - UI-immutability
  - no-blind-coding
  - token-efficiency
---

# 🦥 FULLSTACK BUILDER (PONYTAIL LAZY SENIOR DEV EDITION)

## 🎯 CORE PHILOSOPHY
> **"The best code is the code never written. The shortest working diff wins."**
Always pick the simplest solution that works. Do NOT write boilerplate nobody asked for, do NOT invent new abstractions, and do NOT rewrite code or UI that already exists.

---

## 🪜 PHASE 1: THE PONYTAIL DECISION LADDER (TOKEN SAVER)
Before writing or modifying a single line of code, stop and climb this decision ladder:

1. **Does this need to be built at all?** (YAGNI - You Aren't Gonna Need It). Question complex requests.
2. **Does it already exist in this codebase?** Reuse existing helpers, components, or UI utilities.
3. **Does the Native Platform / Web API / Tailwind already do this?** Use HTML/Browser native features before importing JS libraries.
4. **Does an already-installed package solve it?** Never add new dependencies if existing ones cover the use case.
5. **Can this be solved in a single line or minimal diff?** Prefer deletion over addition.

---

## 🛡️ PHASE 2: FRONTEND & RESPONSIVE PROTECTION (ZERO UI DRIFT)

### 1. UI & Style Immutability
- **LOCKED WRAPPERS**: NEVER edit, replace, or delete existing CSS/Tailwind classes on top-level layout wrappers (`<main>`, `<header>`, `<footer>`, `<aside>`, core grid containers).
- **NO REGENERATION**: Do not rewrite untouched HTML/JSX elements. If a new UI element is required, inject it as an **isolated child component** inside `src/components/features/`.
- **NATIVE UI OVER HEAVY LIBRARIES**: Reach for native HTML5/CSS features first (e.g., native `<dialog>`, HTML validation, native input types) instead of creating heavy custom components.

### 2. Responsive Breakpoint Safety
- All existing Tailwind breakpoint modifiers (`sm:`, `md:`, `lg:`, `xl:`) are **IMMUTABLE**.
- Ensure all newly injected elements include text/overflow constraints (`min-w-0`, `truncate`, `break-words`) so mobile layouts (`<640px`) never break horizontally.

---

## ⚙️ PHASE 3: SECURE & DECOUPLED BACKEND

### 1. Isolated Logic
- Keep business logic and API fetching separate from UI components. Use custom hooks (`/hooks`) or service layers (`/services`).
- **Non-Destructive Binding**: Always supply fallback values (e.g., `data?.title || ''`) so empty API states never collapse the UI.

### 2. Root-Cause Fixes (No Band-Aids)
- Fix bugs at the root cause function once, rather than patching symptoms across multiple caller files.

---

## 📝 PHASE 4: EXECUTION & PATCHING PROTOCOL

When delivering updates to the user:
1. **Minimal Diff Output**: Provide only the modified lines or newly isolated files. Never output full 500-line files when only 10 lines changed.
2. **Self-Verification Checklist**:
   - [ ] Did I climb the Ponytail ladder to find the shortest possible solution?
   - [ ] Did I keep parent layout classes 100% intact?
   - [ ] Is the new code isolated without causing side effects on mobile views?