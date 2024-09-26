const goodsService = require('../../service/admin/goodsService');
const fileUtil = require('../../util/fileUtil');

exports.list = async (req,res)=>{
    res.render('admin/goods/list');
}

exports.write = async (req,res)=>{
    res.render('admin/goods/write');
}

exports.create = async (req,res)=>{
    let resultObj = await goodsService.create(req,res);
    if(!resultObj.result){
        //저장 실패시 파일 삭제
        fileUtil.deleteFiles(req.files)
    }
    res.json(resultObj)
}