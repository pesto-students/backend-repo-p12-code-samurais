const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const { error } = require("console");

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
app.use("/users", usersRouter);

module.exports = app;
