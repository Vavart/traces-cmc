// File : evaluation.js
// Author: Clara D. & Maxime S.
// Description: This file is used  to evaluate the data from the JSON file and determine the score of each user

// Dependencies (npm install)
const { log } = require('console');
const fs = require('fs');
const { get } = require('http');

// Global variables
const FILEPATH = './data/data.json';
const WEIGHTS = {
  'connections': 1,
  'displays': 1,
  'posts': 1,
  'activities': 1
};

const TITLES = Object.keys(WEIGHTS);

class User {
  constructor(name) {
    this.name = name;
    this.connections = 0;
    this.displays = 0;
    this.posts = 0;
    this.activities = 0;
    this.score = 0;
    this.connectionsScore = 0;
    this.displaysScore = 0;
    this.postsScore = 0;
    this.activitiesScore = 0;
    this.score = 0;
    this.normalizedscore = 0;
  }
}

class Measures {
  constructor() {
    this.maxconnections = 0;
    this.minconnections = 0;
    this.maxdisplays = 0;
    this.mindisplays = 0;
    this.maxposts = 0;
    this.minposts = 0;
    this.maxactivities = 0;
    this.minactivities = 0;
  }
}


// Read the JSON file
function readJSONFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}

// Filter the data according to a start date and an end date
function getData(data, start, end) {
  let filteredData = [];
  data.forEach(row => {
    if (row.Date >= start && row.Date <= end) {
      filteredData.push(row);
    }
  });
  return filteredData;
}

function createUsersList(data) {
  return data.map(row => row.name);
}

// Create an array of users with their name and their actions (connections, displays, posts, activities)
function createUsersActions(usersList) {
  let usersActions = [];
  usersList.forEach(name => {
    usersActions.push(new User(name));
  });

  return usersActions;
}
 
// Count the number of actions for each user
function countActions(data, usersActions) {
    data.forEach(row => {
      usersActions.forEach(user => {
        if (row.name === user.name) {
          user.connections += row.connections.length;
          user.displays += row.displays.length;
          user.posts += row.posts.length;
          user.activities += row.activities.length;
        }
      });
    });

    return usersActions;
}

function getMinAndMaxOfData(usersMeasures, title) {
  let min = usersMeasures[0][title];
  let max = usersMeasures[0][title];

  usersMeasures.forEach(row => {
    if (row[title] < min) {
      min = row[title];
    }
    if (row[title] > max) {
      max = row[title];
    }
  });

  return [min, max];
}

function getMinAndMaxOfAllData(usersMeasures) {
  const measures = new Measures();
  TITLES.forEach(title => {
    const [min, max] = getMinAndMaxOfData(usersMeasures, title);
    measures[`max${title}`] = max;
    measures[`min${title}`] = min;
  });

  return measures;
}


function evaluateScore(usersMeasures, measures) {
  usersMeasures.forEach(user => {
    TITLES.forEach(title => {
      user[`${title}Score`] = (user[title] - measures[`min${title}`]) / (measures[`max${title}`] - measures[`min${title}`]);
    });
  });

  return usersMeasures;
}


function evaluateTotalScore(usersScores) {
  usersScores.forEach(user => {
    user.score = 0;
    TITLES.forEach(title => {
      user.score += user[`${title}Score`] * WEIGHTS[title];
    });
  });

  return usersScores;
}

function getMinAndMaxScoreOfUser(usersTotalScores) {
  let min = usersTotalScores[0].score;
  let max = usersTotalScores[0].score;

  usersTotalScores.forEach(user => {
    if (user.score < min) {
      min = user.score;
    }
    if (user.score > max) {
      max = user.score;
    }
  });

  return [min, max];
}

function normalizeScore(usersTotalScores, scoreMin, scoreMax) {
  usersTotalScores.forEach(user => {
    user.normalizedscore = (user.score - scoreMin) / (scoreMax - scoreMin);
  });

  return usersTotalScores;
}

function getAllScores(usersNormalizedScores) {
  let scores = [];
  usersNormalizedScores.forEach(user => {
    const scoreObject =  {};
    scoreObject[user.name] = user.normalizedscore;
    scores.push(scoreObject);
    
  });

  return scores;
}

const data = readJSONFile(FILEPATH);
const usersList = createUsersList(data);
const usersActions = createUsersActions(usersList);
const usersMeasures = countActions(data, usersActions);
const measures = getMinAndMaxOfAllData(usersMeasures);
const usersScores = evaluateScore(usersMeasures, measures);
const usersTotalScores = evaluateTotalScore(usersScores);
const [scoreMin, scoreMax] = getMinAndMaxScoreOfUser(usersTotalScores);
const usersNormalizedScores = normalizeScore(usersTotalScores, scoreMin, scoreMax);
const scores = getAllScores(usersNormalizedScores);
console.log(scores);
console.log(usersActions[usersList.indexOf("madeth")]); // mauvais un peu
