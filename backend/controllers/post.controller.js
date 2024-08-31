import sharp from "sharp"
import { User } from "../models/user.model.js";
import cloudinary from "../utils/clodinary.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        console.log("Image", req.file);

        if (!image) {
            return res.status(401).json({
                message: "Image required",
                success: false,
            });
        }

        const optimizeImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: "inside" })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizeImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId,
        });

        const user = await User.findById(authorId);
        if (user) {
            user.post.push(post._id); // Assuming `posts` is the correct field name
            await user.save();
        }

        await post.populate({ path: "author", select: "-password" });

        return res.status(200).json({
            message: "New post created",
            success: true,
            post,
        });

    } catch (error) {
        console.log("Error in creating new post:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};




export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};


export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: "username, profilePicture"
        }).populate({
            path: "comments",
            sort: { createdAt: -1 },
            populate: {
                path: "author",
                select: "username , profilePicture"
            }
        })
        return res.status(200).json({
            posts,
            success: true,
        })
    } catch (error) {
        console.log("error in getuserPost");

    }
}

export const likePost = async (req, res) => {
    try {


        console.log("helo", req.params);
        const likeByUser = req.id;
        const postId = req.params?.id;
        console.log("helo", postId);
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                mesage: "post not found",
                success: false,
            })
        }

        await Post.updateOne({ $addToSet: { likes: likeByUser } })
        await post.save();

        //socket.io used in 
        const user = await User.findById(likeByUser).select('username profilePicture')
        const postOwnerId = post.author.toString();
        console.log("postOwnerId",postOwnerId);
        

        if (postOwnerId !== likeByUser) {
            const notification = {
                type: 'like',
                userId: likeByUser,
                userDetails: user,
                postId,
                message: "your post is liked"
            }
            console.log("notification",notification);
            
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit("notification", notification);
        }

        return res.status(200).json({
            message: "postLiked",
            success: true,
        })
    } catch (error) {
        console.log("error in likePost ", error);

    }
}
export const unlikePost = async (req, res) => {
    try {
        const likeByUser = req.id;
        console.log("sfsdfsfdg", req.id);

        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                mesage: "post not found",
                success: false,
            })
        }

        await Post.updateOne({ $pull: { likes: likeByUser } })
        await post.save();

        //socket.io used in 
        const user = await User.findById(likeByUser).select('username profilePicture')
        const postOwnerId = post.author.toString();

        if (postOwnerId !== likeByUser) {
            const notification = {
                type: 'dislike',
                userId: likeByUser,
                userDetails: user,
                postId,
                message: "your post is unlike"
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit("notification", notification);
        }

        return res.status(200).json({
            message: "post unliked",
            success: true,
        })
    } catch (error) {
        console.log("error in likePost ", error);

    }
}


export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentByUser = req.id;

        const { text } = req.body;
        const post = await Post.findById(postId);
        const comment = await Comment.create({
            text,
            author: commentByUser,
            post: postId,
        });

        await comment.populate({
            path: "author",
            select: 'username profilePicure'
        });

        post.comments.push(comment._id);
        await post.save();

        return res.status(200).json({
            message: "comment sucess",
            success: true,
            comment,
        })
    } catch (error) {
        console.log("error in addComment ", error);

    }
}

export const getCommentOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate('author', 'username, profilePicture')


        if (comments) return res.status(404).json({
            message: "no commets found in this post",
            success: false,
        });
        return res.status(200).json({
            comments,
            success: true,
        })
    } catch (error) {

    }
}


export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if (!post) return res.json({
            message: "not found post",
        })

        if (post.author.toString() !== authorId) {
            return res.status(403).json({
                message: "unathorize ",
                success: false,
            })
        }

        await Post.findByIdAndDelete(postId)

        //remve post form user
        let user = await User.findById(authorId);
        user.post = user.post.filter(id => id.toString() !== postId)
        await user.save();
        await Comment.deleteMany({ post: postId })
        return res.status(200).json({
            message: "post deleted",
            success: true
        })

    } catch (error) {
        console.log("error n deletPost", error);

    }
}

export const bookMarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);

        const user = await User.findById(authorId);
        if (user.bookmarks.includes(post._id)) {
            await user.updateOne({ $pull: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({
                type: "unsaved",
                message: "remove from bookmarks",
                success: true,
            })
        } else {
            await user.updateOne({ $addToSet: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({
                type: "saved",
                message: "saved in bookmarks",
                success: true,
            })
        }
    } catch (error) {
        console.log("erorr in bookMarkPost ", error);

    }
}