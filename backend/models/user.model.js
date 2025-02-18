import mongoose, { mongo, Mongoose } from "mongoose"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default:""
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    bookmarks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]

})

export  const User = mongoose.model("User", userSchema)