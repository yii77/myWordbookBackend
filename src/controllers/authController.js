import { loginUser } from "../services/loginService.js";
import { createAccessToken } from "../services/getAccessTokenService.js";

export async function login(req, res) {
  const result = await loginUser(req.body);
  res.status(result.success ? 200 : 400).json(result);
}

export async function getAccessToken(req, res) {
  const result = await createAccessToken(req.body);
  res.status(result.success ? 200 : 401).json(result);
}
