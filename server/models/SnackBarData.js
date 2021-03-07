const mongoose = require("mongoose");
const { Schema } = mongoose;

const SnackBarData = new Schema(
  {
    date: String,
    description: String,
    contains: String,
    composition: String,
    barTitle: String,
    nutValue: String,
    energyValue: String,
    carbohydrates: String,
    protein: String,
    fats: String
  },
  { versionKey: false }
);
module.exports = mongoose.model("SnackBarData", SnackBarData);
