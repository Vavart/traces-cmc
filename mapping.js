// Require or import the dependencies
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// Read the SQL file
const dataSql = fs.readFileSync("./traceforum.sql").toString();

// Setup the database connection
let db = new sqlite3.Database("indicators.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQLite database.");
});

// Convert the SQL string to array so that you can run them one at a time.
// You can split the strings using the query delimiter i.e. `;` in // my case I used `);` because some data in the queries had `;`.
// const dataArr = dataSql.toString().split(");");
// console.log(dataSql.toString().split(");")[0]);
const dataArr = dataSql.toString().split(");");

// Loop through the `dataArr` and db.run each query
dataArr.forEach(query => {
  if (query) {
    // Add the delimiter back to each query before you run them
    // In my case the it was `);`
    query += ");";
    db.run(query, err => {
      if (err) throw err;
    });
  }
});


// Close the DB connection
db.close(err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Closed the database connection.");
});
