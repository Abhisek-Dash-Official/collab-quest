import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Task from "@/models/Task";
import Group from "@/models/Group";
import User from "@/models/User";
import AppConfig from "@/models/AppConfig";
import Notification from "@/models/Notification";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError, checkGroupAccess } from "@/lib/utils";
import webpush from "web-push";

webpush.setVapidDetails(
  'mailto:botlab.7acc@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export async function POST(request: NextRequest, { params }: { params: Promise<{ group_id: string, task_id: string }> }) {
  try {
    const { group_id, task_id } = await params;
    const token = request.cookies.get("token")?.value;
    const senderUid = await getUserUid(token!);
    if (!senderUid) return sendError("Unauthorized", 401);

    const { targetUid } = await request.json();
    if (!targetUid) return sendError("Target UID is required", 400);
    if (senderUid === targetUid) return sendError("You cannot nudge yourself", 400);

    await connectToDatabase();
    
    const access = await checkGroupAccess(senderUid, group_id);
    if (access.error) return sendError(access.error, access.status);
    
    const isTargetMember = access.group.members.some((m: any) => m.uid === targetUid);
    if (!isTargetMember) return sendError("Target user is not a member of this group", 403);

    const task = await Task.findById(task_id);
    if (!task) return sendError("Task not found", 404);
    if (task.status === 'completed') return sendError("Task is already completed, no need to nudge!", 400);
    
    const hasTargetCompleted = task.completions.some((c: any) => c.uid === targetUid);
    if (hasTargetCompleted) return sendError("User has already completed this task", 400);

    const config = await AppConfig.findOne().lean() || { max_daily_nudge: 10 };
    const sender = await User.findOne({ uid: senderUid });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let currentNudges = sender.daily_nudge_count || 0;
    const lastNudgeDate = sender.last_nudge_date ? new Date(sender.last_nudge_date) : new Date(0);
    lastNudgeDate.setHours(0, 0, 0, 0);

    if (lastNudgeDate.getTime() < today.getTime()) {
      currentNudges = 0;
    }

    if (currentNudges >= config.max_daily_nudge) {
      return sendError(`You have reached your daily limit of ${config.max_daily_nudge} nudges`, 403);
    }

    await User.findOneAndUpdate(
      { uid: senderUid },
      { daily_nudge_count: currentNudges + 1, last_nudge_date: new Date() }
    );

    await Group.findOneAndUpdate(
      { _id: group_id, "members.uid": senderUid },
      { $inc: { "members.$.total_nudges_sent": 1 } }
    );

    await Group.findOneAndUpdate(
      { _id: group_id, "members.uid": targetUid },
      { $inc: { "members.$.total_nudges_received": 1 } }
    );

    const nudgedUserIndex = task.nudged_users.findIndex((u: any) => u.uid === targetUid);
    if (nudgedUserIndex > -1) {
      task.nudged_users[nudgedUserIndex].nudge_count += 1;
      task.nudged_users[nudgedUserIndex].nudged_at = new Date();
    } else {
      task.nudged_users.push({ uid: targetUid, nudge_count: 1, nudged_at: new Date() });
    }
    await task.save();

    await Notification.create({
      recipient_id: targetUid,
      sender_id: senderUid,
      task_id: task_id,
      type: 'nudge',
      is_read: false
    });

    const targetUser = await User.findOne({ uid: targetUid }).lean();
    if (targetUser && targetUser.push_subscription) {
      try {
        const pushPayload = JSON.stringify({
          title: `👋 Nudge from ${sender.username}`,
          body: `Don't forget to complete: "${task.title}"`,
          icon: `/avatars/avatar-${sender.avatar_id || '0'}.png`,
          url: `/groups/${group_id}`,
        });
        
        await webpush.sendNotification(targetUser.push_subscription, pushPayload);
      } catch (pushError: any) {
        console.error("Web Push failed (Target might have revoked permission):", pushError);
        if (pushError.statusCode === 410 || pushError.statusCode === 404) {
          await User.findOneAndUpdate({ uid: targetUid }, { push_subscription: null });
        }
      }
    }

    return sendSuccess("Nudge sent successfully!", { remaining_nudges: config.max_daily_nudge - (currentNudges + 1) });
  } catch (error: any) {
    console.error("Nudge API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}