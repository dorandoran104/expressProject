const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

exports.createToken = (param)=>{
    const token = jwt.sign(param,secretKey,{expiresIn : '2h'})
    return token;
}