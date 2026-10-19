const mongoose = require("mongoose");

const url =
  "mongodb+srv://soniayush876_db_user:x9oTOzurTK2weUJn@cluster0.mguvrcb.mongodb.net/devTinder";

const connectDB = async () => mongoose.connect(url);

module.exports = {
  connectDB,
};
