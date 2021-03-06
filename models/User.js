    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        orders: [{
            _id: false,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }]
    });

    const User = mongoose.model('user', userSchema);

    module.exports = User;