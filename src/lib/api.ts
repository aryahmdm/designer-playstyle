import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

const client = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL as string);

export interface Stats {
  total: number;
  counts: { striker: number; vanguard: number; overseer: number };
}

export interface RemoteResult {
  resultid: string;
  name: string;
  archetype: string;
  points: number;
  role: string;
  technic: number;
  empathic: number;
  strategic: number;
}

export async function saveParticipant(
  name: string,
  role: string,
  archetype: string,
  points: number,
  resultid: string,
  technic: number,
  empathic: number,
  strategic: number,
): Promise<void> {
  await client.mutation(api.participants.save, {
    name,
    role,
    archetype,
    points,
    resultid,
    technic,
    empathic,
    strategic,
  });
}

export async function getResult(resultid: string): Promise<RemoteResult | null> {
  const doc = await client.query(api.participants.getByResultId, { resultid });
  if (!doc) return null;

  return {
    resultid: doc.resultid,
    name: doc.name,
    archetype: doc.archetype,
    points: doc.points,
    role: doc.role,
    technic: doc.technic,
    empathic: doc.empathic,
    strategic: doc.strategic,
  };
}

export async function getStats(): Promise<Stats> {
  return client.query(api.participants.stats, {});
}
