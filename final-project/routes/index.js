var express = require('express');
var router = express.Router();
// const {getCustomers,getCustomerById,getCustomersBySearch} = require('../services/customerMongo');

router.get('/', function(req, res, next) {
  delete(req.session.role);
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  delete(req.session.role);
  res.render('login', { title: 'Login' });
});

module.exports = router;
