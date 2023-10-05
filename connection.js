// File : connection.js
// Author: Clara D. & Maxime S.
// Description: This file is used to connect to the database.

// Dependencies
const mysql = require('mysql');
require('dotenv').config();

// Connection to the database (using .env file)
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});


// Get all transition table and return it
connection.connect();
const query = "SELECT * FROM transition";

connection.query(query, (err, rows, fields) => {
  if (err) throw err;
  console.log(rows[0].IDTran);
});


// Need to use JSON.stringify() to convert the object to a string (to be able to send it put it in a json file)
// error.code

connection.end();