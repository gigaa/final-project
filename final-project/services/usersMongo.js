// npm i mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const User = require('../models/user'); 
const {errorHandler} = require('../helpers/dbErorrHendler'); 

const dbName = 'b0csomwptm1n3ow';
const url = 'mongodb://udbgsu2v2gmoido3o49u:7Fw7CjDmyvJkEMcV5WSa@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b0csomwptm1n3ow?replicaSet=rs0';


// user 


// const addUser = (req,res) => {
//     console.log('req',req.body);
//     const user = new User(req.body)
//     user.save((err,data)=>{
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             })
//         }
//         res.json({data})
//     })
// }

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
                resolve({
                    result: 'success'
                });
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
    loginUser
};