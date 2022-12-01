const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// config
dotenv.config({ path: "config/config.env" });
const PORT = process.env.PORT;

// database connection
connectDatabase();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app listen
app.listen(PORT, () => {
  console.log(`server is listing on PORT: ${PORT}`);
});
