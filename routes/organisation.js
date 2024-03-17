var express = require("express");
var router = express.Router();
const Organisation = require("../models/organisation");
const { response } = require("../app");

router.get("/", (req, res) => {
  res.send("Hi this is from the org routes");
});

router.post("/", async function (req, res, next) {
  Organisation.matchPassword("banyz12abyus@gmai.com").then((response) =>
    res.send(response.password)
  );
  // await Organisation.create({
  //   name: "XYZ PVT LTD",
  //   description: "Hi this is the description",
  //   email: "  sasddbanyz12abyus@gmai.com",
  //   password: "123456798",
  //   profileImageURL: "fdhbhdsfhds",
  //   role: "Vendor",
  //   location: "shdbfhsbf",
  //   contact: 1234567498,
  // })
  //   .then((response) => {
  //     res.send(response);
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //   });
});

module.exports = router;
