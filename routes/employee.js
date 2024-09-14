const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/jwtMiddleWare');
const controller = require("../controller/employeeController");

router.get("/list",authMiddleware,(req,res)=>{
    controller.get.list(req,res);
})

router.get("/write",authMiddleware,(req,res)=>{
    controller.get.write(req,res);
})

router.post('/write',authMiddleware,(req,res)=>{
    controller.post.write(req,res);
})

router.get('/:code',authMiddleware,(req,res)=>{
    controller.get.detail(req,res);
})



module.exports = router;