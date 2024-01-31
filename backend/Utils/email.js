const nodemailer = require("nodemailer");

const transformer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const setOption = (subject, text, email) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };
};

module.exports = {
  transformer,
  setOption,
};
