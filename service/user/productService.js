const goodsRouter = require('../../models/goods.model');

exports.list = async (req) => {
  const category = req.params.category;
  const list = await goodsRouter.getUserProductList(category);
  
  list.map((data)=>{
    // console.log(data);
  })
  return list;
}