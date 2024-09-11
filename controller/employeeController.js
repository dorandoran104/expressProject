const service = require('../service/employeeService');

const get = {
    list : async (req,res) =>{
        let result = await service.list(req,res);
        res.render('employee/list',{result : result});
    },
    write : (req,res)=>{
        res.render("employee/write");
    }
}

const post = {
    write : async (req,res)=>{
        try {
            let response = await service.write(req,res);
            res.json(response);
        } catch (error) {
            res.json({
                result : false
                ,errMessage : '오류가 발생되었습니다.'
            })
        }
    }
}

module.exports = {
    get
    ,post
}