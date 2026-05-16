# straussproduction.com

Marketing site for **Strauss Production & Entertainment** — a boutique event studio producing weddings, birthdays, corporate events, and large-scale productions with a one-on-one, faster-than-the-rest approach.

Single-page static site. No build step. Deploys to GitHub Pages or any static host.

## Stack
- Hand-written HTML + CSS + vanilla JS
- Google Fonts: Fraunces, Instrument Serif, Inter
- Zero JS dependencies

## Local preview
```bash
# any static server works
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy (GitHub Pages)
1. Push to `main`
2. Repo → Settings → Pages → Build from `main` / root
3. Point `straussproduction.com` DNS to GitHub Pages (CNAME `<user>.github.io`)
4. Add a `CNAME` file containing `straussproduction.com`

## Structure
```
.
├── index.html      single-page site
├── styles.css      full design system
├── script.js       reveal-on-scroll, header, form UX, parallax
└── README.md
```
