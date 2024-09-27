const express = require('express');
const router = express.Router();
const categoryController = require('../../controller/admin/categoryController');

router.get('/list',(req,res)=>{
  categoryController.list(req,res);
})

router.get('/write',(req,res)=>{
  categoryController.write(req,res);
})

module.exports = router;