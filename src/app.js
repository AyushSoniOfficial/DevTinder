const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 7777;

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ayush",
    lastName: "Soni",
    emailId: "soni@gmail.com",
    password: "soni@123",
  });

  try {
    await user.save();
    res.send("Data added sucessfully!");
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong while creating user" + err.message);
    console.log("err_signup", err.message);
  }
});

//Root
app.get("/", (req, res) => {
  res.send("Hello, World from Root of the app!");
});

connectDB()
  .then(() => {
    console.log("DB connected sucessfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to db", err.message);
  });
