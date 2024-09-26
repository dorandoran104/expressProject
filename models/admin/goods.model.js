const db = require('../index');

exports.codeExists = (code)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                COUNT(idx) as count
            FROM goods
            WHERE code = ?
        `
        db.query(sql,code,(err,data)=>{
            if(err) reject(1)
            if(!err) resolve(data);
        })
    })
}

exports.create = (body)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            INSERT INTO goods (
                code
                ,name
                ,price
                ,tax
                ,total_price
                ,use_yn
                ,sold_out_yn
                ,revealed_yn
            )VALUES (
                ?
                ,?
                ,?
                ,?
                ,?
                ,?
                ,?
            )
        `
        db.query(sql,[body.code
            ,body.name
            ,body.price
            ,body.tax
            ,body.total_price
            ,body.use_yn
            ,body.sold_out_yn
            ,body.revealed_yn]
            ,(err,data)=>{
                if(err) reject({result : false})
                else resolve({result : true});
            })
    })
}