const homeService = require('../service/homeService');

exports.login = async (req,res)=>{
    let result = await homeService.login(req.body);
    return res.json(result);
}