const { Sequelize } = require('sequelize');
const Person = require('../models/Person');

const getPersons = async ()=>(Person.findAll());

const processAddPerson = async ()=>{

}

module.exports = {getPersons};