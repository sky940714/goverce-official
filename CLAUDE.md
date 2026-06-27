# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend (root directory)
npm run dev        # Start Vite dev server
npm run build      # Build for production → dist/
npm run lint       # Run ESLint
npm run preview    # Preview the production build locally

# Backend (cd backend)
node server.js     # Start Express API server (port 5000)
```

**Deploy:** Run `.\deploy.ps1` from the root — it commits to GitHub, runs `npm run build`, then uploads `dist/` to the Vultr server via `scp root@45.32.17.214:/var/www/goverce-official`.

## Architecture

This is the official marketing site for **GOVERCE** (創生科技) — a React SPA for the frontend with a separate Node/Express backend for auth.

### Frontend (`src/`)

- **Stack:** React 19, React Router v7, Framer Motion, Tailwind CSS v4, Lucide React
- **Entry:** `main.jsx` wraps the app in `BrowserRouter`; `App.jsx` owns all routes and page-transition logic via `AnimatePresence`

**Routing (defined in `App.jsx`):**
| Path | Component |
|---|---|
| `/` | `HomePage` |
| `/go-eat` | `GoEatPage` |
| `/go-core` | `GoCorePage` |
| `/go-soul` | `GoSoulPage` |
| `/login` | `LoginPage` |
| `/register` | `RegisterPage` |

**Navigation pattern:** Navbar links do *not* use `<Link>` — they call `handleNavClick(id)` which smooth-scrolls to a section on `/` or navigates to `/?scroll=<id>` from other pages. `HomePage` reads the `?scroll=` query param on mount and scrolls after a 200ms delay.

**Auth flow:** JWT stored in `localStorage` under key `goverce_token`. The Navbar checks this on every location change to toggle login/logout UI. Login/register pages call the backend directly at `http://45.32.17.214:5000/api/`.

**`ProductCarousel` component:** Reused across `HomePage` and product pages. Accepts a `folder` prop (e.g. `"goeat"`, `"goprime"`) and loads exactly 4 images from `src/assets/<folder>/1.jpg` through `4.jpg` using Vite's `new URL(path, import.meta.url)` pattern — required for Vite asset bundling.

**Brand colors:**
- Orange accent: `#FF6B00`
- Dark background: `#0A0A0A` / `#1A1A1A`
- The GoCore console external URL: `https://me.goverce.com/login`

### Backend (`backend/`)

- **Stack:** Express 5, MySQL2 (connection pool), bcrypt, JWT, dotenv
- Requires a `.env` file with: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET`, `PORT`
- Database: Remote MySQL on Vultr (`45.32.17.214`)
- Two endpoints: `POST /api/register` and `POST /api/login`
- JWT tokens expire in 24h; payload contains `{ id, email }`

### Products on the site

| Name | Status | Route |
|---|---|---|
| GoEat | Live | `/go-eat` |
| GoPrime | In Development | (no dedicated page) |
| GoSoul | Live | `/go-soul` |
| GoCore | Live | `/go-core` |
