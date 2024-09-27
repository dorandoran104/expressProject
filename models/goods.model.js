const db = require('./index');

exports.codeExists = (code)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                COUNT(idx) as count
            FROM goods
            WHERE code = ?
        `
        db.query(sql,code,(err,data)=>{
            console.log(data);
            if(err) reject(1)
            if(!err) resolve(data[0].count);
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
                ,file_idx
            )VALUES (
                ?,?,?,?,?,?,?,?,?
            )
        `
        db.query(sql,[
            body.code
            ,body.name
            ,body.price.replaceAll(',','')
            ,body.tax.replaceAll(',','')
            ,body.total_price.replaceAll(',','')
            ,body.use_yn
            ,body.sold_out_yn
            ,body.revealed_yn
            ,body.file_idx != null && body.file_idx != '' ? body.file_idx : null]
            ,(err,data)=>{
                if(err) reject(err)
                else resolve({result : true});
            })
    })
}

exports.update = (body)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            UPDATE goods SET
                price = ?
                ,tax = ?
                ,
        `
    })
}

exports.getUserProductList = (category)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                code
                ,name
                ,total_price
                ,sold_out_yn
                ,f.path
            FROM goods g
            INNER JOIN (
                SELECT
                    idx
                    ,path
                FROM file
            ) f on f.idx = g.file_idx
            WHERE first_category_idx = ?
            AND use_yn = 'Y'
            AND revealed_yn = 'Y'
        `
        db.query(sql,category,(err,data)=>{
            if(err) reject(err);
            else resolve(data)
        })
    })
}