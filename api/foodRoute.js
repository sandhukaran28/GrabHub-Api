const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const Order = require('../models/order');



router.get('/allfoods', async (req, res) => {

    try {
        const allFoods = await Food.find({});

        res.status(200).json(allFoods);
    } catch (e) {
        res.status(404).json({
            'msg': "Cannot fetch the foods at the moment"
        });
    };

})


router.post('/placeorder', async (req, res) => {

    try {
        const {
            cart: orderedItems
        } = req.body;
        const newOrder = new Order({
            orderedItems
        });
        console.log(orderedItems);
        await newOrder.save();
        res.status(200).json({
            'msg': 'Order Placed Successfully'
        });
        console.log('Order Placed');

    } catch (e) {
        console.log(e);
        res.status(400).json({
            'msg': 'Order cannot be placed'
        });
    }

})

module.exports = router;