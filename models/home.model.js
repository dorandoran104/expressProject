const db = require('./index');

exports.getEmployee = (email)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                email
                ,password
            FROM employee
            WHERE email = ?
        `;

        db.query(sql,[email],(err,data)=>{
            return resolve(data[0]);
        })
    })
}
