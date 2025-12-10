import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { connectMongoDB } from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

await connectMongoDB();

// 路由
app.use("/myWordbook/auth", authRoutes);

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
