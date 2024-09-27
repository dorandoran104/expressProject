const express = require('express');
const router = express.Router();
const productController = require('../../controller/user/productController')

router.get('/:category',(req,res)=>{
  productController.list(req,res);
})

module.exports = router;