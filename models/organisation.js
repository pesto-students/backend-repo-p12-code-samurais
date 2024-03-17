const { Schema, model } = require("mongoose");

const organisationschema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      reuire: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/image.png",
    },
    role: {
      type: String,
      require: true,
      enum: ["Vendor", "Client"],
    },
    location: {
      type: String,
      require: true,
    },
    contact: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Organisation = model("organisation", organisationschema);

module.exports = Organisation;
