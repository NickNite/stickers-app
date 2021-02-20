const mongoose = require('mongoose');
const { Schema } = mongoose;

const Record = new Schema({
    date: String,
    dish: String,
    description: String,
    contains: String,
    allergens: String,
    dietsTitle: Array,
    eat: Array,
});
module.exports = mongoose.model('Record', Record);