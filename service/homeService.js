const homeModel = require('../models/home.model');
const bcrypt = require('../util/bcryptUtil');

exports.login = async (body)=>{
    let resultObj = {};
    const email = body.email;
    const user = await homeModel.getEmployee(email);
    if(user == null || user == ''){
        resultObj.result = false;
        resultObj.errMessage = '아이디 및 비밀번호를 확인해 주세요';
        return resultObj;
    }

    if(!await bcrypt.compareBcrypt(body.password,user.password)){
        resultObj.result = false;
        resultObj.errMessage = '아이디 및 비밀번호를 확인해 주세요';
        return resultObj;

    }

    resultObj.result = true;
    return resultObj;
}