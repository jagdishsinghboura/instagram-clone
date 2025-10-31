import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/clodinary.js";
import { Post } from "../models/post.model.js";
import connectDB from "../utils/db.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Try different email",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}
// export const login = async (req, res) => {
//     try {
//         const {  email, password } = req.body;
//         console.log(email);

//         if (!email || !password) {
//             return res.status(401).json({
//                 message: "Something is missing, please check!",
//                 success: false,
//             });
//         }
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({
//                 message: "Incorrect email or password",
//                 success: false,
//             });
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(401).json({
//                 message: "Incorrect email or password",
//                 success: false,
//             });
//         };

//         const token = await jwt.sign({ userId: user._id }, 'supersecretpassword', { expiresIn: '1d' });

//       //  populate each post if in the posts array
//         const populatedPosts = await Promise.all(
//             user.post.map( async (postId) => {
//                 const post = await Post.findById(postId);
//                 if(post.author.equals(user._id)){
//                     return post;
//                 }
//                 return null;
//             })
//         )
//        const  newUser = {
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             profilePicture: user.profilePicture,
//             bio: user.bio,
//             followers: user.followers,
//             following: user.following,
//             post:populatedPosts
//         }
//         console.log(newUser);

//         res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000, secure: false });
//         console.log(req.cookies.token);



//         return res.json({
//             message: `Welcome back ${user.username}`,
//             success: true,
//             user:newUser
//         });

//     } catch (error) {
//         console.log(error);
//     }
// };
export const login = async (req, res) => {
    try {

        connectDB();
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        

        let user = await User.findOne({ email });



        if (!user) {
            return res.status(401).json({
                message: " email doesn't exist ",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password.trim(), user.password.trim());
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect  password",
                success: false,
            });
        };

        const token = await jwt.sign({ userId: user._id }, "supersecretpassword", { expiresIn: '1d' });

        // populate each post if in the posts array
        const populatedPosts = await Promise.all(
            user.post.map(async (postId) => {
                const post = await Post.findById(postId);
                if (post.author.equals(user._id)) {
                    return post;
                }
                return null;
            })
        )
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: populatedPosts
        }
        res.cookie("token", token, {
  httpOnly: true,
  secure: true,      
  sameSite: "None",    
  maxAge: 24 * 60 * 60 * 1000,
});
        res.cookie('username', 'JohnDoe', { maxAge: 900000 });

        return res.json({
            message: `Welcome back ${user.username}`,
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
    }
};
export const logout = async (req, res) => {
    try {
        console.log(req.cookies.token);


        return res.clearCookie("token").json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).populate({ path: 'post' }).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender, username } = req.body;
        const profilePicture = req.file;

        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }


        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (username) user.username = username;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error.',
            success: false
        });
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
};
export const followOrUnfollow = async (req, res) => {
    try {
        const followKrneWala = req.id;
        const jiskoFollowKrunga = req.params.id;
        if (followKrneWala === jiskoFollowKrunga) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(followKrneWala);
        const targetUser = await User.findById(jiskoFollowKrunga);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check krunga ki follow krna hai ya unfollow
        const isFollowing = user.following.includes(jiskoFollowKrunga);
        if (isFollowing) {
            // unfollow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
            ])
            const authUser = await User.findById(followKrneWala);
            const otherUser = await User.findById(jiskoFollowKrunga).populate({ path: 'post' }).populate('bookmarks');
            return res.status(200).json({ message: 'Unfollowed successfully', success: true, user: {authUser , otherUser} });
        } else {
            // follow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
            ])

             const authUser = await User.findById(followKrneWala);
            const otherUser = await User.findById(jiskoFollowKrunga).populate({ path: 'post' }).populate('bookmarks');
            return res.status(200).json({ message: 'followed successfully', success: true, user: {authUser, otherUser }});
        }
    } catch (error) {
        console.log("error in follow/unfollow", error);
    }
}
