const {db,mybatisMapper,format} = require('./index');

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
        const sql = mybatisMapper.getStatement('goodsMapper','create',body,format);
        console.info(sql);
        db.query(sql,(err,data)=>{
            if(err) {
                console.error(err.message);
                reject({result : false})
            }
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

/**
 * 상품 출력
 * @param {*} param 
 * @returns 
 */
exports.getUserProductList = (param)=>{
    return new Promise((resolve,reject)=>{
        const sql = mybatisMapper.getStatement('goodsMapper','selectList',param,format);
        console.log(sql);
        db.query(sql,(err,data)=>{
            if(err){
                console.error(err.message);
                reject({result : false})
            }
            if(!err){
                resolve({result : true, list : data})
            }
        })
    })
}