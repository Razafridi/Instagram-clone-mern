const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { AppError } = require("./Utils/appError");
const userRouter = require("./Routes/userRoute");
const postRouter = require("./Routes/postRoute");

const app = express();
// Moddlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then((conn) => {
  console.log("Established Connection to DB");
});

app.use(express.static("public"));

// Routes

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/posts/", postRouter);

// Page not found route

app.use("*", (req, res, next) => {
  next(new AppError(`The Route ${req.route} is not define!`, 404));
});

app.use((error, req, res, next) => {
  const status = error.status || "fail";
  const code = error.statusCode || 500;
  let message = error.message;

  // console.log(error)

  // if (error.MongoServerError){
  //     status = "fail"
  //     statusCode = 400
  // }

  if (error.code) {
    if (error.code === 11000) {
      message = "User with this email already exists";
    }
  }

  if (process.env.NODE_ENV === "development") {
    res.status(code).json({
      status,
      message,
      error,
    });
  } else {
    res.status(code).json({
      status,
      message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening at port ${PORT}`));
