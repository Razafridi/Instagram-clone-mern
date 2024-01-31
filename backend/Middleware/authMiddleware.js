const userModel = require("../Models/userModel");
const { catchAsync, AppError } = require("../Utils/appError");
const jwt = require("jsonwebtoken");
const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AppError("Unauthorized , no token", 401));
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    const { id } = decode;
    req.user = await userModel.findById(id).select("-password");
    next();
  } catch (error) {
    next(new AppError("Invalide Token", 401));
  }
});

module.exports = protect;
