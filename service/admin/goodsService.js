const goodsModel = require('../../models/goods.model');
const fileModel = require('../../models/file.model');
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
        if(await goodsModel.codeExists(randomCode) == 0){
            body.code = randomCode;
            existsFlag = true;
        }
    }

    const fileArr = req.files;
    if(fileArr != null && fileArr.length > 0){
        let fileIdxArr = [];
        fileArr.forEach(async (file)=>{
            const fileIdx = await fileModel.insert(file);
            fileIdxArr.push(fileIdx); 
        })
        body.file_idx = fileIdxArr.join('&^');
    }
    let resultObj = await goodsModel.create(body);
    console.log(resultObj);
    return resultObj;
}