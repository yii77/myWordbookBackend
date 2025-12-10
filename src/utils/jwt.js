import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// 生成 Access Token（短效，访问 API 用）
export function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" }); // 15分钟
}

// 生成 Refresh Token（长效，用于换取新 accessToken）
export function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "17d" }); // 17天
}

// 验证 Access Token
export function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// 验证 Refresh Token
export function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function refreshToken(payload) {
  return generateToken(payload);
}
