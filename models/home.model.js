const db = require('./index');

exports.getEmployee = (email)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                email
                ,password
                ,code
            FROM employee
            WHERE email = ?
        `;

        db.query(sql,[email],(err,data)=>{
            return resolve(data[0]);
        })
    })
}

exports.updateToken = (email,token)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            UPDATE employee SET
                token = ?
            WHERE email = ?
        `
        db.query(sql,[token,email],(err,data)=>{
            if(!err) resolve({result : true});
        })
    })
}
