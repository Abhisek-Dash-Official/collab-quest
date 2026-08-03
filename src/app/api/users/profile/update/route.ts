import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { getUserUid } from "@/lib/auth";
import { sendSuccess, sendError } from "@/lib/utils";
import bcrypt from "bcryptjs";

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return sendError("Unauthorized", 401);

    const uid = await getUserUid(token);
    if (!uid) return sendError("Invalid session", 401);

    const body = await request.json();
    const { username, avatar_id, old_password, new_password } = body;

    await connectToDatabase();

    const updateFields: any = {};
    if (username !== undefined) updateFields.username = username;
    if (avatar_id !== undefined) updateFields.avatar_id = avatar_id;

    if (new_password) {
      if (!old_password) {
        return sendError("Old password is required to set a new password", 400);
      }

      const user = await User.findOne({ uid }).select("+hashed_password");
      if (!user) return sendError("User not found", 404);

      const isMatch = await bcrypt.compare(old_password, user.hashed_password);
      if (!isMatch) {
        return sendError("Incorrect old password", 401);
      }

      const salt = await bcrypt.genSalt(10);
      updateFields.hashed_password = await bcrypt.hash(new_password, salt);
    }

    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { $set: updateFields },
      { new: true }
    )
      .select("-hashed_password -push_subscription -role")
      .lean();

    if (!updatedUser) return sendError("User not found", 404);

    return sendSuccess("Profile updated successfully", updatedUser);

  } catch (error: any) {
    console.error("Update Profile API Error:", error);
    return sendError("Internal Server Error", 500);
  }
}