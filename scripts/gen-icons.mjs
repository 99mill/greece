import sharp from 'sharp'
import { readFileSync } from 'node:fs'

// Regenerates the PWA PNG icons from public/favicon.svg.
// Run with: pnpm gen:icons   (requires the `sharp` dev dependency)
const svg = readFileSync('public/favicon.svg')

// Maskable icon: no rounded frame, extra breathing room for the safe-zone circle.
const maskable = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#010102"/><circle cx="32" cy="32" r="9" fill="#5e6ad2"/><path d="M22 41 L32 22 L42 41" fill="none" stroke="#f7f8f8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/></svg>`,
)

await sharp(svg, { density: 384 }).resize(192, 192).png().toFile('public/pwa-192.png')
await sharp(maskable, { density: 512 }).resize(512, 512).png().toFile('public/pwa-512.png')
await sharp(svg, { density: 360 }).resize(180, 180).png().toFile('public/apple-touch-icon.png')
console.log('PWA icons generated in public/')
