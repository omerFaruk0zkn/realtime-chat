import User from "../models/user.model.js";
import { AppError } from "../lib/appError.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { generateToken, streamUpload } from "../lib/utils.js";

export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    throw new AppError(400, "All fields are required");

  if (password.length < 6)
    throw new AppError(400, "Password must be at least 6 characters");

  const user = await User.findOne({ email });

  if (user) throw new AppError(400, "Email already exists");

  const newUser = new User({
    fullName,
    email,
    password,
  });

  if (newUser) {
    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json(newUser);
  } else {
    throw new AppError(400, "Invalid user data");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new AppError(400, "All fields are required");

  const user = await User.findOne({ email });

  if (!user) throw new AppError(400, "Invalid credentials");

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) throw new AppError(400, "Invalid credentials");

  generateToken(user._id, res);

  res.status(200).json(user);
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!req.file) throw new AppError(400, "Profile pic is required");

  const imageUrl = await streamUpload(req.file.buffer, "realtime-chat/profile");

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      profilePic: imageUrl,
    },
    { new: true }
  );

  res.status(200).json(updatedUser);
});

export const checkAuth = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) throw new AppError(404, "User not found");

  res.status(200).json(user);
});
