const express = require("express");
const app = express();
const port = 7777;

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello!");
});
app.use("/test", (req, res) => {
  res.send("Showing Testing Page!");
});

app.use("/", (req, res) => {
  res.send("Namaste Ayush!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
