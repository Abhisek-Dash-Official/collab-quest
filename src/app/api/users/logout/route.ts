import { sendSuccess, sendError } from "@/lib/utils";

export async function POST() {
  try {
    const response = sendSuccess("Logged out successfully", null, 200);

    response.cookies.delete("token");

    return response;
  } catch (error: any) {
    console.error("Logout Error:", error);
    return sendError("Internal Server Error", 500);
  }
}