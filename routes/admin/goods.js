var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middleware/jwtMiddleWare');
const fileMiddleWare = require('../../middleware/fileMiddleWare');
const goodsController = require('../../controller/admin/goodsController');

router.get('/list',authMiddleware,(req,res)=>{
    goodsController.list(req,res);
})

router.get('/write',authMiddleware,(req,res)=>{
    goodsController.write(req,res);
})

router.post('/write',[authMiddleware,fileMiddleWare.array('files')],(req,res)=>{
    goodsController.create(req,res);
})

module.exports = router;