import express, { Request, Response } from 'express';
import  bodyParser from "body-parser";
import { drizzle } from "drizzle-orm/mysql2";
import mysql, { Connection } from "mysql2/promise";
import * as  dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routers/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import taskRoutes from './routers/taskRoutes';

const app = express();
const port = 8000;

dotenv.config()
async function connectToDatabase() {
  //Check ENV
  if (!dotenv) {
    throw new Error("DB credentials error");
  }

  //Create Connection 
  const connection: Connection = await mysql.createConnection({
    host:process.env.DB_URL,
    database:process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    port:Number(process.env.DB_PORT),
  });

  // return drizzle(connection);
  const db = drizzle(connection);

  console.log("Database Connected !!!!");
  return db;

}

connectToDatabase()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api', taskRoutes);
app.use(errorHandler);

app.listen(port ,()=> {
    console.log("app is run to Port 8000")
})








