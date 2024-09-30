const productService = require('../../service/user/productService');

/**
 * 상품 리스트(카테고리별 출력) 
 * @param {*} req 
 * @param {*} res 
 */
exports.list = async (req,res)=>{
  const list = await productService.list(req);
  res.render('user/product/list',{result : list})
}

exports.detail = async (req,res)=>{
  const detail = await productService.detail(req);
  res.render('user/product/detail')
}