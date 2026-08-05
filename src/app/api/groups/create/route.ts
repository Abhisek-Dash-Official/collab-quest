import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Group from "@/models/Group";
import User from "@/models/User";
import AppConfig from "@/models/AppConfig";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";
import { generateGroupInviteCode } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    const { group_name, purpose, group_icon_id, is_private } = await request.json();
    if (!group_name) return sendError("Group name is required", 400);

    await connectToDatabase();

    // Fetch Config for limits
    const config = await AppConfig.findOne().lean() || { max_groups_per_user: 5 };
    
    const user = await User.findOne({ uid });
    if (!user) return sendError("User not found", 404);

    if (user.joined_groups.length >= config.max_groups_per_user) {
      return sendError(`You can only join a maximum of ${config.max_groups_per_user} groups.`, 403);
    }

    const invite_code = generateGroupInviteCode(group_name);

    // Create the group with creator as the first member
    const newGroup = await Group.create({
      group_name,
      created_by: uid,
      group_icon_id: group_icon_id || "0",
      purpose,
      is_private: is_private || false,
      invite_code,
      members: [{
        uid,
        xp_gained: 0,
        group_rank: 1,
        fire_streak: 0,
        task_completion_count: 0,
        first_finishes_count: 0,
        last_minute_finishes_count: 0,
        total_nudges_sent: 0,
        total_nudges_received: 0
      }],
      joinRequests: [],
      bannedUsers: []
    });

    // Update user's joined_groups array
    await User.findOneAndUpdate(
      { uid },
      { $push: { joined_groups: newGroup._id } }
    );

    return sendSuccess("Group created successfully", newGroup);

  } catch (error: any) {
    console.error("Create Group API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}