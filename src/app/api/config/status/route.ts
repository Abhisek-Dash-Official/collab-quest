import connectToDatabase from "@/lib/db";
import AppConfig from "@/models/AppConfig";
import { sendSuccess, sendError } from "@/lib/utils";

export async function GET() {
  try {
    await connectToDatabase();

    let config = await AppConfig.findOne().lean();

    if (!config) {
      config = await AppConfig.create({});
    }

    const publicConfig = {
      maintenance_mode: config.maintenance_mode,
      maintenance_msg: config.maintenance_msg,
      allow_new_signups: config.allow_new_signups,
      max_users_per_group: config.max_users_per_group,
      max_groups_per_user: config.max_groups_per_user,
      max_daily_nudge: config.max_daily_nudge,
      max_tasks_per_week: config.max_tasks_per_week,
    };

    return sendSuccess("App configuration fetched successfully", publicConfig, 200);

  } catch (error: any) {
    console.error("Config API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}