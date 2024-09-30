const {db,mybatisMapper,format} = require('./index');

exports.insert = (file) => {
    return new Promise((resolve,reject)=>{
        const sql = `
            INSERT INTO file (
                path
                ,save_name
                ,real_name
                ,size
            ) VALUES(?,?,?,?)
        `
        db.query(sql,[file.path, file.filename, file.originalname, file.size],(err,data)=>{
            if(err) {
                reject(err)
            }
            
            else resolve(data.insertId);
        })
    })
}

/**
 * 파일 조회
 * @param {Object} param 
 */
exports.getFile = (param) => {
    return new Promise((resolve,reject)=>{
        const sql = mybatisMapper.getStatement('fileMapper','getFile',param,format);
        console.info(sql);
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