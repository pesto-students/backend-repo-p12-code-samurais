const { Schema, model } = require("mongoose");

const requirementSchema = new Schema([
  {
    email: {
      type: String,
      require: true,
    },
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
    sector: {
      type: String,
      require: true,
    },
  },
]);

const Requirements = model("requirement", requirementSchema);

module.exports = { Requirements, requirementSchema };
