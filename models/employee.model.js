const db = require('./index');

exports.list = (body)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                idx
                ,name
                ,mobile_number
                ,DATE_FORMAT(start_date,'%Y-%m-%d') as start_date
                ,DATE_FORMAT(end_date,'%Y-%m-%d') as end_date
            FROM employee
        `
        db.query(sql,(err,data)=>{
            if(err) reject({result :false});
            if(!err) resolve(data);
        })
    })
}

exports.emailExists = (body)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                COUNT(*) as count
            FROM employee
            WHERE email=?`;
        db.query(sql,[body.email],(err,data)=>{
            if(err) reject({result : false});
            if(!err) resolve(data[0].count == 0);
        })
    })
}

exports.write = (body)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            INSERT INTO employee (
                email
                ,name
                ,birth_date
                ,mobile_number
                ,start_date
            )VALUES(
                ?
                ,?
                ,?
                ,?
                ,?
            )
        `;
        db.query(sql,[body.email,body.name,body.birth_date,body.mobile_number,body.start_date],(err,data)=>{
            if(err) reject({result : false});
            if(!err) resolve({result : true});
        })
    })
}