const userModel = require("../Models/userModel");
const { catchAsync, AppError } = require("../Utils/appError");

const getUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "sucess",
    data: req.user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  // const {name, email , password } = req.body;

  const name = req.body.name || req.user.name;
  const email = req.body.email || req.user.email;
  const password = req.body.passowrd || req.user.passowrd;
  const saveObj = {
    name,
    email,
    password,
  };
  if (req.file) {
    saveObj.photo = req.file.filename;
  }
  await userModel.findByIdAndUpdate(req.user._id, saveObj);
  const data = await userModel.findById(req.user._id);
  res.json({
    status: "success",
    data,
  });
});

const follow = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Please provide the user email", 404));
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  if (!req.user.following.includes(email)) {
    req.user.following.push(user.email);
    await req.user.save();
    user.followers.push(req.user.email);
    await user.save();
  } else {
    req.user.following = req.user.following.filter(
      (item) => item !== user.email
    );
    await req.user.save();
    user.followers = user.followers.filter((item) => item !== req.user.email);
    await user.save();
  }

  res.json({ user, me: req.user });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const data = await userModel.find({});
  res.status(200).json({
    status: "success",
    data,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const data = await userModel.findById(req.params.id);
  if (!data) {
    return next(new AppError("User not found", 404));
  }

  res.json({
    status: "success",
    data,
  });
});
module.exports = {
  getUser,
  updateUser,
  follow,
  getAllUsers,
  getUserById,
};
