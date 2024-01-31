const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is require"],
    minLength: [3, "Name must contains at least 3 characters"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  email: {
    type: String,
    unique: [true, "User with this email already exists"],
    require: [true, "Email is require"],
    validate: [validator.isEmail, "Provide the correct email please"],
  },
  password: {
    type: String,
    require: [true, "Password is require"],
    minLength: [6, "Password must contains at least 6 characters"],
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  posts: {
    type: Array,
    default: [],
  },
});

// Middleware

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Methods
userSchema.methods.comparePassword = async function (pass) {
  const check = await bcryptjs.compare(pass, this.password);
  if (check) {
    return true;
  }
  return false;
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
