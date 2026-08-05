import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Group from "@/models/Group";
import User from "@/models/User";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

export async function POST(request: NextRequest, { params }: { params: { group_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    const { targetUid, action } = await request.json(); // action: 'ban' | 'unban'
    if (!targetUid || !['ban', 'unban'].includes(action)) {
      return sendError("Valid action (ban/unban) and target UID required", 400);
    }
    
    if (uid === targetUid) return sendError("You cannot ban yourself", 400);

    await connectToDatabase();
    
    const group = await Group.findById(params.group_id);
    if (!group) return sendError("Group not found", 404);
    if (group.created_by !== uid) return sendError("Only the creator can ban/unban users", 403);

    if (action === 'ban') {
      await Group.findByIdAndUpdate(params.group_id, {
        $pull: { members: { uid: targetUid } },
        $addToSet: { bannedUsers: targetUid }
      });
      await User.findOneAndUpdate({ uid: targetUid }, { $pull: { joined_groups: group._id } });
      return sendSuccess("User has been kicked and banned from the group", null);
    }

    if (action === 'unban') {
      await Group.findByIdAndUpdate(params.group_id, {
        $pull: { bannedUsers: targetUid }
      });
      return sendSuccess("User has been unbanned and can request to join again", null);
    }
    
  } catch (error: any) {
    console.error("Ban API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}