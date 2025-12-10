import bcrypt from "bcryptjs";

import { getDB } from "../config/db.js";
import { generateRefreshToken } from "../utils/jwt.js";

export async function loginUser({ phone, password }) {
  //验证是否有用户
  const db = getDB();
  const user = await db.collection("users").findOne({ phone });

  //如果用户不存在，直接返回
  if (!user) return { success: false, message: "用户不存在" };

  //如果用户存在，验证密码
  const isPasswordValid = await bcrypt.compare(password, user.password);

  //如果密码错误，直接返回
  if (!isPasswordValid) return { success: false, message: "密码错误" };

  //如果密码正确，生成refreshToken并返回
  const refreshToken = generateRefreshToken({ userId: user._id });
  console.log(refreshToken);

  return {
    success: true,
    userId: user._id,
    username: user.username,
    refreshToken: refreshToken,
  };
}
