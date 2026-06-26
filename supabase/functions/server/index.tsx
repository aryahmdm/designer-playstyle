import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

const db = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

const TABLE = "participants_f9f749d6";
const P = "/server";

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get(`${P}/health`, (c) => c.json({ status: "ok" }));

// POST /participants — save a quiz result
app.post(`${P}/participants`, async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    console.log("Received participant payload:", body);

    const { name, role, email, archetype, points, resultid, technic, empathic, strategic } = body;

    const userId =
      (typeof role === "string" && role.trim()) ||
      (typeof email === "string" && email.trim()) ||
      null;

    if (!name?.trim() || !userId || !archetype?.trim()) {
      console.warn("Validation failed:", { name, role, email, archetype, resolvedUserId: userId });
      return c.json(
        { error: "name, role, and archetype are required", received: { name, role, email, archetype } },
        400,
      );
    }

    const basePayload: Record<string, unknown> = {
      resultid: resultid ?? null,
      name: name.trim(),
      archetype: archetype.trim(),
      points: points ?? 0,
      created_date: new Date().toISOString(),
      technic: technic ?? 0,
      empathic: empathic ?? 0,
      strategic: strategic ?? 0,
    };

    // Try `role` column first
    let { error } = await db()
      .from(TABLE)
      .insert({ ...basePayload, role: userId });

    // Fall back to `email` column if `role` doesn't exist in DB
    if (error && (error.code === "42703" || error.message?.includes('column "role" does not exist'))) {
      console.log("Column 'role' not found, falling back to 'email'");
      const fallback = await db()
        .from(TABLE)
        .insert({ ...basePayload, email: userId });
      error = fallback.error;
    }

    if (error) {
      console.error("Postgres insert error:", error);
      return c.json(
        {
          error: `Database error: ${error.message}`,
          code: error.code,
          details: "Table: participants_f9f749d6. Expected columns: resultid, name, role (or email), archetype, points, created_date.",
        },
        500,
      );
    }

    console.log("Successfully saved participant, resultid:", resultid);
    return c.json({ success: true, resultid });
  } catch (err) {
    console.error("Server catch error:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// GET /results/:resultid — retrieve a saved result by its ID
app.get(`${P}/results/:resultid`, async (c) => {
  try {
    const resultid = c.req.param("resultid");
    if (!resultid) return c.json({ error: "resultid is required" }, 400);

    const { data, error } = await db()
      .from(TABLE)
      .select("resultid, name, archetype, points, role, email, created_date, technic, empathic, strategic")
      .eq("resultid", resultid)
      .maybeSingle();

    if (error) {
      console.error("Result fetch error:", error);
      return c.json({ error: error.message }, 500);
    }

    if (!data) return c.json({ error: "Result not found" }, 404);

    return c.json({
      resultid: data.resultid,
      name: data.name,
      archetype: data.archetype,
      points: data.points,
      role: data.role ?? data.email ?? "",
      technic: data.technic ?? 0,
      empathic: data.empathic ?? 0,
      strategic: data.strategic ?? 0,
    });
  } catch (err) {
    console.error("Get result error:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// GET /stats — aggregate counts per archetype
app.get(`${P}/stats`, async (c) => {
  try {
    const { data, error } = await db().from(TABLE).select("archetype");

    if (error) {
      console.error("Stats fetch error:", error);
      return c.json({ error: error.message }, 500);
    }

    const counts = { striker: 0, vanguard: 0, overseer: 0 };
    for (const row of data ?? []) {
      const key = row.archetype as keyof typeof counts;
      if (key in counts) counts[key]++;
    }

    return c.json({ total: data?.length ?? 0, counts });
  } catch (err) {
    console.error("Stats server error:", err);
    return c.json({ error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);
