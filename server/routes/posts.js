import express from "express";
import { getPosts, createPost , updatePost, deletePost, updateLikePost} from "../controllers/postsController.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", updateLikePost);

export default router;
