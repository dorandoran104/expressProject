const homeModel = require('../models/home.model');
const bcrypt = require('../util/bcryptUtil');
const jwt = require('../util/jwtUtil');

exports.login = async (body)=>{
    let resultObj = {};
    const email = body.email;
    const {password,code} = await homeModel.getEmployee(email);
    if(password == null || password == ''){
        resultObj.result = false;
        resultObj.errMessage = '아이디 및 비밀번호를 확인해 주세요';
        return resultObj;
    }

    if(!await bcrypt.compareBcrypt(body.password,password)){
        resultObj.result = false;
        resultObj.errMessage = '아이디 및 비밀번호를 확인해 주세요';
        return resultObj;

    }

    const token = jwt.createToken({
        email : email,
        code : code
    });

    resultObj.result = await homeModel.updateToken(email,token);
    return resultObj;
}