import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Task from "@/models/Task";
import Group from "@/models/Group";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError, checkGroupAccess } from "@/lib/utils";

export async function PATCH(request: NextRequest, { params }: { params: { group_id: string, task_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    const uid = await getUserUid(token!);
    if (!uid) return sendError("Unauthorized", 401);

    await connectToDatabase();
    
    const access = await checkGroupAccess(uid, params.group_id);
    if (access.error) return sendError(access.error, access.status);
    if (!access.isCreator) return sendError("Only creator can update this task", 403);

    const task = await Task.findById(params.task_id);
    if (!task) return sendError("Task not found", 404);

    const updates = await request.json();

    if (task.completions.length > 0) {
      if (updates.weightage || updates.task_type) {
        return sendError("Cannot update weightage or type because some users have already completed this task.", 400);
      }
    }

    Object.assign(task, updates);
    await task.save();

    return sendSuccess("Task updated successfully", task);
  } catch (error: any) {
    return sendError("Internal Server Error", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { group_id: string, task_id: string } }) {
  try {
    const token = request.cookies.get("token")?.value;
    const uid = await getUserUid(token!);
    if (!uid) return sendError("Unauthorized", 401);

    await connectToDatabase();
    
    const access = await checkGroupAccess(uid, params.group_id);
    if (access.error) return sendError(access.error, access.status);
    if (!access.isCreator) return sendError("Only creator can delete this task", 403);

    const task = await Task.findByIdAndDelete(params.task_id);
    if (!task) return sendError("Task not found", 404);

    await Group.findByIdAndUpdate(params.group_id, { $inc: { total_tasks: -1 } });

    return sendSuccess("Task deleted permanently", null);
  } catch (error: any) {
    return sendError("Internal Server Error", 500);
  }
}