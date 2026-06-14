import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAuthUserId } from '@convex-dev/auth/server'

/*
  Itinerary CRUD, scoped to the signed-in user. Mirrors src/store/itinerary.ts.
  Requires `npx convex dev` to generate ./_generated (not provisioned yet).
*/

const categoryValidator = v.union(
  v.literal('travel'),
  v.literal('food'),
  v.literal('sightseeing'),
  v.literal('medical'),
  v.literal('rest'),
  v.literal('other'),
)

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('itinerary')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
  },
})

export const add = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    time: v.optional(v.string()),
    location: v.optional(v.string()),
    notes: v.optional(v.string()),
    category: categoryValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not signed in')
    return ctx.db.insert('itinerary', { ...args, userId, done: false })
  },
})

export const update = mutation({
  args: {
    id: v.id('itinerary'),
    title: v.optional(v.string()),
    date: v.optional(v.string()),
    time: v.optional(v.string()),
    location: v.optional(v.string()),
    notes: v.optional(v.string()),
    category: v.optional(categoryValidator),
    done: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...patch }) => {
    const userId = await getAuthUserId(ctx)
    const existing = await ctx.db.get(id)
    if (!existing || existing.userId !== userId) throw new Error('Not found')
    await ctx.db.patch(id, patch)
  },
})

export const remove = mutation({
  args: { id: v.id('itinerary') },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx)
    const existing = await ctx.db.get(id)
    if (!existing || existing.userId !== userId) throw new Error('Not found')
    await ctx.db.delete(id)
  },
})
