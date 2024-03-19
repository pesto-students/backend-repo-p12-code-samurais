const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var cors = require("cors");

const indexRouter = require("./routes/index");
const organisationRouter = require("./routes/organisation");
const dashbaordRouter = require("./routes/dashboard");
// const chatRouter = require("./routes/chat");
const chatRouter = require('./routes/chat')
const mongoose = require("mongoose");
require("dotenv").config();

// Connecting Mongodb Atlas with our application
mongoose
  .connect(process.env.MONGODB)
  .then((response) => {
    console.log("Database is connected");
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
app.use("/authenticate", chatRouter);

module.exports = app;
