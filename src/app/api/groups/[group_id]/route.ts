import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Group from "@/models/Group";
import User from "@/models/User";
import Task from "@/models/Task";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

// GET GROUP DETAILS
export async function GET(request: NextRequest, { params }: { params: { group_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    await connectToDatabase();

    const group = await Group.findById(params.group_id).lean();
    if (!group) return sendError("Group not found", 404);

    const isMember = group.members.some((m: any) => m.uid === uid);
    if (!isMember) {
      return sendError("You are not a member of this group", 403);
    }

    const memberUids = group.members.map((m: any) => m.uid);
    const users = await User.find({ uid: { $in: memberUids } })
      .select("uid username avatar_id")
      .lean();
    
    group.members = group.members.map((member: any) => {
      const userDetails = users.find((u: any) => u.uid === member.uid);
      return {
        ...member,
        username: userDetails?.username || "Unknown Player",
        avatar_id: userDetails?.avatar_id || "0"
      };
    });

    return sendSuccess("Group fetched successfully", group);
  } catch (error: any) {
    console.error("Get Group API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}

// UPDATE GROUP (Only Creator)
export async function PATCH(request: NextRequest, { params }: { params: { group_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    const { group_name, group_icon_id, purpose, is_private } = await request.json();
    
    await connectToDatabase();
    
    const group = await Group.findById(params.group_id);
    if (!group) return sendError("Group not found", 404);
    
    if (group.created_by !== uid) return sendError("Only the creator can update the group", 403);

    if (group_name !== undefined) group.group_name = group_name;
    if (group_icon_id !== undefined) group.group_icon_id = group_icon_id;
    if (purpose !== undefined) group.purpose = purpose;
    if (is_private !== undefined) group.is_private = is_private;

    await group.save();

    return sendSuccess("Group updated successfully", group);
  } catch (error: any) {
    console.error("Update Group API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}

// DELETE GROUP (Only Creator + Full Cleanup)
export async function DELETE(request: NextRequest, { params }: { params: { group_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    await connectToDatabase();

    const group = await Group.findById(params.group_id);
    if (!group) return sendError("Group not found", 404);

    if (group.created_by !== uid) return sendError("Only the creator can delete the group", 403);

    await Task.deleteMany({ group_id: params.group_id });

    await User.updateMany(
      { joined_groups: params.group_id },
      { $pull: { joined_groups: params.group_id } }
    );

    await Group.findByIdAndDelete(params.group_id);

    return sendSuccess("Group and associated tasks deleted successfully", null);
  } catch (error: any) {
    console.error("Delete Group API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}