import { verifyRefreshToken, generateAccessToken } from "../utils/jwt.js";

export async function createAccessToken({ refreshToken }) {
  try {
    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({ userId: payload.userId });

    return {
      success: true,
      accessToken,
    };
  } catch (err) {
    return {
      success: false,
      message: "refreshToken 无效或过期",
    };
  }
}
