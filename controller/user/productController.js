const productService = require('../../service/user/productService');

exports.list = async (req,res)=>{
  const list = await productService.list(req);
  res.render('user/product/list',{result : list})
}