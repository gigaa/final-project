var express = require('express');
var router = express.Router();
var fs = require('fs');

const {getUsers,getUserById,getUsersBySearch} = require('../services/adminMongo');
const {getDocuments,getMyDocuments,getMyDocumentsPublicCount,getDocumentBySearch,getDocumentById,getMyDocumentsTotalCount,getMyDocumentsPrivateCount} = require('../services/documentMongo');

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
  res.render('add-admin', { title: 'Add User', buttonName:'Add',admin,method});
});

router.get('/admin/edit/:id', async function(req, res, next) {
  const admin = await getUserById(req.params.id);
  method="PUT";
  res.render('add-admin', { title: 'Update admin', buttonName:'Update',admin,method });
});

// user
router.get('/signup', function(req, res, next) {
  const user = {};
  method="POST";
  res.render('signup', { title: 'Sign Up', buttonName:'Sign Up',user,method});
});

router.get('/document/all', async function(req, res, next) {
  res.render('alldocument', { title: 'All Public Documents', data:await getDocuments('access','public') });
});


router.get('/document',async function(req, res, next) {
  const userId=req.cookies.userId;
  const totalCount = await getMyDocumentsTotalCount('userId',userId);
  const privateCount = await getMyDocumentsPrivateCount(userId);
  const publicCount = await getMyDocumentsPublicCount(userId);
  
  res.render('mydocument', { title: 'My Documents',totalCount,privateCount,publicCount, data:await getMyDocuments('userId',userId) });
});

router.get('/document/edit/:id', async function(req, res, next) {
  const userId=req.cookies.userId;
  const document = await getDocumentById(req.params.id);
  console.log('document',document);
  res.cookie('type',document.type)
  res.cookie('fileLocation',document.fileLocation)
  res.cookie('fileSize',document.fileSize)
  method="PUT";
  res.render('add-document', { title: 'Update Documents', buttonName:'Update',document,userId,method });
});

router.get('/document/search/:field/:searchWord', async function(req, res, next) {
  res.render('mydocument', { title: 'My Document',totalCount:0,privateCount:0, data:await getDocumentBySearch(req.params.field,req.params.searchWord) });
});
router.get('/document/add', function(req, res, next) {
  const document = {};
  method="POST";
  const userId=req.cookies.userId;
  console.log('userId========',userId);
  res.render('add-document', { title: 'Add Document', buttonName:'Add Document',document,userId,method});
});

router.post('/document/add', function(req, res, next) {
  const document = {};
  method="POST";
  const userId=req.cookies.userId;
  if (req.files) {
    // console.log(req.files);
    var file = req.files.file
    var fileName = file.name
    var type = file.mimetype
    var fileSize = file.size

    let filePath = `./uploads/${userId}/`
    let fileLocation =  `/uploads/${userId}/${fileName}`
    console.log('============all',{fileLocation,type,fileSize});

    if (!fs.existsSync(filePath)){
      fs.mkdirSync(filePath);
    }

    file.mv(`./uploads/${userId}/${fileName}`,function  (err) {
      if (err) {
        res.send(err)
      }else{
        // res.send('File Uploaded')
        res.render('add-document', { title: 'Add Document', buttonName:'Add Document',document,userId,method});

      }
    })
    res.cookie('type',type)
    res.cookie('fileLocation',fileLocation)
    res.cookie('fileSize',fileSize)
  }
});

module.exports = router;
