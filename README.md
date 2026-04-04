# FDC Prosthodontics & Implants

Marketing website for Dr. Fernando Del Corro's prosthodontics and dental implant practice in Hermosillo, Sonora, Mexico. Bilingual (Spanish/English) single-page application.

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite 8** for development and bundling
- **CSS** with custom properties and BEM naming

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm (included with Node.js)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── components/        # UI components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Methodology.tsx
│   ├── Gallery.tsx
│   ├── Cases.tsx
│   ├── Testimonials.tsx
│   ├── Profile.tsx
│   ├── Contact.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   └── FloatingCta.tsx
├── translations/      # i18n (ES/EN)
│   ├── es.ts
│   ├── en.ts
│   └── index.ts
├── config.ts          # Centralized site config (phone, email, address)
├── App.tsx            # Root component
├── main.tsx           # Entry point
└── style.css          # Global styles
```

## Features

- Bilingual support (Spanish/English) with browser language detection
- Smooth scroll navigation
- Responsive design (desktop, tablet, mobile)
- Contact form with validation and success state
- Floating WhatsApp CTA
- SEO optimized (Open Graph, JSON-LD structured data)
- Accessible (focus-visible states, semantic HTML, ARIA attributes)

## License

All rights reserved.
