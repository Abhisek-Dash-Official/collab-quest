import { NextResponse } from "next/server";

export function sendSuccess(message: string, data: any = null, status: number = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function sendError(error: string, status: number = 400) {
  return NextResponse.json({ success: false, error }, { status });
}