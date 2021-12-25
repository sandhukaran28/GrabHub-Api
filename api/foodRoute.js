const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const Order = require('../models/order');
const auth = require('../middleware/auth');
const User = require('../models/User');
const sendEmail = require('../sendGrid');


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


router.post('/addFood', auth, async (req, res) => {
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


router.post('/placeorder', auth, async (req, res) => {

    try {

        const email = req.cookies.email;
        const {
            cart: orderedItems
        } = req.body;
        const newOrder = new Order({
            orderedItem: orderedItems
        });
        console.log(orderedItems);
        await newOrder.save();
        const cookies = req.cookies.email;
        await User.findOneAndUpdate({
            email: cookies
        }, {
            $push: {
                "orders": newOrder
            }
        })
        res.status(200).json({
            'msg': 'Order Placed Successfully'
        });
        console.log('Order Placed');
        const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
        <style>
            *{
                padding: 0;
                margin: 0;
            }
            .mainDiv{
                background: #444691;
                width: 450px;
                height: 400px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .inner{
                width: 350px;
                height: 300px; 
                background-color: white !important;
                margin:40px auto  
            }
            .header h1{
                text-align: center;
            }
            .header{
                background: #a8dadc;
                padding: 10px;
                color: white;
            }
            p{
                padding: 10px;
                font-size: 1.1rem;
            }
        </style>
    </head>
    <body>
    
            <div class="mainDiv">
                <div class="inner">
                    <div class="header">
                        <h1>ORDER PLACED</h1>
                    </div>
                    <div>
                    <p>
                        Hi ${email},<br><br>
    
                    Confirmation of order has placed. <br><br><br>
                    Thanks! <br>
                    Team Grabhub
                    </p>
                    </div>
                </div>
        </div>
        
    </body>
    </html>`;
        sendEmail(email, template, ` Hi ${email},Confirmation of your order. Thanks!  Team Grabhub`);


    } catch (e) {
        console.log(e);
        res.status(400).json({
            'msg': 'Order cannot be placed'
        });
    }

})

router.delete('/delete/:id', auth, async (req, res) => {

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

router.patch('/editFood', auth, async (req, res) => {

    try {
        const {
            id,
            name,
            desc,
            price
        } = req.body;
        await Food.findByIdAndUpdate(id, {
            name: name,
            desc: desc,
            price: price
        });
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(400);
    }
})

module.exports = router;