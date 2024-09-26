const homeService = require('../../service/admin/homeService');

exports.home = (req,res)=>{
    return res.render('admin/home/index', { title: 'Express' });
}

exports.login = async (req,res)=>{
    let result = await homeService.login(req,res);
    return res.json(result);
}