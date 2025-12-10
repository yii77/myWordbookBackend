import express from "express";

import { login, getAccessToken } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check", authMiddleware, (req, res) => {
  res.json({ message: "用户认证成功", user: req.user });
});

router.post("/login", login);
router.post("/getAccessToken", getAccessToken);

export default router;
