# GDD Insurance Website

## Project Overview
Multi-page insurance website for GDD Insurance (Gerard & Declan Daly Insurances & Investment Brokers), built with Eleventy (11ty).

## Tech Stack
- **Framework:** Eleventy (11ty) v3
- **CSS:** Plain CSS (no preprocessor)
- **JS:** Vanilla JS
- **Deployment:** Static site

## File Structure
```
_includes/base.html       — Shared layout (header, footer, cookie banner)
HTML/index.html           — Homepage
HTML/quote.html           — Quote / call-back request form (2-step)
CSS/header_style.css      — Header, footer, cookie banner, sidebar nav
CSS/style.css             — Homepage styles
CSS/quote-page.css        — Quote page styles
JS/Quote.js               — Quote form logic (step navigation, mailto submit)
Images/
  logo-gdd.jpeg           — GDD logo (used in header + sidebar)
  hero.jpeg               — Hero section background
  office.jpeg             — About section photo
  insurance/              — Per-type images (car, van, home, commercial, travel, farm)
```

## Key Design Decisions
- **Colours:** `--mainColor: #8B1A1A` (dark red), `--navyColor: #1B2D50` (navy)
- **Header:** Logo + text hierarchy on all screens. Desktop shows contact info + inline nav. Mobile (≤ 1024px) shows hamburger + slide-in sidebar (z-index 2000).
- **Sidebar:** Navy background, contains logo, phone/email/hours, and all nav links. Backdrop overlay closes it on tap.
- **Quote form:** 2-step form. Step 1 picks insurance type (option cards); selecting a card changes the full page background via CSS `:has()`. Step 2 collects name/email/details. Submits via `mailto:`.
- **Insurance cards (homepage):** Each `.box1` card shows its image at the top (160px, object-fit cover) with a zoom on hover. Clicking a card opens a modal with a larger image, description, and CTA.
- **Modals:** Single modal element populated via JS from `data-image`, `data-title`, `data-desc` attributes on `.box1` cards.
- **Footer:** Regulatory text (company reg. No. 173537) displayed in `#subFooter`.

## Business Info
- **Full name:** Daly Insurances & Mortgages Ltd T/A Gerard & Declan Daly Insurance & Investment Brokers
- **Regulated by:** Central Bank of Ireland. Company No. 173537
- **Phone:** 065-6828489
- **Email:** info@gdd.ie
- **Address:** 67 O'Connell Street, Ennis, Co. Clare. V95 TW96
- **Hours:** Mon–Fri 9am–5pm

## Do Not Touch
- `JS/Quote.js` — form logic only; all quote page visual changes go in `CSS/quote-page.css`
- Social media links in the footer
