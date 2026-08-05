import { NextResponse } from "next/server";

export function sendSuccess(message: string, data: any = null, status: number = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function sendError(error: string, status: number = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

export function generateUID(username: string): string {
const cleanName = username.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const firstName = cleanName || 'cqplyr';
  
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  const timeStr = `${month}${year}`;
  
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `${firstName}-${timeStr}-${randomStr}`;
}

export function generateGroupInviteCode(groupName: string): string {
  const cleanName = groupName.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const baseName = cleanName.substring(0, 5) || 'squad'; // max 5 chars of first word
  
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `grp-${baseName}-${randomStr}`;
}