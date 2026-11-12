# SyntraWebs – React website

Vite + React 18 · Tailwind CSS · Framer Motion · GSAP + ScrollTrigger · React Three Fiber · Lucide icons · React Router (hash routes).

## Run
    npm install
    npm run dev        # local development
    npm run build      # production build in /dist

## Edit your real details
Open `src/data.js`:
- `SITE.whatsapp`, `SITE.email`, `SITE.instagram`
- `SITE.formEndpoint` – paste a Formspree / Web3Forms / your own backend URL (POST JSON). Until set, the form validates but shows a "not connected" message.
- `PROJECTS` – add genuine projects (name, category, stack, desc, url, img). Keep `demo: true` for sample projects.

Logo: `src/assets/logo.png` (replace with your original file if you have a higher-resolution transparent version).

## Deploy
Upload `dist/` to Netlify, Vercel or any static host. Hash routing needs no server rewrites.
