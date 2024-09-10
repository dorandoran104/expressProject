const express = require("express");
const router = express.Router();
const controller = require("../controller/employeeController");

router.get("/list",(req,res)=>{
    controller.get.list(req,res);
})

router.get("/write",(req,res)=>{
    controller.get.write(req,res);
})

router.post('/write',(req,res)=>{
    controller.post.write(req,res);
})

module.exports = router;