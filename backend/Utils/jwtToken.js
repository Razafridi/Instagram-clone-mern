const jwt = require("jsonwebtoken");

const encodeUserToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_KEY_EXPIRE_IN,
  });
};

module.exports = {
  encodeUserToken,
};
