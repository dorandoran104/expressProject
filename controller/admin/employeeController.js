const service = require('../../service/admin/employeeService');

const get = {
    list : async (req,res) =>{
        let result = await service.list(req,res);
        res.render('admin/employee/list',{result : result});
    },
    write : (req,res)=>{
        res.render("admin/employee/write");
    },

    detail : async (req,res)=>{
        let result = await service.detail(req.params.code);
        res.render('admin/employee/detail',{result : result});
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
    ,modify : async (req,res)=>{
        try{
            let response = await service.modify(req);
            
            res.json(response);
        }catch(error){
            console.log(error);
            res.json({result : false, errMessage : '오류가 발생되었습니다.'})
        }
    }
}

module.exports = {
    get
    ,post
}