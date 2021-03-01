const mongoose = require("mongoose");
const { Schema } = mongoose;

const SnackBarData = new Schema({
  date: String,
  description: String,
  contains: String,
  composition: String,
  dietTitle: String,
  nutValue: Number,
  energyValue: Number,
  carbohydrates: Number,
  protein: Number,
  fats: Number
});
module.exports = mongoose.model("SnackBarData", SnackBarData);
