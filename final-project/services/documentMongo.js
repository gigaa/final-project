// npm i mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs')

const dbName = 'b0csomwptm1n3ow';
const url = 'mongodb://udbgsu2v2gmoido3o49u:7Fw7CjDmyvJkEMcV5WSa@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b0csomwptm1n3ow?replicaSet=rs0';


const addDocument = function(record) {
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('documents');
    collection.insertMany([record],function(err,result){
      resolve({result:'success'});
      client.close();
    });
    });
  });
}

const getDocuments = function(field,searchText){
  return new Promise((resolve, reject) => {
    var records = [];
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('documents').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
  });
}
const getAllDocuments = function(){
  return new Promise((resolve, reject) => {
    var records = [];
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('documents').find().toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
  });
}
const getMyDocuments = function(field,searchText){
  return new Promise((resolve, reject) => {
    var records = [];
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('documents').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
  });
}
const getMyDocumentsTotalCount = function(field,searchText){
  return new Promise((resolve, reject) => {
    var records = [];
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('documents').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result.length));
        resolve(result.length);
        client.close();
         });
      });
  });
}


const getMyDocumentsPrivateCount = function(id){
  return new Promise((resolve, reject) => {
    var records = [];
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    let result= db.collection('documents').countDocuments({access: "private"})
    //  let result=  db.collection('documents').aggregate( [ { $match: {access : "private"  } } ], { userId : ObjectId(id) } )
      console.log("presult:"+JSON.stringify(result))
      resolve(result);

      });
  });
  
};
const getMyDocumentsPublicCount = function(id){
  return new Promise((resolve, reject) => {
    var records = [];
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    let result= db.collection('documents').countDocuments({access: "public"})
    //  let result=  db.collection('documents').aggregate( [ { $match: {access : "private"  } } ], { userId : ObjectId(id) } )
      console.log("presult:"+JSON.stringify(result))
      resolve(result);

      });
  });
  
};
const getDocumentById = function(id){
  return new Promise((resolve, reject) => {
  var record = {};
    console.log(">> getDocumentById "+ id);
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('documents').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        resolve(result[0]);
        client.close();
      });
      });
  });
};
const getfileLocation = function(id){
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('documents');
    collection.find({"_id" : ObjectId(id)}).toArray(function (err, result) {
      if (err) throw err
      const fileLocation ='.'+result[0].fileLocation
      console.log('documents result: ',fileLocation);
    
      resolve(fileLocation);
      client.close();
    });
     });
  });
};

const deleteDocument = function(id){
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('documents');
    collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
      resolve({result:'success'});
      client.close()
    });

     });
  });
};

const updateDocument = function(customer){
  console.log("Custimer is ",customer);
  return new Promise((resolve, reject) => {
    let id = customer.id;
    delete(customer.id);
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('documents');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: customer },function(err,result){
      resolve({result:'success'});
      client.close();
       });
    });
  });
};

const getDocumentBySearch = function(field,searchText){
  return new Promise((resolve, reject) => {
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    console.log("field:"+field);
    console.log("searchText:"+searchText);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('documents').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
  });
}


module.exports = {addDocument,getDocuments,getfileLocation,getAllDocuments,getMyDocumentsPublicCount,getMyDocuments,getDocumentById,deleteDocument,updateDocument,getDocumentBySearch,getMyDocumentsTotalCount,getMyDocumentsPrivateCount};