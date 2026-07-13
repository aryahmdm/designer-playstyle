import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const save = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    archetype: v.string(),
    points: v.number(),
    resultid: v.string(),
    technic: v.number(),
    empathic: v.number(),
    strategic: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("participants", args);
  },
});

export const getByResultId = query({
  args: { resultid: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("participants")
      .withIndex("by_resultid", (q) => q.eq("resultid", args.resultid))
      .unique();
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("participants").collect();
    const counts = { striker: 0, vanguard: 0, overseer: 0 };
    for (const row of all) {
      if (row.archetype in counts) {
        counts[row.archetype as keyof typeof counts]++;
      }
    }
    return { total: all.length, counts };
  },
});
