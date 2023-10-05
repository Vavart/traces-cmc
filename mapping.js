// File : mapping.js
// Author: Clara D. & Maxime S.
// Description: This file is used to export the data from the database to a JSON file

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


// Function to process the data from the database
function processData(data) {

  data.forEach(row => {
    
  });

}


// Exporting the data from the database to a JSON file
function exportData() {

  connection.connect();
  const query = "SELECT * FROM transition";

  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    processData(rows);
  });

  connection.end(); 

}

exportData();