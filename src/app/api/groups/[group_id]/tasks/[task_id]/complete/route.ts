import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Task from "@/models/Task";
import Group from "@/models/Group";
import User from "@/models/User";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError, checkGroupAccess } from "@/lib/utils";
import { calculateTaskXP, getTaskTimingModifiers } from "@/lib/gamification";

export async function POST(request: NextRequest, { params }: { params: { group_id: string, task_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    const uid = await getUserUid(token!);
    if (!uid) return sendError("Unauthorized", 401);

    await connectToDatabase();
    
    const access = await checkGroupAccess(uid, params.group_id);
    if (access.error) return sendError(access.error, access.status);

    const task = await Task.findById(params.task_id);
    if (!task) return sendError("Task not found", 404);

    if (task.status === 'completed') return sendError("Task is already fully completed", 400);

    // Check if user is Assigned
    if (task.task_type === 'ASSIGNED' && !task.assigned_users.includes(uid)) {
      return sendError("You are not assigned to this task", 403);
    }

    // Check if already completed by this user
    if (task.completions.some((c: any) => c.uid === uid)) {
      return sendError("You have already completed this task", 400);
    }

    const now = new Date();
    
    const totalAssigned = task.task_type === 'ALL' || task.task_type === 'ANY' 
      ? access.group.members.length 
      : task.assigned_users.length;
      
    const completionOrder = task.completions.length + 1;
    const modifiers = getTaskTimingModifiers(task.start_time, task.deadline, now);
    
    const earnedXP = calculateTaskXP(
      task.weightage, 
      totalAssigned, 
      completionOrder, 
      modifiers.isTimeTraveler, 
      modifiers.isEarlyBird
    );

    task.completions.push({
      uid,
      completed_at: now,
      order: completionOrder,
      xp_earned: earnedXP,
      respect_likes: []
    });

    if (task.task_type === 'ANY' || (task.task_type === 'ASSIGNED' && task.completions.length === task.assigned_users.length)) {
      task.status = 'completed';
    }
    await task.save();

    await Group.findOneAndUpdate(
      { _id: params.group_id, "members.uid": uid },
      {
        $inc: {
          "members.$.xp_gained": earnedXP,
          "members.$.task_completion_count": 1,
          "members.$.first_finishes_count": completionOrder === 1 ? 1 : 0,
          "members.$.last_minute_finishes_count": modifiers.isLastMinute ? 1 : 0,
          "totalXPAwarded": earnedXP
        }
      }
    );

    await User.findOneAndUpdate({ uid }, { $inc: { xp: earnedXP } });

    return sendSuccess("Task completed! XP Awarded.", { earnedXP, modifiers, order: completionOrder });
  } catch (error: any) {
    console.error("Complete Task Error:", error);
    return sendError("Internal Server Error", 500);
  }
}