import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Group from "@/models/Group";
import { sendSuccess, sendError } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await context.params;
    if (!uid) return sendError("User UID is required", 400);

    await connectToDatabase();

    const groups = await Group.find({ "members.uid": uid })
      .select("group_name created_by group_icon_id is_private _id")
      .lean();

    if (!groups) {
      return sendError("No groups found for this user", 404);
    }

    return sendSuccess("Fetched user groups successfully", groups);

  } catch (error: any) {
    console.error("Get User Groups API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}