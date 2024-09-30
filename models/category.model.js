const db = require('./index');

// exports.detail = ()

/**
 * 카테고리 insert
 * @param {String} name 
 * @returns 
 */
exports.insertCategory = (name)=>{
  return new Promise((resolve,reject)=>{
    const sql = `
      INSERT INTO category (
        name
      )VALUES(?)
    `
    db.query(sql,name,(err,data)=>{
      if(err){
        console.error(err.message);
        reject({result : false})
      }else{
        resolve({result : true, idx : data.insertId});
      }

    })
  })
}

/**
 * 첫번째 카테고리 클로져 insert
 * @param {Number} ancestor_idx 
 * @returns 
 */
exports.insertCategoryAncestor = (ancestor_idx) => {
  return new Promise((resolve,reject)=>{
    const sql = `
      INSERT INTO category_relationship (
        ancestor_idx
        ,descendant_idx
        ,depth
      )VALUES(?,?,0);
    `
    db.query(sql,[ancestor_idx,ancestor_idx],(err,data)=>{
      if(err){
        console.error(err.message);
        reject({result : false})
      } 
      else resolve ({result : true})
    })
  })
}

/**
 * 2차부터 카테고리 클로져 테이블 insert
 * @param {Number} ancestor_idx 
 * @param {Number} descendant_idx 
 * @returns 
 */
exports.insertCategoryRelationship = (ancestor_idx,descendant_idx) =>{
  return new Promise((resolve,reject)=>{
    const sql = `
      INSERT INTO category_relationship (
        ancestor_idx
        ,descendant_idx
        ,depth
      )
      SELECT
        ancestor_idx
        ,?
        ,depth + 1
      FROM category_relationship
      WHERE descendant_idx = ?
    `
    db.query(sql,[descendant_idx,ancestor_idx],(err,data)=>{
      if(err) {
        console.error(err.message);
        reject({result : false})
      }
      else resolve({result : true})
    })
  })
}