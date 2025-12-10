import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;

export async function connectMongoDB() {
  const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

  if (!DB_USER || !DB_PASS || !DB_HOST || !DB_PORT || !DB_NAME) throw new Error('未配置数据库信息');

  const uri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_NAME}`;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    db = client.db(DB_NAME);
    console.log('MongoDB 已连接');
  } catch (err) {
    console.error('MongoDB 连接失败', err);
    throw err;
  }
}

export function getDB() {
  if (!db) throw new Error('数据库尚未连接');
  return db;
}
