# Roadmap — stretch goals

The core (diet, medical, itinerary, offline PWA) is built. These are the
planned extensions, in suggested order. The Convex schema (`convex/schema.ts`)
already includes `journalEntries` and `photos` tables to support them.

## 1. Auth (email or phone)

Convex Auth is already coded (`convex/auth.ts`, `convex/otp/*`):
- Email magic link **and** email 6-digit code via Resend.
- Phone 6-digit code via Twilio.

Remaining: wrap the app in `ConvexAuthProvider`, add a sign-in screen, and gate
sync. Needs the Convex hosts allowlisted + provider secrets set.

## 2. Photo upload + album + slideshow

- Upload to **Convex file storage** (`photos.storageId`).
- Extract metadata client-side with **`exifr`** before upload: `DateTimeOriginal`
  → `takenAt`, GPS → `lat`/`lng`.
- Album grid → fullscreen slideshow.

## 3. Travel journal / blog

- `journalEntries` table (already in schema). Markdown body, optional linked
  photos, one entry per day. Reuses the itinerary's date grouping UI.

## 4. Journey map + retrospective

- Render points from `photos` (lat/lng/takenAt) on **MapLibre GL** (free, no
  token). NOTE: map tiles are fetched in the user's browser at runtime, so they
  don't hit this build environment's egress — but the chosen tile host must be
  reachable from the phone/laptop.
- Sidebar walks the trip chronologically; selecting a stop flies the map there.
- Split-screen 50:50 with the slideshow for a guided retrospective.

### Honest limitation on photo metadata

EXIF reliably yields **date** and **GPS location**, and *sometimes* the
capturing **device/owner**. Apple's **people/face attribution does NOT travel in
exported image files** — it lives only in the Apple Photos library database. So
"who is in the photo" generally cannot be recovered from uploads. The map is
designed around date + location, which are dependable. If face data is ever
needed, it would require an Apple Photos export/integration, not file metadata.

## 5. Polish

- Replace the interim `src/components/kit.tsx` helpers and the hand-rolled
  dialog/inputs with shadcn/Base UI `Card`, `Dialog`, `Input`, `Select`, etc.
  once `components/ui` is populated.
- Add an "Update available" toast when the service worker has a new version.
- Per-person diet profiles (his fluid/potassium limits) instead of generic.
