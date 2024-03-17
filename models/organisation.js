const { Schema, model } = require("mongoose");
const { createHmac } = require("node:crypto");

const organisationschema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
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

// Hashing the password before saving it into DB
organisationschema.pre("save", function (next) {
  const org = this;

  const hashedPassword = createHmac("sha256", "this is the salt for hashing")
    .update(org.password)
    .digest("hex");

  this.password = hashedPassword;

  next();
});

const Organisation = model("organisation", organisationschema);

module.exports = Organisation;
