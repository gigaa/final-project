var express = require('express');
var router = express.Router();
const {getUsers,getUserById,getUsersBySearch} = require('../services/customerMongo');
const {addUser} = require('../services/usersMongo');

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/admin', async function(req, res, next) {
  res.render('admin', { title: 'admin', data:await getUsers() });
});

router.get('/admin/search/:field/:searchWord', async function(req, res, next) {

  res.render('admin', { title: 'admin', data:await getUsersBySearch(req.params.field,req.params.searchWord) });
});

router.get('/admin/add', function(req, res, next) {
  const admin = {};
  method="POST";
  res.render('add-admin', { title: 'Add admin', buttonName:'Add',admin,method});
});



router.get('/admin/edit/:id', async function(req, res, next) {
  const admin = await getUserById(req.params.id);
  method="PUT";
  res.render('add-admin', { title: 'Update admin', buttonName:'Update',admin,method });
});

router.get('/about', async function(req, res, next) {
    res.render('about', { title: 'About', admins: await getadmins() });
});

// user
router.get('/signup', function(req, res, next) {
  const user = {};
  method="POST";
  res.render('signup', { title: 'Sign Up', buttonName:'Sign Up',user,method});
});

module.exports = router;
