import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then((data) => {
      console.log(`MongoDB connected: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("MongoDB connection error:", err);
      process.exit(1);
    });
};
