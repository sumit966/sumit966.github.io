# Sumit Raj — Engineering Portfolio

Cinematic, role-based portfolio for [Sumit Raj](https://github.com/sumit966).

- Preview domain (existing): https://sumit966-github-io.vercel.app
- GitHub Pages URL: https://sumit966.github.io

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, Three.js, Framer Motion is available for motion if needed (intro/hero currently use CSS + Three.js).

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Content

Canonical data lives in `data/projects.ts`, `data/roles.ts`, and `data/site.ts`.

Role resumes are served from `public/resumes/`. Replace those PDFs in place if a newer version is needed.

## Safety

Production `main` was backed up before this rebuild:

- Branch: `backup/pre-cinematic-rebuild-2026-10-16`
- Tag: `backup-pre-cinematic-rebuild-2026-10-16`
- Commit: `53988aee0eac9b1df1df9a09efe23d9096d2e3ae`
