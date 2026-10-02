# Contributing to PramaanGrid

Thank you for your interest in contributing to **PramaanGrid (प्रमाण-ग्रिड)**! We welcome contributions from developers, civic researchers, municipal policy experts, and open-source advocates passionate about urban waste governance, algorithmic accountability, and civic anti-fraud systems.

PramaanGrid is distributed under the [GNU General Public License v3.0 (GNU GPL v3)](./LICENSE). By contributing to this repository, you agree that your contributions will be licensed under the same terms.

---

## Code of Conduct

All contributors and participants are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). Please report any unacceptable behavior to [reach.saad@outlook.com](mailto:reach.saad@outlook.com).

---

## Ways to Contribute

1. **Bug Reports**: If you find an issue, bug, or unexpected behavior in the municipal audit dashboard, citizen camera flow, or verification engine, please open an issue with full reproduction steps.
2. **Feature Proposals**: Suggest new verification techniques (e.g., additional VLM anchor checks, novel ZK-location proofs, municipal tender escrow logic).
3. **Documentation**: Help improve technical architecture documentation, installation guides, and API references.
4. **Code Contributions**: Implement bug fixes, new features, or performance improvements via Pull Requests.

---

## Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.18 or higher (v20+ recommended)
- **npm**: v9 or higher
- **Git**

### 2. Fork and Clone
```bash
git clone https://github.com/reachsaad/PramaanGrid.git
cd PramaanGrid
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the template configuration file:
```bash
cp .env.example .env.local
```

PramaanGrid includes a built-in `DEMO_MODE=true` engine with pre-seeded datasets, so you can test the full end-to-end UI, maps, simulator, and fraud verifier immediately without setting up external API keys.

To enable live AI inference and external tile providers, populate the keys in `.env.local`:
```env
NEXT_PUBLIC_DEMO_MODE=true
GEMINI_API_KEY=your_google_ai_studio_key
REPLICATE_API_TOKEN=your_replicate_token
NEXT_PUBLIC_CARTO_API_KEY=cb1_47vt_1_aac8885d7563bb7ed0120fbd
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pull Request Guidelines

### Branch Naming Conventions
- `feat/feature-name` - New features or civic modules
- `fix/bug-description` - Bug fixes and regression repairs
- `docs/topic-name` - Documentation updates or corrections
- `refactor/scope-name` - Code refactoring with zero functional changes
- `test/test-description` - Test suites and verification benchmarks

### Commit Message Conventions
We follow conventional commit format:
- `feat: add dual-angle anchor triangulation check`
- `fix: correct ward coordinate bounds on satellite map`
- `docs: update deployment and environment variable guide`
- `chore: update dependencies and build scripts`

### Pre-Submission Checklist
Before submitting your Pull Request, please ensure:
1. `npm run build` passes without any build errors.
2. `npx tsc --noEmit` completes with zero TypeScript errors.
3. Code adheres to existing styling (Tailwind CSS v4, Next.js 15 App Router conventions).
4. No sensitive secrets, private API keys, or temporary debugging tokens are committed.
5. All new text files strictly avoid em dashes (`\u2014`, `\u2013`); use standard hyphens or colons instead.

---

## Architecture Overview

- **`src/app/`**: Next.js 15 App Router pages, layouts, and route handlers.
- **`src/components/`**: Modular civic UI components, municipal command centers, and inspection modals.
- **`src/lib/`**: Anti-fraud verification engine, VLM landmark triangulation, and mock state management.
- **`public/`**: Static assets, brand iconography, and demo sample datasets.

---

## License & Copyright

PramaanGrid is free software: you can redistribute it and/or modify it under the terms of the **GNU General Public License as published by the Free Software Foundation, version 3**.

For licensing questions, contact [reach.saad@outlook.com](mailto:reach.saad@outlook.com).
