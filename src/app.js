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

app.get("/user", async (req, res) => {
  const fName = req.body.firstName;
  try {
    const user = await User.findOne({ firstName: fName });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted sucessfully!");
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong while creating user" + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
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
