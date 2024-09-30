const categoryModel = require('../../models/category.model');

/**
 * 카테고리 저장
 * @param {Object} body 
 * @returns 
 */
exports.create = async (body)=>{
  try {
    const {first_category, first_category_input, second_category, second_category_input} = body;
    let resultObj = {};
    let param = {};
    let ancestor_idx = first_category;
    let descendant_idx = '';
    if(first_category === 'a'){
      // resultObj = await categoryModel.insertAncestor(first_category_input);
      resultObj = await categoryModel.insertCategory(first_category_input,1);
      if(!resultObj.result){
        return resultObj;
      }
      ancestor_idx = resultObj.idx; 
      resultObj = await categoryModel.insertCategoryAncestor(ancestor_idx);
      
    }

    resultObj = await categoryModel.insertCategory(second_category_input,2);
    descendant_idx = resultObj.idx;
    
    await categoryModel.insertCategoryAncestor(descendant_idx);

    resultObj = await categoryModel.insertCategoryRelationship(ancestor_idx,descendant_idx);
    if(!resultObj.result){
      resultObj.errMessage = '저장에 실패하였습니다.'
    }
    return resultObj;
  } catch (error) {
    console.error(error);
    return {result : false , errMessage : '오류가 발생하였습니다.'}
  }
}

/**
 * 자손 카테고리 가져오기
 * @param {*} req 
 * @param {*} res 
 */
exports.getDescendantList = async (req,res)=>{
  const body = req.body;
  const resultObj = await categoryModel.getDescendantList(body)
  return resultObj;
}