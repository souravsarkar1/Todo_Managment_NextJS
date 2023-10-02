const mongoose = require('mongoose');
const UserModel = require('./userModel'); // Assuming your UserModel is exported correctly

const checkUser = async (req, res, next) => {
    const { email, pass, name,  } = req.body;

    // Check if any required field is missing
    if (!email || !pass || !name) {
        return res.status(400).json({ msg: "Please fill all the required fields." });
    }

    // Check if the password length is at least 8 characters
    if (pass.length < 8) {
        return res.status(400).json({ msg: "Password should be a minimum of 8 characters." });
    }


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/;

    if (!passwordRegex.test(pass)) {
        return res.status(400).json({
            msg: "Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character."
        });
    }
    next();
};

module.exports = checkUser;
