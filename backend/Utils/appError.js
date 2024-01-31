class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "error" : "fail";
  }
}

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  AppError,
  catchAsync,
};
