const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/auth/new', async (req, res) => {

    try {
        const {
            email,
            password,
            passwordVerify
        } = req.body;

        if (!email || !password || !passwordVerify) {

            res.status(400).json({
                errorMessage: 'Please Enter all required fields'
            });
        }

        if (password.length < 6) {
            res.status(400).json({
                errorMessage: 'Please Enter password of at least 6 characters'
            });
        }

        if (password != passwordVerify) {
            res.status(400).json({
                errorMessage: 'Passwords does not match'
            });
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
            email,
            passwordHash
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET_KEY);
        console.log(token);
        res.status(200).json({
            successMessage: 'Account Added',
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
})


module.exports = router;