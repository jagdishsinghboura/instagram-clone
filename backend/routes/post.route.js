import express from "express"
// import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
import { addComment, addNewPost, bookMarkPost, deletePost, getAllPost, getCommentOfPost, getUserPost, hidePostComments, hidePostLikes, likePost, reactOnPost, unlikePost } from "../controllers/post.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single("image"), addNewPost)
router.route("/all").get(isAuthenticated, getAllPost)
router.route("/userPost/all").post(isAuthenticated,  getUserPost)
router.route("/:id/like").get(isAuthenticated, likePost)
router.route("/:id/dislike").get(isAuthenticated,  unlikePost)
router.route("/react/:id").get(isAuthenticated,  reactOnPost)
router.route("/:id/comment").post(isAuthenticated,  addComment)
router.route("/:id/comment/all").post(isAuthenticated,  getCommentOfPost)
router.route("/delete/:id").delete(isAuthenticated,  deletePost)
router.route("/:id/bookmark").get(isAuthenticated,  bookMarkPost)
router.route("/hidecomments/:id").post(isAuthenticated,  hidePostComments)
router.route("/hidelikes/:id").post(isAuthenticated,  hidePostLikes)


export default router;