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
                ,code
            FROM employee
        `
        db.query(sql,(err,data)=>{
            if(err) reject({result :false});
            if(!err) resolve(data);
        })
    })
}

exports.detail = async (code)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                name
                ,mobile_number
                ,DATE_FORMAT(start_date,'%Y-%m-%d') as start_date
                ,DATE_FORMAT(end_date,'%Y-%m-%d') as end_date
                ,email
                ,code
                ,DATE_FORMAT(birth_date,'%Y-%m-%d') as birth_date
            FROM employee
            WHERE code = ?
        `;
        db.query(sql,[code],(err,data)=>{
            resolve(data[0]);
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
            if(!err) resolve(data[0].count);
        })
    })
}

exports.codeExists = (code)=>{
    return new Promise((resolve,reject)=>{
        let sql = `
            SELECT
                COUNT(*) as count
            FROM employee
            WHERE code = ?
        `
        db.query(sql,[code],(err,data)=>{
            if(err) reject({result : false});
            if(!err) resolve(data[0].count);
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
                ,code
                ,password
            )VALUES(
                ?
                ,?
                ,?
                ,?
                ,?
                ,?
                ,?
            )
        `;
        db.query(sql,[body.email,body.name,body.birth_date,body.mobile_number,body.start_date,body.code,body.password],(err,data)=>{
            if(err) reject({result : false});
            if(!err) resolve({result : true});
        })
    })
}

exports.modify = (body)=>{
    console.log(body);
    return new Promise((resolve,reject)=>{
        const sql = `
            UPDATE employee SET
                email = ?
                ,name = ?
                ,birth_date = ?
                ,mobile_number = ?
                ,start_date = ?
                ,end_date = IF(? = '',end_date,?)
                ,password = IF(? = '' , password, ?)
            WHERE code = ?
        `
        db.query(sql,[body.email, body.name,body.birth_date,body.mobile_number,body.start_date,body.end_date,body.end_date,body.password,body.password,body.code],(err,data)=>{
            if(err) reject({result : false})
            if(!err) resolve({result: true});
        })
    })
}