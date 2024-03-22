const { Schema, model } = require("mongoose");

const requirementSchema = new Schema({
  product: {
    type: String,
    require: true,
  },
  product_desc: {
    type: String,
    require: true,
  },
  budget_min: {
    type: Number,
    require: true,
  },
  budget_max: {
    type: Number,
    require: true,
  },
  isAccepted: {
    type: Boolean,
    require: true,
  },
});

const Requirements = model("requirement", requirementSchema);

module.exports = { Requirements, requirementSchema };
