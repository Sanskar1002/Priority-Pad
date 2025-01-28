import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRouter from "./routes/userRouter.js";
import todoRouter from "./routes/todoRouter.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://priority-pad.onrender.com",
    credentials: true,
  })
);

app.use("/", userRouter);
app.use("/", todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
