var express = require('express');
var router = express.Router();
const {addUser,loginUser} = require('../services/usersMongo');

// /users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /users/login
router.get('/login', function(req, res, next) {
  res.send('login');
});

 // /users/login
// router.post('/login', function(req, res, next) {
//   console.log('req.body.username::'+req.body.username);
//   console.log('req.body.password::'+req.body.password);
//   if(req.body.username == req.body.password && 
//     typeof (req.body.username) == 'string'){
//     req.session.user = req.body.username;
//     res.send({result:'ok',msg:'login success'});
//   }else{
//     res.send({result:'fail',msg:'login fail'});
//   }

// });

// user signup
router.post('/login', async function (req, res) {
  let result = await loginUser('email',req.body.email,req.body.password);
  console.log('++++++result ',result);
  console.log('++++++_id ',result[0]['_id']);
  res.cookie('userId',result[0]['_id'])

  if (result) {
    res.send({result:'ok',msg:'login success'});
  }else{
    res.send({result:'fail',msg:'login fail'});

  }
})
router.post('/signup', async function (req, res) {
  await addUser(req.body);
  res.send({result:'ok', msg:'record added successfully'});
})

module.exports = router;
