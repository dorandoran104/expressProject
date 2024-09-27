const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;

exports.createToken = (param,expireH)=>{
    return jwt.sign(param,secretKey,{expiresIn : expireH})
}

exports.checkToken = (token)=>{
    console.log(jwt.verify(token,secretKey))
    return jwt.verify(token,secretKey);
}

exports.decodeToken = (token)=>{
    return jwt.decode(token);
}