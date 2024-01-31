const userModel = require("../Models/userModel");
const bcryptjs = require("bcryptjs");
const { catchAsync, AppError } = require("../Utils/appError");
const { encodeUserToken } = require("../Utils/jwtToken");
const { cookieCofig } = require("../Utils/utils");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please Provide all parameters", 404));
  }
  const data = await userModel.findOne({ email });
  if (!data) {
    return next(new AppError("Invalide email or password", 404));
  }
  // Check password
  const check = await bcryptjs.compare(password, data.password);
  if (!check) {
    return next(new AppError("Invalide email or password", 404));
  }
  const token = encodeUserToken(data._id);
  res.cookie("jwt", token, cookieCofig);

  data.password = undefined;
  res.json({
    data,
  });
});

const register = catchAsync(async (req, res, next) => {
  const { email, password, name } = req.body;
  console.log(req.file);

  if (!email || !password || !name) {
    return next(new AppError("Provide All parameters", 404));
  }
  const saveObj = {
    email,
    password,
    name,
  };
  if (req.file) {
    saveObj.photo = req.file.filename;
  }

  const data = await userModel.create(saveObj);
  const token = await encodeUserToken(data._id);
  res.cookie("jwt", token, cookieCofig);
  data.password = undefined;
  res.json({
    status: "success",
    data,
  });
});

const logout = catchAsync(async (req, res, next) => {
  console.log(req.user);
  res.cookie("jwt", "", { maxAge: 0 });
  res.json({
    status: "success",
    message: "User log out successfully",
  });
});

module.exports = {
  login,
  register,
  logout,
};
