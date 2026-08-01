import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import Feedback from "@/models/Feedback";
import { sendSuccess, sendError } from "@/lib/utils";
import { getUserUid } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return sendError("You must be logged in to submit feedback.", 401);
    }

    const uid = await getUserUid(token);
    if (!uid) {
      return sendError("Invalid session. Please log in again.", 401);
    }

    const body = await request.json();
    const { email, type, message } = body;

    if (!email || !type || !message) {
      return sendError("Email, feedback type, and message are required.", 400);
    }

    const validTypes = ['bug', 'feature_request', 'other'];
    if (!validTypes.includes(type)) {
      return sendError("Invalid feedback type.", 400);
    }

    if (message.length < 10) {
      return sendError("Message must be at least 10 characters long.", 400);
    }

    await connectToDatabase();

    await Feedback.create({
      uid,
      email,
      type,
      message,
    });

    return sendSuccess(
      "Your feedback has been submitted! Thanks for helping us improve.",
      null,
      201
    );

  } catch (error: any) {
    console.error("Feedback API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}