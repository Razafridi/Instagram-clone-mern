const postModel = require("../Models/postsModel");
const mongoose = require("mongoose");
const { catchAsync, AppError } = require("../Utils/appError");

const addPost = catchAsync(async (req, res, next) => {
  const { caption } = req.body;
  if (!caption) {
    return next(new AppError("Please Proivde Caption", 404));
  }
  if (!req.file) {
    return next(new AppError("Please Proivde Image", 404));
  }

  const id = req.user._id;

  const post = new postModel({ caption, photo: req.file.filename, user: id });
  await post.save();

  res.json({
    status: "success",
    post,
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;
  if (!postId) {
    return next(new AppError("Please Proivde Post ID", 404));
  }
  // Check if the post belong to the current user or not
  const post = await postModel.findOne({ _id: postId, user: userId });
  if (!post) {
    return next(new AppError("This post not belong to you", 404));
  }
  await postModel.findByIdAndDelete(postId);
  res.status(200).json({
    status: "success",
    message: "Post Deleted Successfully",
  });
});
const getPost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await postModel.findOne({ _id: id });
  if (!post) {
    return next(new AppError("Post not found", 404));
  }
  res.json({
    status: "success",
    post,
  });
});

const getAllPost = catchAsync(async (req, res, next) => {
  const data = await postModel.find({});
  res.json({
    status: "success",
    data,
  });
});

// const updatePost = catchAsync(async (req, res, next) => {
//   res.status(404).json({
//     status: "not defined",
//     message: "this route is not defined yet",
//   });
// });

const likePost = catchAsync(async (req, res, next) => {
  const { postId } = req.body;
  if (!postId) {
    return next(new AppError("PostId not provide", 404));
  }

  const userId = req.user._id;
  const post = await postModel.findById(postId).populate("user");
  if (!post) {
    return next(new AppError("Post not found", 401));
  }

  if (post.likes.includes(userId)) {
    // if already like then dislike

    post.likes = post.likes.filter(
      (item) => item.toString() !== userId.toString()
    );
  } else {
    post.likes.push(userId);
  }

  const newPost = await post.save();

  res.json({
    status: "success",
    post: newPost,
  });
});

const commentPost = catchAsync(async (req, res, next) => {
  const { postId, comment } = req.body;

  if (!postId || !comment) {
    return next(new AppError("Please Provide both comment and postId", 404));
  }
  // Retrive Post
  const post = await postModel.findById(postId);

  //add comment
  post.comments.push({
    user: postId,
    comment,
  });

  const updatePost = await post.save();

  res.json({ post });
});

// Delete comment

const deleteComment = catchAsync(async (req, res, next) => {
  const { postId, commentId } = req.body;
  const userId = req.user._id;
  if (!postId || !commentId) {
    return next(new AppError("Please Proivde Post ID and Comment id", 401));
  }
  // Check if the post belong to the current user or not
  const post = await postModel.findOne({ _id: postId });
  if (!post) {
    return next(new AppError("This post not found", 401));
  }

  const isExists = post.comments.filter(
    (item) => item._id.toString() !== commentId.toString()
  );
  console.log(isExists);
  if (isExists.length === 0) {
    return next(new AppError("This comments was deleted", 401));
  }

  post.comments = post.comments.filter(
    (item) => item._id.toString() !== commentId.toString()
  );

  const updatedPost = await post.save();

  res.status(200).json({
    status: "success",
    data: updatedPost,
  });
});

module.exports = {
  addPost,
  deletePost,
  deleteComment,
  getPost,
  getAllPost,
  likePost,
  commentPost,
};
