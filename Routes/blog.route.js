import express from "express";
import verifyAuth from "../Middlewares/VerifyAuth";
import {
  createBlog,
  deleteBlog,
  readBlog,
  updateBlog,
} from "../Controller/blog.controller";
const router = express.Router();

router.get("/:id", verifyAuth, readBlog);
router.post("/createBlog", verifyAuth, createBlog);
router.get("/deleteBlog", verifyAuth, deleteBlog);
router.get("/update/:id", verifyAuth, updateBlog);

export default router;
