const { Schema, model } = require("mongoose");

const requirementSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  budget_min: {
    type: Number,
    required: true,
  },
  budget_max: {
    type: Number,
    required: true,
  },
  req_sector: {
    type: String,
    required: true,
    enum: ["IT", "Automobile"],
  },
  organisation_id: { type: Schema.Types.ObjectId, ref: "Organisation" },
  organisation_email: {
    type: String,
    required: true,
  },
  pitches: [{ type: { isPitchAccepted: Boolean } }],
});

const Requirements = model("requirement", requirementSchema);

module.exports = { Requirements, requirementSchema };
