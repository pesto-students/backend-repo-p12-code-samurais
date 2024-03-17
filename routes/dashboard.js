var express = require("express");
var router = express.Router();
const { validateToken } = require("../utils/jwtUtils");

router.get(
  "/",
  (req, res, next) => {
    try {
      const jwtVerifyResponse = validateToken(
        req.headers["authorization"].split(" ")[1]
      );
      req.jwtVerifyResponse = jwtVerifyResponse;
    } catch (err) {
      res.status(400).json({ success: false, message: "Invalid JWT Token" });
    }
    next();
  },
  (req, res) => {
    res.json({ message: "In the dashbaord route" });
  }
);

module.exports = router;
