// const db = require('./index');
const db = require('./index');
const mapper = require('mybatis-mapper');
mapper.createMapper(["../"])

exports.emailExists = (body)=>{
    return new Promise((resolve,reject)=>{
        let sql = "SELECT COUNT(*) FROM emplooyee WHERE email=?";
        db.query(sql,[body.email],(err,data)=>{
            console.log(data);
        })
    })
}