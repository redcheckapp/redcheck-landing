# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the static marketing **landing page** for RedCheck, an AI-driven task/agenda platform. It is one of several decoupled services (landing page, SPA web app at `my.redcheckapp.com`, Java/Spring Boot API, Gemini-based AI engine) — this repo only contains the Astro-built landing page, served at `redcheckapp.com`. See `public/llms.txt` for the full cross-service architecture summary.

## Commands

```
npm run dev       # start dev server at localhost:4321
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

When starting the dev server, use background mode: `astro dev --background`. Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

There is no lint or test script configured in `package.json`. Verify changes by running `npm run build` (must compile without errors) and by checking the page manually in the browser via `astro dev` — including both color themes and both languages (toggle with the floating controls, bottom-left).

Full Astro documentation: https://docs.astro.build. Consult these guides before working on related tasks:
- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Architecture

- **Astro + Tailwind v4**, almost entirely `.astro` components with `is:inline` vanilla JS for interactivity — React (`@astrojs/react`, `lucide-react`) is used sparingly, just for icons. There is no client-side framework state; everything is DOM manipulation.
- **Single page app structure**: `src/pages/index.astro` composes section components from `src/components/` (`Hero`, `Problem`, `Features`, `HowItWorks`, `Story`, `FinalCTA`, `Footer`) inside `src/layouts/Layout.astro`.
- **i18n without routing**: there is no `/en` or `/es` route split. Spanish is the default/hardcoded content; translatable elements carry `data-es` / `data-en` attributes holding both strings, and a small script in `FloatingControls.astro` swaps `textContent` and toggles `<html lang>` on demand. When adding user-facing text, add both `data-es` and `data-en` attributes (Spanish as the element's own inline text) rather than introducing a new i18n mechanism.
- **Dark mode**: pure CSS via Tailwind's `dark:` variant, driven by a `.dark` class on `<html>` (see `@custom-variant dark` in `src/styles/global.css`). Theme is initialized synchronously in an inline `<script>` in `Layout.astro`'s `<head>` (before paint) to avoid flash-of-wrong-theme, then toggled client-side by `FloatingControls.astro`.
- **Cross-subdomain state via cookies**: theme (`rc_theme`) and language (`rc_lang`) are persisted both to `localStorage` and to a cookie scoped to `.redcheckapp.com` (`src/utils/cookies.ts`), so preferences carry over to the `my.redcheckapp.com` SPA. Session detection in `Navbar.astro` checks for a `redcheck_session=active` cookie to swap the "Log In" CTA for a "Go to Dashboard" link pointing at the app.
- **Bilingual imagery**: feature screenshots exist as separate light/dark × es/en asset pairs under `public/images/` (e.g. `f1-es-light.png`, `f1-en-dark.png`), toggled via `lang-es-wrapper` / `lang-en-wrapper` containers and Tailwind's `dark:` classes rather than swapped by script. Since all four (or two, for the GIF) variants sit in the DOM at once and only one is ever shown, every one of these images ships as a `<picture>` with a `.webp` source (generated via `magick <file>.png -quality 82 <file>.webp`, ~80% smaller) plus the original PNG/GIF as fallback, with explicit `width`/`height` (prevents layout shift) and `loading="lazy" decoding="async"` (defers fetching the hidden lang/theme variants until they're actually shown). Follow this same pattern for any new feature image added here.
- **Agent/AI-discoverability files** live under `public/`: `llms.txt` (llmstxt.org-style architecture summary + link index for AI agents), `auth.md` (how an agent authenticates to the Core API — links `/.well-known/oauth-authorization-server` (RFC 8414), `/.well-known/oauth-protected-resource` (RFC 9728), `/.well-known/api-catalog` (RFC 9727)), `robots.txt` (per-AI-crawler `Allow` rules for GPTBot/ChatGPT-User/ClaudeBot/Claude-User/PerplexityBot/etc., plus a `Content-Signal: ai-train=no, search=yes, ai-input=yes` line — deliberately: agents may read this page as context to help a user, but not train on it), and a JSON-LD `@graph` (`SoftwareApplication` + `Organization` + `Person`) inline in `Layout.astro`. These describe the whole RedCheck ecosystem (SPA, API, AI engine), not just this repo — keep them in sync whenever a change here touches product capabilities, URLs, or auth flows they describe (e.g. new features, endpoint/domain changes), even though the systems they describe mostly live outside this repo. Don't invent capabilities these files don't actually have (e.g. no MCP server, no dynamic client registration) — agent-facing docs lose value if they're inaccurate.
- **Deployment**: `Dockerfile` is a two-stage build (Node build → static files served by `nginx:alpine`). `.github/workflows/` builds and pushes the image to Docker Hub and deploys via SSH + `docker compose` on push to `main`.

## Brand & style conventions

- **Primary/accent color**: `#cc2229` (RedCheck red) — used for the logo mark, primary CTAs, and highlight accents. Reuse this exact hex rather than a Tailwind palette color.
- **Dark background**: `#0b1120` is the standard dark-mode surface color (body, cards), paired with Tailwind's `gray-*` scale for light mode — match existing components rather than introducing new neutrals.
- **Font**: Inter (loaded via Google Fonts in `global.css`), no other typefaces in use.
- **Copy tone**: Spanish copy is direct, conversational, and second-person ("tú"), avoiding corporate/formal register — mirror the tone of existing sections (e.g. `Problem.astro`, `Features.astro`) when writing new copy, and keep the English translation equally casual rather than a stiff literal translation.
