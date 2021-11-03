const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderedItem: [{
        _id: {
            id: false
        },
        name: String,
        desc: String,
        price: Number,
        qty: Number
    }]
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;