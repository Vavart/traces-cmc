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
function processData(data, users) {
  jsonFile = []

  data.forEach(row => {
      
    switch (row.Titre){
      case 'Connexion':
        // ajouter au user i les données de cette connexion
        // date, heure, delai, comm
        break
      case 'Afficher une structure du cours':
      case 'Afficher une structure (cours/forum)':
      case 'Afficher le fil de discussion':
      case 'Afficher le contenu d\'un message':
        // ajouter au user i les données de cet affichage
        // type, idForum, date, heure, delai, comm
        break
      case 'Répondre à un sondage':
      case 'Poster un nouveau message':
      case 'Citer un message':
        // ajouter au user i les données de cette réponse
        // type, idForum, date, heure, delai, comm
        break
      case 'Bouger la scrollbar en bas - afficher la fin du message':
      case 'Bouger la scrollbar en bas':
      case 'Upload un fichier avec le message':
      case 'Download un fichier avec le message':
        // ajouter au user i les données de cette activité
        // type, date, heure
        break
    }
      
  });

}


// Exporting the data from the database to a JSON file
function exportData() {

  connection.connect();
  const userQuery = "SELECT DISTINCT Utilisateur FROM transition";
  const tableQuery = "SELECT * FROM transition";
  const users = [];

  connection.query(userQuery, (err, rows, fields) => {
    if (err) throw err;
    rows.forEach(row => {
      users.push(row.Utilisateur);
    });
  })

  connection.query(tableQuery, (err, rows, fields) => {
    if (err) throw err;
    processData(rows);
  });

  connection.end(); 

}

exportData();