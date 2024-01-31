const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const commentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  comment: {
    type: String,
    require: [true, "Comment is Require"],
  },
  publishedAt: {
    type: Date,
    default: new Date(),
  },
});

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    require: [true, "Caption is require"],
  },
  photo: {
    type: String,
    require: [true, "Image is require"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  comments: [commentsSchema],
  date: {
    type: Date,
    default: new Date(),
  },
});

// Middleware

// Methods

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
