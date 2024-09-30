const goodsModel = require('../../models/goods.model');
const fileModel = require('../../models/file.model');

/**
 * 상품 리스트 출력
 * @param {*} req 
 * @returns 
 */
exports.list = async (req) => {
  const category = req.params.category;
  let resultObj = await goodsModel.getUserProductList({second_category_idx:category});
  let list = resultObj.list;

  let fileIdxArr = [];
  list.map((data)=>{
    let fileIdx = data.file_idx.toString().split('&^')[0];
    if(fileIdx != null && fileIdx != '') fileIdxArr.push(fileIdx);
  })

  let filePathObj = await fileModel.getFile({file_arr : fileIdxArr.join(',')});
  let filePathList = filePathObj.list;
  let fileObj = {};
  filePathList.map((data)=>{
    fileObj[data.idx] = data.path
  })

  list.map((data)=>{
    data.file_path = fileObj[data.file_idx.split('&^')[0]]
  })
  return list;
}

exports.detail = async (req)=>{
  let code = req.params.code
  let param = {};
  param.code = code;
  let resultObj = await goodsModel.getUserProductList(param);
  let filePathObj = await fileModel.getFile({file_arr : resultObj.list[0].file_idx.split('&^').join(',')});
  return filePathObj;
}