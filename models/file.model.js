const db = require('./index');

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