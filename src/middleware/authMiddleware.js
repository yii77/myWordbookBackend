import { verifyRefreshToken, generateRefreshToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader.split(" ")[1];

  try {
    const payload = verifyRefreshToken(refreshToken);
    req.user = payload;

    // 如果剩余不到 3 天，返回新 Token
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp - now < 3 * 24 * 60 * 60) {
      const newRefreshToken = generateRefreshToken({ userId: payload.userId });
      res.setHeader("x-refresh-token", newRefreshToken);
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "用户认证失败" });
  }
};
