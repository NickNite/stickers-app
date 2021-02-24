const mongoose = require('mongoose');
const { Schema } = mongoose;

const SnackBar = new Schema({
   dietTitle: String,
   dietColories: [String]
});
module.exports = mongoose.model('SnackBar', SnackBar);