import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    const uid = await getUserUid(token!);
    if (!uid) return sendError("Unauthorized", 401);

    const { subscription } = await request.json();
    if (!subscription) return sendError("Subscription object is required", 400);

    await connectToDatabase();

    await User.findOneAndUpdate(
      { uid },
      { push_subscription: subscription },
      { new: true }
    );

    return sendSuccess("Push subscription saved successfully", null);
  } catch (error: any) {
    console.error("Push Subscription API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}