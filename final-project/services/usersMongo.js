// npm i mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const User = require('../models/user'); 
const {errorHandler} = require('../helpers/dbErorrHendler'); 

const dbName = 'b0csomwptm1n3ow';
const url = 'mongodb://udbgsu2v2gmoido3o49u:7Fw7CjDmyvJkEMcV5WSa@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b0csomwptm1n3ow?replicaSet=rs0';


const getStorigeById = function(id){
    return new Promise((resolve, reject) => {
    var record = {};
      MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
        db.collection('users').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
          if (err) throw err
          console.log(result[0].spaceUsed);
          resolve(result[0].spaceUsed);
          client.close();
        });
        });
    });
};

const setStorigeSpaceUsed = function(id,value){
    // console.log("Custimer is ",customer);
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const collection = db.collection('users');
        // collection.findAndModify({
        //     query: { _id: id},
        //     update: { $set: { spaceUsed:  } },
        // });
        collection.updateOne({"_id" : ObjectId(id)},{ $set:{ spaceUsed: value}},function(err,result){
            console.log("setStorigeSpaceUsed result:" + JSON.stringify(result));
            resolve(result);
            client.close();
        });
        // let result = collection.updateOne(
        //     { _id: id },
        //     { $set:{ spaceUsed: { $sum: 1 },}}
        //  )
        //  console.log("setStorigeSpaceUsed result:" + JSON.stringify(result));
        //  resolve(result);
      });
    });
};

const addUser = function (record) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            const collection = db.collection('users');
            collection.insertMany([record], function (err, result) {
                console.log('record signup: ',record);
                resolve(record);
                client.close();
            },);
        });
    });
}

const loginUser = function (field, email, password) {
    return new Promise((resolve, reject) => {
        var records = [];
        // console.log("field:" + field);
        // console.log("email:" + email);

        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            db.collection('users').find({
                [field]: {
                    '$regex': email,
                    '$options': 'i'
                }
            }).toArray(function (err, result) {
                if (err) throw err
                console.log("result:" + JSON.stringify(result));
                // console.log("==========password:" + result[0]['password']);

                if ((email===result[0]['email']) && (password === result[0]['password'])) {
                    // resolve(1);
                    resolve(result);
                } else {
                    resolve(0)

                }
                client.close();
            });
        });
    });
}

module.exports = {
    addUser,
    loginUser,
    setStorigeSpaceUsed,
    getStorigeById
};