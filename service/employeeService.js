const employeeModel = require("../models/employee.model");

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
    Object.keys(body).forEach(async (data)=>{
        if(body[data] == ''){
            resultObj.result = false;
            resultObj.errMessage = '빈값이 존재합니다.';
            return resultObj;
        }
        if(data === 'email'){
            if(!email_reg.test(body[data])){
                resultObj.result = false;
                resultObj.errMessage = "유효하지 않은 이메일 입니다.";
                return resultObj;
            }
            if(!employeeModel.emailExists(body)){
                resultObj.result = false;
                resultObj.errMessage = "이미 사용중인 이메일 입니다.";
                return resultObj;
            }
        }
        if(data == 'mobile_number' && !phone_reg.test(body[data])){
            resultObj.result = false;
            resultObj.errMessage = "유효하지 않은 핸드폰번호 입니다.";
            return resultObj;
        }
        if(data == 'birth_date' && !date_reg.test(body[data])){
            resultObj.result = false;
            resultObj.errMessage = "유효하지 않은 날짜입니다.";
            return resultObj;
        }
    })

    body.start_date = new Date();
    resultObj.result = employeeModel.write(body);
    return resultObj;
}