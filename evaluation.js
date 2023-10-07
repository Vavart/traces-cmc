// File : evaluation.js
// Author: Clara D. & Maxime S.
// Description: This file is used  to evaluate the data from the JSON file and determine the score of each user

// Dependencies (npm install)
const fs = require('fs');
const { get } = require('http');

// Global variables
const FILEPATH = './data/data.json';
const WEIGHTS = {
    'Connexion': 1,

    'Afficher une structure du cours': 1,
    'Afficher une structure (cours/forum)': 1,
    'Afficher le fil de discussion': 1,
    'Afficher le contenu d\'un message': 1,

    'Répondre à un sondage': 1,
    'Poster un nouveau message': 1,
    'Citer un message': 1,

    'Bouger la scrollbar en bas - afficher la fin du message': 1,
    'Bouger la scrollbar en bas': 1,
    'Upload un fichier avec le message': 1,
    'Download un fichier avec le message': 1,
};

const TITLES = Object.keys(WEIGHTS);

// Read the JSON file
function readJSONFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}

// Get the correct data according to dates (start and end)
function getData(data, start, end) {
  let newData = [];
  data.forEach(row => {
    if (row.Date >= start && row.Date <= end) {
      newData.push(row);
    }
  });
  return newData;
}
 
// Count the number of actions for each user - TO REDO
function countActions(data) {
  let users = {};
  data.forEach(row => {
    if (users[row.name] === undefined) {
      users[row.name] = 1;
    } else {
      users[row.name]++;
    }
  });
  return users;
}


const data = readJSONFile(FILEPATH);
const users = countActions(data);
console.log(users);