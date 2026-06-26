import { projectId, publicAnonKey } from "/utils/supabase/info";

const BASE = `https://${projectId}.supabase.co/functions/v1/server`;

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
  const response = await fetch(`${BASE}/participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({
      name,
      role,
      email: role, // fallback for deployed server versions that check `email`
      archetype,
      points,
      resultid,
      technic,
      empathic,
      strategic,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to save participant: ${response.status}`);
  }
}

export async function getResult(resultid: string): Promise<RemoteResult | null> {
  const res = await fetch(`${BASE}/results/${resultid}`, {
    headers: { "Authorization": `Bearer ${publicAnonKey}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch result: ${res.status}`);
  return res.json();
}

export async function getStats(): Promise<Stats> {
  const res = await fetch(`${BASE}/stats`, {
    headers: { "Authorization": `Bearer ${publicAnonKey}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch stats: ${res.status}`);
  return res.json();
}
