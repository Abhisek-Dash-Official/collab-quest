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

    await connectToDatabase();
    
    const group = await Group.findById(params.group_id);
    if (!group) return sendError("Group not found", 404);

    if (group.created_by === uid) {
      return sendError("As the creator, you cannot leave the group. You must delete it instead.", 403);
    }

    const isMember = group.members.some((m: any) => m.uid === uid);
    if (!isMember) return sendError("You are not a member of this group", 400);

    await Group.findByIdAndUpdate(params.group_id, {
      $pull: { members: { uid: uid } }
    });
    await User.findOneAndUpdate({ uid: uid }, { $pull: { joined_groups: group._id } });

    return sendSuccess("You have left the group successfully", null);
    
  } catch (error: any) {
    console.error("Leave Group API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}