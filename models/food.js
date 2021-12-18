const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    desc: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    }
});

const Food = mongoose.model('food', foodSchema);

module.exports = Food;