import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as  dotenv from "dotenv"

dotenv.config()

if (!process.env.DB_URL || !process.env.MYSQL_DATABASE || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD || !process.env.DB_PORT) {
throw new Error("DB credentials error");
}

const connection = await mysql.createConnection({
    host:process.env.DB_URL,
    database:process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    port:Number(process.env.DB_PORT)
  });

export const db = drizzle(connection);