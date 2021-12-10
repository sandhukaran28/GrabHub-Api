const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
router.post('/auth/new', async (req, res) => {

    try {
        const {
            name,
            email,
            password,
            passwordVerify
        } = req.body;

        if (!name || !email || !password || !passwordVerify) {

            res.status(400).json({
                errorMessage: 'Please Enter all required fields'
            });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({
                errorMessage: 'Please Enter password of at least 6 characters'
            });
            return;
        }

        if (password != passwordVerify) {
            res.status(400).json({
                errorMessage: 'Passwords does not match'
            });
            return;
        }

        const existingUser = await User.findOne({
            email
        });
        console.log(existingUser);
        if (existingUser) {
            res.status(400).json({
                errorMessage: 'Account with email Already Exists',
            });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);


        // Saving User

        const newUser = new User({
            name,
            email,
            passwordHash
        });

        const savedUser = await newUser.save();

        // sign the token
        const token = jwt.sign({
            user: savedUser._id,
        }, process.env.JWT_SECRET_KEY);

        // sending token
        res.cookie("token", token, {
            httpOnly: true,
        });
        res.cookie("name", name);
        res.cookie("email", email);
        res.send();

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
})


router.post('/auth/login', async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {

            res.status(400).json({
                errorMessage: 'Please Enter all required fields'
            });
            return
        }
        const existingUser = await User.findOne({
            email
        });

        if (!existingUser) {
            res.status(401).json({
                errorMessage: 'Wrong Email or password'
            });
            return
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if (!passwordCorrect) {
            res.status(401).json({
                errorMessage: 'Wrong Email or password'
            });
            return;
        }

        // sign the token
        const token = jwt.sign({
            user: existingUser._id,
        }, process.env.JWT_SECRET_KEY);

        // sending token
        res.cookie("token", token, {
            httpOnly: true,
        });
        res.cookie("email", email);
        res.send();

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
})

router.get('/auth/logout', (req, res) => {

    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})

router.get('/auth/isLoggedIn', (req, res) => {

    try {

        const token = req.cookies.token;
        if (!token) {
            res.json(false);
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.json(true);


    } catch (e) {
        res.send(false);
    }
})


router.get('/user/orders', auth, async (req, res) => {

    try {
        const cookies = req.cookies.email;
        const user = await User.findOne({
            email: cookies
        }).populate("orders");
        const orders = user.orders;
        console.log(orders);
        res.status(200).json(orders);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})


module.exports = router;