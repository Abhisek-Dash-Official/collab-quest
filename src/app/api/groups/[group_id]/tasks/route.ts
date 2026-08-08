import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Task from "@/models/Task";
import Group from "@/models/Group";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError, checkGroupAccess } from "@/lib/utils";

// CREATE TASK (Only Creator)
export async function POST(request: NextRequest, { params }: { params: Promise<{ group_id: string }> }) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);
    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    await connectToDatabase();
    
    const access = await checkGroupAccess(uid, (await params).group_id);
    if (access.error) return sendError(access.error, access.status);
    if (!access.isCreator) return sendError("Only the creator can create tasks", 403);

    const { title, desc, weightage, start_time, deadline, task_type, assigned_users, subtasks } = await request.json();

    if (!title || !weightage || !task_type) return sendError("Missing required fields", 400);

    const newTask = await Task.create({
      group_id: (await params).group_id,
      title,
      desc,
      weightage,
      start_time,
      deadline,
      task_type,
      assigned_users: task_type === 'ASSIGNED' ? assigned_users : [],
      subtasks: subtasks || [],
      status: 'active'
    });

    // Increment total_tasks in Group
    await Group.findByIdAndUpdate((await params).group_id, { $inc: { total_tasks: 1 } });

    return sendSuccess("Task created successfully", newTask, 201);
  } catch (error: any) {
    console.error("Create Task Error:", error);
    return sendError("Internal Server Error", 500);
  }
}

// GET TASKS WITH PAGINATION
export async function GET(request: NextRequest, { params }: { params: Promise<{ group_id: string }> }) {
  try {
    const group_id = (await params).group_id;

    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);
    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    await connectToDatabase();

    const access = await checkGroupAccess(uid, group_id);
    if (access.error) return sendError(access.error, access.status);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ group_id: group_id })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Task.countDocuments({ group_id: group_id });

    return sendSuccess("Tasks fetched successfully", {
      tasks,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    console.error("Get Tasks Error:", error);
    return sendError("Internal Server Error", 500);
  }
}