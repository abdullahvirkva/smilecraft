# SMILECRAFT — Dental Studio

A premium multi-page website template for dental clinics, orthodontists,
pediatric dentists and cosmetic dentistry practices. Clean, calming light
design with a teal/mint palette, rounded friendly components and fully
original SVG artwork.

## Pages (6)

| File | Purpose |
|---|---|
| `index.html` | Hero with floating trust cards, stats band, treatment preview, why-us, smile gallery, dentist preview, rotating testimonials, CTA |
| `about.html` | Studio story, four brand values, milestone timeline, credentials strip |
| `services.html` | Interactive treatment finder, filterable catalog of 8 treatments, FAQ accordion |
| `dentists.html` | Four specialist profiles with specialty filter and credential tags |
| `pricing.html` | Three SmileClub membership plans, published fee guide, insurance & 0% financing, pricing FAQ |
| `contact.html` | Appointment booking form (validated, with success state), contact cards, opening hours with today-highlight, emergency band, map placeholder |

## Features

- Bootstrap 5.3 responsive layout (mobile-first, collapsible navbar)
- Original content throughout — no lorem ipsum
- 100% original SVG artwork (hero tooth mascot, 2 clinic interiors, 4 dentist portraits, 3 treatment illustrations) — no stock photos, no licensing issues
- Interactive: scroll-reveal animations, animated stat counters, treatment symptom finder, service & dentist filters, FAQ accordions, testimonial rotator, validated booking form with personalised success state, today-highlight on opening hours, newsletter mini-form, back-to-top button
- Accessibility: semantic HTML, meta descriptions, alt text, aria labels, `prefers-reduced-motion` support
- SEO basics: descriptive titles, meta descriptions, heading hierarchy

## Folder structure

```
smilecraft/
├── index.html / about.html / services.html / dentists.html / pricing.html / contact.html
├── README.md
└── assets/
    ├── css/style.css      # full design system (custom properties, components)
    ├── js/main.js         # navbar, reveal, counters, filters, FAQ, finder, forms, rotator
    └── images/            # 10 original SVG illustrations
```

## Customisation

- **Colours:** edit the `:root` variables at the top of `assets/css/style.css`
  (`--teal` primary, `--mint` accent, `--ink` text, `--bg` page background).
- **Fonts:** headings use Sora, body uses Inter (Google Fonts links in each page `<head>`).
- **Content:** all copy lives directly in the HTML files; fees in the price
  table on `pricing.html`; hours in the `#hoursList` block on `contact.html`;
  testimonials in the `data-slides` attribute on `index.html`.
- **Forms:** the booking and newsletter forms are front-end demos. Connect the
  `submit` handlers in `assets/js/main.js` to your booking endpoint to go live.
- **Map:** replace the `.map-frame` panel on `contact.html` with a Google Maps embed.

## Credits

- Layout framework: Bootstrap 5.3 (MIT, via jsDelivr CDN)
- Fonts: Sora + Inter (Google Fonts, SIL Open Font License)
- All artwork, icons and copy are original and created for this template.

## Browser support

Chrome, Firefox, Safari, Edge (latest two versions). Tested responsive at
360px, 768px, 1024px and 1440px widths.

---
Designed by Abdullah Virk — portfolio template.
