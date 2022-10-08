// npm i mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

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

module.exports = {addDocument};