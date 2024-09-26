const goodsModel = require('../../models/admin/goods.model');
const randomUtil = require('../../util/randomUtil');

exports.create = async (req,res)=>{
    let body = req.body;
    console.log(body);
    console.log(req.files)
    let blankFlag = false;
    Object.keys(body).forEach((data)=>{
        if(body[data] == '') blankFlag = true;
    })

    if(blankFlag){
        return {
            result : false
            ,errMessage : '빈값이 존재합니다.'
        }
    }

    let existsFlag = false;
    while(existsFlag == false){
        const randomCode = randomUtil.createRandomCode(13);
        if(goodsModel.codeExists(randomCode) == 0){
            body.code = randomCode;
            existsFlag = true;
        }
    }
    


    return {
        result : false,
        errMessage : '저장에 실패하였습니다.'
    }
}