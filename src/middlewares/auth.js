const authMiddleware = (req, res, next) => {
  console.log("First checking token for admin");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized admin request");
  }
};

const usersMiddleware = (req, res, next) => {
  console.log("First checking token for users");
  const token = "xyxz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized request for users");
  }
};

module.exports = {
  authMiddleware,
  usersMiddleware,
};
