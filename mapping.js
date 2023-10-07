// File : mapping.js
// Author: Clara D. & Maxime S.
// Description: This file is used to export the data from the database to a JSON file

// Dependencies (npm install)
const mysql = require('mysql');
const fs = require('fs');
require('dotenv').config();

// Connection to the database (using .env file)
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

// Global variables
const FILEPATH = './data/data.json';


class User{
  constructor(name){
    this.name = name
    this.connections = []
    this.displays = []
    this.posts = []
    this.activities = []
  }
}

class Connection{
  constructor(date, time, delay, comment){
    this.date = date
    this.heure = time
    this.delai = delay
    this.comment = comment
  }
}

class Display{
  constructor(type, idForum, date, time, delay, comment){
    this.type = type
    this.idForum = idForum
    this.date = date
    this.heure = time
    this.delai = delay
    this.comment = comment
  }
}

class Posts{
  constructor(type, idForum, date, time, delay, comment){
    this.type = type
    this.idForum = idForum
    this.date = date
    this.heure = time
    this.delai = delay
    this.comment = comment
  }
}

class Activity { 
  constructor(type, date, time){
    this.type = type
    this.date = date
    this.heure = time
  }
}


function createJsonFile(jsonFile){
  fs.writeFile(FILEPATH, jsonFile, (err) => {
    if (err) throw err;
    console.log('File has been saved !');
  });
}


function createUsers(users){
  let usersList = []
  users.forEach(user => {
    usersList.push(new User(user))
  });
  return usersList
}


// Function to process the data from the database
function processData(data, users) {

  usersList = createUsers(users);

  data.forEach(row => {
      
    userIndex = users.indexOf(row.Utilisateur)

    switch (row.Titre){
      case 'Connexion':
        
        usersList[userIndex].connections.push(new Connection(row.Date, row.Heure, row.Delai, row.Commentaire))
        // ajouter au user i les données de cette connexion
        // date, heure, delai, comm
        break
      case 'Afficher une structure du cours':
      case 'Afficher une structure (cours/forum)':
      case 'Afficher le fil de discussion':
      case 'Afficher le contenu d\'un message':

        usersList[userIndex].displays.push(new Display(row.Titre, row.idForum, row.Date, row.Heure, row.Delai, row.Commentaire))
        // ajouter au user i les données de cet affichage
        // type, idForum, date, heure, delai, comm
        break
      case 'Répondre à un sondage':
      case 'Poster un nouveau message':
      case 'Citer un message':

        usersList[userIndex].posts.push(new Posts(row.Titre, row.idForum, row.Date, row.Heure, row.Delai, row.Commentaire))
        // ajouter au user i les données de cette réponse
        // type, idForum, date, heure, delai, comm
        break
      case 'Bouger la scrollbar en bas - afficher la fin du message':
      case 'Bouger la scrollbar en bas':
      case 'Upload un fichier avec le message':
      case 'Download un fichier avec le message':

        usersList[userIndex].activities.push(new Activity(row.Titre, row.Date, row.Heure))
        // ajouter au user i les données de cette activité
        // type, date, heure
        break
    }

    
      
  });

  jsonFile = JSON.stringify(usersList);
  createJsonFile(jsonFile);
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
    processData(rows, users);
  });

  connection.end(); 

}


// Calling the function
exportData();