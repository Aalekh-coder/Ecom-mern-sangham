const { Schema, model } = require("mongoose");
const featuresSchema = new Schema(
  {
    image: String,
  },
  { timestamps: true }
);
const Features = model("Features", featuresSchema);
module.exports = Features
