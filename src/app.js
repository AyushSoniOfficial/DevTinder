const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const { validateSignUpData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");
const app = express();
const port = 7777;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash", passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("Data added sucessfully!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "$Dev@Tinder12", {
        expiresIn: "0d",
      });

      res.cookie("token", token);
      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("LOGIN_ISSUE: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
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

app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;

  try {
    // 1.
    // if (data.emailId) {
    //   delete data.emailId;
    // }

    // 2.
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "skills",
      "about",
      "age",
      "imageUrl",
      "password",
      "gender",
    ];

    const updatesToApply = {};

    for (let key of ALLOWED_UPDATES) {
      if (data[key] !== undefined) {
        updatesToApply[key] = data[key];
      }
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, updatesToApply, {
      returnDocument: "after",
      runValidators: true,
    });

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
