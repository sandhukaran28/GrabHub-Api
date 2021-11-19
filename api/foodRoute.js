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


router.post('/addFood', async (req, res) => {
    try {
        console.log(req.body);
        await Food.insertMany({
            ...req.body
        });
        res.sendStatus(200);
    } catch (e) {
        res.status(404).json({
            'msg': "Cannot fetch the foods at the moment"
        });
    }
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

router.delete('/delete/:id', async (req, res) => {

    try {
        const {
            id
        } = req.params;
        console.log(id);
        await Food.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(400);
    }
})

router.patch('/editFood', async(req, res) => {

    try{
    const{id,name,desc,price} = req.body;
    await Food.findByIdAndUpdate(id,{name:name,desc:desc,price:price});
    res.sendStatus(200);
    }
    catch (e) {
        res.sendStatus(400);
    }
})

module.exports = router;