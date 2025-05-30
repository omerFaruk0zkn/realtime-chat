import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../lib/asyncHandler.js";
import { AppError } from "../lib/appError.js";

export const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) throw new AppError(401, "Unauthorized - No Token Provided");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) throw new AppError(401, "Unauthorized - Invalid Token");

  const user = await User.findById(decoded.userId);

  if (!user) throw new AppError(404, "User not found");

  req.user = user;

  next();
});
