const userModel = require("../Modol/User.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await userModel.findOne({ username });
    if (usernameCheck) {
      return res.status(203).json("User already exist");
    }
    if (username && email && password) {
      const newUser = new userModel({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: "Data saved successfully" });
    } else {
      res.status(400).json({ message: "Invalid data" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(201).json({ message: "User not Found" });
      }
      if (user.password === password) {
        const token = jwt.sign({ id: user._id }, "saurav");
        // console.log(token)
         return res.cookie("access_token", token, { httpOnly: true }).status(200).json({
          message: "Login in",
          token,
        });
      }

      return res.status(202).json({ message: "Password incurrect" });
    } else {
      return res.status(400).json({ message: "Invalid data" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    return res.status(200).json(users);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Delete Sucessfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const resetToken = crypto.randomBytes(32).toString("hex");
    //   console.log(resetToken)
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();
    
      return res.status(200).json({ message: "Reset token generated and sent" , resetToken });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  