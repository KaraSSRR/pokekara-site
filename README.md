# pokekara-site

The official website for **Pokekara Studio** and its first title, **VITALE: Football Career**. It will be served at <https://pokekara.online/>.

The site:

- presents Pokekara Studio and VITALE to players, partners and investors;
- explains how the studio uses Claude for game design, architecture and engineering (`/claude/`);
- provides the founder profile and engineering evidence (`/studio/`);
- will become the official website linked from the Apple App Store and Google Play listings once VITALE is released.

VITALE is **in active development and not yet released**. The site must not imply otherwise, and must not show invented metrics (downloads, revenue, retention, ratings, funding, testimonials or release dates).

This repository is separate from the VITALE game repository. Do not add game source code here.

## Local preview

The site is static HTML, CSS and vanilla JavaScript. There is no build step and nothing to install.

From the repository root, start any static file server. With Python 3:

```bash
python -m http.server 8765
```

Then open <http://localhost:8765/> and <http://localhost:8765/claude/>.

Use a server rather than opening `index.html` directly from disk, so that directory routes such as `claude/` resolve correctly.

## Repository structure

```
/
├── index.html                 Homepage
├── studio/index.html          Founder profile and current project status
├── claude/index.html          "How Pokekara Builds VITALE with Claude" case study
├── assets/
│   ├── css/
│   │   ├── tokens.css         Design tokens: colours, type scale, spacing, motion
│   │   ├── base.css           Reset, typography, focus styles, layout primitives
│   │   ├── components.css     Header, navigation, buttons, status pills, footer
│   │   ├── home.css           Homepage sections, incl. the interactive phone concept (with their breakpoints)
│   │   ├── claude.css         /claude/ case study layout (with its breakpoints)
│   │   └── responsive.css     Shared breakpoints: header, navigation, footer
│   ├── js/main.js             Progressive enhancement: mobile menu, phone tabs, journey strip, reveal, scroll-spy
│   └── img/og-image.png       Social sharing image (1200×630)
├── docs/
│   └── claude-development-case-study.md   Long-form source copy for /claude/
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── CNAME                      Custom domain for GitHub Pages (pokekara.online)
```

## Editing guidance

- **Copy.** Page text lives directly in `index.html` and `claude/index.html`. Edit the longer case-study text in `docs/claude-development-case-study.md` first, then update `claude/index.html` to match. Keep founder attribution consistent with `studio/index.html`.
- **Truthfulness.** Keep the product status accurate ("in active development", "planned for Apple App Store and Google Play"). Do not add metrics, ratings, testimonials, partner logos or launch dates unless they are real and approved.
- **Homepage story.** The homepage sells VITALE first: hero → product thesis → career journey → mobile experience → built differently → technology & production pipeline (simulation → Unity client ← Blender production) → Built with Claude → players → investors → roadmap → studio. Keep that order product-led.
- **Hero phone.** The phone in the hero is an original HTML/CSS interface concept with the six confirmed VITALE tabs (Home, Training, Business, Media, Career, World). Each tab is a `section.scr` panel in `index.html`; the tab bar is an ARIA tablist driven by `main.js` (click, arrow keys, Home/End). Without JavaScript the Home screen shows. All clubs, players and numbers on it are fictional, and it is labelled "Representative interface concept · in development".
- **Visuals.** Phone and UI illustrations are concepts, not in-game footage. Do not add club crests, league or federation marks, or real player photos. Real VITALE screenshots can replace the concept panel once they are approved for public use; label them accurately.
- **Styling.** Change colours, type and spacing through `assets/css/tokens.css`. Homepage section styles live in `home.css`, case-study styles in `claude.css`, and shared header/nav/footer breakpoints in `responsive.css`.
- **Fonts.** Barlow (text) and Barlow Condensed (display) load from Google Fonts with `display=swap`, and system fonts are the fallback. Before public launch, consider self-hosting the WOFF2 files under `assets/fonts/`. That removes the third-party request, which also helps with GDPR.
- **JavaScript.** The site must work with JavaScript disabled. `main.js` only adds the mobile menu, reveal-on-scroll, header state and scroll-spy. Content hidden by the reveal effect is only hidden when the `js` class is present on `<html>`, and is always shown under `prefers-reduced-motion: reduce`.
- **Paths.** Use relative paths (`assets/...` on the homepage, `../assets/...` in `claude/`) so the site works both on the custom domain and in local preview.
- **New pages.** Create a folder with an `index.html`, copy the `<head>` and header/footer from `claude/index.html` (nav links there use `../#section`), and add the URL to `sitemap.xml`.
- **Accessibility.** Keep one `<h1>` per page, keep heading levels in order, keep visible focus styles, and check contrast when changing colours.

## Deployment model

The site is designed for **GitHub Pages**, served from the repository root of the `main` branch with the custom domain `pokekara.online`.

Work happens on feature branches. `site-v1-claude-startup-landing` holds v1. `site-v2-product-led-redesign` holds the product-led redesign. Neither has been merged into `main` or published.

### Enabling GitHub Pages (when approved)

1. Merge the approved branch into `main`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. Set **Custom domain** to `pokekara.online`. The `CNAME` file in this repository already contains it.
5. After DNS is configured and the certificate is issued, enable **Enforce HTTPS**.
6. Optionally verify the domain under the account or organization **Settings → Pages → Verified domains** to prevent takeover.

### Custom domain DNS

GitHub's current Pages documentation lists the exact values. At the time of writing, the apex domain uses four `A` records (and optionally `AAAA` records) pointing to GitHub Pages, and `www` uses a `CNAME` to `karassrr.github.io`. Confirm the values against GitHub's documentation before you change anything.

> [!WARNING]
> **Do not remove or change the email DNS records.** `pokekara.online` already handles email for `hello@` and `anatolii@`. When you activate GitHub Pages, change **only** the web-facing records for the root (`@`) and `www`. Leave these records exactly as they are:
>
> - `MX`
> - `mail`
> - `smtp`
> - `pop`
> - SPF (`TXT` record starting with `v=spf1`)
> - DKIM (`TXT`/`CNAME` records under `._domainkey`)
> - DMARC (`TXT` record at `_dmarc`)
>
> Some DNS providers replace the whole record set when you "point the domain" somewhere. Edit individual records instead, and take a screenshot or export of the zone before you change it.

## QA checklist

Before you merge changes, check:

- both pages at 320px, 375px, 768px, 1024px, 1440px and 1920px wide, with no horizontal scrolling;
- the mobile menu opens and closes, closes with Escape, and keeps keyboard focus inside while it is open;
- every hero phone tab switches the screen, and arrow keys move between tabs;
- the career journey strip scrolls with its arrow buttons and with the keyboard;
- every navigation link, in-page anchor and `mailto:` link works;
- there are no errors in the browser console;
- the site still works with JavaScript disabled and with reduced motion enabled;
- the canonical URLs, Open Graph metadata, `sitemap.xml`, `robots.txt` and `CNAME` are correct.
