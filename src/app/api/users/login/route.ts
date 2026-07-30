import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { sendSuccess, sendError } from "@/lib/utils";
import { generateToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return sendError("Email and password are required", 400);
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return sendError("Invalid credentials", 401);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordMatch) {
      return sendError("Invalid credentials", 401);
    }

    const tokenPayload = {
      uid: user.uid,
      email: user.email,
      role: user.role,
    };

    const token = await generateToken(tokenPayload);

    const response = sendSuccess(
      "Login successful",
      {
        uid: user.uid,
        username: user.username,
        email: user.email,
        avatar_id: user.avatar_id,
        xp: user.xp,
        token,
      },
      200
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;

  } catch (error: any) {
    console.error("Login Error:", error);
    return sendError("Internal Server Error", 500);
  }
}