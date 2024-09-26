const employeeModel = require("../../models/employee.model");
const randomUtil = require("../../util/randomUtil");
const bcryptUtil = require('../../util/bcryptUtil');

const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const phone_reg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

exports.list = async (req,res)=>{
    let body = req.body;
    if(body.page == null || body.page == ''){
        body.page = 1;
    }
    let resultObj = {};
    let list = await employeeModel.list(body);
    list.forEach((data)=>{
        let status = '재직';
        if(data.end_date != null && data.end_date != ''){
            let today = new Date();
            today.setHours(0,0,0,0);

            let endDate = new Date(data.end_date);
            endDate.setHours(0,0,0,0);

            if(today >= endDate){
                status = '퇴직';
            }
        }
        data.status = status;
    })
    resultObj.list = list;
    return resultObj;
}

exports.write = async (req,res)=>{
    const body = req.body;
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
    
    let encode = bcryptUtil.createBcrypt(body.password);
    if(encode == null || encode == ''){
        resultObj.result = false;
        resultObj.errMessage = '오류가 발생했습니다.';
        return resultObj;
    }

    body.password = encode;

    let exists = false;
    while(exists == false){
        let randomCode = randomUtil.createRandomCode(13);
        if(await employeeModel.codeExists(randomCode) == 0){
            exists = true;
        }
        body.code = randomCode;
    }
    body.start_date = new Date();
    //비밀번호 암호화

    resultObj.result = await employeeModel.write(body);
    return resultObj;
}

exports.detail = async (code)=>{
    let result = await employeeModel.detail(code);
    return result;
}

exports.modify = async (req)=>{
    const code = req.params.code;
    const body = req.body;
    console.log(body);
    let resultObj = {};
    let blankFlag = false;

    Object.keys(body).forEach((data)=>{
        const value = body[data];
        if(data != 'end_date' && data != 'password'  && value == ''){
            blankFlag = true;
        }
    })

    if(blankFlag == true){
        resultObj.result = false;
        resultObj.errMessage = '빈값이 존재합니다.';
        return resultObj;
    }

    if(!date_reg.test(body.start_date) || !date_reg.test(body.birth_date)){
        resultObj.result = false;
        resultObj.errMessage = '유효하지 않은 날짜입니다.';
        return resultObj;
    }

    if(body.end_date != null && body.end_date != '' && !date_reg.test(body.end_date)){
        resultObj.result = false;
        resultObj.errMessage = '유효하지 않은 날짜입니다.';
        return resultObj;
    }

    if(!email_reg.test(body.email)){
        resultObj.result = false;
        resultObj.errMessage = '유효하지 않은 이메일입니다.';
        return resultObj;
    }

    if(!phone_reg.test(body.mobile_number)){
        resultObj.result = false;
        resultObj.errMessage = '유효하지 않은 휴대폰번호 입니다.'
        return resultObj;
    }

    if(body.password != null && body.password != ''){
        const bcryptPassword =  bcryptUtil.createBcrypt(body.password)
        console.log(bcryptPassword)
        if(bcryptPassword == null || bcryptPassword == ''){
            resultObj.result = false;
            resultObj.errMessage = '오류가 발생했습니다.';
            return resultObj;
        }
        
        body.password = bcryptPassword;
    }

    let result = await employeeModel.modify(body);
    resultObj.result = result.result; 
    if(!resultObj.result){
        resultObj.errMessage = '저장에 실패하였습니다.'
    }
    console.log(resultObj);
    return resultObj;
}