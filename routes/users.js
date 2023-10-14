const express = require("express");
const { register, login, getUsers } = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/registration", register);
userRouter.post("/login", login);
userRouter.get("/users", getUsers, authMiddleware);

module.exports = userRouter;
