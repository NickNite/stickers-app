const mongoose = require("mongoose");
const { Schema } = mongoose;

const SnackBar = new Schema({
  barTitle: String,
  barColories: [String]
});
module.exports = mongoose.model("SnackBar", SnackBar);
