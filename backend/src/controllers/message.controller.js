import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { streamUpload } from "../lib/utils.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });

  res.status(200).json(filteredUsers);
});

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  res.status(200).json(messages);
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let imageUrl;

  if (req.file) {
    imageUrl = await streamUpload(req.file.buffer, "realtime-chat/images");
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});
