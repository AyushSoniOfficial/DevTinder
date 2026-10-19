const express = require("express");
const app = express();
const port = 7777;
const { authMiddleware, usersMiddleware } = require("./middlewares");

app.use("/admin", authMiddleware);
app.use("/users", usersMiddleware);

//Admin
app.get("/admin", (req, res) => {
  res.send("Admin Page");
});
app.get("/admin/dashboard", (req, res) => {
  res.send("Admin Dashboard");
});

//Users
app.get("/users", (req, res) => {
  res.send("User Page");
});
app.get("/users/wishlist", (req, res) => {
  res.send("Wishlist Page");
});
app.get("/users/faq", (req, res) => {
  res.send("FAQ Page");
});
app.get("/users/settings", (req, res) => {
  res.send("Settings Page");
});

//Root
app.get("/", (req, res) => {
  res.send("Hello, World from Root of the app!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
