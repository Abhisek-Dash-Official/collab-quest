import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Notification from "@/models/Notification";
import "@/models/Task"; 
import "@/models/Group"; 
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    await connectToDatabase();

    const notifications = await Notification.find({ 
      recipient_id: uid,
      type: "nudge"
    })
    .sort({ created_at: -1 })
    .limit(5)
    .populate({
      path: 'task_id',
      select: 'title group_id',
      populate: {
        path: 'group_id',
        select: 'group_name'
      }
    })
    .lean();

    const formattedNudges = notifications.map((notif: any) => ({
      id: notif._id.toString(),
      task_title: notif.task_id?.title || "Deleted Task",
      group_name: notif.task_id?.group_id?.group_name || "Unknown Group",
      is_read: notif.is_read,
      nudged_at: notif.created_at,
    }));

    return sendSuccess("Fetched notifications", formattedNudges);

  } catch (error: any) {
    console.error("Notifications API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}