import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { sendSuccess, sendError } from "@/lib/utils";
import { getUserUid } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return sendError("Not authenticated", 401);
    }

    const uid = await getUserUid(token);
    
    if (!uid) {
      return sendError("Invalid or expired token", 401);
    }

    await connectToDatabase();

    const user = await User.findOne({ uid });
    
    if (!user) {
      return sendError("User not found", 404);
    }

    return sendSuccess(
      "User profile fetched successfully",
      {
        uid: user.uid,
        username: user.username,
        email: user.email,
        avatar_id: user.avatar_id,
        xp: user.xp,
      },
      200
    );

  } catch (error: any) {
    console.error("Me API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}