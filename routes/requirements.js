var express = require("express");
const Organisation = require("../models/organisation");
var router = express.Router();

// To the list of requirements
router.get("/", async (req, res) => {
  const { email } = req.body;
  await Organisation.findOne({ email })
    .then((response) => res.status(200).json({ success: true, data: response }))
    .catch((error) =>
      res.status(400).json({ success: false, message: "Error happened", error })
    );
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
