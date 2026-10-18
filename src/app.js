const express = require("express");
const app = express();
const port = 7777;

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

app.get("/users", (req, res) => {
  res.send(users);
});
app.post("/users", (req, res) => {
  res.send(users);
});
app.put("/users", (req, res) => {
  res.send(users);
});
app.patch("/users", (req, res) => {
  res.send(users);
});
app.delete("/users", (req, res) => {
  res.send(users[0]);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
