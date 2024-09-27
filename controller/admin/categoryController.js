exports.list = async (req,res)=>{
  res.render('admin/category/list')
}

exports.write = async (req,res)=>{
  res.render('admin/category/write');
}