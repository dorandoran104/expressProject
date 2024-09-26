
exports.list = async (req,res)=>{
    res.render('admin/goods/list');
}

exports.write = async (req,res)=>{
    res.render('admin/goods/write');
}

exports.create = async (req,res)=>{
    
    res.json({result : true})
}