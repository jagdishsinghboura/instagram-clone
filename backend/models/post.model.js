import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    caption: { type: String, default: '' },
    image: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    hideLikes:{type:Boolean, default:false},
    hideComments:{type:Boolean, default:false},
},{timestamps:true});
export const Post = mongoose.model('Post', postSchema);