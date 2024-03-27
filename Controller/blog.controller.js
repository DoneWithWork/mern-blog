import BlogModel from "../models/blog.model.js";
import asyncHandler from "express-async-handler";
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, description } = req.body;
  const blog = new BlogModel({
    title,
    content,
    description,
    user_id: req.user_id,
  });
  const savedBlog = await blog.save();
  res.send(savedBlog);
});
export const readBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "Please provide an id" });
  }
  const blog = await BlogModel.findById(id);
  if (!blog) {
    res.status(400).json({ error: "Blog not found" });
  }
  res.status(200).json(blog.toJSON());
});
export const updateBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "Please provide an id" });
  }
  const blog = await BlogModel.findById(id);
  if (!blog) {
    res.status(400).json({ error: "Blog not found" });
  }
  if (blog.user_id !== req.user_id) {
    res
      .status(401)
      .json({ error: "You are not authorized to update this blog" });
  }
  const { title, content, description } = req.body;
  blog.title = title;
  blog.content = content;
  blog.description = description;
  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog.toJSON());
});
export const deleteBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "Please provide an id" });
  }
  const blog = await BlogModel.findById(id);
  if (!blog) {
    res.status(400).json({ error: "Blog not found" });
  }
  if (blog.user_id !== req.user_id) {
    res
      .status(401)
      .json({ error: "You are not authorized to delete this blog" });
  }
  await blog.delete();
  res.status(200).json({ message: "Blog deleted successfully" });
});
