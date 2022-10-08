var express = require('express');
var app = express.Router();
const {getUsers,addUser,updateUser,deleteUser,getUserById,getUsersBySearch} = require('../services/adminMongo');

  app.get('/', async function (req, res) {
    res.send(await getUsers());
  })
  
  app.get('/:id', async function (req, res) {
    console.log('id '+req.params.id);
      res.send(await getUserById(req.params.id))
  })
  
  app.post('/', async function (req, res) {
    await addUser(req.body);
    res.send({result:'ok', msg:'record added successfully'});
  })
  
  app.put('/', async function (req, res) {
    const rec = req.body;
    console.log("rec ",rec);
    await updateUser(rec);
    res.send({result:'ok', msg:'record updated successfully'});
  })
  
  app.delete('/', async (req, res) => {
    await deleteUser({id:req.body.id});
    res.send({result:'ok',msg:'record deleted successfully'});
  })

module.exports = app;
