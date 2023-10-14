const { verifyToken } = require("../utils/auth.js");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader.split(" ")[1];
  const data = verifyToken(token);

  if (data.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  authMiddleware,
};
