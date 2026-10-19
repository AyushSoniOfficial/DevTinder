const mongoose = require("mongoose");
const { DB_URL } = require("./key");
const url = `mongodb+srv://soniayush876_db_user:${DB_URL}@cluster0.mguvrcb.mongodb.net/devTinder`;

const connectDB = async () => mongoose.connect(url);

module.exports = {
  connectDB,
};
