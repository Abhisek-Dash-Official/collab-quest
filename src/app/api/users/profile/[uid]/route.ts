import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import Group from "@/models/Group";
import { sendSuccess, sendError } from "@/lib/utils";
import { calculateLevel, calculateXpForNextLevel, evaluateGroupBadges, getAccountAge } from "@/lib/gamification";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const { uid } = params;
    if (!uid) return sendError("User UID is required", 400);

    await connectToDatabase();

    const user = await User.findOne({ uid })
      .select("-hashed_password -push_subscription -role")
      .lean();

    if (!user) return sendError("User not found", 404);

    const populatedFriends = await User.find({
      uid: { $in: user.friends || [] }
    })
      .select("uid username avatar_id -_id")
      .lean();

    const groups = await Group.find({
      $or: [
        { "members.uid": uid },
        { created_by: uid }
      ]
    }).lean();

    const formattedGroups = groups.map((group) => {
      const memberRecord = group.members.find((m: any) => m.uid === uid);
      
      const badges = evaluateGroupBadges(
        memberRecord, 
        group.members, 
        group.total_tasks
      );

      let cleanStats = null;
      if (memberRecord) {
        cleanStats = {
          xp_gained: memberRecord.xp_gained,
          fire_streak: memberRecord.fire_streak,
          task_completion_count: memberRecord.task_completion_count
        };
      }

      return {
        groupId: group._id,
        group_name: group.group_name,
        group_icon_id: group.group_icon_id,
        invite_code: group.invite_code,
        is_creator: group.created_by === uid,
        membership_stats: cleanStats,
        earned_badges: badges,
      };
    });

    const currentLevel = calculateLevel(user.xp || 0);
    const nextLevelXp = calculateXpForNextLevel(currentLevel);

    const { created_at, friends, ...safeUser } = user;

    const profileData = {
      ...safeUser,
      account_age: getAccountAge(user.created_at || new Date()),
      level: currentLevel,
      next_level_xp: nextLevelXp,
      friends: populatedFriends,
      groups: formattedGroups,
    };

    return sendSuccess("Fetched user profile successfully", profileData);

  } catch (error: any) {
    console.error("Get Profile API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}