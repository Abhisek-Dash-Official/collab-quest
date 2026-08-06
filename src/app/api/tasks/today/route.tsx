import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) return sendError("Unauthorized", 401);

        const uid = await getUserUid(token);
        if (!uid) return sendError("Invalid session", 401);

        await connectToDatabase();

        const user = await User.findOne({ uid }).lean();
        if (!user || !user.joined_groups || user.joined_groups.length === 0) {
            return sendSuccess("Fetched today's tasks", []);
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const todaysTasks = await Task.find({
            group_id: { $in: user.joined_groups },
            status: "active",
            "completions.uid": { $ne: uid },
            $and: [
                {
                    $or: [
                        { deadline: { $exists: false } },
                        { deadline: null },
                        { deadline: { $lte: endOfDay } },
                        { start_time: { $gte: startOfDay, $lte: endOfDay } }
                    ]
                },
                {
                    $or: [
                        { task_type: "ALL" },
                        { task_type: "ASSIGNED", assigned_users: uid },
                        { task_type: "ANY", completions: { $size: 0 } }
                    ]
                }
            ]
        })
            .populate('group_id', 'group_name group_icon_id')
            .sort({ deadline: 1 })
            .lean();

        return sendSuccess("Fetched today's group tasks", todaysTasks);

    } catch (error: any) {
        console.error("Today's Tasks API Error:", error);
        return sendError("Internal Server Error", 500);
    }
}