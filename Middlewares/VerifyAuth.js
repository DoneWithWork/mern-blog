import jwt from "jsonwebtoken";
const verifyAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user_id = decoded._id;
  // Add your logic to verify the token here

  next();
};

export default verifyAuth;
