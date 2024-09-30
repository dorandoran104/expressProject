const categoryService = require('../../service/admin/categoryService')

/**
 * 상품 카테고리 리스트
 * @param {Object} req 
 * @param {Object} res 
 */
exports.list = async (req,res)=>{
  res.render('admin/category/list')
}

/**
 * 카테고리 등록 페이지
 * @param {Object} req 
 * @param {Object} res 
 */
exports.write = async (req,res)=>{
  res.render('admin/category/write');
}

exports.create = async (req,res)=>{
  const body = req.body;
  try {
    let resultObj = await categoryService.create(body);
    res.json(resultObj);  
  } catch (error) {
     res.json({
      result : false
      ,errMessage : '오류가 발생하였습니다.'
     })
  }
}