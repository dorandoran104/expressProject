const jwt = require('../util/jwtUtil');
const employeeService = require('../service/admin/employeeService')
const homeModel = require('../models/home.model');

const authJWT = async (req,res,next)=>{
    const token = req.cookies.token;
    const refresh_token = req.cookies.refresh_token;

    const decodeToken = jwt.decodeToken(token);
    const employeeCode = decodeToken.code;
    
    const employeeInfo = await employeeService.detail(employeeCode);
    // employeeInfo
    if(employeeInfo.access_token != token || employeeInfo.refresh_token != refresh_token){
        console.error("")
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@')
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error("")
        return res.render('admin/401',{httpStatus : 401})
    }

    if(token == null || token == ''){
        console.error("")
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error('@@@@@@@@ 토큰 존재하지 않음 @@@@@@@@@')
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error("")
        return res.render('admin/401',{httpStatus : 401});
    }

    try {
        jwt.checkToken(token);
        // console.error(checkToken)
        console.error("")
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error('@@@@@@@@@@@ 토큰 검증 @@@@@@@')
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error("")
        next();
    } catch (error) {
        console.error("")
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@')
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error("")
        try {
            /**
             * 일반 토큰은 만료되었지만 리프레쉬 토큰은 살아있는경우
             * 유효한 입장으로 판단한 뒤
             * 새로운 토큰 발행 후 저장 해주기
             */
            jwt.checkToken(refresh_token);

            const newToken = jwt.createToken({
                email : employeeInfo.email
                ,code : employeeInfo.code
            },'1h')
            res.cookie('token',newToken);
            await homeModel.updateToken(employeeInfo.email,newToken,refresh_token);
            console.error("")
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            console.error('@@@@@@@@ 새로운 토큰 발행 @@@@@@@@@')
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            console.error("")
            next();
        } catch (error) {
            console.error(error);
            console.error("")
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@')
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            console.error("")
            return res.render('admin/error',{httpStatus : 403});
        }
    }
    
}

module.exports = authJWT;