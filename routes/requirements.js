var express = require("express");
const Organisation = require("../models/organisation");
var router = express.Router();

// To the list of requirements
router.get("/", (req, res) => {
  res.send("We are in the requirement route");
});

router.post("/post", async (req, res) => {
  const { email, product, product_desc, budget_min, budget_max } = req.body;

  let requirement = await Organisation.findOneAndUpdate(
    { email },
    {
      $push: {
        requirements: {
          product,
          product_desc,
          budget_min,
          budget_max,
        },
      },
    },
    { new: true }
  );
  res.send(requirement);
});

module.exports = router;
