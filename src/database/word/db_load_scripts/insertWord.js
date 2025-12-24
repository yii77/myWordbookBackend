import fs from "fs";
import csv from "csv-parser";
import path from "path";

import { connectMongoDB, getDB } from "../../../config/db.js";

const csvPath = path.join(process.cwd(), "..", "data", "word.csv");
const BATCH_SIZE = 1000;

async function insertWord() {
  await connectMongoDB();
  const db = getDB();
  const collection = db.collection("words");

  const stream = fs.createReadStream(csvPath).pipe(csv());
  const batch = [];
  let totalCount = 0;

  for await (const row of stream) {
    if (!row.word) continue;

    const doc = { word: row.word.trim() };
    batch.push(doc);

    if (batch.length >= BATCH_SIZE) {
      await collection.insertMany(batch, { ordered: false });
      totalCount += batch.length;
      console.log(`已导入 ${totalCount} 条`);
      batch.length = 0;
    }
  }

  // 插入最后不足一批的内容
  if (batch.length > 0) {
    await collection.insertMany(batch, { ordered: false });
    totalCount += batch.length;
    console.log(`已导入 ${totalCount} 条`);
  }

  console.log("CSV 文件导入 word 列完成");
  process.exit(0);
}

insertWord().catch((err) => {
  console.error("导入出错:", err);
  process.exit(1);
});
