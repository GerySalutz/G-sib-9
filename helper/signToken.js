const jwt = require("jsonwebtoken");

exports.signToken = (data) => {
  return jwt.sign(data, "secretKey");
};
