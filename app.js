const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var cors = require("cors");
const { RedisUtil } = require("./utils/redis_connection");
const indexRouter = require("./routes/index");
const organisationRouter = require("./routes/organisation");
const dashbaordRouter = require("./routes/dashboard");
const requirementRouter = require("./routes/requirements");
const pitchRouter = require("./routes/pitches");
const chatRouter = require("./routes/chat");
const forgotPasswordRouter = require("./routes/forgotPassword");
const mongoose = require("mongoose");
require("dotenv").config();

// Connecting Mongodb Atlas with our application
mongoose
  .connect(process.env.MONGODB)
  .then((response) => {
    console.log("📚 Database is connected");
  })
  .catch((error) => console.log(error));

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", organisationRouter);
app.use("/dashboard", dashbaordRouter);
app.use("/requirements", requirementRouter);
app.use("/virtual_pitch", pitchRouter);
app.use("/forgotPassword", forgotPasswordRouter);
app.use("/chat", chatRouter);

// Redis Initianalised
RedisUtil();

module.exports = app;
