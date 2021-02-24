const mongoose = require('mongoose');
const { Schema } = mongoose;

const Diet = new Schema({
   dietTitle: String,
   dietColories: [String]
});
module.exports = mongoose.model('Diet', Diet);