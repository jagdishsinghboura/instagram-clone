import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/social_media");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB failed to connect", error);
    }
};

export default connectDB;
