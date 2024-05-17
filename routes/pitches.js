var express = require("express");
var router = express.Router();
const { Pitches } = require("../models/pitches");
const { Requirements } = require("../models/requirements");

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
    requirement_id,
  } = req.body;

  await Pitches.create({
    company_name,
    company_email,
    place,
    budget_min,
    budget_max,
    product_details,
    requirement_id,
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

// Route to udpate and delete the virtual pitch
router.put("/edit", async (req, res) => {
  const { _id, place, budget_min, budget_max, product_details } = req.body;
  await Pitches.findByIdAndUpdate(
    _id,
    {
      place,
      budget_min,
      budget_max,
      product_details,
    },
    { new: true }
  ).then((response) => {
    res.send(response);
  });
});

// Route to get the requirement by id
// router.get("/find_req", async (req, res) => {
//   await Requirements.findById({
//     _id: "66381b3869735a98cec8cf58",
//   }).then((response) => {
//     res.send(response);
//   });
// });

module.exports = router;
