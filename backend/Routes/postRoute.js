const express = require("express");
const {
  addPost,
  deletePost,
  getAllPost,
  getPost,
  // updatePost,
  likePost,
  commentPost,
  deleteComment,
} = require("../Controller/postController");
const configFile = require("../Utils/fileuploads");
const protect = require("../Middleware/authMiddleware");

const postRouter = express.Router();

const uploads = configFile("post");

postRouter.post("/add", protect, uploads.single("photo"), addPost);
postRouter.delete("/delete/:id", protect, deletePost);
postRouter.get("/get-all", protect, getAllPost);
postRouter.get("/get/:id", protect, getPost);
// postRouter.put("/update", updatePost);

postRouter.post("/like", protect, likePost);
postRouter.post("/comment", protect, commentPost);
postRouter.delete("/comment", protect, deleteComment);

module.exports = postRouter;
