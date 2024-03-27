import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./Routes/auth.route.js";

dotenv.config();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //!change this in production
//routes
app.get("/", (req, res) => {
  res.send("Backend for Mern app");
});

app.use("/api/auth/", authRoutes);

// Middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
