import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Group from "@/models/Group";
import User from "@/models/User";
import AppConfig from "@/models/AppConfig";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

// GET ALL JOIN REQUESTS (Creator Only)
export async function GET(request: NextRequest, { params }: { params: { group_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    await connectToDatabase();
    const group = await Group.findById(params.group_id).lean();
    
    if (!group) return sendError("Group not found", 404);
    if (group.created_by !== uid) return sendError("Only the creator can view requests", 403);

    const requesters = await User.find({ uid: { $in: group.joinRequests } })
      .select("uid username avatar_id xp level")
      .lean();

    return sendSuccess("Fetched join requests", requesters);
  } catch (error: any) {
    console.error("Get Requests API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}

// APPROVE OR REJECT REQUEST (Creator Only)
export async function POST(request: NextRequest, { params }: { params: { group_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    const { targetUid, action } = await request.json(); // action: 'approve' | 'reject'
    if (!targetUid || !['approve', 'reject'].includes(action)) {
      return sendError("Invalid action or missing target UID", 400);
    }

    await connectToDatabase();
    
    const group = await Group.findById(params.group_id);
    if (!group) return sendError("Group not found", 404);
    if (group.created_by !== uid) return sendError("Only the creator can manage requests", 403);
    
    if (!group.joinRequests.includes(targetUid)) {
      return sendError("Request not found", 404);
    }

    if (action === 'reject') {
      await Group.findByIdAndUpdate(params.group_id, { $pull: { joinRequests: targetUid } });
      return sendSuccess("Request rejected", null);
    }

    if (action === 'approve') {
      const config = await AppConfig.findOne().lean() || { max_users_per_group: 5, max_groups_per_user: 5 };
      
      if (group.members.length >= config.max_users_per_group) {
        return sendError("Group is already full", 403);
      }

      const targetUser = await User.findOne({ uid: targetUid });
      if (!targetUser) return sendError("User not found", 404);

      if (targetUser.joined_groups.length >= config.max_groups_per_user) {
        return sendError("User has reached their maximum group limit", 403);
      }

      await Group.findByIdAndUpdate(params.group_id, {
        $pull: { joinRequests: targetUid },
        $push: {
          members: {
            uid: targetUid, xp_gained: 0, group_rank: group.members.length + 1,
            fire_streak: 0, task_completion_count: 0, first_finishes_count: 0,
            last_minute_finishes_count: 0, total_nudges_sent: 0, total_nudges_received: 0
          }
        }
      });

      await User.findOneAndUpdate({ uid: targetUid }, { $push: { joined_groups: group._id } });
      return sendSuccess("User approved and added to group", null);
    }
  } catch (error: any) {
    console.error("Manage Request API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}