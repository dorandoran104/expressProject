const model = require("../models/employee.model");

exports.write = async (req,res)=>{
    const body = req.body;

    const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const phone_reg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    let resultObj = {};
    Object.keys(body).forEach((data)=>{
        if(body[data] == ''){
            resultObj.result = false;
            resultObj.errMessage = '빈값이 존재합니다.';
            return resultObj;
        }
        if(data === 'email'){
            if(!email_reg.test(body[data])){
                resultObj.result = false;
                resultObj.errMessage = "유효하지 않은 이메일 입니다.";
                return false;
            }
            let emailExists = model.emailExists(body);
        }
    })


}