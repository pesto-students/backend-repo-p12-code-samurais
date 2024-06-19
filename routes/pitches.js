var express = require("express");
var router = express.Router();
const { Pitches } = require("../models/pitches");
const { Requirements } = require("../models/requirements");

// route to get the virtul pitch based on email
router.post("/email", async (req, res) => {
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
    pitch_title,
  } = req.body;

  try {
    // Create the pitch
    const newPitch = await Pitches.create({
      company_name,
      company_email,
      place,
      budget_min,
      budget_max,
      product_details,
      requirement_id,
      pitch_title,
      isAccepted: false,
    });

    const pitchObject = newPitch.toObject();

    // Update the corresponding Requirement document
    await Requirements.findOneAndUpdate(
      { _id: requirement_id },
      {
        $push: {
          pitches: { pitch: pitchObject },
        },
      },
      { new: true }
    );

    // Respond with success message and data
    res.status(200).json({
      success: true,
      message: "Pitch added successfully",
      data: newPitch,
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({ success: false, error: error.message });
  }
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

router.get("/accept/:pitch_id", (req, res) => {
  const { pitch_id } = req.params;
  Pitches.findByIdAndUpdate(pitch_id, { isAccepted: true }, { new: true }).then(
    (response) => {
      res.json({ message: "success", pitch: response });
    }
  );
});

module.exports = router;
