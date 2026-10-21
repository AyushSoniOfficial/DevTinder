const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found!");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Incoming Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send("Updated successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).send("Please enter current and new password");
    }

    if (
      typeof newPassword !== "string" ||
      newPassword.length < 8 ||
      !validator.isStrongPassword(newPassword)
    ) {
      return res.status(400).send("Password must be atleast 8 characters long");
    }

    const user = req.user;

    const isPasswordValid = await user.validatePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).send("Current password is not valid");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;
    await user.save();

    res.send("Password changed successfully");
  } catch (err) {
    res.status(400).send("Error updating password: " + err);
  }
});

profileRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = profileRouter;
