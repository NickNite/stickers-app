const mongoose = require('mongoose');
const { Schema } = mongoose;

const DietData = new Schema({
    date: String,
    dish: String,
    description: String,
    contains: String,
    allergens: String,
    dietsTitle: String,
    eat: Array,
});
module.exports = mongoose.model('DietData', DietData);