const employeeModel = require("../models/employee.model");
const randomUtil = require("../util/randomUtil");

exports.list = async (req,res)=>{
    let body = req.body;
    if(body.page == null || body.page == ''){
        body.page = 1;
    }
    let resultObj = {};
    resultObj.list = await employeeModel.list(body);
    return resultObj;
}

exports.write = async (req,res)=>{
    const body = req.body;

    const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const phone_reg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    let resultObj = {};
    let result = true;
    let message = '';
    Object.keys(body).forEach((data)=>{
        if(body[data] == ''){
            result = false;
            message = '빈값이 존재합니다.';
        }
    })
    if(result == false){
        resultObj.result = result;
        resultObj.errMessage = message;
        return resultObj;
    }

    if(!email_reg.test(body.email)){
        resultObj.result = false;
        resultObj.errMessage = "유효하지 않은 이메일 입니다.";
        return resultObj;
    }
    const emailExists = await employeeModel.emailExists(body);
    if(emailExists > 0){
        resultObj.result = false;
        resultObj.errMessage = "이미 사용중인 이메일 입니다.";
        return resultObj;
    }
    if(!phone_reg.test(body.mobile_number)){
        resultObj.result = false;
        resultObj.errMessage = "유효하지 않은 핸드폰번호 입니다.";
        return resultObj;
    }
    if(!date_reg.test(body.birth_date)){
        resultObj.result = false;
        resultObj.errMessage = "유효하지 않은 날짜입니다.";
        return resultObj;
    }

    let exists = false;
    while(exists == false){
        let randomCode = randomUtil.createRandomCode(13);
        if(await employeeModel.codeExists(randomCode) == 0){
            exists = true;
        }
        body.code = randomCode;
    }
    body.start_date = new Date();
    resultObj.result = await employeeModel.write(body);
    return resultObj;
}