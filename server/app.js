const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route import
const project = require("./routes/projectRoute");
const user = require("./routes/userRoute");
const aboutMessage = require("./routes/aboutMessageRoute");
const techContent = require("./routes/technologyRoute");
const reason = require("./routes/reasonRoute");
const feature = require("./routes/featureRoute");
const skill = require("./routes/skillRoute");
const faq = require("./routes/faqRoute");
const web = require("./routes/webRoute");
const migration = require("./routes/migrationRoute");
const database = require("./routes/databaseRoute");
const banner = require("./routes/bannerRoute");
const review = require("./routes/reviewRoute");
const contact = require("./routes/contactRoute");

app.use("/api/v1", project);
app.use("/api/v1", user);
app.use("/api/v1", aboutMessage);
app.use("/api/v1", techContent);
app.use("/api/v1", reason);
app.use("/api/v1", feature);
app.use("/api/v1", skill);
app.use("/api/v1", faq);
app.use("/api/v1", web);
app.use("/api/v1", migration);
app.use("/api/v1", database);
app.use("/api/v1", banner);
app.use("/api/v1", review);
app.use("/api/v1", contact);

module.exports = app;
