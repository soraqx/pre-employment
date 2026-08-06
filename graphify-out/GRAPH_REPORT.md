# Graph Report - pre-employment guide  (2026-08-06)

## Corpus Check
- 13 files · ~1,245 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 62 nodes · 54 edges · 18 communities (7 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- package.json
- devDependencies
- PopupInfo.tsx
- tsconfig.json
- dependencies
- content.config.ts
- AGENTS.md
- @astrojs/mdx
- @astrojs/react
- framer-motion
- react
- react-dom
- tailwindcss
- @tailwindcss/vite
- 01-getting-started.mdx

## God Nodes (most connected - your core abstractions)
1. `scripts` - 5 edges
2. `include` - 3 edges
3. `@astrojs/mdx` - 2 edges
4. `@astrojs/react` - 2 edges
5. `@tailwindcss/vite` - 2 edges
6. `astro` - 2 edges
7. `framer-motion` - 2 edges
8. `react` - 2 edges
9. `react-dom` - 2 edges
10. `tailwindcss` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (18 total, 11 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, astro, build, dev, preview, type (+1 more)

### Community 1 - "devDependencies"
Cohesion: 0.22
Nodes (9): @astrojs/check, devDependencies, @astrojs/check, @types/react, @types/react-dom, typescript, @types/react, @types/react-dom (+1 more)

### Community 3 - "tsconfig.json"
Cohesion: 0.25
Nodes (7): **/*, astro/tsconfigs/strict, .astro/types.d.ts, dist, exclude, extends, include

### Community 4 - "dependencies"
Cohesion: 0.67
Nodes (3): astro, dependencies, astro

## Knowledge Gaps
- **30 isolated node(s):** `name`, `type`, `version`, `private`, `dev` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`, `@astrojs/mdx`, `@astrojs/react`, `framer-motion`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/vite`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._