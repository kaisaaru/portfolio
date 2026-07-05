import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Chat API is disabled" }, { status: 404 });
}