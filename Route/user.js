const express = require("express");
const { signupUser , loginUser, getUsers, updateUser, deleteUser } = require("../Controller/user.js");
const route = express.Router();



route.post("/signup", signupUser);
route.post("/login", loginUser);
route.get("/", getUsers);
route.put("/:id", updateUser).delete("/:id", deleteUser);



  module.exports = route;