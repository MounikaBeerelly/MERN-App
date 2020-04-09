var express = require('express');
var router = express.Router();
var pu = require('./userPersist.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/insertUsers', function(req, res, next) {
  var user = {"username":req.query.username, "password":req.query.password, "valid":req.query.valid}
  pu.persistUser(user);
  res.send('User Inserted');
});

router.get('/updateUsers', function(req, res, next) {
  var user = {"username":req.query.username, "password":req.query.password, "valid":req.query.valid}
  pu.updateUser(user);
  res.send('User Updated');
});

router.get('/deleteUsers', function(req, res, next) {
  var user = {"username":req.query.username}
  pu.deleteUser(user);
  res.send('User Deleted');
});

function callback(array,res){
  console.log('array here' + array)
  res.header('Access-Control-Allow-Origin','*');
  res.send(JSON.stringify(array));
}
router.get('/findUser', function(req, res, next) {
  var user = {"username":req.query.username};
  pu.findUser(user,callback,res);
});

router.get('/findAllUsers', function(req, res, next) {
  pu.findAllUser(callback,res);
});
module.exports = router;
