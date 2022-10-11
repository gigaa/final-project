var express = require('express');
var app = express.Router();
const fs = require('fs')
const {addDocument,getDocumentById,getfileLocation,deleteDocument,updateDocument} = require('../services/documentMongo');

//   app.get('/', async function (req, res) {
//     res.send(await getUsers());
//   })
  
  app.get('/:id', async function (req, res) {
    console.log('id '+req.params.id);
      res.send(await getDocumentById(req.params.id))
  })
  
  // app.post('/add', async function (req, res) {
  //   // await addDocument(req.body);
  //   res.send({result:'ok', msg:'record added successfully'});
  // })
  
  app.put('/edit/:id', async function (req, res) {
    const rec = req.body;
    console.log("rec ",rec);
    await updateDocument(rec);
    res.send({result:'ok', msg:'record updated successfully'});
  })
  
  app.delete('/', async (req, res) => {
    let fileLocation= await getfileLocation({id:req.body.id});
    await deleteDocument({id:req.body.id});
    // console.log('apifileLocation',fileLocation);
    try {
      fs.unlinkSync(fileLocation)
      //file removed
    } catch(err) {
      console.error(err)
    }
    res.send({result:'ok',msg:'record deleted successfully'});
  })

module.exports = app;
