const express = require('express');
//const { UserModel } = require('../Models/user.model'); // Fix the path to your UserModel
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { UserModel } = require('../Modles/user.model');
require('dotenv').config()

// Define the number of salt rounds for bcrypt
const saltRounds = 10;

userRouter.post("/register", async (req, res) => {
    try {
        const { email, pass, name, city, dist, state } = req.body;

        // Check if the user already exists
        const userRegisterOrNot = await UserModel.findOne({ email });
        if (userRegisterOrNot) {
            return res.status(400).json({ msg: "User is already registered." });
        }

        // Hash the password using bcrypt
        bcrypt.hash(pass, saltRounds, async (err, hash) => {
            if (err) {
                return res.status(400).json({ msg: err.message });
            }

            // Create a new user with the hashed password
            const newUser = new UserModel({ name, email, pass: hash, city, dist, state });

            // Save the new user to the database
            await newUser.save();

            res.status(200).json({ msg: "New user has been added." });
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(401).json({ msg: 'Invalid email or password.' });
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(pass, user.pass, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ msg: 'Invalid email or password.' });
            }

            // Create a JWT token with user data
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                city : user.city,
                state : user.state
            };

            jwt.sign(payload, process.env.JWT_SECRET_KEY , { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    return res.status(500).json({ msg: 'Error generating token.' });
                }

                // Send the token in the response
                res.status(200).json({ token });
            });
        });
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
});



module.exports = { userRouter };
