const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });
const DB_URL = process.env.DB_URL;

const connectDatabase = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database is connected with: ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(`Database connection error: ${error}`);
    });
};

module.exports = connectDatabase;
