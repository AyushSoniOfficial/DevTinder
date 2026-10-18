const express = require("express");
const app = express();
const port = 7777;

app.get(
  "/users",
  (req, res, next) => {
    console.log("hello from 1");
    // res.send("Users");
    next();
  },
  (req, res, next) => {
    console.log("hello from 2");
    // res.send("2nd Users");
    next();
  },
  (req, res, next) => {
    console.log("hello from 3");
    // res.send("3 Users");
    next();
  },
  (req, res, next) => {
    console.log("hello from 4");
    res.send("4 Users");
  },
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
