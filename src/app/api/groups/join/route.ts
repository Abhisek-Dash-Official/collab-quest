import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Group from "@/models/Group";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    const { invite_code } = await request.json();
    if (!invite_code) return sendError("Invite code is required", 400);

    await connectToDatabase();

    const group = await Group.findOne({ invite_code });
    if (!group) return sendError("Invalid invite code", 404);

    if (group.bannedUsers.includes(uid)) {
      return sendError("You have been banned from joining this group", 403);
    }

    if (group.members.some((m: any) => m.uid === uid)) {
      return sendError("You are already a member of this group", 400);
    }

    if (group.joinRequests.includes(uid)) {
      return sendError("Join request already sent", 400);
    }

    group.joinRequests.push(uid);
    await group.save();

    return sendSuccess("Join request sent successfully", null);

  } catch (error: any) {
    console.error("Join Request API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}