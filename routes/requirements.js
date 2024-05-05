var express = require("express");
const Organisation = require("../models/organisation");
const { Requirements } = require("../models/requirements");
var router = express.Router();

// To the list of requirements
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  await Requirements.find({ email }).then((response) => res.send(response));
  //   await Organisation.findOne({ email })
  //     .then((response) => res.status(200).json({ success: true, response }))
  //     .catch((error) =>
  //       res.status(400).json({ success: false, message: "Error happened", error })
  //     );
});

router.post("/post", async (req, res) => {
  const {
    organisation_email,
    product,
    product_desc,
    budget_min,
    budget_max,
    isAccepted,
    sector,
    organisation_id,
    pitches,
  } = req.body;

  await Requirements.create({
    organisation_email,
    product,
    product_desc,
    budget_min,
    budget_max,
    isAccepted,
    sector,
    organisation_id,
    pitches,
  })
    .then((response) => {
      res.status(200).json({
        success: true,
        message: "Requirement created successfully",
        data: response,
      });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error: error });
    });
});

// router.post("/accept", async (req, res) => {});

module.exports = router;
