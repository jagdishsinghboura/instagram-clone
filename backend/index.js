import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app , server} from "./socket/socket.js";
import cookieParser from "cookie-parser";

dotenv.config();

// Connect to the database
connectDB();




app.use(cookieParser());

app.use(express.json());
app.use(urlencoded({ extended: true }));

const allowedOrigins = [
  "https://instagram-clone-rho-eight.vercel.app",
  "http://localhost:5173", // Vite default
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOption));

app.get("/", (req, res)=>{
    res.send("sdajf")
})

app.use("/api/v1/user",userRoute)
app.use("/api/v1/post",postRoute)
app.use("/api/v1/message",messageRoute)

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
