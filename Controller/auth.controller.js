import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Please fill all the fields" });
  }
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const user = new User({
    username,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  res.send(savedUser);
});
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Please fill all the fields" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ error: "User not found" });
  }
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    res.status(400).json({ error: "Invalid password" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
    algorithm: "RS256",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ success: "Logged in" });
});
