const jwt = require('../util/jwtUtil');

const authJWT = (req,res,next)=>{
    const token = req.cookies.token;
    
    if(token == null || token == ''){
        console.log('@@@@@@@@ token null @@@@@@@@@')
        return res.render('home/error',{httpStatus : 401});
    }
    try {
        const checkToken = jwt.checkToken(token);
        console.log('@@@@@@@@@@@ 토큰 검증 @@@@@@@')
        next();
    } catch (error) {
        console.log('@@@@@@@@@@@@@ 만료된 토큰 @@@@@@@@@@@@')
        return res.render('home/error',{httpStatus : 403});
    }
    
}

module.exports = authJWT;