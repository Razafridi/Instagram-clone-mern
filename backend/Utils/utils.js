const cookieCofig = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

module.exports = {
  cookieCofig,
};
