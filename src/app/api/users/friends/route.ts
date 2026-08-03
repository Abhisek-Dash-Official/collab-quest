import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

// ADD FRIEND (POST)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const currentUid = await getUserUid(token);
    if (!currentUid) return sendError("Invalid session", 401);

    const { targetUid } = await request.json();
    if (!targetUid || currentUid === targetUid) {
      return sendError("Invalid target user", 400);
    }

    await connectToDatabase();

    const currentUser = await User.findOne({ uid: currentUid });
    const targetUser = await User.findOne({ uid: targetUid });

    if (!currentUser || !targetUser) {
      return sendError("User not found", 404);
    }

    if (currentUser.friends?.includes(targetUid)) {
      return sendError("You are already friends", 400);
    }

    await User.updateOne({ uid: currentUid }, { $addToSet: { friends: targetUid } });

    return sendSuccess("Friend added successfully", { friendUid: targetUid });

  } catch (error: any) {
    console.error("Add Friend API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}

// GET FRIENDS LIST (GET)
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    await connectToDatabase();

    const user = await User.findOne({ uid }).lean();
    if (!user) return sendError("User not found", 404);

    const friendsList = await User.find({ 
      uid: { $in: user.friends || [] } 
    }).select("uid username avatar_id xp last_active_at respect_likes").lean();

    return sendSuccess("Fetched friends list", friendsList);

  } catch (error: any) {
    console.error("Get Friends API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}