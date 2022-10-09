var express = require('express');
var app = express.Router();
const {addDocument,getDocumentById,deleteDocument,updateDocument} = require('../services/documentMongo');

//   app.get('/', async function (req, res) {
//     res.send(await getUsers());
//   })
  
  app.get('/:id', async function (req, res) {
    console.log('id '+req.params.id);
      res.send(await getDocumentById(req.params.id))
  })
  
  app.post('/', async function (req, res) {
    await addDocument(req.body);
    res.send({result:'ok', msg:'record added successfully'});
  })
  
  app.put('/', async function (req, res) {
    const rec = req.body;
    console.log("rec ",rec);
    await updateDocument(rec);
    res.send({result:'ok', msg:'record updated successfully'});
  })
  
  app.delete('/', async (req, res) => {
    await deleteDocument({id:req.body.id});
    res.send({result:'ok',msg:'record deleted successfully'});
  })

module.exports = app;
