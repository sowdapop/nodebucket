// Title: nodebucket
// Author: Professor Krasso
// Date: 13 Jan 2023
// Modified by: Kayla McDanel
// Attributions: Code from Bellevue Web Dev GitHub Repository
// https://github.com/buwebdev/web-450

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item');

//Create new schema for employee information
let employeeSchema = new Schema({
    empId: { type: Number, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [ itemSchema ],
    done: [ itemSchema ]
    //Searches employees collection on MongoDB for model info
}, { collection: 'employees' })

module.exports = mongoose.model('employees', employeeSchema); //Export the employee schema
