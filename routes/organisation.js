var express = require("express");
var router = express.Router();
const Organisation = require("../models/organisation");
const { createHmac } = require("node:crypto");

// Sign Up route for the user
router.post("/signup", async function (req, res, next) {
  const {
    name,
    description,
    email,
    password,
    profileImageURL,
    role,
    location,
    contact,
  } = req.body;
  await Organisation.create({
    name,
    description,
    email,
    password,
    profileImageURL,
    role,
    location,
    contact,
  })
    .then((response) => {
      res.status(200).json({
        message: "User created successfully",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

// Login Route for User
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  Organisation.findOne({ email }).then((user) => {
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const hashedPassword = createHmac(
        "sha256",
        "this is the salt for hashing"
      )
        .update(password)
        .digest("hex");

      hashedPassword === user.password
        ? res.status(200).json({ message: "Password Match" })
        : res.status(400).json({ message: "Password Incorrect" });
    }
  });
});

module.exports = router;
