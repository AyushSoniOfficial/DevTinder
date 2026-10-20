const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Unauthorized Token!!");
    }

    const decodedMessage = await jwt.verify(token, "$Dev@Tinder12");
    const { _id } = decodedMessage;
    const user = await User.findById({ _id });

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Unable to fetch token: " + err.message);
  }
};

module.exports = {
  userAuth,
};
