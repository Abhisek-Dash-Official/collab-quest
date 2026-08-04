import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const currentUid = await getUserUid(token);
    if (!currentUid) return sendError("Invalid session", 401);

    const { searchParams } = new URL(request.url);
    const queryUid = searchParams.get("uid");

    if (!queryUid) {
      return sendError("Quest Code (UID) is required", 400);
    }

    await connectToDatabase();

    const targetUser = await User.findOne({ uid: queryUid })
      .select("uid username avatar_id xp last_active_at respect_likes")
      .lean();

    if (!targetUser) {
      return sendError("User not found", 404);
    }

    return sendSuccess("User found", targetUser);

  } catch (error: any) {
    console.error("Search User API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}