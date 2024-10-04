import express from "express";
import { dbconnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/taskRouter.js";
import cors from "cors";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(taskRouter);

dbconnection();
app.listen(5000, () => {
  console.log("server is running on port", 5000);
});
