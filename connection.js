// File : connection.js
// Author: Clara D. & Maxime S.
// Description: This file is used to connect to the database.

// Dependencies
const mysql = require('mysql');


// Connection to the database
const con = mysql.createConnection({
  host: "e-srv-lamp.univ-lemans.fr",
  user: "",
  database: "",
  password: "",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

    var sql = "SELECT * FROM transition";

    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    });
});
