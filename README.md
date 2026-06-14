# Greece Trip Companion

A private, offline-capable PWA for an upcoming trip to **Larissa, Greece** —
built around traveling with a family member in **stage 5 chronic kidney
disease**. Works on a laptop in the browser and installs to an iPhone home
screen as an app.

## What it does

- **Diet plan** — common Greek dishes rated for a renal diet (potassium,
  phosphorus, sodium, fluid, protein), searchable. Works with **no signal**.
- **Medical resources** — verified emergency numbers (112 / 166), Larissa
  hospitals, and a dialysis travel checklist. Works with **no signal**.
- **Itinerary** — a simple CRUD day planner. Saved on-device, so it also works
  offline.

## Stack

| Layer | Choice |
|---|---|
| Framework | **Vite 8 + React 19** SPA (no SSR/SEO needed for a private app) |
| Routing | React Router |
| Styling | **Tailwind v4**, themed from `design.md` (Linear dark palette) |
| UI components | **shadcn (Base UI primitives)** → `components/ui` *(pending allowlist, see below)* |
| Offline/PWA | **vite-plugin-pwa** (Workbox). App shell + data precached. |
| Backend (sync) | **Convex** + Convex Auth (email magic-link/OTP + phone OTP) *(code written; pending allowlist)* |

### Why offline works without a backend

The safety-critical screens — **diet** and **medical** — are static data
bundled into the app (`src/data/`) and precached by the service worker, so they
render with zero connectivity. The itinerary uses `localStorage`
(`src/store/itinerary.ts`), so it's also fully offline. Convex is an *additive*
sync layer (multi-device, journal, photos), not a dependency for the core.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # typecheck + production build (also emits the service worker)
pnpm lint
```

## ⚠️ Network egress requirement

This environment's egress allowlist currently permits only `registry.npmjs.org`
and `github.com`. Two setup steps are **blocked** until these hosts are added to
the environment's network egress settings:

- `ui.shadcn.com` — to run the shadcn CLI and pull Base UI components
- `convex.dev`, `*.convex.cloud`, `*.convex.site` — to provision/run Convex

Once allowlisted:

```bash
# Components → components/ui (Base UI primitives, themed by design.md tokens)
npx shadcn@latest init --base base --template vite --preset nova
npx shadcn@latest add button card dialog input select checkbox badge \
  tabs sheet sonner dropdown-menu label textarea separator

# Backend
npx convex dev        # provisions deployment, generates convex/_generated
# then set auth secrets:
npx convex env set AUTH_RESEND_KEY ...
npx convex env set AUTH_TWILIO_ACCOUNT_SID ...   # + AUTH_TWILIO_AUTH_TOKEN, AUTH_TWILIO_FROM
```

See `ROADMAP.md` for the stretch goals (photos, journal, journey map) and how
the schema/EXIF pieces fit together.
