const mongoose = require('mongoose');
const { Schema } = mongoose;

const SnackBarData = new Schema({
    date: String,
    description: String,
    contains: String,
    allergens: String,
    dietsTitle: String,
    eat: Array,
});
module.exports = mongoose.model('SnackBarData', SnackBarData);