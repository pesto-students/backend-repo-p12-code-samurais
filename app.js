const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const organisationRouter = require("./routes/organisation");
const mongoose = require("mongoose");

// Connecting Mongodb Atlas with our application
mongoose
  .connect("mongodb+srv://ayush:P0EsdU3VmtTfNXYl@cluster0.fdlvbka.mongodb.net/")
  .then((response) => {
    console.log("Database is connected");
  })
  .catch((error) => console.log(error));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", organisationRouter);

module.exports = app;
