import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  participants: defineTable({
    resultid: v.string(),
    name: v.string(),
    role: v.string(),
    archetype: v.string(),
    points: v.number(),
    technic: v.number(),
    empathic: v.number(),
    strategic: v.number(),
  }).index("by_resultid", ["resultid"]),
});
