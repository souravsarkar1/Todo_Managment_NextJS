const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
require('dotenv').config();

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // Check if the token has expired
            if (decode.exp < Date.now() / 1000) {
                return res.status(401).json({ msg: "Token has expired" });
            }

            req.body.name = decode.name;
            req.body.userId = decode.id;
            next();
        } catch (error) {
            return res.status(401).json({ msg: "Not Authorized" });
        }
    } else {
        return res.status(401).json({ msg: "Please login" });
    }
}

module.exports = { auth };
