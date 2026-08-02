# Eshaan Arya — Portfolio

A polished, production-ready single-page portfolio for an **Enterprise SaaS Implementation Consultant**. Built with Next.js 15, TypeScript, Tailwind, Framer Motion, and shadcn-style primitives. Dark by default, light mode optional.

## Sections (in order)

1. **Hero** — eyebrow / headline / subhead / 3 CTAs / target-role tags
2. **Profile Header** — compact profile card: photo, availability, socials, resume, contact
3. **Overview** — professional intro + four capability cards + "currently seeking" chips
4. **Experience** — expandable timeline (HighRadius + editable placeholders)
5. **Education** — Purdue MSBAIM + SRM CSE
6. **Skills** — five categories (Implementation & Consulting, Technical & Integrations, Analytics, Product & Customer, AI)
7. **Tools** — SQL / Python / Power BI / Salesforce / SAP / Oracle / AI tools
8. **Certifications** — Azure AI Fundamentals, SAP S/4HANA Cloud
9. **Contact** — form with spam protection, mailto fallback, Calendly, all socials

Plus:

- `/resume` — embedded PDF viewer + print-friendly resume fallback + vCard
- `/terminal` — CLI easter egg (`help`, `whoami`, `ls`, `sudo hire-me`)
- `/not-found` — designed 404

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · Radix (Dialog/Slot/Tooltip) · Lucide · Sonner · React Markdown + remark-gfm.

## Getting started

```bash
npm install
cp .env.example .env.local
# drop your PDF at public/resume/Eshaan-Arya-Resume.pdf
# (optional) drop your headshot at public/avatar.jpg
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Build:

```bash
npm run build && npm start
```

## Editable content (no code required)

All content lives in `/content` and is imported statically at build time:

| File | Purpose |
|---|---|
| `content/profile.json` | Name, headline, positioning, socials, resume URL, target roles |
| `content/overview.json` | Overview paragraphs + four capability cards |
| `content/experience.json` | Career timeline |
| `content/education.json` | Education entries |
| `content/skills.json` | Grouped skills |
| `content/tools.json` | Tools grid |
| `content/certifications.json` | Certifications |

## Placeholders to fill in

Edit `content/profile.json` to replace these:

- Email address
- LinkedIn / GitHub / Instagram / Calendly URLs
- Resume file (drop the PDF at `public/resume/Eshaan-Arya-Resume.pdf`)
- Headshot (drop the file at `public/avatar.jpg` — the site falls back to an initials monogram if missing)

And in `content/experience.json`:

- Exact HighRadius dates and location
- Internship or part-time roles (there is a stub entry ready)

## Integrations

### LinkedIn — no API required

LinkedIn does not offer a public personal-profile API. Import via the export tool:

1. Request a data export at [linkedin.com/mypreferences/d/download-my-data](https://www.linkedin.com/mypreferences/d/download-my-data).
2. When it arrives, extract the zip locally.
3. Run:

   ```bash
   node scripts/sync-linkedin.mjs ./path/to/linkedin-export
   ```

4. The script writes `content/*.linkedin.json` — review, then merge into the primary files.

### GitHub — public API

```bash
GITHUB_USERNAME=earya1999 node scripts/sync-github.mjs
```

Writes `content/github.json`. No token required, but rate-limited without one.

### Instagram

The site does not scrape Instagram (per Meta's ToS). It links directly to your profile. For a curated gallery, add a `content/instagram.json` file with hand-picked posts and wire up a small gallery section.

### Contact form

By default the form opens the visitor's mail client (mailto:). To route through a real endpoint, set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in `.env.local` — the form POSTs `{ name, email, message }` JSON to that URL. Works with:

- **Resend** — via a `/api/contact` route (recommended)
- **Formspree** — set the endpoint directly
- **Custom server action** — any endpoint that accepts JSON

## Accessibility & performance

- Semantic HTML, keyboard navigation, visible focus rings
- `prefers-reduced-motion` respected (animations neutralized)
- `next/font` for Inter + JetBrains Mono (self-hosted)
- `next/image` for the avatar with AVIF + WebP
- `experimental.optimizePackageImports` for Lucide + Framer Motion
- Static generation for every page (except the Edge OG image)
- Sitemap + robots + Person JSON-LD

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import into [Vercel](https://vercel.com/new).
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Attach your domain under Vercel → Domains.
5. Deploy.

Vercel picks up `vercel.json` for security headers, redirects (`/linkedin`, `/github`, `/calendly`, `/cv`), and clean URLs automatically.

## Folder structure

```
├── content/                    # editable content
│   ├── profile.json
│   ├── overview.json
│   ├── experience.json
│   ├── education.json
│   ├── skills.json
│   ├── tools.json
│   └── certifications.json
├── public/
│   ├── favicon.svg
│   ├── eshaan-arya.vcf
│   └── resume/*.pdf
├── scripts/
│   ├── sync-github.mjs
│   └── sync-linkedin.mjs
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx
│   │   ├── not-found.tsx
│   │   ├── resume/page.tsx
│   │   └── terminal/page.tsx
│   ├── components/
│   │   ├── ui/                 # button, badge, card, section
│   │   ├── sections/           # hero, profile-header, overview, experience, education, skills, tools, certifications, contact
│   │   ├── navbar.tsx / footer.tsx
│   │   ├── theme-provider.tsx / theme-toggle.tsx
│   │   ├── command-menu.tsx
│   │   ├── terminal.tsx
│   │   └── print-button.tsx
│   └── lib/
│       ├── utils.ts
│       └── content.ts
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── vercel.json
└── package.json
```

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open command palette (fuzzy search + quick actions) |
| `Esc` | Close command palette |
| `↑` / `↓` | Navigate command palette / recall terminal history |

## License

Code MIT. Content © Eshaan Arya.
