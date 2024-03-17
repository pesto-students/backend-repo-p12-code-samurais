var express = require("express");
var router = express.Router();
const Organisation = require("../models/organisation");

router.get("/", (req, res) => {
  res.send("Hi this is from the user routes");
});

router.post("/", async function (req, res, next) {
  await Organisation.create({
    name: "XYZ PVT LTD",
    description: "Hi this is the description",
    email: "xyz@gmail.com",
    password: "123456798",
    profileImageURL: "fdhbhdsfhds",
    role: "Vendor",
    location: "shdbfhsbf",
    contact: 1234567498,
  })
    .then((response) => {
      res.send("You have created the user");
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
