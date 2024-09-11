const service = require('../service/employeeService');

const get = {
    list : (req,res) =>{
        res.render('employee/list');
    },
    write : (req,res)=>{
        res.render("employee/write");
    }
}

const post = {
    write : async (req,res)=>{
        let response = await service.write(req,res);
    }
}

module.exports = {
    get
    ,post
}