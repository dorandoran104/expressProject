// const db = require('./index');

const {db,myBatisMapper,format, mybatisMapper} = require('./index');

/**
 * 카테고리 리스트
 * @param {Object} param 
 * @returns 
 */
exports.list = (param) => {
  console.error(param)
  return new Promise((resolve,reject)=>{
    const sql = mybatisMapper.getStatement('categoryMapper','select',param,format)
    console.info(sql);
    db.query(sql,(err,data)=>{
      if(err){
        console.error(err.message);
        reject({result : false})
      }
      if(!err){
        console.log(data);
        resolve(data);
      }
    })
  })
}

/**
 * 카테고리 insert
 * @param {String} name 
 * @returns 
 */
exports.insertCategory = (name,depth)=>{
  return new Promise((resolve,reject)=>{
    const sql = `
      INSERT INTO category (
        name
        ,depth
      )VALUES(?,?)
    `
    db.query(sql,[name,depth],(err,data)=>{
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
      )VALUES(?,?);
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
      )
      SELECT
        ancestor_idx
        ,?
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