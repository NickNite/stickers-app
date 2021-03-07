const mongoose = require("mongoose");
const { Schema } = mongoose;

const DietData = new Schema(
  {
    date: String,
    dish: String,
    description: String,
    contains: String,
    allergens: String,
    dietTitle: String,
    eat: Array
  },
  { versionKey: false }
);
module.exports = mongoose.model("DietData", DietData);
