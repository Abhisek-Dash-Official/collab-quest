import bcrypt from "bcryptjs";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import AppConfig from "@/models/AppConfig";
import { sendSuccess, sendError } from "@/lib/utils";

function generateUID(username: string): string {
const cleanName = username.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const firstName = cleanName || 'cqplyr';
  
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  const timeStr = `${month}${year}`;
  
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `${firstName}-${timeStr}-${randomStr}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, avatar_id } = body;

    if (!username || !email || !password) {
      return sendError("Username, email, and password are required", 400);
    }
    if (password.length < 6) {
      return sendError("Password must be at least 6 characters long", 400);
    }

    await connectToDatabase();

    const config = await AppConfig.findOne().lean();
    if (config && config.allow_new_signups === false) {
      return sendError("New registrations are currently closed.", 403);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError("User with this email already exists", 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const uid = generateUID(username);
    const newUser = await User.create({
      uid,
      username,
      email,
      hashed_password,
      avatar_id: avatar_id || "0",
    });

    return sendSuccess(
      "User registered successfully",
      {
        uid: newUser.uid,
        username: newUser.username,
        email: newUser.email,
        avatar_id: newUser.avatar_id,
        xp: newUser.xp,
      },
      201
    );

  } catch (error: any) {
    console.error("Registration Error:", error);
    return sendError("Internal Server Error", 500);
  }
}