import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import connectDB from "./db/db.js";
connectDB();
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT || 4000;

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
