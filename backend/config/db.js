import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mockcart");
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("DB connection failed", error);
  }
};

export default connectDB;
