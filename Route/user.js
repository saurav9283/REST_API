const express = require("express");
const { signupUser , loginUser, getUsers, updateUser, deleteUser, forgotPassword } = require("../Controller/user.js");
const route = express.Router();
const {verifyToken} = require("../Utils/verifyTokan.js")

route.post("/signup", signupUser);
route.post("/login", loginUser);
route.get("/", verifyToken, getUsers);
route.put("/:id", verifyToken, updateUser).delete("/:id", verifyToken, deleteUser);
route.put("/:id/forget" , forgotPassword)


module.exports = route;