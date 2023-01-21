// Title: nodebucket
// Author: Professor Krasso
// Date: 13 Jan 2023
// Modified by: Kayla McDanel
// Attributions: Code from Bellevue Web Dev GitHub Repository
// https://github.com/buwebdev/web-450

/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const EmployeeAPI = require('./routes/employee-api');
const config = require('./data/config.json');
const { disconnect } = require('process');

const app = express(); // Express variable.

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// default server port value.
const PORT = process.env.PORT || 3000;

// TODO: This line will be replaced with your database connection string (including username/password).
const CONN = config.dbConn;

/**
 * Database connection.
 */
mongoose.set('strictQuery', false);

mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
}, 
err => {
  console.log(config.mongoServerError + ': ' + err.message);
});

mongoose.connection.on('error', err => {
  console.log(config.mongoServerError + ': ' + err.message);
})

mongoose.connection.on('disconnected', () => {
  console.log('Server disconnected from host (MongoDB Atlas).');
})

//APIs go here
app.use('/api/employees', EmployeeAPI);

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
