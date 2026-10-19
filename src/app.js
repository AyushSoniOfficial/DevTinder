const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 7777;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("Data added sucessfully!");
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong while creating user" + err.message);
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
