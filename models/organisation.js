const { Schema, model } = require("mongoose");
const { createHmac } = require("node:crypto");
const { requirementSchema } = require("./requirements");

const organisationschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/image.png",
    },
    role: {
      type: String,
      required: true,
      enum: ["Vendor", "Client"],
    },
    location: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    requirements: [requirementSchema],
  },
  { timestamps: true }
);

// Hashing the password before saving it into DB
organisationschema.pre("save", function (next) {
  const org = this;

  const hashedPassword = createHmac("sha256", "this is the salt for hashing")
    .update(org.password)
    .digest("hex");

  this.password = hashedPassword;

  next();
});

const Organisation = model("Organisation", organisationschema);

module.exports = Organisation;
