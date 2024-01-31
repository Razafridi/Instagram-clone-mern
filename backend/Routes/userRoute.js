const express = require("express");
const { login, register, logout } = require("../Controller/authController");
const {
  getUser,
  updateUser,
  follow,
  getAllUsers,
  getUserById,
  //   updatePassword,
} = require("../Controller/userController");
const configFile = require("../Utils/fileuploads");
const protect = require("../Middleware/authMiddleware");

const userRouter = express.Router();

// Multter
const uploads = configFile("profile");

// Public
userRouter.post("/login", login);
userRouter.post("/register", uploads.single("photo"), register);
// Protected
userRouter.post("/logout", protect, logout);

userRouter.get("/", protect, getUser);
userRouter.get("/get-user/:id", protect, getUserById);
userRouter.get("/get-all", protect, getAllUsers);
userRouter.put("/update", protect, uploads.single("photo"), updateUser);

// Following ....
userRouter.post("/follow", protect, follow);

module.exports = userRouter;
