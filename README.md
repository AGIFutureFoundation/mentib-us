# Mentib (mentib.us)

Static site for the mentib.us project. Pure HTML + CSS + JS, no build step —
deploy-ready for Vercel.

## Deploy
```bash
vercel          # preview deploy
vercel --prod   # production
```
Then add the custom domain (`mentib.us`) in the Vercel dashboard
(Settings → Domains). DNS is managed at Hostinger: apex ALIAS → `cname.vercel-dns.com`,
www → `cname.vercel-dns.com`.

## TODO
- [ ] Wire the contact form to a backend (Formspree / Vercel Function)
- [ ] Fill in `data-youtube-id` attributes on embed cards
- [ ] Replace `#` placeholders in footer social links with real profile URLs
- [ ] Replace TODO copy blocks with real project content
