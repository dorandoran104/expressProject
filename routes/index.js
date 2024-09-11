var express = require('express');
var router = express.Router();
const homeController = require('../controller/homeController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index', { title: 'Express' });
});

router.get('/login',(req,res)=>{
  res.render('home/login')
})

router.post('/login',(req,res)=>{
  homeController.login(req,res);
})

module.exports = router;
