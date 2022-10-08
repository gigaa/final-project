// npm i mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

const dbName = 'b0csomwptm1n3ow';
const url = 'mongodb://udbgsu2v2gmoido3o49u:7Fw7CjDmyvJkEMcV5WSa@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b0csomwptm1n3ow?replicaSet=rs0';

const getUsers = function(){ 
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
    function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('users').find().toArray(function (err, result) {
        if (err) throw err
        //console.log(result);
        client.close();
        resolve(result);
      });
  });
  });
};


const getUserById = function(id){
  return new Promise((resolve, reject) => {
  var record = {};
    console.log(">> getCustomerById "+ id);
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('users').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        resolve(result[0]);
        client.close();
      });
      });
  });
};

const addUser = function(record) {
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.insertMany([record],function(err,result){
      resolve({result:'success'});
      client.close();
    });
    });
  });
}

const deleteUser = function(id){
  return new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
      resolve({result:'success'});
      client.close()
    });
     });
  });
};

const updateUser = function(customer){
  console.log("Custimer is ",customer);
  return new Promise((resolve, reject) => {
    let id = customer.id;
    delete(customer.id);
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: customer },function(err,result){
      resolve({result:'success'});
      client.close();
       });
    });
  });
};

const getUsersBySearch = function(field,searchText){
  return new Promise((resolve, reject) => {
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    console.log("field:"+field);
    console.log("searchText:"+searchText);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('users').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
  });
}


module.exports = {getUsers,addUser,updateUser,deleteUser,getUserById,getUsersBySearch};
