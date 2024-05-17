const { Schema, model } = require("mongoose");

const pitchesSchema = new Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    company_email: {
      type: String,
      required: true,
    },
    pitch_title: {
      type: String,
      required: true,
    },
    place: {
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
    product_details: {
      type: String,
      required: true,
    },
    requirement_id: { type: Schema.Types.ObjectId, ref: "Requirement" },
  },
  { timestamps: true }
);

const Pitches = model("pitches", pitchesSchema);

module.exports = { Pitches, pitchesSchema };
