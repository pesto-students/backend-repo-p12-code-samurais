var express = require("express");
var router = express.Router();
const { Pitches } = require("../models/pitches");

// route to get the virtul pitch based on email
router.get("/email", async (req, res) => {
  const { company_email } = req.body;
  await Pitches.find({ company_email }).then((response) =>
    res.status(200).json({ success: true, data: response })
  );
});

// Route to post virtual pitch
router.post("/post", async (req, res) => {
  const {
    company_name,
    company_email,
    place,
    budget_min,
    budget_max,
    product_details,
  } = req.body;

  await Pitches.create({
    company_name,
    company_email,
    place,
    budget_min,
    budget_max,
    product_details,
  })
    .then((response) => {
      res.status(200).json({
        success: true,
        message: "Pitch added sucessfully",
        data: response,
      });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error: error });
    });
});

module.exports = router;
