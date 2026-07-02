import { NextResponse } from "next/server";
import { getGithubStats } from "@/lib/github";

// Cached at the data layer (ISR). Re-evaluated hourly.
export const revalidate = 3600;

export async function GET() {
  const stats = await getGithubStats();
  if (!stats) {
    return NextResponse.json(
      { error: "GitHub stats unavailable" },
      { status: 502 },
    );
  }
  return NextResponse.json(stats);
}
