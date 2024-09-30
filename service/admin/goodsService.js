const goodsModel = require('../../models/goods.model');
const categoryModel = require('../../models/category.model');
const fileModel = require('../../models/file.model');
const randomUtil = require('../../util/randomUtil');

/**
 * 카테고리 리스트 가져오기
 * @param {Number} depth 
 * @returns 
 */
exports.getCategoryList = async (depth)=>{
    let param = {};
    param.depth = depth;
    const categoryArr = await categoryModel.list(param);
    return categoryArr;
}

/**
 * 상품 INSERT
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req,res)=>{
    let body = req.body;
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
        for(file of fileArr){
            const fileIdx = await fileModel.insert(file);
            fileIdxArr.push(fileIdx);
        }
        // fileArr.forEach(async (file)=>{
        //     const fileIdx = await fileModel.insert(file);
        //     console.log(fileIdx);
        //     fileIdxArr.push(fileIdx); 
        // })
        console.log(fileIdxArr)
        body.file_idx = fileIdxArr.join('&^');
    }
    let resultObj = await goodsModel.create(body);
    console.log(resultObj);
    return resultObj;
}