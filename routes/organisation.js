var express = require("express");
var router = express.Router();
const Organisation = require("../models/organisation");
const { createHmac } = require("node:crypto");
const { createTokenForUser } = require("../utils/jwtUtils");

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
      res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    })
    .catch((error) => {
      res.status(400).json(error);
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

      if (hashedPassword === user.password) {
        const jwtToken = createTokenForUser(user);
        res.status(200).json({
          success: true,
          message: "Password Match",
          token: jwtToken,
          user: {
            name: user.name,
            description: user.description,
            email: user.email,
            profileImageURL: user.profileImageURL,
            role: user.role,
            location: user.location,
            contact: user.contact,
          },
        });
      } else {
        res.status(400).json({ success: false, message: "Password Incorrect" });
      }

      // hashedPassword === user.password
      //   ?
      //   : res.status(400).json({ message: "Password Incorrect" });
    }
  });
});

module.exports = router;
