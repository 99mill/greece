import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { authTables } from '@convex-dev/auth/server'

/*
  Convex schema for the trip companion.

  Status: written, not yet provisioned. Run `npx convex dev` once convex.dev /
  *.convex.cloud are allowlisted — that generates convex/_generated and creates
  the deployment. The app currently uses a localStorage itinerary store
  (src/store/itinerary.ts) with the SAME ItineraryItem shape, so swapping to
  these functions is a drop-in.
*/

export default defineSchema({
  ...authTables,

  itinerary: defineTable({
    userId: v.id('users'),
    title: v.string(),
    date: v.string(), // ISO date, e.g. "2026-07-14"
    time: v.optional(v.string()),
    location: v.optional(v.string()),
    notes: v.optional(v.string()),
    category: v.union(
      v.literal('travel'),
      v.literal('food'),
      v.literal('sightseeing'),
      v.literal('medical'),
      v.literal('rest'),
      v.literal('other'),
    ),
    done: v.boolean(),
  }).index('by_user', ['userId']),

  // Stretch: travel journal / blog entries.
  journalEntries: defineTable({
    userId: v.id('users'),
    title: v.string(),
    body: v.string(),
    date: v.string(),
    photoIds: v.optional(v.array(v.id('photos'))),
  }).index('by_user', ['userId']),

  // Stretch: uploaded photos + extracted EXIF for the journey map.
  // (People/face attribution is intentionally absent — Apple does not embed it
  //  in exported files; see the roadmap note.)
  photos: defineTable({
    userId: v.id('users'),
    storageId: v.id('_storage'),
    takenAt: v.optional(v.number()), // epoch ms from EXIF DateTimeOriginal
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    caption: v.optional(v.string()),
  })
    .index('by_user', ['userId'])
    .index('by_user_time', ['userId', 'takenAt']),
})
