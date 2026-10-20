const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/connectionRequest", userAuth, (req, res) => {
  const user = req.user;

  res.send("Connection request sent to " + user.firstName);
});

module.exports = requestRouter;
