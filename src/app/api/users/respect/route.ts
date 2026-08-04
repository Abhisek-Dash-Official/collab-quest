import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const currentUid = await getUserUid(token);
    if (!currentUid) return sendError("Invalid session", 401);

    const { targetUid } = await request.json();
    
    if (!targetUid) return sendError("Target UID is required", 400);
    if (currentUid === targetUid) return sendError("You cannot give respect to yourself", 400);

    await connectToDatabase();

    // Increment respect_likes by 1
    const targetUser = await User.findOneAndUpdate(
      { uid: targetUid },
      { $inc: { respect_likes: 1 } },
      { new: true }
    );

    if (!targetUser) return sendError("User not found", 404);

    return sendSuccess("Respect given!", { respect_likes: targetUser.respect_likes });

  } catch (error: any) {
    console.error("Respect API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}