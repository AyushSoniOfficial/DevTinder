const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, emailId, password } = req.body;
  if (!firstName) {
    throw new Error("First name is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email, please enter correct email format");
  } else if (!emailId) {
    throw new Error("Enter email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must include 8 letter with 1 Uppercase, 1 Lowercase, 1 Unique character and 1 Numeric value",
    );
  }
};

module.exports = {
  validateSignUpData,
};
