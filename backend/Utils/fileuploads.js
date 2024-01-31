const multer = require("multer");
const { AppError } = require("./appError");
const configFile = (format) => {
  const configStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `${format}-${Date.now()}.jpg`);
    },
  });
  return multer({
    storage: configStorage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image")) {
        cb(new AppError("Please Upoad Image file", 404));
      } else {
        cb(null, true);
      }
    },
  });
};

module.exports = configFile;
