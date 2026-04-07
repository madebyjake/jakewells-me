# jakewells.me

One-page personal profile site built with Next.js, Tailwind, and shadcn/ui.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS v4
- shadcn/ui components
- JSON-backed content model (profile, skills, projects, experience)
- Turbopack for local development/build

## Local development

```bash
pnpm install
pnpm run dev
```

Open `http://localhost:3000`.

## Testing

```bash
pnpm run test
pnpm run test:watch
pnpm run test:coverage
```

Vitest covers `src/lib` (content loaders, `cn`, contact helper). CI runs `test:coverage` and writes `coverage/` (gitignored).

Pre-commit runs lint and typecheck only; use `make check` or `pnpm run test` before pushing if you want tests locally without waiting on CI.

## Content editing

Update content files:

- `src/content/profile.json` — profile and links
- `src/content/skills.json` — skill groups; each item is `{ "label": "…" }` or `{ "label": "…", "hint": "…" }` for hover text (e.g. acronyms)
- `src/content/projects.json` — projects (validated array; use `"emphasis": "secondary"` and optional `"href"` for additional projects)
- `src/content/experience.json` — roles (validated array; `order` controls display order)

The UI reads and validates this content in `src/lib/content.ts`.

## Git workflow

- Long-lived branches: `main`, `dev`
- Branch from `dev` with typed names:
  - `feat/<name>`
  - `fix/<name>`
  - etc.
- Merge feature branches back into `dev` via PR.
- Promote `dev` into `main` via PR when ready to release.

## Commit and release workflow

- Use guided commits:

```bash
pnpm run commit
```

- Conventional Commits are enforced by `commitlint`.
- Commit subject max length: `50` characters.
- Generate changelog + version bump:

```bash
pnpm run release
```

Dry run:

```bash
pnpm run release:dry
```

## Deployment

### Vercel (recommended)

Deploy directly on the free tier with default Next.js settings.

### GitHub Pages (static fallback)

This repo supports static export mode:

```bash
STATIC_EXPORT=true pnpm run build
```

Then publish the generated `out/` directory.

## Makefile shortcuts

```bash
make install
make dev
make check
make build
make export
```
