var express = require("express");
const Organisation = require("../models/organisation");
const { Requirements } = require("../models/requirements");
var router = express.Router();

// To get the list of requirements based on email
router.get("/email", async (req, res) => {
  const { email } = req.body;
  await Requirements.find({ organisation_email: email }).then((response) =>
    res.status(200).json({ success: true, data: response })
  );
});

router.get("/sector", async (req, res) => {
  const { req_sector } = req.body;
  await Requirements.find({ req_sector }).then((response) => {
    res.status(200).json({ success: true, data: response });
  });
});

router.post("/post", async (req, res) => {
  const {
    organisation_email,
    product,
    product_desc,
    budget_min,
    budget_max,
    isAccepted,
    req_sector,
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
    req_sector,
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
