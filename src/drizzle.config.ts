import { defineConfig } from "drizzle-kit";
import * as  dotenv from "dotenv"

dotenv.config()

//console.log(process.env.DB_PORT);

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema",
  out: "./drizzle/migrations",
  dbCredentials:{
    host:process.env.DB_URL||"",
    database:process.env.MYSQL_DATABASE||"",
    user: process.env.MYSQL_USER || "",
    password:process.env.MYSQL_PASSWORD||"",
    port:Number(process.env.DB_PORT) || 0, 
    },
    verbose: true,
    strict: true,
});