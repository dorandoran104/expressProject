const goodsService = require('../../service/admin/goodsService');
const fileUtil = require('../../util/fileUtil');

exports.list = async (req,res)=>{
    res.render('admin/goods/list');
}

exports.write = async (req,res)=>{
    const categoryList = await goodsService.getCategoryList(1);
    res.render('admin/goods/write',{categoryList,categoryList});
}

exports.create = async (req,res)=>{
    try {
        let resultObj = await goodsService.create(req,res);
        if(!resultObj.result){
            //저장 실패시 파일 삭제
            fileUtil.deleteFiles(req.files)
        }
        res.json(resultObj)
    } catch (error) {
        fileUtil.deleteFiles(req.files)
        res.json({result : false , errMessage : '오류가 발생하였습니다.'})
    } 
}