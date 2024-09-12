const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;

exports.createToken = (param)=>{
    return jwt.sign(param,secretKey,{expiresIn : '1h'})
}

exports.checkToken = (token)=>{
    return jwt.verify(token,secretKey);
}