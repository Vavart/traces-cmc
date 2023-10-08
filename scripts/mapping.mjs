// File: mapping.mjs
// Author: Clara D. & Maxime S.
// Description: This file is used to export the data from the database to a JSON file

// Dependencies
import { User, Connection, Display, Posts, Activity } from './classes.mjs';
import { connection, FILEPATH } from './config.mjs';
import { createJsonFile } from './jsonUtils.mjs';

// Function to create the users list
function createUsers(users){
  let usersList = []
  users.forEach(user => {
    usersList.push(new User(user))
  });
  return usersList
}


// Function to process the data from the database
function processData(data, users) {

  const usersList = createUsers(users);

  data.forEach(row => {
      
    const userIndex = users.indexOf(row.Utilisateur)

    switch (row.Titre){

      case 'Connexion':    
        usersList[userIndex].connections.push(new Connection(row.Date, row.Heure, row.Delai, row.Commentaire))
        break;

      case 'Afficher une structure du cours':
      case 'Afficher une structure (cours/forum)':
      case 'Afficher le fil de discussion':
      case 'Afficher le contenu d\'un message':
        usersList[userIndex].displays.push(new Display(row.Titre, row.idForum, row.Date, row.Heure, row.Delai, row.Commentaire))
        break;

      case 'Répondre à un sondage':
      case 'Poster un nouveau message':
      case 'Citer un message':
        usersList[userIndex].posts.push(new Posts(row.Titre, row.idForum, row.Date, row.Heure, row.Delai, row.Commentaire))
        break;

      case 'Bouger la scrollbar en bas - afficher la fin du message':
      case 'Bouger la scrollbar en bas':
      case 'Upload un fichier avec le message':
      case 'Download un fichier avec le message':
        usersList[userIndex].activities.push(new Activity(row.Titre, row.Date, row.Heure))
        break;

    }
  });

  // Convert the data to JSON format and create the JSON file
  const jsonFile = JSON.stringify(usersList);
  createJsonFile(jsonFile, FILEPATH);
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

// Export the function
// export { exportData };