const jwt = require('../util/jwtUtil');

const authJWT = (req,res,next)=>{
    const token = req.cookies.token;
    if(token == null || token == ''){
        console.log("")
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log('@@@@@@@@ token null @@@@@@@@@')
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log("")
        return res.render('admin/401',{httpStatus : 401});
    }
    try {
        const checkToken = jwt.checkToken(token);
        console.log("")
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log('@@@@@@@@@@@ 토큰 검증 @@@@@@@')
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log("")
        next();
    } catch (error) {
        console.log("")
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log('@@@@@@@@ 만료된 토큰 @@@@@@@@@')
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log("")
        return res.render('admin/error',{httpStatus : 403});
    }
    
}

module.exports = authJWT;